# Como Rodar o Magic Page Wiz Localmente no Windows

Este guia explica passo a passo como configurar e executar o Magic Page Wiz no Windows, especialmente para usuários sem experiência com terminal.

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

### 1. Node.js (Obrigatório)
- **Download:** https://nodejs.org/
- **Versão recomendada:** LTS (Long Term Support)
- **Versão mínima:** 14.0.0 ou superior

**Como verificar se já está instalado:**
1. Abra o Prompt de Comando (cmd)
2. Digite: `node --version`
3. Se aparecer algo como `v18.17.0`, está instalado
4. Digite: `npm --version` 
5. Se aparecer algo como `9.6.7`, o npm também está funcionando

### 2. Git (Recomendado)
- **Download:** https://git-scm.com/download/win
- Necessário apenas se você quiser clonar o repositório

## 🚀 Método Rápido (Um Clique)

### Opção 1: Execução Automática
1. **Baixe o projeto** (via Git ou ZIP do GitHub)
2. **Abra a pasta** `magic-page-wiz` no Windows Explorer
3. **Clique duas vezes** no arquivo `start-local.bat`
4. **Aguarde** a instalação e inicialização automática
5. **Acesse** http://localhost:3000 no seu navegador

> ⚠️ **Nota:** Na primeira execução, pode demorar alguns minutos para baixar as dependências.

### O que o script faz automaticamente:
- ✅ Cria a pasta `public/produtos` se não existir
- ✅ Cria o arquivo `.env` baseado no `.env.example`
- ✅ Instala todas as dependências (`npm install`)
- ✅ Inicia o servidor de desenvolvimento

## 🔧 Método Manual (Passo a Passo)

Se preferir fazer manualmente ou se o método automático não funcionar:

### Passo 1: Obter o Código
```bash
# Opção A: Clonar com Git
git clone https://github.com/luizmann/magic-page-wiz.git
cd magic-page-wiz

# Opção B: Baixar ZIP
# 1. Vá para https://github.com/luizmann/magic-page-wiz
# 2. Clique em "Code" > "Download ZIP"
# 3. Extraia o arquivo ZIP
# 4. Abra a pasta extraída
```

### Passo 2: Preparar o Ambiente
```bash
# Executar script de preparação
prepare-local.bat

# OU fazer manualmente:
# 1. Criar pasta: mkdir public\produtos
# 2. Copiar arquivo: copy .env.example .env
```

### Passo 3: Instalar Dependências
```bash
npm install
```

### Passo 4: Configurar Variáveis de Ambiente
1. Abra o arquivo `.env` com o Bloco de Notas
2. Configure suas credenciais (opcional para testes básicos):

```env
# Configuração do servidor
PORT=3000

# APIs (opcional para funcionalidades completas)
CJ_EMAIL=seu-email@exemplo.com
CJ_PASSWORD=sua-senha
CJ_ACCESS_TOKEN=seu-token-cj

SHOPIFY_SHOP_DOMAIN=sua-loja.myshopify.com
SHOPIFY_ACCESS_TOKEN=shpat_seu-token-shopify
```

### Passo 5: Iniciar o Servidor
```bash
npm run dev
```

### Passo 6: Acessar a Aplicação
Abra seu navegador e acesse: http://localhost:3000

## 🌐 Testando a Aplicação

### Endpoints Básicos para Testar:

1. **Verificação de Saúde:**
   - URL: http://localhost:3000/health
   - Deve retornar: `{"status":"OK","message":"Magic Page Wiz is running!"}`

2. **Listar Produtos:**
   - URL: http://localhost:3000/api/produtos
   - Lista os produtos disponíveis

3. **Página Principal:**
   - URL: http://localhost:3000
   - Interface principal da aplicação

4. **Construtor de Páginas:**
   - URL: http://localhost:3000/builder.html
   - Ferramenta para criar páginas

## 🧪 Executando Testes

Para verificar se tudo está funcionando corretamente:

```bash
npm test
```

Todos os testes devem passar (PASS).

## ❌ Problemas Comuns e Soluções

### Erro: "node não é reconhecido como comando"
**Solução:** Instale o Node.js do site oficial https://nodejs.org/

### Erro: "porta 3000 já está em uso"
**Soluções:**
1. Feche outros programas que possam estar usando a porta 3000
2. Ou mude a porta no arquivo `.env`: `PORT=3001`

### Erro: "npm install falha"
**Soluções:**
1. Verifique sua conexão com a internet
2. Execute como administrador:
   - Clique com botão direito no cmd
   - Selecione "Executar como administrador"
3. Limpe o cache do npm: `npm cache clean --force`

### Erro: "PUPPETEER_SKIP_DOWNLOAD"
**Solução:** Execute antes do npm install:
```bash
set PUPPETEER_SKIP_DOWNLOAD=true
npm install
```

**Nota:** Os scripts automáticos (`start-local.bat`) já incluem essa configuração.

### Scripts .bat não executam
**Soluções:**
1. Verifique se está na pasta correta do projeto
2. Execute como administrador
3. Use o Prompt de Comando:
   ```bash
   cd caminho\para\magic-page-wiz
   start-local.bat
   ```

## 📁 Estrutura de Pastas

Após a configuração, sua pasta deve ter:

```
magic-page-wiz/
├── prepare-local.bat          # Script de preparação
├── start-local.bat           # Script de inicialização
├── .env                      # Suas configurações (criado automaticamente)
├── .env.example              # Exemplo de configurações
├── package.json              # Configuração do projeto
├── server.js                 # Servidor principal
├── public/
│   ├── produtos/            # Páginas de produtos (criado automaticamente)
│   ├── index.html           # Página inicial
│   └── builder.html         # Construtor de páginas
├── services/                # Serviços da aplicação
└── __tests__/              # Testes automatizados
```

## 🔄 Comandos Úteis

### Parar o Servidor
- **No terminal:** Pressione `Ctrl + C`
- **Fechando a janela:** Simplesmente feche a janela do terminal

### Reiniciar o Servidor
```bash
# Pare o servidor (Ctrl+C) e execute novamente:
npm run dev

# Ou use o script:
start-local.bat
```

### Limpar e Reinstalar
```bash
# Limpar módulos instalados
rmdir /s node_modules
del package-lock.json

# Reinstalar
npm install
```

## 🆘 Suporte

Se você encontrar problemas:

1. **Verifique os pré-requisitos** (Node.js instalado)
2. **Consulte a seção de problemas comuns** acima
3. **Execute os testes** para verificar se há erros: `npm test`
4. **Crie uma issue** no GitHub: https://github.com/luizmann/magic-page-wiz/issues

## 📝 Dicas Adicionais

- **Primeira execução:** Pode demorar mais tempo para baixar dependências
- **Atualizações:** Execute `git pull` periodicamente para obter atualizações
- **Backup:** Faça backup do arquivo `.env` antes de atualizações
- **Desenvolvimento:** Use `npm run test:watch` para executar testes continuamente

---

**🎉 Pronto!** Agora você pode usar o Magic Page Wiz para criar páginas e importar produtos automaticamente!