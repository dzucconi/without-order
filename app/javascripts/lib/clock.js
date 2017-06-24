import * as dom from './dom';

export default class Clock {
  constructor(el) {
    this.hands = {
      hour: dom.tag('div', { klass: 'hour hand' }),
      minute: dom.tag('div', { klass: 'minute hand' }),
      second: dom.tag('div', { klass: 'second hand' }),
    };

    Object
      .keys(this.hands)
      .map(hand =>
        el.appendChild(this.hands[hand])
      );

    this.registered = [];

    this.tick();
  }

  tick() {
    this.sethandRotation('hour');
    this.sethandRotation('minute');
    this.sethandRotation('second');
    this.registered.map(fn => fn(this.progress()));
  }

  now() {
    return this.sethandRotation('second');
  }

  progress() {
    const now = this.now();
    const secondsInADay = 24 * 60 * 60;
    const hours = now.getHours() * 60 * 60;
    const minutes = now.getMinutes() * 60;
    const seconds = now.getSeconds();
    const totalSeconds = hours + minutes + seconds;
    return 100 * totalSeconds / secondsInADay;
  }

  register(fn) {
    this.registered.push(fn);
  }

  start() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  stop() {
    window.clearInteval(this.interval);
  }

  sethandRotation(hand) {
    let date = new Date(), hours, minutes, seconds, percentage, degree;

    switch (hand) {
    case 'hour':
      hours = date.getHours();
      hand = this.hands.hour;
      percentage = this.numberToPercentage(hours, 12);
      break;

    case 'minute':
      minutes = date.getMinutes();
      hand = this.hands.minute;
      percentage = this.numberToPercentage(minutes, 60);
      break;

    case 'second':
      seconds = date.getSeconds();
      hand = this.hands.second;
      percentage = this.numberToPercentage(seconds, 60);
      break;
    }

    degree = this.percentageToDegree(percentage);
    hand.style.transform = `rotate(${degree}deg) translate(-50%, -50%)`;

    return date;
  }

  numberToPercentage(number = 0, max = 60) {
    return (number / max) * 100;
  }

  percentageToDegree(percentage = 0) {
    return (percentage * 360) / 100;
  }
}
