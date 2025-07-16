@echo off
title Magic Page Wiz - Inicializacao Local
echo ===========================================
echo   Magic Page Wiz - Inicializacao Completa
echo ===========================================
echo.

REM Executar prepare-local.bat
echo [ETAPA 1] Preparando ambiente...
call prepare-local.bat
if errorlevel 1 (
    echo ❌ Erro na preparacao do ambiente!
    pause
    exit /b 1
)
echo.

REM Instalar dependencias
echo [ETAPA 2] Instalando dependencias...
echo   Executando: npm install
echo   (Isso pode demorar alguns minutos na primeira vez)
echo.
REM Set environment variable to skip Puppeteer download if needed
set PUPPETEER_SKIP_DOWNLOAD=true
npm install
if errorlevel 1 (
    echo ❌ Erro ao instalar dependencias!
    echo.
    echo Possiveis solucoes:
    echo 1. Verifique se o Node.js esta instalado (versao 14 ou superior)
    echo 2. Verifique sua conexao com a internet
    echo 3. Tente executar "npm install" manualmente
    echo.
    pause
    exit /b 1
)
echo   ✓ Dependencias instaladas com sucesso!
echo.

REM Iniciar servidor
echo [ETAPA 3] Iniciando servidor de desenvolvimento...
echo.
echo ===========================================
echo   SERVIDOR INICIANDO...
echo ===========================================
echo   URL: http://localhost:3000
echo   Para parar o servidor: Ctrl+C
echo ===========================================
echo.
npm run dev