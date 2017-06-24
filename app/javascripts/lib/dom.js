export const tag = (type, { id, klass, style } = {}, html) => {
  const el = document.createElement(type);

  if (id) el.id = id;
  if (klass) el.className = klass;
  if (style) {
    Object.keys(style).map(key => {
      el.style[key] = style[key];
    });
  }


  if (html) el.innerHTML = html;

  return el;
};
