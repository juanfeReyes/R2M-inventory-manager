# Inventory manager

The purpose of this project is to study Flowable, MongoDB, BPMN 2.0


## Execute flowable UI docker:
docker run -p 8085:8080 flowable/flowable-ui

Go to: http://localhost:8085/flowable-ui

user: admin
password: test

## Export keycloak configuration  

Run the following command inside de docker container:
```shell
/opt/jboss/keycloak/bin/standalone.sh \
-Djboss.socket.binding.port-offset=100 -Dkeycloak.migration.action=export \
-Dkeycloak.migration.realmName=inventory_manager \
-Dkeycloak.migration.provider=singleFile \
-Dkeycloak.migration.usersExportStrategy=REALM_FILE \
-Dkeycloak.migration.file=/tmp/inventory-manager-api-realm.json
```
