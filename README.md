# Magic Page Wiz

Magic Page Wiz é uma solução moderna para criação e gestão de landing pages inteligentes, integradas a funis de vendas, automações e recursos de inteligência artificial. Ideal para times de marketing, agências e operações omnichannel que buscam conversão e automação avançada.

---

## ✨ Visão Geral

- **Frontend:** Páginas dinâmicas com templates editáveis para landing pages e formulários inteligentes
- **Backend:** Node.js, Express, sistema de importação automatizada, gestão de leads via JSON
- **Integrações:** CJ Dropshipping, Shopify, automação de produtos e geração de páginas
- **Recursos:** Templates editáveis, importação automatizada de produtos, formulários dinâmicos, APIs RESTful
- **Pronto para Produção:** Docker Compose, documentação completa, arquitetura modular, testes automatizados

---

## 🛠️ Tecnologias Principais

- **Frontend:** HTML5, CSS3, JavaScript, templates responsivos
- **Backend:** Node.js, Express, JavaScript
- **Integrações:** CJ Dropshipping API, Shopify API, Puppeteer, Cheerio
- **Outros:** Jest para testes, Express para APIs RESTful, arquitetura modular

---

## 📦 Estrutura de Pastas

```
magic-page-wiz/
├── services/
│   ├── cj-dropshipping.js       # Integração CJ Dropshipping
│   ├── shopify.js               # Integração Shopify  
│   └── page-generator.js        # Geração automática de páginas
├── public/
│   ├── produtos/                # Páginas de produtos geradas
│   ├── js/                      # JavaScript frontend
│   ├── css/                     # Estilos CSS
│   ├── index.html               # Página principal
│   └── builder.html             # Construtor de páginas
├── __tests__/                   # Testes automatizados
├── docker-compose.yml           # Orquestração Docker
├── Dockerfile                   # Container principal
├── server.js                    # Servidor Express principal
└── README.md                    # Esta documentação
```

---

## 🚀 Instalação e Execução

### 1. Pré-requisitos:
- Docker e Docker Compose instalados
- Node.js 14+ (para desenvolvimento local)

### 2. Clone o repositório:
```bash
git clone https://github.com/luizmann/magic-page-wiz.git
cd magic-page-wiz
```

### 3. Configuração via Docker (Recomendado):
```bash
# Subir toda a stack
docker-compose up --build

# Executar em background
docker-compose up -d --build
```

### 4. Configuração Local (Desenvolvimento):
```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Iniciar servidor
npm run dev
```

### 5. Acesse:
- **Landing Page:** http://localhost:3000
- **Construtor:** http://localhost:3000/builder
- **API:** http://localhost:3000/api
- **Health Check:** http://localhost:3000/health

> 📖 **Guia Detalhado Windows:** Veja [RODAR-LOCALMENTE.md](./RODAR-LOCALMENTE.md) para instruções passo-a-passo.

---

## 🔐 Segurança

- Validação de entrada em todas as APIs
- Sanitização de dados de produto importados
- Headers de segurança configurados no Express
- Logs de acesso e auditoria de operações
- Proteção contra XSS e CSRF em formulários

---

## 🌐 Multilíngue

- Interface preparada para internacionalização
- Suporte a múltiplos idiomas via templates
- Detecção automática de idioma do browser
- Páginas de produto com metadados multilíngue

---

## 🧩 Funcionalidades Principais

### 🎯 Criação de Landing Pages
- **Templates Responsivos:** Páginas otimizadas para conversão
- **Construtor Visual:** Interface drag-and-drop para personalização
- **Geração Automática:** Criação de páginas a partir de produtos importados

### 📦 Importação de Produtos
- **CJ Dropshipping:** Integração via API oficial e scraping
- **Shopify:** Sincronização com lojas Shopify existentes
- **Múltiplos Métodos:** API, Puppeteer e Cheerio para máxima flexibilidade

### 📊 Gestão de Leads
- **Formulários Inteligentes:** Captura otimizada de leads
- **Gestão via JSON:** Sistema simples e eficiente de armazenamento
- **Exportação de Dados:** Integração fácil com CRMs externos

### 🔄 Automações
- **Geração Automática:** Páginas criadas automaticamente após importação
- **Webhooks:** Notificações para sistemas externos
- **APIs RESTful:** Integração com ferramentas de marketing

---

## 🔄 Integrações Externas

### 🛒 **CJ Dropshipping**
- Importação via API oficial v2.0
- Scraping com Puppeteer para produtos específicos
- Sincronização de preços e estoque

### 🏪 **Shopify**
- Conexão com Shopify Admin API
- Importação de catálogos completos
- Sincronização de metadados de produto

### 📡 **APIs e Webhooks**
- Endpoints RESTful documentados
- Webhooks para notificações externas
- Integração com ferramentas de automação

---

## 📝 Exemplos de Uso

### 🎯 **Fluxo de Captação Básico:**
1. **Configure as credenciais** nos arquivos `.env`
2. **Importe produtos** via API CJ Dropshipping ou Shopify
3. **Gere landing pages** automaticamente para cada produto
4. **Personalize páginas** usando o construtor visual
5. **Capture leads** através dos formulários integrados

### 🚀 **Exemplo de Importação CJ Dropshipping:**
```bash
curl -X POST http://localhost:3000/api/import/cj \
  -H "Content-Type: application/json" \
  -d '{
    "method": "api",
    "config": {
      "email": "seu-email@exemplo.com",
      "password": "sua-senha",
      "accessToken": "seu-token"
    },
    "options": {
      "page": 1,
      "limit": 10
    }
  }'
```

### 🏪 **Exemplo de Importação Shopify:**
```bash
curl -X POST http://localhost:3000/api/import/shopify \
  -H "Content-Type: application/json" \
  -d '{
    "method": "api",
    "config": {
      "shopDomain": "sua-loja.myshopify.com",
      "accessToken": "seu-token-shopify"
    },
    "options": {
      "limit": 20
    }
  }'
```

---

## 🐳 Docker e Deploy

### 📋 **Docker Compose (Recomendado)**
```bash
# Iniciar todos os serviços
docker-compose up -d

# Visualizar logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

### 🔧 **Variáveis de Ambiente**
Configure no arquivo `.env`:
```env
# Servidor
PORT=3000
NODE_ENV=production

# CJ Dropshipping
CJ_EMAIL=seu-email@exemplo.com
CJ_PASSWORD=sua-senha
CJ_ACCESS_TOKEN=seu-token

# Shopify
SHOPIFY_SHOP_DOMAIN=sua-loja.myshopify.com
SHOPIFY_ACCESS_TOKEN=seu-token-shopify

# Puppeteer
PUPPETEER_HEADLESS=true
PUPPETEER_SKIP_DOWNLOAD=true
```

---

## 🖥️ Documentação da API

### 📊 **Endpoints Principais**

#### Health Check
```
GET /health
```

#### Importação de Produtos
```
POST /api/import/cj          # CJ Dropshipping
POST /api/import/shopify     # Shopify
GET  /api/import/examples    # Exemplos de uso
```

#### Gestão de Páginas
```
GET  /produtos/:slug         # Página específica
GET  /api/produtos          # Lista todas as páginas
```

#### Páginas Frontend
```
GET  /                      # Página principal
GET  /builder               # Construtor de páginas
```

### 📖 **Documentação Detalhada**
- **Swagger/OpenAPI:** Acesse `/api/docs` quando o servidor estiver rodando
- **Exemplos:** Endpoint `/api/import/examples` com payloads de exemplo
- **Testes:** Veja os arquivos em `__tests__/` para exemplos de uso

---

## 🧪 Testes e Qualidade

### ✅ **Executar Testes**
```bash
# Todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Teste específico
npx jest __tests__/api.test.js
```

### 📊 **Cobertura de Testes**
- **67 testes** em 4 suítes
- Cobertura de APIs, serviços e integração
- Testes end-to-end automatizados

---

## 🚀 Deploy e Produção

### ☁️ **Deploy em Cloud**
1. **Configure as variáveis de ambiente** no seu provedor
2. **Use Docker Compose** para orquestração
3. **Configure reverse proxy** (Nginx/Traefik)
4. **Monitor logs** e performance

### 🔒 **Segurança em Produção**
- Use HTTPS sempre
- Configure CORS adequadamente
- Mantenha dependências atualizadas
- Monitor logs de acesso

### 📈 **Monitoramento**
- Health check endpoint disponível
- Logs estruturados para análise
- Métricas de performance da API

---

## 💬 Suporte e Contato

### 🐛 **Reportar Bugs**
Abra uma issue em: https://github.com/luizmann/magic-page-wiz/issues

### 📚 **Documentação Adicional**
- [RODAR-LOCALMENTE.md](./RODAR-LOCALMENTE.md) - Guia detalhado Windows
- [CONFIG_EXAMPLES.md](./CONFIG_EXAMPLES.md) - Exemplos de configuração
- Testes em `__tests__/` - Exemplos práticos de uso

### 🤝 **Contribuições**
1. Fork o repositório
2. Crie uma branch para sua feature
3. Adicione testes para novas funcionalidades
4. Execute `npm test` para validar
5. Submeta um Pull Request

---

**Magic Page Wiz — Landing pages inteligentes para conversão e automação!** 🚀