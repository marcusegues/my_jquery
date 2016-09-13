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
    const childNodes = this.arr.reduce((arr, element) => {
      arr.push.apply(arr, [...element.children()]);
      return arr;
    }, [])
    return new DOMNodeCollection(childNodes);
  }
};
