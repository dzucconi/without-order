import SVG from 'svg.js';
import 'svg.shapes.js';
import { interpolate, toCircle, fromCircle } from 'flubber';

import * as shapes from './shapes';

export default class Interpolate {
  constructor(el) {
    this.el = el;
    this.width = el.offsetWidth;
    this.height = el.offsetHeight;
    this.surface = SVG(this.el.id).size(this.width, this.height);
  }

  from(shape) {
    this.fromShape = shape;
    return this;
  }

  to(shape) {
    if (!this.fromShape) throw new Error('Must first populate `from`');
    if (this.fromShape === shape) throw new Error('Must be different shapes');

    this.toShape = shape;

    if (this.fromShape === 'circle') {
      const x = this.height / 2;
      const y = this.height / 2;
      const r = (x + y) / 2 - 2;
      const toShape = shapes[this.toShape](this.surface);
      this.surface.remove();
      return fromCircle(x, y, r, toShape.array().value);
    }

    if (this.toShape === 'circle') {
      const x = this.height / 2;
      const y = this.height / 2;
      const r = (x + y) / 2 - 2;
      const fromShape = shapes[this.fromShape](this.surface);
      this.surface.remove();
      return toCircle(fromShape.array().value, x, y, r);
    }

    const toShape = shapes[this.toShape](this.surface);
    const fromShape = shapes[this.fromShape](this.surface);

    this.surface.remove();

    return interpolate(fromShape.array().value, toShape.array().value);
  }
}
