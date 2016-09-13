import DOMNodeCollection from './dom_node_collection';

const _docReadyCallbacks = [];
let _docReady = false;

window.$l = (arg) => {
  let returnValue;
  switch(typeof arg) {
    case 'function':
      registerDocReadyCallback(arg);
      break;
    case 'string':
      // convert NodeList to Array: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
      returnValue = DOMNodeCollection([...document.querySelectorAll(arg)]);
      break;
    case 'object':
      if (arg instanceof HTMLElement) { // single HTMLElement
        returnValue = DOMNodeCollection([arg]);
      }
      break;
    }
  return returnValue;
};

$l.extend = (base, ...otherObjs) => {
  otherObjs.forEach((obj) => {
    for (prop in obj) {
      if (obj.hasOwnProperty(prop)) base[prop] = obj[prop];
    }
  });
  return base;
};

$l.ajax = (options = {}) => {
  const xhr = new XMLHttpRequest();
  const defaults = {
    method: 'GET',
    url: '',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {},
    success: () => {},
    error: () => {}
  };
  
  options = $l.extend(defaults, options);
}

registerDocReadyCallback = func => {
  if (!_docReady) {
    _docReadyCallbacks.push(func);
  } else {
    func();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach( func => func() );
});
