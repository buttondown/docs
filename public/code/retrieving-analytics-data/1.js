const BASE_URL = "https://api.buttondown.email";
const ENDPOINT = "/v1/emails/{id}/analytics";

const headers = {
  Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
};

fetch(`${BASE_URL}${ENDPOINT}`, {
  method: "GET",
  headers,
})
  .then((res) => res.json())
  .then((json) => console.log(json));
