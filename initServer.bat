@echo off

:: Activar el entorno virtual
call C:\TFG\HaloEnv\Scripts\activate.bat

:: Navegar al directorio del proyecto
cd /d C:\TFG\Halo_Web

:: Ejecutar el servidor en el puerto 8080
start cmd /k "py manage.py runserver"

:: Abrir el navegador predeterminado
start http://localhost:8080