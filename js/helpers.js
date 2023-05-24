export const createElement = (tagName, attrs) => {
  const elem = document.createElement(tagName);
  Object.assign(elem, attrs);
  return elem;
};