const username = document.getElementById("username");
const password = document.getElementById("password");
const loginButton = document.getElementById("loginButton");

async function fetchUsers() {
  return await (await fetch("http://localhost:3000/getAll")).json();
}

loginButton.addEventListener("click", async (event) => {
  event.preventDefault;
  let url = "http://localhost:3000/login";
  let method = "POST";

  let userLogin = {
    username: username.value,
    password: password.value,
  };

  username.value = "";
  password.value = "";

  try {
    let response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLogin),
    });
    if (response.ok) {
      alert("Successful login");
      window.open("/index.html");
    } else {
      alert("Failed to login");
    }
  } catch (err) {
    console.error(err, "Failed");
  }
});
