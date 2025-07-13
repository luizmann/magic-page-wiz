const express = require('express');
const OpenAI = require('openai');

const router = express.Router();

// Initialize OpenAI client only if API key is provided
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Middleware to check if OpenAI is configured
const checkOpenAIConfig = (req, res, next) => {
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ 
      error: 'OpenAI integration not configured',
      message: 'Please set OPENAI_API_KEY environment variable'
    });
  }
  next();
};

// Generate page content
router.post('/generate-page', checkOpenAIConfig, async (req, res) => {
  try {
    const { 
      productName, 
      productDescription, 
      targetAudience, 
      pageType = 'sales', 
      tone = 'persuasive',
      maxTokens = 2000 
    } = req.body;

    if (!productName) {
      return res.status(400).json({ error: 'Product name is required' });
    }

    const prompt = `Create a compelling ${pageType} page for the product "${productName}".

Product Description: ${productDescription || 'Not provided'}
Target Audience: ${targetAudience || 'General consumers'}
Tone: ${tone}

Please generate:
1. A compelling headline
2. Key benefits and features
3. Persuasive copy for the main content
4. Call-to-action suggestions
5. SEO meta description

Format the response as a JSON object with these sections.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert copywriter specializing in high-converting sales pages and marketing content. Always respond with well-structured JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
    });

    const generatedContent = completion.choices[0].message.content;
    
    try {
      const parsedContent = JSON.parse(generatedContent);
      res.json({
        success: true,
        content: parsedContent,
        usage: completion.usage
      });
    } catch (parseError) {
      // If JSON parsing fails, return raw content
      res.json({
        success: true,
        content: { rawContent: generatedContent },
        usage: completion.usage
      });
    }

  } catch (error) {
    console.error('OpenAI generate page error:', error.message);
    res.status(500).json({ 
      error: 'Failed to generate page content',
      message: error.message 
    });
  }
});

// Generate product descriptions
router.post('/generate-description', checkOpenAIConfig, async (req, res) => {
  try {
    const { 
      productName, 
      features, 
      benefits, 
      targetAudience,
      length = 'medium',
      tone = 'professional'
    } = req.body;

    if (!productName) {
      return res.status(400).json({ error: 'Product name is required' });
    }

    const lengthGuide = {
      'short': '50-100 words',
      'medium': '150-250 words',
      'long': '300-500 words'
    };

    const prompt = `Write a compelling product description for "${productName}".

Features: ${Array.isArray(features) ? features.join(', ') : features || 'Not specified'}
Benefits: ${Array.isArray(benefits) ? benefits.join(', ') : benefits || 'Not specified'}
Target Audience: ${targetAudience || 'General consumers'}
Length: ${lengthGuide[length] || lengthGuide.medium}
Tone: ${tone}

Create a description that highlights the value proposition and appeals to the target audience.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert product description writer who creates compelling, SEO-friendly content that converts browsers into buyers."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    res.json({
      success: true,
      description: completion.choices[0].message.content,
      usage: completion.usage
    });

  } catch (error) {
    console.error('OpenAI generate description error:', error.message);
    res.status(500).json({ 
      error: 'Failed to generate product description',
      message: error.message 
    });
  }
});

// Generate marketing headlines
router.post('/generate-headlines', checkOpenAIConfig, async (req, res) => {
  try {
    const { 
      productName, 
      keyBenefit, 
      targetAudience,
      count = 5,
      style = 'persuasive'
    } = req.body;

    if (!productName) {
      return res.status(400).json({ error: 'Product name is required' });
    }

    const prompt = `Generate ${count} compelling marketing headlines for "${productName}".

Key Benefit: ${keyBenefit || 'Not specified'}
Target Audience: ${targetAudience || 'General consumers'}
Style: ${style}

Create headlines that are attention-grabbing, benefit-focused, and would work well for sales pages or ads. Return as a JSON array of headlines.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a marketing expert who creates high-converting headlines. Always return valid JSON arrays."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    const generatedContent = completion.choices[0].message.content;
    
    try {
      const headlines = JSON.parse(generatedContent);
      res.json({
        success: true,
        headlines: Array.isArray(headlines) ? headlines : [generatedContent],
        usage: completion.usage
      });
    } catch (parseError) {
      // If JSON parsing fails, split by lines
      const headlines = generatedContent.split('\n').filter(line => line.trim().length > 0);
      res.json({
        success: true,
        headlines,
        usage: completion.usage
      });
    }

  } catch (error) {
    console.error('OpenAI generate headlines error:', error.message);
    res.status(500).json({ 
      error: 'Failed to generate headlines',
      message: error.message 
    });
  }
});

// Optimize existing content
router.post('/optimize-content', checkOpenAIConfig, async (req, res) => {
  try {
    const { 
      content, 
      optimization = 'conversion',
      targetAudience,
      instructions 
    } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content to optimize is required' });
    }

    const optimizationTypes = {
      'conversion': 'Optimize for higher conversion rates',
      'seo': 'Optimize for search engine visibility',
      'engagement': 'Optimize for user engagement and readability',
      'clarity': 'Optimize for clarity and understanding'
    };

    const prompt = `${optimizationTypes[optimization] || optimizationTypes.conversion}:

Original Content:
"${content}"

Target Audience: ${targetAudience || 'General consumers'}
Additional Instructions: ${instructions || 'None'}

Please provide an optimized version that improves upon the original while maintaining its core message.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a content optimization expert who improves marketing copy for better performance while maintaining the original intent."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.6,
    });

    res.json({
      success: true,
      originalContent: content,
      optimizedContent: completion.choices[0].message.content,
      optimization: optimization,
      usage: completion.usage
    });

  } catch (error) {
    console.error('OpenAI optimize content error:', error.message);
    res.status(500).json({ 
      error: 'Failed to optimize content',
      message: error.message 
    });
  }
});

module.exports = router;