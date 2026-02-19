import json
import boto3
import os
import stripe

stripe.api_key = os.environ['STRIPE_SECRET_KEY']

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        
        # Extrair dados do usuário
        usuario_id = event['requestContext']['authorizer']['claims']['sub']
        email_usuario = event['requestContext']['authorizer']['claims']['email']
        
        # Validação
        caso_id = body.get('caso_id')
        valor = body.get('valor')  # em centavos
        descricao = body.get('descricao', 'Pagamento de honorários periciais')
        
        if not caso_id or not valor:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': os.environ.get('CORS_ORIGIN', '*'),
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'error': 'caso_id e valor são obrigatórios'})
            }
        
        # Verificar se o caso pertence ao usuário
        dynamodb = boto3.resource('dynamodb')
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
        
        # Criar sessão de checkout do Stripe
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'brl',
                    'product_data': {
                        'name': f'Perícia Técnica - Caso {caso_id[:8]}',
                        'description': descricao,
                    },
                    'unit_amount': int(valor),
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=f"{os.environ.get('CORS_ORIGIN', 'http://localhost:3000')}/portal/pagamento-sucesso?caso_id={caso_id}",
            cancel_url=f"{os.environ.get('CORS_ORIGIN', 'http://localhost:3000')}/portal/casos/{caso_id}",
            customer_email=email_usuario,
            metadata={
                'caso_id': caso_id,
                'usuario_id': usuario_id
            }
        )
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': os.environ.get('CORS_ORIGIN', '*'),
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'checkout_url': checkout_session.url,
                'session_id': checkout_session.id
            })
        }
        
    except stripe.error.StripeError as e:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': os.environ.get('CORS_ORIGIN', '*'),
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': f'Erro no Stripe: {str(e)}'})
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