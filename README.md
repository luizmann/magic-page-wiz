# Magic Page Wiz 🧙‍♂️

Uma ferramenta visual para criar páginas web usando drag and drop com JavaScript puro.

![Magic Page Wiz Interface](https://github.com/user-attachments/assets/968d46ca-7e2d-40df-af9b-6fe5df18866c)

## 🎯 Funcionalidades

- **Drag and Drop**: Interface intuitiva para arrastar e soltar blocos
- **Blocos Disponíveis**:
  - 📋 Cabeçalho (títulos e subtítulos)
  - 📝 Texto (parágrafos editáveis)
  - 🖼️ Imagem (upload de arquivos)
  - 🔘 Botão (botões interativos)
- **Edição Inline**: Clique para editar qualquer conteúdo
- **Geração de HTML**: Exporta código limpo e responsivo
- **Design Responsivo**: Funciona em desktop e mobile

## 🚀 Como Usar

### Acesso Rápido
Abra o arquivo `frontend/public/drag-and-drop.html` em seu navegador para começar a usar imediatamente!

### Passos:
1. **Arraste blocos** da barra lateral para a área de construção
2. **Edite conteúdo** clicando diretamente nos elementos
3. **Gerencie blocos** usando o botão × para excluir
4. **Gere HTML** usando o botão "🚀 Gerar HTML"
5. **Baixe sua página** ou copie o código gerado

## 🛠️ Configuração para Desenvolvimento

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/luizmann/magic-page-wiz.git
cd magic-page-wiz

# Instale dependências do frontend
cd frontend
npm install

# Instale dependências do backend
cd ../backend
npm install
```

### Desenvolvimento
```bash
# Frontend (desenvolvimento)
cd frontend
npm run dev

# Backend (desenvolvimento)
cd backend
npm run dev

# Produção
npm run build
npm start
```

## 🔧 Estrutura do Projeto

```
magic-page-wiz/
├── frontend/
│   ├── public/
│   │   └── drag-and-drop.html    # Interface principal
│   ├── src/
│   ├── package.json
│   └── README.md
├── backend/
│   ├── src/
│   │   └── server.js            # Servidor Express
│   ├── package.json
│   └── README.md
├── .env.example                 # Variáveis de ambiente
├── render.yaml                  # Configuração Render
└── README.md
```

## 🌐 Deploy no Render

### Configuração Automática
Este projeto está pronto para deploy no Render com configuração automática.

### Variáveis de Ambiente
Configure as seguintes variáveis no Render:
- `NODE_ENV=production`
- `PORT=10000` (configurado automaticamente)

### Deploy Manual
1. Conecte seu repositório GitHub ao Render
2. Configure como Web Service
3. Use as configurações do `render.yaml`
4. Deploy automático

## 📚 Documentação Técnica

### Recursos Técnicos
- JavaScript puro (sem dependências)
- HTML5 Drag and Drop API
- CSS3 com animações e gradientes
- Design responsivo
- Edição inline com contenteditable
- Upload de arquivos com FileReader API

### Próximas Funcionalidades
- [ ] Mais tipos de blocos (vídeo, formulários)
- [ ] Temas personalizáveis
- [ ] Salvamento de projetos
- [ ] Integração com APIs
- [ ] Exportação para diferentes formatos

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🎉 Demo

Acesse a demo online: [Magic Page Wiz Demo](https://magic-page-wiz.onrender.com)

---

Feito com ❤️ por [luizmann](https://github.com/luizmann)
