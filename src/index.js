const request = require('request');
const Base64 = require('js-base64').Base64;

exports.handler = function(context, event, callback) {
  const response = new Twilio.Response();
  console.log('Event:', event);

  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST");
  response.appendHeader("Content-Type", "application/json");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  
  if (Object.keys(event).length === 0 && event.constructor === Object) {
      console.log('No event found. Returning generic response');
      response.setStatusCode(200);
      return callback(null, response);
  }
  
  const client = context.getTwilioClient();
  const { workerSid, activitySid, rejectPendingReservations } = event;
  
  const taskrouterUrl = `https://taskrouter.twilio.com/v1/Workspaces/${context.TWILIO_WORKSPACE_SID}/Workers/${workerSid}`;
  const authorizationHeader = `Basic ${Base64.encode(`${context.ACCOUNT_SID}:${context.AUTH_TOKEN}`)}`;
  console.log('Authorization Header:', authorizationHeader);
  
  request.post({
      url: taskrouterUrl,
      headers: {
          Authorization: authorizationHeader
      },
      form: {
          ActivitySid: activitySid,
          RejectPendingReservations: rejectPendingReservations
      }
  }, (err, res, body) => {
      if (err) {
          console.log('Error:', err);
      }
      console.log('Response:', response);
      console.log('Response Body:', body);
      response.setStatusCode(200);
      response.setBody(body);
      callback(null, response);
  });
};