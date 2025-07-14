// Template Selector Component
class TemplateSelector {
    constructor() {
        this.container = document.getElementById('template-selector');
        this.selectedTemplate = null;
        this.templates = {
            'blank': {
                name: 'Página em Branco',
                description: 'Comece do zero',
                content: '<p>Comece a escrever sua página aqui...</p>'
            },
            'landing': {
                name: 'Landing Page',
                description: 'Página de vendas',
                content: `
                    <h1>Título Principal da Sua Oferta</h1>
                    <p>Uma descrição convincente do seu produto ou serviço que capture a atenção do visitante e explique claramente o valor que você oferece.</p>
                    
                    <h2>Benefícios Principais</h2>
                    <ul>
                        <li>Benefício número um que resolve um problema específico</li>
                        <li>Benefício número dois que oferece valor único</li>
                        <li>Benefício número três que diferencia sua oferta</li>
                    </ul>
                    
                    <h2>Como Funciona</h2>
                    <p>Explique de forma simples e clara como seu produto ou serviço funciona e como ele vai ajudar o cliente a alcançar seus objetivos.</p>
                    
                    <h2>Depoimentos</h2>
                    <p><em>"Este produto mudou completamente a forma como trabalho. Recomendo a todos!" - Cliente Satisfeito</em></p>
                    
                    <h2>Oferta Especial</h2>
                    <p><strong>Por tempo limitado:</strong> Adquira agora com 50% de desconto!</p>
                    
                    <p style="text-align: center;">
                        <strong>👇 Clique no botão abaixo para garantir sua oferta 👇</strong>
                    </p>
                `
            },
            'blog': {
                name: 'Artigo de Blog',
                description: 'Post informativo',
                content: `
                    <h1>Título do Seu Artigo</h1>
                    
                    <p><em>Publicado em ${new Date().toLocaleDateString('pt-BR')}</em></p>
                    
                    <p>Introdução do artigo que apresenta o tema e desperta o interesse do leitor para continuar lendo o conteúdo.</p>
                    
                    <h2>Primeira Seção</h2>
                    <p>Desenvolva o primeiro ponto importante do seu artigo. Use parágrafos curtos e linguagem clara para manter o leitor engajado.</p>
                    
                    <h2>Segunda Seção</h2>
                    <p>Continue desenvolvendo o tema com informações relevantes e úteis. Adicione exemplos práticos quando possível.</p>
                    
                    <h3>Subsection Importante</h3>
                    <p>Detalhe aspectos específicos que merecem destaque especial.</p>
                    
                    <h2>Conclusão</h2>
                    <p>Resuma os pontos principais e ofereça uma reflexão final sobre o tema. Incentive o leitor a aplicar o conhecimento adquirido.</p>
                    
                    <p><strong>Gostou do artigo? Compartilhe com seus amigos!</strong></p>
                `
            },
            'portfolio': {
                name: 'Portfólio',
                description: 'Showcase pessoal',
                content: `
                    <h1>Meu Portfólio</h1>
                    
                    <h2>Sobre Mim</h2>
                    <p>Olá! Eu sou [Seu Nome], um profissional especializado em [Sua Área]. Com [X anos] de experiência, ajudo empresas e clientes a alcançar seus objetivos através de soluções criativas e eficientes.</p>
                    
                    <h2>Serviços</h2>
                    <ul>
                        <li><strong>Serviço 1:</strong> Descrição detalhada do que você oferece</li>
                        <li><strong>Serviço 2:</strong> Outro serviço que você disponibiliza</li>
                        <li><strong>Serviço 3:</strong> Mais um serviço do seu repertório</li>
                    </ul>
                    
                    <h2>Projetos Destacados</h2>
                    
                    <h3>Projeto 1</h3>
                    <p>Descrição do projeto, desafios enfrentados e resultados alcançados.</p>
                    
                    <h3>Projeto 2</h3>
                    <p>Outro projeto importante com detalhes sobre o processo e impacto.</p>
                    
                    <h2>Contato</h2>
                    <p>Pronto para trabalharmos juntos? Entre em contato:</p>
                    <ul>
                        <li>Email: seu@email.com</li>
                        <li>Telefone: (11) 99999-9999</li>
                        <li>LinkedIn: /in/seuperfil</li>
                    </ul>
                `
            },
            'business': {
                name: 'Página Empresarial',
                description: 'Apresentação corporativa',
                content: `
                    <h1>Bem-vindos à [Nome da Empresa]</h1>
                    
                    <p>Somos uma empresa comprometida em oferecer soluções inovadoras e de alta qualidade para nossos clientes. Com anos de experiência no mercado, construímos uma reputação sólida baseada na confiança e excelência.</p>
                    
                    <h2>Nossa Missão</h2>
                    <p>Fornecer produtos/serviços excepcionais que superem as expectativas dos nossos clientes, contribuindo para seu sucesso e crescimento.</p>
                    
                    <h2>Nossos Valores</h2>
                    <ul>
                        <li><strong>Qualidade:</strong> Compromisso com a excelência em tudo que fazemos</li>
                        <li><strong>Inovação:</strong> Busca constante por soluções criativas e eficientes</li>
                        <li><strong>Transparência:</strong> Comunicação clara e honesta com todos os stakeholders</li>
                        <li><strong>Responsabilidade:</strong> Compromisso com práticas sustentáveis e éticas</li>
                    </ul>
                    
                    <h2>Nossos Serviços</h2>
                    <p>Oferecemos uma gama completa de serviços adaptados às necessidades específicas de cada cliente:</p>
                    
                    <h3>Serviço Principal</h3>
                    <p>Descrição detalhada do principal serviço oferecido pela empresa.</p>
                    
                    <h3>Consultoria Especializada</h3>
                    <p>Orientação especializada para ajudar clientes a tomar as melhores decisões.</p>
                    
                    <h2>Por Que Nos Escolher?</h2>
                    <ul>
                        <li>Experiência comprovada no mercado</li>
                        <li>Equipe altamente qualificada</li>
                        <li>Atendimento personalizado</li>
                        <li>Resultados mensuráveis</li>
                    </ul>
                    
                    <h2>Entre em Contato</h2>
                    <p>Estamos prontos para ajudar sua empresa a alcançar novos patamares. Entre em contato conosco hoje mesmo!</p>
                `
            }
        };
        
        this.init();
    }

    init() {
        this.createTemplateSelector();
        this.setupEventListeners();
        this.setupLanguageListener();
    }

    createTemplateSelector() {
        this.container.innerHTML = `
            <div class="template-grid">
                ${Object.entries(this.templates).map(([key, template]) => `
                    <div class="template-item" data-template="${key}">
                        <h4>${template.name}</h4>
                        <p>${template.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    setupEventListeners() {
        this.container.addEventListener('click', (e) => {
            const templateItem = e.target.closest('.template-item');
            if (templateItem) {
                this.selectTemplate(templateItem.dataset.template);
            }
        });
    }

    setupLanguageListener() {
        window.addEventListener('languageChanged', () => {
            this.updateTemplateNames();
        });
    }

    updateTemplateNames() {
        // Update template names based on language
        const language = window.languageSelector ? window.languageSelector.getCurrentLanguage() : 'pt-BR';
        
        if (language === 'en-US') {
            this.templates.blank.name = 'Blank Page';
            this.templates.blank.description = 'Start from scratch';
            this.templates.landing.name = 'Landing Page';
            this.templates.landing.description = 'Sales page';
            this.templates.blog.name = 'Blog Article';
            this.templates.blog.description = 'Informative post';
            this.templates.portfolio.name = 'Portfolio';
            this.templates.portfolio.description = 'Personal showcase';
            this.templates.business.name = 'Business Page';
            this.templates.business.description = 'Corporate presentation';
        } else if (language === 'es-ES') {
            this.templates.blank.name = 'Página en Blanco';
            this.templates.blank.description = 'Empezar desde cero';
            this.templates.landing.name = 'Página de Aterrizaje';
            this.templates.landing.description = 'Página de ventas';
            this.templates.blog.name = 'Artículo de Blog';
            this.templates.blog.description = 'Post informativo';
            this.templates.portfolio.name = 'Portafolio';
            this.templates.portfolio.description = 'Showcase personal';
            this.templates.business.name = 'Página Empresarial';
            this.templates.business.description = 'Presentación corporativa';
        }
        
        this.createTemplateSelector();
    }

    selectTemplate(templateKey) {
        // Remove previous selection
        this.container.querySelectorAll('.template-item').forEach(item => {
            item.classList.remove('selected');
        });

        // Add selection to clicked template
        const selectedItem = this.container.querySelector(`[data-template="${templateKey}"]`);
        if (selectedItem) {
            selectedItem.classList.add('selected');
            this.selectedTemplate = templateKey;
            this.applyTemplate(templateKey);
        }
    }

    applyTemplate(templateKey) {
        const template = this.templates[templateKey];
        if (template && window.richTextEditor) {
            window.richTextEditor.applyTemplate(template.content);
            
            // Notify other components
            window.dispatchEvent(new CustomEvent('templateApplied', {
                detail: {
                    templateKey: templateKey,
                    templateName: template.name,
                    content: template.content
                }
            }));
        }
    }

    getSelectedTemplate() {
        return this.selectedTemplate;
    }

    addCustomTemplate(key, template) {
        this.templates[key] = template;
        this.createTemplateSelector();
    }

    removeTemplate(key) {
        if (this.templates[key] && key !== 'blank') {
            delete this.templates[key];
            this.createTemplateSelector();
        }
    }

    getTemplates() {
        return this.templates;
    }

    // Export template for sharing
    exportTemplate() {
        if (this.selectedTemplate && window.richTextEditor) {
            const content = window.richTextEditor.getContent();
            return {
                key: this.selectedTemplate,
                name: this.templates[this.selectedTemplate].name,
                description: this.templates[this.selectedTemplate].description,
                content: content,
                exportDate: new Date().toISOString()
            };
        }
        return null;
    }

    // Import template from file or data
    importTemplate(templateData) {
        try {
            const template = typeof templateData === 'string' ? JSON.parse(templateData) : templateData;
            
            if (template.key && template.name && template.content) {
                this.addCustomTemplate(template.key, {
                    name: template.name,
                    description: template.description || 'Template importado',
                    content: template.content
                });
                return { success: true, message: 'Template importado com sucesso!' };
            }
            
            return { success: false, message: 'Formato de template inválido' };
        } catch (error) {
            return { success: false, message: 'Erro ao importar template: ' + error.message };
        }
    }
}

// Initialize template selector when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.templateSelector = new TemplateSelector();
});