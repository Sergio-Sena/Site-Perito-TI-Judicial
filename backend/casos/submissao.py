import json
import boto3
import os
import uuid
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
ses = boto3.client('ses')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        
        # Extrair dados do usuário do token JWT
        usuario_id = event['requestContext']['authorizer']['claims']['sub']
        email_usuario = event['requestContext']['authorizer']['claims']['email']
        
        # Validação dos dados
        servico = body.get('servico')
        descricao = body.get('descricao')
        urgencia = body.get('urgencia', 'normal')
        
        if not servico or not descricao:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': os.environ.get('CORS_ORIGIN', '*'),
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'error': 'Serviço e descrição são obrigatórios'})
            }
        
        # Criar caso no DynamoDB
        casos_table = dynamodb.Table(os.environ['CASOS_TABLE'])
        caso_id = str(uuid.uuid4())
        
        caso = {
            'id': caso_id,
            'usuario_id': usuario_id,
            'servico': servico,
            'descricao': descricao,
            'urgencia': urgencia,
            'status': 'pendente',
            'data_criacao': datetime.utcnow().isoformat(),
            'valor_estimado': None
        }
        
        casos_table.put_item(Item=caso)
        
        # Enviar email de notificação
        try:
            ses.send_email(
                Source='perito@exemplo.com',
                Destination={'ToAddresses': ['perito@exemplo.com']},
                Message={
                    'Subject': {'Data': f'Nova Solicitação de Caso - {servico}'},
                    'Body': {
                        'Text': {
                            'Data': f'''
Nova solicitação de caso recebida:

Cliente: {email_usuario}
Serviço: {servico}
Urgência: {urgencia}
Descrição: {descricao}

Caso ID: {caso_id}
                            '''
                        }
                    }
                }
            )
        except Exception as e:
            print(f"Erro ao enviar email: {e}")
        
        return {
            'statusCode': 201,
            'headers': {
                'Access-Control-Allow-Origin': os.environ.get('CORS_ORIGIN', '*'),
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'message': 'Caso submetido com sucesso',
                'caso_id': caso_id
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