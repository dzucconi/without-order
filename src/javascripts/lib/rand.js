const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);

export default xs => xs[rand(0, xs.length)];
