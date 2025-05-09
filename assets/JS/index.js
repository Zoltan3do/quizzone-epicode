const checkmark = document.querySelector(".material-symbols-outlined");
const bottone = document.getElementById("start");
const rudeCheckbox = document.querySelector("#rude-checkbox");

window.addEventListener("load", init());
function init() {
  initStyles();
}

function initStyles() {
  checkmark.style.display = "none";
  bottone.disabled = true;
  bottone.style.cursor = "auto";
  bottone.style.opacity = 0.6;
  bottone.style.backgroundColor = "gray";
  bottone.addEventListener("mouseover", () => {
    bottone.style.boxShadow = "none";
  });
}

function checkbox() {
  checkmark.style.display = "inline-block";
  bottone.disabled = false;
  bottone.style.cursor = "pointer";
  bottone.style.opacity = 1;
  rudeCheckbox.style.color = "#c2138e";
  bottone.style.backgroundColor = "#02ffff";
  bottone.addEventListener("mouseover", () => {
    bottone.style.boxShadow =
      "0 0 20px rgba(2, 255, 255, 0.5), 0 0 20px rgba(2, 255, 255, 0.5), 0 0 20px rgba(2, 255, 255, 0.5)";
  });
  bottone.addEventListener("mouseout", () => {
    bottone.style.boxShadow = "none";
  });
}

// variabile di stato
let togglestate = true;
rudeCheckbox.addEventListener("click", function () {
  if (togglestate) {
    checkbox();
  } else {
    initStyles();
  }
  togglestate = !togglestate;
});

//cambio di pagina al click
bottone.addEventListener("click", function () {
  if (!bottone.disabled) {
    window.location.href = "test.html";
  }
});