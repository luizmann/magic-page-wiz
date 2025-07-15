// Magic Page Wiz - Facebook Ads Creative Generator
class FacebookAdsGenerator {
    constructor() {
        this.init();
    }

    init() {
        this.setupFacebookAdsButton();
        this.createFacebookAdsModal();
    }

    setupFacebookAdsButton() {
        // Add Facebook Ads button to header
        const headerRight = document.querySelector('.header-right');
        if (headerRight && !document.getElementById('facebook-ads-btn')) {
            const facebookAdsBtn = document.createElement('button');
            facebookAdsBtn.id = 'facebook-ads-btn';
            facebookAdsBtn.className = 'btn-secondary';
            facebookAdsBtn.innerHTML = '📱 FB Ads';
            facebookAdsBtn.addEventListener('click', () => this.openFacebookAdsGenerator());
            
            headerRight.insertBefore(facebookAdsBtn, headerRight.children[2]);
        }
    }

    createFacebookAdsModal() {
        const modal = document.createElement('div');
        modal.id = 'facebook-ads-modal';
        modal.className = 'facebook-ads-modal hidden';
        modal.innerHTML = `
            <div class="facebook-ads-content">
                <div class="facebook-ads-header">
                    <h2>📱 Facebook Ads Creative Generator</h2>
                    <button class="close-btn" onclick="window.facebookAdsGenerator.closeFacebookAdsGenerator()">×</button>
                </div>
                
                <div class="facebook-ads-form">
                    <div class="form-section">
                        <h3>Campaign Information</h3>
                        <div class="form-group">
                            <label for="campaign-objective">Campaign Objective:</label>
                            <select id="campaign-objective">
                                <option value="traffic">Drive Traffic</option>
                                <option value="conversions">Conversions</option>
                                <option value="leads">Lead Generation</option>
                                <option value="awareness">Brand Awareness</option>
                                <option value="engagement">Engagement</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="target-audience">Target Audience:</label>
                            <input type="text" id="target-audience" placeholder="e.g., Fitness enthusiasts aged 25-45">
                        </div>
                        
                        <div class="form-group">
                            <label for="product-description">Product/Service Description:</label>
                            <textarea id="product-description" placeholder="Describe your product or service, its benefits, and unique selling points..."></textarea>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3>Creative Preferences</h3>
                        <div class="form-group">
                            <label for="ad-format">Ad Format:</label>
                            <select id="ad-format">
                                <option value="single-image">Single Image</option>
                                <option value="carousel">Carousel</option>
                                <option value="video">Video</option>
                                <option value="collection">Collection</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="tone-of-voice">Tone of Voice:</label>
                            <select id="tone-of-voice">
                                <option value="professional">Professional</option>
                                <option value="casual">Casual & Friendly</option>
                                <option value="urgent">Urgent & Persuasive</option>
                                <option value="educational">Educational</option>
                                <option value="emotional">Emotional</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Include Call-to-Action:</label>
                            <div class="checkbox-group">
                                <label><input type="checkbox" id="include-cta" checked> Generate CTA suggestions</label>
                                <label><input type="checkbox" id="include-urgency"> Add urgency elements</label>
                                <label><input type="checkbox" id="include-social-proof"> Include social proof</label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3>Budget & Targeting</h3>
                        <div class="form-group">
                            <label for="daily-budget">Daily Budget ($):</label>
                            <input type="number" id="daily-budget" placeholder="50" min="1">
                        </div>
                        
                        <div class="form-group">
                            <label for="geographic-targeting">Geographic Targeting:</label>
                            <input type="text" id="geographic-targeting" placeholder="e.g., United States, Canada">
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button class="btn-primary" id="generate-facebook-ads">✨ Generate Facebook Ads</button>
                    </div>
                </div>
                
                <div class="facebook-ads-results hidden" id="facebook-ads-results">
                    <h3>Generated Facebook Ads Creative</h3>
                    <div id="ads-output"></div>
                    <div class="results-actions">
                        <button class="btn-primary" id="download-ads">📥 Download Creative</button>
                        <button class="btn-secondary" id="generate-more">🔄 Generate More Variations</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupFacebookAdsEvents();
    }

    setupFacebookAdsEvents() {
        const generateBtn = document.getElementById('generate-facebook-ads');
        generateBtn.addEventListener('click', () => this.generateFacebookAds());

        const generateMoreBtn = document.getElementById('generate-more');
        generateMoreBtn.addEventListener('click', () => this.generateFacebookAds());

        const downloadBtn = document.getElementById('download-ads');
        downloadBtn.addEventListener('click', () => this.downloadCreative());

        // Close modal when clicking outside
        document.getElementById('facebook-ads-modal').addEventListener('click', (e) => {
            if (e.target.classList.contains('facebook-ads-modal')) {
                this.closeFacebookAdsGenerator();
            }
        });
    }

    openFacebookAdsGenerator() {
        const modal = document.getElementById('facebook-ads-modal');
        modal.classList.remove('hidden');
    }

    closeFacebookAdsGenerator() {
        const modal = document.getElementById('facebook-ads-modal');
        modal.classList.add('hidden');
    }

    generateFacebookAds() {
        const generateBtn = document.getElementById('generate-facebook-ads');
        const originalText = generateBtn.textContent;
        generateBtn.textContent = '⚡ Generating...';
        generateBtn.disabled = true;

        // Get form data
        const formData = this.getFormData();

        // Simulate AI generation
        setTimeout(() => {
            const creatives = this.generateCreativeVariations(formData);
            this.displayResults(creatives);
            
            generateBtn.textContent = originalText;
            generateBtn.disabled = false;
        }, 2000);
    }

    getFormData() {
        return {
            objective: document.getElementById('campaign-objective').value,
            audience: document.getElementById('target-audience').value,
            description: document.getElementById('product-description').value,
            format: document.getElementById('ad-format').value,
            tone: document.getElementById('tone-of-voice').value,
            includeCTA: document.getElementById('include-cta').checked,
            includeUrgency: document.getElementById('include-urgency').checked,
            includeSocialProof: document.getElementById('include-social-proof').checked,
            budget: document.getElementById('daily-budget').value,
            geographic: document.getElementById('geographic-targeting').value
        };
    }

    generateCreativeVariations(formData) {
        const headlines = this.generateHeadlines(formData);
        const descriptions = this.generateDescriptions(formData);
        const ctas = this.generateCTAs(formData);
        const images = this.suggestImages(formData);

        return {
            headlines,
            descriptions,
            ctas,
            images,
            targeting: this.generateTargetingSuggestions(formData),
            budget: this.generateBudgetRecommendations(formData)
        };
    }

    generateHeadlines(formData) {
        const baseHeadlines = {
            professional: [
                "Transform Your Business Today",
                "Professional Solutions That Work",
                "Proven Results for Industry Leaders",
                "Streamline Your Operations Now"
            ],
            casual: [
                "You're Going to Love This!",
                "Finally, Something That Actually Works",
                "This Changed Everything for Me",
                "Ready for Something Amazing?"
            ],
            urgent: [
                "Limited Time: Don't Miss Out!",
                "Last Chance to Save Big",
                "Only 24 Hours Left!",
                "Act Fast - Spots Are Filling Up"
            ],
            educational: [
                "Learn the Secret to Success",
                "Master This Essential Skill",
                "The Complete Guide to Growth",
                "Everything You Need to Know"
            ],
            emotional: [
                "Imagine Your Life Transformed",
                "Feel Confident and Empowered",
                "Discover Your True Potential",
                "Create the Life You Deserve"
            ]
        };

        let headlines = baseHeadlines[formData.tone] || baseHeadlines.professional;

        // Customize based on audience and description
        if (formData.audience.toLowerCase().includes('fitness')) {
            headlines = headlines.map(h => h.replace('Business', 'Fitness Journey').replace('Operations', 'Workouts'));
        }

        if (formData.includeUrgency) {
            headlines = headlines.map(h => h + ' - Limited Time!');
        }

        return headlines.slice(0, 3);
    }

    generateDescriptions(formData) {
        const templates = [
            `${formData.description || 'Our amazing product'} is perfect for ${formData.audience || 'people like you'}. ${formData.includeSocialProof ? 'Join thousands of satisfied customers who have already transformed their lives.' : 'Start your journey today and see real results.'}`,
            
            `Discover why ${formData.audience || 'smart professionals'} choose our solution. ${formData.description || 'Premium quality and proven results'} await you. ${formData.includeUrgency ? 'Limited time offer - act now!' : 'Get started today.'}`,
            
            `Ready to take your ${this.extractCategory(formData.description)} to the next level? Our proven system delivers real results for ${formData.audience || 'people just like you'}. ${formData.includeSocialProof ? 'Rated #1 by customers worldwide.' : 'See the difference for yourself.'}`
        ];

        return templates;
    }

    generateCTAs(formData) {
        const ctasByObjective = {
            traffic: ['Learn More', 'Visit Website', 'Discover Now', 'See Details'],
            conversions: ['Shop Now', 'Buy Today', 'Get Yours', 'Order Now'],
            leads: ['Sign Up Free', 'Get Free Guide', 'Start Trial', 'Download Now'],
            awareness: ['Learn More', 'Discover', 'Explore', 'Find Out More'],
            engagement: ['Join Community', 'Share Your Story', 'Get Involved', 'Connect Now']
        };

        return ctasByObjective[formData.objective] || ctasByObjective.traffic;
    }

    suggestImages(formData) {
        const suggestions = [
            {
                type: 'product-hero',
                description: 'High-quality product shot with clean background',
                style: 'Professional product photography'
            },
            {
                type: 'lifestyle',
                description: 'People using/enjoying your product in real situations',
                style: 'Authentic lifestyle photography'
            },
            {
                type: 'before-after',
                description: 'Visual transformation or results',
                style: 'Split-screen comparison'
            },
            {
                type: 'testimonial',
                description: 'Happy customer with quote overlay',
                style: 'Portrait with text overlay'
            }
        ];

        return suggestions;
    }

    generateTargetingSuggestions(formData) {
        return {
            demographics: {
                age: this.extractAgeRange(formData.audience),
                interests: this.extractInterests(formData.description),
                behaviors: this.extractBehaviors(formData.objective)
            },
            locations: formData.geographic || 'United States, Canada, United Kingdom',
            devices: ['Mobile', 'Desktop'],
            placements: ['Facebook Feed', 'Instagram Feed', 'Instagram Stories']
        };
    }

    generateBudgetRecommendations(formData) {
        const budget = parseInt(formData.budget) || 50;
        return {
            daily: budget,
            weekly: budget * 7,
            monthly: budget * 30,
            recommendations: [
                `Start with $${budget}/day for testing`,
                `Scale to $${budget * 2}/day for winning ads`,
                `Reserve 20% budget for retargeting campaigns`
            ]
        };
    }

    extractCategory(description) {
        if (!description) return 'business';
        const text = description.toLowerCase();
        if (text.includes('fitness') || text.includes('workout')) return 'fitness';
        if (text.includes('business') || text.includes('marketing')) return 'business';
        if (text.includes('tech') || text.includes('software')) return 'technology';
        return 'business';
    }

    extractAgeRange(audience) {
        if (!audience) return '25-54';
        const ageMatch = audience.match(/(\d+)[-–](\d+)/);
        return ageMatch ? `${ageMatch[1]}-${ageMatch[2]}` : '25-54';
    }

    extractInterests(description) {
        const interests = [];
        if (!description) return ['Business', 'Entrepreneurship'];
        
        const text = description.toLowerCase();
        if (text.includes('fitness')) interests.push('Fitness', 'Health', 'Wellness');
        if (text.includes('business')) interests.push('Business', 'Entrepreneurship', 'Marketing');
        if (text.includes('tech')) interests.push('Technology', 'Innovation', 'Software');
        if (text.includes('education')) interests.push('Education', 'Learning', 'Skill Development');
        
        return interests.length > 0 ? interests : ['Business', 'Entrepreneurship'];
    }

    extractBehaviors(objective) {
        const behaviors = {
            traffic: ['Website visitors', 'Content engagers'],
            conversions: ['Online shoppers', 'Frequent buyers'],
            leads: ['Form submitters', 'Email subscribers'],
            awareness: ['Early adopters', 'Engaged users'],
            engagement: ['Social media users', 'Content sharers']
        };
        
        return behaviors[objective] || behaviors.traffic;
    }

    displayResults(creatives) {
        const resultsDiv = document.getElementById('facebook-ads-results');
        const outputDiv = document.getElementById('ads-output');
        
        outputDiv.innerHTML = `
            <div class="ad-creative-results">
                <div class="creative-section">
                    <h4>📝 Headlines (${creatives.headlines.length} variations)</h4>
                    <div class="creative-items">
                        ${creatives.headlines.map((headline, i) => `
                            <div class="creative-item">
                                <strong>Headline ${i + 1}:</strong> ${headline}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="creative-section">
                    <h4>📄 Descriptions (${creatives.descriptions.length} variations)</h4>
                    <div class="creative-items">
                        ${creatives.descriptions.map((desc, i) => `
                            <div class="creative-item">
                                <strong>Description ${i + 1}:</strong> ${desc}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="creative-section">
                    <h4>🔘 Call-to-Action Buttons</h4>
                    <div class="creative-items">
                        ${creatives.ctas.map(cta => `
                            <span class="cta-suggestion">${cta}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="creative-section">
                    <h4>🖼️ Image Suggestions</h4>
                    <div class="creative-items">
                        ${creatives.images.map(img => `
                            <div class="image-suggestion">
                                <strong>${img.type}:</strong> ${img.description}
                                <br><small>Style: ${img.style}</small>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="creative-section">
                    <h4>🎯 Targeting Recommendations</h4>
                    <div class="targeting-info">
                        <p><strong>Age:</strong> ${creatives.targeting.demographics.age}</p>
                        <p><strong>Interests:</strong> ${creatives.targeting.demographics.interests.join(', ')}</p>
                        <p><strong>Behaviors:</strong> ${creatives.targeting.demographics.behaviors.join(', ')}</p>
                        <p><strong>Locations:</strong> ${creatives.targeting.locations}</p>
                        <p><strong>Placements:</strong> ${creatives.targeting.placements.join(', ')}</p>
                    </div>
                </div>
                
                <div class="creative-section">
                    <h4>💰 Budget Recommendations</h4>
                    <div class="budget-info">
                        <p><strong>Daily:</strong> $${creatives.budget.daily}</p>
                        <p><strong>Weekly:</strong> $${creatives.budget.weekly}</p>
                        <p><strong>Monthly:</strong> $${creatives.budget.monthly}</p>
                        <div class="budget-tips">
                            ${creatives.budget.recommendations.map(tip => `<p>• ${tip}</p>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        resultsDiv.classList.remove('hidden');
        this.currentCreatives = creatives;
    }

    downloadCreative() {
        if (!this.currentCreatives) return;
        
        const creativeData = {
            generated_at: new Date().toISOString(),
            headlines: this.currentCreatives.headlines,
            descriptions: this.currentCreatives.descriptions,
            ctas: this.currentCreatives.ctas,
            images: this.currentCreatives.images,
            targeting: this.currentCreatives.targeting,
            budget: this.currentCreatives.budget
        };
        
        const blob = new Blob([JSON.stringify(creativeData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `facebook-ads-creative-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('📥 Facebook Ads creative downloaded successfully!');
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 10001;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

// Initialize Facebook Ads Generator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.builder-container')) {
        window.facebookAdsGenerator = new FacebookAdsGenerator();
        console.log('📱 Facebook Ads Generator initialized successfully!');
    }
});

// Add CSS for Facebook Ads Generator
const facebookAdsStyles = document.createElement('style');
facebookAdsStyles.textContent = `
    .facebook-ads-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        overflow-y: auto;
    }
    
    .facebook-ads-content {
        background: white;
        border-radius: 8px;
        width: 90%;
        max-width: 900px;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    .facebook-ads-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid #e2e8f0;
        position: sticky;
        top: 0;
        background: white;
        z-index: 1;
    }
    
    .facebook-ads-header h2 {
        margin: 0;
        color: #2d3748;
    }
    
    .facebook-ads-form {
        padding: 1.5rem;
    }
    
    .form-section {
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid #f1f5f9;
    }
    
    .form-section:last-child {
        border-bottom: none;
    }
    
    .form-section h3 {
        margin: 0 0 1rem 0;
        color: #2d3748;
        font-size: 1.1rem;
    }
    
    .form-group {
        margin-bottom: 1rem;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #4a5568;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        font-size: 0.9rem;
        transition: border-color 0.3s ease;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    .form-group textarea {
        min-height: 80px;
        resize: vertical;
    }
    
    .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .checkbox-group label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: normal;
        margin-bottom: 0;
    }
    
    .checkbox-group input[type="checkbox"] {
        width: auto;
        margin: 0;
    }
    
    .form-actions {
        text-align: center;
        padding-top: 1rem;
        border-top: 1px solid #e2e8f0;
    }
    
    .facebook-ads-results {
        padding: 1.5rem;
        background: #f8f9fa;
    }
    
    .facebook-ads-results h3 {
        margin: 0 0 1.5rem 0;
        color: #2d3748;
    }
    
    .creative-section {
        background: white;
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 6px;
        border: 1px solid #e2e8f0;
    }
    
    .creative-section h4 {
        margin: 0 0 1rem 0;
        color: #4a5568;
        font-size: 1rem;
    }
    
    .creative-items {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .creative-item {
        padding: 0.75rem;
        background: #f7fafc;
        border-radius: 4px;
        border-left: 3px solid #667eea;
    }
    
    .cta-suggestion {
        display: inline-block;
        background: #667eea;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        margin: 0.25rem;
        font-size: 0.9rem;
    }
    
    .image-suggestion {
        padding: 1rem;
        background: #f7fafc;
        border-radius: 4px;
        border: 1px solid #e2e8f0;
    }
    
    .targeting-info,
    .budget-info {
        padding: 1rem;
        background: #f7fafc;
        border-radius: 4px;
    }
    
    .targeting-info p,
    .budget-info p {
        margin: 0.5rem 0;
    }
    
    .budget-tips {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #e2e8f0;
    }
    
    .budget-tips p {
        margin: 0.25rem 0;
        color: #666;
        font-size: 0.9rem;
    }
    
    .results-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        padding-top: 1.5rem;
        border-top: 1px solid #e2e8f0;
        margin-top: 1.5rem;
    }
    
    @media (max-width: 768px) {
        .facebook-ads-content {
            width: 95%;
        }
        
        .checkbox-group {
            gap: 0.75rem;
        }
        
        .results-actions {
            flex-direction: column;
        }
    }
`;
document.head.appendChild(facebookAdsStyles);