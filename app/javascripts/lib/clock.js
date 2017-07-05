import * as dom from './dom';
import { real } from './mechanism';

export default class Clock {
  constructor(el, mechanism) {
    this.mechanism = mechanism || real;

    this.hands = {
      hour: dom.tag('div', { klass: 'Hand' }),
      minute: dom.tag('div', { klass: 'Hand' }),
      second: dom.tag('div', { klass: 'Hand' }),
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

    Object
      .keys(this.registered)
      .map(key =>
        this.registered[key](this.progress())
      );
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
    this.registered[fn] = fn;
  }

  unregister(fn) {
    delete this.registered[fn];
  }

  start() {
    if (this.running) return;

    const tock = () => {
      if (this.stopped) return;
      this.tick();
      window.requestAnimationFrame(tock);
    };

    window.requestAnimationFrame(tock);

    this.running = true;
  }

  stop(boolean = true) {
    this.stopped = boolean;
  }

  sethandRotation(hand) {
    const now = this.mechanism();

    let hours, minutes, seconds, percentage, degree;

    switch (hand) {
    case 'hour':
      hours = now.getHours();
      hand = this.hands.hour;
      percentage = this.numberToPercentage(hours, 12.0);
      break;

    case 'minute':
      minutes = now.getMinutes();
      hand = this.hands.minute;
      percentage = this.numberToPercentage(minutes, 60.0);
      break;

    case 'second':
      seconds = now.getSeconds() + (now.getMilliseconds() / 1000.0);
      hand = this.hands.second;
      percentage = this.numberToPercentage(seconds, 60.0);

      break;
    }

    degree = this.percentageToDegree(percentage);
    hand.style.transform = `rotate(${degree}deg) translate(-50%, -50%)`;

    return now;
  }

  numberToPercentage(number = 0.0, max = 60.0) {
    return (number / max) * 100.0;
  }

  percentageToDegree(percentage = 0.0) {
    return (percentage * 360.0) / 100.0;
  }
}
