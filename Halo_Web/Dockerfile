# Usar la imagen oficial de Python
FROM python:3.10

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto Django al contenedor
COPY . /app

# Instalar dependencias
RUN pip install --no-cache-dir --upgrade pip \
    && pip install -r requirements.txt

# Recoger archivos estáticos (servidos por Apache)
RUN python manage.py collectstatic --noinput

ENV PYTHONUNBUFFERED=1

# Exponer el puerto en el que correrá Gunicorn
EXPOSE 8000

# Comando para ejecutar Gunicorn y servir Django
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "Halo_Web.wsgi:application"]

