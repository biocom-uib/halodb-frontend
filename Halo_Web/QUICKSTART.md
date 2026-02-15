# ⚡ Quick Start Guide - HaloFiles

**¡Tu proyecto ha sido actualizado! Sigue estos pasos para ponerlo en marcha.**

---

## 🚀 5 Minutos para estar corriendo

### Paso 1: Configuración inicial (2 min)

```bash
# Navega al directorio del proyecto
cd Halo_Web

# Crea el archivo .env desde la plantilla
copy .env.example .env

# Genera una SECRET_KEY segura
python generate_secret_key.py
```

**Copia la SECRET_KEY generada al archivo `.env`**

---

### Paso 2: Instalar dependencias (1 min)

```bash
# Activa tu entorno virtual
halo_env\Scripts\activate

# Instala las dependencias actualizadas
pip install -r requirements.txt --upgrade
```

---

### Paso 3: Base de datos (1 min)

```bash
# Crear las migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario para el admin
python manage.py createsuperuser
```

---

### Paso 4: Verificar actualización (30 seg)

```bash
# Ejecuta el script de verificación
python verify_updates.py
```

Si todo está ✅, continúa. Si hay ❌, revisa MIGRATION_GUIDE.md

---

### Paso 5: ¡Lanzar! (30 seg)

```bash
# Recolectar archivos estáticos
python manage.py collectstatic --noinput

# Iniciar servidor de desarrollo
python manage.py runserver
```

**¡Listo! Accede a:**
- 🌐 Aplicación: http://127.0.0.1:8000/
- 🔧 Admin: http://127.0.0.1:8000/admin/

---

## 🐳 Alternativa con Docker (Aún más rápido)

```bash
# 1. Configura .env (igual que arriba)
copy .env.example .env
# Edita .env con tus valores

# 2. Construye y lanza
docker-compose up -d --build

# 3. Ejecuta migraciones
docker-compose exec web python manage.py migrate
docker-compose exec web python manage.py createsuperuser

# ¡Listo!
# http://localhost:8000/
```

---

## 📋 Checklist Rápido

- [ ] Archivo `.env` creado y configurado
- [ ] `SECRET_KEY` generada y copiada a `.env`
- [ ] Dependencias instaladas (`pip install -r requirements.txt`)
- [ ] Migraciones ejecutadas (`python manage.py migrate`)
- [ ] Superusuario creado
- [ ] Script de verificación ejecutado sin errores
- [ ] Servidor corriendo

---

## ⚠️ Variables .env Mínimas Requeridas

```env
ENV=DEV
SECRET_KEY=tu-secret-key-generada-aqui
DB_PATH=http://tu-api-backend.com/api/
EMAIL_HOST=smtp.outlook.com
EMAIL_PORT=587
EMAIL_HOST_USER=tu-email@ejemplo.com
EMAIL_HOST_PASSWORD=tu-password
EMAIL_USE_TLS=True
```

---

## 🆘 Problemas Comunes

### "No module named 'django_redis'"
```bash
pip install django-redis==5.4.0
```

### "SECRET_KEY not set"
```bash
python generate_secret_key.py
# Copia el output a tu .env
```

### Migraciones fallan
```bash
python manage.py migrate --run-syncdb
```

### Puerto 8000 ocupado
```bash
python manage.py runserver 8080
# O busca qué proceso usa el puerto:
netstat -ano | findstr :8000
```

---

## 📚 Documentación Completa

- 📖 **README.md** - Documentación general completa
- 🔄 **MIGRATION_GUIDE.md** - Guía detallada de migración
- 📊 **CHANGES_SUMMARY.md** - Lista de todos los cambios

---

## ✨ Nuevas Funcionalidades

Después de actualizar, ahora tienes:

✅ Django 5.2.9 (sin vulnerabilidades)  
✅ Mejor seguridad (HTTPS, HSTS, cookies seguras)  
✅ Logging completo con rotación  
✅ Manejo robusto de errores  
✅ Admin de Django habilitado  
✅ Docker optimizado para producción  
✅ Funciones de utilidad útiles  

---

## 🎉 ¡Listo para Desarrollar!

Tu proyecto está actualizado, seguro y listo. ¡Feliz coding! 🚀

**¿Necesitas ayuda?** Revisa los logs en `logs/django.log`

---

*Última actualización: 14 de febrero de 2026*
