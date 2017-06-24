import Clock from './lib/clock';
import randomColor from './lib/random_color';
import Interpolate from './lib/interpolate';

const DOM = {
  app: document.getElementById('app'),
  hands: document.getElementsByClassName('hand'),
};

export default () => {
  const clock = new Clock(DOM.app);
  clock.start();

  const color = randomColor();

  const interpolate = new Interpolate(DOM.app);
  const interpolator = interpolate.from('triangle').to('circle');

  const face = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  face.setAttribute('width', '100%');
  face.setAttribute('height', '100%');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'black');
  path.setAttribute('stroke-width', '2px');
  face.appendChild(path);

  DOM.app.appendChild(face);

  const transform = progress => {
    // Reset path position
    path.style.transform = 'translate(0, 0)';

    // Render interpolation
    path.setAttribute('d', interpolator(progress / 100.0));

    // Center path
    const rect = path.getBoundingClientRect();
    const dX = (window.innerWidth / 2) - (rect.width / 2) - rect.left;
    const dY = (window.innerHeight / 2) - (rect.height / 2) - rect.top;
    path.style.transform = `translate(${dX}px, ${dY}px)`;
  };

  transform(clock.progress());
  clock.register(transform);

  path.setAttribute('stroke', color);
  Array.prototype.map.call(DOM.hands, el =>
    el.style.backgroundColor = color);

};
