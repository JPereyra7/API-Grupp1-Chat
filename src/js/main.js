const textMessage = document.getElementById("textMessage");
const submitButton = document.getElementById("submitButton");
const messagesContainer = document.getElementById("messagesContainer");
const holderMessageBoxHolder = document.getElementById(
  "holderMessageBoxHolder"
);
const holderActualMessage = document.getElementById("holderActualMessage");
const senderMessageBoxHolder = document.getElementById(
  "senderMessageBoxHolder"
);
const senderMessager = document.getElementById("senderMessager");
const senderActualMessage = document.getElementById("senderActualMessage");

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const url = "http://localhost:3000/createMessage";
  const method = "POST";

  const message = {
    messages: textMessage.value,
  };
  textMessage.value = "";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      console.error("Failed to send message");
    } else {
      await renderAllMessages();
    }
  } catch (err) {
    console.error(err, "server failed");
  }
});

//skriv loop för rendera meddelandena
async function renderAllMessages() {
  const url = "http://localhost:3000/getAllMessages";
  const method = "GET";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      console.error("Failed to get message");
    }
    const allMessages = await response.json();
    messagesContainer.innerHTML = "";
    allMessages.forEach((message) => {
      const messageBoxHolder = document.createElement("div");
      const messageSenderContainer = document.createElement("div");
      const messageSender = document.createElement("a");
      const actualMessage = document.createElement("div");
      console.log(message);
      const isCurrentUser = message.isCurrentUser;
      actualMessage.textContent = `${message.messages}`;
      messageSender.textContent = `${message.username}`;

      console.log(`${message.messages}`);

      if (isCurrentUser == true) {
        actualMessage.className = "message-box";
        messageSenderContainer.className = "message-sender message-currentUser";
      } else {
        actualMessage.className = "message-box message-partner";
        messageSenderContainer.className = "message-sender";
      }

      messageBoxHolder.className = "message-box-holder";

      messageSenderContainer.appendChild(messageSender);
      messageBoxHolder.appendChild(messageSenderContainer);
      messageBoxHolder.appendChild(actualMessage);
      messagesContainer.appendChild(messageBoxHolder);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  } catch (err) {
    console.error(err, "server failed");
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  await renderAllMessages();
});
