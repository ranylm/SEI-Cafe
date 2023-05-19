import sendRequest from "./send-request";

const BASE_URL = "/api/users";

export function signUp(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

// import { getToken } from "./users-service";

// const BASE_URL = "/api/users";

// export function signUp(userData) {
//   return sendRequest(BASE_URL, "POST", userData);
// }

// export function login(credentials) {
//   return sendRequest(`${BASE_URL}/login`, "POST", credentials);
// }

// /*--- Helper Functions ---*/

// type Options = {
//   method?: string;
//   headers?: { "Content-Type"?: string; Authorization?: string };
//   body?: string;
// };
// async function sendRequest(url, method = "GET", payload = null) {
//   // Fetch accepts an options object as the 2nd argument
//   // used to include a data payload, set headers, etc.
//   const options: Options = {};
//   console.log("sendRequest ", payload);
//   if (payload) {
//     options.method = method;
//     options.headers = { "Content-Type": "application/json" };
//     options.body = JSON.stringify(payload);
//   }
//   const token = getToken();
//   if (token) {
//     options.headers = options.headers || {};
//     options.headers.Authorization = "Bearer " + token;
//   }
//   const res = await fetch(url, options);
//   console.log("REQUEST : ", res);
//   // res.ok will be false if the status code set to 4xx in the controller action
//   if (res.ok) return res.json();
//   throw new Error("Bad Request");
// }
