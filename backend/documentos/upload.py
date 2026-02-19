import json
import boto3
import os
import uuid
from datetime import datetime

s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        
        # Extrair dados do usuário
        usuario_id = event['requestContext']['authorizer']['claims']['sub']
        
        # Validação
        caso_id = body.get('caso_id')
        nome_arquivo = body.get('nome_arquivo')
        tipo_arquivo = body.get('tipo_arquivo')
        
        if not caso_id or not nome_arquivo:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': os.environ.get('CORS_ORIGIN', '*'),
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'error': 'caso_id e nome_arquivo são obrigatórios'})
            }
        
        # Verificar se o caso pertence ao usuário
        casos_table = dynamodb.Table('casos')
        try:
            caso_response = casos_table.get_item(Key={'id': caso_id})
            if 'Item' not in caso_response or caso_response['Item']['usuario_id'] != usuario_id:
                return {
                    'statusCode': 403,
                    'headers': {
                        'Access-Control-Allow-Origin': os.environ.get('CORS_ORIGIN', '*'),
                        'Content-Type': 'application/json'
                    },
                    'body': json.dumps({'error': 'Acesso negado ao caso'})
                }
        except Exception:
            return {
                'statusCode': 404,
                'headers': {
                    'Access-Control-Allow-Origin': os.environ.get('CORS_ORIGIN', '*'),
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'error': 'Caso não encontrado'})
            }
        
        # Gerar chave única para o arquivo
        documento_id = str(uuid.uuid4())
        extensao = nome_arquivo.split('.')[-1] if '.' in nome_arquivo else ''
        chave_s3 = f"{usuario_id}/{caso_id}/{documento_id}.{extensao}"
        
        # Gerar URL pré-assinada para upload
        upload_url = s3.generate_presigned_url(
            'put_object',
            Params={
                'Bucket': os.environ['DOCUMENTOS_BUCKET'],
                'Key': chave_s3,
                'ContentType': tipo_arquivo or 'application/octet-stream'
            },
            ExpiresIn=3600
        )
        
        # Salvar metadados no DynamoDB
        documentos_table = dynamodb.Table(os.environ['DOCUMENTOS_TABLE'])
        documento = {
            'id': documento_id,
            'caso_id': caso_id,
            'usuario_id': usuario_id,
            'nome_arquivo': nome_arquivo,
            'chave_s3': chave_s3,
            'tipo_arquivo': tipo_arquivo,
            'data_upload': datetime.utcnow().isoformat(),
            'status': 'pendente'
        }
        
        documentos_table.put_item(Item=documento)
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': os.environ.get('CORS_ORIGIN', '*'),
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'upload_url': upload_url,
                'documento_id': documento_id
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': os.environ.get('CORS_ORIGIN', '*'),
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': str(e)})
        }