FROM nginx:stable-alpine

# install certbot
# RUN wget https://dl.eff.org/certbot-auto
# RUN chmod a+x certbot-auto
RUN apk update
RUN apk add --no-cache certbot

# install cron
# RUN /usr/sbin/crond -help

# need to transform with env variables
COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 80:80
EXPOSE 443:443

# run command
## launch proxy
## certbot get or renew and rewrite nginx config
## setup cron for certbot renew
### potentially move renew to separate container with mounted volume - dunno if any benefit, need to research
RUN certbot certonly --standalone -d test.adarich.com --email james.adarich@gmail.com --staging --non-interactive --agree-tos; exit 0
# RUN cat /etc/nginx/conf.d/nginx.conf
RUN cat /var/log/letsencrypt/letsencrypt.log
CMD [ "certbot", "--nginx", "--domains", "test.adarich.com", "--email", "james.adarich@gmail.com", "--staging" ]
