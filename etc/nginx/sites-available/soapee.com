server {
  server_name soapee.com;

  # ReactJS Static Files
  location / {
    gzip_static on;
    root /var/www/soapee.com/ui/current;
    try_files $uri /index.html;
  }

  # the NodeJS API server
  location /api {
    #define NODE_ENV
    passenger_app_env production;

    #api server index.js location
    passenger_app_root /var/www/soapee.com/api/current;
    passenger_app_type node;
    passenger_startup_file index.js;

    passenger_enabled on;
  }

}

# redirect www.soapee.com -> soapee.com
server {
    server_name  www.soapee.com;
    rewrite ^(.*) http://soapee.com$1 permanent;
}