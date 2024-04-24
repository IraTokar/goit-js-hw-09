const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

buttonStop.disabled = true;

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

buttonStart.addEventListener('click', () => {
    buttonStart.disabled = true;
    buttonStop.disabled = false;
    timerId = setInterval(onButtonStart, 1000);
});

function onButtonStart() {
    body.style.backgroundColor = getRandomHexColor();
};

buttonStop.addEventListener('click', () => {
    clearInterval(timerId);
    buttonStart.disabled = false;
    buttonStop.disabled = true;
})




