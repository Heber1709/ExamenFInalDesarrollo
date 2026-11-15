@echo off
title Lanzador de RickFlix (Examen Final)
color 0A

echo ========================================================
echo          INICIANDO PROYECTO RICKFLIX (NETFLIX CLONE)
echo ========================================================
echo.
echo 1. Abriendo ventana para el Backend NestJS (Puerto 3000)...
start "Backend NestJS - Puerto 3000" cmd /k "cd backend && npm run start:dev"

echo 2. Abriendo ventana para el Frontend Angular (Puerto 4200)...
start "Frontend Angular - Puerto 4200" cmd /k "cd frontend && npm start"

echo.
echo ========================================================
echo  Ambos servicios estan iniciando en ventanas separadas.
echo  Una vez carguen, abre tu navegador en:
echo  http://localhost:4200
echo.
echo  Credenciales de acceso:
echo  - Usuario: admin
echo  - Contrasena: 1234
echo ========================================================
pause
