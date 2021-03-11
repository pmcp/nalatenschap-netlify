// const items = require('../shared/googleAPI.json');
// NOTE: Don't forget export GOOGLE_APPLICATION_CREDENTIALS="APIKeys/kasperdm-e7b1934ad128.json"
// https://answers.netlify.com/t/firebase-include-google-application-credentials-json-file-in-bundle/4054/10
// TODO:
// Imports the Google Cloud client library
const { Translate } = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate({
  projectId: 'kasperdm-c673a,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY.split("\\n").join("\n")
  });

async function translateText(text, target) {
  // text = 'The text to translate';
  // target = 'nl';

  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let translations = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  return translations[0];
}

exports.handler = async function(event, context) {
  const text = JSON.parse(event.queryStringParameters.text);
  const languages = JSON.parse(event.queryStringParameters.languages);

  return Promise.all(languages.map((l) => translateText(text, l))).then(
    (data) => {
      // console.log(data);
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    }
  );
};
