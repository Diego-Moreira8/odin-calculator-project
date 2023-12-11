(function currentTime() {
  const clock = document.querySelector(".clock");
  const time = new Date().toLocaleTimeString("pt-BR", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });

  clock.textContent = time;

  setTimeout(() => currentTime(), 30000);
})();

const windowBtns = document.querySelectorAll(".window-button");

windowBtns.forEach((btn) => btn.addEventListener("click", minimizeWindow));

function minimizeWindow(e) {
  const target = e.target.getAttribute("data-target");
  const window = document.querySelector(`.${target}`);
  window.classList.toggle("hidden");
}
