# Postgres-gtfs-rest-api
REST API to request GTFS data from postgres database

## Table of Contents
0. [General](#General)
1. [Quick Start Guide](#Quick-Start-Guide)
2. [Setup](doc/setup.md)
3. [SQL Statemants](#SQL-Statements)
4. [Links](#Links)

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
DEBUG=trip-head-sign,routes,frequencies,stops,config,index,app,root,agency,db npm run dev
```

## Production deployment

* run the following instruction to start the service in production mode
```
npm run start
```

# SQL Statemants

## VBN GTFS Data Set

* get trip direction from trip number

```
select trip_headsign from trips where trip_short_name='1226016';
```

* get route number from trip number

```
select routes.route_short_name from routes, trips where trips.trip_short_name='1226015' AND routes.route_id=trips.route_id;
```

* get agency name from route number

```
select agency.agency_name from agency,routes where routes.route_id='47189' AND routes.agency_id=agency.agency_id;
```

* get agency URL from route number

```
select agency.agency_url from agency,routes where routes.route_id='47189' AND routes.agency_id=agency.agency_id;
```

* other

```
select route_id,trip_headsign from trips where trip_short_name='1226016';
select * from routes where route_id='47189';
select * from agency where agency_id='121';select route_id, agency_id, route_short_name from routes where route_id='61625';
select trips.route_id, agency.agency_id, agency.agency_name, route_short_name, service_id, trip_id, trip_headsign, trip_short_name from agency, routes, trips where trips.route_id='61625' AND trip_short_name='4450024' AND agency.agency_id='143' AND route_short_name='450';
select trips.route_id, routes.agency_id, route_short_name, service_id, trip_id, trip_headsign, trip_short_name from routes, trips where trips.route_id='61625' AND routes.agency_id='143' AND route_short_name='450';
```

# Link

* [ProxyPass apache https to a node server](https://stackoverflow.com/questions/34865193/proxypass-apache-https-to-a-node-server)
