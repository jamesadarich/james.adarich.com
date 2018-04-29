FROM node:8

MAINTAINER jamesrichford@googlemail.com

# Set build arguments
ARG SITE_DOMAIN

# Create build directory
RUN mkdir -p /${SITE_DOMAIN}
WORKDIR /${SITE_DOMAIN}

# Get required files
COPY gatsby-*.* /${SITE_DOMAIN}/
COPY server /${SITE_DOMAIN}/server
COPY src /${SITE_DOMAIN}/src
COPY package.json /${SITE_DOMAIN}/
COPY tsconfig.json /${SITE_DOMAIN}/

# Install app dependencies
RUN npm install

# Patch old dependency
# Should be removed when upgrading to gatsby 2
# https://github.com/jamesrichford/james.adarich.com/issues/6
RUN npm run patch:extract-text-plugin 

# Build app
RUN npm run build

# Tidy up
RUN rm -rf .cache
RUN rm -rf src
RUN rm -rf node_modules
RUN rm -rf server/**/*.ts
RUN rm -rf gatsby-*.*
RUN rm -rf package-lock.json
RUN rm -rf tsconfig.json

# Install production dependencies
RUN npm install --production

# Fire up the app
EXPOSE 80
CMD [ "npm", "start" ]
