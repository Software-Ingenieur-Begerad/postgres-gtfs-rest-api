# Postgres-gtfs-rest-api Setup

use the following steps to setup this service

## Preparation

* check out git repositories onto a development system as descirpted in the
[Quick Start Guide](../README.md#Quick-Start-Guide)

* archive project and copy onto host system
```
cd ..
tar -czvf <archive name>.tar.gz --exclude={"<root dir>/.git","<root dir>/node_modules"} postgres-gtfs-rest-api/
scp -P <host ssh port> <archive name>.tar.gz  <user>@<host>.<domain>:/home/<user>/
```

* [Setup Node.js and NPM](https://github.com/Software-Ingenieur-Begerad/setup/blob/main/doc/node.md) on target system

## Automatic Service Setup

* copy service source into the working folder
```
sudo tar -xzf /home/begerad/<archive name>.tar.gz -C /opt/
```

* install dependencies
```
cd /opt/<archive name>
npm i
```

* set up service environment on host system
```
sudo vi /opt/<archive name>/.env
```

* define the following environment variables
```
DB_HOST=<host running database>
DB_PORT=<port of host running database>
DB_USER=<user granted permissions for database>
DB_PASSWORD=<user key>
DB_NAME=<database name>
NODE_ENV=<node environment mode>
PORT=<port offering this service>
```

* create group and user <service name>
like this [setup](https://github.com/Software-Ingenieur-Begerad/setup/blob/main/doc/grp-usr.md)

* adjust group and user privileges
```
sudo chown -R <service name>:<service name> /opt/<archive name>
```

* prepare pm2 like this [setup](https://github.com/Software-Ingenieur-Begerad/setup/blob/main/doc/pm2.md)

* start the service as npm start script with PM2
```
cd /opt/<archive name>
pm2 start --name <archive name> npm -- start --watch
```

* register/save the current list of processes you want to manage using PM2 so that they will re-spawn at system boot (every time it is expected or an unexpected server restart)
```
pm2 save
```

* restart your system, and check if all the serviceis running under PM2
```
pm2 ls
```
or
```
pm2 status
```

* if service shall be provided to other consumers as localhost, adjust firewall accordingsly

## Manual Service Invocation For Development
* call service manually
```
npm i
npm run dev
```
