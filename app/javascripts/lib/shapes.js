const style = ngon =>
  ngon
    .fill({ color: 'transparent' })
    .stroke({ color: 'black', width: 2 });

export const hexagon = surface =>
  style(
    surface
      .polygon()
      .ngon({ radius: 300, edges: 6 })
  );

export const pentagon = surface =>
  style(
    surface
      .polygon()
      .ngon({ radius: 300, edges: 5 })
  );

export const diamond = surface =>
  style(
    surface
      .polygon()
      .ngon({ radius: 300, edges: 4 })
  );

export const triangle = surface =>
  style(
    surface
      .polygon()
      .ngon({ radius: 300, edges: 3 })
  );
