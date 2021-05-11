const input = document.querySelector("#text");
const form = document.querySelector("form");
const paragrafi1 = document.getElementById("p1");
const paragrafi2 = document.getElementById("p2");
const paragrafi3 = document.getElementById("p3");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  paragrafi1.innerText = "Loading...";
  paragrafi2.innerText = "";
  paragrafi3.innerText = "";

  const value = input.value;
  fetch("http://localhost:3000/weather?address=" + value).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log("error fafsd");
      } else {
        paragrafi1.innerText = data.degree;
        paragrafi2.innerText = data.weather;
        paragrafi3.innerText = data.cloud;
      }
    });
  });
});
