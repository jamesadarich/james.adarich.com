FROM node:8

MAINTAINER jamesrichford@googlemail.com

# Install app dependencies
RUN npm install --production

# Build app
RUN npm run build

# Tidy up
RUN rm -rf /.cache
RUN rm -rf /node_modules
RUN rm -rf /src
RUN rm -rf /server/**/*.ts
RUN rm -rf *.*

# Fire up the app
EXPOSE 8080
CMD [ "npm", "start" ]