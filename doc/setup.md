# Postgres-gtfs-rest-api Setup

## Table of Contents
0. [Prepqration](#preparation)
1. [Deployment with Monit](./deployment-with-monit.md)
2. [Deployment with pm2](./deployment-with-pm2.md)

# Preparation

* check out git repository as descirbted in the
[Quick Start Guide](../README.md#Quick-Start-Guide)
* download GTFS static file in question
* make use of [this](https://github.com/Software-Ingenieur-Begerad/gtfs2psqlschema#readme) repository to load GTFS data into Postgres database
* set up ssh tunnel\
```
ssh -L <local port>:localhost:5432 <user>@<postgrs host>
```
* create schema\
```
~/git/gtfs2psqlschema/gtfs_schema.sh . > <schema name>.sql
```
* load feed into database\
```
psql --host=localhost --port=5442 --username=<usr> --dbname=<db> --file=<schema name> --password

# [Deployment with Monit](./deployment-with-monit.md)
# [Deployment with pm2](./deployment-with-pm2.md)
