export default class DOMNodeCollection = {
  constructor(arr) {
    this.arr = arr  // array of HTMLElement
  }

  html(arg) {
    if (typeof arg === "string") {
      this.arr.forEach((element) => element.innerHTML = arg);
    } else {
      if (this.arr.length > 0) {
        return arr[0].innerHTML;
      }
    }
  }

  empty() {
    this.html("");
  }

  append(arg) {
    if (typeof arg === "string") {
      this.arr.forEach((element) => {
        element.innerHTML += arg;
      })
    } else if (arg instanceof DOMNodeCollection) {
      this.arr.forEach((element) => {
        arg.forEach((node) {
          element.innerHTML += node.outerHTML;
        })
      })
    } else if (arg instanceof HTMLElement) {
      this.append(new DOMNodeCollection([arg]));
    }
  }

  children() {
    const childNodes = this.arr.reduce((prev, current) => {
      prev.push.apply(prev, [...current.children()]);
      return prev;
    }, []);
    return new DOMNodeCollection(childNodes);
  }

  parent() {
    const parentNodes = this.arr.reduce((prev, current) => {
      prev.push.apply(prev, current.parentElement);
      return prev;
    }, []);
    return new DOMNodeCollection(parentNodes);
  }

  find(selector) {
    const nodes = this.arr.reduce((prev, current) => {
      prev.push.apply(prev, [...current.documentQuerySelectorAll(selector)]);
    }, []);
    return nodes;
  }

  remove() {
    this.arr.forEach((element) => element.parentNode.removeChild(element));
  }

  on(eventType, callback) {
    this.arr.forEach((element) => {
      element.addEventListener(eventType, callback);
      const eventKey = `my_jquery-${eventType}`;
      if (typeof element[eventKey] === undefined) {
        element[eventKey] = [];
      }
      element[eventKey].push(callback);
    });
  }

  off(eventType, callback = null) {
    const eventKey = `my_jquery-${eventType}`;
    this.arr.forEach((element) {
      if (element[eventKey]) {
        element[eventKey].forEach((cb) => {
          element.removeEventListener(eventType, cb);
        });
      }
      element[eventKey] = [];
    });
  }

  
};
