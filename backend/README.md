# Backend

File in that folder descibe backend logic and include all neccesary files

## Installation

Here is two ways to run backend by [docker](https://www.docker.com/get-started/) or by [python](https://www.python.org/)

* if you choice python
```bash
pip install -r requirements.txt
```

## Usage
* General
  * first of all you need create .env file like .env.sample where you input you db infromation
* Python
    ```bash
    python manage.py migrate
    python manage.py runservers
    ```
* Docker
    ```bash
    docker-compose up
    ```
