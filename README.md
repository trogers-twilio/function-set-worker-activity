# Twilio Function: Set Worker Activity
## Overview
The Flex UI doesn't currently allow a user to change to a non-Idle/Available activity if they have pending reservations. However, the update worker REST API supports rejecting pending reservations when changing a worker's activity. 

This function acts as a middleware between the Flex UI and the REST API to supporting changing to a non-Idle/Available activity even with pending reservations.

## Deployment
The code in the `src/index.js` file can be run as is within a Twilio function. It requires a couple npm packages and a few environment variables. Navigate to the Twilio Console -> Runtime > Functions -> Configure page and setup the following:

#### Environment Variables
* `ACCOUNT_SID and AUTH_TOKEN` checkbox must be checked
* `TWILIO_WORKSPACE_SID` should contain the value of your Flex Workspace SID

#### NPM Packages
* js-base64: ^2.5.1
* request: ^2.88.0
