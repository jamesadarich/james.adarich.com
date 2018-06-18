FROM node:10 as build

# Set build arguments
ARG SITE_DOMAIN

# Get required files
COPY . .

# apparently phantom js needs to be installed first?
# check again when upgrading to gatsby 2
RUN npm install phantomjs-prebuilt --no-save

# Install app dependencies
RUN npm install

# Patch old dependency
# Should be removed when upgrading to gatsby 2
# https://github.com/jamesrichford/james.adarich.com/issues/6
RUN npm run patch:extract-text-plugin 

# Build app
RUN npm run build

FROM node:10-alpine

# Create build directory
RUN mkdir -p /${SITE_DOMAIN}
WORKDIR /${SITE_DOMAIN}

# Get files for production
COPY --from=build package.json .
COPY --from=build public public
COPY --from=build server server
RUN rm -rf server/**/*.ts

# Install production dependencies
RUN npm install --production

# Fire up the app
EXPOSE 80
CMD [ "npm", "start" ]
