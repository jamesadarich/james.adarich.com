# james.adarich.com
My personal website

## Setup

`npm install`

### Environment Variables

--- optional ---

SITE_DOMAIN - website domain (default: james.adarich.com)
GOOGLE_TAG_MANAGER_ID - google tag manager id

### Google Tag Manger / Analytics

Ensure you set your `GOOGLE_TAG_MANAGER_ID` environment variable, if you don't want it though it won't be included if you don't set the variable.

## Run in production mode

`npm run build && npm run build:gzip && npm start`

## Deploying

Deployment instructions can be found in the [guide](DEPLOYMENT.md)
