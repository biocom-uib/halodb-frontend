# Import necessary modules for sending emails and rendering templates
from .views_import import *
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings

# Define email templates and subjects for different email types
EMAIL_TEMPLATES = {
    "verification": {
        "subject": "no-reply - Welcome to HaloFiles!",
        "template": "emails/welcome.html",
    },
    "invitation": {
        "subject": "no-reply - You've been invited to a group!",
        "template": "emails/groupInvitation.html",
    },
}

def send_emailV2(destiny, email_type, context):
    '''
    Sends an HTML email to a specified recipient using a predefined template.

    Parameters:
    destiny (str): Recipient's email address.
    email_type (str): The type of email to send. Must be a key in EMAIL_TEMPLATES.
    context (dict): Context data to render into the email template.

    Returns:
    None
    '''
    # Get the email configuration for the specified type
    email_config = EMAIL_TEMPLATES.get(email_type)
    
    # Get the subject and template path
    subject = email_config["subject"]
    from_email = "HaloFile <no-reply@bioinfo.uib.es>"  # Sender's email
    to = [destiny]  # Recipient's email in list form

    # Render the HTML content using the provided context and template
    html_content = render_to_string(email_config["template"], context)

    # Create the email message with an HTML version
    msg = EmailMultiAlternatives(subject, "", from_email, to)
    msg.attach_alternative(html_content, "text/html")  # Attach the HTML content
    msg.send()  # Send the email
