export const tag = (type, { id, klass, style, data } = {}, html) => {
  const el = document.createElement(type);

  if (id) el.id = id;
  if (klass) el.className = klass;
  if (style) {
    Object.keys(style).map(key => {
      el.style[key] = style[key];
    });
  }
  if (data) {
    Object.keys(data).map(key => {
      el.setAttribute(`data-${key}`, data[key]);
    });
  }


  if (html) el.innerHTML = html;

  return el;
};
