import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonStart = document.querySelector('button[data-start]');
buttonStart.disabled = true;

const dayTimer = document.querySelector('span[data-days]');
const hourTimer = document.querySelector('span[data-hours]');
const minuteTimer = document.querySelector('span[data-minutes]');
const secondTimer = document.querySelector('span[data-seconds]');
let timerId = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);

    if(new Date().getTime() > selectedDates[0].getTime()) {
       Notify.failure('Please choose a date in the future');
    }else {
    buttonStart.disabled = false;
        buttonStart.addEventListener('click', () => {
            timerId = setInterval(() => {
                buttonStart.disabled = true;
                const diference = selectedDates[0].getTime() - new Date().getTime();
                if (diference < 1000) {
                    clearInterval(timerId);
                    secondTimer.textContent = '00';
                } else {
                    function convertMs(ms) {
                        const second = 1000;
                        const minute = second * 60;
                        const hour = minute * 60;
                        const day = hour * 24;

                        const days = Math.floor(ms / day);
                        const hours = Math.floor((ms % day) / hour);
                        const minutes = Math.floor(((ms % day) % hour) / minute);
                        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

                        return { days, hours, minutes, seconds };
                    };
                    dayTimer.textContent = addLeadingZero(convertMs(diference).days);
                    hourTimer.textContent = addLeadingZero(convertMs(diference).hours);
                    minuteTimer.textContent = addLeadingZero(convertMs(diference).minutes);
                    secondTimer.textContent = addLeadingZero(convertMs(diference).seconds);
                    function addLeadingZero(value) {
                        return String(value).padStart(2, '0');
                    };
                };
                
            },1000);
        });
      };
    }
};

flatpickr('input#datetime-picker', options);
