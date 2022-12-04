import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('.input[name="delay"]'),
  step: document.querySelector('.input[name="step"]'),
  amount: document.querySelector('.input[name="amount"]'),
};

document.querySelector('input[name="delay"]').setAttribute('min', 0);
document.querySelector('input[name="step"]').setAttribute('min', 0);
document.querySelector('input[name="amount"]').setAttribute('min', 0);

refs.form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const { delay, step, amount } = event.currentTarget;

  let delayFirst = Number(delay.value);
  const stepDelay = Number(step.value);
  const amountNumber = Number(amount.value);

  for (let position = 1; position <= amountNumber; position += 1) {
    delayFirst += stepDelay;
    createPromise(position, delayFirst);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
