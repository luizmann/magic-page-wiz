# Magic Page Wiz 🎨

**Criador de Páginas e Landing Pages** - Uma ferramenta completa para criar páginas web profissionais sem necessidade de conhecimentos técnicos.

![Magic Page Wiz Interface](https://github.com/user-attachments/assets/cab71207-e04e-4f0a-8f29-4d5909f2cc06)

## ✨ Funcionalidades

### 🌍 Seleção de Idioma
- Interface multilíngue (Português, Inglês, Espanhol)
- Preferências salvas no localStorage
- Adaptação dinâmica de conteúdo

### 📁 Drag and Drop
- Área para arrastar e soltar arquivos
- Visualização dos arquivos selecionados
- Suporte a múltiplos formatos
- Pronto para expansão futura

### 👁️ Preview Dinâmico
- Pré-visualização em tempo real
- Atualização instantânea das alterações
- Visualização antes da publicação

### ✍️ Editor de Texto Rico (WYSIWYG)
- Formatação de texto (negrito, itálico, sublinhado)
- Títulos e parágrafos
- Listas e alinhamento
- Inserção de links, imagens e tabelas
- Atalhos de teclado

### 🎨 Templates de Página
- **Página em Branco** - Comece do zero
- **Landing Page** - Página de vendas otimizada
- **Artigo de Blog** - Post informativo
- **Portfólio** - Showcase pessoal
- **Página Empresarial** - Apresentação corporativa

### 🖼️ Upload de Imagens
- Upload com drag & drop
- Visualização de miniaturas
- Inserção direta no editor
- Suporte a múltiplos formatos

### 🚀 Publicação Automática
- Geração de URL única
- Páginas responsivas e otimizadas
- Estatísticas (contagem de palavras, tempo de leitura)
- Download como HTML

![Página Publicada](https://github.com/user-attachments/assets/35e3f631-1bee-4154-82b6-5b06514f5a38)

## 🚀 Como Usar

### Iniciando
1. Abra o arquivo `index.html` em seu navegador
2. Escolha seu idioma preferido
3. Selecione um template ou comece do zero

### Criando Conteúdo
1. **Escolha um Template**: Clique em um dos templates disponíveis
2. **Edite o Conteúdo**: Use o editor WYSIWYG para personalizar
3. **Adicione Imagens**: Faça upload de imagens e insira no texto
4. **Visualize**: Acompanhe as mudanças em tempo real no painel de preview
5. **Publique**: Clique em "Publicar" para gerar sua página

### Atalhos de Teclado
- `Ctrl/Cmd + B` - Negrito
- `Ctrl/Cmd + I` - Itálico  
- `Ctrl/Cmd + U` - Sublinhado
- `Ctrl/Cmd + K` - Inserir link
- `Ctrl/Cmd + S` - Salvar projeto
- `Ctrl/Cmd + P` - Publicar página
- `Ctrl/Cmd + N` - Nova página
- `Esc` - Fechar modais

## 🛠️ Tecnologias

- **HTML5** - Estrutura moderna e semântica
- **CSS3** - Design responsivo e animations
- **JavaScript Puro** - Sem dependências externas
- **LocalStorage** - Persistência de dados local
- **Drag & Drop API** - Interface intuitiva
- **FileReader API** - Manipulação de arquivos

## 📁 Estrutura do Projeto

```
magic-page-wiz/
├── index.html                          # Página principal
├── src/
│   ├── components/                     # Componentes JavaScript
│   │   ├── languageSelector.js         # Seletor de idioma
│   │   ├── dragDrop.js                 # Drag and drop
│   │   ├── richTextEditor.js           # Editor WYSIWYG
│   │   ├── dynamicPreview.js           # Preview em tempo real
│   │   ├── templateSelector.js         # Templates de página
│   │   ├── imageUpload.js              # Upload de imagens
│   │   └── autoPublish.js              # Sistema de publicação
│   ├── styles/
│   │   └── main.css                    # Estilos principais
│   └── scripts/
│       └── main.js                     # Coordenação da aplicação
└── README.md
```

## 🎯 Funcionalidades Avançadas

### Auto-Save
- Salvamento automático a cada 2 segundos
- Recuperação de rascunhos ao recarregar
- Proteção contra perda de dados

### Sistema de Notificações
- Feedback visual para ações do usuário
- Notificações de sucesso/erro
- Mensagens multilíngues

### Responsividade
- Layout adaptável para mobile e desktop
- Interface otimizada para touch
- Design moderno e acessível

### Extensibilidade
- Arquitetura modular
- Fácil adição de novos componentes
- API pública para integração

## 🔧 Instalação e Execução

### Método 1: Abrir Diretamente
```bash
# Clone o repositório
git clone https://github.com/luizmann/magic-page-wiz.git
cd magic-page-wiz

# Abra index.html no seu navegador
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### Método 2: Servidor Local
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (se tiver live-server instalado)
npx live-server

# Acesse http://localhost:8000
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- Ícones emoji para interface amigável
- Comunidade open source por inspiração e suporte
- Todos os contribuidores e usuários

---

**Magic Page Wiz** - Transformando ideias em páginas web profissionais! ✨
