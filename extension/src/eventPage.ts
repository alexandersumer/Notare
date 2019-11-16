import { loginRequest } from "./api/backendapi";

// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // onMessage must return "true" if response is async.
  let isResponseAsync = true;

  // handle all backend request types
  if (request.login) {
    const { route, body } = request.login;
    loginRequest(route, body).then(response => {
      sendResponse(response);
    });
  }

  return isResponseAsync;
});
