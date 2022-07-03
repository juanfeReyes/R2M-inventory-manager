CREATE USER keycloak_user WITH SUPERUSER PASSWORD 'password';
CREATE DATABASE keycloak  OWNER keycloak_user;


CREATE USER inventory_manager_user WITH SUPERUSER PASSWORD 'password';
CREATE DATABASE inventory_manager OWNER inventory_manager_user;
GRANT ALL PRIVILEGES ON DATABASE inventory_manager TO inventory_manager_user;
CREATE SCHEMA IF NOT EXISTS  inventory_manager AUTHORIZATION inventory_manager_user;
