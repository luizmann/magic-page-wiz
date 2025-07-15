# Backend - Magic Page Wiz

Servidor Node.js/Express para o Magic Page Wiz.

## 🚀 Início Rápido

```bash
npm install
npm run dev
```

## 🔧 Configuração

### Variáveis de Ambiente
Copie `.env.example` para `.env` e configure:

```bash
cp ../.env.example .env
```

### Dependências
- Express.js - Framework web
- CORS - Cross-origin resource sharing
- Helmet - Segurança HTTP
- Compression - Compressão gzip
- Dotenv - Variáveis de ambiente

## 📡 API

### Endpoints

#### Health Check
```
GET /api/health
```

#### Salvar Página
```
POST /api/pages
Content-Type: application/json

{
  "title": "Minha Página",
  "html": "<html>...</html>",
  "blocks": [...]
}
```

#### Listar Páginas
```
GET /api/pages
```

## 🛡️ Segurança

- Helmet para headers de segurança
- CORS configurado
- Validação de entrada
- Limitação de tamanho de upload (10MB)

## 🚀 Deploy

### Render
Configurado automaticamente via `render.yaml`

### Manual
```bash
npm start
```

## 🔮 Futuras Funcionalidades

- [ ] Autenticação de usuários
- [ ] Banco de dados (PostgreSQL)
- [ ] Upload de imagens para cloud
- [ ] Templates predefinidos
- [ ] API de analytics