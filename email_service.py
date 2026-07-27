import smtplib
from email.mime.text import MIMEText

SENDER_EMAIL = "vkamble1285@gmail.com"
SENDER_PASSWORD = "xilg jaou xdmt pfxv"

def send_email(receiver_email, subject, body):

    msg = MIMEText(body)

    msg["Subject"] = subject
    msg["From"] = SENDER_EMAIL
    msg["To"] = receiver_email

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()

    server.login(SENDER_EMAIL, SENDER_PASSWORD)

    server.sendmail(
        SENDER_EMAIL,
        receiver_email,
        msg.as_string()
    )

    server.quit()