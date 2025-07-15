const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de segurança
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "blob:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
}));

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// Rota principal - servir o drag-and-drop.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/drag-and-drop.html'));
});

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Magic Page Wiz API is running',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// API para salvar páginas geradas (futuro)
app.post('/api/pages', (req, res) => {
    const { title, html, blocks } = req.body;
    
    // Validação básica
    if (!title || !html) {
        return res.status(400).json({ 
            error: 'Título e HTML são obrigatórios' 
        });
    }
    
    // TODO: Implementar salvamento em banco de dados
    const pageData = {
        id: Date.now().toString(),
        title,
        html,
        blocks: blocks || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    res.status(201).json({ 
        success: true, 
        message: 'Página salva com sucesso!', 
        data: pageData 
    });
});

// API para listar páginas salvas (futuro)
app.get('/api/pages', (req, res) => {
    // TODO: Implementar busca em banco de dados
    res.json({ 
        success: true, 
        data: [],
        message: 'Funcionalidade em desenvolvimento' 
    });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 
        error: 'Algo deu errado!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Erro interno do servidor'
    });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Rota não encontrada',
        path: req.path 
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🧙‍♂️ Magic Page Wiz servidor rodando na porta ${PORT}`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🚀 Acesse: http://localhost:${PORT}`);
});

module.exports = app;