import stripJSONComments from 'strip-json-comments';
import builderConfiguration from '../Data/Builder.json';

const Builder = {};

export var sessionStore = {
  set: function (item, value) {
    sessionStorage.setItem(item, value);
  },

  get: function (item) {
    var value = sessionStorage.getItem(item);
    return value;
  },

  count: function () {
    var len = sessionStorage.length;
    return len;
  },

  remove: function (item) {
    sessionStorage.removeItem(item);
  },

  empty: function () {
    sessionStorage.clear();
  },

  saveObject: function (item, obj) {
    if (typeof obj === 'object') {
      this.set(item, JSON.stringify(obj));
    } else {
      this.set(item, 'Could not convert to JSON string');
    }
  },

  getObject: function (item) {
    var json = this.get(item);
    var obj = JSON.parse(json);
    return obj;
  }
}

export function getConfiguration (callback) {
  callback(JSON.parse(stripJSONComments(JSON.stringify(builderConfiguration))));
}

export function setSessionStoreParameters (setWhat, value) {
  switch (setWhat) {
    case 'PAGE':
      sessionStore.set('ab-page', value);
      break;

    default:
      break;
  }
}

export function setURI (URI) {
  location.hash = URI;
}

export function getURI () {
  return location.hash;
}

export function setURI (type, value) {
  switch (type) {
    case 'PAGE':
      let currentUrl = getURI();
      let newUrl = currentUrl;
      let pageInUrl = currentUrl.indexOf('page-7');

      if (pageInUrl === -1) {
        let lastCharacterOfUrl = currentUrl.slice(-1);

        if (lastCharacterOfUrl == '/') {
          newUrl = currentUrl + value.toString();
        } else {
          newUrl = currentUrl + '/' + value.toString();
        }
      }

      setURI(newUrl);

      break;
  }
}

export function on (eventName, eventFunction, isBubble) {
  if (typeof isBubble === 'undefined') {
    isBubble = false;
  }

  if (addEventListener in window) {
    window['addEventListener'](eventName, eventFunction, isBubble);
  }
}

export function getBrowserSize () {
  return {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  }
}

export function getOffset (element) {
  element = element.getBoundingClientRect();

  return {
    left: element.left + window.scrollX,
    top: element.top + window.scrollY
  }
}

export function randomKey () {
  return Math.random().toString(36).slice(-8);
}

export function getIframeWindow (iFrame) {
  let doc;

  if (iFrame.contentWindow) {
    return iFrame.contentWindow;
  }

  if (iFrame.window) {
    return iFrame.window;
  } 

  if (!doc && iFrame.contentDocument) {
    doc = iFrame.contentDocument;
  } 

  if (!doc && iFrame.document) {
    doc = iFrame.document;
  }

  if (doc && doc.defaultView) {
   return doc.defaultView;
  }

  if (doc && doc.parentWindow) {
    return doc.parentWindow;
  }

  return undefined;
}