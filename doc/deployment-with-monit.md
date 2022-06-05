# Deployment with Monit

* configure Node.js for deployment user\
```
node -v
which node
touch ~/.profile
chmod 700 ~/.profile
curl https://raw.githubusercontent.com/creationix/nvm/v0.39.1/install.sh | bash
cat .profile
```
* log out and in again to varify node.js is available in the correct version\
```
echo $NVM_DIR
nvm -h
nvm ls-remote
nvm i 16.15.1
/usr/bin/node -v
node -v
```
* checkout git repository of API\
```
git clone https://github.com/Software-Ingenieur-Begerad/postgres-gtfs-rest-api.git
cd postgres-gtfs-rest-api/
```
* configure API\
```
scp ~/.env <usr>@<deployment host>:~
mv ~/.env postgres-gtfs-rest-api/
vi .env
```
* install dependencies and test API\
```
cd postgres-gtfs-rest-api/
npm i
less README.md 
DEBUG=trip-count,route-count,service-overview,mapping,gtfs,date,servicedays,service,trips,agency-url,agency-name,route-short-name,trip-headsign,routes,frequencies,stops,config,index,app,root,agency,db node index.js
curl <host>:<port>/route-count?agencyid=231
```

* configure Monit\
```
cd
touch .monitrc
chmod 600 .monitrc
vi .monitrc
```
* enter the following configuration filling in the <> gaps\
```
set daemon 60
    with start delay 12
set logfile <~>/monit/var/monit.log
set idfile <~>/monit/var/monit.id
set statefile <~>/monit/var/monit.state
set mailserver localhost
set mail-format { from: webmaster@<host> }
set alert <usr email>@<host>
set httpd port 32123 address 127.0.0.1
    allow monit:ao5Ge1wohGaije
check process <service name> with pidfile <~>/var/<service name>.pid
    start program "<~>/bin/start-<service name>"
    stop program "/bin/bash -c '/bin/kill $( cat <~>/var/<service name>.pid )'"
```
* enter the following start script filling in the <> gaps\
```
#!/bin/bash

export PATH=<~>/.nvm/versions/node/v16.15.1/bin:/usr/local/bin:/usr/bin:/bin
export HOME=<~>
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

cd $HOME/postgres-gtfs-rest-api
exec node index.js >$HOME/var/<service name>.log 2>&1 &
echo $! >$HOME/var/<service name>.pid
```
* configure cron\
```
TODO
```
* configure Apache2 web server
```
cd doms/<domain>/
rm -rf subs/www/ subs-ssl/www/
vi htdocs-ssl/.htaccess 
```
* enter the following Apache2 config filling in the <> gaps\
```
DirectoryIndex disabled
RewriteEngine On
RewriteBase /
RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_FILENAME} !-f
RewriteRule .* http://127.0.0.1:<port>%{REQUEST_URI} [proxy]
RequestHeader set X-Forwarded-Proto "https"
```
* test API in a browser\
```
https://www.v1gtfs.vbn.api.swingbe.de/
```
* test API with CLI instruction\
```
curl https://www.v1gtfs.vbn.api.swingbe.de/
curl https://www.v1gtfs.vbn.api.swingbe.de/route-count?agencyid=231
```
