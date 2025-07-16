@echo off
echo ===========================================
echo   Magic Page Wiz - Preparacao Local
echo ===========================================
echo.

REM Criar pasta public/produtos se nao existir
echo [1/3] Verificando pasta public/produtos...
if not exist "public\produtos" (
    echo   Criando pasta public/produtos...
    mkdir "public\produtos"
    echo   ✓ Pasta public/produtos criada com sucesso!
) else (
    echo   ✓ Pasta public/produtos ja existe!
)
echo.

REM Criar arquivo .env se nao existir
echo [2/3] Verificando arquivo de configuracao .env...
if not exist ".env" (
    echo   Criando arquivo .env a partir do .env.example...
    copy ".env.example" ".env" >nul
    echo   ✓ Arquivo .env criado com sucesso!
    echo   ⚠️  IMPORTANTE: Edite o arquivo .env com suas configuracoes!
) else (
    echo   ✓ Arquivo .env ja existe!
)
echo.

REM Exibir instrucoes finais
echo [3/3] Preparacao concluida!
echo.
echo ===========================================
echo   PROXIMOS PASSOS:
echo ===========================================
echo   1. Edite o arquivo .env com suas configuracoes
echo   2. Execute "start-local.bat" para iniciar o projeto
echo   3. Ou execute manualmente:
echo      - npm install
echo      - npm run dev
echo.
echo   O servidor sera iniciado em: http://localhost:3000
echo ===========================================
echo.
pause