import params from 'queryparams';
import Clock from './lib/clock';
import Interpolate from './lib/interpolate';
import rand from './lib/rand';
import randomColor from './lib/randomColor';
import * as shapes from './lib/shapes';

window.params = params;

const DOM = {
  app: document.getElementById('App'),
  hands: document.getElementsByClassName('Hand')
};

const PARAMS = params({
  from: '',
  to: '',
  color: randomColor()
});

const STATE = {
  scalar: 1.0,
  rendered: {}
};

const render = ([fromShape, toShape], { color }) => {
  const interpolate = new Interpolate(DOM.app);
  const interpolator = interpolate.from(fromShape).to(toShape);

  const face = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  face.setAttribute('width', '100%');
  face.setAttribute('height', '100%');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'black');
  path.setAttribute('stroke-width', '2px');
  path.setAttribute('stroke', color);

  face.appendChild(path);
  DOM.app.appendChild(face);

  return {
    remove: () => face.parentNode.removeChild(face),

    transform: progress => {
      // Reset path position
      path.style.transform = 'translate(0, 0)';

      // Render interpolation
      path.setAttribute('d', interpolator(progress / 100.0));

      // Center path
      const rect = path.getBBox();
      const dX =
        path.parentNode.width.baseVal.value / 2 - rect.width / 2 - rect.x;
      const dY =
        path.parentNode.height.baseVal.value / 2 - rect.height / 2 - rect.y;

      path.style.transform = `translate(${dX}px, ${dY}px)`;
    }
  };
};

const init = () => {
  // Fill out params and redirect to the URL
  let redirect = false;

  if (!PARAMS.from) {
    PARAMS.from = rand(Object.keys(shapes));
    redirect = true;
  }

  while (!PARAMS.to || PARAMS.to === PARAMS.from) {
    PARAMS.to = rand(Object.keys(shapes));
    redirect = true;
  }

  if (redirect) params.reconfigure(params.options);

  // Setup clock
  const clock = new Clock(DOM.app);
  clock.start();

  // Color
  Array.prototype.map.call(
    DOM.hands,
    el => (el.style.backgroundColor = PARAMS.color)
  );

  // Setup resizing
  const size = () => {
    STATE.scalar =
      Math.min(
        window.innerWidth / DOM.app.offsetWidth,
        window.innerHeight / DOM.app.offsetHeight
      ) * 0.88;

    DOM.app.style.transform = `translate(-50%, -50%) scale(${STATE.scalar})`;
  };

  window.addEventListener('resize', size);

  // Render
  STATE.rendered = render([PARAMS.from, PARAMS.to], { color: PARAMS.color });

  // Register with the clock
  clock.register(STATE.rendered.transform);

  const sync = () => {
    size();
    STATE.rendered.transform(clock.progress());
  };

  sync();
};

document.addEventListener('DOMContentLoaded', init);
