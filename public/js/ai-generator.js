// Magic Page Wiz - AI Generator
class AIGenerator {
    constructor() {
        this.apiKey = null; // Will be set by user or environment
        this.init();
    }

    init() {
        this.setupEventHandlers();
        this.loadApiKey();
    }

    setupEventHandlers() {
        const generateBtn = document.getElementById('generatePage');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generatePage());
        }

        const applyBtn = document.getElementById('applyGenerated');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => this.applyGeneratedPage());
        }
    }

    loadApiKey() {
        // For demo purposes, we'll use a placeholder
        // In production, this would come from user settings or environment
        this.apiKey = localStorage.getItem('openai-api-key') || 'demo-mode';
    }

    async generatePage() {
        const prompt = document.getElementById('aiPrompt').value.trim();
        
        if (!prompt) {
            alert('Please enter a description for your page');
            return;
        }

        const generateBtn = document.getElementById('generatePage');
        const originalText = generateBtn.textContent;
        generateBtn.textContent = '⚡ Generating...';
        generateBtn.disabled = true;

        try {
            // Get user preferences
            const includeTestimonials = document.getElementById('includeTestimonials').checked;
            const includePricing = document.getElementById('includePricing').checked;
            const includeCountdown = document.getElementById('includeCountdown').checked;

            // Generate page structure
            const pageStructure = await this.generatePageStructure(prompt, {
                includeTestimonials,
                includePricing,
                includeCountdown
            });

            this.displayGeneratedResult(pageStructure);

        } catch (error) {
            console.error('AI Generation error:', error);
            alert('Error generating page. Please try again.');
        } finally {
            generateBtn.textContent = originalText;
            generateBtn.disabled = false;
        }
    }

    async generatePageStructure(prompt, options) {
        // For demo purposes, we'll create a mock AI response
        // In production, this would call the OpenAI API
        
        if (this.apiKey === 'demo-mode') {
            return this.generateMockPageStructure(prompt, options);
        }

        // Real OpenAI API call would go here
        const response = await this.callOpenAI(prompt, options);
        return this.parseAIResponse(response);
    }

    generateMockPageStructure(prompt, options) {
        // Analyze prompt to extract product type and context
        const productType = this.extractProductType(prompt);
        const targetAudience = this.extractTargetAudience(prompt);
        
        const structure = {
            title: this.generateTitle(productType, targetAudience),
            elements: []
        };

        // Add hero section
        structure.elements.push({
            type: 'heading',
            content: { text: structure.title, level: 'h1' },
            styles: { fontSize: '48px', textAlign: 'center', color: '#2d3748', marginBottom: '20px' }
        });

        structure.elements.push({
            type: 'text',
            content: { text: this.generateSubheadline(productType, targetAudience) },
            styles: { fontSize: '20px', textAlign: 'center', color: '#4a5568', marginBottom: '40px' }
        });

        // Add hero image
        structure.elements.push({
            type: 'image',
            content: { 
                src: this.getRelevantImage(productType),
                alt: `${productType} product image`
            },
            styles: { width: '100%', maxWidth: '600px', margin: '0 auto 40px auto', display: 'block' }
        });

        // Add problem/solution section
        structure.elements.push({
            type: 'heading',
            content: { text: this.generateProblemHeading(targetAudience), level: 'h2' },
            styles: { fontSize: '32px', color: '#2d3748', marginBottom: '20px' }
        });

        structure.elements.push({
            type: 'text',
            content: { text: this.generateProblemText(productType, targetAudience) },
            styles: { fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }
        });

        // Add solution section
        structure.elements.push({
            type: 'heading',
            content: { text: 'Here\'s the Solution You\'ve Been Looking For', level: 'h2' },
            styles: { fontSize: '32px', color: '#2d3748', marginBottom: '20px' }
        });

        structure.elements.push({
            type: 'text',
            content: { text: this.generateSolutionText(productType) },
            styles: { fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }
        });

        // Add features/benefits
        const features = this.generateFeatures(productType);
        features.forEach(feature => {
            structure.elements.push({
                type: 'text',
                content: { text: `✅ ${feature}` },
                styles: { fontSize: '16px', marginBottom: '10px', color: '#2d3748' }
            });
        });

        // Add testimonials if requested
        if (options.includeTestimonials) {
            structure.elements.push({
                type: 'heading',
                content: { text: 'What Our Customers Say', level: 'h2' },
                styles: { fontSize: '32px', textAlign: 'center', color: '#2d3748', marginTop: '40px', marginBottom: '30px' }
            });

            const testimonials = this.generateTestimonials(productType);
            testimonials.forEach(testimonial => {
                structure.elements.push({
                    type: 'testimonial',
                    content: testimonial,
                    styles: { marginBottom: '30px' }
                });
            });
        }

        // Add pricing if requested
        if (options.includePricing) {
            structure.elements.push({
                type: 'heading',
                content: { text: 'Choose Your Plan', level: 'h2' },
                styles: { fontSize: '32px', textAlign: 'center', color: '#2d3748', marginTop: '40px', marginBottom: '30px' }
            });

            structure.elements.push({
                type: 'pricing',
                content: this.generatePricing(productType),
                styles: { marginBottom: '30px' }
            });
        }

        // Add countdown if requested
        if (options.includeCountdown) {
            structure.elements.push({
                type: 'countdown',
                content: {
                    title: 'Limited Time Offer!',
                    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
                },
                styles: { textAlign: 'center', marginBottom: '30px' }
            });
        }

        // Add CTA
        structure.elements.push({
            type: 'button',
            content: { 
                text: this.generateCTAText(productType),
                link: '#order'
            },
            styles: { 
                backgroundColor: '#667eea',
                color: 'white',
                padding: '20px 40px',
                fontSize: '20px',
                fontWeight: 'bold',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'block',
                margin: '0 auto',
                textAlign: 'center'
            }
        });

        return structure;
    }

    extractProductType(prompt) {
        const keywords = {
            'fitness': ['fitness', 'workout', 'exercise', 'gym', 'weight loss', 'muscle'],
            'course': ['course', 'training', 'learn', 'education', 'tutorial'],
            'software': ['software', 'app', 'tool', 'platform', 'system'],
            'ebook': ['ebook', 'book', 'guide', 'manual', 'pdf'],
            'service': ['service', 'consulting', 'done for you', 'agency']
        };

        for (const [type, words] of Object.entries(keywords)) {
            if (words.some(word => prompt.toLowerCase().includes(word))) {
                return type;
            }
        }

        return 'product';
    }

    extractTargetAudience(prompt) {
        const audiences = {
            'busy professionals': ['busy professionals', 'working professionals', 'office workers'],
            'entrepreneurs': ['entrepreneurs', 'business owners', 'startups'],
            'students': ['students', 'college', 'university'],
            'parents': ['parents', 'moms', 'dads', 'family'],
            'seniors': ['seniors', 'elderly', 'retirement']
        };

        for (const [audience, words] of Object.entries(audiences)) {
            if (words.some(word => prompt.toLowerCase().includes(word))) {
                return audience;
            }
        }

        return 'people';
    }

    generateTitle(productType, audience) {
        const titles = {
            'fitness': `Transform Your Body in 30 Days - Perfect for ${audience}`,
            'course': `Master New Skills - The Complete ${productType} for ${audience}`,
            'software': `The Ultimate ${productType} Solution for ${audience}`,
            'ebook': `The Complete Guide Every ${audience.replace('people', 'Person')} Needs`,
            'service': `Professional ${productType} Services for ${audience}`
        };

        return titles[productType] || `Amazing ${productType} for ${audience}`;
    }

    generateSubheadline(productType, audience) {
        return `Finally, a proven system that works specifically for ${audience}. Get results fast with our step-by-step approach.`;
    }

    getRelevantImage(productType) {
        const images = {
            'fitness': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
            'course': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
            'software': 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
            'ebook': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop',
            'service': 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop'
        };

        return images[productType] || 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop';
    }

    generateProblemHeading(audience) {
        return `Are You Tired of Struggling Like Most ${audience}?`;
    }

    generateProblemText(productType, audience) {
        return `Most ${audience} face the same frustrating challenges every day. They waste time on solutions that don't work, feel overwhelmed by complex processes, and struggle to see real results. Sound familiar?`;
    }

    generateSolutionText(productType) {
        return `Our proven system eliminates the guesswork and gives you a clear, step-by-step path to success. No more confusion, no more wasted time - just real results you can see and measure.`;
    }

    generateFeatures(productType) {
        const features = {
            'fitness': [
                'Easy-to-follow workout plans that fit your busy schedule',
                'Nutrition guide with simple meal prep strategies',
                'Progress tracking to keep you motivated',
                'Access to private community support group'
            ],
            'course': [
                'Comprehensive video lessons you can watch anywhere',
                'Downloadable resources and templates',
                'Interactive exercises and quizzes',
                'Lifetime access and free updates'
            ],
            'software': [
                'Intuitive interface that\'s easy to learn',
                'Powerful automation features to save time',
                'Integration with your existing tools',
                '24/7 customer support and training'
            ]
        };

        return features[productType] || [
            'High-quality, proven solution',
            'Easy to implement and use',
            'Comprehensive support included',
            'Money-back guarantee'
        ];
    }

    generateTestimonials(productType) {
        return [
            {
                text: "This completely changed my life! I saw results in just 2 weeks.",
                author: "Sarah Johnson",
                title: "Verified Customer",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b436?w=60&h=60&fit=crop&crop=face"
            },
            {
                text: "I wish I had found this sooner. Best investment I've ever made!",
                author: "Mike Chen",
                title: "Happy Customer",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
            }
        ];
    }

    generatePricing(productType) {
        return {
            title: 'Complete Package',
            price: '$97',
            features: [
                'Everything you need to get started',
                'Step-by-step implementation guide',
                'Bonus resources and templates',
                '60-day money-back guarantee'
            ]
        };
    }

    generateCTAText(productType) {
        return 'Get Instant Access Now!';
    }

    displayGeneratedResult(structure) {
        const aiResult = document.getElementById('aiResult');
        const aiOutput = document.getElementById('aiOutput');
        
        let outputHTML = '<div class="generated-structure">';
        outputHTML += `<h4>Page Title: ${structure.title}</h4>`;
        outputHTML += '<h5>Elements:</h5><ul>';
        
        structure.elements.forEach((element, index) => {
            let description = '';
            switch (element.type) {
                case 'heading':
                    description = `${element.content.level.toUpperCase()}: ${element.content.text.substring(0, 50)}...`;
                    break;
                case 'text':
                    description = `Text: ${element.content.text.substring(0, 50)}...`;
                    break;
                case 'image':
                    description = `Image: ${element.content.alt}`;
                    break;
                case 'button':
                    description = `Button: ${element.content.text}`;
                    break;
                case 'testimonial':
                    description = `Testimonial from ${element.content.author}`;
                    break;
                case 'pricing':
                    description = `Pricing: ${element.content.title} - ${element.content.price}`;
                    break;
                case 'countdown':
                    description = `Countdown Timer: ${element.content.title}`;
                    break;
                default:
                    description = `${element.type} element`;
            }
            outputHTML += `<li>${index + 1}. ${description}</li>`;
        });
        
        outputHTML += '</ul></div>';
        
        aiOutput.innerHTML = outputHTML;
        aiResult.classList.remove('hidden');
        
        // Store the generated structure for applying
        this.generatedStructure = structure;
    }

    applyGeneratedPage() {
        if (!this.generatedStructure || !window.pageBuilder) {
            alert('No generated page to apply');
            return;
        }

        // Clear current page
        window.pageBuilder.pageData.elements = [];
        
        // Apply generated elements
        this.generatedStructure.elements.forEach(elementData => {
            window.pageBuilder.addElement(elementData.type, {
                content: elementData.content,
                styles: elementData.styles
            });
        });

        // Update page title
        window.pageBuilder.pageData.settings.title = this.generatedStructure.title;
        document.querySelector('.page-title').textContent = this.generatedStructure.title;

        // Switch back to builder view
        window.pageBuilder.switchSection('builder');
        
        alert('✨ AI-generated page applied successfully!');
    }

    async callOpenAI(prompt, options) {
        // This would be the actual OpenAI API call
        // For security, the API key should be handled server-side
        const systemPrompt = `You are a sales page expert. Create a compelling sales page structure based on the user's description. Include sections for problem, solution, benefits, and call-to-action. Format the response as a JSON structure with elements array.`;
        
        const userPrompt = `Create a sales page for: ${prompt}. Include ${options.includeTestimonials ? 'testimonials' : 'no testimonials'}, ${options.includePricing ? 'pricing' : 'no pricing'}, and ${options.includeCountdown ? 'countdown timer' : 'no countdown timer'}.`;

        // This is where you'd make the actual API call
        throw new Error('OpenAI API not configured. Using demo mode.');
    }

    parseAIResponse(response) {
        // Parse the AI response and convert to our element structure
        return response;
    }
}

// Initialize AI Generator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.builder-container')) {
        window.aiGenerator = new AIGenerator();
        console.log('🤖 AI Generator initialized successfully!');
    }
});