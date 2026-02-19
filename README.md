# Site E-commerce Perito TI Judicial

Site profissional para Perito Técnico de TI Judicial usando arquitetura serverless na AWS.

## 🏗️ Arquitetura

### Frontend
- **Framework**: Next.js 14 com TypeScript
- **Estilização**: Tailwind CSS
- **Hosting**: AWS S3 + CloudFront
- **Autenticação**: AWS Cognito

### Backend
- **API**: Amazon API Gateway
- **Compute**: AWS Lambda (Python)
- **Banco de Dados**: Amazon DynamoDB
- **Armazenamento**: AWS S3
- **E-mail**: Amazon SES
- **Pagamentos**: Stripe

## 📁 Estrutura do Projeto

```
/
├── backend/
│   ├── auth/
│   │   └── cadastro.py
│   ├── casos/
│   │   └── submissao.py
│   ├── documentos/
│   │   └── upload.py
│   ├── pagamentos/
│   │   └── stripe_payment.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   └── package.json
├── template.yaml
└── README.md
```

## 🚀 Deploy

### Pré-requisitos

1. **AWS CLI** configurado
2. **SAM CLI** instalado
3. **Node.js** 18+ instalado
4. **Python** 3.9+ instalado
5. Conta **Stripe** (para pagamentos)

### Passos para Deploy

#### 1. Deploy da Infraestrutura AWS

```bash
# Instalar dependências Python
cd backend
pip install -r requirements.txt -t .

# Voltar para raiz do projeto
cd ..

# Build e deploy com SAM
sam build
sam deploy --guided
```

Durante o `sam deploy --guided`, configure:
- Stack name: `perito-ti-site`
- AWS Region: `us-east-1` (ou sua preferência)
- CorsOrigin: URL do seu domínio (ex: `https://seudominio.com`)
- StripeSecretKey: Sua chave secreta do Stripe

#### 2. Deploy do Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Criar arquivo .env.local com:
# NEXT_PUBLIC_API_URL=https://sua-api-gateway-url/prod
# NEXT_PUBLIC_USER_POOL_ID=seu-user-pool-id
# NEXT_PUBLIC_USER_POOL_CLIENT_ID=seu-client-id

# Build para produção
npm run build

# Upload para S3 (substitua pelo nome do seu bucket)
aws s3 sync out/ s3://seu-bucket-frontend --delete
```

#### 3. Configurar CloudFront

1. Criar distribuição CloudFront apontando para o bucket S3
2. Configurar certificado SSL
3. Configurar domínio personalizado

#### 4. Configurar SES

```bash
# Verificar domínio de e-mail
aws ses verify-email-identity --email-address perito@seudominio.com
```

## ⚙️ Configurações Adicionais

### Stripe Webhooks

Configure webhook no Stripe para:
- URL: `https://sua-api-gateway-url/prod/webhooks/stripe`
- Eventos: `checkout.session.completed`, `payment_intent.succeeded`

### Domínio Personalizado

1. Registrar domínio no Route 53
2. Criar certificado SSL no ACM
3. Configurar CloudFront com domínio personalizado
4. Atualizar CORS_ORIGIN no template.yaml

### Monitoramento

- **CloudWatch**: Logs das funções Lambda
- **X-Ray**: Tracing distribuído
- **CloudTrail**: Auditoria de API calls

## 🔒 Segurança

### Implementado
- ✅ Autenticação via Cognito
- ✅ Autorização por JWT
- ✅ CORS configurado
- ✅ Validação de entrada
- ✅ Princípio de menor privilégio (IAM)
- ✅ Bucket S3 privado
- ✅ URLs pré-assinadas para upload

### Recomendações Adicionais
- Configurar WAF no CloudFront
- Implementar rate limiting
- Configurar alertas CloudWatch
- Backup automático do DynamoDB

## 📊 Custos Estimados (AWS)

Para ~1000 usuários/mês:
- **Lambda**: ~$5/mês
- **DynamoDB**: ~$10/mês
- **S3**: ~$5/mês
- **CloudFront**: ~$10/mês
- **API Gateway**: ~$15/mês
- **Cognito**: ~$5/mês
- **SES**: ~$1/mês

**Total estimado**: ~$51/mês

## 🛠️ Desenvolvimento Local

### Backend
```bash
cd backend
sam local start-api
```

### Frontend
```bash
cd frontend
npm run dev
```

## 📝 Funcionalidades

### Públicas
- [x] Homepage com apresentação
- [x] Página de serviços
- [x] Sobre o perito
- [x] Blog (estrutura)
- [x] Formulário de contato

### Portal do Cliente
- [x] Autenticação (login/cadastro)
- [x] Dashboard
- [ ] Gestão de casos
- [ ] Upload de documentos
- [ ] Histórico de pagamentos
- [ ] Comunicação com perito

### Admin (Futuro)
- [ ] Gestão de casos
- [ ] Gestão de clientes
- [ ] Relatórios
- [ ] Configurações

## 🤝 Suporte

Para dúvidas sobre implementação:
1. Verificar logs no CloudWatch
2. Testar APIs via Postman
3. Validar configurações no AWS Console

## 📄 Licença

Projeto proprietário - Todos os direitos reservados.