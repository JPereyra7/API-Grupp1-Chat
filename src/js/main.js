const textMessage = document.getElementById("textMessage");
const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const url = "http://localhost:3000/createMessage";
  const method = "POST";

  const message = {
    messages: textMessage.value,
    username: "hej", //koppla till inloggad person
    // Vi måste skapa en variabel här som tar in så att meddelandena är kopplade till username
  };
  textMessage.value = "";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }
  } catch (err) {
    console.error(err, "server failed");
  }
});

//skriv loop för rendera meddelandena
