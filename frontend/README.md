# Magic Page Wiz - Drag & Drop Elements

Sistema completo de elementos drag-and-drop inspirados no Elementor Pro para criação de páginas web incríveis.

## 🚀 Visão Geral

Este projeto fornece 50 elementos drag-and-drop prontos para uso, cada um com funcionalidade e visual básicos, além de um sistema completo de personalização de cores e documentação detalhada para integração React.

## 📁 Estrutura do Projeto

```
magic-page-wiz/
├── frontend/
│   ├── public/
│   │   └── drag-and-drop-elements.html    # Página principal com todos os 50 elementos
│   └── REACT_INTEGRATION.md               # Guia completo de integração React
└── README.md                             # Este arquivo
```

## 🎯 Funcionalidades

### ✨ 50 Elementos Implementados

#### Elementos Básicos (10)
1. **Botão** - Botões customizáveis com hover effects
2. **Título/Texto** - Headings e parágrafos estilizados
3. **Ícone** - Ícones com símbolos customizáveis
4. **Imagem** - Placeholders para imagens
5. **Divisor** - Linhas separadoras
6. **Espaçador** - Controle de espaçamento
7. **Vídeo** - Player de vídeo placeholder
8. **Mapa** - Integração com mapas
9. **Código HTML** - Inserção de HTML customizado
10. **Shortcode** - Sistema de shortcodes

#### Elementos Interativos (15)
11. **Acordeão** - Conteúdo expansível/colapsável
12. **Abas** - Sistema de tabs navegáveis
13. **Toggle** - Switches on/off
14. **Modal/Popup** - Janelas modais
15. **Dropdown** - Menus suspensos
16. **Slider/Carrossel** - Slides automáticos
17. **Galeria** - Grid de imagens
18. **Lightbox** - Visualização ampliada
19. **Caixa de Busca** - Campo de pesquisa
20. **Formulário de Login** - Autenticação
21. **Formulário de Contato** - Contato completo
22. **Formulário de Inscrição** - Newsletter
23. **Menu/Navegação** - Barra de navegação
24. **Breadcrumbs** - Trilha de navegação
25. **Ícones Sociais** - Links para redes sociais

#### Elementos Dinâmicos (15)
26. **Contador** - Números animados
27. **Timer/Countdown** - Cronômetro regressivo
28. **Barra de Progresso** - Indicadores de progresso
29. **Depoimentos** - Testimonials de clientes
30. **Tabela de Preços** - Planos e preços
31. **Call to Action** - Chamadas para ação
32. **Alert/Aviso** - Notificações importantes
33. **Citação** - Blockquotes estilizados
34. **Tabela** - Dados tabulares
35. **Lista** - Listas ordenadas/não ordenadas
36. **Timeline** - Linha do tempo
37. **Passos/Processo** - Fluxo de processos
38. **FAQ** - Perguntas frequentes
39. **Avaliações/Rating** - Sistema de estrelas
40. **Badge/Etiqueta** - Marcadores visuais

#### Elementos Avançados (10)
41. **Gráfico** - Charts em Canvas
42. **Calendário** - Visualização mensal
43. **Player de Áudio** - Controles de áudio
44. **Download de Arquivo** - Links para downloads
45. **Botões de Compartilhamento** - Redes sociais
46. **Widget do Tempo** - Informações meteorológicas
47. **Relógio** - Horário em tempo real
48. **QR Code** - Códigos QR
49. **Flip Box** - Efeito de rotação
50. **Texto Animado** - Animações CSS

### 🎨 Sistema de Personalização de Cores

- **6 cores customizáveis**: Primária, Secundária, Texto, Fundo, Destaque, Sucesso
- **CSS Variables**: Sistema dinâmico de cores
- **Painel de controle**: Interface visual para alteração
- **Reset automático**: Volta às cores padrão
- **Aplicação em tempo real**: Mudanças instantâneas

### 🖱️ Funcionalidade Drag & Drop

- **Elementos arrastáveis**: Todos os 50 elementos
- **Zona de destino**: Área para testar drops
- **Feedback visual**: Indicações durante o arraste
- **Sistema completo**: Pronto para integração

## 🛠️ Como Usar

### 1. Visualizar os Elementos

1. Abra o arquivo `frontend/public/drag-and-drop-elements.html` em qualquer navegador web moderno
2. Explore os 50 elementos disponíveis
3. Teste as funcionalidades interativas
4. Experimente o painel de personalização de cores

### 2. Integração React

Consulte o arquivo `frontend/REACT_INTEGRATION.md` para:

- **Componentes prontos**: 20+ componentes React funcionais
- **Sistema de temas**: ThemeProvider com CSS variables
- **Hooks customizados**: useDragAndDrop, useLocalStorage
- **Exemplos práticos**: Código completo de integração
- **Estratégias de implementação**: Diferentes abordagens

### 3. Customização

#### Modificar Cores
```javascript
// Exemplo de mudança programática
document.documentElement.style.setProperty('--primary-color', '#ff0000');
```

#### Adicionar Novos Elementos
```html
<div class="element-wrapper" draggable="true" data-element="custom">
    <div class="element-title">51. Elemento Customizado</div>
    <!-- Seu conteúdo aqui -->
</div>
```

## 🎨 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Styling avançado com Variables, Flexbox, Grid
- **JavaScript ES6+**: Funcionalidades interativas
- **Canvas API**: Gráficos e visualizações
- **Drag & Drop API**: Funcionalidade de arrastar e soltar
- **CSS Animations**: Efeitos visuais
- **Responsive Design**: Compatibilidade mobile

## 📱 Compatibilidade

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers
- ✅ Tablets

## 🔧 Recursos Técnicos

### Performance
- **CSS otimizado**: Uso eficiente de seletores
- **JavaScript modular**: Funções bem estruturadas
- **Lazy loading**: Carregamento otimizado
- **Responsive**: Design adaptativo

### Acessibilidade
- **ARIA labels**: Suporte a screen readers
- **Navegação por teclado**: Tab navigation
- **Contraste**: Cores acessíveis
- **Semantic HTML**: Estrutura semântica

### SEO
- **Meta tags**: Otimização para buscadores
- **Estrutura semântica**: HTML5 tags
- **Performance**: Carregamento rápido

## 🚀 Próximos Passos

1. **Backend Integration**: Conectar com APIs
2. **Database Storage**: Salvar configurações
3. **User Accounts**: Sistema de usuários
4. **Templates**: Modelos pré-definidos
5. **Export/Import**: Salvar/carregar páginas
6. **Advanced Editor**: Editor visual completo

## 📝 Licença

Este projeto é open-source e está disponível sob a licença MIT.

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas, sugestões ou problemas:

- Abra uma issue no GitHub
- Consulte a documentação completa
- Verifique os exemplos de código

---

Desenvolvido com ❤️ para criar páginas web incríveis!