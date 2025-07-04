# TFG_HALO

## Summary

This repository contains my TFG code about HaloFiles, a webApp build with Django that works as GUI to share & commit information about biological microorganisme data.

## Before start

This app works with Django, a Python full-stack framework. Before continue with this guide, ensure that you have a Python version over 3.10

## Instalation Guide
1. Clone this repository in your machine
 ```bash
  git clone MiquelMontero02/TFG
 ```
2. Go to the cloned repository directory
3. Create an virtual env. You can choose any name, in this example it will be "halo_env". If you need help with this, check Python venv documentation [here](https://docs.python.org/3/library/venv.html)
   ```bash
   python -m venv /path/to/new/virtual/environment
   ```
### 4. Activate virtual environment

1. **Windows**
    ```bash
    halo_env\Scripts\activate
    ```

2. **Linux / macOS**
    ```bash
    source halo_env/bin/activate
    ```

5. Install requirements from "requirements.txt"
   ```bash
   pip install -r requirements.txt
   ```
6. Configure .env. This projects use .env configurations that allows to send emails & access to a non-opensource API. To work with this app, ensure to define this file with this information
    ```bash
    ENV= #DEV to see Django debug msg
    DB_PATH= #define API url that you wanna use
    SMPT_PASSWORD=
    EMAIL_HOST=# smtp.outlook.com if you use outlook mail
    EMAIL_PORT=587 # Used to be 587, but check it
    EMAIL_HOST_USER=#host email address
    EMAIL_HOST_PASSWORD=
    EMAIL_USE_TLS=True
    DEFAULT_FROM_EMAIL=#Default email that would se the reciver
    ``` 
