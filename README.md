# Postgres-gtfs-rest-api
REST API to request GTFS data from postgres database

## Table of Contents
0. [General](#General)
1. [Quick Start Guide](#Quick-Start-Guide)
2. [Setup](doc/setup.md)

# General

TODO

# Quick Start Guide

## Preparation

* check out project and change into root folder
```
git clone git@github.com:Software-Ingenieur-Begerad/postgres-gtfs-rest-api.git
```

* run the following instruction to install dependenies.
```
npm i
```

## Development setup

* run the following instruction to start the service in development mode
```
DEBUG=routes,frequencies,stops,config,index,app,root,agency,db npm run dev
```

## Production deployment

* run the following instruction to start the service in production mode
```
npm run start
```

# Link

* [ProxyPass apache https to a node server](https://stackoverflow.com/questions/34865193/proxypass-apache-https-to-a-node-server)
