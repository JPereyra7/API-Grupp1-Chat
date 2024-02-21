const userName = document.getElementById("userName");
const password = document.getElementById("password");
const passwordAgain = document.getElementById("passwordAgain");
const submitButton = document.getElementById("submit");



async function fetchUsers() {
  return await (await fetch("http://localhost:3000/getAll")).json();
}

submitButton.addEventListener("click", async (ev) => {
  ev.preventDefault();
  let url = "http://localhost:3000/api/create";
  let method = "POST";

  let users = {
    username: userName.value,
    password: password.value,
    passwordIgen: passwordAgain.value,
  };

  userName.value = "";
  password.value = "";
  passwordAgain.value = "";

  try {
    let response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users),
    });

    if (response.ok) {
      alert("User created");
    } else {
      alert("Failed to create user, try again");
    }
  } catch (err) {
    console.error("Server failed:", err);
  }
});