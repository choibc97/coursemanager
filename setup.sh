#!/bin/bash

# setup script
# presumes a debian linux distribution (ubuntu specifically)
# meaning it will use apt to install packages

# upgrade existing packages
sudo apt update
sudo apt upgrade
sudo apt full-upgrade
sudo apt autoremove

# install everything else we'll need
sudo apt install python3-pip python3-dev libpq-dev postgresql postgresql-contrib nginx curl

# everything related to postgres
sudo -u postgres psql -c "CREATE DATABASE coursemanager"
read -p "postgres django password: " postgres_pass
sudo -u postgres psql -c "CREATE USER django WITH PASSWORD '${postgres_pass}'"
sudo -u postgres psql -c "ALTER ROLE django SET client_encoding TO 'utf8'"
sudo -u postgres psql -c "ALTER ROLE django SET default_transaction_isolation TO 'read committed'"
sudo -u postgres psql -c "ALTER ROLE django SET timezone TO 'UTC'"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE coursemanager TO django"

# python environment
sudp pip3 install virtualenv
python3 -m venv env
source env/bin/activate
pip install wheel
pip install -r requirements.txt

# get input necessary to set up secrets.py
read -p "domain (e.g. masters.benjaminchoi.com): " domain
read -p "server ip address (e.g. 123.45.678.901): " server
read -p "course manager email: " email
read -p "course manager email password: " email_pass
secret_key=$(python ./coursemanager/coursemanager/setup.py)

# write needed variables to secrets.py
touch ./coursemanager/coursemanager/secrets.py
echo "SECRET_KEY = '${secret_key}'" >>./coursemanager/coursemanager/secrets.py
echo "DOMAIN = '${domain}'" >>./coursemanager/coursemanager/secrets.py
echo "SERVER_IP_ADDRESS = '${server}'" >>./coursemanager/coursemanager/secrets.py
echo "EMAIL_HOST_USER = '${email}'" >>./coursemanager/coursemanager/secrets.py
echo "EMAIL_HOST_PASSWORD = '${email_pass}'" >>./coursemanager/coursemanager/secrets.py
echo "POSTGRES_PASSWORD = '${postgres_pass}'" >>./coursemanager/coursemanager/secrets.py

# initialize django project
python ./coursemanager/manage.py makemigrations
python ./coursemanager/manage.py migrate
python ./coursemanager/manage.py createsuperuser
python ./coursemanager/manage.py collectstatic

# setup gunicorn
sudo cp gunicorn.socket /etc/systemd/system/coursemanager-gunicorn.socket
sudo cp gunicorn.service /etc/systemd/system/coursemanager-gunicorn.service
sudo sed -i "s,User=user,User=${USER}," /etc/systemd/system/coursemanager-gunicorn.service
path=$(pwd)
sudo sed -i "s,WorkingDirectory=path,WorkingDirectory=${path}/coursemanager," /etc/systemd/system/coursemanager-gunicorn.service
sudo sed -i "s,ExecStart=env_gunicorn,ExecStart=${path}/env/bin/gunicorn," /etc/systemd/system/coursemanager-gunicorn.service
sudo systemctl start coursemanager-gunicorn.socket
sudo systemctl enable coursemanager-gunicorn.socket
sudo systemctl daemon-reload
sudo systemctl restart coursemanager-gunicorn

# setup nginx
sudo cp nginx.txt /etc/nginx/sites-available/coursemanager
sudo sed -i "s,server_name domain,server_name ${domain}," /etc/nginx/sites-available/coursemanager
sudo sed -i "s,root static_dir,root ${path}/coursemanager," /etc/nginx/sites-available/coursemanager
sudo sed -i "s,root media_dir,root ${path}/coursemanager," /etc/nginx/sites-available/coursemanager
sudo ln -s /etc/nginx/sites-available/coursemanager /etc/nginx/sites-enabled
sudo systemctl restart nginx
sudo ufw allow 'Nginx Full'

# install needed node_modules
npm i
