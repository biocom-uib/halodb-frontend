@echo off
REM ============================================================================
REM  HaloFiles - Comandos Útiles de Desarrollo
REM  Para ejecutar: comandos.bat [comando]
REM ============================================================================

if "%1"=="" goto menu
if "%1"=="help" goto menu
if "%1"=="setup" goto setup
if "%1"=="start" goto start
if "%1"=="stop" goto stop
if "%1"=="migrate" goto migrate
if "%1"=="test" goto test
if "%1"=="docker" goto docker
if "%1"=="clean" goto clean
if "%1"=="verify" goto verify
goto menu

:menu
echo.
echo ============================================================================
echo   HaloFiles - Comandos Disponibles
echo ============================================================================
echo.
echo   setup       - Configuracion inicial completa
echo   start       - Iniciar servidor de desarrollo
echo   stop        - Detener servidor (Ctrl+C)
echo   migrate     - Ejecutar migraciones
echo   test        - Ejecutar tests
echo   docker      - Construir y lanzar con Docker
echo   clean       - Limpiar archivos temporales
echo   verify      - Verificar actualizacion
echo   help        - Mostrar este menu
echo.
echo ============================================================================
echo   Uso: comandos.bat [comando]
echo ============================================================================
echo.
goto end

:setup
echo.
echo [1/6] Creando archivo .env...
if not exist .env (
    copy .env.example .env
    echo ✅ Archivo .env creado. ¡EDITA .env con tus valores!
) else (
    echo ⚠️  .env ya existe
)

echo.
echo [2/6] Generando SECRET_KEY...
python generate_secret_key.py

echo.
echo [3/6] Instalando dependencias...
pip install -r requirements.txt --upgrade

echo.
echo [4/6] Ejecutando migraciones...
python manage.py makemigrations
python manage.py migrate

echo.
echo [5/6] Recolectando archivos estaticos...
python manage.py collectstatic --noinput

echo.
echo [6/6] Verificando instalacion...
python verify_updates.py

echo.
echo ============================================================================
echo   Setup completo! Ahora crea un superusuario:
echo   python manage.py createsuperuser
echo ============================================================================
goto end

:start
echo.
echo Iniciando servidor de desarrollo...
echo Accede a: http://127.0.0.1:8000/
echo Admin: http://127.0.0.1:8000/admin/
echo.
echo Presiona Ctrl+C para detener
echo.
python manage.py runserver
goto end

:migrate
echo.
echo Ejecutando migraciones...
python manage.py makemigrations
python manage.py migrate
echo ✅ Migraciones completadas
goto end

:test
echo.
echo Ejecutando tests...
python manage.py test
goto end

:docker
echo.
echo Construyendo y lanzando con Docker...
docker-compose down
docker-compose build --no-cache
docker-compose up -d
echo.
echo Esperando a que el contenedor este listo...
timeout /t 5
echo.
echo Ejecutando migraciones en contenedor...
docker-compose exec web python manage.py migrate
echo.
echo ✅ Docker corriendo en http://localhost:8000/
echo Ver logs: docker-compose logs -f
echo Detener: docker-compose down
goto end

:clean
echo.
echo Limpiando archivos temporales...
for /d /r . %%d in (__pycache__) do @if exist "%%d" rd /s /q "%%d"
del /s /q *.pyc 2>nul
del /s /q *.pyo 2>nul
del /s /q *.log 2>nul
echo ✅ Archivos temporales eliminados
goto end

:verify
echo.
echo Verificando actualizacion...
python verify_updates.py
goto end

:end
echo.
