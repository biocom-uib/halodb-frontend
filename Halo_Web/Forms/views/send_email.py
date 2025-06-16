import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(destiny,uid,date):
# Datos de tu cuenta
    correo_origen = "halophiles.dev@gmail.com"
    contraseña = "hmof ycdu mjht hvtq"

    # Crear el mensaje
    mensaje = MIMEMultipart()
    mensaje["From"] = 'HaloFile <no-reply@bioinfo.uib.es>'  # Nombre visible y dirección no-reply
    mensaje["To"] = destiny
    mensaje["Subject"] = "no-reply - Welcome to HaloFiles!"
    mensaje["Reply-To"] = "no-reply@bioinfo.uib.es"  # Si alguien intenta responder, irá a esta dirección

    # Cuerpo del mensaje en HTML
    cuerpo_html = f"""
    <html>
    <body>
        <p>Welcome to HaloFiles!,</p>
        <p>To continue, please activate your account with the next link <strong>App Service</strong>.</p>
        <p>
        <a href='http://bioinfo.uib.es/halophile/account/verify?uid={uid}&date={date}' style="padding:10px 15px;background-color:#28a745;color:white;text-decoration:none;border-radius:5px;">
            Activate account
        </a>
        </p>
        <p>Thanks!</p>
    </body>
    </html>
    """

    mensaje.attach(MIMEText(cuerpo_html, "html"))

    try:
        # Conexión con el servidor SMTP de Gmail
        servidor = smtplib.SMTP("smtp.gmail.com", 587)
        servidor.starttls()
        servidor.login(correo_origen, contraseña)
        servidor.sendmail(correo_origen, destiny, mensaje.as_string())
        servidor.quit()
        print("Correo enviado correctamente.")
    except Exception as e:
        print(f"Ocurrió un error: {e}")