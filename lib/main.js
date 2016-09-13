import DOMNodeCollection from './dom_node_collection';

const $l = (arg) => {
  if (arg instanceof HTMLElement) { // single HTMLElement
    return DOMNodeCollection([arg]);
  } else { //string with CSS selector
    // convert NodeList to Array: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
    return DOMNodeCollection([...document.querySelectorAll(arg)]);
  }
};

window.$l = $l;
