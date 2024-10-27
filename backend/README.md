# c21-16-m-python-react

c21-16-m-python-react

# Backend

## Pasos para levantar el servidor:

1. Crear el entorno virtual:

```bash
python -m venv venv
```

2. Abrir el entorno virtual desde vs code con la extension de python:

   - Crt + Shift + P

   - Escoger la opcion de vs code: ">Python: Seleccionar interprete"

3. Instalar las dependencias del proyecto desde la consola:

```bash
pip install -r requirements.txt
```

4. Iniciar el servidor:

```bash
python manage.py runserver
```

## Nota:

Si el mensaje de despues de iniciar el servidor, es que hay migraciones sin aplicar, apagar el servidor y usar el siguiente comando:

```bash
python manage.py migrate
```

Y volver a iniciar el servidor.
