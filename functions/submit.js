// require("dotenv").config();

const SparkPost = require("sparkpost");
const queryString = require("query-string");

const client = new SparkPost(process.env.SPARKPOST_API_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const params = querystring.parse(event.body);

  try {
    await client.transmissions.send({
      content: {
        from: "bot@sebastiandedeyne.com",
        subject: "Hello, World!",
        html: `
          <html>
            <body>
              <p>Name: ${params.name}</p>
              <p>E-mail: ${params.email}</p>
            </body>
          </html>
        `
      },
      recipients: [{ address: process.env.EMAIL_RECIPIENT }]
    });
  } catch (e) {
    return { statusCode: 500 };
  }

  return { statusCode: 200 };
};
