FROM node:8

MAINTAINER jamesrichford@googlemail.com

# Create build directory
RUN mkdir -p /james.adarich.com
WORKDIR /james.adarich.com

# Get required files
COPY gatsby-*.* /james.adarich.com/
COPY server /james.adarich.com/server
COPY src /james.adarich.com/src
COPY package.json /james.adarich.com/
COPY tsconfig.json /james.adarich.com/

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
EXPOSE 8080
CMD [ "npm", "start" ]
