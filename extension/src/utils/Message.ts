const send = async (message) => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, response => {
      resolve(response);
    });
  });
}


const Message = {
  send,
}

export default Message;