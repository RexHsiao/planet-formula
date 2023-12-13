export function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}