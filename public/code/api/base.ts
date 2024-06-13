const BASE_URL = "https://api.buttondown.email";
const ENDPOINT = "/emails";
const METHOD = "GET";

const headers = {
  Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
};

fetch(`${BASE_URL}/v1${ENDPOINT}`, {
  method: METHOD,
  headers,
})
  .then((res) => res.json())
  .then((json) => console.log(json));
