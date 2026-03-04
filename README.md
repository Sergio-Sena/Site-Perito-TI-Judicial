# ⚖️ Site Perito TI Judicial

[![Status](https://img.shields.io/badge/Status-🚧%20Em%20Desenvolvimento-yellow)]()
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Python](https://img.shields.io/badge/Python-3.9-blue)](https://python.org/)
[![AWS](https://img.shields.io/badge/AWS-Serverless-orange)](https://aws.amazon.com/)
[![License](https://img.shields.io/badge/License-Proprietário-red.svg)]()

> Site profissional para Perito Técnico de TI Judicial com arquitetura serverless AWS.

---

## ✨ Features

### 🌐 **Site Público**
- Homepage com apresentação profissional
- Página de serviços oferecidos
- Sobre o perito (experiência, certificações)
- Blog técnico (estrutura)
- Formulário de contato

### 🔐 **Portal do Cliente**
- Autenticação segura (AWS Cognito)
- Dashboard personalizado
- Gestão de casos (planejado)
- Upload de documentos (planejado)
- Histórico de pagamentos (planejado)
- Comunicação com perito (planejado)

### 💳 **Pagamentos**
- Integração com Stripe
- Checkout seguro
- Webhooks para confirmação
- Histórico de transações

---

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14** - Framework React com TypeScript
- **Tailwind CSS** - Utility-first CSS
- **AWS Amplify** - Autenticação
- **Axios** - HTTP client

### **Backend**
- **Python 3.9** - Runtime Lambda
- **AWS Lambda** - Compute serverless
- **API Gateway** - REST API
- **DynamoDB** - Banco NoSQL
- **S3** - Armazenamento de arquivos
- **SES** - Envio de emails
- **Cognito** - Autenticação

### **Pagamentos**
- **Stripe** - Gateway de pagamento
- **Webhooks** - Confirmação automática

---

## 🚀 Quick Start

### **Pré-requisitos**
- AWS CLI configurado
- SAM CLI instalado
- Node.js 18+
- Python 3.9+
- Conta Stripe

### **1. Clone o repositório**
```bash
git clone https://github.com/Sergio-Sena/Site-Perito-TI-Judicial.git
cd Site-Perito-TI-Judicial
```

### **2. Deploy Backend (AWS SAM)**
```bash
cd backend
pip install -r requirements.txt -t .
cd ..

sam build
sam deploy --guided
```

**Configurações do deploy:**
- Stack name: `perito-ti-site`
- AWS Region: `us-east-1`
- CorsOrigin: URL do domínio
- StripeSecretKey: Chave Stripe

### **3. Deploy Frontend**
```bash
cd frontend
npm install

# Criar .env.local
# NEXT_PUBLIC_API_URL=https://sua-api-gateway-url/prod
# NEXT_PUBLIC_USER_POOL_ID=seu-user-pool-id
# NEXT_PUBLIC_USER_POOL_CLIENT_ID=seu-client-id

npm run build
aws s3 sync out/ s3://seu-bucket-frontend --delete
```

### **4. Configurar CloudFront**
1. Criar distribuição apontando para S3
2. Configurar certificado SSL (ACM)
3. Configurar domínio personalizado

---

## 📁 Estrutura do Projeto

```
Site-Perito-TI-Judicial/
├── backend/
│   ├── auth/
│   │   └── cadastro.py        # Registro de usuários
│   ├── casos/
│   │   └── submissao.py       # Submissão de casos
│   ├── documentos/
│   │   └── upload.py          # Upload de arquivos
│   ├── pagamentos/
│   │   └── stripe_payment.py  # Integração Stripe
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/               # Next.js App Router
│   │   ├── components/        # Componentes React
│   │   ├── lib/               # Utilitários
│   │   └── types/             # TypeScript types
│   └── package.json
├── template.yaml              # AWS SAM template
└── README.md
```

---

## ⚙️ Configurações

### **Stripe Webhooks**
Configure no dashboard Stripe:
- URL: `https://sua-api-gateway-url/prod/webhooks/stripe`
- Eventos: `checkout.session.completed`, `payment_intent.succeeded`

### **Amazon SES**
```bash
aws ses verify-email-identity --email-address perito@seudominio.com
```

### **Domínio Personalizado**
1. Registrar domínio no Route 53
2. Criar certificado SSL no ACM
3. Configurar CloudFront com domínio
4. Atualizar CORS_ORIGIN no template.yaml

---

## 🔒 Segurança

### **Implementado**
- ✅ Autenticação via AWS Cognito
- ✅ Autorização por JWT
- ✅ CORS configurado
- ✅ Validação de entrada
- ✅ IAM com menor privilégio
- ✅ Bucket S3 privado
- ✅ URLs pré-assinadas para upload

### **Recomendações**
- [ ] WAF no CloudFront
- [ ] Rate limiting
- [ ] Alertas CloudWatch
- [ ] Backup automático DynamoDB

---

## 📊 Custos Estimados (AWS)

Para ~1000 usuários/mês:

| Serviço | Custo/mês |
|---------|-----------|
| Lambda | $5 |
| DynamoDB | $10 |
| S3 | $5 |
| CloudFront | $10 |
| API Gateway | $15 |
| Cognito | $5 |
| SES | $1 |
| **Total** | **~$51** |

---

## 🛠️ Desenvolvimento Local

### **Backend**
```bash
cd backend
sam local start-api
```

### **Frontend**
```bash
cd frontend
npm run dev
```

Acesse: http://localhost:3000

---

## 📝 Funcionalidades

### ✅ **Implementado**
- [x] Homepage com apresentação
- [x] Página de serviços
- [x] Sobre o perito
- [x] Blog (estrutura)
- [x] Formulário de contato
- [x] Autenticação (login/cadastro)
- [x] Dashboard cliente

### 🔄 **Em Desenvolvimento**
- [ ] Gestão de casos
- [ ] Upload de documentos
- [ ] Histórico de pagamentos
- [ ] Comunicação com perito
- [ ] Painel admin

---

## 🗺️ Roadmap

### **Fase 1: MVP** (Concluído)
- [x] Site público
- [x] Autenticação
- [x] Dashboard básico

### **Fase 2: Portal Cliente** (Em andamento)
- [ ] Gestão de casos
- [ ] Upload de documentos
- [ ] Pagamentos

### **Fase 3: Admin**
- [ ] Painel administrativo
- [ ] Gestão de clientes
- [ ] Relatórios

---

## 🐛 Troubleshooting

### **Backend não conecta**
- Verificar logs no CloudWatch
- Confirmar API Gateway URL
- Testar com Postman

### **Autenticação falha**
- Verificar User Pool ID e Client ID
- Confirmar configuração Cognito
- Checar CORS no API Gateway

### **Upload falha**
- Verificar permissões IAM
- Confirmar bucket S3 existe
- Checar presigned URL válida

---

## 🤝 Contribuição

Projeto proprietário - Contribuições mediante autorização.

---

## 📄 Licença

Todos os direitos reservados.

---

## 👨💻 Autor

**Sergio Sena**
- GitHub: [@Sergio-Sena](https://github.com/Sergio-Sena)
- LinkedIn: [Sergio Sena](https://linkedin.com/in/sergio-sena)
- Portfolio: [dev-cloud.sstechnologies-cloud.com](https://dev-cloud.sstechnologies-cloud.com)

---

<div align="center">

**⚖️ Perícia Técnica de TI com Excelência**

[📖 Docs](docs/) • [🐛 Issues](../../issues)

</div>
