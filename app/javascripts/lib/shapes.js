const radius = ({ node: { width: { baseVal: { value }}}}) =>
  value / 2;

const style = ngon =>
  ngon
    .fill({ color: 'transparent' })
    .stroke({ color: 'black', width: 2 });

export const hexagon = surface =>
  style(
    surface
      .polygon()
      .ngon({
        radius: radius(surface),
        edges: 6,
      })
  );

export const pentagon = surface =>
  style(
    surface
      .polygon()
      .ngon({
        radius: radius(surface),
        edges: 5,
      })
  );

export const diamond = surface =>
  style(
    surface
      .polygon()
      .ngon({
        radius: radius(surface),
        edges: 4,
      })
  );

export const triangle = surface =>
  style(
    surface
      .polygon()
      .ngon({
        radius: radius(surface),
        edges: 3,
      })
  );

export const pentagram = surface =>
  style(
    surface
      .polygon()
      .star({
        inner: radius(surface) / 3,
        outer: radius(surface),
        spikes: 5,
      })
  );

export const hexagram = surface =>
  style(
    surface
      .polygon()
      .star({
        inner: radius(surface) / 2,
        outer: radius(surface),
        spikes: 6,
      })
  );

export const dodecagram = surface =>
  style(
    surface
      .polygon()
      .star({
        inner: radius(surface) / 2,
        outer: radius(surface),
        spikes: 12,
      })
  );

export const circle = null;
