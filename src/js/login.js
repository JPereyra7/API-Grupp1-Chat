const username = document.getElementById("username");
const password = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const loginForm = document.getElementById("loginForm");

async function fetchUsers() {
  return await (await fetch("http://localhost:3000/getAll")).json();
}

loginForm.addEventListener("click", async (event) => {
  event.preventDefault();
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
      // alert("Successful login");
      window.open("/index.html");
    } else {
      console.log("Wrong username or password");
    }
  } catch (err) {
    console.error(err, "Failed");
  }
});
