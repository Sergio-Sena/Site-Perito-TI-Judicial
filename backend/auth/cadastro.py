import json
import boto3
import os
from email_validator import validate_email, EmailNotValidError

cognito = boto3.client('cognito-idp')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        email = body.get('email')
        password = body.get('password')
        nome = body.get('nome')
        
        # Validação
        if not email or not password or not nome:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': os.environ.get('CORS_ORIGIN', '*'),
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'error': 'Email, senha e nome são obrigatórios'})
            }
        
        try:
            validate_email(email)
        except EmailNotValidError:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': os.environ.get('CORS_ORIGIN', '*'),
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'error': 'Email inválido'})
            }
        
        # Criar usuário no Cognito
        response = cognito.admin_create_user(
            UserPoolId=os.environ['USER_POOL_ID'],
            Username=email,
            UserAttributes=[
                {'Name': 'email', 'Value': email},
                {'Name': 'name', 'Value': nome},
                {'Name': 'email_verified', 'Value': 'true'}
            ],
            TemporaryPassword=password,
            MessageAction='SUPPRESS'
        )
        
        # Definir senha permanente
        cognito.admin_set_user_password(
            UserPoolId=os.environ['USER_POOL_ID'],
            Username=email,
            Password=password,
            Permanent=True
        )
        
        return {
            'statusCode': 201,
            'headers': {
                'Access-Control-Allow-Origin': os.environ.get('CORS_ORIGIN', '*'),
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'message': 'Usuário criado com sucesso'})
        }
        
    except cognito.exceptions.UsernameExistsException:
        return {
            'statusCode': 409,
            'headers': {
                'Access-Control-Allow-Origin': os.environ.get('CORS_ORIGIN', '*'),
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Email já cadastrado'})
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