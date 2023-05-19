import * as usersAPI from "./users-api";

export async function signUp(userData) {
  // Delete the network request code to the
  // users-api.js module which will ultimately
  // return the JWT
  const token = await usersAPI.signUp(userData);
  // Persist the token to localStorage
  localStorage.setItem("token", token);
  return getUser();
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  // Persist the token to localStorage
  localStorage.setItem("token", token);
  return getUser();
}

export function getToken() {
  const token = localStorage.getItem("token");
  // getItem will return null if no key
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  // A JWT's expiration is expressed in seconds, not miliseconds
  if (payload.exp < Date.now() / 1000) {
    // Token has expired
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export function logOut() {
  localStorage.removeItem("token");
}
// import * as usersAPI from "./users-api";

// export async function signUp(userData) {
//   const response = await usersAPI.signUp(userData);
//   // const token = await response?.json();
//   localStorage.setItem("token", response);
//   return getUser();
// }

// export async function login(credentials) {
//   try {
//     const token = await usersAPI.login(credentials);
//     localStorage.setItem("token", token);
//     return token ? JSON.parse(atob(token.split(".")[1])).user : null;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function logout(setUser) {
//   localStorage.removeItem("token");
//   setUser("");
// }

// export function getToken() {
//   // getItem returns null if there's no string
//   const token = localStorage.getItem("token");
//   if (!token) return null;
//   // Obtain the payload of the token
//   const payload = JSON.parse(atob(token.split(".")[1]));
//   // A JWT's exp is expressed in seconds, not milliseconds, so convert
//   if (payload.exp < Date.now() / 1000) {
//     // Token has expired - remove it from localStorage
//     localStorage.removeItem("token");
//     return null;
//   }
//   return token;
// }

// export function getUser() {
//   const token = getToken();
//   // If there's a token, return the user in the payload, otherwise return null
//   return token ? JSON.parse(atob(token.split(".")[1])).user : null;
// }

// export function setUser(user) {
//   localStorage.setItem("token", user);
// }

// // export function checkToken() {
// //   const token = localStorage.getItem("token");
// //   if (token === null) return null;
// //   const expirationDate = JSON.parse(atob(token.split(".")[1]));
// //   const date = new Date(expirationDate.updatedAt);
// //   console.log("here", Date.now(), date);
// // }
