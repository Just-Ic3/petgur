(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/javascript/app.jsx":[function(require,module,exports){
var React        = require('react')
var Registration = require('./components/Registration')

window.onload = function() {
  React.render(
    React.createElement(Registration, null),
    document.getElementById('registration-form')
  )
}


},{"./components/Registration":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\src\\javascript\\components\\Registration.jsx","react":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\index.js"}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\browserify\\node_modules\\process\\browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\cjs\\react.development.js":[function(require,module,exports){
'use strict';

var objectAssign$1 = require('object-assign');
var warning = require('fbjs/lib/warning');
var emptyObject = require('fbjs/lib/emptyObject');
var invariant = require('fbjs/lib/invariant');
var emptyFunction = require('fbjs/lib/emptyFunction');
var checkPropTypes = require('prop-types/checkPropTypes');
var propTypes = require('prop-types');
var factory = require('create-react-class/factory');

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule reactProdInvariant
 * 
 */

function warnNoop(publicInstance, callerName) {
  {
    var constructor = publicInstance.constructor;
    warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass');
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

var ReactNoopUpdateQueue_1 = ReactNoopUpdateQueue;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 * @providesModule canDefineProperty
 */

var canDefineProperty$1 = false;
{
  try {
    // $FlowFixMe https://github.com/facebook/flow/issues/285
    Object.defineProperty({}, 'x', { get: function () {} });
    canDefineProperty$1 = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

var canDefineProperty_1 = canDefineProperty$1;

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue_1;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    if (canDefineProperty_1) {
      Object.defineProperty(ReactComponent.prototype, methodName, {
        get: function () {
          warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
          return undefined;
        }
      });
    }
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue_1;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
objectAssign$1(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;

var ReactBaseClasses = {
  Component: ReactComponent,
  PureComponent: ReactPureComponent
};

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler$1 = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler$1 = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? invariant(false, 'Trying to release an instance into a pool of a different type.') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler$1,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler$1
};

var PooledClass_1 = PooledClass;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactCurrentOwner
 * 
 */

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var ReactCurrentOwner_1 = ReactCurrentOwner;

/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactElementSymbol
 * 
 */

// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var ReactElementSymbol = REACT_ELEMENT_TYPE;

var hasOwnProperty = Object.prototype.hasOwnProperty;



var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown;
var specialPropRefWarningShown;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: ReactElementSymbol,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty_1) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._source = source;
    }
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/react-api.html#createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== ReactElementSymbol) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner_1.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/react-api.html#createfactory
 */
ReactElement.createFactory = function (type) {
  var factory$$1 = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory$$1.type = type;
  return factory$$1;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/react-api.html#cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = objectAssign$1({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner_1.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === ReactElementSymbol;
};

var ReactElement_1 = ReactElement;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getIteratorFn
 * 
 */

/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

var getIteratorFn_1 = getIteratorFn;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule KeyEscapeUtils
 * 
 */

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

var KeyEscapeUtils_1 = KeyEscapeUtils;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactTypeOfWork
 * 
 */

var ReactTypeOfWork = {
  IndeterminateComponent: 0, // Before we know whether it is functional or class
  FunctionalComponent: 1,
  ClassComponent: 2,
  HostRoot: 3, // Root of a host tree. Could be nested inside another node.
  HostPortal: 4, // A subtree. Could be an entry point to a different renderer.
  HostComponent: 5,
  HostText: 6,
  CoroutineComponent: 7,
  CoroutineHandlerPhase: 8,
  YieldComponent: 9,
  Fragment: 10
};

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getComponentName
 * 
 */

function getComponentName(instanceOrFiber) {
  if (typeof instanceOrFiber.getName === 'function') {
    // Stack reconciler
    var instance = instanceOrFiber;
    return instance.getName();
  }
  if (typeof instanceOrFiber.tag === 'number') {
    // Fiber reconciler
    var fiber = instanceOrFiber;
    var type = fiber.type;

    if (typeof type === 'string') {
      return type;
    }
    if (typeof type === 'function') {
      return type.displayName || type.name;
    }
  }
  return null;
}

var getComponentName_1 = getComponentName;

var IndeterminateComponent = ReactTypeOfWork.IndeterminateComponent;
var FunctionalComponent = ReactTypeOfWork.FunctionalComponent;
var ClassComponent = ReactTypeOfWork.ClassComponent;
var HostComponent = ReactTypeOfWork.HostComponent;



function describeComponentFrame$1(name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function describeFiber(fiber) {
  switch (fiber.tag) {
    case IndeterminateComponent:
    case FunctionalComponent:
    case ClassComponent:
    case HostComponent:
      var owner = fiber._debugOwner;
      var source = fiber._debugSource;
      var name = getComponentName_1(fiber);
      var ownerName = null;
      if (owner) {
        ownerName = getComponentName_1(owner);
      }
      return describeComponentFrame$1(name, source, ownerName);
    default:
      return '';
  }
}

// This function can only be called with a work-in-progress fiber and
// only during begin or complete phase. Do not call it under any other
// circumstances.
function getStackAddendumByWorkInProgressFiber$1(workInProgress) {
  var info = '';
  var node = workInProgress;
  do {
    info += describeFiber(node);
    // Otherwise this return pointer might point to the wrong tree:
    node = node['return'];
  } while (node);
  return info;
}

var ReactFiberComponentTreeHook = {
  getStackAddendumByWorkInProgressFiber: getStackAddendumByWorkInProgressFiber$1,
  describeComponentFrame: describeComponentFrame$1
};

var getStackAddendumByWorkInProgressFiber = ReactFiberComponentTreeHook.getStackAddendumByWorkInProgressFiber;
var describeComponentFrame = ReactFiberComponentTreeHook.describeComponentFrame;





function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(Object.prototype.hasOwnProperty)
  // Strip regex characters so we can use it for regex
  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  // Remove hasOwnProperty from the template to make it generic
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function getDisplayName(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName = void 0;

  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id);
  return describeComponentFrame(name || '', element && element._source, ownerName || '');
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    invariant(item, 'Item must have been set');
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : void 0;
      !nextChild.isMounted ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    invariant(item, 'Item must have been set');
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function (topElement) {
    var info = '';
    if (topElement) {
      var name = getDisplayName(topElement);
      var owner = topElement._owner;
      info += describeComponentFrame(name, topElement._source, owner && getComponentName_1(owner));
    }

    var currentOwner = ReactCurrentOwner_1.current;
    if (currentOwner) {
      if (typeof currentOwner.tag === 'number') {
        var workInProgress = currentOwner;
        // Safe because if current owner exists, we are reconciling,
        // and it is guaranteed to be the work-in-progress version.
        info += getStackAddendumByWorkInProgressFiber(workInProgress);
      } else if (typeof currentOwner._debugID === 'number') {
        info += ReactComponentTreeHook.getStackAddendumByID(currentOwner._debugID);
      }
    }
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs
};

var ReactComponentTreeHook_1 = ReactComponentTreeHook;

{
  var _require = ReactComponentTreeHook_1,
      getCurrentStackAddendum = _require.getCurrentStackAddendum;
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * This is inlined from ReactElement since this file is shared between
 * isomorphic and renderers. We could extract this to a
 *
 */

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return KeyEscapeUtils_1.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === ReactElementSymbol) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn_1(children);
    if (iteratorFn) {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', getCurrentStackAddendum());
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + getCurrentStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

var traverseAllChildren_1 = traverseAllChildren;

var twoArgumentPooler = PooledClass_1.twoArgumentPooler;
var fourArgumentPooler = PooledClass_1.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass_1.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren_1(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass_1.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement_1.isValidElement(mappedChild)) {
      mappedChild = ReactElement_1.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren_1(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren_1(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

var ReactChildren_1 = ReactChildren;

var ReactDebugCurrentFrame$1 = {};

{
  var _require$2 = ReactComponentTreeHook_1,
      getStackAddendumByID = _require$2.getStackAddendumByID,
      getCurrentStackAddendum$2 = _require$2.getCurrentStackAddendum;

  var _require2$1 = ReactFiberComponentTreeHook,
      getStackAddendumByWorkInProgressFiber$2 = _require2$1.getStackAddendumByWorkInProgressFiber;

  // Component that is being worked on


  ReactDebugCurrentFrame$1.current = null;

  // Element that is being cloned or created
  ReactDebugCurrentFrame$1.element = null;

  ReactDebugCurrentFrame$1.getStackAddendum = function () {
    var stack = null;
    var current = ReactDebugCurrentFrame$1.current;
    var element = ReactDebugCurrentFrame$1.element;
    if (current !== null) {
      if (typeof current === 'number') {
        // DebugID from Stack.
        var debugID = current;
        stack = getStackAddendumByID(debugID);
      } else if (typeof current.tag === 'number') {
        // This is a Fiber.
        // The stack will only be correct if this is a work in progress
        // version and we're calling it during reconciliation.
        var workInProgress = current;
        stack = getStackAddendumByWorkInProgressFiber$2(workInProgress);
      }
    } else if (element !== null) {
      stack = getCurrentStackAddendum$2(element);
    }
    return stack;
  };
}

var ReactDebugCurrentFrame_1 = ReactDebugCurrentFrame$1;

{
  var checkPropTypes$1 = checkPropTypes;
  var warning$2 = warning;
  var ReactDebugCurrentFrame = ReactDebugCurrentFrame_1;

  var _require$1 = ReactComponentTreeHook_1,
      getCurrentStackAddendum$1 = _require$1.getCurrentStackAddendum;
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner_1.current) {
    var name = getComponentName_1(ReactCurrentOwner_1.current);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner_1.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName_1(element._owner) + '.';
  }

  warning$2(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getCurrentStackAddendum$1(element));
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement_1.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement_1.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn_1(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement_1.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;

  // ReactNative `View.propTypes` have been deprecated in favor of `ViewPropTypes`.
  // In their place a temporary getter has been added with a deprecated warning message.
  // Avoid triggering that warning during validation using the temporary workaround,
  // __propTypesSecretDontUseThesePlease.
  // TODO (bvaughn) Revert this particular change any time after April 1 ReactNative tag.
  var propTypes$$1 = typeof componentClass.__propTypesSecretDontUseThesePlease === 'object' ? componentClass.__propTypesSecretDontUseThesePlease : componentClass.propTypes;

  if (propTypes$$1) {
    checkPropTypes$1(propTypes$$1, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    warning$2(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
  }
}

var ReactElementValidator$2 = {
  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      var info = '';
      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(props);
      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      info += getCurrentStackAddendum$1();

      warning$2(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info);
    }

    var element = ReactElement_1.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    {
      ReactDebugCurrentFrame.element = element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    {
      ReactDebugCurrentFrame.element = null;
    }

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator$2.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    {
      if (canDefineProperty_1) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            warning$2(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement_1.cloneElement.apply(this, arguments);
    {
      ReactDebugCurrentFrame.element = newElement;
    }
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    {
      ReactDebugCurrentFrame.element = null;
    }
    return newElement;
  }
};

var ReactElementValidator_1 = ReactElementValidator$2;

/**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
var createDOMFactory = ReactElement_1.createFactory;
{
  var ReactElementValidator$1 = ReactElementValidator_1;
  createDOMFactory = ReactElementValidator$1.createFactory;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 *
 * @public
 */
var ReactDOMFactories = {
  a: createDOMFactory('a'),
  abbr: createDOMFactory('abbr'),
  address: createDOMFactory('address'),
  area: createDOMFactory('area'),
  article: createDOMFactory('article'),
  aside: createDOMFactory('aside'),
  audio: createDOMFactory('audio'),
  b: createDOMFactory('b'),
  base: createDOMFactory('base'),
  bdi: createDOMFactory('bdi'),
  bdo: createDOMFactory('bdo'),
  big: createDOMFactory('big'),
  blockquote: createDOMFactory('blockquote'),
  body: createDOMFactory('body'),
  br: createDOMFactory('br'),
  button: createDOMFactory('button'),
  canvas: createDOMFactory('canvas'),
  caption: createDOMFactory('caption'),
  cite: createDOMFactory('cite'),
  code: createDOMFactory('code'),
  col: createDOMFactory('col'),
  colgroup: createDOMFactory('colgroup'),
  data: createDOMFactory('data'),
  datalist: createDOMFactory('datalist'),
  dd: createDOMFactory('dd'),
  del: createDOMFactory('del'),
  details: createDOMFactory('details'),
  dfn: createDOMFactory('dfn'),
  dialog: createDOMFactory('dialog'),
  div: createDOMFactory('div'),
  dl: createDOMFactory('dl'),
  dt: createDOMFactory('dt'),
  em: createDOMFactory('em'),
  embed: createDOMFactory('embed'),
  fieldset: createDOMFactory('fieldset'),
  figcaption: createDOMFactory('figcaption'),
  figure: createDOMFactory('figure'),
  footer: createDOMFactory('footer'),
  form: createDOMFactory('form'),
  h1: createDOMFactory('h1'),
  h2: createDOMFactory('h2'),
  h3: createDOMFactory('h3'),
  h4: createDOMFactory('h4'),
  h5: createDOMFactory('h5'),
  h6: createDOMFactory('h6'),
  head: createDOMFactory('head'),
  header: createDOMFactory('header'),
  hgroup: createDOMFactory('hgroup'),
  hr: createDOMFactory('hr'),
  html: createDOMFactory('html'),
  i: createDOMFactory('i'),
  iframe: createDOMFactory('iframe'),
  img: createDOMFactory('img'),
  input: createDOMFactory('input'),
  ins: createDOMFactory('ins'),
  kbd: createDOMFactory('kbd'),
  keygen: createDOMFactory('keygen'),
  label: createDOMFactory('label'),
  legend: createDOMFactory('legend'),
  li: createDOMFactory('li'),
  link: createDOMFactory('link'),
  main: createDOMFactory('main'),
  map: createDOMFactory('map'),
  mark: createDOMFactory('mark'),
  menu: createDOMFactory('menu'),
  menuitem: createDOMFactory('menuitem'),
  meta: createDOMFactory('meta'),
  meter: createDOMFactory('meter'),
  nav: createDOMFactory('nav'),
  noscript: createDOMFactory('noscript'),
  object: createDOMFactory('object'),
  ol: createDOMFactory('ol'),
  optgroup: createDOMFactory('optgroup'),
  option: createDOMFactory('option'),
  output: createDOMFactory('output'),
  p: createDOMFactory('p'),
  param: createDOMFactory('param'),
  picture: createDOMFactory('picture'),
  pre: createDOMFactory('pre'),
  progress: createDOMFactory('progress'),
  q: createDOMFactory('q'),
  rp: createDOMFactory('rp'),
  rt: createDOMFactory('rt'),
  ruby: createDOMFactory('ruby'),
  s: createDOMFactory('s'),
  samp: createDOMFactory('samp'),
  script: createDOMFactory('script'),
  section: createDOMFactory('section'),
  select: createDOMFactory('select'),
  small: createDOMFactory('small'),
  source: createDOMFactory('source'),
  span: createDOMFactory('span'),
  strong: createDOMFactory('strong'),
  style: createDOMFactory('style'),
  sub: createDOMFactory('sub'),
  summary: createDOMFactory('summary'),
  sup: createDOMFactory('sup'),
  table: createDOMFactory('table'),
  tbody: createDOMFactory('tbody'),
  td: createDOMFactory('td'),
  textarea: createDOMFactory('textarea'),
  tfoot: createDOMFactory('tfoot'),
  th: createDOMFactory('th'),
  thead: createDOMFactory('thead'),
  time: createDOMFactory('time'),
  title: createDOMFactory('title'),
  tr: createDOMFactory('tr'),
  track: createDOMFactory('track'),
  u: createDOMFactory('u'),
  ul: createDOMFactory('ul'),
  'var': createDOMFactory('var'),
  video: createDOMFactory('video'),
  wbr: createDOMFactory('wbr'),

  // SVG
  circle: createDOMFactory('circle'),
  clipPath: createDOMFactory('clipPath'),
  defs: createDOMFactory('defs'),
  ellipse: createDOMFactory('ellipse'),
  g: createDOMFactory('g'),
  image: createDOMFactory('image'),
  line: createDOMFactory('line'),
  linearGradient: createDOMFactory('linearGradient'),
  mask: createDOMFactory('mask'),
  path: createDOMFactory('path'),
  pattern: createDOMFactory('pattern'),
  polygon: createDOMFactory('polygon'),
  polyline: createDOMFactory('polyline'),
  radialGradient: createDOMFactory('radialGradient'),
  rect: createDOMFactory('rect'),
  stop: createDOMFactory('stop'),
  svg: createDOMFactory('svg'),
  text: createDOMFactory('text'),
  tspan: createDOMFactory('tspan')
};

var ReactDOMFactories_1 = ReactDOMFactories;

var ReactPropTypes = propTypes;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactVersion
 */

var ReactVersion = '16.0.0-alpha.12';

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement_1.isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

var onlyChild_1 = onlyChild;

var Component = ReactBaseClasses.Component;

var isValidElement = ReactElement_1.isValidElement;




var createClass = factory(Component, isValidElement, ReactNoopUpdateQueue_1);

var createElement = ReactElement_1.createElement;
var createFactory = ReactElement_1.createFactory;
var cloneElement = ReactElement_1.cloneElement;

{
  var warning$1 = warning;
  var canDefineProperty = canDefineProperty_1;
  var ReactElementValidator = ReactElementValidator_1;
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var createMixin = function (mixin) {
  return mixin;
};

var React = {
  // Modern

  Children: {
    map: ReactChildren_1.map,
    forEach: ReactChildren_1.forEach,
    count: ReactChildren_1.count,
    toArray: ReactChildren_1.toArray,
    only: onlyChild_1
  },

  Component: ReactBaseClasses.Component,
  PureComponent: ReactBaseClasses.PureComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement_1.isValidElement,

  // TODO (bvaughn) Remove these getters before 16.0.0
  PropTypes: ReactPropTypes,
  checkPropTypes: checkPropTypes,
  createClass: createClass,

  // Classic

  createFactory: createFactory,
  createMixin: createMixin,

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories_1,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: ReactCurrentOwner_1
  }
};

{
  objectAssign$1(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // These should not be included in production.
    ReactComponentTreeHook: ReactComponentTreeHook_1,
    ReactDebugCurrentFrame: ReactDebugCurrentFrame_1
  });

  var warnedForCheckPropTypes = false;
  var warnedForCreateMixin = false;
  var warnedForCreateClass = false;
  var warnedForPropTypes = false;

  React.createMixin = function (mixin) {
    warning$1(warnedForCreateMixin, 'React.createMixin is deprecated and should not be used. You ' + 'can use this mixin directly instead.');
    warnedForCreateMixin = true;
    return mixin;
  };

  // TODO (bvaughn) Remove all of these accessors before 16.0.0
  if (canDefineProperty) {
    Object.defineProperty(React, 'checkPropTypes', {
      get: function () {
        warning$1(warnedForCheckPropTypes, 'checkPropTypes has been moved to a separate package. ' + 'Accessing React.checkPropTypes is no longer supported ' + 'and will be removed completely in React 16. ' + 'Use the prop-types package on npm instead. ' + '(https://fb.me/migrating-from-react-proptypes)');
        warnedForCheckPropTypes = true;
        return checkPropTypes;
      }
    });

    Object.defineProperty(React, 'createClass', {
      get: function () {
        warning$1(warnedForCreateClass, 'React.createClass is no longer supported. Use a plain JavaScript ' + "class instead. If you're not yet ready to migrate, " + 'create-react-class is available on npm as a drop-in replacement. ' + '(https://fb.me/migrating-from-react-create-class)');
        warnedForCreateClass = true;
        return createClass;
      }
    });

    Object.defineProperty(React, 'PropTypes', {
      get: function () {
        warning$1(warnedForPropTypes, 'PropTypes has been moved to a separate package. ' + 'Accessing React.PropTypes is no longer supported ' + 'and will be removed completely in React 16. ' + 'Use the prop-types package on npm instead. ' + '(https://fb.me/migrating-from-react-proptypes)');
        warnedForPropTypes = true;
        return ReactPropTypes;
      }
    });
  }

  // React.DOM factories are deprecated. Wrap these methods so that
  // invocations of the React.DOM namespace and alert users to switch
  // to the `react-addons-dom-factories` package.
  React.DOM = {};
  var warnedForFactories = false;
  Object.keys(ReactDOMFactories_1).forEach(function (factory$$1) {
    React.DOM[factory$$1] = function () {
      if (!warnedForFactories) {
        warning$1(false, 'Accessing factories like React.DOM.%s has been deprecated ' + 'and will be removed in the future. Use the ' + 'react-addons-dom-factories package instead.', factory$$1);
        warnedForFactories = true;
      }
      return ReactDOMFactories_1[factory$$1].apply(ReactDOMFactories_1, arguments);
    };
  });
}

var React_1 = React;

module.exports = React_1;

},{"create-react-class/factory":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\create-react-class\\factory.js","fbjs/lib/emptyFunction":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\emptyFunction.js","fbjs/lib/emptyObject":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\emptyObject.js","fbjs/lib/invariant":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\invariant.js","fbjs/lib/warning":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\warning.js","object-assign":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\object-assign\\index.js","prop-types":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\prop-types\\index.js","prop-types/checkPropTypes":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\prop-types\\checkPropTypes.js"}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\cjs\\react.production.min.js":[function(require,module,exports){
"use strict";function e(e){for(var t=arguments.length-1,r="Minified React error #"+e+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant="+e,n=0;n<t;n++)r+="&args[]="+encodeURIComponent(arguments[n+1]);r+=" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";var o=new Error(r);throw o.name="Invariant Violation",o.framesToPop=1,o}function t(e,t){}function r(e,t,r){this.props=e,this.context=t,this.refs=A,this.updater=r||T}function n(e,t,r){this.props=e,this.context=t,this.refs=A,this.updater=r||T}function o(){}function i(e){return void 0!==e.ref}function a(e){return void 0!==e.key}function l(e){var t=e&&(Z&&e[Z]||e[ee]);if("function"==typeof t)return t}function u(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,function(e){return t[e]})}function c(e){var t={"=0":"=","=2":":"};return(""+("."===e[0]&&"$"===e[1]?e.substring(2):e.substring(1))).replace(/(=0|=2)/g,function(e){return t[e]})}function s(e,t){return"object"==typeof e&&null!==e&&null!=e.key?ne.escape(e.key):t.toString(36)}function p(e,t,r,n){var o=typeof e;if("undefined"!==o&&"boolean"!==o||(e=null),null===e||"string"===o||"number"===o||"object"===o&&e.$$typeof===Y)return r(n,e,""===t?oe+s(e,0):t),1;var i,a,l=0,u=""===t?oe:t+ie;if(Array.isArray(e))for(var c=0;c<e.length;c++)i=e[c],a=u+s(i,c),l+=p(i,a,r,n);else{var f=te(e);if(f)for(var d,h=f.call(e),y=0;!(d=h.next()).done;)i=d.value,a=u+s(i,y++),l+=p(i,a,r,n);else if("object"===o){var m=""+e;R("31","[object Object]"===m?"object with keys {"+Object.keys(e).join(", ")+"}":m,"")}}return l}function f(e,t,r){return null==e?0:p(e,"",t,r)}function d(e){return(""+e).replace(ce,"$&/")}function h(e,t){this.func=e,this.context=t,this.count=0}function y(e,t,r){var n=e.func,o=e.context;n.call(o,t,e.count++)}function m(e,t,r){if(null==e)return e;var n=h.getPooled(t,r);ae(e,y,n),h.release(n)}function b(e,t,r,n){this.result=e,this.keyPrefix=t,this.func=r,this.context=n,this.count=0}function v(e,t,r){var n=e.result,o=e.keyPrefix,i=e.func,a=e.context,l=i.call(a,t,e.count++);Array.isArray(l)?g(l,n,r,j.thatReturnsArgument):null!=l&&(X.isValidElement(l)&&(l=X.cloneAndReplaceKey(l,o+(!l.key||t&&t.key===l.key?"":d(l.key)+"/")+r)),n.push(l))}function g(e,t,r,n,o){var i="";null!=r&&(i=d(r)+"/");var a=b.getPooled(t,i,n,o);ae(e,v,a),b.release(a)}function P(e,t,r){if(null==e)return e;var n=[];return g(e,n,null,t,r),n}function k(e,t,r){return null}function _(e,t){return ae(e,k,null)}function E(e){var t=[];return g(e,t,null,j.thatReturnsArgument),t}function w(e){return X.isValidElement(e)||R("143"),e}var S=require("object-assign");require("fbjs/lib/warning");var A=require("fbjs/lib/emptyObject");require("fbjs/lib/invariant");var j=require("fbjs/lib/emptyFunction"),x=require("prop-types"),q=require("prop-types/checkPropTypes"),C=require("create-react-class/factory"),R=e,O={isMounted:function(e){return!1},enqueueForceUpdate:function(e,r,n){t(e,"forceUpdate")},enqueueReplaceState:function(e,r,n,o){t(e,"replaceState")},enqueueSetState:function(e,r,n,o){t(e,"setState")}},T=O;r.prototype.isReactComponent={},r.prototype.setState=function(e,t){"object"!=typeof e&&"function"!=typeof e&&null!=e&&R("85"),this.updater.enqueueSetState(this,e,t,"setState")},r.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},o.prototype=r.prototype,n.prototype=new o,n.prototype.constructor=n,S(n.prototype,r.prototype),n.prototype.isPureReactComponent=!0;var $={Component:r,PureComponent:n},F=function(e){var t=this;if(t.instancePool.length){var r=t.instancePool.pop();return t.call(r,e),r}return new t(e)},U=function(e,t){var r=this;if(r.instancePool.length){var n=r.instancePool.pop();return r.call(n,e,t),n}return new r(e,t)},I=function(e,t,r){var n=this;if(n.instancePool.length){var o=n.instancePool.pop();return n.call(o,e,t,r),o}return new n(e,t,r)},V=function(e,t,r,n){var o=this;if(o.instancePool.length){var i=o.instancePool.pop();return o.call(i,e,t,r,n),i}return new o(e,t,r,n)},G=function(e){var t=this;e instanceof t||R("25"),e.destructor(),t.instancePool.length<t.poolSize&&t.instancePool.push(e)},M=10,z=F,D=function(e,t){var r=e;return r.instancePool=[],r.getPooled=t||z,r.poolSize||(r.poolSize=M),r.release=G,r},K={addPoolingTo:D,oneArgumentPooler:F,twoArgumentPooler:U,threeArgumentPooler:I,fourArgumentPooler:V},L=K,N={current:null},W=N,B="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,Y=B,H=Object.prototype.hasOwnProperty,J={key:!0,ref:!0,__self:!0,__source:!0},Q=function(e,t,r,n,o,i,a){return{$$typeof:Y,type:e,key:t,ref:r,props:a,_owner:i}};Q.createElement=function(e,t,r){var n,o={},l=null,u=null,c=null,s=null;if(null!=t){i(t)&&(u=t.ref),a(t)&&(l=""+t.key),c=void 0===t.__self?null:t.__self,s=void 0===t.__source?null:t.__source;for(n in t)H.call(t,n)&&!J.hasOwnProperty(n)&&(o[n]=t[n])}var p=arguments.length-2;if(1===p)o.children=r;else if(p>1){for(var f=Array(p),d=0;d<p;d++)f[d]=arguments[d+2];o.children=f}if(e&&e.defaultProps){var h=e.defaultProps;for(n in h)void 0===o[n]&&(o[n]=h[n])}return Q(e,l,u,c,s,W.current,o)},Q.createFactory=function(e){var t=Q.createElement.bind(null,e);return t.type=e,t},Q.cloneAndReplaceKey=function(e,t){return Q(e.type,t,e.ref,e._self,e._source,e._owner,e.props)},Q.cloneElement=function(e,t,r){var n,o=S({},e.props),l=e.key,u=e.ref,c=e._self,s=e._source,p=e._owner;if(null!=t){i(t)&&(u=t.ref,p=W.current),a(t)&&(l=""+t.key);var f;e.type&&e.type.defaultProps&&(f=e.type.defaultProps);for(n in t)H.call(t,n)&&!J.hasOwnProperty(n)&&(void 0===t[n]&&void 0!==f?o[n]=f[n]:o[n]=t[n])}var d=arguments.length-2;if(1===d)o.children=r;else if(d>1){for(var h=Array(d),y=0;y<d;y++)h[y]=arguments[y+2];o.children=h}return Q(e.type,l,u,c,s,p,o)},Q.isValidElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===Y};var X=Q,Z="function"==typeof Symbol&&Symbol.iterator,ee="@@iterator",te=l,re={escape:u,unescape:c},ne=re,oe=".",ie=":",ae=f,le=L.twoArgumentPooler,ue=L.fourArgumentPooler,ce=/\/+/g;h.prototype.destructor=function(){this.func=null,this.context=null,this.count=0},L.addPoolingTo(h,le),b.prototype.destructor=function(){this.result=null,this.keyPrefix=null,this.func=null,this.context=null,this.count=0},L.addPoolingTo(b,ue);var se={forEach:m,map:P,mapIntoWithKeyPrefixInternal:g,count:_,toArray:E},pe=se,fe=X.createFactory,de={a:fe("a"),abbr:fe("abbr"),address:fe("address"),area:fe("area"),article:fe("article"),aside:fe("aside"),audio:fe("audio"),b:fe("b"),base:fe("base"),bdi:fe("bdi"),bdo:fe("bdo"),big:fe("big"),blockquote:fe("blockquote"),body:fe("body"),br:fe("br"),button:fe("button"),canvas:fe("canvas"),caption:fe("caption"),cite:fe("cite"),code:fe("code"),col:fe("col"),colgroup:fe("colgroup"),data:fe("data"),datalist:fe("datalist"),dd:fe("dd"),del:fe("del"),details:fe("details"),dfn:fe("dfn"),dialog:fe("dialog"),div:fe("div"),dl:fe("dl"),dt:fe("dt"),em:fe("em"),embed:fe("embed"),fieldset:fe("fieldset"),figcaption:fe("figcaption"),figure:fe("figure"),footer:fe("footer"),form:fe("form"),h1:fe("h1"),h2:fe("h2"),h3:fe("h3"),h4:fe("h4"),h5:fe("h5"),h6:fe("h6"),head:fe("head"),header:fe("header"),hgroup:fe("hgroup"),hr:fe("hr"),html:fe("html"),i:fe("i"),iframe:fe("iframe"),img:fe("img"),input:fe("input"),ins:fe("ins"),kbd:fe("kbd"),keygen:fe("keygen"),label:fe("label"),legend:fe("legend"),li:fe("li"),link:fe("link"),main:fe("main"),map:fe("map"),mark:fe("mark"),menu:fe("menu"),menuitem:fe("menuitem"),meta:fe("meta"),meter:fe("meter"),nav:fe("nav"),noscript:fe("noscript"),object:fe("object"),ol:fe("ol"),optgroup:fe("optgroup"),option:fe("option"),output:fe("output"),p:fe("p"),param:fe("param"),picture:fe("picture"),pre:fe("pre"),progress:fe("progress"),q:fe("q"),rp:fe("rp"),rt:fe("rt"),ruby:fe("ruby"),s:fe("s"),samp:fe("samp"),script:fe("script"),section:fe("section"),select:fe("select"),small:fe("small"),source:fe("source"),span:fe("span"),strong:fe("strong"),style:fe("style"),sub:fe("sub"),summary:fe("summary"),sup:fe("sup"),table:fe("table"),tbody:fe("tbody"),td:fe("td"),textarea:fe("textarea"),tfoot:fe("tfoot"),th:fe("th"),thead:fe("thead"),time:fe("time"),title:fe("title"),tr:fe("tr"),track:fe("track"),u:fe("u"),ul:fe("ul"),var:fe("var"),video:fe("video"),wbr:fe("wbr"),circle:fe("circle"),clipPath:fe("clipPath"),defs:fe("defs"),ellipse:fe("ellipse"),g:fe("g"),image:fe("image"),line:fe("line"),linearGradient:fe("linearGradient"),mask:fe("mask"),path:fe("path"),pattern:fe("pattern"),polygon:fe("polygon"),polyline:fe("polyline"),radialGradient:fe("radialGradient"),rect:fe("rect"),stop:fe("stop"),svg:fe("svg"),text:fe("text"),tspan:fe("tspan")},he=de,ye=x,me="16.0.0-alpha.12",be=w,ve=$.Component,ge=X.isValidElement,Pe=C(ve,ge,T),ke=X.createElement,_e=X.createFactory,Ee=X.cloneElement,we=function(e){return e},Se={Children:{map:pe.map,forEach:pe.forEach,count:pe.count,toArray:pe.toArray,only:be},Component:$.Component,PureComponent:$.PureComponent,createElement:ke,cloneElement:Ee,isValidElement:X.isValidElement,PropTypes:ye,checkPropTypes:q,createClass:Pe,createFactory:_e,createMixin:we,DOM:he,version:me,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:W}},Ae=Se;module.exports=Ae;

},{"create-react-class/factory":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\create-react-class\\factory.js","fbjs/lib/emptyFunction":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\emptyFunction.js","fbjs/lib/emptyObject":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\emptyObject.js","fbjs/lib/invariant":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\invariant.js","fbjs/lib/warning":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\warning.js","object-assign":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\object-assign\\index.js","prop-types":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\prop-types\\index.js","prop-types/checkPropTypes":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\prop-types\\checkPropTypes.js"}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\index.js":[function(require,module,exports){
(function (process){
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}

}).call(this,require('_process'))
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LnByb2R1Y3Rpb24ubWluLmpzJyk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LmRldmVsb3BtZW50LmpzJyk7XG59XG4iXX0=
},{"./cjs/react.development.js":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\cjs\\react.development.js","./cjs/react.production.min.js":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\cjs\\react.production.min.js","_process":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\browserify\\node_modules\\process\\browser.js"}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\create-react-class\\factory.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _assign = require('object-assign');

var emptyObject = require('fbjs/lib/emptyObject');
var _invariant = require('fbjs/lib/invariant');

if (process.env.NODE_ENV !== 'production') {
  var warning = require('fbjs/lib/warning');
}

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

var ReactPropTypeLocationNames;
if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context',
  };
} else {
  ReactPropTypeLocationNames = {};
}

function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */


  var injectedMixins = [];

  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {

    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @nosideeffects
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'

  };

  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function (Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function (Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function (Constructor, childContextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, childContextTypes, 'childContext');
      }
      Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
    },
    contextTypes: function (Constructor, contextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, contextTypes, 'context');
      }
      Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function (Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function (Constructor, propTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, propTypes, 'prop');
      }
      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
    },
    statics: function (Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function () {} };

  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an _invariant so components
        // don't show up in prod but only in __DEV__
        process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
      }
    }
  }

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      _invariant(specPolicy === 'OVERRIDE_BASE', 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name);
    }

    // Disallow defining methods more than once unless explicitly allowed.
    if (isAlreadyDefined) {
      _invariant(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED', 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name);
    }
  }

  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      if (process.env.NODE_ENV !== 'production') {
        var typeofSpec = typeof spec;
        var isMixinValid = typeofSpec === 'object' && spec !== null;

        process.env.NODE_ENV !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
      }

      return;
    }

    _invariant(typeof spec !== 'function', 'ReactClass: You\'re attempting to ' + 'use a component class or function as a mixin. Instead, just use a ' + 'regular object.');
    _invariant(!isValidElement(spec), 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.');

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs;

    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];

            // These cases should already be caught by validateMethodOverride.
            _invariant(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY'), 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name);

            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            if (process.env.NODE_ENV !== 'production') {
              // Add verbose displayName to the function, which helps when looking
              // at profiling tools.
              if (typeof property === 'function' && spec.displayName) {
                proto[name].displayName = spec.displayName + '_' + name;
              }
            }
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }
    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = name in RESERVED_SPEC_KEYS;
      _invariant(!isReserved, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name);

      var isInherited = name in Constructor;
      _invariant(!isInherited, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name);
      Constructor[name] = property;
    }
  }

  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    _invariant(one && two && typeof one === 'object' && typeof two === 'object', 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.');

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        _invariant(one[key] === undefined, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key);
        one[key] = two[key];
      }
    }
    return one;
  }

  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }

  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    if (process.env.NODE_ENV !== 'production') {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;
      boundMethod.bind = function (newThis) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.
        if (newThis !== component && newThis !== null) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
        } else if (!args.length) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
          return boundMethod;
        }
        var reboundMethod = _bind.apply(boundMethod, arguments);
        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments = args;
        return reboundMethod;
      };
    }
    return boundMethod;
  }

  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;
    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedMixin = {
    componentDidMount: function () {
      this.__isMounted = true;
    },
    componentWillUnmount: function () {
      this.__isMounted = false;
    }
  };

  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {

    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function (newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function () {
      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(this.__didWarnIsMounted, '%s: isMounted is deprecated. Instead, make sure to clean up ' + 'subscriptions and pending requests in componentWillUnmount to ' + 'prevent memory leaks.', this.constructor && this.constructor.displayName || this.name || 'Component') : void 0;
        this.__didWarnIsMounted = true;
      }
      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function () {};
  _assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function (props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (initialState === undefined && this.getInitialState._isMockFunction) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      _invariant(typeof initialState === 'object' && !Array.isArray(initialState), '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent');

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, IsMountedMixin);
    mixSpecIntoComponent(Constructor, spec);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    _invariant(Constructor.prototype.render, 'createClass(...): Class specification must implement a `render` method.');

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

module.exports = factory;

}).call(this,require('_process'))
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC9ub2RlX21vZHVsZXMvY3JlYXRlLXJlYWN0LWNsYXNzL2ZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIF9pbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG59XG5cbnZhciBNSVhJTlNfS0VZID0gJ21peGlucyc7XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBhbGxvdyB0aGUgY3JlYXRpb24gb2YgYW5vbnltb3VzIGZ1bmN0aW9ucyB3aGljaCBkbyBub3Rcbi8vIGhhdmUgLm5hbWUgc2V0IHRvIHRoZSBuYW1lIG9mIHRoZSB2YXJpYWJsZSBiZWluZyBhc3NpZ25lZCB0by5cbmZ1bmN0aW9uIGlkZW50aXR5KGZuKSB7XG4gIHJldHVybiBmbjtcbn1cblxudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzO1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSB7XG4gICAgcHJvcDogJ3Byb3AnLFxuICAgIGNvbnRleHQ6ICdjb250ZXh0JyxcbiAgICBjaGlsZENvbnRleHQ6ICdjaGlsZCBjb250ZXh0JyxcbiAgfTtcbn0gZWxzZSB7XG4gIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0ge307XG59XG5cbmZ1bmN0aW9uIGZhY3RvcnkoUmVhY3RDb21wb25lbnQsIGlzVmFsaWRFbGVtZW50LCBSZWFjdE5vb3BVcGRhdGVRdWV1ZSkge1xuICAvKipcbiAgICogUG9saWNpZXMgdGhhdCBkZXNjcmliZSBtZXRob2RzIGluIGBSZWFjdENsYXNzSW50ZXJmYWNlYC5cbiAgICovXG5cblxuICB2YXIgaW5qZWN0ZWRNaXhpbnMgPSBbXTtcblxuICAvKipcbiAgICogQ29tcG9zaXRlIGNvbXBvbmVudHMgYXJlIGhpZ2hlci1sZXZlbCBjb21wb25lbnRzIHRoYXQgY29tcG9zZSBvdGhlciBjb21wb3NpdGVcbiAgICogb3IgaG9zdCBjb21wb25lbnRzLlxuICAgKlxuICAgKiBUbyBjcmVhdGUgYSBuZXcgdHlwZSBvZiBgUmVhY3RDbGFzc2AsIHBhc3MgYSBzcGVjaWZpY2F0aW9uIG9mXG4gICAqIHlvdXIgbmV3IGNsYXNzIHRvIGBSZWFjdC5jcmVhdGVDbGFzc2AuIFRoZSBvbmx5IHJlcXVpcmVtZW50IG9mIHlvdXIgY2xhc3NcbiAgICogc3BlY2lmaWNhdGlvbiBpcyB0aGF0IHlvdSBpbXBsZW1lbnQgYSBgcmVuZGVyYCBtZXRob2QuXG4gICAqXG4gICAqICAgdmFyIE15Q29tcG9uZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICogICAgICAgcmV0dXJuIDxkaXY+SGVsbG8gV29ybGQ8L2Rpdj47XG4gICAqICAgICB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIFRoZSBjbGFzcyBzcGVjaWZpY2F0aW9uIHN1cHBvcnRzIGEgc3BlY2lmaWMgcHJvdG9jb2wgb2YgbWV0aG9kcyB0aGF0IGhhdmVcbiAgICogc3BlY2lhbCBtZWFuaW5nIChlLmcuIGByZW5kZXJgKS4gU2VlIGBSZWFjdENsYXNzSW50ZXJmYWNlYCBmb3JcbiAgICogbW9yZSB0aGUgY29tcHJlaGVuc2l2ZSBwcm90b2NvbC4gQW55IG90aGVyIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgaW4gdGhlXG4gICAqIGNsYXNzIHNwZWNpZmljYXRpb24gd2lsbCBiZSBhdmFpbGFibGUgb24gdGhlIHByb3RvdHlwZS5cbiAgICpcbiAgICogQGludGVyZmFjZSBSZWFjdENsYXNzSW50ZXJmYWNlXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgdmFyIFJlYWN0Q2xhc3NJbnRlcmZhY2UgPSB7XG5cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBNaXhpbiBvYmplY3RzIHRvIGluY2x1ZGUgd2hlbiBkZWZpbmluZyB5b3VyIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEB0eXBlIHthcnJheX1cbiAgICAgKiBAb3B0aW9uYWxcbiAgICAgKi9cbiAgICBtaXhpbnM6ICdERUZJTkVfTUFOWScsXG5cbiAgICAvKipcbiAgICAgKiBBbiBvYmplY3QgY29udGFpbmluZyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIHRoYXQgc2hvdWxkIGJlIGRlZmluZWQgb25cbiAgICAgKiB0aGUgY29tcG9uZW50J3MgY29uc3RydWN0b3IgaW5zdGVhZCBvZiBpdHMgcHJvdG90eXBlIChzdGF0aWMgbWV0aG9kcykuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAqIEBvcHRpb25hbFxuICAgICAqL1xuICAgIHN0YXRpY3M6ICdERUZJTkVfTUFOWScsXG5cbiAgICAvKipcbiAgICAgKiBEZWZpbml0aW9uIG9mIHByb3AgdHlwZXMgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHR5cGUge29iamVjdH1cbiAgICAgKiBAb3B0aW9uYWxcbiAgICAgKi9cbiAgICBwcm9wVHlwZXM6ICdERUZJTkVfTUFOWScsXG5cbiAgICAvKipcbiAgICAgKiBEZWZpbml0aW9uIG9mIGNvbnRleHQgdHlwZXMgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHR5cGUge29iamVjdH1cbiAgICAgKiBAb3B0aW9uYWxcbiAgICAgKi9cbiAgICBjb250ZXh0VHlwZXM6ICdERUZJTkVfTUFOWScsXG5cbiAgICAvKipcbiAgICAgKiBEZWZpbml0aW9uIG9mIGNvbnRleHQgdHlwZXMgdGhpcyBjb21wb25lbnQgc2V0cyBmb3IgaXRzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHR5cGUge29iamVjdH1cbiAgICAgKiBAb3B0aW9uYWxcbiAgICAgKi9cbiAgICBjaGlsZENvbnRleHRUeXBlczogJ0RFRklORV9NQU5ZJyxcblxuICAgIC8vID09PT0gRGVmaW5pdGlvbiBtZXRob2RzID09PT1cblxuICAgIC8qKlxuICAgICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuIFZhbHVlcyBpbiB0aGUgbWFwcGluZyB3aWxsIGJlIHNldCBvblxuICAgICAqIGB0aGlzLnByb3BzYCBpZiB0aGF0IHByb3AgaXMgbm90IHNwZWNpZmllZCAoaS5lLiB1c2luZyBhbiBgaW5gIGNoZWNrKS5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGludm9rZWQgYmVmb3JlIGBnZXRJbml0aWFsU3RhdGVgIGFuZCB0aGVyZWZvcmUgY2Fubm90IHJlbHlcbiAgICAgKiBvbiBgdGhpcy5zdGF0ZWAgb3IgdXNlIGB0aGlzLnNldFN0YXRlYC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge29iamVjdH1cbiAgICAgKiBAb3B0aW9uYWxcbiAgICAgKi9cbiAgICBnZXREZWZhdWx0UHJvcHM6ICdERUZJTkVfTUFOWV9NRVJHRUQnLFxuXG4gICAgLyoqXG4gICAgICogSW52b2tlZCBvbmNlIGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuIFRoZSByZXR1cm4gdmFsdWUgd2lsbCBiZSB1c2VkXG4gICAgICogYXMgdGhlIGluaXRpYWwgdmFsdWUgb2YgYHRoaXMuc3RhdGVgLlxuICAgICAqXG4gICAgICogICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAqICAgICByZXR1cm4ge1xuICAgICAqICAgICAgIGlzT246IGZhbHNlLFxuICAgICAqICAgICAgIGZvb0JhejogbmV3IEJhekZvbygpXG4gICAgICogICAgIH1cbiAgICAgKiAgIH1cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge29iamVjdH1cbiAgICAgKiBAb3B0aW9uYWxcbiAgICAgKi9cbiAgICBnZXRJbml0aWFsU3RhdGU6ICdERUZJTkVfTUFOWV9NRVJHRUQnLFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxuICAgICAqIEBvcHRpb25hbFxuICAgICAqL1xuICAgIGdldENoaWxkQ29udGV4dDogJ0RFRklORV9NQU5ZX01FUkdFRCcsXG5cbiAgICAvKipcbiAgICAgKiBVc2VzIHByb3BzIGZyb20gYHRoaXMucHJvcHNgIGFuZCBzdGF0ZSBmcm9tIGB0aGlzLnN0YXRlYCB0byByZW5kZXIgdGhlXG4gICAgICogc3RydWN0dXJlIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBObyBndWFyYW50ZWVzIGFyZSBtYWRlIGFib3V0IHdoZW4gb3IgaG93IG9mdGVuIHRoaXMgbWV0aG9kIGlzIGludm9rZWQsIHNvXG4gICAgICogaXQgbXVzdCBub3QgaGF2ZSBzaWRlIGVmZmVjdHMuXG4gICAgICpcbiAgICAgKiAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICogICAgIHZhciBuYW1lID0gdGhpcy5wcm9wcy5uYW1lO1xuICAgICAqICAgICByZXR1cm4gPGRpdj5IZWxsbywge25hbWV9ITwvZGl2PjtcbiAgICAgKiAgIH1cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1JlYWN0Q29tcG9uZW50fVxuICAgICAqIEBub3NpZGVlZmZlY3RzXG4gICAgICogQHJlcXVpcmVkXG4gICAgICovXG4gICAgcmVuZGVyOiAnREVGSU5FX09OQ0UnLFxuXG4gICAgLy8gPT09PSBEZWxlZ2F0ZSBtZXRob2RzID09PT1cblxuICAgIC8qKlxuICAgICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGluaXRpYWxseSBjcmVhdGVkIGFuZCBhYm91dCB0byBiZSBtb3VudGVkLlxuICAgICAqIFRoaXMgbWF5IGhhdmUgc2lkZSBlZmZlY3RzLCBidXQgYW55IGV4dGVybmFsIHN1YnNjcmlwdGlvbnMgb3IgZGF0YSBjcmVhdGVkXG4gICAgICogYnkgdGhpcyBtZXRob2QgbXVzdCBiZSBjbGVhbmVkIHVwIGluIGBjb21wb25lbnRXaWxsVW5tb3VudGAuXG4gICAgICpcbiAgICAgKiBAb3B0aW9uYWxcbiAgICAgKi9cbiAgICBjb21wb25lbnRXaWxsTW91bnQ6ICdERUZJTkVfTUFOWScsXG5cbiAgICAvKipcbiAgICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBtb3VudGVkIGFuZCBoYXMgYSBET00gcmVwcmVzZW50YXRpb24uXG4gICAgICogSG93ZXZlciwgdGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgdGhlIERPTSBub2RlIGlzIGluIHRoZSBkb2N1bWVudC5cbiAgICAgKlxuICAgICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIG9wZXJhdGUgb24gdGhlIERPTSB3aGVuIHRoZSBjb21wb25lbnQgaGFzXG4gICAgICogYmVlbiBtb3VudGVkIChpbml0aWFsaXplZCBhbmQgcmVuZGVyZWQpIGZvciB0aGUgZmlyc3QgdGltZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gcm9vdE5vZGUgRE9NIGVsZW1lbnQgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQuXG4gICAgICogQG9wdGlvbmFsXG4gICAgICovXG4gICAgY29tcG9uZW50RGlkTW91bnQ6ICdERUZJTkVfTUFOWScsXG5cbiAgICAvKipcbiAgICAgKiBJbnZva2VkIGJlZm9yZSB0aGUgY29tcG9uZW50IHJlY2VpdmVzIG5ldyBwcm9wcy5cbiAgICAgKlxuICAgICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIHJlYWN0IHRvIGEgcHJvcCB0cmFuc2l0aW9uIGJ5IHVwZGF0aW5nIHRoZVxuICAgICAqIHN0YXRlIHVzaW5nIGB0aGlzLnNldFN0YXRlYC4gQ3VycmVudCBwcm9wcyBhcmUgYWNjZXNzZWQgdmlhIGB0aGlzLnByb3BzYC5cbiAgICAgKlxuICAgICAqICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0Q29udGV4dCkge1xuICAgICAqICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgKiAgICAgICBsaWtlc0luY3JlYXNpbmc6IG5leHRQcm9wcy5saWtlQ291bnQgPiB0aGlzLnByb3BzLmxpa2VDb3VudFxuICAgICAqICAgICB9KTtcbiAgICAgKiAgIH1cbiAgICAgKlxuICAgICAqIE5PVEU6IFRoZXJlIGlzIG5vIGVxdWl2YWxlbnQgYGNvbXBvbmVudFdpbGxSZWNlaXZlU3RhdGVgLiBBbiBpbmNvbWluZyBwcm9wXG4gICAgICogdHJhbnNpdGlvbiBtYXkgY2F1c2UgYSBzdGF0ZSBjaGFuZ2UsIGJ1dCB0aGUgb3Bwb3NpdGUgaXMgbm90IHRydWUuIElmIHlvdVxuICAgICAqIG5lZWQgaXQsIHlvdSBhcmUgcHJvYmFibHkgbG9va2luZyBmb3IgYGNvbXBvbmVudFdpbGxVcGRhdGVgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgICAqIEBvcHRpb25hbFxuICAgICAqL1xuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6ICdERUZJTkVfTUFOWScsXG5cbiAgICAvKipcbiAgICAgKiBJbnZva2VkIHdoaWxlIGRlY2lkaW5nIGlmIHRoZSBjb21wb25lbnQgc2hvdWxkIGJlIHVwZGF0ZWQgYXMgYSByZXN1bHQgb2ZcbiAgICAgKiByZWNlaXZpbmcgbmV3IHByb3BzLCBzdGF0ZSBhbmQvb3IgY29udGV4dC5cbiAgICAgKlxuICAgICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIGByZXR1cm4gZmFsc2VgIHdoZW4geW91J3JlIGNlcnRhaW4gdGhhdCB0aGVcbiAgICAgKiB0cmFuc2l0aW9uIHRvIHRoZSBuZXcgcHJvcHMvc3RhdGUvY29udGV4dCB3aWxsIG5vdCByZXF1aXJlIGEgY29tcG9uZW50XG4gICAgICogdXBkYXRlLlxuICAgICAqXG4gICAgICogICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCkge1xuICAgICAqICAgICByZXR1cm4gIWVxdWFsKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHxcbiAgICAgKiAgICAgICAhZXF1YWwobmV4dFN0YXRlLCB0aGlzLnN0YXRlKSB8fFxuICAgICAqICAgICAgICFlcXVhbChuZXh0Q29udGV4dCwgdGhpcy5jb250ZXh0KTtcbiAgICAgKiAgIH1cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRTdGF0ZVxuICAgICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dENvbnRleHRcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBjb21wb25lbnQgc2hvdWxkIHVwZGF0ZS5cbiAgICAgKiBAb3B0aW9uYWxcbiAgICAgKi9cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6ICdERUZJTkVfT05DRScsXG5cbiAgICAvKipcbiAgICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBhYm91dCB0byB1cGRhdGUgZHVlIHRvIGEgdHJhbnNpdGlvbiBmcm9tXG4gICAgICogYHRoaXMucHJvcHNgLCBgdGhpcy5zdGF0ZWAgYW5kIGB0aGlzLmNvbnRleHRgIHRvIGBuZXh0UHJvcHNgLCBgbmV4dFN0YXRlYFxuICAgICAqIGFuZCBgbmV4dENvbnRleHRgLlxuICAgICAqXG4gICAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gcGVyZm9ybSBwcmVwYXJhdGlvbiBiZWZvcmUgYW4gdXBkYXRlIG9jY3Vycy5cbiAgICAgKlxuICAgICAqIE5PVEU6IFlvdSAqKmNhbm5vdCoqIHVzZSBgdGhpcy5zZXRTdGF0ZSgpYCBpbiB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRTdGF0ZVxuICAgICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dENvbnRleHRcbiAgICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAgICogQG9wdGlvbmFsXG4gICAgICovXG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZTogJ0RFRklORV9NQU5ZJyxcblxuICAgIC8qKlxuICAgICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50J3MgRE9NIHJlcHJlc2VudGF0aW9uIGhhcyBiZWVuIHVwZGF0ZWQuXG4gICAgICpcbiAgICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBvcGVyYXRlIG9uIHRoZSBET00gd2hlbiB0aGUgY29tcG9uZW50IGhhc1xuICAgICAqIGJlZW4gdXBkYXRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcmV2UHJvcHNcbiAgICAgKiBAcGFyYW0gez9vYmplY3R9IHByZXZTdGF0ZVxuICAgICAqIEBwYXJhbSB7P29iamVjdH0gcHJldkNvbnRleHRcbiAgICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IHJvb3ROb2RlIERPTSBlbGVtZW50IHJlcHJlc2VudGluZyB0aGUgY29tcG9uZW50LlxuICAgICAqIEBvcHRpb25hbFxuICAgICAqL1xuICAgIGNvbXBvbmVudERpZFVwZGF0ZTogJ0RFRklORV9NQU5ZJyxcblxuICAgIC8qKlxuICAgICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGFib3V0IHRvIGJlIHJlbW92ZWQgZnJvbSBpdHMgcGFyZW50IGFuZCBoYXZlXG4gICAgICogaXRzIERPTSByZXByZXNlbnRhdGlvbiBkZXN0cm95ZWQuXG4gICAgICpcbiAgICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBkZWFsbG9jYXRlIGFueSBleHRlcm5hbCByZXNvdXJjZXMuXG4gICAgICpcbiAgICAgKiBOT1RFOiBUaGVyZSBpcyBubyBgY29tcG9uZW50RGlkVW5tb3VudGAgc2luY2UgeW91ciBjb21wb25lbnQgd2lsbCBoYXZlIGJlZW5cbiAgICAgKiBkZXN0cm95ZWQgYnkgdGhhdCBwb2ludC5cbiAgICAgKlxuICAgICAqIEBvcHRpb25hbFxuICAgICAqL1xuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiAnREVGSU5FX01BTlknLFxuXG4gICAgLy8gPT09PSBBZHZhbmNlZCBtZXRob2RzID09PT1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGNvbXBvbmVudCdzIGN1cnJlbnRseSBtb3VudGVkIERPTSByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEJ5IGRlZmF1bHQsIHRoaXMgaW1wbGVtZW50cyBSZWFjdCdzIHJlbmRlcmluZyBhbmQgcmVjb25jaWxpYXRpb24gYWxnb3JpdGhtLlxuICAgICAqIFNvcGhpc3RpY2F0ZWQgY2xpZW50cyBtYXkgd2lzaCB0byBvdmVycmlkZSB0aGlzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqIEBvdmVycmlkYWJsZVxuICAgICAqL1xuICAgIHVwZGF0ZUNvbXBvbmVudDogJ09WRVJSSURFX0JBU0UnXG5cbiAgfTtcblxuICAvKipcbiAgICogTWFwcGluZyBmcm9tIGNsYXNzIHNwZWNpZmljYXRpb24ga2V5cyB0byBzcGVjaWFsIHByb2Nlc3NpbmcgZnVuY3Rpb25zLlxuICAgKlxuICAgKiBBbHRob3VnaCB0aGVzZSBhcmUgZGVjbGFyZWQgbGlrZSBpbnN0YW5jZSBwcm9wZXJ0aWVzIGluIHRoZSBzcGVjaWZpY2F0aW9uXG4gICAqIHdoZW4gZGVmaW5pbmcgY2xhc3NlcyB1c2luZyBgUmVhY3QuY3JlYXRlQ2xhc3NgLCB0aGV5IGFyZSBhY3R1YWxseSBzdGF0aWNcbiAgICogYW5kIGFyZSBhY2Nlc3NpYmxlIG9uIHRoZSBjb25zdHJ1Y3RvciBpbnN0ZWFkIG9mIHRoZSBwcm90b3R5cGUuIERlc3BpdGVcbiAgICogYmVpbmcgc3RhdGljLCB0aGV5IG11c3QgYmUgZGVmaW5lZCBvdXRzaWRlIG9mIHRoZSBcInN0YXRpY3NcIiBrZXkgdW5kZXJcbiAgICogd2hpY2ggYWxsIG90aGVyIHN0YXRpYyBtZXRob2RzIGFyZSBkZWZpbmVkLlxuICAgKi9cbiAgdmFyIFJFU0VSVkVEX1NQRUNfS0VZUyA9IHtcbiAgICBkaXNwbGF5TmFtZTogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBkaXNwbGF5TmFtZSkge1xuICAgICAgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZTtcbiAgICB9LFxuICAgIG1peGluczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBtaXhpbnMpIHtcbiAgICAgIGlmIChtaXhpbnMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtaXhpbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBtaXhTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3RvciwgbWl4aW5zW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgY2hpbGRDb250ZXh0VHlwZXM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgY2hpbGRDb250ZXh0VHlwZXMpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHZhbGlkYXRlVHlwZURlZihDb25zdHJ1Y3RvciwgY2hpbGRDb250ZXh0VHlwZXMsICdjaGlsZENvbnRleHQnKTtcbiAgICAgIH1cbiAgICAgIENvbnN0cnVjdG9yLmNoaWxkQ29udGV4dFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IuY2hpbGRDb250ZXh0VHlwZXMsIGNoaWxkQ29udGV4dFR5cGVzKTtcbiAgICB9LFxuICAgIGNvbnRleHRUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBjb250ZXh0VHlwZXMpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHZhbGlkYXRlVHlwZURlZihDb25zdHJ1Y3RvciwgY29udGV4dFR5cGVzLCAnY29udGV4dCcpO1xuICAgICAgfVxuICAgICAgQ29uc3RydWN0b3IuY29udGV4dFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IuY29udGV4dFR5cGVzLCBjb250ZXh0VHlwZXMpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogU3BlY2lhbCBjYXNlIGdldERlZmF1bHRQcm9wcyB3aGljaCBzaG91bGQgbW92ZSBpbnRvIHN0YXRpY3MgYnV0IHJlcXVpcmVzXG4gICAgICogYXV0b21hdGljIG1lcmdpbmcuXG4gICAgICovXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGdldERlZmF1bHRQcm9wcykge1xuICAgICAgaWYgKENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcykge1xuICAgICAgICBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMgPSBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMsIGdldERlZmF1bHRQcm9wcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMgPSBnZXREZWZhdWx0UHJvcHM7XG4gICAgICB9XG4gICAgfSxcbiAgICBwcm9wVHlwZXM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvcFR5cGVzKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIHByb3BUeXBlcywgJ3Byb3AnKTtcbiAgICAgIH1cbiAgICAgIENvbnN0cnVjdG9yLnByb3BUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLnByb3BUeXBlcywgcHJvcFR5cGVzKTtcbiAgICB9LFxuICAgIHN0YXRpY3M6IGZ1bmN0aW9uIChDb25zdHJ1Y3Rvciwgc3RhdGljcykge1xuICAgICAgbWl4U3RhdGljU3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHN0YXRpY3MpO1xuICAgIH0sXG4gICAgYXV0b2JpbmQ6IGZ1bmN0aW9uICgpIHt9IH07XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCB0eXBlRGVmLCBsb2NhdGlvbikge1xuICAgIGZvciAodmFyIHByb3BOYW1lIGluIHR5cGVEZWYpIHtcbiAgICAgIGlmICh0eXBlRGVmLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICAvLyB1c2UgYSB3YXJuaW5nIGluc3RlYWQgb2YgYW4gX2ludmFyaWFudCBzbyBjb21wb25lbnRzXG4gICAgICAgIC8vIGRvbid0IHNob3cgdXAgaW4gcHJvZCBidXQgb25seSBpbiBfX0RFVl9fXG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHR5cGVvZiB0eXBlRGVmW3Byb3BOYW1lXSA9PT0gJ2Z1bmN0aW9uJywgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gJyArICdSZWFjdC5Qcm9wVHlwZXMuJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHByb3BOYW1lKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZU1ldGhvZE92ZXJyaWRlKGlzQWxyZWFkeURlZmluZWQsIG5hbWUpIHtcbiAgICB2YXIgc3BlY1BvbGljeSA9IFJlYWN0Q2xhc3NJbnRlcmZhY2UuaGFzT3duUHJvcGVydHkobmFtZSkgPyBSZWFjdENsYXNzSW50ZXJmYWNlW25hbWVdIDogbnVsbDtcblxuICAgIC8vIERpc2FsbG93IG92ZXJyaWRpbmcgb2YgYmFzZSBjbGFzcyBtZXRob2RzIHVubGVzcyBleHBsaWNpdGx5IGFsbG93ZWQuXG4gICAgaWYgKFJlYWN0Q2xhc3NNaXhpbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgX2ludmFyaWFudChzcGVjUG9saWN5ID09PSAnT1ZFUlJJREVfQkFTRScsICdSZWFjdENsYXNzSW50ZXJmYWNlOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gb3ZlcnJpZGUgJyArICdgJXNgIGZyb20geW91ciBjbGFzcyBzcGVjaWZpY2F0aW9uLiBFbnN1cmUgdGhhdCB5b3VyIG1ldGhvZCBuYW1lcyAnICsgJ2RvIG5vdCBvdmVybGFwIHdpdGggUmVhY3QgbWV0aG9kcy4nLCBuYW1lKTtcbiAgICB9XG5cbiAgICAvLyBEaXNhbGxvdyBkZWZpbmluZyBtZXRob2RzIG1vcmUgdGhhbiBvbmNlIHVubGVzcyBleHBsaWNpdGx5IGFsbG93ZWQuXG4gICAgaWYgKGlzQWxyZWFkeURlZmluZWQpIHtcbiAgICAgIF9pbnZhcmlhbnQoc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZJyB8fCBzcGVjUG9saWN5ID09PSAnREVGSU5FX01BTllfTUVSR0VEJywgJ1JlYWN0Q2xhc3NJbnRlcmZhY2U6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBkZWZpbmUgJyArICdgJXNgIG9uIHlvdXIgY29tcG9uZW50IG1vcmUgdGhhbiBvbmNlLiBUaGlzIGNvbmZsaWN0IG1heSBiZSBkdWUgJyArICd0byBhIG1peGluLicsIG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNaXhpbiBoZWxwZXIgd2hpY2ggaGFuZGxlcyBwb2xpY3kgdmFsaWRhdGlvbiBhbmQgcmVzZXJ2ZWRcbiAgICogc3BlY2lmaWNhdGlvbiBrZXlzIHdoZW4gYnVpbGRpbmcgUmVhY3QgY2xhc3Nlcy5cbiAgICovXG4gIGZ1bmN0aW9uIG1peFNwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBzcGVjKSB7XG4gICAgaWYgKCFzcGVjKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICB2YXIgdHlwZW9mU3BlYyA9IHR5cGVvZiBzcGVjO1xuICAgICAgICB2YXIgaXNNaXhpblZhbGlkID0gdHlwZW9mU3BlYyA9PT0gJ29iamVjdCcgJiYgc3BlYyAhPT0gbnVsbDtcblxuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhpc01peGluVmFsaWQsICclczogWW91XFwncmUgYXR0ZW1wdGluZyB0byBpbmNsdWRlIGEgbWl4aW4gdGhhdCBpcyBlaXRoZXIgbnVsbCAnICsgJ29yIG5vdCBhbiBvYmplY3QuIENoZWNrIHRoZSBtaXhpbnMgaW5jbHVkZWQgYnkgdGhlIGNvbXBvbmVudCwgJyArICdhcyB3ZWxsIGFzIGFueSBtaXhpbnMgdGhleSBpbmNsdWRlIHRoZW1zZWx2ZXMuICcgKyAnRXhwZWN0ZWQgb2JqZWN0IGJ1dCBnb3QgJXMuJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q2xhc3MnLCBzcGVjID09PSBudWxsID8gbnVsbCA6IHR5cGVvZlNwZWMpIDogdm9pZCAwO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgX2ludmFyaWFudCh0eXBlb2Ygc3BlYyAhPT0gJ2Z1bmN0aW9uJywgJ1JlYWN0Q2xhc3M6IFlvdVxcJ3JlIGF0dGVtcHRpbmcgdG8gJyArICd1c2UgYSBjb21wb25lbnQgY2xhc3Mgb3IgZnVuY3Rpb24gYXMgYSBtaXhpbi4gSW5zdGVhZCwganVzdCB1c2UgYSAnICsgJ3JlZ3VsYXIgb2JqZWN0LicpO1xuICAgIF9pbnZhcmlhbnQoIWlzVmFsaWRFbGVtZW50KHNwZWMpLCAnUmVhY3RDbGFzczogWW91XFwncmUgYXR0ZW1wdGluZyB0byAnICsgJ3VzZSBhIGNvbXBvbmVudCBhcyBhIG1peGluLiBJbnN0ZWFkLCBqdXN0IHVzZSBhIHJlZ3VsYXIgb2JqZWN0LicpO1xuXG4gICAgdmFyIHByb3RvID0gQ29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgIHZhciBhdXRvQmluZFBhaXJzID0gcHJvdG8uX19yZWFjdEF1dG9CaW5kUGFpcnM7XG5cbiAgICAvLyBCeSBoYW5kbGluZyBtaXhpbnMgYmVmb3JlIGFueSBvdGhlciBwcm9wZXJ0aWVzLCB3ZSBlbnN1cmUgdGhlIHNhbWVcbiAgICAvLyBjaGFpbmluZyBvcmRlciBpcyBhcHBsaWVkIHRvIG1ldGhvZHMgd2l0aCBERUZJTkVfTUFOWSBwb2xpY3ksIHdoZXRoZXJcbiAgICAvLyBtaXhpbnMgYXJlIGxpc3RlZCBiZWZvcmUgb3IgYWZ0ZXIgdGhlc2UgbWV0aG9kcyBpbiB0aGUgc3BlYy5cbiAgICBpZiAoc3BlYy5oYXNPd25Qcm9wZXJ0eShNSVhJTlNfS0VZKSkge1xuICAgICAgUkVTRVJWRURfU1BFQ19LRVlTLm1peGlucyhDb25zdHJ1Y3Rvciwgc3BlYy5taXhpbnMpO1xuICAgIH1cblxuICAgIGZvciAodmFyIG5hbWUgaW4gc3BlYykge1xuICAgICAgaWYgKCFzcGVjLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobmFtZSA9PT0gTUlYSU5TX0tFWSkge1xuICAgICAgICAvLyBXZSBoYXZlIGFscmVhZHkgaGFuZGxlZCBtaXhpbnMgaW4gYSBzcGVjaWFsIGNhc2UgYWJvdmUuXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgcHJvcGVydHkgPSBzcGVjW25hbWVdO1xuICAgICAgdmFyIGlzQWxyZWFkeURlZmluZWQgPSBwcm90by5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgICAgIHZhbGlkYXRlTWV0aG9kT3ZlcnJpZGUoaXNBbHJlYWR5RGVmaW5lZCwgbmFtZSk7XG5cbiAgICAgIGlmIChSRVNFUlZFRF9TUEVDX0tFWVMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgUkVTRVJWRURfU1BFQ19LRVlTW25hbWVdKENvbnN0cnVjdG9yLCBwcm9wZXJ0eSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBTZXR1cCBtZXRob2RzIG9uIHByb3RvdHlwZTpcbiAgICAgICAgLy8gVGhlIGZvbGxvd2luZyBtZW1iZXIgbWV0aG9kcyBzaG91bGQgbm90IGJlIGF1dG9tYXRpY2FsbHkgYm91bmQ6XG4gICAgICAgIC8vIDEuIEV4cGVjdGVkIFJlYWN0Q2xhc3MgbWV0aG9kcyAoaW4gdGhlIFwiaW50ZXJmYWNlXCIpLlxuICAgICAgICAvLyAyLiBPdmVycmlkZGVuIG1ldGhvZHMgKHRoYXQgd2VyZSBtaXhlZCBpbikuXG4gICAgICAgIHZhciBpc1JlYWN0Q2xhc3NNZXRob2QgPSBSZWFjdENsYXNzSW50ZXJmYWNlLmhhc093blByb3BlcnR5KG5hbWUpO1xuICAgICAgICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgICAgdmFyIHNob3VsZEF1dG9CaW5kID0gaXNGdW5jdGlvbiAmJiAhaXNSZWFjdENsYXNzTWV0aG9kICYmICFpc0FscmVhZHlEZWZpbmVkICYmIHNwZWMuYXV0b2JpbmQgIT09IGZhbHNlO1xuXG4gICAgICAgIGlmIChzaG91bGRBdXRvQmluZCkge1xuICAgICAgICAgIGF1dG9CaW5kUGFpcnMucHVzaChuYW1lLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgcHJvdG9bbmFtZV0gPSBwcm9wZXJ0eTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoaXNBbHJlYWR5RGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIHNwZWNQb2xpY3kgPSBSZWFjdENsYXNzSW50ZXJmYWNlW25hbWVdO1xuXG4gICAgICAgICAgICAvLyBUaGVzZSBjYXNlcyBzaG91bGQgYWxyZWFkeSBiZSBjYXVnaHQgYnkgdmFsaWRhdGVNZXRob2RPdmVycmlkZS5cbiAgICAgICAgICAgIF9pbnZhcmlhbnQoaXNSZWFjdENsYXNzTWV0aG9kICYmIChzcGVjUG9saWN5ID09PSAnREVGSU5FX01BTllfTUVSR0VEJyB8fCBzcGVjUG9saWN5ID09PSAnREVGSU5FX01BTlknKSwgJ1JlYWN0Q2xhc3M6IFVuZXhwZWN0ZWQgc3BlYyBwb2xpY3kgJXMgZm9yIGtleSAlcyAnICsgJ3doZW4gbWl4aW5nIGluIGNvbXBvbmVudCBzcGVjcy4nLCBzcGVjUG9saWN5LCBuYW1lKTtcblxuICAgICAgICAgICAgLy8gRm9yIG1ldGhvZHMgd2hpY2ggYXJlIGRlZmluZWQgbW9yZSB0aGFuIG9uY2UsIGNhbGwgdGhlIGV4aXN0aW5nXG4gICAgICAgICAgICAvLyBtZXRob2RzIGJlZm9yZSBjYWxsaW5nIHRoZSBuZXcgcHJvcGVydHksIG1lcmdpbmcgaWYgYXBwcm9wcmlhdGUuXG4gICAgICAgICAgICBpZiAoc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZX01FUkdFRCcpIHtcbiAgICAgICAgICAgICAgcHJvdG9bbmFtZV0gPSBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihwcm90b1tuYW1lXSwgcHJvcGVydHkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzcGVjUG9saWN5ID09PSAnREVGSU5FX01BTlknKSB7XG4gICAgICAgICAgICAgIHByb3RvW25hbWVdID0gY3JlYXRlQ2hhaW5lZEZ1bmN0aW9uKHByb3RvW25hbWVdLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb3RvW25hbWVdID0gcHJvcGVydHk7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAvLyBBZGQgdmVyYm9zZSBkaXNwbGF5TmFtZSB0byB0aGUgZnVuY3Rpb24sIHdoaWNoIGhlbHBzIHdoZW4gbG9va2luZ1xuICAgICAgICAgICAgICAvLyBhdCBwcm9maWxpbmcgdG9vbHMuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcGVydHkgPT09ICdmdW5jdGlvbicgJiYgc3BlYy5kaXNwbGF5TmFtZSkge1xuICAgICAgICAgICAgICAgIHByb3RvW25hbWVdLmRpc3BsYXlOYW1lID0gc3BlYy5kaXNwbGF5TmFtZSArICdfJyArIG5hbWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtaXhTdGF0aWNTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3RhdGljcykge1xuICAgIGlmICghc3RhdGljcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKHZhciBuYW1lIGluIHN0YXRpY3MpIHtcbiAgICAgIHZhciBwcm9wZXJ0eSA9IHN0YXRpY3NbbmFtZV07XG4gICAgICBpZiAoIXN0YXRpY3MuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBpc1Jlc2VydmVkID0gbmFtZSBpbiBSRVNFUlZFRF9TUEVDX0tFWVM7XG4gICAgICBfaW52YXJpYW50KCFpc1Jlc2VydmVkLCAnUmVhY3RDbGFzczogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSBhIHJlc2VydmVkICcgKyAncHJvcGVydHksIGAlc2AsIHRoYXQgc2hvdWxkblxcJ3QgYmUgb24gdGhlIFwic3RhdGljc1wiIGtleS4gRGVmaW5lIGl0ICcgKyAnYXMgYW4gaW5zdGFuY2UgcHJvcGVydHkgaW5zdGVhZDsgaXQgd2lsbCBzdGlsbCBiZSBhY2Nlc3NpYmxlIG9uIHRoZSAnICsgJ2NvbnN0cnVjdG9yLicsIG5hbWUpO1xuXG4gICAgICB2YXIgaXNJbmhlcml0ZWQgPSBuYW1lIGluIENvbnN0cnVjdG9yO1xuICAgICAgX2ludmFyaWFudCghaXNJbmhlcml0ZWQsICdSZWFjdENsYXNzOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lICcgKyAnYCVzYCBvbiB5b3VyIGNvbXBvbmVudCBtb3JlIHRoYW4gb25jZS4gVGhpcyBjb25mbGljdCBtYXkgYmUgJyArICdkdWUgdG8gYSBtaXhpbi4nLCBuYW1lKTtcbiAgICAgIENvbnN0cnVjdG9yW25hbWVdID0gcHJvcGVydHk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1lcmdlIHR3byBvYmplY3RzLCBidXQgdGhyb3cgaWYgYm90aCBjb250YWluIHRoZSBzYW1lIGtleS5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG9uZSBUaGUgZmlyc3Qgb2JqZWN0LCB3aGljaCBpcyBtdXRhdGVkLlxuICAgKiBAcGFyYW0ge29iamVjdH0gdHdvIFRoZSBzZWNvbmQgb2JqZWN0XG4gICAqIEByZXR1cm4ge29iamVjdH0gb25lIGFmdGVyIGl0IGhhcyBiZWVuIG11dGF0ZWQgdG8gY29udGFpbiBldmVyeXRoaW5nIGluIHR3by5cbiAgICovXG4gIGZ1bmN0aW9uIG1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMob25lLCB0d28pIHtcbiAgICBfaW52YXJpYW50KG9uZSAmJiB0d28gJiYgdHlwZW9mIG9uZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHR3byA9PT0gJ29iamVjdCcsICdtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKCk6IENhbm5vdCBtZXJnZSBub24tb2JqZWN0cy4nKTtcblxuICAgIGZvciAodmFyIGtleSBpbiB0d28pIHtcbiAgICAgIGlmICh0d28uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBfaW52YXJpYW50KG9uZVtrZXldID09PSB1bmRlZmluZWQsICdtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKCk6ICcgKyAnVHJpZWQgdG8gbWVyZ2UgdHdvIG9iamVjdHMgd2l0aCB0aGUgc2FtZSBrZXk6IGAlc2AuIFRoaXMgY29uZmxpY3QgJyArICdtYXkgYmUgZHVlIHRvIGEgbWl4aW47IGluIHBhcnRpY3VsYXIsIHRoaXMgbWF5IGJlIGNhdXNlZCBieSB0d28gJyArICdnZXRJbml0aWFsU3RhdGUoKSBvciBnZXREZWZhdWx0UHJvcHMoKSBtZXRob2RzIHJldHVybmluZyBvYmplY3RzICcgKyAnd2l0aCBjbGFzaGluZyBrZXlzLicsIGtleSk7XG4gICAgICAgIG9uZVtrZXldID0gdHdvW2tleV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvbmU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0d28gZnVuY3Rpb25zIGFuZCBtZXJnZXMgdGhlaXIgcmV0dXJuIHZhbHVlcy5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb25lIEZ1bmN0aW9uIHRvIGludm9rZSBmaXJzdC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gdHdvIEZ1bmN0aW9uIHRvIGludm9rZSBzZWNvbmQuXG4gICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBGdW5jdGlvbiB0aGF0IGludm9rZXMgdGhlIHR3byBhcmd1bWVudCBmdW5jdGlvbnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihvbmUsIHR3bykge1xuICAgIHJldHVybiBmdW5jdGlvbiBtZXJnZWRSZXN1bHQoKSB7XG4gICAgICB2YXIgYSA9IG9uZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgdmFyIGIgPSB0d28uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIGlmIChhID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGI7XG4gICAgICB9IGVsc2UgaWYgKGIgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gYTtcbiAgICAgIH1cbiAgICAgIHZhciBjID0ge307XG4gICAgICBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKGMsIGEpO1xuICAgICAgbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cyhjLCBiKTtcbiAgICAgIHJldHVybiBjO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0d28gZnVuY3Rpb25zIGFuZCBpZ25vcmVzIHRoZWlyIHJldHVybiB2YWxlcy5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb25lIEZ1bmN0aW9uIHRvIGludm9rZSBmaXJzdC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gdHdvIEZ1bmN0aW9uIHRvIGludm9rZSBzZWNvbmQuXG4gICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBGdW5jdGlvbiB0aGF0IGludm9rZXMgdGhlIHR3byBhcmd1bWVudCBmdW5jdGlvbnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVDaGFpbmVkRnVuY3Rpb24ob25lLCB0d28pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gY2hhaW5lZEZ1bmN0aW9uKCkge1xuICAgICAgb25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB0d28uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmRzIGEgbWV0aG9kIHRvIHRoZSBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb21wb25lbnQgQ29tcG9uZW50IHdob3NlIG1ldGhvZCBpcyBnb2luZyB0byBiZSBib3VuZC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kIE1ldGhvZCB0byBiZSBib3VuZC5cbiAgICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBib3VuZCBtZXRob2QuXG4gICAqL1xuICBmdW5jdGlvbiBiaW5kQXV0b0JpbmRNZXRob2QoY29tcG9uZW50LCBtZXRob2QpIHtcbiAgICB2YXIgYm91bmRNZXRob2QgPSBtZXRob2QuYmluZChjb21wb25lbnQpO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRDb250ZXh0ID0gY29tcG9uZW50O1xuICAgICAgYm91bmRNZXRob2QuX19yZWFjdEJvdW5kTWV0aG9kID0gbWV0aG9kO1xuICAgICAgYm91bmRNZXRob2QuX19yZWFjdEJvdW5kQXJndW1lbnRzID0gbnVsbDtcbiAgICAgIHZhciBjb21wb25lbnROYW1lID0gY29tcG9uZW50LmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lO1xuICAgICAgdmFyIF9iaW5kID0gYm91bmRNZXRob2QuYmluZDtcbiAgICAgIGJvdW5kTWV0aG9kLmJpbmQgPSBmdW5jdGlvbiAobmV3VGhpcykge1xuICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVzZXIgaXMgdHJ5aW5nIHRvIGJpbmQoKSBhbiBhdXRvYm91bmQgbWV0aG9kOyB3ZSBlZmZlY3RpdmVseSB3aWxsXG4gICAgICAgIC8vIGlnbm9yZSB0aGUgdmFsdWUgb2YgXCJ0aGlzXCIgdGhhdCB0aGUgdXNlciBpcyB0cnlpbmcgdG8gdXNlLCBzb1xuICAgICAgICAvLyBsZXQncyB3YXJuLlxuICAgICAgICBpZiAobmV3VGhpcyAhPT0gY29tcG9uZW50ICYmIG5ld1RoaXMgIT09IG51bGwpIHtcbiAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ2JpbmQoKTogUmVhY3QgY29tcG9uZW50IG1ldGhvZHMgbWF5IG9ubHkgYmUgYm91bmQgdG8gdGhlICcgKyAnY29tcG9uZW50IGluc3RhbmNlLiBTZWUgJXMnLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgICAgfSBlbHNlIGlmICghYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ2JpbmQoKTogWW91IGFyZSBiaW5kaW5nIGEgY29tcG9uZW50IG1ldGhvZCB0byB0aGUgY29tcG9uZW50LiAnICsgJ1JlYWN0IGRvZXMgdGhpcyBmb3IgeW91IGF1dG9tYXRpY2FsbHkgaW4gYSBoaWdoLXBlcmZvcm1hbmNlICcgKyAnd2F5LCBzbyB5b3UgY2FuIHNhZmVseSByZW1vdmUgdGhpcyBjYWxsLiBTZWUgJXMnLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgICAgICByZXR1cm4gYm91bmRNZXRob2Q7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlYm91bmRNZXRob2QgPSBfYmluZC5hcHBseShib3VuZE1ldGhvZCwgYXJndW1lbnRzKTtcbiAgICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRDb250ZXh0ID0gY29tcG9uZW50O1xuICAgICAgICByZWJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZE1ldGhvZCA9IG1ldGhvZDtcbiAgICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRBcmd1bWVudHMgPSBhcmdzO1xuICAgICAgICByZXR1cm4gcmVib3VuZE1ldGhvZDtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBib3VuZE1ldGhvZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kcyBhbGwgYXV0by1ib3VuZCBtZXRob2RzIGluIGEgY29tcG9uZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29tcG9uZW50IENvbXBvbmVudCB3aG9zZSBtZXRob2QgaXMgZ29pbmcgdG8gYmUgYm91bmQuXG4gICAqL1xuICBmdW5jdGlvbiBiaW5kQXV0b0JpbmRNZXRob2RzKGNvbXBvbmVudCkge1xuICAgIHZhciBwYWlycyA9IGNvbXBvbmVudC5fX3JlYWN0QXV0b0JpbmRQYWlycztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICB2YXIgYXV0b0JpbmRLZXkgPSBwYWlyc1tpXTtcbiAgICAgIHZhciBtZXRob2QgPSBwYWlyc1tpICsgMV07XG4gICAgICBjb21wb25lbnRbYXV0b0JpbmRLZXldID0gYmluZEF1dG9CaW5kTWV0aG9kKGNvbXBvbmVudCwgbWV0aG9kKTtcbiAgICB9XG4gIH1cblxuICB2YXIgSXNNb3VudGVkTWl4aW4gPSB7XG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuX19pc01vdW50ZWQgPSB0cnVlO1xuICAgIH0sXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuX19pc01vdW50ZWQgPSBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBtb3JlIHRvIHRoZSBSZWFjdENsYXNzIGJhc2UgY2xhc3MuIFRoZXNlIGFyZSBhbGwgbGVnYWN5IGZlYXR1cmVzIGFuZFxuICAgKiB0aGVyZWZvcmUgbm90IGFscmVhZHkgcGFydCBvZiB0aGUgbW9kZXJuIFJlYWN0Q29tcG9uZW50LlxuICAgKi9cbiAgdmFyIFJlYWN0Q2xhc3NNaXhpbiA9IHtcblxuICAgIC8qKlxuICAgICAqIFRPRE86IFRoaXMgd2lsbCBiZSBkZXByZWNhdGVkIGJlY2F1c2Ugc3RhdGUgc2hvdWxkIGFsd2F5cyBrZWVwIGEgY29uc2lzdGVudFxuICAgICAqIHR5cGUgc2lnbmF0dXJlIGFuZCB0aGUgb25seSB1c2UgY2FzZSBmb3IgdGhpcywgaXMgdG8gYXZvaWQgdGhhdC5cbiAgICAgKi9cbiAgICByZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChuZXdTdGF0ZSwgY2FsbGJhY2spIHtcbiAgICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlUmVwbGFjZVN0YXRlKHRoaXMsIG5ld1N0YXRlLCBjYWxsYmFjayk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIG1vdW50ZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQGZpbmFsXG4gICAgICovXG4gICAgaXNNb3VudGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0aGlzLl9fZGlkV2FybklzTW91bnRlZCwgJyVzOiBpc01vdW50ZWQgaXMgZGVwcmVjYXRlZC4gSW5zdGVhZCwgbWFrZSBzdXJlIHRvIGNsZWFuIHVwICcgKyAnc3Vic2NyaXB0aW9ucyBhbmQgcGVuZGluZyByZXF1ZXN0cyBpbiBjb21wb25lbnRXaWxsVW5tb3VudCB0byAnICsgJ3ByZXZlbnQgbWVtb3J5IGxlYWtzLicsIHRoaXMuY29uc3RydWN0b3IgJiYgdGhpcy5jb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCB0aGlzLm5hbWUgfHwgJ0NvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgICB0aGlzLl9fZGlkV2FybklzTW91bnRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gISF0aGlzLl9faXNNb3VudGVkO1xuICAgIH1cbiAgfTtcblxuICB2YXIgUmVhY3RDbGFzc0NvbXBvbmVudCA9IGZ1bmN0aW9uICgpIHt9O1xuICBfYXNzaWduKFJlYWN0Q2xhc3NDb21wb25lbnQucHJvdG90eXBlLCBSZWFjdENvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q2xhc3NNaXhpbik7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBjb21wb3NpdGUgY29tcG9uZW50IGNsYXNzIGdpdmVuIGEgY2xhc3Mgc3BlY2lmaWNhdGlvbi5cbiAgICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNyZWF0ZWNsYXNzXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzcGVjIENsYXNzIHNwZWNpZmljYXRpb24gKHdoaWNoIG11c3QgZGVmaW5lIGByZW5kZXJgKS5cbiAgICogQHJldHVybiB7ZnVuY3Rpb259IENvbXBvbmVudCBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlQ2xhc3Moc3BlYykge1xuICAgIC8vIFRvIGtlZXAgb3VyIHdhcm5pbmdzIG1vcmUgdW5kZXJzdGFuZGFibGUsIHdlJ2xsIHVzZSBhIGxpdHRsZSBoYWNrIGhlcmUgdG9cbiAgICAvLyBlbnN1cmUgdGhhdCBDb25zdHJ1Y3Rvci5uYW1lICE9PSAnQ29uc3RydWN0b3InLiBUaGlzIG1ha2VzIHN1cmUgd2UgZG9uJ3RcbiAgICAvLyB1bm5lY2Vzc2FyaWx5IGlkZW50aWZ5IGEgY2xhc3Mgd2l0aG91dCBkaXNwbGF5TmFtZSBhcyAnQ29uc3RydWN0b3InLlxuICAgIHZhciBDb25zdHJ1Y3RvciA9IGlkZW50aXR5KGZ1bmN0aW9uIChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAgICAgLy8gVGhpcyBjb25zdHJ1Y3RvciBnZXRzIG92ZXJyaWRkZW4gYnkgbW9ja3MuIFRoZSBhcmd1bWVudCBpcyB1c2VkXG4gICAgICAvLyBieSBtb2NrcyB0byBhc3NlcnQgb24gd2hhdCBnZXRzIG1vdW50ZWQuXG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHRoaXMgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvciwgJ1NvbWV0aGluZyBpcyBjYWxsaW5nIGEgUmVhY3QgY29tcG9uZW50IGRpcmVjdGx5LiBVc2UgYSBmYWN0b3J5IG9yICcgKyAnSlNYIGluc3RlYWQuIFNlZTogaHR0cHM6Ly9mYi5tZS9yZWFjdC1sZWdhY3lmYWN0b3J5JykgOiB2b2lkIDA7XG4gICAgICB9XG5cbiAgICAgIC8vIFdpcmUgdXAgYXV0by1iaW5kaW5nXG4gICAgICBpZiAodGhpcy5fX3JlYWN0QXV0b0JpbmRQYWlycy5sZW5ndGgpIHtcbiAgICAgICAgYmluZEF1dG9CaW5kTWV0aG9kcyh0aGlzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAgICAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcblxuICAgICAgdGhpcy5zdGF0ZSA9IG51bGw7XG5cbiAgICAgIC8vIFJlYWN0Q2xhc3NlcyBkb2Vzbid0IGhhdmUgY29uc3RydWN0b3JzLiBJbnN0ZWFkLCB0aGV5IHVzZSB0aGVcbiAgICAgIC8vIGdldEluaXRpYWxTdGF0ZSBhbmQgY29tcG9uZW50V2lsbE1vdW50IG1ldGhvZHMgZm9yIGluaXRpYWxpemF0aW9uLlxuXG4gICAgICB2YXIgaW5pdGlhbFN0YXRlID0gdGhpcy5nZXRJbml0aWFsU3RhdGUgPyB0aGlzLmdldEluaXRpYWxTdGF0ZSgpIDogbnVsbDtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIC8vIFdlIGFsbG93IGF1dG8tbW9ja3MgdG8gcHJvY2VlZCBhcyBpZiB0aGV5J3JlIHJldHVybmluZyBudWxsLlxuICAgICAgICBpZiAoaW5pdGlhbFN0YXRlID09PSB1bmRlZmluZWQgJiYgdGhpcy5nZXRJbml0aWFsU3RhdGUuX2lzTW9ja0Z1bmN0aW9uKSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBwcm9iYWJseSBiYWQgcHJhY3RpY2UuIENvbnNpZGVyIHdhcm5pbmcgaGVyZSBhbmRcbiAgICAgICAgICAvLyBkZXByZWNhdGluZyB0aGlzIGNvbnZlbmllbmNlLlxuICAgICAgICAgIGluaXRpYWxTdGF0ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIF9pbnZhcmlhbnQodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoaW5pdGlhbFN0YXRlKSwgJyVzLmdldEluaXRpYWxTdGF0ZSgpOiBtdXN0IHJldHVybiBhbiBvYmplY3Qgb3IgbnVsbCcsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpO1xuXG4gICAgICB0aGlzLnN0YXRlID0gaW5pdGlhbFN0YXRlO1xuICAgIH0pO1xuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IG5ldyBSZWFjdENsYXNzQ29tcG9uZW50KCk7XG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29uc3RydWN0b3I7XG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlLl9fcmVhY3RBdXRvQmluZFBhaXJzID0gW107XG5cbiAgICBpbmplY3RlZE1peGlucy5mb3JFYWNoKG1peFNwZWNJbnRvQ29tcG9uZW50LmJpbmQobnVsbCwgQ29uc3RydWN0b3IpKTtcblxuICAgIG1peFNwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBJc01vdW50ZWRNaXhpbik7XG4gICAgbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHNwZWMpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgZGVmYXVsdFByb3BzIHByb3BlcnR5IGFmdGVyIGFsbCBtaXhpbnMgaGF2ZSBiZWVuIG1lcmdlZC5cbiAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICBDb25zdHJ1Y3Rvci5kZWZhdWx0UHJvcHMgPSBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMoKTtcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gVGhpcyBpcyBhIHRhZyB0byBpbmRpY2F0ZSB0aGF0IHRoZSB1c2Ugb2YgdGhlc2UgbWV0aG9kIG5hbWVzIGlzIG9rLFxuICAgICAgLy8gc2luY2UgaXQncyB1c2VkIHdpdGggY3JlYXRlQ2xhc3MuIElmIGl0J3Mgbm90LCB0aGVuIGl0J3MgbGlrZWx5IGFcbiAgICAgIC8vIG1pc3Rha2Ugc28gd2UnbGwgd2FybiB5b3UgdG8gdXNlIHRoZSBzdGF0aWMgcHJvcGVydHksIHByb3BlcnR5XG4gICAgICAvLyBpbml0aWFsaXplciBvciBjb25zdHJ1Y3RvciByZXNwZWN0aXZlbHkuXG4gICAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA9IHt9O1xuICAgICAgfVxuICAgICAgaWYgKENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRJbml0aWFsU3RhdGUpIHtcbiAgICAgICAgQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEluaXRpYWxTdGF0ZS5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA9IHt9O1xuICAgICAgfVxuICAgIH1cblxuICAgIF9pbnZhcmlhbnQoQ29uc3RydWN0b3IucHJvdG90eXBlLnJlbmRlciwgJ2NyZWF0ZUNsYXNzKC4uLik6IENsYXNzIHNwZWNpZmljYXRpb24gbXVzdCBpbXBsZW1lbnQgYSBgcmVuZGVyYCBtZXRob2QuJyk7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIUNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb21wb25lbnRTaG91bGRVcGRhdGUsICclcyBoYXMgYSBtZXRob2QgY2FsbGVkICcgKyAnY29tcG9uZW50U2hvdWxkVXBkYXRlKCkuIERpZCB5b3UgbWVhbiBzaG91bGRDb21wb25lbnRVcGRhdGUoKT8gJyArICdUaGUgbmFtZSBpcyBwaHJhc2VkIGFzIGEgcXVlc3Rpb24gYmVjYXVzZSB0aGUgZnVuY3Rpb24gaXMgJyArICdleHBlY3RlZCB0byByZXR1cm4gYSB2YWx1ZS4nLCBzcGVjLmRpc3BsYXlOYW1lIHx8ICdBIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIUNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjaWV2ZVByb3BzLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudFdpbGxSZWNpZXZlUHJvcHMoKS4gRGlkIHlvdSBtZWFuIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKT8nLCBzcGVjLmRpc3BsYXlOYW1lIHx8ICdBIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgIH1cblxuICAgIC8vIFJlZHVjZSB0aW1lIHNwZW50IGRvaW5nIGxvb2t1cHMgYnkgc2V0dGluZyB0aGVzZSBvbiB0aGUgcHJvdG90eXBlLlxuICAgIGZvciAodmFyIG1ldGhvZE5hbWUgaW4gUmVhY3RDbGFzc0ludGVyZmFjZSkge1xuICAgICAgaWYgKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kTmFtZV0pIHtcbiAgICAgICAgQ29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZE5hbWVdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH1cblxuICByZXR1cm4gY3JlYXRlQ2xhc3M7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmFjdG9yeTtcbiJdfQ==
},{"_process":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\browserify\\node_modules\\process\\browser.js","fbjs/lib/emptyObject":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\emptyObject.js","fbjs/lib/invariant":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\invariant.js","fbjs/lib/warning":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\warning.js","object-assign":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\object-assign\\index.js"}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\emptyFunction.js":[function(require,module,exports){
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\emptyObject.js":[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
}).call(this,require('_process'))
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC9ub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlPYmplY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5T2JqZWN0ID0ge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIE9iamVjdC5mcmVlemUoZW1wdHlPYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5T2JqZWN0OyJdfQ==
},{"_process":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\browserify\\node_modules\\process\\browser.js"}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\invariant.js":[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
}).call(this,require('_process'))
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC9ub2RlX21vZHVsZXMvZmJqcy9saWIvaW52YXJpYW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFsaWRhdGVGb3JtYXQoZm9ybWF0KTtcblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7Il19
},{"_process":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\browserify\\node_modules\\process\\browser.js"}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\warning.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var emptyFunction = require('./emptyFunction');

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
}).call(this,require('_process'))
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC9ub2RlX21vZHVsZXMvZmJqcy9saWIvd2FybmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJy4vZW1wdHlGdW5jdGlvbicpO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGVtcHR5RnVuY3Rpb247XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKHgpIHt9XG4gICAgfTtcblxuICAgIHdhcm5pbmcgPSBmdW5jdGlvbiB3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKCdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAnKSA9PT0gMCkge1xuICAgICAgICByZXR1cm47IC8vIElnbm9yZSBDb21wb3NpdGVDb21wb25lbnQgcHJvcHR5cGUgY2hlY2suXG4gICAgICB9XG5cbiAgICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7Il19
},{"./emptyFunction":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\emptyFunction.js","_process":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\browserify\\node_modules\\process\\browser.js"}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\object-assign\\index.js":[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\prop-types\\checkPropTypes.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

if (process.env.NODE_ENV !== 'production') {
  var invariant = require('fbjs/lib/invariant');
  var warning = require('fbjs/lib/warning');
  var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

}).call(this,require('_process'))
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG4gIHZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P0Z1bmN0aW9ufSBnZXRTdGFjayBSZXR1cm5zIHRoZSBjb21wb25lbnQgc3RhY2suXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGdldFN0YWNrKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKHR5cGVTcGVjcy5oYXNPd25Qcm9wZXJ0eSh0eXBlU3BlY05hbWUpKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGludmFyaWFudCh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gPT09ICdmdW5jdGlvbicsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tICcgKyAnUmVhY3QuUHJvcFR5cGVzLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgbG9jYXRpb24sIHR5cGVTcGVjTmFtZSk7XG4gICAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICB9XG4gICAgICAgIHdhcm5pbmcoIWVycm9yIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IsICclczogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICVzIGAlc2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICsgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICVzLiAnICsgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgKyAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICsgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIGxvY2F0aW9uLCB0eXBlU3BlY05hbWUsIHR5cGVvZiBlcnJvcik7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICB3YXJuaW5nKGZhbHNlLCAnRmFpbGVkICVzIHR5cGU6ICVzJXMnLCBsb2NhdGlvbiwgZXJyb3IubWVzc2FnZSwgc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tQcm9wVHlwZXM7XG4iXX0=
},{"./lib/ReactPropTypesSecret":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\prop-types\\lib\\ReactPropTypesSecret.js","_process":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\browserify\\node_modules\\process\\browser.js","fbjs/lib/invariant":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\invariant.js","fbjs/lib/warning":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\warning.js"}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\prop-types\\factoryWithThrowingShims.js":[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

},{"./lib/ReactPropTypesSecret":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\prop-types\\lib\\ReactPropTypesSecret.js","fbjs/lib/emptyFunction":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\emptyFunction.js","fbjs/lib/invariant":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\invariant.js"}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\prop-types\\factoryWithTypeCheckers.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
var checkPropTypes = require('./checkPropTypes');

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

}).call(this,require('_process'))
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG52YXIgY2hlY2tQcm9wVHlwZXMgPSByZXF1aXJlKCcuL2NoZWNrUHJvcFR5cGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgLyogZ2xvYmFsIFN5bWJvbCAqL1xuICB2YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gIHZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gICAqXG4gICAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICAgKlxuICAgKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICAgKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICAgKiAgICAgICAuLi5cbiAgICogICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAgICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAgICpcbiAgICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICAgKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICAgKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gICAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAgICpcbiAgICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gICAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAgICogICAgIH0sXG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gICAqXG4gICAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICAgKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAgICpcbiAgICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICAgKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gICAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gICAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAgICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAqICAgICAgICAgICk7XG4gICAqICAgICAgICB9XG4gICAqICAgICAgfVxuICAgKiAgICB9LFxuICAgKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAgICogIH0pO1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgdmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICAgIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICAgIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICAgIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICAgIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICAgIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gICAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICAgIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICAgIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gICAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gICAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gICAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXJcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG4gIC8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cbiAgUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcblxuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgICAgaWYgKHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgICAgICAgICAvLyBOZXcgYmVoYXZpb3Igb25seSBmb3IgdXNlcnMgb2YgYHByb3AtdHlwZXNgIHBhY2thZ2VcbiAgICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldICYmXG4gICAgICAgICAgICAvLyBBdm9pZCBzcGFtbWluZyB0aGUgY29uc29sZSBiZWNhdXNlIHRoZXkgYXJlIG9mdGVuIG5vdCBhY3Rpb25hYmxlIGV4Y2VwdCBmb3IgbGliIGF1dGhvcnNcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgM1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgd2FybmluZyhcbiAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCVzYCBwcm9wIG9uIGAlc2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nLFxuICAgICAgICAgICAgICBwcm9wRnVsbE5hbWUsXG4gICAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIHByb3BWYWx1ZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAocHJvcFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgd2FybmluZyhcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGlkIHRvIG9uZU9mVHlwZS4gRXhwZWN0ZWQgYW4gYXJyYXkgb2YgY2hlY2sgZnVuY3Rpb25zLCBidXQgJyArXG4gICAgICAgICAgJ3JlY2VpdmVkICVzIGF0IGluZGV4ICVzLicsXG4gICAgICAgICAgZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKGNoZWNrZXIpLFxuICAgICAgICAgIGlcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgICAgaWYgKGNoZWNrZXIocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBSZWFjdFByb3BUeXBlc1NlY3JldCkgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTm9kZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHNoYXBlVHlwZXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJycgKyBwcm9wVmFsdWU7XG4gICAgfVxuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHN0cmluZyB0aGF0IGlzIHBvc3RmaXhlZCB0byBhIHdhcm5pbmcgYWJvdXQgYW4gaW52YWxpZCB0eXBlLlxuICAvLyBGb3IgZXhhbXBsZSwgXCJ1bmRlZmluZWRcIiBvciBcIm9mIHR5cGUgYXJyYXlcIlxuICBmdW5jdGlvbiBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiAnYW4gJyArIHR5cGU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgcmV0dXJuICdhICcgKyB0eXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcbiJdfQ==
},{"./checkPropTypes":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\prop-types\\checkPropTypes.js","./lib/ReactPropTypesSecret":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\prop-types\\lib\\ReactPropTypesSecret.js","_process":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\browserify\\node_modules\\process\\browser.js","fbjs/lib/emptyFunction":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\emptyFunction.js","fbjs/lib/invariant":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\invariant.js","fbjs/lib/warning":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\fbjs\\lib\\warning.js"}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\prop-types\\index.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}

}).call(this,require('_process'))
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIFN5bWJvbC5mb3IgJiZcbiAgICBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykpIHx8XG4gICAgMHhlYWM3O1xuXG4gIHZhciBpc1ZhbGlkRWxlbWVudCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgb2JqZWN0ICE9PSBudWxsICYmXG4gICAgICBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbiAgfTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG4iXX0=
},{"./factoryWithThrowingShims":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\prop-types\\factoryWithThrowingShims.js","./factoryWithTypeCheckers":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\prop-types\\factoryWithTypeCheckers.js","_process":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\browserify\\node_modules\\process\\browser.js"}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\node_modules\\prop-types\\lib\\ReactPropTypesSecret.js":[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\src\\javascript\\components\\AccountFields.jsx":[function(require,module,exports){

var React = require('react')

var AccountFields = React.createClass({displayName: "AccountFields",
  render: function() {
    return(
      React.createElement("div", null, 
        React.createElement("h1", null, "Account Info:"), 
        React.createElement("label", null, "Name"), 
        React.createElement("input", {type: "text", ref: "name", 
          defaultValue: this.props.fieldValues.name}), 

        React.createElement("label", null, "Password"), 
        React.createElement("input", {type: "password", ref: "password", 
          defaultValue: this.props.fieldValues.password}), 

        React.createElement("label", null, "Email"), 
        React.createElement("input", {type: "email", ref: "email", 
          defaultValue: this.props.fieldValues.email}), 

        React.createElement("button", {className: "btn -primary pull-right", onClick: this.saveAndContinue}, "Save & Continue")
      )
    )
  },

  saveAndContinue: function(e) {
    e.preventDefault()

    var data = {
      name : this.refs.name.getDOMNode().value,
      password : this.refs.password.getDOMNode().value,
      email : this.refs.email.getDOMNode().value
    }

    this.props.saveValues(data)
    this.props.nextStep()
  }
})

module.exports = AccountFields


},{"react":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\index.js"}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\src\\javascript\\components\\Confirmation.jsx":[function(require,module,exports){
var React = require('react')

var Confirmation = React.createClass({displayName: "Confirmation",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h2", null, "Confirm Registration"), 
        React.createElement("ul", null, 
          React.createElement("li", null, React.createElement("b", null, "Name:"), " ", this.props.fieldValues.name), 
          React.createElement("li", null, React.createElement("b", null, "Email:"), " ", this.props.fieldValues.email), 
          React.createElement("li", null, React.createElement("b", null, "Doggie:"), " ", this.props.fieldValues.doggieName), 
          React.createElement("li", null, React.createElement("b", null, "Sex:"), " ", this.props.fieldValues.doggieSex), 
          React.createElement("li", null, React.createElement("b", null, "Race:"), " ", this.props.fieldValues.doggieRace)
        ), 
        React.createElement("ul", {className: "form-fields"}, 
          React.createElement("li", {className: "form-footer"}, 
            React.createElement("button", {className: "btn -default pull-left", onClick: this.props.previousStep}, "Back"), 
            React.createElement("button", {className: "btn -primary pull-right", onClick: this.props.submitRegistration}, "Submit Registration")
          )
        )
      )
    )
  }
})

module.exports = Confirmation


},{"react":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\index.js"}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\src\\javascript\\components\\ContactFields.jsx":[function(require,module,exports){
var React = require('react')

var ContactFields = React.createClass({displayName: "ContactFields",
  render: function() {
    return(
      React.createElement("div", null, 
        React.createElement("h1", null, "Contact Info:"), 
        React.createElement("label", null, "Telephone"), 
        React.createElement("input", {type: "text", ref: "telephone", 
          defaultValue: this.props.fieldValues.telephone}), 

        React.createElement("label", null, "Address"), 
        React.createElement("input", {type: "text", ref: "addressline", 
          defaultValue: this.props.fieldValues.address.addressline}), 

        React.createElement("label", null, "City"), 
        React.createElement("input", {type: "text", ref: "city", 
          defaultValue: this.props.fieldValues.address.city}), 

        React.createElement("label", null, "State"), 
        React.createElement("input", {type: "text", ref: "state", 
          defaultValue: this.props.fieldValues.address.state}), 

        React.createElement("label", null, "Country"), 
        React.createElement("input", {type: "text", ref: "country", 
          defaultValue: this.props.fieldValues.address.country}), 

        React.createElement("ul", {className: "form-fields"}, 
          React.createElement("li", {className: "form-footer"}, 
            React.createElement("button", {className: "btn -default pull-left", onClick: this.props.previousStep}, "Back"), 
            React.createElement("button", {className: "btn -primary pull-right", onClick: this.saveAndContinue}, "Save & Continue")
          )
        )
      )
    )
  },

  saveAndContinue: function(e) {
    e.preventDefault()

    var data = {
      telephone : this.refs.telephone.getDOMNode().value,
      address : {
        addressline : this.refs.addressline.getDOMNode().value,
        city : this.refs.city.getDOMNode().value,
        state : this.refs.state.getDOMNode().value,
        country : this.refs.country.getDOMNode().value
      }
    }

    this.props.saveValues(data)
    this.props.nextStep()
  }
})

module.exports = ContactFields


},{"react":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\index.js"}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\src\\javascript\\components\\DoggieFields.jsx":[function(require,module,exports){
var React = require('react')

var DoggieFields = React.createClass({displayName: "DoggieFields",
  render: function() {
    return(
      React.createElement("div", null, 
        React.createElement("h1", null, "Doggie Info:"), 
        React.createElement("label", null, "Name"), 
        React.createElement("input", {type: "text", ref: "name", 
          defaultValue: this.props.fieldValues.doggieName}), 

        React.createElement("label", null, "Race"), 
        React.createElement("input", {type: "text", ref: "race", 
          defaultValue: this.props.fieldValues.doggieRace}), 

        React.createElement("label", null, "Sex"), 
        React.createElement("input", {type: "text", ref: "sex", 
          defaultValue: this.props.fieldValues.doggieSex}), 

        React.createElement("label", null, "Age"), 
        React.createElement("input", {type: "text", ref: "age", 
          defaultValue: this.props.fieldValues.doggieAge}), 

        React.createElement("ul", {className: "form-fields"}, 
          React.createElement("li", {className: "form-footer"}, 
            React.createElement("button", {className: "btn -default pull-left", onClick: this.props.previousStep}, "Back"), 
            React.createElement("button", {className: "btn -primary pull-right", onClick: this.saveAndContinue}, "Save & Continue")
          )
        )
      )
    )
  },

  saveAndContinue: function(e) {
    e.preventDefault()

    var data = {
      doggieName : this.refs.name.getDOMNode().value,
      doggieRace : this.refs.race.getDOMNode().value,
      doggieAge : this.refs.age.getDOMNode().value,
      doggieSex : this.refs.sex.getDOMNode().value
    }

    this.props.saveValues(data)
    this.props.nextStep()
  }
})

module.exports = DoggieFields


},{"react":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\index.js"}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\src\\javascript\\components\\Registration.jsx":[function(require,module,exports){

var React = require('react')
var AccountFields = require('./AccountFields')
var ContactFields = require('./ContactFields')
var DoggieFields = require('./DoggieFields')
var Confirmation = require('./Confirmation')
var Success = require('./Success')

var fieldValues = {
  //Account Fields
  name : null,
  email : null,
  password : null,
  //Contact Fields
  telephone : null,
  address : {
    addressline : null,
    city : null,
    state : null,
    country : null
  },
  //Doggie Fields
  doggieName : null,
  doggieRace : null,
  doggieSex : null,
  doggieAge : null,
  doggiePic : null
}

var Registration = React.createClass({displayName: "Registration",
  getInitialState: function() {
    return {
      step: 1
    }
  },

  render: function() {
    var style =  {
      width : (this.state.step / 4 * 100) + '%'
    }

    return (
      React.createElement("main", null, 
        React.createElement("span", {className: "progress-step"}, "Step ", this.state.step), 
        React.createElement("progress", {className: "progress", style: style}), 
        this.showStep()
      )
    )
  },

  showStep: function() {
    switch(this.state.step) {
      case 1:
        return React.createElement(AccountFields, {fieldValues: fieldValues, 
          nextStep: this.nextStep, saveValues: this.saveValues})
      case 2:
        return React.createElement(ContactFields, {fieldValues: fieldValues, 
          nextStep: this.nextStep, previousStep: this.previousStep, 
          saveValues: this.saveValues})
      case 3:
        return React.createElement(DoggieFields, {fieldValues: fieldValues, 
          nextStep: this.nextStep, previousStep: this.previousStep, 
          saveValues: this.saveValues})
      case 4:
        return React.createElement(Confirmation, {fieldValues: fieldValues, 
          previousStep: this.previousStep, submitRegistration: this.submitRegistration})
      case 5:
        return React.createElement(Success, {fieldValues: fieldValues})
    }
  },

  saveValues: function(fields) {
    return function() {
      fieldValues = Object.assign({}, fieldValues, fields)
    }()
  },

  nextStep: function() {
    this.setState({
      step : this.state.step + 1
    })
  },

  previousStep: function() {
    this.setState({
      step : this.state.step - 1
    })
  },

  submitRegistration: function() {
    //TODO
    this.nextStep()
  }
})

module.exports = Registration


},{"./AccountFields":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\src\\javascript\\components\\AccountFields.jsx","./Confirmation":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\src\\javascript\\components\\Confirmation.jsx","./ContactFields":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\src\\javascript\\components\\ContactFields.jsx","./DoggieFields":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\src\\javascript\\components\\DoggieFields.jsx","./Success":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\src\\javascript\\components\\Success.jsx","react":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\index.js"}],"C:\\Users\\Luis\\Documents\\Projects\\petgur\\src\\javascript\\components\\Success.jsx":[function(require,module,exports){
var React = require('react')

var Success = React.createClass({displayName: "Success",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h2", null, "Successfully Registered!")
      )
    )
  }
})

module.exports = Success


},{"react":"C:\\Users\\Luis\\Documents\\Projects\\petgur\\node_modules\\react\\index.js"}]},{},["./src/javascript/app.jsx"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiQzpcXFVzZXJzXFxMdWlzXFxEb2N1bWVudHNcXFByb2plY3RzXFxwZXRndXJcXHNyY1xcamF2YXNjcmlwdFxcYXBwLmpzeCIsIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxwcm9jZXNzXFxicm93c2VyLmpzIiwibm9kZV9tb2R1bGVzXFxyZWFjdFxcY2pzXFxyZWFjdC5kZXZlbG9wbWVudC5qcyIsIm5vZGVfbW9kdWxlc1xccmVhY3RcXGNqc1xccmVhY3QucHJvZHVjdGlvbi5taW4uanMiLCJub2RlX21vZHVsZXNcXHJlYWN0XFxpbmRleC5qcyIsIm5vZGVfbW9kdWxlc1xccmVhY3RcXG5vZGVfbW9kdWxlc1xcY3JlYXRlLXJlYWN0LWNsYXNzXFxmYWN0b3J5LmpzIiwibm9kZV9tb2R1bGVzXFxyZWFjdFxcbm9kZV9tb2R1bGVzXFxmYmpzXFxsaWJcXGVtcHR5RnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXNcXHJlYWN0XFxub2RlX21vZHVsZXNcXGZianNcXGxpYlxcZW1wdHlPYmplY3QuanMiLCJub2RlX21vZHVsZXNcXHJlYWN0XFxub2RlX21vZHVsZXNcXGZianNcXGxpYlxcaW52YXJpYW50LmpzIiwibm9kZV9tb2R1bGVzXFxyZWFjdFxcbm9kZV9tb2R1bGVzXFxmYmpzXFxsaWJcXHdhcm5pbmcuanMiLCJub2RlX21vZHVsZXNcXHJlYWN0XFxub2RlX21vZHVsZXNcXG9iamVjdC1hc3NpZ25cXGluZGV4LmpzIiwibm9kZV9tb2R1bGVzXFxyZWFjdFxcbm9kZV9tb2R1bGVzXFxwcm9wLXR5cGVzXFxjaGVja1Byb3BUeXBlcy5qcyIsIm5vZGVfbW9kdWxlc1xccmVhY3RcXG5vZGVfbW9kdWxlc1xccHJvcC10eXBlc1xcZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzIiwibm9kZV9tb2R1bGVzXFxyZWFjdFxcbm9kZV9tb2R1bGVzXFxwcm9wLXR5cGVzXFxmYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyIsIm5vZGVfbW9kdWxlc1xccmVhY3RcXG5vZGVfbW9kdWxlc1xccHJvcC10eXBlc1xcaW5kZXguanMiLCJub2RlX21vZHVsZXNcXHJlYWN0XFxub2RlX21vZHVsZXNcXHByb3AtdHlwZXNcXGxpYlxcUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCJDOlxcVXNlcnNcXEx1aXNcXERvY3VtZW50c1xcUHJvamVjdHNcXHBldGd1clxcc3JjXFxqYXZhc2NyaXB0XFxjb21wb25lbnRzXFxBY2NvdW50RmllbGRzLmpzeCIsIkM6XFxVc2Vyc1xcTHVpc1xcRG9jdW1lbnRzXFxQcm9qZWN0c1xccGV0Z3VyXFxzcmNcXGphdmFzY3JpcHRcXGNvbXBvbmVudHNcXENvbmZpcm1hdGlvbi5qc3giLCJDOlxcVXNlcnNcXEx1aXNcXERvY3VtZW50c1xcUHJvamVjdHNcXHBldGd1clxcc3JjXFxqYXZhc2NyaXB0XFxjb21wb25lbnRzXFxDb250YWN0RmllbGRzLmpzeCIsIkM6XFxVc2Vyc1xcTHVpc1xcRG9jdW1lbnRzXFxQcm9qZWN0c1xccGV0Z3VyXFxzcmNcXGphdmFzY3JpcHRcXGNvbXBvbmVudHNcXERvZ2dpZUZpZWxkcy5qc3giLCJDOlxcVXNlcnNcXEx1aXNcXERvY3VtZW50c1xcUHJvamVjdHNcXHBldGd1clxcc3JjXFxqYXZhc2NyaXB0XFxjb21wb25lbnRzXFxSZWdpc3RyYXRpb24uanN4IiwiQzpcXFVzZXJzXFxMdWlzXFxEb2N1bWVudHNcXFByb2plY3RzXFxwZXRndXJcXHNyY1xcamF2YXNjcmlwdFxcY29tcG9uZW50c1xcU3VjY2Vzcy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFJLEtBQUssVUFBVSxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQ25DLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQzs7QUFFdkQsTUFBTSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7RUFDMUIsS0FBSyxDQUFDLE1BQU07SUFDVixvQkFBQyxZQUFZLEVBQUEsSUFBQSxDQUFHLENBQUE7SUFDaEIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQztHQUM3QztDQUNGOzs7O0FDUkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzltRUE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdnRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25nQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7O0FBRTVCLElBQUksbUNBQW1DLDZCQUFBO0VBQ3JDLE1BQU0sRUFBRSxXQUFXLENBQUM7SUFDbEI7TUFDRSxvQkFBQSxLQUFJLEVBQUEsSUFBQyxFQUFBO1FBQ0gsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxlQUFrQixDQUFBLEVBQUE7UUFDdEIsb0JBQUEsT0FBTSxFQUFBLElBQUMsRUFBQSxNQUFZLENBQUEsRUFBQTtRQUNuQixvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxHQUFHLE1BQUEsRUFBTSxDQUFDLEdBQUEsRUFBRyxHQUFHLE1BQUEsRUFBTTtBQUN6QyxVQUFVLFlBQUEsRUFBWSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUssQ0FBRSxDQUFBLEVBQUE7O1FBRWhELG9CQUFBLE9BQU0sRUFBQSxJQUFDLEVBQUEsVUFBZ0IsQ0FBQSxFQUFBO1FBQ3ZCLG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLEdBQUcsVUFBQSxFQUFVLENBQUMsR0FBQSxFQUFHLEdBQUcsVUFBQSxFQUFVO0FBQ2pELFVBQVUsWUFBQSxFQUFZLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUyxDQUFFLENBQUEsRUFBQTs7UUFFcEQsb0JBQUEsT0FBTSxFQUFBLElBQUMsRUFBQSxPQUFhLENBQUEsRUFBQTtRQUNwQixvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxHQUFHLE9BQUEsRUFBTyxDQUFDLEdBQUEsRUFBRyxHQUFHLE9BQUEsRUFBTztBQUMzQyxVQUFVLFlBQUEsRUFBWSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQU0sQ0FBRSxDQUFBLEVBQUE7O1FBRWpELG9CQUFBLFFBQU8sRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMseUJBQUEsRUFBeUIsQ0FBQyxPQUFBLEVBQU8sR0FBSSxJQUFJLENBQUMsZUFBaUIsQ0FBQSxFQUFBLGlCQUF3QixDQUFBO01BQ2pHLENBQUE7S0FDUDtBQUNMLEdBQUc7O0VBRUQsZUFBZSxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDaEMsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFOztJQUVsQixJQUFJLElBQUksR0FBRztNQUNULElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLO01BQ3hDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLO01BQ2hELEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLO0FBQ2hELEtBQUs7O0lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO0lBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0dBQ3RCO0FBQ0gsQ0FBQyxDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsYUFBYTs7OztBQ3ZDOUIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQzs7QUFFNUIsSUFBSSxrQ0FBa0MsNEJBQUE7RUFDcEMsTUFBTSxFQUFFLFdBQVcsQ0FBQztJQUNsQjtNQUNFLG9CQUFBLEtBQUksRUFBQSxJQUFDLEVBQUE7UUFDSCxvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLHNCQUF5QixDQUFBLEVBQUE7UUFDN0Isb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQTtVQUNGLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsb0JBQUEsR0FBRSxFQUFBLElBQUMsRUFBQSxPQUFTLENBQUEsRUFBQSxHQUFBLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBVSxDQUFBLEVBQUE7VUFDbkQsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxvQkFBQSxHQUFFLEVBQUEsSUFBQyxFQUFBLFFBQVUsQ0FBQSxFQUFBLEdBQUEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFXLENBQUEsRUFBQTtVQUNyRCxvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLG9CQUFBLEdBQUUsRUFBQSxJQUFDLEVBQUEsU0FBVyxDQUFBLEVBQUEsR0FBQSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFVBQWdCLENBQUEsRUFBQTtVQUMzRCxvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLG9CQUFBLEdBQUUsRUFBQSxJQUFDLEVBQUEsTUFBUSxDQUFBLEVBQUEsR0FBQSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQWUsQ0FBQSxFQUFBO1VBQ3ZELG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsb0JBQUEsR0FBRSxFQUFBLElBQUMsRUFBQSxPQUFTLENBQUEsRUFBQSxHQUFBLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsVUFBZ0IsQ0FBQTtRQUN0RCxDQUFBLEVBQUE7UUFDTCxvQkFBQSxJQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGFBQWMsQ0FBQSxFQUFBO1VBQzFCLG9CQUFBLElBQUcsRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsYUFBYyxDQUFBLEVBQUE7WUFDMUIsb0JBQUEsUUFBTyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyx3QkFBQSxFQUF3QixDQUFDLE9BQUEsRUFBTyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBYyxDQUFBLEVBQUEsTUFBYSxDQUFBLEVBQUE7WUFDMUYsb0JBQUEsUUFBTyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyx5QkFBQSxFQUF5QixDQUFDLE9BQUEsRUFBTyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQW9CLENBQUEsRUFBQSxxQkFBNEIsQ0FBQTtVQUM3RyxDQUFBO1FBQ0YsQ0FBQTtNQUNELENBQUE7S0FDUDtHQUNGO0FBQ0gsQ0FBQyxDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWTs7OztBQ3pCN0IsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQzs7QUFFNUIsSUFBSSxtQ0FBbUMsNkJBQUE7RUFDckMsTUFBTSxFQUFFLFdBQVcsQ0FBQztJQUNsQjtNQUNFLG9CQUFBLEtBQUksRUFBQSxJQUFDLEVBQUE7UUFDSCxvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLGVBQWtCLENBQUEsRUFBQTtRQUN0QixvQkFBQSxPQUFNLEVBQUEsSUFBQyxFQUFBLFdBQWlCLENBQUEsRUFBQTtRQUN4QixvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxHQUFHLE1BQUEsRUFBTSxDQUFDLEdBQUEsRUFBRyxHQUFHLFdBQUEsRUFBVztBQUM5QyxVQUFVLFlBQUEsRUFBWSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVUsQ0FBRSxDQUFBLEVBQUE7O1FBRXJELG9CQUFBLE9BQU0sRUFBQSxJQUFDLEVBQUEsU0FBZSxDQUFBLEVBQUE7UUFDdEIsb0JBQUEsT0FBTSxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksR0FBRyxNQUFBLEVBQU0sQ0FBQyxHQUFBLEVBQUcsR0FBRyxhQUFBLEVBQWE7QUFDaEQsVUFBVSxZQUFBLEVBQVksR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBWSxDQUFFLENBQUEsRUFBQTs7UUFFL0Qsb0JBQUEsT0FBTSxFQUFBLElBQUMsRUFBQSxNQUFZLENBQUEsRUFBQTtRQUNuQixvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxHQUFHLE1BQUEsRUFBTSxDQUFDLEdBQUEsRUFBRyxHQUFHLE1BQUEsRUFBTTtBQUN6QyxVQUFVLFlBQUEsRUFBWSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFLLENBQUUsQ0FBQSxFQUFBOztRQUV4RCxvQkFBQSxPQUFNLEVBQUEsSUFBQyxFQUFBLE9BQWEsQ0FBQSxFQUFBO1FBQ3BCLG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLEdBQUcsTUFBQSxFQUFNLENBQUMsR0FBQSxFQUFHLEdBQUcsT0FBQSxFQUFPO0FBQzFDLFVBQVUsWUFBQSxFQUFZLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQU0sQ0FBRSxDQUFBLEVBQUE7O1FBRXpELG9CQUFBLE9BQU0sRUFBQSxJQUFDLEVBQUEsU0FBZSxDQUFBLEVBQUE7UUFDdEIsb0JBQUEsT0FBTSxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksR0FBRyxNQUFBLEVBQU0sQ0FBQyxHQUFBLEVBQUcsR0FBRyxTQUFBLEVBQVM7QUFDNUMsVUFBVSxZQUFBLEVBQVksR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBUSxDQUFFLENBQUEsRUFBQTs7UUFFM0Qsb0JBQUEsSUFBRyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxhQUFjLENBQUEsRUFBQTtVQUMxQixvQkFBQSxJQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGFBQWMsQ0FBQSxFQUFBO1lBQzFCLG9CQUFBLFFBQU8sRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsd0JBQUEsRUFBd0IsQ0FBQyxPQUFBLEVBQU8sQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQWMsQ0FBQSxFQUFBLE1BQWEsQ0FBQSxFQUFBO1lBQzFGLG9CQUFBLFFBQU8sRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMseUJBQUEsRUFBeUIsQ0FBQyxPQUFBLEVBQU8sQ0FBRSxJQUFJLENBQUMsZUFBaUIsQ0FBQSxFQUFBLGlCQUF3QixDQUFBO1VBQ2hHLENBQUE7UUFDRixDQUFBO01BQ0QsQ0FBQTtLQUNQO0FBQ0wsR0FBRzs7RUFFRCxlQUFlLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQztBQUNoQyxJQUFJLENBQUMsQ0FBQyxjQUFjLEVBQUU7O0lBRWxCLElBQUksSUFBSSxHQUFHO01BQ1QsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUs7TUFDbEQsT0FBTyxHQUFHO1FBQ1IsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUs7UUFDdEQsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUs7UUFDeEMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUs7UUFDMUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUs7T0FDL0M7QUFDUCxLQUFLOztJQUVELElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztJQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtHQUN0QjtBQUNILENBQUMsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLGFBQWE7Ozs7QUN2RDlCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7O0FBRTVCLElBQUksa0NBQWtDLDRCQUFBO0VBQ3BDLE1BQU0sRUFBRSxXQUFXLENBQUM7SUFDbEI7TUFDRSxvQkFBQSxLQUFJLEVBQUEsSUFBQyxFQUFBO1FBQ0gsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxjQUFpQixDQUFBLEVBQUE7UUFDckIsb0JBQUEsT0FBTSxFQUFBLElBQUMsRUFBQSxNQUFZLENBQUEsRUFBQTtRQUNuQixvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxHQUFHLE1BQUEsRUFBTSxDQUFDLEdBQUEsRUFBRyxHQUFHLE1BQUEsRUFBTTtBQUN6QyxVQUFVLFlBQUEsRUFBWSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFVBQVcsQ0FBRSxDQUFBLEVBQUE7O1FBRXRELG9CQUFBLE9BQU0sRUFBQSxJQUFDLEVBQUEsTUFBWSxDQUFBLEVBQUE7UUFDbkIsb0JBQUEsT0FBTSxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksR0FBRyxNQUFBLEVBQU0sQ0FBQyxHQUFBLEVBQUcsR0FBRyxNQUFBLEVBQU07QUFDekMsVUFBVSxZQUFBLEVBQVksR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFXLENBQUUsQ0FBQSxFQUFBOztRQUV0RCxvQkFBQSxPQUFNLEVBQUEsSUFBQyxFQUFBLEtBQVcsQ0FBQSxFQUFBO1FBQ2xCLG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLEdBQUcsTUFBQSxFQUFNLENBQUMsR0FBQSxFQUFHLEdBQUcsS0FBQSxFQUFLO0FBQ3hDLFVBQVUsWUFBQSxFQUFZLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBVSxDQUFFLENBQUEsRUFBQTs7UUFFckQsb0JBQUEsT0FBTSxFQUFBLElBQUMsRUFBQSxLQUFXLENBQUEsRUFBQTtRQUNsQixvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxHQUFHLE1BQUEsRUFBTSxDQUFDLEdBQUEsRUFBRyxHQUFHLEtBQUEsRUFBSztBQUN4QyxVQUFVLFlBQUEsRUFBWSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVUsQ0FBRSxDQUFBLEVBQUE7O1FBRXJELG9CQUFBLElBQUcsRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsYUFBYyxDQUFBLEVBQUE7VUFDMUIsb0JBQUEsSUFBRyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxhQUFjLENBQUEsRUFBQTtZQUMxQixvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLHdCQUFBLEVBQXdCLENBQUMsT0FBQSxFQUFPLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFjLENBQUEsRUFBQSxNQUFhLENBQUEsRUFBQTtZQUMxRixvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLHlCQUFBLEVBQXlCLENBQUMsT0FBQSxFQUFPLENBQUUsSUFBSSxDQUFDLGVBQWlCLENBQUEsRUFBQSxpQkFBd0IsQ0FBQTtVQUNoRyxDQUFBO1FBQ0YsQ0FBQTtNQUNELENBQUE7S0FDUDtBQUNMLEdBQUc7O0VBRUQsZUFBZSxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDaEMsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFOztJQUVsQixJQUFJLElBQUksR0FBRztNQUNULFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLO01BQzlDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLO01BQzlDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLO01BQzVDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLO0FBQ2xELEtBQUs7O0lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO0lBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0dBQ3RCO0FBQ0gsQ0FBQyxDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWTs7OztBQ2hEN0I7QUFDQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQzVCLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztBQUM5QyxJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7QUFDOUMsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDO0FBQzVDLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztBQUM1QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDOztBQUVsQyxJQUFJLFdBQVcsR0FBRzs7RUFFaEIsSUFBSSxHQUFHLElBQUk7RUFDWCxLQUFLLEdBQUcsSUFBSTtBQUNkLEVBQUUsUUFBUSxHQUFHLElBQUk7O0VBRWYsU0FBUyxHQUFHLElBQUk7RUFDaEIsT0FBTyxHQUFHO0lBQ1IsV0FBVyxHQUFHLElBQUk7SUFDbEIsSUFBSSxHQUFHLElBQUk7SUFDWCxLQUFLLEdBQUcsSUFBSTtJQUNaLE9BQU8sR0FBRyxJQUFJO0FBQ2xCLEdBQUc7O0VBRUQsVUFBVSxHQUFHLElBQUk7RUFDakIsVUFBVSxHQUFHLElBQUk7RUFDakIsU0FBUyxHQUFHLElBQUk7RUFDaEIsU0FBUyxHQUFHLElBQUk7RUFDaEIsU0FBUyxHQUFHLElBQUk7QUFDbEIsQ0FBQzs7QUFFRCxJQUFJLGtDQUFrQyw0QkFBQTtFQUNwQyxlQUFlLEVBQUUsV0FBVyxDQUFDO0lBQzNCLE9BQU87TUFDTCxJQUFJLEVBQUUsQ0FBQztLQUNSO0FBQ0wsR0FBRzs7RUFFRCxNQUFNLEVBQUUsV0FBVyxDQUFDO0lBQ2xCLElBQUksS0FBSyxJQUFJO01BQ1gsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHO0FBQy9DLEtBQUs7O0lBRUQ7TUFDRSxvQkFBQSxNQUFLLEVBQUEsSUFBQyxFQUFBO1FBQ0osb0JBQUEsTUFBSyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxlQUFnQixDQUFBLEVBQUEsT0FBQSxFQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBWSxDQUFBLEVBQUE7UUFDN0Qsb0JBQUEsVUFBUyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxVQUFBLEVBQVUsQ0FBQyxLQUFBLEVBQUssQ0FBRSxLQUFPLENBQVcsQ0FBQSxFQUFBO1FBQ3ZELElBQUksQ0FBQyxRQUFRLEVBQUc7TUFDWixDQUFBO0tBQ1I7QUFDTCxHQUFHOztFQUVELFFBQVEsRUFBRSxXQUFXLENBQUM7SUFDcEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7TUFDcEIsS0FBSyxDQUFDO1FBQ0osT0FBTyxvQkFBQyxhQUFhLEVBQUEsQ0FBQSxDQUFDLFdBQUEsRUFBVyxDQUFFLFdBQVcsRUFBQztVQUM3QyxRQUFBLEVBQVEsQ0FBRSxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsVUFBQSxFQUFVLENBQUUsSUFBSSxDQUFDLFVBQVcsQ0FBRSxDQUFBO01BQzNELEtBQUssQ0FBQztRQUNKLE9BQU8sb0JBQUMsYUFBYSxFQUFBLENBQUEsQ0FBQyxXQUFBLEVBQVcsQ0FBRSxXQUFXLEVBQUM7VUFDN0MsUUFBQSxFQUFRLENBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDLFlBQUEsRUFBWSxDQUFFLElBQUksQ0FBQyxZQUFZLEVBQUM7VUFDekQsVUFBQSxFQUFVLENBQUUsSUFBSSxDQUFDLFVBQVcsQ0FBRSxDQUFBO01BQ2xDLEtBQUssQ0FBQztRQUNKLE9BQU8sb0JBQUMsWUFBWSxFQUFBLENBQUEsQ0FBQyxXQUFBLEVBQVcsQ0FBRSxXQUFXLEVBQUM7VUFDNUMsUUFBQSxFQUFRLENBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDLFlBQUEsRUFBWSxDQUFFLElBQUksQ0FBQyxZQUFZLEVBQUM7VUFDekQsVUFBQSxFQUFVLENBQUUsSUFBSSxDQUFDLFVBQVcsQ0FBRSxDQUFBO01BQ2xDLEtBQUssQ0FBQztRQUNKLE9BQU8sb0JBQUMsWUFBWSxFQUFBLENBQUEsQ0FBQyxXQUFBLEVBQVcsQ0FBRSxXQUFXLEVBQUM7VUFDNUMsWUFBQSxFQUFZLENBQUUsSUFBSSxDQUFDLFlBQVksRUFBQyxDQUFDLGtCQUFBLEVBQWtCLENBQUUsSUFBSSxDQUFDLGtCQUFtQixDQUFFLENBQUE7TUFDbkYsS0FBSyxDQUFDO1FBQ0osT0FBTyxvQkFBQyxPQUFPLEVBQUEsQ0FBQSxDQUFDLFdBQUEsRUFBVyxDQUFFLFdBQVksQ0FBRSxDQUFBO0tBQzlDO0FBQ0wsR0FBRzs7RUFFRCxVQUFVLEVBQUUsU0FBUyxNQUFNLEVBQUUsQ0FBQztJQUM1QixPQUFPLFdBQVcsQ0FBQztNQUNqQixXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQztLQUNyRCxFQUFFO0FBQ1AsR0FBRzs7RUFFRCxRQUFRLEVBQUUsV0FBVyxDQUFDO0lBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUM7TUFDWixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQztLQUMzQixDQUFDO0FBQ04sR0FBRzs7RUFFRCxZQUFZLEVBQUUsV0FBVyxDQUFDO0lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUM7TUFDWixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQztLQUMzQixDQUFDO0FBQ04sR0FBRzs7QUFFSCxFQUFFLGtCQUFrQixFQUFFLFdBQVcsQ0FBQzs7SUFFOUIsSUFBSSxDQUFDLFFBQVEsRUFBRTtHQUNoQjtBQUNILENBQUMsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLFlBQVk7Ozs7QUMvRjdCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7O0FBRTVCLElBQUksNkJBQTZCLHVCQUFBO0VBQy9CLE1BQU0sRUFBRSxXQUFXLENBQUM7SUFDbEI7TUFDRSxvQkFBQSxLQUFJLEVBQUEsSUFBQyxFQUFBO1FBQ0gsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSwwQkFBNkIsQ0FBQTtNQUM3QixDQUFBO0tBQ1A7R0FDRjtBQUNILENBQUMsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ICAgICAgICA9IHJlcXVpcmUoJ3JlYWN0JylcclxudmFyIFJlZ2lzdHJhdGlvbiA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9SZWdpc3RyYXRpb24nKVxyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gIFJlYWN0LnJlbmRlcihcclxuICAgIDxSZWdpc3RyYXRpb24gLz4sXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVnaXN0cmF0aW9uLWZvcm0nKVxyXG4gIClcclxufVxyXG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5wcm9jZXNzLm5leHRUaWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuU2V0SW1tZWRpYXRlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICAgIHZhciBjYW5NdXRhdGlvbk9ic2VydmVyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuTXV0YXRpb25PYnNlcnZlcjtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICB2YXIgcXVldWUgPSBbXTtcblxuICAgIGlmIChjYW5NdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICAgIHZhciBoaWRkZW5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcXVldWVMaXN0ID0gcXVldWUuc2xpY2UoKTtcbiAgICAgICAgICAgIHF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICBxdWV1ZUxpc3QuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoaGlkZGVuRGl2LCB7IGF0dHJpYnV0ZXM6IHRydWUgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBpZiAoIXF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGhpZGRlbkRpdi5zZXRBdHRyaWJ1dGUoJ3llcycsICdubycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgb2JqZWN0QXNzaWduJDEgPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMnKTtcbnZhciBwcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG52YXIgZmFjdG9yeSA9IHJlcXVpcmUoJ2NyZWF0ZS1yZWFjdC1jbGFzcy9mYWN0b3J5Jyk7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgcmVhY3RQcm9kSW52YXJpYW50XG4gKiBcbiAqL1xuXG5mdW5jdGlvbiB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgY2FsbGVyTmFtZSkge1xuICB7XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gcHVibGljSW5zdGFuY2UuY29uc3RydWN0b3I7XG4gICAgd2FybmluZyhmYWxzZSwgJyVzKC4uLik6IENhbiBvbmx5IHVwZGF0ZSBhIG1vdW50ZWQgb3IgbW91bnRpbmcgY29tcG9uZW50LiAnICsgJ1RoaXMgdXN1YWxseSBtZWFucyB5b3UgY2FsbGVkICVzKCkgb24gYW4gdW5tb3VudGVkIGNvbXBvbmVudC4gJyArICdUaGlzIGlzIGEgbm8tb3AuXFxuXFxuUGxlYXNlIGNoZWNrIHRoZSBjb2RlIGZvciB0aGUgJXMgY29tcG9uZW50LicsIGNhbGxlck5hbWUsIGNhbGxlck5hbWUsIGNvbnN0cnVjdG9yICYmIChjb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCBjb25zdHJ1Y3Rvci5uYW1lKSB8fCAnUmVhY3RDbGFzcycpO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgYWJzdHJhY3QgQVBJIGZvciBhbiB1cGRhdGUgcXVldWUuXG4gKi9cbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHtcbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2Ugd2Ugd2FudCB0byB0ZXN0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIG1vdW50ZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICogQHByb3RlY3RlZFxuICAgKiBAZmluYWxcbiAgICovXG4gIGlzTW91bnRlZDogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gICAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICAgKlxuICAgKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gICAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICAgKlxuICAgKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gICAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0gez9zdHJpbmd9IE5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24gaW4gdGhlIHB1YmxpYyBBUEkuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUZvcmNlVXBkYXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNhbGxiYWNrLCBjYWxsZXJOYW1lKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdmb3JjZVVwZGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyBhbGwgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgb3IgYHNldFN0YXRlYCB0byBtdXRhdGUgc3RhdGUuXG4gICAqIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAgICpcbiAgICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAgICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb21wbGV0ZVN0YXRlIE5leHQgc3RhdGUuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgY29tcG9uZW50IGlzIHVwZGF0ZWQuXG4gICAqIEBwYXJhbSB7P3N0cmluZ30gTmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbiBpbiB0aGUgcHVibGljIEFQSS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlUmVwbGFjZVN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNvbXBsZXRlU3RhdGUsIGNhbGxiYWNrLCBjYWxsZXJOYW1lKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdyZXBsYWNlU3RhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIFRoaXMgb25seSBleGlzdHMgYmVjYXVzZSBfcGVuZGluZ1N0YXRlIGlzXG4gICAqIGludGVybmFsLiBUaGlzIHByb3ZpZGVzIGEgbWVyZ2luZyBzdHJhdGVneSB0aGF0IGlzIG5vdCBhdmFpbGFibGUgdG8gZGVlcFxuICAgKiBwcm9wZXJ0aWVzIHdoaWNoIGlzIGNvbmZ1c2luZy4gVE9ETzogRXhwb3NlIHBlbmRpbmdTdGF0ZSBvciBkb24ndCB1c2UgaXRcbiAgICogZHVyaW5nIHRoZSBtZXJnZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIHN0YXRlLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0gez9zdHJpbmd9IE5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24gaW4gdGhlIHB1YmxpYyBBUEkuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVNldFN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2ssIGNhbGxlck5hbWUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3NldFN0YXRlJyk7XG4gIH1cbn07XG5cbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZV8xID0gUmVhY3ROb29wVXBkYXRlUXVldWU7XG5cbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICogQHByb3ZpZGVzTW9kdWxlIGNhbkRlZmluZVByb3BlcnR5XG4gKi9cblxudmFyIGNhbkRlZmluZVByb3BlcnR5JDEgPSBmYWxzZTtcbntcbiAgdHJ5IHtcbiAgICAvLyAkRmxvd0ZpeE1lIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mbG93L2lzc3Vlcy8yODVcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICd4JywgeyBnZXQ6IGZ1bmN0aW9uICgpIHt9IH0pO1xuICAgIGNhbkRlZmluZVByb3BlcnR5JDEgPSB0cnVlO1xuICB9IGNhdGNoICh4KSB7XG4gICAgLy8gSUUgd2lsbCBmYWlsIG9uIGRlZmluZVByb3BlcnR5XG4gIH1cbn1cblxudmFyIGNhbkRlZmluZVByb3BlcnR5XzEgPSBjYW5EZWZpbmVQcm9wZXJ0eSQxO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgaGVscGVycyBmb3IgdGhlIHVwZGF0aW5nIHN0YXRlIG9mIGEgY29tcG9uZW50LlxuICovXG5mdW5jdGlvbiBSZWFjdENvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAvLyBXZSBpbml0aWFsaXplIHRoZSBkZWZhdWx0IHVwZGF0ZXIgYnV0IHRoZSByZWFsIG9uZSBnZXRzIGluamVjdGVkIGJ5IHRoZVxuICAvLyByZW5kZXJlci5cbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZV8xO1xufVxuXG5SZWFjdENvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA9IHt9O1xuXG4vKipcbiAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgdG8gbXV0YXRlXG4gKiBzdGF0ZS4gWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGNhbGxzIHRvIGBzZXRTdGF0ZWAgd2lsbCBydW4gc3luY2hyb25vdXNseSxcbiAqIGFzIHRoZXkgbWF5IGV2ZW50dWFsbHkgYmUgYmF0Y2hlZCB0b2dldGhlci4gIFlvdSBjYW4gcHJvdmlkZSBhbiBvcHRpb25hbFxuICogY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGNhbGwgdG8gc2V0U3RhdGUgaXMgYWN0dWFsbHlcbiAqIGNvbXBsZXRlZC5cbiAqXG4gKiBXaGVuIGEgZnVuY3Rpb24gaXMgcHJvdmlkZWQgdG8gc2V0U3RhdGUsIGl0IHdpbGwgYmUgY2FsbGVkIGF0IHNvbWUgcG9pbnQgaW5cbiAqIHRoZSBmdXR1cmUgKG5vdCBzeW5jaHJvbm91c2x5KS4gSXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgdXAgdG8gZGF0ZVxuICogY29tcG9uZW50IGFyZ3VtZW50cyAoc3RhdGUsIHByb3BzLCBjb250ZXh0KS4gVGhlc2UgdmFsdWVzIGNhbiBiZSBkaWZmZXJlbnRcbiAqIGZyb20gdGhpcy4qIGJlY2F1c2UgeW91ciBmdW5jdGlvbiBtYXkgYmUgY2FsbGVkIGFmdGVyIHJlY2VpdmVQcm9wcyBidXQgYmVmb3JlXG4gKiBzaG91bGRDb21wb25lbnRVcGRhdGUsIGFuZCB0aGlzIG5ldyBzdGF0ZSwgcHJvcHMsIGFuZCBjb250ZXh0IHdpbGwgbm90IHlldCBiZVxuICogYXNzaWduZWQgdG8gdGhpcy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSBvciBmdW5jdGlvbiB0b1xuICogICAgICAgIHByb2R1Y2UgbmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIGN1cnJlbnQgc3RhdGUuXG4gKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHN0YXRlIGlzIHVwZGF0ZWQuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2spIHtcbiAgISh0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnZnVuY3Rpb24nIHx8IHBhcnRpYWxTdGF0ZSA9PSBudWxsKSA/IGludmFyaWFudChmYWxzZSwgJ3NldFN0YXRlKC4uLik6IHRha2VzIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMgdG8gdXBkYXRlIG9yIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzLicpIDogdm9pZCAwO1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVNldFN0YXRlKHRoaXMsIHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2ssICdzZXRTdGF0ZScpO1xufTtcblxuLyoqXG4gKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAqXG4gKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAqXG4gKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICpcbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgdXBkYXRlIGlzIGNvbXBsZXRlLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cblJlYWN0Q29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUZvcmNlVXBkYXRlKHRoaXMsIGNhbGxiYWNrLCAnZm9yY2VVcGRhdGUnKTtcbn07XG5cbi8qKlxuICogRGVwcmVjYXRlZCBBUElzLiBUaGVzZSBBUElzIHVzZWQgdG8gZXhpc3Qgb24gY2xhc3NpYyBSZWFjdCBjbGFzc2VzIGJ1dCBzaW5jZVxuICogd2Ugd291bGQgbGlrZSB0byBkZXByZWNhdGUgdGhlbSwgd2UncmUgbm90IGdvaW5nIHRvIG1vdmUgdGhlbSBvdmVyIHRvIHRoaXNcbiAqIG1vZGVybiBiYXNlIGNsYXNzLiBJbnN0ZWFkLCB3ZSBkZWZpbmUgYSBnZXR0ZXIgdGhhdCB3YXJucyBpZiBpdCdzIGFjY2Vzc2VkLlxuICovXG57XG4gIHZhciBkZXByZWNhdGVkQVBJcyA9IHtcbiAgICBpc01vdW50ZWQ6IFsnaXNNb3VudGVkJywgJ0luc3RlYWQsIG1ha2Ugc3VyZSB0byBjbGVhbiB1cCBzdWJzY3JpcHRpb25zIGFuZCBwZW5kaW5nIHJlcXVlc3RzIGluICcgKyAnY29tcG9uZW50V2lsbFVubW91bnQgdG8gcHJldmVudCBtZW1vcnkgbGVha3MuJ10sXG4gICAgcmVwbGFjZVN0YXRlOiBbJ3JlcGxhY2VTdGF0ZScsICdSZWZhY3RvciB5b3VyIGNvZGUgdG8gdXNlIHNldFN0YXRlIGluc3RlYWQgKHNlZSAnICsgJ2h0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMzIzNikuJ11cbiAgfTtcbiAgdmFyIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBpbmZvKSB7XG4gICAgaWYgKGNhbkRlZmluZVByb3BlcnR5XzEpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFjdENvbXBvbmVudC5wcm90b3R5cGUsIG1ldGhvZE5hbWUsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgd2FybmluZyhmYWxzZSwgJyVzKC4uLikgaXMgZGVwcmVjYXRlZCBpbiBwbGFpbiBKYXZhU2NyaXB0IFJlYWN0IGNsYXNzZXMuICVzJywgaW5mb1swXSwgaW5mb1sxXSk7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBmb3IgKHZhciBmbk5hbWUgaW4gZGVwcmVjYXRlZEFQSXMpIHtcbiAgICBpZiAoZGVwcmVjYXRlZEFQSXMuaGFzT3duUHJvcGVydHkoZm5OYW1lKSkge1xuICAgICAgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nKGZuTmFtZSwgZGVwcmVjYXRlZEFQSXNbZm5OYW1lXSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIFJlYWN0UHVyZUNvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAvLyBEdXBsaWNhdGVkIGZyb20gUmVhY3RDb21wb25lbnQuXG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gIC8vIFdlIGluaXRpYWxpemUgdGhlIGRlZmF1bHQgdXBkYXRlciBidXQgdGhlIHJlYWwgb25lIGdldHMgaW5qZWN0ZWQgYnkgdGhlXG4gIC8vIHJlbmRlcmVyLlxuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlXzE7XG59XG5cbmZ1bmN0aW9uIENvbXBvbmVudER1bW15KCkge31cbkNvbXBvbmVudER1bW15LnByb3RvdHlwZSA9IFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZTtcblJlYWN0UHVyZUNvbXBvbmVudC5wcm90b3R5cGUgPSBuZXcgQ29tcG9uZW50RHVtbXkoKTtcblJlYWN0UHVyZUNvbXBvbmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWFjdFB1cmVDb21wb25lbnQ7XG4vLyBBdm9pZCBhbiBleHRyYSBwcm90b3R5cGUganVtcCBmb3IgdGhlc2UgbWV0aG9kcy5cbm9iamVjdEFzc2lnbiQxKFJlYWN0UHVyZUNvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZSk7XG5SZWFjdFB1cmVDb21wb25lbnQucHJvdG90eXBlLmlzUHVyZVJlYWN0Q29tcG9uZW50ID0gdHJ1ZTtcblxudmFyIFJlYWN0QmFzZUNsYXNzZXMgPSB7XG4gIENvbXBvbmVudDogUmVhY3RDb21wb25lbnQsXG4gIFB1cmVDb21wb25lbnQ6IFJlYWN0UHVyZUNvbXBvbmVudFxufTtcblxuLyoqXG4gKiBTdGF0aWMgcG9vbGVycy4gU2V2ZXJhbCBjdXN0b20gdmVyc2lvbnMgZm9yIGVhY2ggcG90ZW50aWFsIG51bWJlciBvZlxuICogYXJndW1lbnRzLiBBIGNvbXBsZXRlbHkgZ2VuZXJpYyBwb29sZXIgaXMgZWFzeSB0byBpbXBsZW1lbnQsIGJ1dCB3b3VsZFxuICogcmVxdWlyZSBhY2Nlc3NpbmcgdGhlIGBhcmd1bWVudHNgIG9iamVjdC4gSW4gZWFjaCBvZiB0aGVzZSwgYHRoaXNgIHJlZmVycyB0b1xuICogdGhlIENsYXNzIGl0c2VsZiwgbm90IGFuIGluc3RhbmNlLiBJZiBhbnkgb3RoZXJzIGFyZSBuZWVkZWQsIHNpbXBseSBhZGQgdGhlbVxuICogaGVyZSwgb3IgaW4gdGhlaXIgb3duIGZpbGVzLlxuICovXG52YXIgb25lQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoY29weUZpZWxkc0Zyb20pIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgY29weUZpZWxkc0Zyb20pO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGNvcHlGaWVsZHNGcm9tKTtcbiAgfVxufTtcblxudmFyIHR3b0FyZ3VtZW50UG9vbGVyJDEgPSBmdW5jdGlvbiAoYTEsIGEyKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMik7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyKTtcbiAgfVxufTtcblxudmFyIHRocmVlQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoYTEsIGEyLCBhMykge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBhMSwgYTIsIGEzKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIsIGEzKTtcbiAgfVxufTtcblxudmFyIGZvdXJBcmd1bWVudFBvb2xlciQxID0gZnVuY3Rpb24gKGExLCBhMiwgYTMsIGE0KSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMiwgYTMsIGE0KTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIsIGEzLCBhNCk7XG4gIH1cbn07XG5cbnZhciBzdGFuZGFyZFJlbGVhc2VyID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gICEoaW5zdGFuY2UgaW5zdGFuY2VvZiBLbGFzcykgPyBpbnZhcmlhbnQoZmFsc2UsICdUcnlpbmcgdG8gcmVsZWFzZSBhbiBpbnN0YW5jZSBpbnRvIGEgcG9vbCBvZiBhIGRpZmZlcmVudCB0eXBlLicpIDogdm9pZCAwO1xuICBpbnN0YW5jZS5kZXN0cnVjdG9yKCk7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoIDwgS2xhc3MucG9vbFNpemUpIHtcbiAgICBLbGFzcy5pbnN0YW5jZVBvb2wucHVzaChpbnN0YW5jZSk7XG4gIH1cbn07XG5cbnZhciBERUZBVUxUX1BPT0xfU0laRSA9IDEwO1xudmFyIERFRkFVTFRfUE9PTEVSID0gb25lQXJndW1lbnRQb29sZXI7XG5cbi8qKlxuICogQXVnbWVudHMgYENvcHlDb25zdHJ1Y3RvcmAgdG8gYmUgYSBwb29sYWJsZSBjbGFzcywgYXVnbWVudGluZyBvbmx5IHRoZSBjbGFzc1xuICogaXRzZWxmIChzdGF0aWNhbGx5KSBub3QgYWRkaW5nIGFueSBwcm90b3R5cGljYWwgZmllbGRzLiBBbnkgQ29weUNvbnN0cnVjdG9yXG4gKiB5b3UgZ2l2ZSB0aGlzIG1heSBoYXZlIGEgYHBvb2xTaXplYCBwcm9wZXJ0eSwgYW5kIHdpbGwgbG9vayBmb3IgYVxuICogcHJvdG90eXBpY2FsIGBkZXN0cnVjdG9yYCBvbiBpbnN0YW5jZXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gQ29weUNvbnN0cnVjdG9yIENvbnN0cnVjdG9yIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVzZXQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwb29sZXIgQ3VzdG9taXphYmxlIHBvb2xlci5cbiAqL1xudmFyIGFkZFBvb2xpbmdUbyA9IGZ1bmN0aW9uIChDb3B5Q29uc3RydWN0b3IsIHBvb2xlcikge1xuICAvLyBDYXN0aW5nIGFzIGFueSBzbyB0aGF0IGZsb3cgaWdub3JlcyB0aGUgYWN0dWFsIGltcGxlbWVudGF0aW9uIGFuZCB0cnVzdHNcbiAgLy8gaXQgdG8gbWF0Y2ggdGhlIHR5cGUgd2UgZGVjbGFyZWRcbiAgdmFyIE5ld0tsYXNzID0gQ29weUNvbnN0cnVjdG9yO1xuICBOZXdLbGFzcy5pbnN0YW5jZVBvb2wgPSBbXTtcbiAgTmV3S2xhc3MuZ2V0UG9vbGVkID0gcG9vbGVyIHx8IERFRkFVTFRfUE9PTEVSO1xuICBpZiAoIU5ld0tsYXNzLnBvb2xTaXplKSB7XG4gICAgTmV3S2xhc3MucG9vbFNpemUgPSBERUZBVUxUX1BPT0xfU0laRTtcbiAgfVxuICBOZXdLbGFzcy5yZWxlYXNlID0gc3RhbmRhcmRSZWxlYXNlcjtcbiAgcmV0dXJuIE5ld0tsYXNzO1xufTtcblxudmFyIFBvb2xlZENsYXNzID0ge1xuICBhZGRQb29saW5nVG86IGFkZFBvb2xpbmdUbyxcbiAgb25lQXJndW1lbnRQb29sZXI6IG9uZUFyZ3VtZW50UG9vbGVyLFxuICB0d29Bcmd1bWVudFBvb2xlcjogdHdvQXJndW1lbnRQb29sZXIkMSxcbiAgdGhyZWVBcmd1bWVudFBvb2xlcjogdGhyZWVBcmd1bWVudFBvb2xlcixcbiAgZm91ckFyZ3VtZW50UG9vbGVyOiBmb3VyQXJndW1lbnRQb29sZXIkMVxufTtcblxudmFyIFBvb2xlZENsYXNzXzEgPSBQb29sZWRDbGFzcztcblxuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q3VycmVudE93bmVyXG4gKiBcbiAqL1xuXG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IG93bmVyLlxuICpcbiAqIFRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBjb21wb25lbnQgd2hvIHNob3VsZCBvd24gYW55IGNvbXBvbmVudHMgdGhhdCBhcmVcbiAqIGN1cnJlbnRseSBiZWluZyBjb25zdHJ1Y3RlZC5cbiAqL1xudmFyIFJlYWN0Q3VycmVudE93bmVyID0ge1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqIEB0eXBlIHtSZWFjdENvbXBvbmVudH1cbiAgICovXG4gIGN1cnJlbnQ6IG51bGxcbn07XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lcl8xID0gUmVhY3RDdXJyZW50T3duZXI7XG5cbi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEVsZW1lbnRTeW1ib2xcbiAqIFxuICovXG5cbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudCB0eXBlLiBJZiB0aGVyZSBpcyBubyBuYXRpdmUgU3ltYm9sXG4vLyBub3IgcG9seWZpbGwsIHRoZW4gYSBwbGFpbiBudW1iZXIgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UuXG5cbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbFsnZm9yJ10gJiYgU3ltYm9sWydmb3InXSgncmVhY3QuZWxlbWVudCcpIHx8IDB4ZWFjNztcblxudmFyIFJlYWN0RWxlbWVudFN5bWJvbCA9IFJFQUNUX0VMRU1FTlRfVFlQRTtcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuXG5cbnZhciBSRVNFUlZFRF9QUk9QUyA9IHtcbiAga2V5OiB0cnVlLFxuICByZWY6IHRydWUsXG4gIF9fc2VsZjogdHJ1ZSxcbiAgX19zb3VyY2U6IHRydWVcbn07XG5cbnZhciBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93bjtcbnZhciBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bjtcblxuZnVuY3Rpb24gaGFzVmFsaWRSZWYoY29uZmlnKSB7XG4gIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdyZWYnKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAncmVmJykuZ2V0O1xuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZmlnLnJlZiAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBoYXNWYWxpZEtleShjb25maWcpIHtcbiAge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgJ2tleScpKSB7XG4gICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdrZXknKS5nZXQ7XG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25maWcua2V5ICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB2YXIgd2FybkFib3V0QWNjZXNzaW5nS2V5ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24pIHtcbiAgICAgIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duID0gdHJ1ZTtcbiAgICAgIHdhcm5pbmcoZmFsc2UsICclczogYGtleWAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSk7XG4gICAgfVxuICB9O1xuICB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdrZXknLCB7XG4gICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdLZXksXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ1JlZiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duKSB7XG4gICAgICBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICB3YXJuaW5nKGZhbHNlLCAnJXM6IGByZWZgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpO1xuICAgIH1cbiAgfTtcbiAgd2FybkFib3V0QWNjZXNzaW5nUmVmLmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAncmVmJywge1xuICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nUmVmLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgUmVhY3QgZWxlbWVudC4gVGhpcyBubyBsb25nZXIgYWRoZXJlcyB0b1xuICogdGhlIGNsYXNzIHBhdHRlcm4sIHNvIGRvIG5vdCB1c2UgbmV3IHRvIGNhbGwgaXQuIEFsc28sIG5vIGluc3RhbmNlb2YgY2hlY2tcbiAqIHdpbGwgd29yay4gSW5zdGVhZCB0ZXN0ICQkdHlwZW9mIGZpZWxkIGFnYWluc3QgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIHRvIGNoZWNrXG4gKiBpZiBzb21ldGhpbmcgaXMgYSBSZWFjdCBFbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7Kn0gdHlwZVxuICogQHBhcmFtIHsqfSBrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gcmVmXG4gKiBAcGFyYW0geyp9IHNlbGYgQSAqdGVtcG9yYXJ5KiBoZWxwZXIgdG8gZGV0ZWN0IHBsYWNlcyB3aGVyZSBgdGhpc2AgaXNcbiAqIGRpZmZlcmVudCBmcm9tIHRoZSBgb3duZXJgIHdoZW4gUmVhY3QuY3JlYXRlRWxlbWVudCBpcyBjYWxsZWQsIHNvIHRoYXQgd2VcbiAqIGNhbiB3YXJuLiBXZSB3YW50IHRvIGdldCByaWQgb2Ygb3duZXIgYW5kIHJlcGxhY2Ugc3RyaW5nIGByZWZgcyB3aXRoIGFycm93XG4gKiBmdW5jdGlvbnMsIGFuZCBhcyBsb25nIGFzIGB0aGlzYCBhbmQgb3duZXIgYXJlIHRoZSBzYW1lLCB0aGVyZSB3aWxsIGJlIG5vXG4gKiBjaGFuZ2UgaW4gYmVoYXZpb3IuXG4gKiBAcGFyYW0geyp9IHNvdXJjZSBBbiBhbm5vdGF0aW9uIG9iamVjdCAoYWRkZWQgYnkgYSB0cmFuc3BpbGVyIG9yIG90aGVyd2lzZSlcbiAqIGluZGljYXRpbmcgZmlsZW5hbWUsIGxpbmUgbnVtYmVyLCBhbmQvb3Igb3RoZXIgaW5mb3JtYXRpb24uXG4gKiBAcGFyYW0geyp9IG93bmVyXG4gKiBAcGFyYW0geyp9IHByb3BzXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0RWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpIHtcbiAgdmFyIGVsZW1lbnQgPSB7XG4gICAgLy8gVGhpcyB0YWcgYWxsb3cgdXMgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyBhcyBhIFJlYWN0IEVsZW1lbnRcbiAgICAkJHR5cGVvZjogUmVhY3RFbGVtZW50U3ltYm9sLFxuXG4gICAgLy8gQnVpbHQtaW4gcHJvcGVydGllcyB0aGF0IGJlbG9uZyBvbiB0aGUgZWxlbWVudFxuICAgIHR5cGU6IHR5cGUsXG4gICAga2V5OiBrZXksXG4gICAgcmVmOiByZWYsXG4gICAgcHJvcHM6IHByb3BzLFxuXG4gICAgLy8gUmVjb3JkIHRoZSBjb21wb25lbnQgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoaXMgZWxlbWVudC5cbiAgICBfb3duZXI6IG93bmVyXG4gIH07XG5cbiAge1xuICAgIC8vIFRoZSB2YWxpZGF0aW9uIGZsYWcgaXMgY3VycmVudGx5IG11dGF0aXZlLiBXZSBwdXQgaXQgb25cbiAgICAvLyBhbiBleHRlcm5hbCBiYWNraW5nIHN0b3JlIHNvIHRoYXQgd2UgY2FuIGZyZWV6ZSB0aGUgd2hvbGUgb2JqZWN0LlxuICAgIC8vIFRoaXMgY2FuIGJlIHJlcGxhY2VkIHdpdGggYSBXZWFrTWFwIG9uY2UgdGhleSBhcmUgaW1wbGVtZW50ZWQgaW5cbiAgICAvLyBjb21tb25seSB1c2VkIGRldmVsb3BtZW50IGVudmlyb25tZW50cy5cbiAgICBlbGVtZW50Ll9zdG9yZSA9IHt9O1xuXG4gICAgLy8gVG8gbWFrZSBjb21wYXJpbmcgUmVhY3RFbGVtZW50cyBlYXNpZXIgZm9yIHRlc3RpbmcgcHVycG9zZXMsIHdlIG1ha2VcbiAgICAvLyB0aGUgdmFsaWRhdGlvbiBmbGFnIG5vbi1lbnVtZXJhYmxlICh3aGVyZSBwb3NzaWJsZSwgd2hpY2ggc2hvdWxkXG4gICAgLy8gaW5jbHVkZSBldmVyeSBlbnZpcm9ubWVudCB3ZSBydW4gdGVzdHMgaW4pLCBzbyB0aGUgdGVzdCBmcmFtZXdvcmtcbiAgICAvLyBpZ25vcmVzIGl0LlxuICAgIGlmIChjYW5EZWZpbmVQcm9wZXJ0eV8xKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudC5fc3RvcmUsICd2YWxpZGF0ZWQnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIC8vIHNlbGYgYW5kIHNvdXJjZSBhcmUgREVWIG9ubHkgcHJvcGVydGllcy5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NlbGYnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiBzZWxmXG4gICAgICB9KTtcbiAgICAgIC8vIFR3byBlbGVtZW50cyBjcmVhdGVkIGluIHR3byBkaWZmZXJlbnQgcGxhY2VzIHNob3VsZCBiZSBjb25zaWRlcmVkXG4gICAgICAvLyBlcXVhbCBmb3IgdGVzdGluZyBwdXJwb3NlcyBhbmQgdGhlcmVmb3JlIHdlIGhpZGUgaXQgZnJvbSBlbnVtZXJhdGlvbi5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NvdXJjZScsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNvdXJjZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IGZhbHNlO1xuICAgICAgZWxlbWVudC5fc2VsZiA9IHNlbGY7XG4gICAgICBlbGVtZW50Ll9zb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQucHJvcHMpO1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IG9mIHRoZSBnaXZlbiB0eXBlLlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvcmVhY3QtYXBpLmh0bWwjY3JlYXRlZWxlbWVudFxuICovXG5SZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBjb25maWcsIGNoaWxkcmVuKSB7XG4gIHZhciBwcm9wTmFtZTtcblxuICAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG4gIHZhciBwcm9wcyA9IHt9O1xuXG4gIHZhciBrZXkgPSBudWxsO1xuICB2YXIgcmVmID0gbnVsbDtcbiAgdmFyIHNlbGYgPSBudWxsO1xuICB2YXIgc291cmNlID0gbnVsbDtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAoaGFzVmFsaWRSZWYoY29uZmlnKSkge1xuICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICB9XG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIGtleSA9ICcnICsgY29uZmlnLmtleTtcbiAgICB9XG5cbiAgICBzZWxmID0gY29uZmlnLl9fc2VsZiA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NlbGY7XG4gICAgc291cmNlID0gY29uZmlnLl9fc291cmNlID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLl9fc291cmNlO1xuICAgIC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIGFyZSBhZGRlZCB0byBhIG5ldyBwcm9wcyBvYmplY3RcbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIHtcbiAgICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICAgIE9iamVjdC5mcmVlemUoY2hpbGRBcnJheSk7XG4gICAgICB9XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICBpZiAodHlwZSAmJiB0eXBlLmRlZmF1bHRQcm9wcykge1xuICAgIHZhciBkZWZhdWx0UHJvcHMgPSB0eXBlLmRlZmF1bHRQcm9wcztcbiAgICBmb3IgKHByb3BOYW1lIGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHtcbiAgICBpZiAoa2V5IHx8IHJlZikge1xuICAgICAgaWYgKHR5cGVvZiBwcm9wcy4kJHR5cGVvZiA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcHMuJCR0eXBlb2YgIT09IFJlYWN0RWxlbWVudFN5bWJvbCkge1xuICAgICAgICB2YXIgZGlzcGxheU5hbWUgPSB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyA/IHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lIHx8ICdVbmtub3duJyA6IHR5cGU7XG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgICBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBSZWFjdEVsZW1lbnQodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgUmVhY3RDdXJyZW50T3duZXJfMS5jdXJyZW50LCBwcm9wcyk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIGZ1bmN0aW9uIHRoYXQgcHJvZHVjZXMgUmVhY3RFbGVtZW50cyBvZiBhIGdpdmVuIHR5cGUuXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy9yZWFjdC1hcGkuaHRtbCNjcmVhdGVmYWN0b3J5XG4gKi9cblJlYWN0RWxlbWVudC5jcmVhdGVGYWN0b3J5ID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgdmFyIGZhY3RvcnkkJDEgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudC5iaW5kKG51bGwsIHR5cGUpO1xuICAvLyBFeHBvc2UgdGhlIHR5cGUgb24gdGhlIGZhY3RvcnkgYW5kIHRoZSBwcm90b3R5cGUgc28gdGhhdCBpdCBjYW4gYmVcbiAgLy8gZWFzaWx5IGFjY2Vzc2VkIG9uIGVsZW1lbnRzLiBFLmcuIGA8Rm9vIC8+LnR5cGUgPT09IEZvb2AuXG4gIC8vIFRoaXMgc2hvdWxkIG5vdCBiZSBuYW1lZCBgY29uc3RydWN0b3JgIHNpbmNlIHRoaXMgbWF5IG5vdCBiZSB0aGUgZnVuY3Rpb25cbiAgLy8gdGhhdCBjcmVhdGVkIHRoZSBlbGVtZW50LCBhbmQgaXQgbWF5IG5vdCBldmVuIGJlIGEgY29uc3RydWN0b3IuXG4gIC8vIExlZ2FjeSBob29rIFRPRE86IFdhcm4gaWYgdGhpcyBpcyBhY2Nlc3NlZFxuICBmYWN0b3J5JCQxLnR5cGUgPSB0eXBlO1xuICByZXR1cm4gZmFjdG9yeSQkMTtcbn07XG5cblJlYWN0RWxlbWVudC5jbG9uZUFuZFJlcGxhY2VLZXkgPSBmdW5jdGlvbiAob2xkRWxlbWVudCwgbmV3S2V5KSB7XG4gIHZhciBuZXdFbGVtZW50ID0gUmVhY3RFbGVtZW50KG9sZEVsZW1lbnQudHlwZSwgbmV3S2V5LCBvbGRFbGVtZW50LnJlZiwgb2xkRWxlbWVudC5fc2VsZiwgb2xkRWxlbWVudC5fc291cmNlLCBvbGRFbGVtZW50Ll9vd25lciwgb2xkRWxlbWVudC5wcm9wcyk7XG5cbiAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENsb25lIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IHVzaW5nIGVsZW1lbnQgYXMgdGhlIHN0YXJ0aW5nIHBvaW50LlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvcmVhY3QtYXBpLmh0bWwjY2xvbmVlbGVtZW50XG4gKi9cblJlYWN0RWxlbWVudC5jbG9uZUVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgY29uZmlnLCBjaGlsZHJlbikge1xuICB2YXIgcHJvcE5hbWU7XG5cbiAgLy8gT3JpZ2luYWwgcHJvcHMgYXJlIGNvcGllZFxuICB2YXIgcHJvcHMgPSBvYmplY3RBc3NpZ24kMSh7fSwgZWxlbWVudC5wcm9wcyk7XG5cbiAgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuICB2YXIga2V5ID0gZWxlbWVudC5rZXk7XG4gIHZhciByZWYgPSBlbGVtZW50LnJlZjtcbiAgLy8gU2VsZiBpcyBwcmVzZXJ2ZWQgc2luY2UgdGhlIG93bmVyIGlzIHByZXNlcnZlZC5cbiAgdmFyIHNlbGYgPSBlbGVtZW50Ll9zZWxmO1xuICAvLyBTb3VyY2UgaXMgcHJlc2VydmVkIHNpbmNlIGNsb25lRWxlbWVudCBpcyB1bmxpa2VseSB0byBiZSB0YXJnZXRlZCBieSBhXG4gIC8vIHRyYW5zcGlsZXIsIGFuZCB0aGUgb3JpZ2luYWwgc291cmNlIGlzIHByb2JhYmx5IGEgYmV0dGVyIGluZGljYXRvciBvZiB0aGVcbiAgLy8gdHJ1ZSBvd25lci5cbiAgdmFyIHNvdXJjZSA9IGVsZW1lbnQuX3NvdXJjZTtcblxuICAvLyBPd25lciB3aWxsIGJlIHByZXNlcnZlZCwgdW5sZXNzIHJlZiBpcyBvdmVycmlkZGVuXG4gIHZhciBvd25lciA9IGVsZW1lbnQuX293bmVyO1xuXG4gIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgIGlmIChoYXNWYWxpZFJlZihjb25maWcpKSB7XG4gICAgICAvLyBTaWxlbnRseSBzdGVhbCB0aGUgcmVmIGZyb20gdGhlIHBhcmVudC5cbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgICBvd25lciA9IFJlYWN0Q3VycmVudE93bmVyXzEuY3VycmVudDtcbiAgICB9XG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIGtleSA9ICcnICsgY29uZmlnLmtleTtcbiAgICB9XG5cbiAgICAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBvdmVycmlkZSBleGlzdGluZyBwcm9wc1xuICAgIHZhciBkZWZhdWx0UHJvcHM7XG4gICAgaWYgKGVsZW1lbnQudHlwZSAmJiBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgICBkZWZhdWx0UHJvcHMgPSBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzO1xuICAgIH1cbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBpZiAoY29uZmlnW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkICYmIGRlZmF1bHRQcm9wcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hpbGRyZW4gY2FuIGJlIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQsIGFuZCB0aG9zZSBhcmUgdHJhbnNmZXJyZWQgb250b1xuICAvLyB0aGUgbmV3bHkgYWxsb2NhdGVkIHByb3BzIG9iamVjdC5cbiAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIH0gZWxzZSBpZiAoY2hpbGRyZW5MZW5ndGggPiAxKSB7XG4gICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICB9XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICB9XG5cbiAgcmV0dXJuIFJlYWN0RWxlbWVudChlbGVtZW50LnR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcyk7XG59O1xuXG4vKipcbiAqIFZlcmlmaWVzIHRoZSBvYmplY3QgaXMgYSBSZWFjdEVsZW1lbnQuXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy9yZWFjdC1hcGkuaHRtbCNpc3ZhbGlkZWxlbWVudFxuICogQHBhcmFtIHs/b2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYG9iamVjdGAgaXMgYSB2YWxpZCBjb21wb25lbnQuXG4gKiBAZmluYWxcbiAqL1xuUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUmVhY3RFbGVtZW50U3ltYm9sO1xufTtcblxudmFyIFJlYWN0RWxlbWVudF8xID0gUmVhY3RFbGVtZW50O1xuXG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgZ2V0SXRlcmF0b3JGblxuICogXG4gKi9cblxuLyogZ2xvYmFsIFN5bWJvbCAqL1xuXG52YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG52YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gKlxuICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gKlxuICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICogICAgICAgLi4uXG4gKiAgICAgfVxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gIH1cbn1cblxudmFyIGdldEl0ZXJhdG9yRm5fMSA9IGdldEl0ZXJhdG9yRm47XG5cbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBLZXlFc2NhcGVVdGlsc1xuICogXG4gKi9cblxuLyoqXG4gKiBFc2NhcGUgYW5kIHdyYXAga2V5IHNvIGl0IGlzIHNhZmUgdG8gdXNlIGFzIGEgcmVhY3RpZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgdG8gYmUgZXNjYXBlZC5cbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIGVzY2FwZWQga2V5LlxuICovXG5cbmZ1bmN0aW9uIGVzY2FwZShrZXkpIHtcbiAgdmFyIGVzY2FwZVJlZ2V4ID0gL1s9Ol0vZztcbiAgdmFyIGVzY2FwZXJMb29rdXAgPSB7XG4gICAgJz0nOiAnPTAnLFxuICAgICc6JzogJz0yJ1xuICB9O1xuICB2YXIgZXNjYXBlZFN0cmluZyA9ICgnJyArIGtleSkucmVwbGFjZShlc2NhcGVSZWdleCwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIGVzY2FwZXJMb29rdXBbbWF0Y2hdO1xuICB9KTtcblxuICByZXR1cm4gJyQnICsgZXNjYXBlZFN0cmluZztcbn1cblxuLyoqXG4gKiBVbmVzY2FwZSBhbmQgdW53cmFwIGtleSBmb3IgaHVtYW4tcmVhZGFibGUgZGlzcGxheVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgdG8gdW5lc2NhcGUuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSB1bmVzY2FwZWQga2V5LlxuICovXG5mdW5jdGlvbiB1bmVzY2FwZShrZXkpIHtcbiAgdmFyIHVuZXNjYXBlUmVnZXggPSAvKD0wfD0yKS9nO1xuICB2YXIgdW5lc2NhcGVyTG9va3VwID0ge1xuICAgICc9MCc6ICc9JyxcbiAgICAnPTInOiAnOidcbiAgfTtcbiAgdmFyIGtleVN1YnN0cmluZyA9IGtleVswXSA9PT0gJy4nICYmIGtleVsxXSA9PT0gJyQnID8ga2V5LnN1YnN0cmluZygyKSA6IGtleS5zdWJzdHJpbmcoMSk7XG5cbiAgcmV0dXJuICgnJyArIGtleVN1YnN0cmluZykucmVwbGFjZSh1bmVzY2FwZVJlZ2V4LCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICByZXR1cm4gdW5lc2NhcGVyTG9va3VwW21hdGNoXTtcbiAgfSk7XG59XG5cbnZhciBLZXlFc2NhcGVVdGlscyA9IHtcbiAgZXNjYXBlOiBlc2NhcGUsXG4gIHVuZXNjYXBlOiB1bmVzY2FwZVxufTtcblxudmFyIEtleUVzY2FwZVV0aWxzXzEgPSBLZXlFc2NhcGVVdGlscztcblxuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0VHlwZU9mV29ya1xuICogXG4gKi9cblxudmFyIFJlYWN0VHlwZU9mV29yayA9IHtcbiAgSW5kZXRlcm1pbmF0ZUNvbXBvbmVudDogMCwgLy8gQmVmb3JlIHdlIGtub3cgd2hldGhlciBpdCBpcyBmdW5jdGlvbmFsIG9yIGNsYXNzXG4gIEZ1bmN0aW9uYWxDb21wb25lbnQ6IDEsXG4gIENsYXNzQ29tcG9uZW50OiAyLFxuICBIb3N0Um9vdDogMywgLy8gUm9vdCBvZiBhIGhvc3QgdHJlZS4gQ291bGQgYmUgbmVzdGVkIGluc2lkZSBhbm90aGVyIG5vZGUuXG4gIEhvc3RQb3J0YWw6IDQsIC8vIEEgc3VidHJlZS4gQ291bGQgYmUgYW4gZW50cnkgcG9pbnQgdG8gYSBkaWZmZXJlbnQgcmVuZGVyZXIuXG4gIEhvc3RDb21wb25lbnQ6IDUsXG4gIEhvc3RUZXh0OiA2LFxuICBDb3JvdXRpbmVDb21wb25lbnQ6IDcsXG4gIENvcm91dGluZUhhbmRsZXJQaGFzZTogOCxcbiAgWWllbGRDb21wb25lbnQ6IDksXG4gIEZyYWdtZW50OiAxMFxufTtcblxuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGdldENvbXBvbmVudE5hbWVcbiAqIFxuICovXG5cbmZ1bmN0aW9uIGdldENvbXBvbmVudE5hbWUoaW5zdGFuY2VPckZpYmVyKSB7XG4gIGlmICh0eXBlb2YgaW5zdGFuY2VPckZpYmVyLmdldE5hbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBTdGFjayByZWNvbmNpbGVyXG4gICAgdmFyIGluc3RhbmNlID0gaW5zdGFuY2VPckZpYmVyO1xuICAgIHJldHVybiBpbnN0YW5jZS5nZXROYW1lKCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBpbnN0YW5jZU9yRmliZXIudGFnID09PSAnbnVtYmVyJykge1xuICAgIC8vIEZpYmVyIHJlY29uY2lsZXJcbiAgICB2YXIgZmliZXIgPSBpbnN0YW5jZU9yRmliZXI7XG4gICAgdmFyIHR5cGUgPSBmaWJlci50eXBlO1xuXG4gICAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxudmFyIGdldENvbXBvbmVudE5hbWVfMSA9IGdldENvbXBvbmVudE5hbWU7XG5cbnZhciBJbmRldGVybWluYXRlQ29tcG9uZW50ID0gUmVhY3RUeXBlT2ZXb3JrLkluZGV0ZXJtaW5hdGVDb21wb25lbnQ7XG52YXIgRnVuY3Rpb25hbENvbXBvbmVudCA9IFJlYWN0VHlwZU9mV29yay5GdW5jdGlvbmFsQ29tcG9uZW50O1xudmFyIENsYXNzQ29tcG9uZW50ID0gUmVhY3RUeXBlT2ZXb3JrLkNsYXNzQ29tcG9uZW50O1xudmFyIEhvc3RDb21wb25lbnQgPSBSZWFjdFR5cGVPZldvcmsuSG9zdENvbXBvbmVudDtcblxuXG5cbmZ1bmN0aW9uIGRlc2NyaWJlQ29tcG9uZW50RnJhbWUkMShuYW1lLCBzb3VyY2UsIG93bmVyTmFtZSkge1xuICByZXR1cm4gJ1xcbiAgICBpbiAnICsgKG5hbWUgfHwgJ1Vua25vd24nKSArIChzb3VyY2UgPyAnIChhdCAnICsgc291cmNlLmZpbGVOYW1lLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKSArICc6JyArIHNvdXJjZS5saW5lTnVtYmVyICsgJyknIDogb3duZXJOYW1lID8gJyAoY3JlYXRlZCBieSAnICsgb3duZXJOYW1lICsgJyknIDogJycpO1xufVxuXG5mdW5jdGlvbiBkZXNjcmliZUZpYmVyKGZpYmVyKSB7XG4gIHN3aXRjaCAoZmliZXIudGFnKSB7XG4gICAgY2FzZSBJbmRldGVybWluYXRlQ29tcG9uZW50OlxuICAgIGNhc2UgRnVuY3Rpb25hbENvbXBvbmVudDpcbiAgICBjYXNlIENsYXNzQ29tcG9uZW50OlxuICAgIGNhc2UgSG9zdENvbXBvbmVudDpcbiAgICAgIHZhciBvd25lciA9IGZpYmVyLl9kZWJ1Z093bmVyO1xuICAgICAgdmFyIHNvdXJjZSA9IGZpYmVyLl9kZWJ1Z1NvdXJjZTtcbiAgICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZV8xKGZpYmVyKTtcbiAgICAgIHZhciBvd25lck5hbWUgPSBudWxsO1xuICAgICAgaWYgKG93bmVyKSB7XG4gICAgICAgIG93bmVyTmFtZSA9IGdldENvbXBvbmVudE5hbWVfMShvd25lcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVzY3JpYmVDb21wb25lbnRGcmFtZSQxKG5hbWUsIHNvdXJjZSwgb3duZXJOYW1lKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gY2FuIG9ubHkgYmUgY2FsbGVkIHdpdGggYSB3b3JrLWluLXByb2dyZXNzIGZpYmVyIGFuZFxuLy8gb25seSBkdXJpbmcgYmVnaW4gb3IgY29tcGxldGUgcGhhc2UuIERvIG5vdCBjYWxsIGl0IHVuZGVyIGFueSBvdGhlclxuLy8gY2lyY3Vtc3RhbmNlcy5cbmZ1bmN0aW9uIGdldFN0YWNrQWRkZW5kdW1CeVdvcmtJblByb2dyZXNzRmliZXIkMSh3b3JrSW5Qcm9ncmVzcykge1xuICB2YXIgaW5mbyA9ICcnO1xuICB2YXIgbm9kZSA9IHdvcmtJblByb2dyZXNzO1xuICBkbyB7XG4gICAgaW5mbyArPSBkZXNjcmliZUZpYmVyKG5vZGUpO1xuICAgIC8vIE90aGVyd2lzZSB0aGlzIHJldHVybiBwb2ludGVyIG1pZ2h0IHBvaW50IHRvIHRoZSB3cm9uZyB0cmVlOlxuICAgIG5vZGUgPSBub2RlWydyZXR1cm4nXTtcbiAgfSB3aGlsZSAobm9kZSk7XG4gIHJldHVybiBpbmZvO1xufVxuXG52YXIgUmVhY3RGaWJlckNvbXBvbmVudFRyZWVIb29rID0ge1xuICBnZXRTdGFja0FkZGVuZHVtQnlXb3JrSW5Qcm9ncmVzc0ZpYmVyOiBnZXRTdGFja0FkZGVuZHVtQnlXb3JrSW5Qcm9ncmVzc0ZpYmVyJDEsXG4gIGRlc2NyaWJlQ29tcG9uZW50RnJhbWU6IGRlc2NyaWJlQ29tcG9uZW50RnJhbWUkMVxufTtcblxudmFyIGdldFN0YWNrQWRkZW5kdW1CeVdvcmtJblByb2dyZXNzRmliZXIgPSBSZWFjdEZpYmVyQ29tcG9uZW50VHJlZUhvb2suZ2V0U3RhY2tBZGRlbmR1bUJ5V29ya0luUHJvZ3Jlc3NGaWJlcjtcbnZhciBkZXNjcmliZUNvbXBvbmVudEZyYW1lID0gUmVhY3RGaWJlckNvbXBvbmVudFRyZWVIb29rLmRlc2NyaWJlQ29tcG9uZW50RnJhbWU7XG5cblxuXG5cblxuZnVuY3Rpb24gaXNOYXRpdmUoZm4pIHtcbiAgLy8gQmFzZWQgb24gaXNOYXRpdmUoKSBmcm9tIExvZGFzaFxuICB2YXIgZnVuY1RvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgKyBmdW5jVG9TdHJpbmdcbiAgLy8gVGFrZSBhbiBleGFtcGxlIG5hdGl2ZSBmdW5jdGlvbiBzb3VyY2UgZm9yIGNvbXBhcmlzb25cbiAgLmNhbGwoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSlcbiAgLy8gU3RyaXAgcmVnZXggY2hhcmFjdGVycyBzbyB3ZSBjYW4gdXNlIGl0IGZvciByZWdleFxuICAucmVwbGFjZSgvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2csICdcXFxcJCYnKVxuICAvLyBSZW1vdmUgaGFzT3duUHJvcGVydHkgZnJvbSB0aGUgdGVtcGxhdGUgdG8gbWFrZSBpdCBnZW5lcmljXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJyk7XG4gIHRyeSB7XG4gICAgdmFyIHNvdXJjZSA9IGZ1bmNUb1N0cmluZy5jYWxsKGZuKTtcbiAgICByZXR1cm4gcmVJc05hdGl2ZS50ZXN0KHNvdXJjZSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG52YXIgY2FuVXNlQ29sbGVjdGlvbnMgPVxuLy8gQXJyYXkuZnJvbVxudHlwZW9mIEFycmF5LmZyb20gPT09ICdmdW5jdGlvbicgJiZcbi8vIE1hcFxudHlwZW9mIE1hcCA9PT0gJ2Z1bmN0aW9uJyAmJiBpc05hdGl2ZShNYXApICYmXG4vLyBNYXAucHJvdG90eXBlLmtleXNcbk1hcC5wcm90b3R5cGUgIT0gbnVsbCAmJiB0eXBlb2YgTWFwLnByb3RvdHlwZS5rZXlzID09PSAnZnVuY3Rpb24nICYmIGlzTmF0aXZlKE1hcC5wcm90b3R5cGUua2V5cykgJiZcbi8vIFNldFxudHlwZW9mIFNldCA9PT0gJ2Z1bmN0aW9uJyAmJiBpc05hdGl2ZShTZXQpICYmXG4vLyBTZXQucHJvdG90eXBlLmtleXNcblNldC5wcm90b3R5cGUgIT0gbnVsbCAmJiB0eXBlb2YgU2V0LnByb3RvdHlwZS5rZXlzID09PSAnZnVuY3Rpb24nICYmIGlzTmF0aXZlKFNldC5wcm90b3R5cGUua2V5cyk7XG5cbnZhciBzZXRJdGVtO1xudmFyIGdldEl0ZW07XG52YXIgcmVtb3ZlSXRlbTtcbnZhciBnZXRJdGVtSURzO1xudmFyIGFkZFJvb3Q7XG52YXIgcmVtb3ZlUm9vdDtcbnZhciBnZXRSb290SURzO1xuXG5pZiAoY2FuVXNlQ29sbGVjdGlvbnMpIHtcbiAgdmFyIGl0ZW1NYXAgPSBuZXcgTWFwKCk7XG4gIHZhciByb290SURTZXQgPSBuZXcgU2V0KCk7XG5cbiAgc2V0SXRlbSA9IGZ1bmN0aW9uIChpZCwgaXRlbSkge1xuICAgIGl0ZW1NYXAuc2V0KGlkLCBpdGVtKTtcbiAgfTtcbiAgZ2V0SXRlbSA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHJldHVybiBpdGVtTWFwLmdldChpZCk7XG4gIH07XG4gIHJlbW92ZUl0ZW0gPSBmdW5jdGlvbiAoaWQpIHtcbiAgICBpdGVtTWFwWydkZWxldGUnXShpZCk7XG4gIH07XG4gIGdldEl0ZW1JRHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oaXRlbU1hcC5rZXlzKCkpO1xuICB9O1xuXG4gIGFkZFJvb3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICByb290SURTZXQuYWRkKGlkKTtcbiAgfTtcbiAgcmVtb3ZlUm9vdCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHJvb3RJRFNldFsnZGVsZXRlJ10oaWQpO1xuICB9O1xuICBnZXRSb290SURzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHJvb3RJRFNldC5rZXlzKCkpO1xuICB9O1xufSBlbHNlIHtcbiAgdmFyIGl0ZW1CeUtleSA9IHt9O1xuICB2YXIgcm9vdEJ5S2V5ID0ge307XG5cbiAgLy8gVXNlIG5vbi1udW1lcmljIGtleXMgdG8gcHJldmVudCBWOCBwZXJmb3JtYW5jZSBpc3N1ZXM6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9wdWxsLzcyMzJcbiAgdmFyIGdldEtleUZyb21JRCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHJldHVybiAnLicgKyBpZDtcbiAgfTtcbiAgdmFyIGdldElERnJvbUtleSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoa2V5LnN1YnN0cigxKSwgMTApO1xuICB9O1xuXG4gIHNldEl0ZW0gPSBmdW5jdGlvbiAoaWQsIGl0ZW0pIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICBpdGVtQnlLZXlba2V5XSA9IGl0ZW07XG4gIH07XG4gIGdldEl0ZW0gPSBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICByZXR1cm4gaXRlbUJ5S2V5W2tleV07XG4gIH07XG4gIHJlbW92ZUl0ZW0gPSBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICBkZWxldGUgaXRlbUJ5S2V5W2tleV07XG4gIH07XG4gIGdldEl0ZW1JRHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGl0ZW1CeUtleSkubWFwKGdldElERnJvbUtleSk7XG4gIH07XG5cbiAgYWRkUm9vdCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBrZXkgPSBnZXRLZXlGcm9tSUQoaWQpO1xuICAgIHJvb3RCeUtleVtrZXldID0gdHJ1ZTtcbiAgfTtcbiAgcmVtb3ZlUm9vdCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBrZXkgPSBnZXRLZXlGcm9tSUQoaWQpO1xuICAgIGRlbGV0ZSByb290QnlLZXlba2V5XTtcbiAgfTtcbiAgZ2V0Um9vdElEcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocm9vdEJ5S2V5KS5tYXAoZ2V0SURGcm9tS2V5KTtcbiAgfTtcbn1cblxudmFyIHVubW91bnRlZElEcyA9IFtdO1xuXG5mdW5jdGlvbiBwdXJnZURlZXAoaWQpIHtcbiAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgaWYgKGl0ZW0pIHtcbiAgICB2YXIgY2hpbGRJRHMgPSBpdGVtLmNoaWxkSURzO1xuXG4gICAgcmVtb3ZlSXRlbShpZCk7XG4gICAgY2hpbGRJRHMuZm9yRWFjaChwdXJnZURlZXApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXlOYW1lKGVsZW1lbnQpIHtcbiAgaWYgKGVsZW1lbnQgPT0gbnVsbCkge1xuICAgIHJldHVybiAnI2VtcHR5JztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsZW1lbnQgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuICcjdGV4dCc7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZWxlbWVudC50eXBlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbGVtZW50LnR5cGUuZGlzcGxheU5hbWUgfHwgZWxlbWVudC50eXBlLm5hbWUgfHwgJ1Vua25vd24nO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlc2NyaWJlSUQoaWQpIHtcbiAgdmFyIG5hbWUgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldERpc3BsYXlOYW1lKGlkKTtcbiAgdmFyIGVsZW1lbnQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEVsZW1lbnQoaWQpO1xuICB2YXIgb3duZXJJRCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0T3duZXJJRChpZCk7XG4gIHZhciBvd25lck5hbWUgPSB2b2lkIDA7XG5cbiAgaWYgKG93bmVySUQpIHtcbiAgICBvd25lck5hbWUgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldERpc3BsYXlOYW1lKG93bmVySUQpO1xuICB9XG4gIHdhcm5pbmcoZWxlbWVudCwgJ1JlYWN0Q29tcG9uZW50VHJlZUhvb2s6IE1pc3NpbmcgUmVhY3QgZWxlbWVudCBmb3IgZGVidWdJRCAlcyB3aGVuICcgKyAnYnVpbGRpbmcgc3RhY2snLCBpZCk7XG4gIHJldHVybiBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUgfHwgJycsIGVsZW1lbnQgJiYgZWxlbWVudC5fc291cmNlLCBvd25lck5hbWUgfHwgJycpO1xufVxuXG52YXIgUmVhY3RDb21wb25lbnRUcmVlSG9vayA9IHtcbiAgb25TZXRDaGlsZHJlbjogZnVuY3Rpb24gKGlkLCBuZXh0Q2hpbGRJRHMpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIGludmFyaWFudChpdGVtLCAnSXRlbSBtdXN0IGhhdmUgYmVlbiBzZXQnKTtcbiAgICBpdGVtLmNoaWxkSURzID0gbmV4dENoaWxkSURzO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXh0Q2hpbGRJRHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBuZXh0Q2hpbGRJRCA9IG5leHRDaGlsZElEc1tpXTtcbiAgICAgIHZhciBuZXh0Q2hpbGQgPSBnZXRJdGVtKG5leHRDaGlsZElEKTtcbiAgICAgICFuZXh0Q2hpbGQgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBob29rIGV2ZW50cyB0byBmaXJlIGZvciB0aGUgY2hpbGQgYmVmb3JlIGl0cyBwYXJlbnQgaW5jbHVkZXMgaXQgaW4gb25TZXRDaGlsZHJlbigpLicpIDogdm9pZCAwO1xuICAgICAgIShuZXh0Q2hpbGQuY2hpbGRJRHMgIT0gbnVsbCB8fCB0eXBlb2YgbmV4dENoaWxkLmVsZW1lbnQgIT09ICdvYmplY3QnIHx8IG5leHRDaGlsZC5lbGVtZW50ID09IG51bGwpID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgb25TZXRDaGlsZHJlbigpIHRvIGZpcmUgZm9yIGEgY29udGFpbmVyIGNoaWxkIGJlZm9yZSBpdHMgcGFyZW50IGluY2x1ZGVzIGl0IGluIG9uU2V0Q2hpbGRyZW4oKS4nKSA6IHZvaWQgMDtcbiAgICAgICFuZXh0Q2hpbGQuaXNNb3VudGVkID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgb25Nb3VudENvbXBvbmVudCgpIHRvIGZpcmUgZm9yIHRoZSBjaGlsZCBiZWZvcmUgaXRzIHBhcmVudCBpbmNsdWRlcyBpdCBpbiBvblNldENoaWxkcmVuKCkuJykgOiB2b2lkIDA7XG4gICAgICBpZiAobmV4dENoaWxkLnBhcmVudElEID09IG51bGwpIHtcbiAgICAgICAgbmV4dENoaWxkLnBhcmVudElEID0gaWQ7XG4gICAgICAgIC8vIFRPRE86IFRoaXMgc2hvdWxkbid0IGJlIG5lY2Vzc2FyeSBidXQgbW91bnRpbmcgYSBuZXcgcm9vdCBkdXJpbmcgaW5cbiAgICAgICAgLy8gY29tcG9uZW50V2lsbE1vdW50IGN1cnJlbnRseSBjYXVzZXMgbm90LXlldC1tb3VudGVkIGNvbXBvbmVudHMgdG9cbiAgICAgICAgLy8gYmUgcHVyZ2VkIGZyb20gb3VyIHRyZWUgZGF0YSBzbyB0aGVpciBwYXJlbnQgaWQgaXMgbWlzc2luZy5cbiAgICAgIH1cbiAgICAgICEobmV4dENoaWxkLnBhcmVudElEID09PSBpZCkgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBvbkJlZm9yZU1vdW50Q29tcG9uZW50KCkgcGFyZW50IGFuZCBvblNldENoaWxkcmVuKCkgdG8gYmUgY29uc2lzdGVudCAoJXMgaGFzIHBhcmVudHMgJXMgYW5kICVzKS4nLCBuZXh0Q2hpbGRJRCwgbmV4dENoaWxkLnBhcmVudElELCBpZCkgOiB2b2lkIDA7XG4gICAgfVxuICB9LFxuICBvbkJlZm9yZU1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaWQsIGVsZW1lbnQsIHBhcmVudElEKSB7XG4gICAgdmFyIGl0ZW0gPSB7XG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgcGFyZW50SUQ6IHBhcmVudElELFxuICAgICAgdGV4dDogbnVsbCxcbiAgICAgIGNoaWxkSURzOiBbXSxcbiAgICAgIGlzTW91bnRlZDogZmFsc2UsXG4gICAgICB1cGRhdGVDb3VudDogMFxuICAgIH07XG4gICAgc2V0SXRlbShpZCwgaXRlbSk7XG4gIH0sXG4gIG9uQmVmb3JlVXBkYXRlQ29tcG9uZW50OiBmdW5jdGlvbiAoaWQsIGVsZW1lbnQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIGlmICghaXRlbSB8fCAhaXRlbS5pc01vdW50ZWQpIHtcbiAgICAgIC8vIFdlIG1heSBlbmQgdXAgaGVyZSBhcyBhIHJlc3VsdCBvZiBzZXRTdGF0ZSgpIGluIGNvbXBvbmVudFdpbGxVbm1vdW50KCkuXG4gICAgICAvLyBJbiB0aGlzIGNhc2UsIGlnbm9yZSB0aGUgZWxlbWVudC5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaXRlbS5lbGVtZW50ID0gZWxlbWVudDtcbiAgfSxcbiAgb25Nb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICBpbnZhcmlhbnQoaXRlbSwgJ0l0ZW0gbXVzdCBoYXZlIGJlZW4gc2V0Jyk7XG4gICAgaXRlbS5pc01vdW50ZWQgPSB0cnVlO1xuICAgIHZhciBpc1Jvb3QgPSBpdGVtLnBhcmVudElEID09PSAwO1xuICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgIGFkZFJvb3QoaWQpO1xuICAgIH1cbiAgfSxcbiAgb25VcGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgaWYgKCFpdGVtIHx8ICFpdGVtLmlzTW91bnRlZCkge1xuICAgICAgLy8gV2UgbWF5IGVuZCB1cCBoZXJlIGFzIGEgcmVzdWx0IG9mIHNldFN0YXRlKCkgaW4gY29tcG9uZW50V2lsbFVubW91bnQoKS5cbiAgICAgIC8vIEluIHRoaXMgY2FzZSwgaWdub3JlIHRoZSBlbGVtZW50LlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpdGVtLnVwZGF0ZUNvdW50Kys7XG4gIH0sXG4gIG9uVW5tb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBpZiBpdCBleGlzdHMuXG4gICAgICAvLyBgaXRlbWAgbWlnaHQgbm90IGV4aXN0IGlmIGl0IGlzIGluc2lkZSBhbiBlcnJvciBib3VuZGFyeSwgYW5kIGEgc2libGluZ1xuICAgICAgLy8gZXJyb3IgYm91bmRhcnkgY2hpbGQgdGhyZXcgd2hpbGUgbW91bnRpbmcuIFRoZW4gdGhpcyBpbnN0YW5jZSBuZXZlclxuICAgICAgLy8gZ290IGEgY2hhbmNlIHRvIG1vdW50LCBidXQgaXQgc3RpbGwgZ2V0cyBhbiB1bm1vdW50aW5nIGV2ZW50IGR1cmluZ1xuICAgICAgLy8gdGhlIGVycm9yIGJvdW5kYXJ5IGNsZWFudXAuXG4gICAgICBpdGVtLmlzTW91bnRlZCA9IGZhbHNlO1xuICAgICAgdmFyIGlzUm9vdCA9IGl0ZW0ucGFyZW50SUQgPT09IDA7XG4gICAgICBpZiAoaXNSb290KSB7XG4gICAgICAgIHJlbW92ZVJvb3QoaWQpO1xuICAgICAgfVxuICAgIH1cbiAgICB1bm1vdW50ZWRJRHMucHVzaChpZCk7XG4gIH0sXG4gIHB1cmdlVW5tb3VudGVkQ29tcG9uZW50czogZnVuY3Rpb24gKCkge1xuICAgIGlmIChSZWFjdENvbXBvbmVudFRyZWVIb29rLl9wcmV2ZW50UHVyZ2luZykge1xuICAgICAgLy8gU2hvdWxkIG9ubHkgYmUgdXNlZCBmb3IgdGVzdGluZy5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVubW91bnRlZElEcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkID0gdW5tb3VudGVkSURzW2ldO1xuICAgICAgcHVyZ2VEZWVwKGlkKTtcbiAgICB9XG4gICAgdW5tb3VudGVkSURzLmxlbmd0aCA9IDA7XG4gIH0sXG4gIGlzTW91bnRlZDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0uaXNNb3VudGVkIDogZmFsc2U7XG4gIH0sXG4gIGdldEN1cnJlbnRTdGFja0FkZGVuZHVtOiBmdW5jdGlvbiAodG9wRWxlbWVudCkge1xuICAgIHZhciBpbmZvID0gJyc7XG4gICAgaWYgKHRvcEVsZW1lbnQpIHtcbiAgICAgIHZhciBuYW1lID0gZ2V0RGlzcGxheU5hbWUodG9wRWxlbWVudCk7XG4gICAgICB2YXIgb3duZXIgPSB0b3BFbGVtZW50Ll9vd25lcjtcbiAgICAgIGluZm8gKz0gZGVzY3JpYmVDb21wb25lbnRGcmFtZShuYW1lLCB0b3BFbGVtZW50Ll9zb3VyY2UsIG93bmVyICYmIGdldENvbXBvbmVudE5hbWVfMShvd25lcikpO1xuICAgIH1cblxuICAgIHZhciBjdXJyZW50T3duZXIgPSBSZWFjdEN1cnJlbnRPd25lcl8xLmN1cnJlbnQ7XG4gICAgaWYgKGN1cnJlbnRPd25lcikge1xuICAgICAgaWYgKHR5cGVvZiBjdXJyZW50T3duZXIudGFnID09PSAnbnVtYmVyJykge1xuICAgICAgICB2YXIgd29ya0luUHJvZ3Jlc3MgPSBjdXJyZW50T3duZXI7XG4gICAgICAgIC8vIFNhZmUgYmVjYXVzZSBpZiBjdXJyZW50IG93bmVyIGV4aXN0cywgd2UgYXJlIHJlY29uY2lsaW5nLFxuICAgICAgICAvLyBhbmQgaXQgaXMgZ3VhcmFudGVlZCB0byBiZSB0aGUgd29yay1pbi1wcm9ncmVzcyB2ZXJzaW9uLlxuICAgICAgICBpbmZvICs9IGdldFN0YWNrQWRkZW5kdW1CeVdvcmtJblByb2dyZXNzRmliZXIod29ya0luUHJvZ3Jlc3MpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY3VycmVudE93bmVyLl9kZWJ1Z0lEID09PSAnbnVtYmVyJykge1xuICAgICAgICBpbmZvICs9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0U3RhY2tBZGRlbmR1bUJ5SUQoY3VycmVudE93bmVyLl9kZWJ1Z0lEKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGluZm87XG4gIH0sXG4gIGdldFN0YWNrQWRkZW5kdW1CeUlEOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaW5mbyA9ICcnO1xuICAgIHdoaWxlIChpZCkge1xuICAgICAgaW5mbyArPSBkZXNjcmliZUlEKGlkKTtcbiAgICAgIGlkID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRQYXJlbnRJRChpZCk7XG4gICAgfVxuICAgIHJldHVybiBpbmZvO1xuICB9LFxuICBnZXRDaGlsZElEczogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0uY2hpbGRJRHMgOiBbXTtcbiAgfSxcbiAgZ2V0RGlzcGxheU5hbWU6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBlbGVtZW50ID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRFbGVtZW50KGlkKTtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0RGlzcGxheU5hbWUoZWxlbWVudCk7XG4gIH0sXG4gIGdldEVsZW1lbnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLmVsZW1lbnQgOiBudWxsO1xuICB9LFxuICBnZXRPd25lcklEOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgZWxlbWVudCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RWxlbWVudChpZCk7XG4gICAgaWYgKCFlbGVtZW50IHx8ICFlbGVtZW50Ll9vd25lcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50Ll9vd25lci5fZGVidWdJRDtcbiAgfSxcbiAgZ2V0UGFyZW50SUQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLnBhcmVudElEIDogbnVsbDtcbiAgfSxcbiAgZ2V0U291cmNlOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIHZhciBlbGVtZW50ID0gaXRlbSA/IGl0ZW0uZWxlbWVudCA6IG51bGw7XG4gICAgdmFyIHNvdXJjZSA9IGVsZW1lbnQgIT0gbnVsbCA/IGVsZW1lbnQuX3NvdXJjZSA6IG51bGw7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfSxcbiAgZ2V0VGV4dDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEVsZW1lbnQoaWQpO1xuICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gJycgKyBlbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0sXG4gIGdldFVwZGF0ZUNvdW50OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS51cGRhdGVDb3VudCA6IDA7XG4gIH0sXG5cblxuICBnZXRSb290SURzOiBnZXRSb290SURzLFxuICBnZXRSZWdpc3RlcmVkSURzOiBnZXRJdGVtSURzXG59O1xuXG52YXIgUmVhY3RDb21wb25lbnRUcmVlSG9va18xID0gUmVhY3RDb21wb25lbnRUcmVlSG9vaztcblxue1xuICB2YXIgX3JlcXVpcmUgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rXzEsXG4gICAgICBnZXRDdXJyZW50U3RhY2tBZGRlbmR1bSA9IF9yZXF1aXJlLmdldEN1cnJlbnRTdGFja0FkZGVuZHVtO1xufVxuXG52YXIgU0VQQVJBVE9SID0gJy4nO1xudmFyIFNVQlNFUEFSQVRPUiA9ICc6JztcblxuLyoqXG4gKiBUaGlzIGlzIGlubGluZWQgZnJvbSBSZWFjdEVsZW1lbnQgc2luY2UgdGhpcyBmaWxlIGlzIHNoYXJlZCBiZXR3ZWVuXG4gKiBpc29tb3JwaGljIGFuZCByZW5kZXJlcnMuIFdlIGNvdWxkIGV4dHJhY3QgdGhpcyB0byBhXG4gKlxuICovXG5cbi8qKlxuICogVE9ETzogVGVzdCB0aGF0IGEgc2luZ2xlIGNoaWxkIGFuZCBhbiBhcnJheSB3aXRoIG9uZSBpdGVtIGhhdmUgdGhlIHNhbWUga2V5XG4gKiBwYXR0ZXJuLlxuICovXG5cbnZhciBkaWRXYXJuQWJvdXRNYXBzID0gZmFsc2U7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBrZXkgc3RyaW5nIHRoYXQgaWRlbnRpZmllcyBhIGNvbXBvbmVudCB3aXRoaW4gYSBzZXQuXG4gKlxuICogQHBhcmFtIHsqfSBjb21wb25lbnQgQSBjb21wb25lbnQgdGhhdCBjb3VsZCBjb250YWluIGEgbWFudWFsIGtleS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBJbmRleCB0aGF0IGlzIHVzZWQgaWYgYSBtYW51YWwga2V5IGlzIG5vdCBwcm92aWRlZC5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50S2V5KGNvbXBvbmVudCwgaW5kZXgpIHtcbiAgLy8gRG8gc29tZSB0eXBlY2hlY2tpbmcgaGVyZSBzaW5jZSB3ZSBjYWxsIHRoaXMgYmxpbmRseS4gV2Ugd2FudCB0byBlbnN1cmVcbiAgLy8gdGhhdCB3ZSBkb24ndCBibG9jayBwb3RlbnRpYWwgZnV0dXJlIEVTIEFQSXMuXG4gIGlmICh0eXBlb2YgY29tcG9uZW50ID09PSAnb2JqZWN0JyAmJiBjb21wb25lbnQgIT09IG51bGwgJiYgY29tcG9uZW50LmtleSAhPSBudWxsKSB7XG4gICAgLy8gRXhwbGljaXQga2V5XG4gICAgcmV0dXJuIEtleUVzY2FwZVV0aWxzXzEuZXNjYXBlKGNvbXBvbmVudC5rZXkpO1xuICB9XG4gIC8vIEltcGxpY2l0IGtleSBkZXRlcm1pbmVkIGJ5IHRoZSBpbmRleCBpbiB0aGUgc2V0XG4gIHJldHVybiBpbmRleC50b1N0cmluZygzNik7XG59XG5cbi8qKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0geyFzdHJpbmd9IG5hbWVTb0ZhciBOYW1lIG9mIHRoZSBrZXkgcGF0aCBzbyBmYXIuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gaW52b2tlIHdpdGggZWFjaCBjaGlsZCBmb3VuZC5cbiAqIEBwYXJhbSB7Pyp9IHRyYXZlcnNlQ29udGV4dCBVc2VkIHRvIHBhc3MgaW5mb3JtYXRpb24gdGhyb3VnaG91dCB0aGUgdHJhdmVyc2FsXG4gKiBwcm9jZXNzLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkcmVuLCBuYW1lU29GYXIsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgY2hpbGRyZW47XG5cbiAgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xuICAgIC8vIEFsbCBvZiB0aGUgYWJvdmUgYXJlIHBlcmNlaXZlZCBhcyBudWxsLlxuICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgfVxuXG4gIGlmIChjaGlsZHJlbiA9PT0gbnVsbCB8fCB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlID09PSAnbnVtYmVyJyB8fFxuICAvLyBUaGUgZm9sbG93aW5nIGlzIGlubGluZWQgZnJvbSBSZWFjdEVsZW1lbnQuIFRoaXMgbWVhbnMgd2UgY2FuIG9wdGltaXplXG4gIC8vIHNvbWUgY2hlY2tzLiBSZWFjdCBGaWJlciBhbHNvIGlubGluZXMgdGhpcyBsb2dpYyBmb3Igc2ltaWxhciBwdXJwb3Nlcy5cbiAgdHlwZSA9PT0gJ29iamVjdCcgJiYgY2hpbGRyZW4uJCR0eXBlb2YgPT09IFJlYWN0RWxlbWVudFN5bWJvbCkge1xuICAgIGNhbGxiYWNrKHRyYXZlcnNlQ29udGV4dCwgY2hpbGRyZW4sXG4gICAgLy8gSWYgaXQncyB0aGUgb25seSBjaGlsZCwgdHJlYXQgdGhlIG5hbWUgYXMgaWYgaXQgd2FzIHdyYXBwZWQgaW4gYW4gYXJyYXlcbiAgICAvLyBzbyB0aGF0IGl0J3MgY29uc2lzdGVudCBpZiB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIGdyb3dzLlxuICAgIG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgKyBnZXRDb21wb25lbnRLZXkoY2hpbGRyZW4sIDApIDogbmFtZVNvRmFyKTtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIHZhciBjaGlsZDtcbiAgdmFyIG5leHROYW1lO1xuICB2YXIgc3VidHJlZUNvdW50ID0gMDsgLy8gQ291bnQgb2YgY2hpbGRyZW4gZm91bmQgaW4gdGhlIGN1cnJlbnQgc3VidHJlZS5cbiAgdmFyIG5leHROYW1lUHJlZml4ID0gbmFtZVNvRmFyID09PSAnJyA/IFNFUEFSQVRPUiA6IG5hbWVTb0ZhciArIFNVQlNFUEFSQVRPUjtcblxuICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIGdldENvbXBvbmVudEtleShjaGlsZCwgaSk7XG4gICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuXzEoY2hpbGRyZW4pO1xuICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICB7XG4gICAgICAgIC8vIFdhcm4gYWJvdXQgdXNpbmcgTWFwcyBhcyBjaGlsZHJlblxuICAgICAgICBpZiAoaXRlcmF0b3JGbiA9PT0gY2hpbGRyZW4uZW50cmllcykge1xuICAgICAgICAgIHdhcm5pbmcoZGlkV2FybkFib3V0TWFwcywgJ1VzaW5nIE1hcHMgYXMgY2hpbGRyZW4gaXMgdW5zdXBwb3J0ZWQgYW5kIHdpbGwgbGlrZWx5IHlpZWxkICcgKyAndW5leHBlY3RlZCByZXN1bHRzLiBDb252ZXJ0IGl0IHRvIGEgc2VxdWVuY2UvaXRlcmFibGUgb2Yga2V5ZWQgJyArICdSZWFjdEVsZW1lbnRzIGluc3RlYWQuJXMnLCBnZXRDdXJyZW50U3RhY2tBZGRlbmR1bSgpKTtcbiAgICAgICAgICBkaWRXYXJuQWJvdXRNYXBzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwoY2hpbGRyZW4pO1xuICAgICAgdmFyIHN0ZXA7XG4gICAgICB2YXIgaWkgPSAwO1xuICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICBjaGlsZCA9IHN0ZXAudmFsdWU7XG4gICAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGlpKyspO1xuICAgICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgYWRkZW5kdW0gPSAnJztcbiAgICAgIHtcbiAgICAgICAgYWRkZW5kdW0gPSAnIElmIHlvdSBtZWFudCB0byByZW5kZXIgYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuLCB1c2UgYW4gYXJyYXkgJyArICdpbnN0ZWFkLicgKyBnZXRDdXJyZW50U3RhY2tBZGRlbmR1bSgpO1xuICAgICAgfVxuICAgICAgdmFyIGNoaWxkcmVuU3RyaW5nID0gJycgKyBjaGlsZHJlbjtcbiAgICAgIGludmFyaWFudChmYWxzZSwgJ09iamVjdHMgYXJlIG5vdCB2YWxpZCBhcyBhIFJlYWN0IGNoaWxkIChmb3VuZDogJXMpLiVzJywgY2hpbGRyZW5TdHJpbmcgPT09ICdbb2JqZWN0IE9iamVjdF0nID8gJ29iamVjdCB3aXRoIGtleXMgeycgKyBPYmplY3Qua2V5cyhjaGlsZHJlbikuam9pbignLCAnKSArICd9JyA6IGNoaWxkcmVuU3RyaW5nLCBhZGRlbmR1bSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN1YnRyZWVDb3VudDtcbn1cblxuLyoqXG4gKiBUcmF2ZXJzZXMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLCBidXRcbiAqIG1pZ2h0IGFsc28gYmUgc3BlY2lmaWVkIHRocm91Z2ggYXR0cmlidXRlczpcbiAqXG4gKiAtIGB0cmF2ZXJzZUFsbENoaWxkcmVuKHRoaXMucHJvcHMuY2hpbGRyZW4sIC4uLilgXG4gKiAtIGB0cmF2ZXJzZUFsbENoaWxkcmVuKHRoaXMucHJvcHMubGVmdFBhbmVsQ2hpbGRyZW4sIC4uLilgXG4gKlxuICogVGhlIGB0cmF2ZXJzZUNvbnRleHRgIGlzIGFuIG9wdGlvbmFsIGFyZ3VtZW50IHRoYXQgaXMgcGFzc2VkIHRocm91Z2ggdGhlXG4gKiBlbnRpcmUgdHJhdmVyc2FsLiBJdCBjYW4gYmUgdXNlZCB0byBzdG9yZSBhY2N1bXVsYXRpb25zIG9yIGFueXRoaW5nIGVsc2UgdGhhdFxuICogdGhlIGNhbGxiYWNrIG1pZ2h0IGZpbmQgcmVsZXZhbnQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBvYmplY3QuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gY2FsbGJhY2sgVG8gaW52b2tlIHVwb24gdHJhdmVyc2luZyBlYWNoIGNoaWxkLlxuICogQHBhcmFtIHs/Kn0gdHJhdmVyc2VDb250ZXh0IENvbnRleHQgZm9yIHRyYXZlcnNhbC5cbiAqIEByZXR1cm4geyFudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhpcyBzdWJ0cmVlLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGRyZW4sICcnLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbn1cblxudmFyIHRyYXZlcnNlQWxsQ2hpbGRyZW5fMSA9IHRyYXZlcnNlQWxsQ2hpbGRyZW47XG5cbnZhciB0d29Bcmd1bWVudFBvb2xlciA9IFBvb2xlZENsYXNzXzEudHdvQXJndW1lbnRQb29sZXI7XG52YXIgZm91ckFyZ3VtZW50UG9vbGVyID0gUG9vbGVkQ2xhc3NfMS5mb3VyQXJndW1lbnRQb29sZXI7XG5cbnZhciB1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCA9IC9cXC8rL2c7XG5mdW5jdGlvbiBlc2NhcGVVc2VyUHJvdmlkZWRLZXkodGV4dCkge1xuICByZXR1cm4gKCcnICsgdGV4dCkucmVwbGFjZSh1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCwgJyQmLycpO1xufVxuXG4vKipcbiAqIFBvb2xlZENsYXNzIHJlcHJlc2VudGluZyB0aGUgYm9va2tlZXBpbmcgYXNzb2NpYXRlZCB3aXRoIHBlcmZvcm1pbmcgYSBjaGlsZFxuICogdHJhdmVyc2FsLiBBbGxvd3MgYXZvaWRpbmcgYmluZGluZyBjYWxsYmFja3MuXG4gKlxuICogQGNvbnN0cnVjdG9yIEZvckVhY2hCb29rS2VlcGluZ1xuICogQHBhcmFtIHshZnVuY3Rpb259IGZvckVhY2hGdW5jdGlvbiBGdW5jdGlvbiB0byBwZXJmb3JtIHRyYXZlcnNhbCB3aXRoLlxuICogQHBhcmFtIHs/Kn0gZm9yRWFjaENvbnRleHQgQ29udGV4dCB0byBwZXJmb3JtIGNvbnRleHQgd2l0aC5cbiAqL1xuZnVuY3Rpb24gRm9yRWFjaEJvb2tLZWVwaW5nKGZvckVhY2hGdW5jdGlvbiwgZm9yRWFjaENvbnRleHQpIHtcbiAgdGhpcy5mdW5jID0gZm9yRWFjaEZ1bmN0aW9uO1xuICB0aGlzLmNvbnRleHQgPSBmb3JFYWNoQ29udGV4dDtcbiAgdGhpcy5jb3VudCA9IDA7XG59XG5Gb3JFYWNoQm9va0tlZXBpbmcucHJvdG90eXBlLmRlc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnVuYyA9IG51bGw7XG4gIHRoaXMuY29udGV4dCA9IG51bGw7XG4gIHRoaXMuY291bnQgPSAwO1xufTtcblBvb2xlZENsYXNzXzEuYWRkUG9vbGluZ1RvKEZvckVhY2hCb29rS2VlcGluZywgdHdvQXJndW1lbnRQb29sZXIpO1xuXG5mdW5jdGlvbiBmb3JFYWNoU2luZ2xlQ2hpbGQoYm9va0tlZXBpbmcsIGNoaWxkLCBuYW1lKSB7XG4gIHZhciBmdW5jID0gYm9va0tlZXBpbmcuZnVuYyxcbiAgICAgIGNvbnRleHQgPSBib29rS2VlcGluZy5jb250ZXh0O1xuXG4gIGZ1bmMuY2FsbChjb250ZXh0LCBjaGlsZCwgYm9va0tlZXBpbmcuY291bnQrKyk7XG59XG5cbi8qKlxuICogSXRlcmF0ZXMgdGhyb3VnaCBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4uZm9yZWFjaFxuICpcbiAqIFRoZSBwcm92aWRlZCBmb3JFYWNoRnVuYyhjaGlsZCwgaW5kZXgpIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoXG4gKiBsZWFmIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBpbnQpfSBmb3JFYWNoRnVuY1xuICogQHBhcmFtIHsqfSBmb3JFYWNoQ29udGV4dCBDb250ZXh0IGZvciBmb3JFYWNoQ29udGV4dC5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IEZvckVhY2hCb29rS2VlcGluZy5nZXRQb29sZWQoZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbl8xKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIEZvckVhY2hCb29rS2VlcGluZy5yZWxlYXNlKHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbi8qKlxuICogUG9vbGVkQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBib29ra2VlcGluZyBhc3NvY2lhdGVkIHdpdGggcGVyZm9ybWluZyBhIGNoaWxkXG4gKiBtYXBwaW5nLiBBbGxvd3MgYXZvaWRpbmcgYmluZGluZyBjYWxsYmFja3MuXG4gKlxuICogQGNvbnN0cnVjdG9yIE1hcEJvb2tLZWVwaW5nXG4gKiBAcGFyYW0geyEqfSBtYXBSZXN1bHQgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gbWFwRnVuY3Rpb24gRnVuY3Rpb24gdG8gcGVyZm9ybSBtYXBwaW5nIHdpdGguXG4gKiBAcGFyYW0gez8qfSBtYXBDb250ZXh0IENvbnRleHQgdG8gcGVyZm9ybSBtYXBwaW5nIHdpdGguXG4gKi9cbmZ1bmN0aW9uIE1hcEJvb2tLZWVwaW5nKG1hcFJlc3VsdCwga2V5UHJlZml4LCBtYXBGdW5jdGlvbiwgbWFwQ29udGV4dCkge1xuICB0aGlzLnJlc3VsdCA9IG1hcFJlc3VsdDtcbiAgdGhpcy5rZXlQcmVmaXggPSBrZXlQcmVmaXg7XG4gIHRoaXMuZnVuYyA9IG1hcEZ1bmN0aW9uO1xuICB0aGlzLmNvbnRleHQgPSBtYXBDb250ZXh0O1xuICB0aGlzLmNvdW50ID0gMDtcbn1cbk1hcEJvb2tLZWVwaW5nLnByb3RvdHlwZS5kZXN0cnVjdG9yID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlc3VsdCA9IG51bGw7XG4gIHRoaXMua2V5UHJlZml4ID0gbnVsbDtcbiAgdGhpcy5mdW5jID0gbnVsbDtcbiAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgdGhpcy5jb3VudCA9IDA7XG59O1xuUG9vbGVkQ2xhc3NfMS5hZGRQb29saW5nVG8oTWFwQm9va0tlZXBpbmcsIGZvdXJBcmd1bWVudFBvb2xlcik7XG5cbmZ1bmN0aW9uIG1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQoYm9va0tlZXBpbmcsIGNoaWxkLCBjaGlsZEtleSkge1xuICB2YXIgcmVzdWx0ID0gYm9va0tlZXBpbmcucmVzdWx0LFxuICAgICAga2V5UHJlZml4ID0gYm9va0tlZXBpbmcua2V5UHJlZml4LFxuICAgICAgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmMsXG4gICAgICBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuXG4gIHZhciBtYXBwZWRDaGlsZCA9IGZ1bmMuY2FsbChjb250ZXh0LCBjaGlsZCwgYm9va0tlZXBpbmcuY291bnQrKyk7XG4gIGlmIChBcnJheS5pc0FycmF5KG1hcHBlZENoaWxkKSkge1xuICAgIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwobWFwcGVkQ2hpbGQsIHJlc3VsdCwgY2hpbGRLZXksIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCk7XG4gIH0gZWxzZSBpZiAobWFwcGVkQ2hpbGQgIT0gbnVsbCkge1xuICAgIGlmIChSZWFjdEVsZW1lbnRfMS5pc1ZhbGlkRWxlbWVudChtYXBwZWRDaGlsZCkpIHtcbiAgICAgIG1hcHBlZENoaWxkID0gUmVhY3RFbGVtZW50XzEuY2xvbmVBbmRSZXBsYWNlS2V5KG1hcHBlZENoaWxkLFxuICAgICAgLy8gS2VlcCBib3RoIHRoZSAobWFwcGVkKSBhbmQgb2xkIGtleXMgaWYgdGhleSBkaWZmZXIsIGp1c3QgYXNcbiAgICAgIC8vIHRyYXZlcnNlQWxsQ2hpbGRyZW4gdXNlZCB0byBkbyBmb3Igb2JqZWN0cyBhcyBjaGlsZHJlblxuICAgICAga2V5UHJlZml4ICsgKG1hcHBlZENoaWxkLmtleSAmJiAoIWNoaWxkIHx8IGNoaWxkLmtleSAhPT0gbWFwcGVkQ2hpbGQua2V5KSA/IGVzY2FwZVVzZXJQcm92aWRlZEtleShtYXBwZWRDaGlsZC5rZXkpICsgJy8nIDogJycpICsgY2hpbGRLZXkpO1xuICAgIH1cbiAgICByZXN1bHQucHVzaChtYXBwZWRDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgYXJyYXksIHByZWZpeCwgZnVuYywgY29udGV4dCkge1xuICB2YXIgZXNjYXBlZFByZWZpeCA9ICcnO1xuICBpZiAocHJlZml4ICE9IG51bGwpIHtcbiAgICBlc2NhcGVkUHJlZml4ID0gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHByZWZpeCkgKyAnLyc7XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IE1hcEJvb2tLZWVwaW5nLmdldFBvb2xlZChhcnJheSwgZXNjYXBlZFByZWZpeCwgZnVuYywgY29udGV4dCk7XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW5fMShjaGlsZHJlbiwgbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dCwgdHJhdmVyc2VDb250ZXh0KTtcbiAgTWFwQm9va0tlZXBpbmcucmVsZWFzZSh0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIE1hcHMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLm1hcFxuICpcbiAqIFRoZSBwcm92aWRlZCBtYXBGdW5jdGlvbihjaGlsZCwga2V5LCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZ1bmMgVGhlIG1hcCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBDb250ZXh0IGZvciBtYXBGdW5jdGlvbi5cbiAqIEByZXR1cm4ge29iamVjdH0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIG1hcENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jLCBjb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBmdW5jLCBjb250ZXh0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkRHVtbXkodHJhdmVyc2VDb250ZXh0LCBjaGlsZCwgbmFtZSkge1xuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBDb3VudCB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXNcbiAqIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4uY291bnRcbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbi5cbiAqL1xuZnVuY3Rpb24gY291bnRDaGlsZHJlbihjaGlsZHJlbiwgY29udGV4dCkge1xuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbl8xKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGREdW1teSwgbnVsbCk7XG59XG5cbi8qKlxuICogRmxhdHRlbiBhIGNoaWxkcmVuIG9iamVjdCAodHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gKSBhbmRcbiAqIHJldHVybiBhbiBhcnJheSB3aXRoIGFwcHJvcHJpYXRlbHkgcmUta2V5ZWQgY2hpbGRyZW4uXG4gKlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4udG9hcnJheVxuICovXG5mdW5jdGlvbiB0b0FycmF5KGNoaWxkcmVuKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG52YXIgUmVhY3RDaGlsZHJlbiA9IHtcbiAgZm9yRWFjaDogZm9yRWFjaENoaWxkcmVuLFxuICBtYXA6IG1hcENoaWxkcmVuLFxuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsOiBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsLFxuICBjb3VudDogY291bnRDaGlsZHJlbixcbiAgdG9BcnJheTogdG9BcnJheVxufTtcblxudmFyIFJlYWN0Q2hpbGRyZW5fMSA9IFJlYWN0Q2hpbGRyZW47XG5cbnZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDEgPSB7fTtcblxue1xuICB2YXIgX3JlcXVpcmUkMiA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2tfMSxcbiAgICAgIGdldFN0YWNrQWRkZW5kdW1CeUlEID0gX3JlcXVpcmUkMi5nZXRTdGFja0FkZGVuZHVtQnlJRCxcbiAgICAgIGdldEN1cnJlbnRTdGFja0FkZGVuZHVtJDIgPSBfcmVxdWlyZSQyLmdldEN1cnJlbnRTdGFja0FkZGVuZHVtO1xuXG4gIHZhciBfcmVxdWlyZTIkMSA9IFJlYWN0RmliZXJDb21wb25lbnRUcmVlSG9vayxcbiAgICAgIGdldFN0YWNrQWRkZW5kdW1CeVdvcmtJblByb2dyZXNzRmliZXIkMiA9IF9yZXF1aXJlMiQxLmdldFN0YWNrQWRkZW5kdW1CeVdvcmtJblByb2dyZXNzRmliZXI7XG5cbiAgLy8gQ29tcG9uZW50IHRoYXQgaXMgYmVpbmcgd29ya2VkIG9uXG5cblxuICBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDEuY3VycmVudCA9IG51bGw7XG5cbiAgLy8gRWxlbWVudCB0aGF0IGlzIGJlaW5nIGNsb25lZCBvciBjcmVhdGVkXG4gIFJlYWN0RGVidWdDdXJyZW50RnJhbWUkMS5lbGVtZW50ID0gbnVsbDtcblxuICBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDEuZ2V0U3RhY2tBZGRlbmR1bSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RhY2sgPSBudWxsO1xuICAgIHZhciBjdXJyZW50ID0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQxLmN1cnJlbnQ7XG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDEuZWxlbWVudDtcbiAgICBpZiAoY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgaWYgKHR5cGVvZiBjdXJyZW50ID09PSAnbnVtYmVyJykge1xuICAgICAgICAvLyBEZWJ1Z0lEIGZyb20gU3RhY2suXG4gICAgICAgIHZhciBkZWJ1Z0lEID0gY3VycmVudDtcbiAgICAgICAgc3RhY2sgPSBnZXRTdGFja0FkZGVuZHVtQnlJRChkZWJ1Z0lEKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGN1cnJlbnQudGFnID09PSAnbnVtYmVyJykge1xuICAgICAgICAvLyBUaGlzIGlzIGEgRmliZXIuXG4gICAgICAgIC8vIFRoZSBzdGFjayB3aWxsIG9ubHkgYmUgY29ycmVjdCBpZiB0aGlzIGlzIGEgd29yayBpbiBwcm9ncmVzc1xuICAgICAgICAvLyB2ZXJzaW9uIGFuZCB3ZSdyZSBjYWxsaW5nIGl0IGR1cmluZyByZWNvbmNpbGlhdGlvbi5cbiAgICAgICAgdmFyIHdvcmtJblByb2dyZXNzID0gY3VycmVudDtcbiAgICAgICAgc3RhY2sgPSBnZXRTdGFja0FkZGVuZHVtQnlXb3JrSW5Qcm9ncmVzc0ZpYmVyJDIod29ya0luUHJvZ3Jlc3MpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgc3RhY2sgPSBnZXRDdXJyZW50U3RhY2tBZGRlbmR1bSQyKGVsZW1lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gc3RhY2s7XG4gIH07XG59XG5cbnZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lXzEgPSBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDE7XG5cbntcbiAgdmFyIGNoZWNrUHJvcFR5cGVzJDEgPSBjaGVja1Byb3BUeXBlcztcbiAgdmFyIHdhcm5pbmckMiA9IHdhcm5pbmc7XG4gIHZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lID0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZV8xO1xuXG4gIHZhciBfcmVxdWlyZSQxID0gUmVhY3RDb21wb25lbnRUcmVlSG9va18xLFxuICAgICAgZ2V0Q3VycmVudFN0YWNrQWRkZW5kdW0kMSA9IF9yZXF1aXJlJDEuZ2V0Q3VycmVudFN0YWNrQWRkZW5kdW07XG59XG5cbmZ1bmN0aW9uIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpIHtcbiAgaWYgKFJlYWN0Q3VycmVudE93bmVyXzEuY3VycmVudCkge1xuICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZV8xKFJlYWN0Q3VycmVudE93bmVyXzEuY3VycmVudCk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiAnXFxuXFxuQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBnZXRTb3VyY2VJbmZvRXJyb3JBZGRlbmR1bShlbGVtZW50UHJvcHMpIHtcbiAgaWYgKGVsZW1lbnRQcm9wcyAhPT0gbnVsbCAmJiBlbGVtZW50UHJvcHMgIT09IHVuZGVmaW5lZCAmJiBlbGVtZW50UHJvcHMuX19zb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBzb3VyY2UgPSBlbGVtZW50UHJvcHMuX19zb3VyY2U7XG4gICAgdmFyIGZpbGVOYW1lID0gc291cmNlLmZpbGVOYW1lLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKTtcbiAgICB2YXIgbGluZU51bWJlciA9IHNvdXJjZS5saW5lTnVtYmVyO1xuICAgIHJldHVybiAnXFxuXFxuQ2hlY2sgeW91ciBjb2RlIGF0ICcgKyBmaWxlTmFtZSArICc6JyArIGxpbmVOdW1iZXIgKyAnLic7XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIFdhcm4gaWYgdGhlcmUncyBubyBrZXkgZXhwbGljaXRseSBzZXQgb24gZHluYW1pYyBhcnJheXMgb2YgY2hpbGRyZW4gb3JcbiAqIG9iamVjdCBrZXlzIGFyZSBub3QgdmFsaWQuIFRoaXMgYWxsb3dzIHVzIHRvIGtlZXAgdHJhY2sgb2YgY2hpbGRyZW4gYmV0d2VlblxuICogdXBkYXRlcy5cbiAqL1xudmFyIG93bmVySGFzS2V5VXNlV2FybmluZyA9IHt9O1xuXG5mdW5jdGlvbiBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpIHtcbiAgdmFyIGluZm8gPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcblxuICBpZiAoIWluZm8pIHtcbiAgICB2YXIgcGFyZW50TmFtZSA9IHR5cGVvZiBwYXJlbnRUeXBlID09PSAnc3RyaW5nJyA/IHBhcmVudFR5cGUgOiBwYXJlbnRUeXBlLmRpc3BsYXlOYW1lIHx8IHBhcmVudFR5cGUubmFtZTtcbiAgICBpZiAocGFyZW50TmFtZSkge1xuICAgICAgaW5mbyA9ICdcXG5cXG5DaGVjayB0aGUgdG9wLWxldmVsIHJlbmRlciBjYWxsIHVzaW5nIDwnICsgcGFyZW50TmFtZSArICc+Lic7XG4gICAgfVxuICB9XG4gIHJldHVybiBpbmZvO1xufVxuXG4vKipcbiAqIFdhcm4gaWYgdGhlIGVsZW1lbnQgZG9lc24ndCBoYXZlIGFuIGV4cGxpY2l0IGtleSBhc3NpZ25lZCB0byBpdC5cbiAqIFRoaXMgZWxlbWVudCBpcyBpbiBhbiBhcnJheS4gVGhlIGFycmF5IGNvdWxkIGdyb3cgYW5kIHNocmluayBvciBiZVxuICogcmVvcmRlcmVkLiBBbGwgY2hpbGRyZW4gdGhhdCBoYXZlbid0IGFscmVhZHkgYmVlbiB2YWxpZGF0ZWQgYXJlIHJlcXVpcmVkIHRvXG4gKiBoYXZlIGEgXCJrZXlcIiBwcm9wZXJ0eSBhc3NpZ25lZCB0byBpdC4gRXJyb3Igc3RhdHVzZXMgYXJlIGNhY2hlZCBzbyBhIHdhcm5pbmdcbiAqIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnQgRWxlbWVudCB0aGF0IHJlcXVpcmVzIGEga2V5LlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIGVsZW1lbnQncyBwYXJlbnQncyB0eXBlLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUV4cGxpY2l0S2V5KGVsZW1lbnQsIHBhcmVudFR5cGUpIHtcbiAgaWYgKCFlbGVtZW50Ll9zdG9yZSB8fCBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgfHwgZWxlbWVudC5rZXkgIT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuXG4gIHZhciBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvID0gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKTtcbiAgaWYgKG93bmVySGFzS2V5VXNlV2FybmluZ1tjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSkge1xuICAgIHJldHVybjtcbiAgfVxuICBvd25lckhhc0tleVVzZVdhcm5pbmdbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10gPSB0cnVlO1xuXG4gIC8vIFVzdWFsbHkgdGhlIGN1cnJlbnQgb3duZXIgaXMgdGhlIG9mZmVuZGVyLCBidXQgaWYgaXQgYWNjZXB0cyBjaGlsZHJlbiBhcyBhXG4gIC8vIHByb3BlcnR5LCBpdCBtYXkgYmUgdGhlIGNyZWF0b3Igb2YgdGhlIGNoaWxkIHRoYXQncyByZXNwb25zaWJsZSBmb3JcbiAgLy8gYXNzaWduaW5nIGl0IGEga2V5LlxuICB2YXIgY2hpbGRPd25lciA9ICcnO1xuICBpZiAoZWxlbWVudCAmJiBlbGVtZW50Ll9vd25lciAmJiBlbGVtZW50Ll9vd25lciAhPT0gUmVhY3RDdXJyZW50T3duZXJfMS5jdXJyZW50KSB7XG4gICAgLy8gR2l2ZSB0aGUgY29tcG9uZW50IHRoYXQgb3JpZ2luYWxseSBjcmVhdGVkIHRoaXMgY2hpbGQuXG4gICAgY2hpbGRPd25lciA9ICcgSXQgd2FzIHBhc3NlZCBhIGNoaWxkIGZyb20gJyArIGdldENvbXBvbmVudE5hbWVfMShlbGVtZW50Ll9vd25lcikgKyAnLic7XG4gIH1cblxuICB3YXJuaW5nJDIoZmFsc2UsICdFYWNoIGNoaWxkIGluIGFuIGFycmF5IG9yIGl0ZXJhdG9yIHNob3VsZCBoYXZlIGEgdW5pcXVlIFwia2V5XCIgcHJvcC4nICsgJyVzJXMgU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1rZXlzIGZvciBtb3JlIGluZm9ybWF0aW9uLiVzJywgY3VycmVudENvbXBvbmVudEVycm9ySW5mbywgY2hpbGRPd25lciwgZ2V0Q3VycmVudFN0YWNrQWRkZW5kdW0kMShlbGVtZW50KSk7XG59XG5cbi8qKlxuICogRW5zdXJlIHRoYXQgZXZlcnkgZWxlbWVudCBlaXRoZXIgaXMgcGFzc2VkIGluIGEgc3RhdGljIGxvY2F0aW9uLCBpbiBhblxuICogYXJyYXkgd2l0aCBhbiBleHBsaWNpdCBrZXlzIHByb3BlcnR5IGRlZmluZWQsIG9yIGluIGFuIG9iamVjdCBsaXRlcmFsXG4gKiB3aXRoIHZhbGlkIGtleSBwcm9wZXJ0eS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3ROb2RlfSBub2RlIFN0YXRpY2FsbHkgcGFzc2VkIGNoaWxkIG9mIGFueSB0eXBlLlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIG5vZGUncyBwYXJlbnQncyB0eXBlLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUNoaWxkS2V5cyhub2RlLCBwYXJlbnRUeXBlKSB7XG4gIGlmICh0eXBlb2Ygbm9kZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGlsZCA9IG5vZGVbaV07XG4gICAgICBpZiAoUmVhY3RFbGVtZW50XzEuaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoY2hpbGQsIHBhcmVudFR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChSZWFjdEVsZW1lbnRfMS5pc1ZhbGlkRWxlbWVudChub2RlKSkge1xuICAgIC8vIFRoaXMgZWxlbWVudCB3YXMgcGFzc2VkIGluIGEgdmFsaWQgbG9jYXRpb24uXG4gICAgaWYgKG5vZGUuX3N0b3JlKSB7XG4gICAgICBub2RlLl9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChub2RlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuXzEobm9kZSk7XG4gICAgLy8gRW50cnkgaXRlcmF0b3JzIHByb3ZpZGUgaW1wbGljaXQga2V5cy5cbiAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IG5vZGUuZW50cmllcykge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobm9kZSk7XG4gICAgICAgIHZhciBzdGVwO1xuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgaWYgKFJlYWN0RWxlbWVudF8xLmlzVmFsaWRFbGVtZW50KHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KHN0ZXAudmFsdWUsIHBhcmVudFR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEdpdmVuIGFuIGVsZW1lbnQsIHZhbGlkYXRlIHRoYXQgaXRzIHByb3BzIGZvbGxvdyB0aGUgcHJvcFR5cGVzIGRlZmluaXRpb24sXG4gKiBwcm92aWRlZCBieSB0aGUgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudFxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KSB7XG4gIHZhciBjb21wb25lbnRDbGFzcyA9IGVsZW1lbnQudHlwZTtcbiAgaWYgKHR5cGVvZiBjb21wb25lbnRDbGFzcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmFtZSA9IGNvbXBvbmVudENsYXNzLmRpc3BsYXlOYW1lIHx8IGNvbXBvbmVudENsYXNzLm5hbWU7XG5cbiAgLy8gUmVhY3ROYXRpdmUgYFZpZXcucHJvcFR5cGVzYCBoYXZlIGJlZW4gZGVwcmVjYXRlZCBpbiBmYXZvciBvZiBgVmlld1Byb3BUeXBlc2AuXG4gIC8vIEluIHRoZWlyIHBsYWNlIGEgdGVtcG9yYXJ5IGdldHRlciBoYXMgYmVlbiBhZGRlZCB3aXRoIGEgZGVwcmVjYXRlZCB3YXJuaW5nIG1lc3NhZ2UuXG4gIC8vIEF2b2lkIHRyaWdnZXJpbmcgdGhhdCB3YXJuaW5nIGR1cmluZyB2YWxpZGF0aW9uIHVzaW5nIHRoZSB0ZW1wb3Jhcnkgd29ya2Fyb3VuZCxcbiAgLy8gX19wcm9wVHlwZXNTZWNyZXREb250VXNlVGhlc2VQbGVhc2UuXG4gIC8vIFRPRE8gKGJ2YXVnaG4pIFJldmVydCB0aGlzIHBhcnRpY3VsYXIgY2hhbmdlIGFueSB0aW1lIGFmdGVyIEFwcmlsIDEgUmVhY3ROYXRpdmUgdGFnLlxuICB2YXIgcHJvcFR5cGVzJCQxID0gdHlwZW9mIGNvbXBvbmVudENsYXNzLl9fcHJvcFR5cGVzU2VjcmV0RG9udFVzZVRoZXNlUGxlYXNlID09PSAnb2JqZWN0JyA/IGNvbXBvbmVudENsYXNzLl9fcHJvcFR5cGVzU2VjcmV0RG9udFVzZVRoZXNlUGxlYXNlIDogY29tcG9uZW50Q2xhc3MucHJvcFR5cGVzO1xuXG4gIGlmIChwcm9wVHlwZXMkJDEpIHtcbiAgICBjaGVja1Byb3BUeXBlcyQxKHByb3BUeXBlcyQkMSwgZWxlbWVudC5wcm9wcywgJ3Byb3AnLCBuYW1lLCBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldFN0YWNrQWRkZW5kdW0pO1xuICB9XG4gIGlmICh0eXBlb2YgY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgd2FybmluZyQyKGNvbXBvbmVudENsYXNzLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCwgJ2dldERlZmF1bHRQcm9wcyBpcyBvbmx5IHVzZWQgb24gY2xhc3NpYyBSZWFjdC5jcmVhdGVDbGFzcyAnICsgJ2RlZmluaXRpb25zLiBVc2UgYSBzdGF0aWMgcHJvcGVydHkgbmFtZWQgYGRlZmF1bHRQcm9wc2AgaW5zdGVhZC4nKTtcbiAgfVxufVxuXG52YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yJDIgPSB7XG4gIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0eXBlLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB2YXIgdmFsaWRUeXBlID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nO1xuICAgIC8vIFdlIHdhcm4gaW4gdGhpcyBjYXNlIGJ1dCBkb24ndCB0aHJvdy4gV2UgZXhwZWN0IHRoZSBlbGVtZW50IGNyZWF0aW9uIHRvXG4gICAgLy8gc3VjY2VlZCBhbmQgdGhlcmUgd2lsbCBsaWtlbHkgYmUgZXJyb3JzIGluIHJlbmRlci5cbiAgICBpZiAoIXZhbGlkVHlwZSkge1xuICAgICAgdmFyIGluZm8gPSAnJztcbiAgICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgT2JqZWN0LmtleXModHlwZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGluZm8gKz0gJyBZb3UgbGlrZWx5IGZvcmdvdCB0byBleHBvcnQgeW91ciBjb21wb25lbnQgZnJvbSB0aGUgZmlsZSAnICsgXCJpdCdzIGRlZmluZWQgaW4uXCI7XG4gICAgICB9XG5cbiAgICAgIHZhciBzb3VyY2VJbmZvID0gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0ocHJvcHMpO1xuICAgICAgaWYgKHNvdXJjZUluZm8pIHtcbiAgICAgICAgaW5mbyArPSBzb3VyY2VJbmZvO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5mbyArPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcbiAgICAgIH1cblxuICAgICAgaW5mbyArPSBnZXRDdXJyZW50U3RhY2tBZGRlbmR1bSQxKCk7XG5cbiAgICAgIHdhcm5pbmckMihmYWxzZSwgJ1JlYWN0LmNyZWF0ZUVsZW1lbnQ6IHR5cGUgaXMgaW52YWxpZCAtLSBleHBlY3RlZCBhIHN0cmluZyAoZm9yICcgKyAnYnVpbHQtaW4gY29tcG9uZW50cykgb3IgYSBjbGFzcy9mdW5jdGlvbiAoZm9yIGNvbXBvc2l0ZSAnICsgJ2NvbXBvbmVudHMpIGJ1dCBnb3Q6ICVzLiVzJywgdHlwZSA9PSBudWxsID8gdHlwZSA6IHR5cGVvZiB0eXBlLCBpbmZvKTtcbiAgICB9XG5cbiAgICB2YXIgZWxlbWVudCA9IFJlYWN0RWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIC8vIFRoZSByZXN1bHQgY2FuIGJlIG51bGxpc2ggaWYgYSBtb2NrIG9yIGEgY3VzdG9tIGZ1bmN0aW9uIGlzIHVzZWQuXG4gICAgLy8gVE9ETzogRHJvcCB0aGlzIHdoZW4gdGhlc2UgYXJlIG5vIGxvbmdlciBhbGxvd2VkIGFzIHRoZSB0eXBlIGFyZ3VtZW50LlxuICAgIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIHtcbiAgICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8gU2tpcCBrZXkgd2FybmluZyBpZiB0aGUgdHlwZSBpc24ndCB2YWxpZCBzaW5jZSBvdXIga2V5IHZhbGlkYXRpb24gbG9naWNcbiAgICAvLyBkb2Vzbid0IGV4cGVjdCBhIG5vbi1zdHJpbmcvZnVuY3Rpb24gdHlwZSBhbmQgY2FuIHRocm93IGNvbmZ1c2luZyBlcnJvcnMuXG4gICAgLy8gV2UgZG9uJ3Qgd2FudCBleGNlcHRpb24gYmVoYXZpb3IgdG8gZGlmZmVyIGJldHdlZW4gZGV2IGFuZCBwcm9kLlxuICAgIC8vIChSZW5kZXJpbmcgd2lsbCB0aHJvdyB3aXRoIGEgaGVscGZ1bCBtZXNzYWdlIGFuZCBhcyBzb29uIGFzIHRoZSB0eXBlIGlzXG4gICAgLy8gZml4ZWQsIHRoZSBrZXkgd2FybmluZ3Mgd2lsbCBhcHBlYXIuKVxuICAgIGlmICh2YWxpZFR5cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgdHlwZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVQcm9wVHlwZXMoZWxlbWVudCk7XG5cbiAgICB7XG4gICAgICBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmVsZW1lbnQgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxuXG4gIGNyZWF0ZUZhY3Rvcnk6IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgdmFyIHZhbGlkYXRlZEZhY3RvcnkgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IkMi5jcmVhdGVFbGVtZW50LmJpbmQobnVsbCwgdHlwZSk7XG4gICAgLy8gTGVnYWN5IGhvb2sgVE9ETzogV2FybiBpZiB0aGlzIGlzIGFjY2Vzc2VkXG4gICAgdmFsaWRhdGVkRmFjdG9yeS50eXBlID0gdHlwZTtcblxuICAgIHtcbiAgICAgIGlmIChjYW5EZWZpbmVQcm9wZXJ0eV8xKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YWxpZGF0ZWRGYWN0b3J5LCAndHlwZScsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdhcm5pbmckMihmYWxzZSwgJ0ZhY3RvcnkudHlwZSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdGhlIGNsYXNzIGRpcmVjdGx5ICcgKyAnYmVmb3JlIHBhc3NpbmcgaXQgdG8gY3JlYXRlRmFjdG9yeS4nKTtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndHlwZScsIHtcbiAgICAgICAgICAgICAgdmFsdWU6IHR5cGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdGVkRmFjdG9yeTtcbiAgfSxcblxuICBjbG9uZUVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50LCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB2YXIgbmV3RWxlbWVudCA9IFJlYWN0RWxlbWVudF8xLmNsb25lRWxlbWVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHtcbiAgICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZWxlbWVudCA9IG5ld0VsZW1lbnQ7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIG5ld0VsZW1lbnQudHlwZSk7XG4gICAgfVxuICAgIHZhbGlkYXRlUHJvcFR5cGVzKG5ld0VsZW1lbnQpO1xuICAgIHtcbiAgICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZWxlbWVudCA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiBuZXdFbGVtZW50O1xuICB9XG59O1xuXG52YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yXzEgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IkMjtcblxuLyoqXG4gKiBDcmVhdGUgYSBmYWN0b3J5IHRoYXQgY3JlYXRlcyBIVE1MIHRhZyBlbGVtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgY3JlYXRlRE9NRmFjdG9yeSA9IFJlYWN0RWxlbWVudF8xLmNyZWF0ZUZhY3Rvcnk7XG57XG4gIHZhciBSZWFjdEVsZW1lbnRWYWxpZGF0b3IkMSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvcl8xO1xuICBjcmVhdGVET01GYWN0b3J5ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yJDEuY3JlYXRlRmFjdG9yeTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwcGluZyBmcm9tIHN1cHBvcnRlZCBIVE1MIHRhZ3MgdG8gYFJlYWN0RE9NQ29tcG9uZW50YCBjbGFzc2VzLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xudmFyIFJlYWN0RE9NRmFjdG9yaWVzID0ge1xuICBhOiBjcmVhdGVET01GYWN0b3J5KCdhJyksXG4gIGFiYnI6IGNyZWF0ZURPTUZhY3RvcnkoJ2FiYnInKSxcbiAgYWRkcmVzczogY3JlYXRlRE9NRmFjdG9yeSgnYWRkcmVzcycpLFxuICBhcmVhOiBjcmVhdGVET01GYWN0b3J5KCdhcmVhJyksXG4gIGFydGljbGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2FydGljbGUnKSxcbiAgYXNpZGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2FzaWRlJyksXG4gIGF1ZGlvOiBjcmVhdGVET01GYWN0b3J5KCdhdWRpbycpLFxuICBiOiBjcmVhdGVET01GYWN0b3J5KCdiJyksXG4gIGJhc2U6IGNyZWF0ZURPTUZhY3RvcnkoJ2Jhc2UnKSxcbiAgYmRpOiBjcmVhdGVET01GYWN0b3J5KCdiZGknKSxcbiAgYmRvOiBjcmVhdGVET01GYWN0b3J5KCdiZG8nKSxcbiAgYmlnOiBjcmVhdGVET01GYWN0b3J5KCdiaWcnKSxcbiAgYmxvY2txdW90ZTogY3JlYXRlRE9NRmFjdG9yeSgnYmxvY2txdW90ZScpLFxuICBib2R5OiBjcmVhdGVET01GYWN0b3J5KCdib2R5JyksXG4gIGJyOiBjcmVhdGVET01GYWN0b3J5KCdicicpLFxuICBidXR0b246IGNyZWF0ZURPTUZhY3RvcnkoJ2J1dHRvbicpLFxuICBjYW52YXM6IGNyZWF0ZURPTUZhY3RvcnkoJ2NhbnZhcycpLFxuICBjYXB0aW9uOiBjcmVhdGVET01GYWN0b3J5KCdjYXB0aW9uJyksXG4gIGNpdGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2NpdGUnKSxcbiAgY29kZTogY3JlYXRlRE9NRmFjdG9yeSgnY29kZScpLFxuICBjb2w6IGNyZWF0ZURPTUZhY3RvcnkoJ2NvbCcpLFxuICBjb2xncm91cDogY3JlYXRlRE9NRmFjdG9yeSgnY29sZ3JvdXAnKSxcbiAgZGF0YTogY3JlYXRlRE9NRmFjdG9yeSgnZGF0YScpLFxuICBkYXRhbGlzdDogY3JlYXRlRE9NRmFjdG9yeSgnZGF0YWxpc3QnKSxcbiAgZGQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2RkJyksXG4gIGRlbDogY3JlYXRlRE9NRmFjdG9yeSgnZGVsJyksXG4gIGRldGFpbHM6IGNyZWF0ZURPTUZhY3RvcnkoJ2RldGFpbHMnKSxcbiAgZGZuOiBjcmVhdGVET01GYWN0b3J5KCdkZm4nKSxcbiAgZGlhbG9nOiBjcmVhdGVET01GYWN0b3J5KCdkaWFsb2cnKSxcbiAgZGl2OiBjcmVhdGVET01GYWN0b3J5KCdkaXYnKSxcbiAgZGw6IGNyZWF0ZURPTUZhY3RvcnkoJ2RsJyksXG4gIGR0OiBjcmVhdGVET01GYWN0b3J5KCdkdCcpLFxuICBlbTogY3JlYXRlRE9NRmFjdG9yeSgnZW0nKSxcbiAgZW1iZWQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2VtYmVkJyksXG4gIGZpZWxkc2V0OiBjcmVhdGVET01GYWN0b3J5KCdmaWVsZHNldCcpLFxuICBmaWdjYXB0aW9uOiBjcmVhdGVET01GYWN0b3J5KCdmaWdjYXB0aW9uJyksXG4gIGZpZ3VyZTogY3JlYXRlRE9NRmFjdG9yeSgnZmlndXJlJyksXG4gIGZvb3RlcjogY3JlYXRlRE9NRmFjdG9yeSgnZm9vdGVyJyksXG4gIGZvcm06IGNyZWF0ZURPTUZhY3RvcnkoJ2Zvcm0nKSxcbiAgaDE6IGNyZWF0ZURPTUZhY3RvcnkoJ2gxJyksXG4gIGgyOiBjcmVhdGVET01GYWN0b3J5KCdoMicpLFxuICBoMzogY3JlYXRlRE9NRmFjdG9yeSgnaDMnKSxcbiAgaDQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2g0JyksXG4gIGg1OiBjcmVhdGVET01GYWN0b3J5KCdoNScpLFxuICBoNjogY3JlYXRlRE9NRmFjdG9yeSgnaDYnKSxcbiAgaGVhZDogY3JlYXRlRE9NRmFjdG9yeSgnaGVhZCcpLFxuICBoZWFkZXI6IGNyZWF0ZURPTUZhY3RvcnkoJ2hlYWRlcicpLFxuICBoZ3JvdXA6IGNyZWF0ZURPTUZhY3RvcnkoJ2hncm91cCcpLFxuICBocjogY3JlYXRlRE9NRmFjdG9yeSgnaHInKSxcbiAgaHRtbDogY3JlYXRlRE9NRmFjdG9yeSgnaHRtbCcpLFxuICBpOiBjcmVhdGVET01GYWN0b3J5KCdpJyksXG4gIGlmcmFtZTogY3JlYXRlRE9NRmFjdG9yeSgnaWZyYW1lJyksXG4gIGltZzogY3JlYXRlRE9NRmFjdG9yeSgnaW1nJyksXG4gIGlucHV0OiBjcmVhdGVET01GYWN0b3J5KCdpbnB1dCcpLFxuICBpbnM6IGNyZWF0ZURPTUZhY3RvcnkoJ2lucycpLFxuICBrYmQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2tiZCcpLFxuICBrZXlnZW46IGNyZWF0ZURPTUZhY3RvcnkoJ2tleWdlbicpLFxuICBsYWJlbDogY3JlYXRlRE9NRmFjdG9yeSgnbGFiZWwnKSxcbiAgbGVnZW5kOiBjcmVhdGVET01GYWN0b3J5KCdsZWdlbmQnKSxcbiAgbGk6IGNyZWF0ZURPTUZhY3RvcnkoJ2xpJyksXG4gIGxpbms6IGNyZWF0ZURPTUZhY3RvcnkoJ2xpbmsnKSxcbiAgbWFpbjogY3JlYXRlRE9NRmFjdG9yeSgnbWFpbicpLFxuICBtYXA6IGNyZWF0ZURPTUZhY3RvcnkoJ21hcCcpLFxuICBtYXJrOiBjcmVhdGVET01GYWN0b3J5KCdtYXJrJyksXG4gIG1lbnU6IGNyZWF0ZURPTUZhY3RvcnkoJ21lbnUnKSxcbiAgbWVudWl0ZW06IGNyZWF0ZURPTUZhY3RvcnkoJ21lbnVpdGVtJyksXG4gIG1ldGE6IGNyZWF0ZURPTUZhY3RvcnkoJ21ldGEnKSxcbiAgbWV0ZXI6IGNyZWF0ZURPTUZhY3RvcnkoJ21ldGVyJyksXG4gIG5hdjogY3JlYXRlRE9NRmFjdG9yeSgnbmF2JyksXG4gIG5vc2NyaXB0OiBjcmVhdGVET01GYWN0b3J5KCdub3NjcmlwdCcpLFxuICBvYmplY3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ29iamVjdCcpLFxuICBvbDogY3JlYXRlRE9NRmFjdG9yeSgnb2wnKSxcbiAgb3B0Z3JvdXA6IGNyZWF0ZURPTUZhY3RvcnkoJ29wdGdyb3VwJyksXG4gIG9wdGlvbjogY3JlYXRlRE9NRmFjdG9yeSgnb3B0aW9uJyksXG4gIG91dHB1dDogY3JlYXRlRE9NRmFjdG9yeSgnb3V0cHV0JyksXG4gIHA6IGNyZWF0ZURPTUZhY3RvcnkoJ3AnKSxcbiAgcGFyYW06IGNyZWF0ZURPTUZhY3RvcnkoJ3BhcmFtJyksXG4gIHBpY3R1cmU6IGNyZWF0ZURPTUZhY3RvcnkoJ3BpY3R1cmUnKSxcbiAgcHJlOiBjcmVhdGVET01GYWN0b3J5KCdwcmUnKSxcbiAgcHJvZ3Jlc3M6IGNyZWF0ZURPTUZhY3RvcnkoJ3Byb2dyZXNzJyksXG4gIHE6IGNyZWF0ZURPTUZhY3RvcnkoJ3EnKSxcbiAgcnA6IGNyZWF0ZURPTUZhY3RvcnkoJ3JwJyksXG4gIHJ0OiBjcmVhdGVET01GYWN0b3J5KCdydCcpLFxuICBydWJ5OiBjcmVhdGVET01GYWN0b3J5KCdydWJ5JyksXG4gIHM6IGNyZWF0ZURPTUZhY3RvcnkoJ3MnKSxcbiAgc2FtcDogY3JlYXRlRE9NRmFjdG9yeSgnc2FtcCcpLFxuICBzY3JpcHQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3NjcmlwdCcpLFxuICBzZWN0aW9uOiBjcmVhdGVET01GYWN0b3J5KCdzZWN0aW9uJyksXG4gIHNlbGVjdDogY3JlYXRlRE9NRmFjdG9yeSgnc2VsZWN0JyksXG4gIHNtYWxsOiBjcmVhdGVET01GYWN0b3J5KCdzbWFsbCcpLFxuICBzb3VyY2U6IGNyZWF0ZURPTUZhY3RvcnkoJ3NvdXJjZScpLFxuICBzcGFuOiBjcmVhdGVET01GYWN0b3J5KCdzcGFuJyksXG4gIHN0cm9uZzogY3JlYXRlRE9NRmFjdG9yeSgnc3Ryb25nJyksXG4gIHN0eWxlOiBjcmVhdGVET01GYWN0b3J5KCdzdHlsZScpLFxuICBzdWI6IGNyZWF0ZURPTUZhY3RvcnkoJ3N1YicpLFxuICBzdW1tYXJ5OiBjcmVhdGVET01GYWN0b3J5KCdzdW1tYXJ5JyksXG4gIHN1cDogY3JlYXRlRE9NRmFjdG9yeSgnc3VwJyksXG4gIHRhYmxlOiBjcmVhdGVET01GYWN0b3J5KCd0YWJsZScpLFxuICB0Ym9keTogY3JlYXRlRE9NRmFjdG9yeSgndGJvZHknKSxcbiAgdGQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3RkJyksXG4gIHRleHRhcmVhOiBjcmVhdGVET01GYWN0b3J5KCd0ZXh0YXJlYScpLFxuICB0Zm9vdDogY3JlYXRlRE9NRmFjdG9yeSgndGZvb3QnKSxcbiAgdGg6IGNyZWF0ZURPTUZhY3RvcnkoJ3RoJyksXG4gIHRoZWFkOiBjcmVhdGVET01GYWN0b3J5KCd0aGVhZCcpLFxuICB0aW1lOiBjcmVhdGVET01GYWN0b3J5KCd0aW1lJyksXG4gIHRpdGxlOiBjcmVhdGVET01GYWN0b3J5KCd0aXRsZScpLFxuICB0cjogY3JlYXRlRE9NRmFjdG9yeSgndHInKSxcbiAgdHJhY2s6IGNyZWF0ZURPTUZhY3RvcnkoJ3RyYWNrJyksXG4gIHU6IGNyZWF0ZURPTUZhY3RvcnkoJ3UnKSxcbiAgdWw6IGNyZWF0ZURPTUZhY3RvcnkoJ3VsJyksXG4gICd2YXInOiBjcmVhdGVET01GYWN0b3J5KCd2YXInKSxcbiAgdmlkZW86IGNyZWF0ZURPTUZhY3RvcnkoJ3ZpZGVvJyksXG4gIHdicjogY3JlYXRlRE9NRmFjdG9yeSgnd2JyJyksXG5cbiAgLy8gU1ZHXG4gIGNpcmNsZTogY3JlYXRlRE9NRmFjdG9yeSgnY2lyY2xlJyksXG4gIGNsaXBQYXRoOiBjcmVhdGVET01GYWN0b3J5KCdjbGlwUGF0aCcpLFxuICBkZWZzOiBjcmVhdGVET01GYWN0b3J5KCdkZWZzJyksXG4gIGVsbGlwc2U6IGNyZWF0ZURPTUZhY3RvcnkoJ2VsbGlwc2UnKSxcbiAgZzogY3JlYXRlRE9NRmFjdG9yeSgnZycpLFxuICBpbWFnZTogY3JlYXRlRE9NRmFjdG9yeSgnaW1hZ2UnKSxcbiAgbGluZTogY3JlYXRlRE9NRmFjdG9yeSgnbGluZScpLFxuICBsaW5lYXJHcmFkaWVudDogY3JlYXRlRE9NRmFjdG9yeSgnbGluZWFyR3JhZGllbnQnKSxcbiAgbWFzazogY3JlYXRlRE9NRmFjdG9yeSgnbWFzaycpLFxuICBwYXRoOiBjcmVhdGVET01GYWN0b3J5KCdwYXRoJyksXG4gIHBhdHRlcm46IGNyZWF0ZURPTUZhY3RvcnkoJ3BhdHRlcm4nKSxcbiAgcG9seWdvbjogY3JlYXRlRE9NRmFjdG9yeSgncG9seWdvbicpLFxuICBwb2x5bGluZTogY3JlYXRlRE9NRmFjdG9yeSgncG9seWxpbmUnKSxcbiAgcmFkaWFsR3JhZGllbnQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3JhZGlhbEdyYWRpZW50JyksXG4gIHJlY3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ3JlY3QnKSxcbiAgc3RvcDogY3JlYXRlRE9NRmFjdG9yeSgnc3RvcCcpLFxuICBzdmc6IGNyZWF0ZURPTUZhY3RvcnkoJ3N2ZycpLFxuICB0ZXh0OiBjcmVhdGVET01GYWN0b3J5KCd0ZXh0JyksXG4gIHRzcGFuOiBjcmVhdGVET01GYWN0b3J5KCd0c3BhbicpXG59O1xuXG52YXIgUmVhY3RET01GYWN0b3JpZXNfMSA9IFJlYWN0RE9NRmFjdG9yaWVzO1xuXG52YXIgUmVhY3RQcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5cbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFZlcnNpb25cbiAqL1xuXG52YXIgUmVhY3RWZXJzaW9uID0gJzE2LjAuMC1hbHBoYS4xMic7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgY2hpbGQgaW4gYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuIGFuZCB2ZXJpZmllcyB0aGF0IHRoZXJlXG4gKiBpcyBvbmx5IG9uZSBjaGlsZCBpbiB0aGUgY29sbGVjdGlvbi5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy9yZWFjdC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi5vbmx5XG4gKlxuICogVGhlIGN1cnJlbnQgaW1wbGVtZW50YXRpb24gb2YgdGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgYSBzaW5nbGUgY2hpbGQgZ2V0c1xuICogcGFzc2VkIHdpdGhvdXQgYSB3cmFwcGVyLCBidXQgdGhlIHB1cnBvc2Ugb2YgdGhpcyBoZWxwZXIgZnVuY3Rpb24gaXMgdG9cbiAqIGFic3RyYWN0IGF3YXkgdGhlIHBhcnRpY3VsYXIgc3RydWN0dXJlIG9mIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gY2hpbGRyZW4gQ2hpbGQgY29sbGVjdGlvbiBzdHJ1Y3R1cmUuXG4gKiBAcmV0dXJuIHtSZWFjdEVsZW1lbnR9IFRoZSBmaXJzdCBhbmQgb25seSBgUmVhY3RFbGVtZW50YCBjb250YWluZWQgaW4gdGhlXG4gKiBzdHJ1Y3R1cmUuXG4gKi9cbmZ1bmN0aW9uIG9ubHlDaGlsZChjaGlsZHJlbikge1xuICAhUmVhY3RFbGVtZW50XzEuaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3QuQ2hpbGRyZW4ub25seSBleHBlY3RlZCB0byByZWNlaXZlIGEgc2luZ2xlIFJlYWN0IGVsZW1lbnQgY2hpbGQuJykgOiB2b2lkIDA7XG4gIHJldHVybiBjaGlsZHJlbjtcbn1cblxudmFyIG9ubHlDaGlsZF8xID0gb25seUNoaWxkO1xuXG52YXIgQ29tcG9uZW50ID0gUmVhY3RCYXNlQ2xhc3Nlcy5Db21wb25lbnQ7XG5cbnZhciBpc1ZhbGlkRWxlbWVudCA9IFJlYWN0RWxlbWVudF8xLmlzVmFsaWRFbGVtZW50O1xuXG5cblxuXG52YXIgY3JlYXRlQ2xhc3MgPSBmYWN0b3J5KENvbXBvbmVudCwgaXNWYWxpZEVsZW1lbnQsIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlXzEpO1xuXG52YXIgY3JlYXRlRWxlbWVudCA9IFJlYWN0RWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQ7XG52YXIgY3JlYXRlRmFjdG9yeSA9IFJlYWN0RWxlbWVudF8xLmNyZWF0ZUZhY3Rvcnk7XG52YXIgY2xvbmVFbGVtZW50ID0gUmVhY3RFbGVtZW50XzEuY2xvbmVFbGVtZW50O1xuXG57XG4gIHZhciB3YXJuaW5nJDEgPSB3YXJuaW5nO1xuICB2YXIgY2FuRGVmaW5lUHJvcGVydHkgPSBjYW5EZWZpbmVQcm9wZXJ0eV8xO1xuICB2YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yXzE7XG4gIGNyZWF0ZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRWxlbWVudDtcbiAgY3JlYXRlRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVGYWN0b3J5O1xuICBjbG9uZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY2xvbmVFbGVtZW50O1xufVxuXG52YXIgY3JlYXRlTWl4aW4gPSBmdW5jdGlvbiAobWl4aW4pIHtcbiAgcmV0dXJuIG1peGluO1xufTtcblxudmFyIFJlYWN0ID0ge1xuICAvLyBNb2Rlcm5cblxuICBDaGlsZHJlbjoge1xuICAgIG1hcDogUmVhY3RDaGlsZHJlbl8xLm1hcCxcbiAgICBmb3JFYWNoOiBSZWFjdENoaWxkcmVuXzEuZm9yRWFjaCxcbiAgICBjb3VudDogUmVhY3RDaGlsZHJlbl8xLmNvdW50LFxuICAgIHRvQXJyYXk6IFJlYWN0Q2hpbGRyZW5fMS50b0FycmF5LFxuICAgIG9ubHk6IG9ubHlDaGlsZF8xXG4gIH0sXG5cbiAgQ29tcG9uZW50OiBSZWFjdEJhc2VDbGFzc2VzLkNvbXBvbmVudCxcbiAgUHVyZUNvbXBvbmVudDogUmVhY3RCYXNlQ2xhc3Nlcy5QdXJlQ29tcG9uZW50LFxuXG4gIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXG4gIGNsb25lRWxlbWVudDogY2xvbmVFbGVtZW50LFxuICBpc1ZhbGlkRWxlbWVudDogUmVhY3RFbGVtZW50XzEuaXNWYWxpZEVsZW1lbnQsXG5cbiAgLy8gVE9ETyAoYnZhdWdobikgUmVtb3ZlIHRoZXNlIGdldHRlcnMgYmVmb3JlIDE2LjAuMFxuICBQcm9wVHlwZXM6IFJlYWN0UHJvcFR5cGVzLFxuICBjaGVja1Byb3BUeXBlczogY2hlY2tQcm9wVHlwZXMsXG4gIGNyZWF0ZUNsYXNzOiBjcmVhdGVDbGFzcyxcblxuICAvLyBDbGFzc2ljXG5cbiAgY3JlYXRlRmFjdG9yeTogY3JlYXRlRmFjdG9yeSxcbiAgY3JlYXRlTWl4aW46IGNyZWF0ZU1peGluLFxuXG4gIC8vIFRoaXMgbG9va3MgRE9NIHNwZWNpZmljIGJ1dCB0aGVzZSBhcmUgYWN0dWFsbHkgaXNvbW9ycGhpYyBoZWxwZXJzXG4gIC8vIHNpbmNlIHRoZXkgYXJlIGp1c3QgZ2VuZXJhdGluZyBET00gc3RyaW5ncy5cbiAgRE9NOiBSZWFjdERPTUZhY3Rvcmllc18xLFxuXG4gIHZlcnNpb246IFJlYWN0VmVyc2lvbixcblxuICBfX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRDoge1xuICAgIFJlYWN0Q3VycmVudE93bmVyOiBSZWFjdEN1cnJlbnRPd25lcl8xXG4gIH1cbn07XG5cbntcbiAgb2JqZWN0QXNzaWduJDEoUmVhY3QuX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQsIHtcbiAgICAvLyBUaGVzZSBzaG91bGQgbm90IGJlIGluY2x1ZGVkIGluIHByb2R1Y3Rpb24uXG4gICAgUmVhY3RDb21wb25lbnRUcmVlSG9vazogUmVhY3RDb21wb25lbnRUcmVlSG9va18xLFxuICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWU6IFJlYWN0RGVidWdDdXJyZW50RnJhbWVfMVxuICB9KTtcblxuICB2YXIgd2FybmVkRm9yQ2hlY2tQcm9wVHlwZXMgPSBmYWxzZTtcbiAgdmFyIHdhcm5lZEZvckNyZWF0ZU1peGluID0gZmFsc2U7XG4gIHZhciB3YXJuZWRGb3JDcmVhdGVDbGFzcyA9IGZhbHNlO1xuICB2YXIgd2FybmVkRm9yUHJvcFR5cGVzID0gZmFsc2U7XG5cbiAgUmVhY3QuY3JlYXRlTWl4aW4gPSBmdW5jdGlvbiAobWl4aW4pIHtcbiAgICB3YXJuaW5nJDEod2FybmVkRm9yQ3JlYXRlTWl4aW4sICdSZWFjdC5jcmVhdGVNaXhpbiBpcyBkZXByZWNhdGVkIGFuZCBzaG91bGQgbm90IGJlIHVzZWQuIFlvdSAnICsgJ2NhbiB1c2UgdGhpcyBtaXhpbiBkaXJlY3RseSBpbnN0ZWFkLicpO1xuICAgIHdhcm5lZEZvckNyZWF0ZU1peGluID0gdHJ1ZTtcbiAgICByZXR1cm4gbWl4aW47XG4gIH07XG5cbiAgLy8gVE9ETyAoYnZhdWdobikgUmVtb3ZlIGFsbCBvZiB0aGVzZSBhY2Nlc3NvcnMgYmVmb3JlIDE2LjAuMFxuICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhY3QsICdjaGVja1Byb3BUeXBlcycsIHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICB3YXJuaW5nJDEod2FybmVkRm9yQ2hlY2tQcm9wVHlwZXMsICdjaGVja1Byb3BUeXBlcyBoYXMgYmVlbiBtb3ZlZCB0byBhIHNlcGFyYXRlIHBhY2thZ2UuICcgKyAnQWNjZXNzaW5nIFJlYWN0LmNoZWNrUHJvcFR5cGVzIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgJyArICdhbmQgd2lsbCBiZSByZW1vdmVkIGNvbXBsZXRlbHkgaW4gUmVhY3QgMTYuICcgKyAnVXNlIHRoZSBwcm9wLXR5cGVzIHBhY2thZ2Ugb24gbnBtIGluc3RlYWQuICcgKyAnKGh0dHBzOi8vZmIubWUvbWlncmF0aW5nLWZyb20tcmVhY3QtcHJvcHR5cGVzKScpO1xuICAgICAgICB3YXJuZWRGb3JDaGVja1Byb3BUeXBlcyA9IHRydWU7XG4gICAgICAgIHJldHVybiBjaGVja1Byb3BUeXBlcztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFjdCwgJ2NyZWF0ZUNsYXNzJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdhcm5pbmckMSh3YXJuZWRGb3JDcmVhdGVDbGFzcywgJ1JlYWN0LmNyZWF0ZUNsYXNzIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQuIFVzZSBhIHBsYWluIEphdmFTY3JpcHQgJyArIFwiY2xhc3MgaW5zdGVhZC4gSWYgeW91J3JlIG5vdCB5ZXQgcmVhZHkgdG8gbWlncmF0ZSwgXCIgKyAnY3JlYXRlLXJlYWN0LWNsYXNzIGlzIGF2YWlsYWJsZSBvbiBucG0gYXMgYSBkcm9wLWluIHJlcGxhY2VtZW50LiAnICsgJyhodHRwczovL2ZiLm1lL21pZ3JhdGluZy1mcm9tLXJlYWN0LWNyZWF0ZS1jbGFzcyknKTtcbiAgICAgICAgd2FybmVkRm9yQ3JlYXRlQ2xhc3MgPSB0cnVlO1xuICAgICAgICByZXR1cm4gY3JlYXRlQ2xhc3M7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhY3QsICdQcm9wVHlwZXMnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2FybmluZyQxKHdhcm5lZEZvclByb3BUeXBlcywgJ1Byb3BUeXBlcyBoYXMgYmVlbiBtb3ZlZCB0byBhIHNlcGFyYXRlIHBhY2thZ2UuICcgKyAnQWNjZXNzaW5nIFJlYWN0LlByb3BUeXBlcyBpcyBubyBsb25nZXIgc3VwcG9ydGVkICcgKyAnYW5kIHdpbGwgYmUgcmVtb3ZlZCBjb21wbGV0ZWx5IGluIFJlYWN0IDE2LiAnICsgJ1VzZSB0aGUgcHJvcC10eXBlcyBwYWNrYWdlIG9uIG5wbSBpbnN0ZWFkLiAnICsgJyhodHRwczovL2ZiLm1lL21pZ3JhdGluZy1mcm9tLXJlYWN0LXByb3B0eXBlcyknKTtcbiAgICAgICAgd2FybmVkRm9yUHJvcFR5cGVzID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gUmVhY3QuRE9NIGZhY3RvcmllcyBhcmUgZGVwcmVjYXRlZC4gV3JhcCB0aGVzZSBtZXRob2RzIHNvIHRoYXRcbiAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIFJlYWN0LkRPTSBuYW1lc3BhY2UgYW5kIGFsZXJ0IHVzZXJzIHRvIHN3aXRjaFxuICAvLyB0byB0aGUgYHJlYWN0LWFkZG9ucy1kb20tZmFjdG9yaWVzYCBwYWNrYWdlLlxuICBSZWFjdC5ET00gPSB7fTtcbiAgdmFyIHdhcm5lZEZvckZhY3RvcmllcyA9IGZhbHNlO1xuICBPYmplY3Qua2V5cyhSZWFjdERPTUZhY3Rvcmllc18xKS5mb3JFYWNoKGZ1bmN0aW9uIChmYWN0b3J5JCQxKSB7XG4gICAgUmVhY3QuRE9NW2ZhY3RvcnkkJDFdID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCF3YXJuZWRGb3JGYWN0b3JpZXMpIHtcbiAgICAgICAgd2FybmluZyQxKGZhbHNlLCAnQWNjZXNzaW5nIGZhY3RvcmllcyBsaWtlIFJlYWN0LkRPTS4lcyBoYXMgYmVlbiBkZXByZWNhdGVkICcgKyAnYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlLiBVc2UgdGhlICcgKyAncmVhY3QtYWRkb25zLWRvbS1mYWN0b3JpZXMgcGFja2FnZSBpbnN0ZWFkLicsIGZhY3RvcnkkJDEpO1xuICAgICAgICB3YXJuZWRGb3JGYWN0b3JpZXMgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFJlYWN0RE9NRmFjdG9yaWVzXzFbZmFjdG9yeSQkMV0uYXBwbHkoUmVhY3RET01GYWN0b3JpZXNfMSwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9KTtcbn1cblxudmFyIFJlYWN0XzEgPSBSZWFjdDtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdF8xO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gZShlKXtmb3IodmFyIHQ9YXJndW1lbnRzLmxlbmd0aC0xLHI9XCJNaW5pZmllZCBSZWFjdCBlcnJvciAjXCIrZStcIjsgdmlzaXQgaHR0cDovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL2Vycm9yLWRlY29kZXIuaHRtbD9pbnZhcmlhbnQ9XCIrZSxuPTA7bjx0O24rKylyKz1cIiZhcmdzW109XCIrZW5jb2RlVVJJQ29tcG9uZW50KGFyZ3VtZW50c1tuKzFdKTtyKz1cIiBmb3IgdGhlIGZ1bGwgbWVzc2FnZSBvciB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgZm9yIGZ1bGwgZXJyb3JzIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuXCI7dmFyIG89bmV3IEVycm9yKHIpO3Rocm93IG8ubmFtZT1cIkludmFyaWFudCBWaW9sYXRpb25cIixvLmZyYW1lc1RvUG9wPTEsb31mdW5jdGlvbiB0KGUsdCl7fWZ1bmN0aW9uIHIoZSx0LHIpe3RoaXMucHJvcHM9ZSx0aGlzLmNvbnRleHQ9dCx0aGlzLnJlZnM9QSx0aGlzLnVwZGF0ZXI9cnx8VH1mdW5jdGlvbiBuKGUsdCxyKXt0aGlzLnByb3BzPWUsdGhpcy5jb250ZXh0PXQsdGhpcy5yZWZzPUEsdGhpcy51cGRhdGVyPXJ8fFR9ZnVuY3Rpb24gbygpe31mdW5jdGlvbiBpKGUpe3JldHVybiB2b2lkIDAhPT1lLnJlZn1mdW5jdGlvbiBhKGUpe3JldHVybiB2b2lkIDAhPT1lLmtleX1mdW5jdGlvbiBsKGUpe3ZhciB0PWUmJihaJiZlW1pdfHxlW2VlXSk7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgdClyZXR1cm4gdH1mdW5jdGlvbiB1KGUpe3ZhciB0PXtcIj1cIjpcIj0wXCIsXCI6XCI6XCI9MlwifTtyZXR1cm5cIiRcIisoXCJcIitlKS5yZXBsYWNlKC9bPTpdL2csZnVuY3Rpb24oZSl7cmV0dXJuIHRbZV19KX1mdW5jdGlvbiBjKGUpe3ZhciB0PXtcIj0wXCI6XCI9XCIsXCI9MlwiOlwiOlwifTtyZXR1cm4oXCJcIisoXCIuXCI9PT1lWzBdJiZcIiRcIj09PWVbMV0/ZS5zdWJzdHJpbmcoMik6ZS5zdWJzdHJpbmcoMSkpKS5yZXBsYWNlKC8oPTB8PTIpL2csZnVuY3Rpb24oZSl7cmV0dXJuIHRbZV19KX1mdW5jdGlvbiBzKGUsdCl7cmV0dXJuXCJvYmplY3RcIj09dHlwZW9mIGUmJm51bGwhPT1lJiZudWxsIT1lLmtleT9uZS5lc2NhcGUoZS5rZXkpOnQudG9TdHJpbmcoMzYpfWZ1bmN0aW9uIHAoZSx0LHIsbil7dmFyIG89dHlwZW9mIGU7aWYoXCJ1bmRlZmluZWRcIiE9PW8mJlwiYm9vbGVhblwiIT09b3x8KGU9bnVsbCksbnVsbD09PWV8fFwic3RyaW5nXCI9PT1vfHxcIm51bWJlclwiPT09b3x8XCJvYmplY3RcIj09PW8mJmUuJCR0eXBlb2Y9PT1ZKXJldHVybiByKG4sZSxcIlwiPT09dD9vZStzKGUsMCk6dCksMTt2YXIgaSxhLGw9MCx1PVwiXCI9PT10P29lOnQraWU7aWYoQXJyYXkuaXNBcnJheShlKSlmb3IodmFyIGM9MDtjPGUubGVuZ3RoO2MrKylpPWVbY10sYT11K3MoaSxjKSxsKz1wKGksYSxyLG4pO2Vsc2V7dmFyIGY9dGUoZSk7aWYoZilmb3IodmFyIGQsaD1mLmNhbGwoZSkseT0wOyEoZD1oLm5leHQoKSkuZG9uZTspaT1kLnZhbHVlLGE9dStzKGkseSsrKSxsKz1wKGksYSxyLG4pO2Vsc2UgaWYoXCJvYmplY3RcIj09PW8pe3ZhciBtPVwiXCIrZTtSKFwiMzFcIixcIltvYmplY3QgT2JqZWN0XVwiPT09bT9cIm9iamVjdCB3aXRoIGtleXMge1wiK09iamVjdC5rZXlzKGUpLmpvaW4oXCIsIFwiKStcIn1cIjptLFwiXCIpfX1yZXR1cm4gbH1mdW5jdGlvbiBmKGUsdCxyKXtyZXR1cm4gbnVsbD09ZT8wOnAoZSxcIlwiLHQscil9ZnVuY3Rpb24gZChlKXtyZXR1cm4oXCJcIitlKS5yZXBsYWNlKGNlLFwiJCYvXCIpfWZ1bmN0aW9uIGgoZSx0KXt0aGlzLmZ1bmM9ZSx0aGlzLmNvbnRleHQ9dCx0aGlzLmNvdW50PTB9ZnVuY3Rpb24geShlLHQscil7dmFyIG49ZS5mdW5jLG89ZS5jb250ZXh0O24uY2FsbChvLHQsZS5jb3VudCsrKX1mdW5jdGlvbiBtKGUsdCxyKXtpZihudWxsPT1lKXJldHVybiBlO3ZhciBuPWguZ2V0UG9vbGVkKHQscik7YWUoZSx5LG4pLGgucmVsZWFzZShuKX1mdW5jdGlvbiBiKGUsdCxyLG4pe3RoaXMucmVzdWx0PWUsdGhpcy5rZXlQcmVmaXg9dCx0aGlzLmZ1bmM9cix0aGlzLmNvbnRleHQ9bix0aGlzLmNvdW50PTB9ZnVuY3Rpb24gdihlLHQscil7dmFyIG49ZS5yZXN1bHQsbz1lLmtleVByZWZpeCxpPWUuZnVuYyxhPWUuY29udGV4dCxsPWkuY2FsbChhLHQsZS5jb3VudCsrKTtBcnJheS5pc0FycmF5KGwpP2cobCxuLHIsai50aGF0UmV0dXJuc0FyZ3VtZW50KTpudWxsIT1sJiYoWC5pc1ZhbGlkRWxlbWVudChsKSYmKGw9WC5jbG9uZUFuZFJlcGxhY2VLZXkobCxvKyghbC5rZXl8fHQmJnQua2V5PT09bC5rZXk/XCJcIjpkKGwua2V5KStcIi9cIikrcikpLG4ucHVzaChsKSl9ZnVuY3Rpb24gZyhlLHQscixuLG8pe3ZhciBpPVwiXCI7bnVsbCE9ciYmKGk9ZChyKStcIi9cIik7dmFyIGE9Yi5nZXRQb29sZWQodCxpLG4sbyk7YWUoZSx2LGEpLGIucmVsZWFzZShhKX1mdW5jdGlvbiBQKGUsdCxyKXtpZihudWxsPT1lKXJldHVybiBlO3ZhciBuPVtdO3JldHVybiBnKGUsbixudWxsLHQsciksbn1mdW5jdGlvbiBrKGUsdCxyKXtyZXR1cm4gbnVsbH1mdW5jdGlvbiBfKGUsdCl7cmV0dXJuIGFlKGUsayxudWxsKX1mdW5jdGlvbiBFKGUpe3ZhciB0PVtdO3JldHVybiBnKGUsdCxudWxsLGoudGhhdFJldHVybnNBcmd1bWVudCksdH1mdW5jdGlvbiB3KGUpe3JldHVybiBYLmlzVmFsaWRFbGVtZW50KGUpfHxSKFwiMTQzXCIpLGV9dmFyIFM9cmVxdWlyZShcIm9iamVjdC1hc3NpZ25cIik7cmVxdWlyZShcImZianMvbGliL3dhcm5pbmdcIik7dmFyIEE9cmVxdWlyZShcImZianMvbGliL2VtcHR5T2JqZWN0XCIpO3JlcXVpcmUoXCJmYmpzL2xpYi9pbnZhcmlhbnRcIik7dmFyIGo9cmVxdWlyZShcImZianMvbGliL2VtcHR5RnVuY3Rpb25cIikseD1yZXF1aXJlKFwicHJvcC10eXBlc1wiKSxxPXJlcXVpcmUoXCJwcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzXCIpLEM9cmVxdWlyZShcImNyZWF0ZS1yZWFjdC1jbGFzcy9mYWN0b3J5XCIpLFI9ZSxPPXtpc01vdW50ZWQ6ZnVuY3Rpb24oZSl7cmV0dXJuITF9LGVucXVldWVGb3JjZVVwZGF0ZTpmdW5jdGlvbihlLHIsbil7dChlLFwiZm9yY2VVcGRhdGVcIil9LGVucXVldWVSZXBsYWNlU3RhdGU6ZnVuY3Rpb24oZSxyLG4sbyl7dChlLFwicmVwbGFjZVN0YXRlXCIpfSxlbnF1ZXVlU2V0U3RhdGU6ZnVuY3Rpb24oZSxyLG4sbyl7dChlLFwic2V0U3RhdGVcIil9fSxUPU87ci5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudD17fSxyLnByb3RvdHlwZS5zZXRTdGF0ZT1mdW5jdGlvbihlLHQpe1wib2JqZWN0XCIhPXR5cGVvZiBlJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBlJiZudWxsIT1lJiZSKFwiODVcIiksdGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLGUsdCxcInNldFN0YXRlXCIpfSxyLnByb3RvdHlwZS5mb3JjZVVwZGF0ZT1mdW5jdGlvbihlKXt0aGlzLnVwZGF0ZXIuZW5xdWV1ZUZvcmNlVXBkYXRlKHRoaXMsZSxcImZvcmNlVXBkYXRlXCIpfSxvLnByb3RvdHlwZT1yLnByb3RvdHlwZSxuLnByb3RvdHlwZT1uZXcgbyxuLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1uLFMobi5wcm90b3R5cGUsci5wcm90b3R5cGUpLG4ucHJvdG90eXBlLmlzUHVyZVJlYWN0Q29tcG9uZW50PSEwO3ZhciAkPXtDb21wb25lbnQ6cixQdXJlQ29tcG9uZW50Om59LEY9ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcztpZih0Lmluc3RhbmNlUG9vbC5sZW5ndGgpe3ZhciByPXQuaW5zdGFuY2VQb29sLnBvcCgpO3JldHVybiB0LmNhbGwocixlKSxyfXJldHVybiBuZXcgdChlKX0sVT1mdW5jdGlvbihlLHQpe3ZhciByPXRoaXM7aWYoci5pbnN0YW5jZVBvb2wubGVuZ3RoKXt2YXIgbj1yLmluc3RhbmNlUG9vbC5wb3AoKTtyZXR1cm4gci5jYWxsKG4sZSx0KSxufXJldHVybiBuZXcgcihlLHQpfSxJPWZ1bmN0aW9uKGUsdCxyKXt2YXIgbj10aGlzO2lmKG4uaW5zdGFuY2VQb29sLmxlbmd0aCl7dmFyIG89bi5pbnN0YW5jZVBvb2wucG9wKCk7cmV0dXJuIG4uY2FsbChvLGUsdCxyKSxvfXJldHVybiBuZXcgbihlLHQscil9LFY9ZnVuY3Rpb24oZSx0LHIsbil7dmFyIG89dGhpcztpZihvLmluc3RhbmNlUG9vbC5sZW5ndGgpe3ZhciBpPW8uaW5zdGFuY2VQb29sLnBvcCgpO3JldHVybiBvLmNhbGwoaSxlLHQscixuKSxpfXJldHVybiBuZXcgbyhlLHQscixuKX0sRz1mdW5jdGlvbihlKXt2YXIgdD10aGlzO2UgaW5zdGFuY2VvZiB0fHxSKFwiMjVcIiksZS5kZXN0cnVjdG9yKCksdC5pbnN0YW5jZVBvb2wubGVuZ3RoPHQucG9vbFNpemUmJnQuaW5zdGFuY2VQb29sLnB1c2goZSl9LE09MTAsej1GLEQ9ZnVuY3Rpb24oZSx0KXt2YXIgcj1lO3JldHVybiByLmluc3RhbmNlUG9vbD1bXSxyLmdldFBvb2xlZD10fHx6LHIucG9vbFNpemV8fChyLnBvb2xTaXplPU0pLHIucmVsZWFzZT1HLHJ9LEs9e2FkZFBvb2xpbmdUbzpELG9uZUFyZ3VtZW50UG9vbGVyOkYsdHdvQXJndW1lbnRQb29sZXI6VSx0aHJlZUFyZ3VtZW50UG9vbGVyOkksZm91ckFyZ3VtZW50UG9vbGVyOlZ9LEw9SyxOPXtjdXJyZW50Om51bGx9LFc9TixCPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmU3ltYm9sLmZvciYmU3ltYm9sLmZvcihcInJlYWN0LmVsZW1lbnRcIil8fDYwMTAzLFk9QixIPU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksSj17a2V5OiEwLHJlZjohMCxfX3NlbGY6ITAsX19zb3VyY2U6ITB9LFE9ZnVuY3Rpb24oZSx0LHIsbixvLGksYSl7cmV0dXJueyQkdHlwZW9mOlksdHlwZTplLGtleTp0LHJlZjpyLHByb3BzOmEsX293bmVyOml9fTtRLmNyZWF0ZUVsZW1lbnQ9ZnVuY3Rpb24oZSx0LHIpe3ZhciBuLG89e30sbD1udWxsLHU9bnVsbCxjPW51bGwscz1udWxsO2lmKG51bGwhPXQpe2kodCkmJih1PXQucmVmKSxhKHQpJiYobD1cIlwiK3Qua2V5KSxjPXZvaWQgMD09PXQuX19zZWxmP251bGw6dC5fX3NlbGYscz12b2lkIDA9PT10Ll9fc291cmNlP251bGw6dC5fX3NvdXJjZTtmb3IobiBpbiB0KUguY2FsbCh0LG4pJiYhSi5oYXNPd25Qcm9wZXJ0eShuKSYmKG9bbl09dFtuXSl9dmFyIHA9YXJndW1lbnRzLmxlbmd0aC0yO2lmKDE9PT1wKW8uY2hpbGRyZW49cjtlbHNlIGlmKHA+MSl7Zm9yKHZhciBmPUFycmF5KHApLGQ9MDtkPHA7ZCsrKWZbZF09YXJndW1lbnRzW2QrMl07by5jaGlsZHJlbj1mfWlmKGUmJmUuZGVmYXVsdFByb3BzKXt2YXIgaD1lLmRlZmF1bHRQcm9wcztmb3IobiBpbiBoKXZvaWQgMD09PW9bbl0mJihvW25dPWhbbl0pfXJldHVybiBRKGUsbCx1LGMscyxXLmN1cnJlbnQsbyl9LFEuY3JlYXRlRmFjdG9yeT1mdW5jdGlvbihlKXt2YXIgdD1RLmNyZWF0ZUVsZW1lbnQuYmluZChudWxsLGUpO3JldHVybiB0LnR5cGU9ZSx0fSxRLmNsb25lQW5kUmVwbGFjZUtleT1mdW5jdGlvbihlLHQpe3JldHVybiBRKGUudHlwZSx0LGUucmVmLGUuX3NlbGYsZS5fc291cmNlLGUuX293bmVyLGUucHJvcHMpfSxRLmNsb25lRWxlbWVudD1mdW5jdGlvbihlLHQscil7dmFyIG4sbz1TKHt9LGUucHJvcHMpLGw9ZS5rZXksdT1lLnJlZixjPWUuX3NlbGYscz1lLl9zb3VyY2UscD1lLl9vd25lcjtpZihudWxsIT10KXtpKHQpJiYodT10LnJlZixwPVcuY3VycmVudCksYSh0KSYmKGw9XCJcIit0LmtleSk7dmFyIGY7ZS50eXBlJiZlLnR5cGUuZGVmYXVsdFByb3BzJiYoZj1lLnR5cGUuZGVmYXVsdFByb3BzKTtmb3IobiBpbiB0KUguY2FsbCh0LG4pJiYhSi5oYXNPd25Qcm9wZXJ0eShuKSYmKHZvaWQgMD09PXRbbl0mJnZvaWQgMCE9PWY/b1tuXT1mW25dOm9bbl09dFtuXSl9dmFyIGQ9YXJndW1lbnRzLmxlbmd0aC0yO2lmKDE9PT1kKW8uY2hpbGRyZW49cjtlbHNlIGlmKGQ+MSl7Zm9yKHZhciBoPUFycmF5KGQpLHk9MDt5PGQ7eSsrKWhbeV09YXJndW1lbnRzW3krMl07by5jaGlsZHJlbj1ofXJldHVybiBRKGUudHlwZSxsLHUsYyxzLHAsbyl9LFEuaXNWYWxpZEVsZW1lbnQ9ZnVuY3Rpb24oZSl7cmV0dXJuXCJvYmplY3RcIj09dHlwZW9mIGUmJm51bGwhPT1lJiZlLiQkdHlwZW9mPT09WX07dmFyIFg9USxaPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmU3ltYm9sLml0ZXJhdG9yLGVlPVwiQEBpdGVyYXRvclwiLHRlPWwscmU9e2VzY2FwZTp1LHVuZXNjYXBlOmN9LG5lPXJlLG9lPVwiLlwiLGllPVwiOlwiLGFlPWYsbGU9TC50d29Bcmd1bWVudFBvb2xlcix1ZT1MLmZvdXJBcmd1bWVudFBvb2xlcixjZT0vXFwvKy9nO2gucHJvdG90eXBlLmRlc3RydWN0b3I9ZnVuY3Rpb24oKXt0aGlzLmZ1bmM9bnVsbCx0aGlzLmNvbnRleHQ9bnVsbCx0aGlzLmNvdW50PTB9LEwuYWRkUG9vbGluZ1RvKGgsbGUpLGIucHJvdG90eXBlLmRlc3RydWN0b3I9ZnVuY3Rpb24oKXt0aGlzLnJlc3VsdD1udWxsLHRoaXMua2V5UHJlZml4PW51bGwsdGhpcy5mdW5jPW51bGwsdGhpcy5jb250ZXh0PW51bGwsdGhpcy5jb3VudD0wfSxMLmFkZFBvb2xpbmdUbyhiLHVlKTt2YXIgc2U9e2ZvckVhY2g6bSxtYXA6UCxtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsOmcsY291bnQ6Xyx0b0FycmF5OkV9LHBlPXNlLGZlPVguY3JlYXRlRmFjdG9yeSxkZT17YTpmZShcImFcIiksYWJicjpmZShcImFiYnJcIiksYWRkcmVzczpmZShcImFkZHJlc3NcIiksYXJlYTpmZShcImFyZWFcIiksYXJ0aWNsZTpmZShcImFydGljbGVcIiksYXNpZGU6ZmUoXCJhc2lkZVwiKSxhdWRpbzpmZShcImF1ZGlvXCIpLGI6ZmUoXCJiXCIpLGJhc2U6ZmUoXCJiYXNlXCIpLGJkaTpmZShcImJkaVwiKSxiZG86ZmUoXCJiZG9cIiksYmlnOmZlKFwiYmlnXCIpLGJsb2NrcXVvdGU6ZmUoXCJibG9ja3F1b3RlXCIpLGJvZHk6ZmUoXCJib2R5XCIpLGJyOmZlKFwiYnJcIiksYnV0dG9uOmZlKFwiYnV0dG9uXCIpLGNhbnZhczpmZShcImNhbnZhc1wiKSxjYXB0aW9uOmZlKFwiY2FwdGlvblwiKSxjaXRlOmZlKFwiY2l0ZVwiKSxjb2RlOmZlKFwiY29kZVwiKSxjb2w6ZmUoXCJjb2xcIiksY29sZ3JvdXA6ZmUoXCJjb2xncm91cFwiKSxkYXRhOmZlKFwiZGF0YVwiKSxkYXRhbGlzdDpmZShcImRhdGFsaXN0XCIpLGRkOmZlKFwiZGRcIiksZGVsOmZlKFwiZGVsXCIpLGRldGFpbHM6ZmUoXCJkZXRhaWxzXCIpLGRmbjpmZShcImRmblwiKSxkaWFsb2c6ZmUoXCJkaWFsb2dcIiksZGl2OmZlKFwiZGl2XCIpLGRsOmZlKFwiZGxcIiksZHQ6ZmUoXCJkdFwiKSxlbTpmZShcImVtXCIpLGVtYmVkOmZlKFwiZW1iZWRcIiksZmllbGRzZXQ6ZmUoXCJmaWVsZHNldFwiKSxmaWdjYXB0aW9uOmZlKFwiZmlnY2FwdGlvblwiKSxmaWd1cmU6ZmUoXCJmaWd1cmVcIiksZm9vdGVyOmZlKFwiZm9vdGVyXCIpLGZvcm06ZmUoXCJmb3JtXCIpLGgxOmZlKFwiaDFcIiksaDI6ZmUoXCJoMlwiKSxoMzpmZShcImgzXCIpLGg0OmZlKFwiaDRcIiksaDU6ZmUoXCJoNVwiKSxoNjpmZShcImg2XCIpLGhlYWQ6ZmUoXCJoZWFkXCIpLGhlYWRlcjpmZShcImhlYWRlclwiKSxoZ3JvdXA6ZmUoXCJoZ3JvdXBcIiksaHI6ZmUoXCJoclwiKSxodG1sOmZlKFwiaHRtbFwiKSxpOmZlKFwiaVwiKSxpZnJhbWU6ZmUoXCJpZnJhbWVcIiksaW1nOmZlKFwiaW1nXCIpLGlucHV0OmZlKFwiaW5wdXRcIiksaW5zOmZlKFwiaW5zXCIpLGtiZDpmZShcImtiZFwiKSxrZXlnZW46ZmUoXCJrZXlnZW5cIiksbGFiZWw6ZmUoXCJsYWJlbFwiKSxsZWdlbmQ6ZmUoXCJsZWdlbmRcIiksbGk6ZmUoXCJsaVwiKSxsaW5rOmZlKFwibGlua1wiKSxtYWluOmZlKFwibWFpblwiKSxtYXA6ZmUoXCJtYXBcIiksbWFyazpmZShcIm1hcmtcIiksbWVudTpmZShcIm1lbnVcIiksbWVudWl0ZW06ZmUoXCJtZW51aXRlbVwiKSxtZXRhOmZlKFwibWV0YVwiKSxtZXRlcjpmZShcIm1ldGVyXCIpLG5hdjpmZShcIm5hdlwiKSxub3NjcmlwdDpmZShcIm5vc2NyaXB0XCIpLG9iamVjdDpmZShcIm9iamVjdFwiKSxvbDpmZShcIm9sXCIpLG9wdGdyb3VwOmZlKFwib3B0Z3JvdXBcIiksb3B0aW9uOmZlKFwib3B0aW9uXCIpLG91dHB1dDpmZShcIm91dHB1dFwiKSxwOmZlKFwicFwiKSxwYXJhbTpmZShcInBhcmFtXCIpLHBpY3R1cmU6ZmUoXCJwaWN0dXJlXCIpLHByZTpmZShcInByZVwiKSxwcm9ncmVzczpmZShcInByb2dyZXNzXCIpLHE6ZmUoXCJxXCIpLHJwOmZlKFwicnBcIikscnQ6ZmUoXCJydFwiKSxydWJ5OmZlKFwicnVieVwiKSxzOmZlKFwic1wiKSxzYW1wOmZlKFwic2FtcFwiKSxzY3JpcHQ6ZmUoXCJzY3JpcHRcIiksc2VjdGlvbjpmZShcInNlY3Rpb25cIiksc2VsZWN0OmZlKFwic2VsZWN0XCIpLHNtYWxsOmZlKFwic21hbGxcIiksc291cmNlOmZlKFwic291cmNlXCIpLHNwYW46ZmUoXCJzcGFuXCIpLHN0cm9uZzpmZShcInN0cm9uZ1wiKSxzdHlsZTpmZShcInN0eWxlXCIpLHN1YjpmZShcInN1YlwiKSxzdW1tYXJ5OmZlKFwic3VtbWFyeVwiKSxzdXA6ZmUoXCJzdXBcIiksdGFibGU6ZmUoXCJ0YWJsZVwiKSx0Ym9keTpmZShcInRib2R5XCIpLHRkOmZlKFwidGRcIiksdGV4dGFyZWE6ZmUoXCJ0ZXh0YXJlYVwiKSx0Zm9vdDpmZShcInRmb290XCIpLHRoOmZlKFwidGhcIiksdGhlYWQ6ZmUoXCJ0aGVhZFwiKSx0aW1lOmZlKFwidGltZVwiKSx0aXRsZTpmZShcInRpdGxlXCIpLHRyOmZlKFwidHJcIiksdHJhY2s6ZmUoXCJ0cmFja1wiKSx1OmZlKFwidVwiKSx1bDpmZShcInVsXCIpLHZhcjpmZShcInZhclwiKSx2aWRlbzpmZShcInZpZGVvXCIpLHdicjpmZShcIndiclwiKSxjaXJjbGU6ZmUoXCJjaXJjbGVcIiksY2xpcFBhdGg6ZmUoXCJjbGlwUGF0aFwiKSxkZWZzOmZlKFwiZGVmc1wiKSxlbGxpcHNlOmZlKFwiZWxsaXBzZVwiKSxnOmZlKFwiZ1wiKSxpbWFnZTpmZShcImltYWdlXCIpLGxpbmU6ZmUoXCJsaW5lXCIpLGxpbmVhckdyYWRpZW50OmZlKFwibGluZWFyR3JhZGllbnRcIiksbWFzazpmZShcIm1hc2tcIikscGF0aDpmZShcInBhdGhcIikscGF0dGVybjpmZShcInBhdHRlcm5cIikscG9seWdvbjpmZShcInBvbHlnb25cIikscG9seWxpbmU6ZmUoXCJwb2x5bGluZVwiKSxyYWRpYWxHcmFkaWVudDpmZShcInJhZGlhbEdyYWRpZW50XCIpLHJlY3Q6ZmUoXCJyZWN0XCIpLHN0b3A6ZmUoXCJzdG9wXCIpLHN2ZzpmZShcInN2Z1wiKSx0ZXh0OmZlKFwidGV4dFwiKSx0c3BhbjpmZShcInRzcGFuXCIpfSxoZT1kZSx5ZT14LG1lPVwiMTYuMC4wLWFscGhhLjEyXCIsYmU9dyx2ZT0kLkNvbXBvbmVudCxnZT1YLmlzVmFsaWRFbGVtZW50LFBlPUModmUsZ2UsVCksa2U9WC5jcmVhdGVFbGVtZW50LF9lPVguY3JlYXRlRmFjdG9yeSxFZT1YLmNsb25lRWxlbWVudCx3ZT1mdW5jdGlvbihlKXtyZXR1cm4gZX0sU2U9e0NoaWxkcmVuOnttYXA6cGUubWFwLGZvckVhY2g6cGUuZm9yRWFjaCxjb3VudDpwZS5jb3VudCx0b0FycmF5OnBlLnRvQXJyYXksb25seTpiZX0sQ29tcG9uZW50OiQuQ29tcG9uZW50LFB1cmVDb21wb25lbnQ6JC5QdXJlQ29tcG9uZW50LGNyZWF0ZUVsZW1lbnQ6a2UsY2xvbmVFbGVtZW50OkVlLGlzVmFsaWRFbGVtZW50OlguaXNWYWxpZEVsZW1lbnQsUHJvcFR5cGVzOnllLGNoZWNrUHJvcFR5cGVzOnEsY3JlYXRlQ2xhc3M6UGUsY3JlYXRlRmFjdG9yeTpfZSxjcmVhdGVNaXhpbjp3ZSxET006aGUsdmVyc2lvbjptZSxfX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRDp7UmVhY3RDdXJyZW50T3duZXI6V319LEFlPVNlO21vZHVsZS5leHBvcnRzPUFlO1xuIiwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcbid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5kZXZlbG9wbWVudC5qcycpO1xufVxuXG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl5WldGamRDOXBibVJsZUM1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1cFppQW9jSEp2WTJWemN5NWxibll1VGs5RVJWOUZUbFlnUFQwOUlDZHdjbTlrZFdOMGFXOXVKeWtnZTF4dUlDQnRiMlIxYkdVdVpYaHdiM0owY3lBOUlISmxjWFZwY21Vb0p5NHZZMnB6TDNKbFlXTjBMbkJ5YjJSMVkzUnBiMjR1YldsdUxtcHpKeWs3WEc1OUlHVnNjMlVnZTF4dUlDQnRiMlIxYkdVdVpYaHdiM0owY3lBOUlISmxjWFZwY21Vb0p5NHZZMnB6TDNKbFlXTjBMbVJsZG1Wc2IzQnRaVzUwTG1wekp5azdYRzU5WEc0aVhYMD0iLCIoZnVuY3Rpb24gKHByb2Nlc3Mpe1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG52YXIgX2ludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbn1cblxudmFyIE1JWElOU19LRVkgPSAnbWl4aW5zJztcblxuLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGFsbG93IHRoZSBjcmVhdGlvbiBvZiBhbm9ueW1vdXMgZnVuY3Rpb25zIHdoaWNoIGRvIG5vdFxuLy8gaGF2ZSAubmFtZSBzZXQgdG8gdGhlIG5hbWUgb2YgdGhlIHZhcmlhYmxlIGJlaW5nIGFzc2lnbmVkIHRvLlxuZnVuY3Rpb24gaWRlbnRpdHkoZm4pIHtcbiAgcmV0dXJuIGZuO1xufVxuXG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXM7XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHtcbiAgICBwcm9wOiAncHJvcCcsXG4gICAgY29udGV4dDogJ2NvbnRleHQnLFxuICAgIGNoaWxkQ29udGV4dDogJ2NoaWxkIGNvbnRleHQnLFxuICB9O1xufSBlbHNlIHtcbiAgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSB7fTtcbn1cblxuZnVuY3Rpb24gZmFjdG9yeShSZWFjdENvbXBvbmVudCwgaXNWYWxpZEVsZW1lbnQsIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlKSB7XG4gIC8qKlxuICAgKiBQb2xpY2llcyB0aGF0IGRlc2NyaWJlIG1ldGhvZHMgaW4gYFJlYWN0Q2xhc3NJbnRlcmZhY2VgLlxuICAgKi9cblxuXG4gIHZhciBpbmplY3RlZE1peGlucyA9IFtdO1xuXG4gIC8qKlxuICAgKiBDb21wb3NpdGUgY29tcG9uZW50cyBhcmUgaGlnaGVyLWxldmVsIGNvbXBvbmVudHMgdGhhdCBjb21wb3NlIG90aGVyIGNvbXBvc2l0ZVxuICAgKiBvciBob3N0IGNvbXBvbmVudHMuXG4gICAqXG4gICAqIFRvIGNyZWF0ZSBhIG5ldyB0eXBlIG9mIGBSZWFjdENsYXNzYCwgcGFzcyBhIHNwZWNpZmljYXRpb24gb2ZcbiAgICogeW91ciBuZXcgY2xhc3MgdG8gYFJlYWN0LmNyZWF0ZUNsYXNzYC4gVGhlIG9ubHkgcmVxdWlyZW1lbnQgb2YgeW91ciBjbGFzc1xuICAgKiBzcGVjaWZpY2F0aW9uIGlzIHRoYXQgeW91IGltcGxlbWVudCBhIGByZW5kZXJgIG1ldGhvZC5cbiAgICpcbiAgICogICB2YXIgTXlDb21wb25lbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgKiAgICAgICByZXR1cm4gPGRpdj5IZWxsbyBXb3JsZDwvZGl2PjtcbiAgICogICAgIH1cbiAgICogICB9KTtcbiAgICpcbiAgICogVGhlIGNsYXNzIHNwZWNpZmljYXRpb24gc3VwcG9ydHMgYSBzcGVjaWZpYyBwcm90b2NvbCBvZiBtZXRob2RzIHRoYXQgaGF2ZVxuICAgKiBzcGVjaWFsIG1lYW5pbmcgKGUuZy4gYHJlbmRlcmApLiBTZWUgYFJlYWN0Q2xhc3NJbnRlcmZhY2VgIGZvclxuICAgKiBtb3JlIHRoZSBjb21wcmVoZW5zaXZlIHByb3RvY29sLiBBbnkgb3RoZXIgcHJvcGVydGllcyBhbmQgbWV0aG9kcyBpbiB0aGVcbiAgICogY2xhc3Mgc3BlY2lmaWNhdGlvbiB3aWxsIGJlIGF2YWlsYWJsZSBvbiB0aGUgcHJvdG90eXBlLlxuICAgKlxuICAgKiBAaW50ZXJmYWNlIFJlYWN0Q2xhc3NJbnRlcmZhY2VcbiAgICogQGludGVybmFsXG4gICAqL1xuICB2YXIgUmVhY3RDbGFzc0ludGVyZmFjZSA9IHtcblxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIE1peGluIG9iamVjdHMgdG8gaW5jbHVkZSB3aGVuIGRlZmluaW5nIHlvdXIgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHR5cGUge2FycmF5fVxuICAgICAqIEBvcHRpb25hbFxuICAgICAqL1xuICAgIG1peGluczogJ0RFRklORV9NQU5ZJyxcblxuICAgIC8qKlxuICAgICAqIEFuIG9iamVjdCBjb250YWluaW5nIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgdGhhdCBzaG91bGQgYmUgZGVmaW5lZCBvblxuICAgICAqIHRoZSBjb21wb25lbnQncyBjb25zdHJ1Y3RvciBpbnN0ZWFkIG9mIGl0cyBwcm90b3R5cGUgKHN0YXRpYyBtZXRob2RzKS5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICogQG9wdGlvbmFsXG4gICAgICovXG4gICAgc3RhdGljczogJ0RFRklORV9NQU5ZJyxcblxuICAgIC8qKlxuICAgICAqIERlZmluaXRpb24gb2YgcHJvcCB0eXBlcyBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAqIEBvcHRpb25hbFxuICAgICAqL1xuICAgIHByb3BUeXBlczogJ0RFRklORV9NQU5ZJyxcblxuICAgIC8qKlxuICAgICAqIERlZmluaXRpb24gb2YgY29udGV4dCB0eXBlcyBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAqIEBvcHRpb25hbFxuICAgICAqL1xuICAgIGNvbnRleHRUeXBlczogJ0RFRklORV9NQU5ZJyxcblxuICAgIC8qKlxuICAgICAqIERlZmluaXRpb24gb2YgY29udGV4dCB0eXBlcyB0aGlzIGNvbXBvbmVudCBzZXRzIGZvciBpdHMgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAqIEBvcHRpb25hbFxuICAgICAqL1xuICAgIGNoaWxkQ29udGV4dFR5cGVzOiAnREVGSU5FX01BTlknLFxuXG4gICAgLy8gPT09PSBEZWZpbml0aW9uIG1ldGhvZHMgPT09PVxuXG4gICAgLyoqXG4gICAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZC4gVmFsdWVzIGluIHRoZSBtYXBwaW5nIHdpbGwgYmUgc2V0IG9uXG4gICAgICogYHRoaXMucHJvcHNgIGlmIHRoYXQgcHJvcCBpcyBub3Qgc3BlY2lmaWVkIChpLmUuIHVzaW5nIGFuIGBpbmAgY2hlY2spLlxuICAgICAqXG4gICAgICogVGhpcyBtZXRob2QgaXMgaW52b2tlZCBiZWZvcmUgYGdldEluaXRpYWxTdGF0ZWAgYW5kIHRoZXJlZm9yZSBjYW5ub3QgcmVseVxuICAgICAqIG9uIGB0aGlzLnN0YXRlYCBvciB1c2UgYHRoaXMuc2V0U3RhdGVgLlxuICAgICAqXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxuICAgICAqIEBvcHRpb25hbFxuICAgICAqL1xuICAgIGdldERlZmF1bHRQcm9wczogJ0RFRklORV9NQU5ZX01FUkdFRCcsXG5cbiAgICAvKipcbiAgICAgKiBJbnZva2VkIG9uY2UgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZC4gVGhlIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWRcbiAgICAgKiBhcyB0aGUgaW5pdGlhbCB2YWx1ZSBvZiBgdGhpcy5zdGF0ZWAuXG4gICAgICpcbiAgICAgKiAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICogICAgIHJldHVybiB7XG4gICAgICogICAgICAgaXNPbjogZmFsc2UsXG4gICAgICogICAgICAgZm9vQmF6OiBuZXcgQmF6Rm9vKClcbiAgICAgKiAgICAgfVxuICAgICAqICAgfVxuICAgICAqXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxuICAgICAqIEBvcHRpb25hbFxuICAgICAqL1xuICAgIGdldEluaXRpYWxTdGF0ZTogJ0RFRklORV9NQU5ZX01FUkdFRCcsXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAgICogQG9wdGlvbmFsXG4gICAgICovXG4gICAgZ2V0Q2hpbGRDb250ZXh0OiAnREVGSU5FX01BTllfTUVSR0VEJyxcblxuICAgIC8qKlxuICAgICAqIFVzZXMgcHJvcHMgZnJvbSBgdGhpcy5wcm9wc2AgYW5kIHN0YXRlIGZyb20gYHRoaXMuc3RhdGVgIHRvIHJlbmRlciB0aGVcbiAgICAgKiBzdHJ1Y3R1cmUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIE5vIGd1YXJhbnRlZXMgYXJlIG1hZGUgYWJvdXQgd2hlbiBvciBob3cgb2Z0ZW4gdGhpcyBtZXRob2QgaXMgaW52b2tlZCwgc29cbiAgICAgKiBpdCBtdXN0IG5vdCBoYXZlIHNpZGUgZWZmZWN0cy5cbiAgICAgKlxuICAgICAqICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgdmFyIG5hbWUgPSB0aGlzLnByb3BzLm5hbWU7XG4gICAgICogICAgIHJldHVybiA8ZGl2PkhlbGxvLCB7bmFtZX0hPC9kaXY+O1xuICAgICAqICAgfVxuICAgICAqXG4gICAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnR9XG4gICAgICogQG5vc2lkZWVmZmVjdHNcbiAgICAgKiBAcmVxdWlyZWRcbiAgICAgKi9cbiAgICByZW5kZXI6ICdERUZJTkVfT05DRScsXG5cbiAgICAvLyA9PT09IERlbGVnYXRlIG1ldGhvZHMgPT09PVxuXG4gICAgLyoqXG4gICAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgaW5pdGlhbGx5IGNyZWF0ZWQgYW5kIGFib3V0IHRvIGJlIG1vdW50ZWQuXG4gICAgICogVGhpcyBtYXkgaGF2ZSBzaWRlIGVmZmVjdHMsIGJ1dCBhbnkgZXh0ZXJuYWwgc3Vic2NyaXB0aW9ucyBvciBkYXRhIGNyZWF0ZWRcbiAgICAgKiBieSB0aGlzIG1ldGhvZCBtdXN0IGJlIGNsZWFuZWQgdXAgaW4gYGNvbXBvbmVudFdpbGxVbm1vdW50YC5cbiAgICAgKlxuICAgICAqIEBvcHRpb25hbFxuICAgICAqL1xuICAgIGNvbXBvbmVudFdpbGxNb3VudDogJ0RFRklORV9NQU5ZJyxcblxuICAgIC8qKlxuICAgICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIG1vdW50ZWQgYW5kIGhhcyBhIERPTSByZXByZXNlbnRhdGlvbi5cbiAgICAgKiBIb3dldmVyLCB0aGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCB0aGUgRE9NIG5vZGUgaXMgaW4gdGhlIGRvY3VtZW50LlxuICAgICAqXG4gICAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gb3BlcmF0ZSBvbiB0aGUgRE9NIHdoZW4gdGhlIGNvbXBvbmVudCBoYXNcbiAgICAgKiBiZWVuIG1vdW50ZWQgKGluaXRpYWxpemVkIGFuZCByZW5kZXJlZCkgZm9yIHRoZSBmaXJzdCB0aW1lLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtET01FbGVtZW50fSByb290Tm9kZSBET00gZWxlbWVudCByZXByZXNlbnRpbmcgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAb3B0aW9uYWxcbiAgICAgKi9cbiAgICBjb21wb25lbnREaWRNb3VudDogJ0RFRklORV9NQU5ZJyxcblxuICAgIC8qKlxuICAgICAqIEludm9rZWQgYmVmb3JlIHRoZSBjb21wb25lbnQgcmVjZWl2ZXMgbmV3IHByb3BzLlxuICAgICAqXG4gICAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gcmVhY3QgdG8gYSBwcm9wIHRyYW5zaXRpb24gYnkgdXBkYXRpbmcgdGhlXG4gICAgICogc3RhdGUgdXNpbmcgYHRoaXMuc2V0U3RhdGVgLiBDdXJyZW50IHByb3BzIGFyZSBhY2Nlc3NlZCB2aWEgYHRoaXMucHJvcHNgLlxuICAgICAqXG4gICAgICogICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRDb250ZXh0KSB7XG4gICAgICogICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAqICAgICAgIGxpa2VzSW5jcmVhc2luZzogbmV4dFByb3BzLmxpa2VDb3VudCA+IHRoaXMucHJvcHMubGlrZUNvdW50XG4gICAgICogICAgIH0pO1xuICAgICAqICAgfVxuICAgICAqXG4gICAgICogTk9URTogVGhlcmUgaXMgbm8gZXF1aXZhbGVudCBgY29tcG9uZW50V2lsbFJlY2VpdmVTdGF0ZWAuIEFuIGluY29taW5nIHByb3BcbiAgICAgKiB0cmFuc2l0aW9uIG1heSBjYXVzZSBhIHN0YXRlIGNoYW5nZSwgYnV0IHRoZSBvcHBvc2l0ZSBpcyBub3QgdHJ1ZS4gSWYgeW91XG4gICAgICogbmVlZCBpdCwgeW91IGFyZSBwcm9iYWJseSBsb29raW5nIGZvciBgY29tcG9uZW50V2lsbFVwZGF0ZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzXG4gICAgICogQG9wdGlvbmFsXG4gICAgICovXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogJ0RFRklORV9NQU5ZJyxcblxuICAgIC8qKlxuICAgICAqIEludm9rZWQgd2hpbGUgZGVjaWRpbmcgaWYgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgdXBkYXRlZCBhcyBhIHJlc3VsdCBvZlxuICAgICAqIHJlY2VpdmluZyBuZXcgcHJvcHMsIHN0YXRlIGFuZC9vciBjb250ZXh0LlxuICAgICAqXG4gICAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gYHJldHVybiBmYWxzZWAgd2hlbiB5b3UncmUgY2VydGFpbiB0aGF0IHRoZVxuICAgICAqIHRyYW5zaXRpb24gdG8gdGhlIG5ldyBwcm9wcy9zdGF0ZS9jb250ZXh0IHdpbGwgbm90IHJlcXVpcmUgYSBjb21wb25lbnRcbiAgICAgKiB1cGRhdGUuXG4gICAgICpcbiAgICAgKiAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KSB7XG4gICAgICogICAgIHJldHVybiAhZXF1YWwobmV4dFByb3BzLCB0aGlzLnByb3BzKSB8fFxuICAgICAqICAgICAgICFlcXVhbChuZXh0U3RhdGUsIHRoaXMuc3RhdGUpIHx8XG4gICAgICogICAgICAgIWVxdWFsKG5leHRDb250ZXh0LCB0aGlzLmNvbnRleHQpO1xuICAgICAqICAgfVxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dFN0YXRlXG4gICAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q29udGV4dFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIGNvbXBvbmVudCBzaG91bGQgdXBkYXRlLlxuICAgICAqIEBvcHRpb25hbFxuICAgICAqL1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogJ0RFRklORV9PTkNFJyxcblxuICAgIC8qKlxuICAgICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGFib3V0IHRvIHVwZGF0ZSBkdWUgdG8gYSB0cmFuc2l0aW9uIGZyb21cbiAgICAgKiBgdGhpcy5wcm9wc2AsIGB0aGlzLnN0YXRlYCBhbmQgYHRoaXMuY29udGV4dGAgdG8gYG5leHRQcm9wc2AsIGBuZXh0U3RhdGVgXG4gICAgICogYW5kIGBuZXh0Q29udGV4dGAuXG4gICAgICpcbiAgICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBwZXJmb3JtIHByZXBhcmF0aW9uIGJlZm9yZSBhbiB1cGRhdGUgb2NjdXJzLlxuICAgICAqXG4gICAgICogTk9URTogWW91ICoqY2Fubm90KiogdXNlIGB0aGlzLnNldFN0YXRlKClgIGluIHRoaXMgbWV0aG9kLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dFN0YXRlXG4gICAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q29udGV4dFxuICAgICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICAgKiBAb3B0aW9uYWxcbiAgICAgKi9cbiAgICBjb21wb25lbnRXaWxsVXBkYXRlOiAnREVGSU5FX01BTlknLFxuXG4gICAgLyoqXG4gICAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQncyBET00gcmVwcmVzZW50YXRpb24gaGFzIGJlZW4gdXBkYXRlZC5cbiAgICAgKlxuICAgICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIG9wZXJhdGUgb24gdGhlIERPTSB3aGVuIHRoZSBjb21wb25lbnQgaGFzXG4gICAgICogYmVlbiB1cGRhdGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHByZXZQcm9wc1xuICAgICAqIEBwYXJhbSB7P29iamVjdH0gcHJldlN0YXRlXG4gICAgICogQHBhcmFtIHs/b2JqZWN0fSBwcmV2Q29udGV4dFxuICAgICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gcm9vdE5vZGUgRE9NIGVsZW1lbnQgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQuXG4gICAgICogQG9wdGlvbmFsXG4gICAgICovXG4gICAgY29tcG9uZW50RGlkVXBkYXRlOiAnREVGSU5FX01BTlknLFxuXG4gICAgLyoqXG4gICAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgYWJvdXQgdG8gYmUgcmVtb3ZlZCBmcm9tIGl0cyBwYXJlbnQgYW5kIGhhdmVcbiAgICAgKiBpdHMgRE9NIHJlcHJlc2VudGF0aW9uIGRlc3Ryb3llZC5cbiAgICAgKlxuICAgICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIGRlYWxsb2NhdGUgYW55IGV4dGVybmFsIHJlc291cmNlcy5cbiAgICAgKlxuICAgICAqIE5PVEU6IFRoZXJlIGlzIG5vIGBjb21wb25lbnREaWRVbm1vdW50YCBzaW5jZSB5b3VyIGNvbXBvbmVudCB3aWxsIGhhdmUgYmVlblxuICAgICAqIGRlc3Ryb3llZCBieSB0aGF0IHBvaW50LlxuICAgICAqXG4gICAgICogQG9wdGlvbmFsXG4gICAgICovXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQ6ICdERUZJTkVfTUFOWScsXG5cbiAgICAvLyA9PT09IEFkdmFuY2VkIG1ldGhvZHMgPT09PVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgY29tcG9uZW50J3MgY3VycmVudGx5IG1vdW50ZWQgRE9NIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQnkgZGVmYXVsdCwgdGhpcyBpbXBsZW1lbnRzIFJlYWN0J3MgcmVuZGVyaW5nIGFuZCByZWNvbmNpbGlhdGlvbiBhbGdvcml0aG0uXG4gICAgICogU29waGlzdGljYXRlZCBjbGllbnRzIG1heSB3aXNoIHRvIG92ZXJyaWRlIHRoaXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAgICogQGludGVybmFsXG4gICAgICogQG92ZXJyaWRhYmxlXG4gICAgICovXG4gICAgdXBkYXRlQ29tcG9uZW50OiAnT1ZFUlJJREVfQkFTRSdcblxuICB9O1xuXG4gIC8qKlxuICAgKiBNYXBwaW5nIGZyb20gY2xhc3Mgc3BlY2lmaWNhdGlvbiBrZXlzIHRvIHNwZWNpYWwgcHJvY2Vzc2luZyBmdW5jdGlvbnMuXG4gICAqXG4gICAqIEFsdGhvdWdoIHRoZXNlIGFyZSBkZWNsYXJlZCBsaWtlIGluc3RhbmNlIHByb3BlcnRpZXMgaW4gdGhlIHNwZWNpZmljYXRpb25cbiAgICogd2hlbiBkZWZpbmluZyBjbGFzc2VzIHVzaW5nIGBSZWFjdC5jcmVhdGVDbGFzc2AsIHRoZXkgYXJlIGFjdHVhbGx5IHN0YXRpY1xuICAgKiBhbmQgYXJlIGFjY2Vzc2libGUgb24gdGhlIGNvbnN0cnVjdG9yIGluc3RlYWQgb2YgdGhlIHByb3RvdHlwZS4gRGVzcGl0ZVxuICAgKiBiZWluZyBzdGF0aWMsIHRoZXkgbXVzdCBiZSBkZWZpbmVkIG91dHNpZGUgb2YgdGhlIFwic3RhdGljc1wiIGtleSB1bmRlclxuICAgKiB3aGljaCBhbGwgb3RoZXIgc3RhdGljIG1ldGhvZHMgYXJlIGRlZmluZWQuXG4gICAqL1xuICB2YXIgUkVTRVJWRURfU1BFQ19LRVlTID0ge1xuICAgIGRpc3BsYXlOYW1lOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGRpc3BsYXlOYW1lKSB7XG4gICAgICBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuICAgIH0sXG4gICAgbWl4aW5zOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIG1peGlucykge1xuICAgICAgaWYgKG1peGlucykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1peGlucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIG1peFNwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBtaXhpbnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBjaGlsZENvbnRleHRUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBjaGlsZENvbnRleHRUeXBlcykge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBjaGlsZENvbnRleHRUeXBlcywgJ2NoaWxkQ29udGV4dCcpO1xuICAgICAgfVxuICAgICAgQ29uc3RydWN0b3IuY2hpbGRDb250ZXh0VHlwZXMgPSBfYXNzaWduKHt9LCBDb25zdHJ1Y3Rvci5jaGlsZENvbnRleHRUeXBlcywgY2hpbGRDb250ZXh0VHlwZXMpO1xuICAgIH0sXG4gICAgY29udGV4dFR5cGVzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGNvbnRleHRUeXBlcykge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBjb250ZXh0VHlwZXMsICdjb250ZXh0Jyk7XG4gICAgICB9XG4gICAgICBDb25zdHJ1Y3Rvci5jb250ZXh0VHlwZXMgPSBfYXNzaWduKHt9LCBDb25zdHJ1Y3Rvci5jb250ZXh0VHlwZXMsIGNvbnRleHRUeXBlcyk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBTcGVjaWFsIGNhc2UgZ2V0RGVmYXVsdFByb3BzIHdoaWNoIHNob3VsZCBtb3ZlIGludG8gc3RhdGljcyBidXQgcmVxdWlyZXNcbiAgICAgKiBhdXRvbWF0aWMgbWVyZ2luZy5cbiAgICAgKi9cbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcyA9IGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcywgZ2V0RGVmYXVsdFByb3BzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcyA9IGdldERlZmF1bHRQcm9wcztcbiAgICAgIH1cbiAgICB9LFxuICAgIHByb3BUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm9wVHlwZXMpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHZhbGlkYXRlVHlwZURlZihDb25zdHJ1Y3RvciwgcHJvcFR5cGVzLCAncHJvcCcpO1xuICAgICAgfVxuICAgICAgQ29uc3RydWN0b3IucHJvcFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IucHJvcFR5cGVzLCBwcm9wVHlwZXMpO1xuICAgIH0sXG4gICAgc3RhdGljczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBzdGF0aWNzKSB7XG4gICAgICBtaXhTdGF0aWNTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3RhdGljcyk7XG4gICAgfSxcbiAgICBhdXRvYmluZDogZnVuY3Rpb24gKCkge30gfTtcblxuICBmdW5jdGlvbiB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIHR5cGVEZWYsIGxvY2F0aW9uKSB7XG4gICAgZm9yICh2YXIgcHJvcE5hbWUgaW4gdHlwZURlZikge1xuICAgICAgaWYgKHR5cGVEZWYuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIC8vIHVzZSBhIHdhcm5pbmcgaW5zdGVhZCBvZiBhbiBfaW52YXJpYW50IHNvIGNvbXBvbmVudHNcbiAgICAgICAgLy8gZG9uJ3Qgc2hvdyB1cCBpbiBwcm9kIGJ1dCBvbmx5IGluIF9fREVWX19cbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcodHlwZW9mIHR5cGVEZWZbcHJvcE5hbWVdID09PSAnZnVuY3Rpb24nLCAnJXM6ICVzIHR5cGUgYCVzYCBpcyBpbnZhbGlkOyBpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSAnICsgJ1JlYWN0LlByb3BUeXBlcy4nLCBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCAnUmVhY3RDbGFzcycsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXSwgcHJvcE5hbWUpIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlTWV0aG9kT3ZlcnJpZGUoaXNBbHJlYWR5RGVmaW5lZCwgbmFtZSkge1xuICAgIHZhciBzcGVjUG9saWN5ID0gUmVhY3RDbGFzc0ludGVyZmFjZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IFJlYWN0Q2xhc3NJbnRlcmZhY2VbbmFtZV0gOiBudWxsO1xuXG4gICAgLy8gRGlzYWxsb3cgb3ZlcnJpZGluZyBvZiBiYXNlIGNsYXNzIG1ldGhvZHMgdW5sZXNzIGV4cGxpY2l0bHkgYWxsb3dlZC5cbiAgICBpZiAoUmVhY3RDbGFzc01peGluLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBfaW52YXJpYW50KHNwZWNQb2xpY3kgPT09ICdPVkVSUklERV9CQVNFJywgJ1JlYWN0Q2xhc3NJbnRlcmZhY2U6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBvdmVycmlkZSAnICsgJ2Alc2AgZnJvbSB5b3VyIGNsYXNzIHNwZWNpZmljYXRpb24uIEVuc3VyZSB0aGF0IHlvdXIgbWV0aG9kIG5hbWVzICcgKyAnZG8gbm90IG92ZXJsYXAgd2l0aCBSZWFjdCBtZXRob2RzLicsIG5hbWUpO1xuICAgIH1cblxuICAgIC8vIERpc2FsbG93IGRlZmluaW5nIG1ldGhvZHMgbW9yZSB0aGFuIG9uY2UgdW5sZXNzIGV4cGxpY2l0bHkgYWxsb3dlZC5cbiAgICBpZiAoaXNBbHJlYWR5RGVmaW5lZCkge1xuICAgICAgX2ludmFyaWFudChzcGVjUG9saWN5ID09PSAnREVGSU5FX01BTlknIHx8IHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWV9NRVJHRUQnLCAnUmVhY3RDbGFzc0ludGVyZmFjZTogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSAnICsgJ2Alc2Agb24geW91ciBjb21wb25lbnQgbW9yZSB0aGFuIG9uY2UuIFRoaXMgY29uZmxpY3QgbWF5IGJlIGR1ZSAnICsgJ3RvIGEgbWl4aW4uJywgbmFtZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1peGluIGhlbHBlciB3aGljaCBoYW5kbGVzIHBvbGljeSB2YWxpZGF0aW9uIGFuZCByZXNlcnZlZFxuICAgKiBzcGVjaWZpY2F0aW9uIGtleXMgd2hlbiBidWlsZGluZyBSZWFjdCBjbGFzc2VzLlxuICAgKi9cbiAgZnVuY3Rpb24gbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHNwZWMpIHtcbiAgICBpZiAoIXNwZWMpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHZhciB0eXBlb2ZTcGVjID0gdHlwZW9mIHNwZWM7XG4gICAgICAgIHZhciBpc01peGluVmFsaWQgPSB0eXBlb2ZTcGVjID09PSAnb2JqZWN0JyAmJiBzcGVjICE9PSBudWxsO1xuXG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGlzTWl4aW5WYWxpZCwgJyVzOiBZb3VcXCdyZSBhdHRlbXB0aW5nIHRvIGluY2x1ZGUgYSBtaXhpbiB0aGF0IGlzIGVpdGhlciBudWxsICcgKyAnb3Igbm90IGFuIG9iamVjdC4gQ2hlY2sgdGhlIG1peGlucyBpbmNsdWRlZCBieSB0aGUgY29tcG9uZW50LCAnICsgJ2FzIHdlbGwgYXMgYW55IG1peGlucyB0aGV5IGluY2x1ZGUgdGhlbXNlbHZlcy4gJyArICdFeHBlY3RlZCBvYmplY3QgYnV0IGdvdCAlcy4nLCBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCAnUmVhY3RDbGFzcycsIHNwZWMgPT09IG51bGwgPyBudWxsIDogdHlwZW9mU3BlYykgOiB2b2lkIDA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBfaW52YXJpYW50KHR5cGVvZiBzcGVjICE9PSAnZnVuY3Rpb24nLCAnUmVhY3RDbGFzczogWW91XFwncmUgYXR0ZW1wdGluZyB0byAnICsgJ3VzZSBhIGNvbXBvbmVudCBjbGFzcyBvciBmdW5jdGlvbiBhcyBhIG1peGluLiBJbnN0ZWFkLCBqdXN0IHVzZSBhICcgKyAncmVndWxhciBvYmplY3QuJyk7XG4gICAgX2ludmFyaWFudCghaXNWYWxpZEVsZW1lbnQoc3BlYyksICdSZWFjdENsYXNzOiBZb3VcXCdyZSBhdHRlbXB0aW5nIHRvICcgKyAndXNlIGEgY29tcG9uZW50IGFzIGEgbWl4aW4uIEluc3RlYWQsIGp1c3QgdXNlIGEgcmVndWxhciBvYmplY3QuJyk7XG5cbiAgICB2YXIgcHJvdG8gPSBDb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgdmFyIGF1dG9CaW5kUGFpcnMgPSBwcm90by5fX3JlYWN0QXV0b0JpbmRQYWlycztcblxuICAgIC8vIEJ5IGhhbmRsaW5nIG1peGlucyBiZWZvcmUgYW55IG90aGVyIHByb3BlcnRpZXMsIHdlIGVuc3VyZSB0aGUgc2FtZVxuICAgIC8vIGNoYWluaW5nIG9yZGVyIGlzIGFwcGxpZWQgdG8gbWV0aG9kcyB3aXRoIERFRklORV9NQU5ZIHBvbGljeSwgd2hldGhlclxuICAgIC8vIG1peGlucyBhcmUgbGlzdGVkIGJlZm9yZSBvciBhZnRlciB0aGVzZSBtZXRob2RzIGluIHRoZSBzcGVjLlxuICAgIGlmIChzcGVjLmhhc093blByb3BlcnR5KE1JWElOU19LRVkpKSB7XG4gICAgICBSRVNFUlZFRF9TUEVDX0tFWVMubWl4aW5zKENvbnN0cnVjdG9yLCBzcGVjLm1peGlucyk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgbmFtZSBpbiBzcGVjKSB7XG4gICAgICBpZiAoIXNwZWMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChuYW1lID09PSBNSVhJTlNfS0VZKSB7XG4gICAgICAgIC8vIFdlIGhhdmUgYWxyZWFkeSBoYW5kbGVkIG1peGlucyBpbiBhIHNwZWNpYWwgY2FzZSBhYm92ZS5cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBwcm9wZXJ0eSA9IHNwZWNbbmFtZV07XG4gICAgICB2YXIgaXNBbHJlYWR5RGVmaW5lZCA9IHByb3RvLmhhc093blByb3BlcnR5KG5hbWUpO1xuICAgICAgdmFsaWRhdGVNZXRob2RPdmVycmlkZShpc0FscmVhZHlEZWZpbmVkLCBuYW1lKTtcblxuICAgICAgaWYgKFJFU0VSVkVEX1NQRUNfS0VZUy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBSRVNFUlZFRF9TUEVDX0tFWVNbbmFtZV0oQ29uc3RydWN0b3IsIHByb3BlcnR5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNldHVwIG1ldGhvZHMgb24gcHJvdG90eXBlOlxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIG1lbWJlciBtZXRob2RzIHNob3VsZCBub3QgYmUgYXV0b21hdGljYWxseSBib3VuZDpcbiAgICAgICAgLy8gMS4gRXhwZWN0ZWQgUmVhY3RDbGFzcyBtZXRob2RzIChpbiB0aGUgXCJpbnRlcmZhY2VcIikuXG4gICAgICAgIC8vIDIuIE92ZXJyaWRkZW4gbWV0aG9kcyAodGhhdCB3ZXJlIG1peGVkIGluKS5cbiAgICAgICAgdmFyIGlzUmVhY3RDbGFzc01ldGhvZCA9IFJlYWN0Q2xhc3NJbnRlcmZhY2UuaGFzT3duUHJvcGVydHkobmFtZSk7XG4gICAgICAgIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIHByb3BlcnR5ID09PSAnZnVuY3Rpb24nO1xuICAgICAgICB2YXIgc2hvdWxkQXV0b0JpbmQgPSBpc0Z1bmN0aW9uICYmICFpc1JlYWN0Q2xhc3NNZXRob2QgJiYgIWlzQWxyZWFkeURlZmluZWQgJiYgc3BlYy5hdXRvYmluZCAhPT0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHNob3VsZEF1dG9CaW5kKSB7XG4gICAgICAgICAgYXV0b0JpbmRQYWlycy5wdXNoKG5hbWUsIHByb3BlcnR5KTtcbiAgICAgICAgICBwcm90b1tuYW1lXSA9IHByb3BlcnR5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpc0FscmVhZHlEZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgc3BlY1BvbGljeSA9IFJlYWN0Q2xhc3NJbnRlcmZhY2VbbmFtZV07XG5cbiAgICAgICAgICAgIC8vIFRoZXNlIGNhc2VzIHNob3VsZCBhbHJlYWR5IGJlIGNhdWdodCBieSB2YWxpZGF0ZU1ldGhvZE92ZXJyaWRlLlxuICAgICAgICAgICAgX2ludmFyaWFudChpc1JlYWN0Q2xhc3NNZXRob2QgJiYgKHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWV9NRVJHRUQnIHx8IHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWScpLCAnUmVhY3RDbGFzczogVW5leHBlY3RlZCBzcGVjIHBvbGljeSAlcyBmb3Iga2V5ICVzICcgKyAnd2hlbiBtaXhpbmcgaW4gY29tcG9uZW50IHNwZWNzLicsIHNwZWNQb2xpY3ksIG5hbWUpO1xuXG4gICAgICAgICAgICAvLyBGb3IgbWV0aG9kcyB3aGljaCBhcmUgZGVmaW5lZCBtb3JlIHRoYW4gb25jZSwgY2FsbCB0aGUgZXhpc3RpbmdcbiAgICAgICAgICAgIC8vIG1ldGhvZHMgYmVmb3JlIGNhbGxpbmcgdGhlIG5ldyBwcm9wZXJ0eSwgbWVyZ2luZyBpZiBhcHByb3ByaWF0ZS5cbiAgICAgICAgICAgIGlmIChzcGVjUG9saWN5ID09PSAnREVGSU5FX01BTllfTUVSR0VEJykge1xuICAgICAgICAgICAgICBwcm90b1tuYW1lXSA9IGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKHByb3RvW25hbWVdLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWScpIHtcbiAgICAgICAgICAgICAgcHJvdG9bbmFtZV0gPSBjcmVhdGVDaGFpbmVkRnVuY3Rpb24ocHJvdG9bbmFtZV0sIHByb3BlcnR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvdG9bbmFtZV0gPSBwcm9wZXJ0eTtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgIC8vIEFkZCB2ZXJib3NlIGRpc3BsYXlOYW1lIHRvIHRoZSBmdW5jdGlvbiwgd2hpY2ggaGVscHMgd2hlbiBsb29raW5nXG4gICAgICAgICAgICAgIC8vIGF0IHByb2ZpbGluZyB0b29scy5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJyAmJiBzcGVjLmRpc3BsYXlOYW1lKSB7XG4gICAgICAgICAgICAgICAgcHJvdG9bbmFtZV0uZGlzcGxheU5hbWUgPSBzcGVjLmRpc3BsYXlOYW1lICsgJ18nICsgbmFtZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1peFN0YXRpY1NwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBzdGF0aWNzKSB7XG4gICAgaWYgKCFzdGF0aWNzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAodmFyIG5hbWUgaW4gc3RhdGljcykge1xuICAgICAgdmFyIHByb3BlcnR5ID0gc3RhdGljc1tuYW1lXTtcbiAgICAgIGlmICghc3RhdGljcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGlzUmVzZXJ2ZWQgPSBuYW1lIGluIFJFU0VSVkVEX1NQRUNfS0VZUztcbiAgICAgIF9pbnZhcmlhbnQoIWlzUmVzZXJ2ZWQsICdSZWFjdENsYXNzOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lIGEgcmVzZXJ2ZWQgJyArICdwcm9wZXJ0eSwgYCVzYCwgdGhhdCBzaG91bGRuXFwndCBiZSBvbiB0aGUgXCJzdGF0aWNzXCIga2V5LiBEZWZpbmUgaXQgJyArICdhcyBhbiBpbnN0YW5jZSBwcm9wZXJ0eSBpbnN0ZWFkOyBpdCB3aWxsIHN0aWxsIGJlIGFjY2Vzc2libGUgb24gdGhlICcgKyAnY29uc3RydWN0b3IuJywgbmFtZSk7XG5cbiAgICAgIHZhciBpc0luaGVyaXRlZCA9IG5hbWUgaW4gQ29uc3RydWN0b3I7XG4gICAgICBfaW52YXJpYW50KCFpc0luaGVyaXRlZCwgJ1JlYWN0Q2xhc3M6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBkZWZpbmUgJyArICdgJXNgIG9uIHlvdXIgY29tcG9uZW50IG1vcmUgdGhhbiBvbmNlLiBUaGlzIGNvbmZsaWN0IG1heSBiZSAnICsgJ2R1ZSB0byBhIG1peGluLicsIG5hbWUpO1xuICAgICAgQ29uc3RydWN0b3JbbmFtZV0gPSBwcm9wZXJ0eTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWVyZ2UgdHdvIG9iamVjdHMsIGJ1dCB0aHJvdyBpZiBib3RoIGNvbnRhaW4gdGhlIHNhbWUga2V5LlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb25lIFRoZSBmaXJzdCBvYmplY3QsIHdoaWNoIGlzIG11dGF0ZWQuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSB0d28gVGhlIHNlY29uZCBvYmplY3RcbiAgICogQHJldHVybiB7b2JqZWN0fSBvbmUgYWZ0ZXIgaXQgaGFzIGJlZW4gbXV0YXRlZCB0byBjb250YWluIGV2ZXJ5dGhpbmcgaW4gdHdvLlxuICAgKi9cbiAgZnVuY3Rpb24gbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cyhvbmUsIHR3bykge1xuICAgIF9pbnZhcmlhbnQob25lICYmIHR3byAmJiB0eXBlb2Ygb25lID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdHdvID09PSAnb2JqZWN0JywgJ21lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoKTogQ2Fubm90IG1lcmdlIG5vbi1vYmplY3RzLicpO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHR3bykge1xuICAgICAgaWYgKHR3by5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIF9pbnZhcmlhbnQob25lW2tleV0gPT09IHVuZGVmaW5lZCwgJ21lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoKTogJyArICdUcmllZCB0byBtZXJnZSB0d28gb2JqZWN0cyB3aXRoIHRoZSBzYW1lIGtleTogYCVzYC4gVGhpcyBjb25mbGljdCAnICsgJ21heSBiZSBkdWUgdG8gYSBtaXhpbjsgaW4gcGFydGljdWxhciwgdGhpcyBtYXkgYmUgY2F1c2VkIGJ5IHR3byAnICsgJ2dldEluaXRpYWxTdGF0ZSgpIG9yIGdldERlZmF1bHRQcm9wcygpIG1ldGhvZHMgcmV0dXJuaW5nIG9iamVjdHMgJyArICd3aXRoIGNsYXNoaW5nIGtleXMuJywga2V5KTtcbiAgICAgICAgb25lW2tleV0gPSB0d29ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9uZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIHR3byBmdW5jdGlvbnMgYW5kIG1lcmdlcyB0aGVpciByZXR1cm4gdmFsdWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbmUgRnVuY3Rpb24gdG8gaW52b2tlIGZpcnN0LlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB0d28gRnVuY3Rpb24gdG8gaW52b2tlIHNlY29uZC5cbiAgICogQHJldHVybiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0aGUgdHdvIGFyZ3VtZW50IGZ1bmN0aW9ucy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKG9uZSwgdHdvKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1lcmdlZFJlc3VsdCgpIHtcbiAgICAgIHZhciBhID0gb25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB2YXIgYiA9IHR3by5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKGEgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gYjtcbiAgICAgIH0gZWxzZSBpZiAoYiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBhO1xuICAgICAgfVxuICAgICAgdmFyIGMgPSB7fTtcbiAgICAgIG1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoYywgYSk7XG4gICAgICBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKGMsIGIpO1xuICAgICAgcmV0dXJuIGM7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIHR3byBmdW5jdGlvbnMgYW5kIGlnbm9yZXMgdGhlaXIgcmV0dXJuIHZhbGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbmUgRnVuY3Rpb24gdG8gaW52b2tlIGZpcnN0LlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB0d28gRnVuY3Rpb24gdG8gaW52b2tlIHNlY29uZC5cbiAgICogQHJldHVybiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0aGUgdHdvIGFyZ3VtZW50IGZ1bmN0aW9ucy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluZWRGdW5jdGlvbihvbmUsIHR3bykge1xuICAgIHJldHVybiBmdW5jdGlvbiBjaGFpbmVkRnVuY3Rpb24oKSB7XG4gICAgICBvbmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHR3by5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQmluZHMgYSBtZXRob2QgdG8gdGhlIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbXBvbmVudCBDb21wb25lbnQgd2hvc2UgbWV0aG9kIGlzIGdvaW5nIHRvIGJlIGJvdW5kLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2QgTWV0aG9kIHRvIGJlIGJvdW5kLlxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gVGhlIGJvdW5kIG1ldGhvZC5cbiAgICovXG4gIGZ1bmN0aW9uIGJpbmRBdXRvQmluZE1ldGhvZChjb21wb25lbnQsIG1ldGhvZCkge1xuICAgIHZhciBib3VuZE1ldGhvZCA9IG1ldGhvZC5iaW5kKGNvbXBvbmVudCk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZENvbnRleHQgPSBjb21wb25lbnQ7XG4gICAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRNZXRob2QgPSBtZXRob2Q7XG4gICAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRBcmd1bWVudHMgPSBudWxsO1xuICAgICAgdmFyIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnQuY29uc3RydWN0b3IuZGlzcGxheU5hbWU7XG4gICAgICB2YXIgX2JpbmQgPSBib3VuZE1ldGhvZC5iaW5kO1xuICAgICAgYm91bmRNZXRob2QuYmluZCA9IGZ1bmN0aW9uIChuZXdUaGlzKSB7XG4gICAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXNlciBpcyB0cnlpbmcgdG8gYmluZCgpIGFuIGF1dG9ib3VuZCBtZXRob2Q7IHdlIGVmZmVjdGl2ZWx5IHdpbGxcbiAgICAgICAgLy8gaWdub3JlIHRoZSB2YWx1ZSBvZiBcInRoaXNcIiB0aGF0IHRoZSB1c2VyIGlzIHRyeWluZyB0byB1c2UsIHNvXG4gICAgICAgIC8vIGxldCdzIHdhcm4uXG4gICAgICAgIGlmIChuZXdUaGlzICE9PSBjb21wb25lbnQgJiYgbmV3VGhpcyAhPT0gbnVsbCkge1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnYmluZCgpOiBSZWFjdCBjb21wb25lbnQgbWV0aG9kcyBtYXkgb25seSBiZSBib3VuZCB0byB0aGUgJyArICdjb21wb25lbnQgaW5zdGFuY2UuIFNlZSAlcycsIGNvbXBvbmVudE5hbWUpIDogdm9pZCAwO1xuICAgICAgICB9IGVsc2UgaWYgKCFhcmdzLmxlbmd0aCkge1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnYmluZCgpOiBZb3UgYXJlIGJpbmRpbmcgYSBjb21wb25lbnQgbWV0aG9kIHRvIHRoZSBjb21wb25lbnQuICcgKyAnUmVhY3QgZG9lcyB0aGlzIGZvciB5b3UgYXV0b21hdGljYWxseSBpbiBhIGhpZ2gtcGVyZm9ybWFuY2UgJyArICd3YXksIHNvIHlvdSBjYW4gc2FmZWx5IHJlbW92ZSB0aGlzIGNhbGwuIFNlZSAlcycsIGNvbXBvbmVudE5hbWUpIDogdm9pZCAwO1xuICAgICAgICAgIHJldHVybiBib3VuZE1ldGhvZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVib3VuZE1ldGhvZCA9IF9iaW5kLmFwcGx5KGJvdW5kTWV0aG9kLCBhcmd1bWVudHMpO1xuICAgICAgICByZWJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZENvbnRleHQgPSBjb21wb25lbnQ7XG4gICAgICAgIHJlYm91bmRNZXRob2QuX19yZWFjdEJvdW5kTWV0aG9kID0gbWV0aG9kO1xuICAgICAgICByZWJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZEFyZ3VtZW50cyA9IGFyZ3M7XG4gICAgICAgIHJldHVybiByZWJvdW5kTWV0aG9kO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGJvdW5kTWV0aG9kO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmRzIGFsbCBhdXRvLWJvdW5kIG1ldGhvZHMgaW4gYSBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb21wb25lbnQgQ29tcG9uZW50IHdob3NlIG1ldGhvZCBpcyBnb2luZyB0byBiZSBib3VuZC5cbiAgICovXG4gIGZ1bmN0aW9uIGJpbmRBdXRvQmluZE1ldGhvZHMoY29tcG9uZW50KSB7XG4gICAgdmFyIHBhaXJzID0gY29tcG9uZW50Ll9fcmVhY3RBdXRvQmluZFBhaXJzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIHZhciBhdXRvQmluZEtleSA9IHBhaXJzW2ldO1xuICAgICAgdmFyIG1ldGhvZCA9IHBhaXJzW2kgKyAxXTtcbiAgICAgIGNvbXBvbmVudFthdXRvQmluZEtleV0gPSBiaW5kQXV0b0JpbmRNZXRob2QoY29tcG9uZW50LCBtZXRob2QpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBJc01vdW50ZWRNaXhpbiA9IHtcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5fX2lzTW91bnRlZCA9IHRydWU7XG4gICAgfSxcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5fX2lzTW91bnRlZCA9IGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQWRkIG1vcmUgdG8gdGhlIFJlYWN0Q2xhc3MgYmFzZSBjbGFzcy4gVGhlc2UgYXJlIGFsbCBsZWdhY3kgZmVhdHVyZXMgYW5kXG4gICAqIHRoZXJlZm9yZSBub3QgYWxyZWFkeSBwYXJ0IG9mIHRoZSBtb2Rlcm4gUmVhY3RDb21wb25lbnQuXG4gICAqL1xuICB2YXIgUmVhY3RDbGFzc01peGluID0ge1xuXG4gICAgLyoqXG4gICAgICogVE9ETzogVGhpcyB3aWxsIGJlIGRlcHJlY2F0ZWQgYmVjYXVzZSBzdGF0ZSBzaG91bGQgYWx3YXlzIGtlZXAgYSBjb25zaXN0ZW50XG4gICAgICogdHlwZSBzaWduYXR1cmUgYW5kIHRoZSBvbmx5IHVzZSBjYXNlIGZvciB0aGlzLCBpcyB0byBhdm9pZCB0aGF0LlxuICAgICAqL1xuICAgIHJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKG5ld1N0YXRlLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy51cGRhdGVyLmVucXVldWVSZXBsYWNlU3RhdGUodGhpcywgbmV3U3RhdGUsIGNhbGxiYWNrKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAZmluYWxcbiAgICAgKi9cbiAgICBpc01vdW50ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHRoaXMuX19kaWRXYXJuSXNNb3VudGVkLCAnJXM6IGlzTW91bnRlZCBpcyBkZXByZWNhdGVkLiBJbnN0ZWFkLCBtYWtlIHN1cmUgdG8gY2xlYW4gdXAgJyArICdzdWJzY3JpcHRpb25zIGFuZCBwZW5kaW5nIHJlcXVlc3RzIGluIGNvbXBvbmVudFdpbGxVbm1vdW50IHRvICcgKyAncHJldmVudCBtZW1vcnkgbGVha3MuJywgdGhpcy5jb25zdHJ1Y3RvciAmJiB0aGlzLmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8IHRoaXMubmFtZSB8fCAnQ29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICAgIHRoaXMuX19kaWRXYXJuSXNNb3VudGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAhIXRoaXMuX19pc01vdW50ZWQ7XG4gICAgfVxuICB9O1xuXG4gIHZhciBSZWFjdENsYXNzQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge307XG4gIF9hc3NpZ24oUmVhY3RDbGFzc0NvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZSwgUmVhY3RDbGFzc01peGluKTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGNvbXBvc2l0ZSBjb21wb25lbnQgY2xhc3MgZ2l2ZW4gYSBjbGFzcyBzcGVjaWZpY2F0aW9uLlxuICAgKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY3JlYXRlY2xhc3NcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHNwZWMgQ2xhc3Mgc3BlY2lmaWNhdGlvbiAod2hpY2ggbXVzdCBkZWZpbmUgYHJlbmRlcmApLlxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gQ29tcG9uZW50IGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVDbGFzcyhzcGVjKSB7XG4gICAgLy8gVG8ga2VlcCBvdXIgd2FybmluZ3MgbW9yZSB1bmRlcnN0YW5kYWJsZSwgd2UnbGwgdXNlIGEgbGl0dGxlIGhhY2sgaGVyZSB0b1xuICAgIC8vIGVuc3VyZSB0aGF0IENvbnN0cnVjdG9yLm5hbWUgIT09ICdDb25zdHJ1Y3RvcicuIFRoaXMgbWFrZXMgc3VyZSB3ZSBkb24ndFxuICAgIC8vIHVubmVjZXNzYXJpbHkgaWRlbnRpZnkgYSBjbGFzcyB3aXRob3V0IGRpc3BsYXlOYW1lIGFzICdDb25zdHJ1Y3RvcicuXG4gICAgdmFyIENvbnN0cnVjdG9yID0gaWRlbnRpdHkoZnVuY3Rpb24gKHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gICAgICAvLyBUaGlzIGNvbnN0cnVjdG9yIGdldHMgb3ZlcnJpZGRlbiBieSBtb2Nrcy4gVGhlIGFyZ3VtZW50IGlzIHVzZWRcbiAgICAgIC8vIGJ5IG1vY2tzIHRvIGFzc2VydCBvbiB3aGF0IGdldHMgbW91bnRlZC5cblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcodGhpcyBpbnN0YW5jZW9mIENvbnN0cnVjdG9yLCAnU29tZXRoaW5nIGlzIGNhbGxpbmcgYSBSZWFjdCBjb21wb25lbnQgZGlyZWN0bHkuIFVzZSBhIGZhY3Rvcnkgb3IgJyArICdKU1ggaW5zdGVhZC4gU2VlOiBodHRwczovL2ZiLm1lL3JlYWN0LWxlZ2FjeWZhY3RvcnknKSA6IHZvaWQgMDtcbiAgICAgIH1cblxuICAgICAgLy8gV2lyZSB1cCBhdXRvLWJpbmRpbmdcbiAgICAgIGlmICh0aGlzLl9fcmVhY3RBdXRvQmluZFBhaXJzLmxlbmd0aCkge1xuICAgICAgICBiaW5kQXV0b0JpbmRNZXRob2RzKHRoaXMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gICAgICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xuXG4gICAgICB0aGlzLnN0YXRlID0gbnVsbDtcblxuICAgICAgLy8gUmVhY3RDbGFzc2VzIGRvZXNuJ3QgaGF2ZSBjb25zdHJ1Y3RvcnMuIEluc3RlYWQsIHRoZXkgdXNlIHRoZVxuICAgICAgLy8gZ2V0SW5pdGlhbFN0YXRlIGFuZCBjb21wb25lbnRXaWxsTW91bnQgbWV0aG9kcyBmb3IgaW5pdGlhbGl6YXRpb24uXG5cbiAgICAgIHZhciBpbml0aWFsU3RhdGUgPSB0aGlzLmdldEluaXRpYWxTdGF0ZSA/IHRoaXMuZ2V0SW5pdGlhbFN0YXRlKCkgOiBudWxsO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgLy8gV2UgYWxsb3cgYXV0by1tb2NrcyB0byBwcm9jZWVkIGFzIGlmIHRoZXkncmUgcmV0dXJuaW5nIG51bGwuXG4gICAgICAgIGlmIChpbml0aWFsU3RhdGUgPT09IHVuZGVmaW5lZCAmJiB0aGlzLmdldEluaXRpYWxTdGF0ZS5faXNNb2NrRnVuY3Rpb24pIHtcbiAgICAgICAgICAvLyBUaGlzIGlzIHByb2JhYmx5IGJhZCBwcmFjdGljZS4gQ29uc2lkZXIgd2FybmluZyBoZXJlIGFuZFxuICAgICAgICAgIC8vIGRlcHJlY2F0aW5nIHRoaXMgY29udmVuaWVuY2UuXG4gICAgICAgICAgaW5pdGlhbFN0YXRlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgX2ludmFyaWFudCh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShpbml0aWFsU3RhdGUpLCAnJXMuZ2V0SW5pdGlhbFN0YXRlKCk6IG11c3QgcmV0dXJuIGFuIG9iamVjdCBvciBudWxsJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50Jyk7XG5cbiAgICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsU3RhdGU7XG4gICAgfSk7XG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gbmV3IFJlYWN0Q2xhc3NDb21wb25lbnQoKTtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcjtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuX19yZWFjdEF1dG9CaW5kUGFpcnMgPSBbXTtcblxuICAgIGluamVjdGVkTWl4aW5zLmZvckVhY2gobWl4U3BlY0ludG9Db21wb25lbnQuYmluZChudWxsLCBDb25zdHJ1Y3RvcikpO1xuXG4gICAgbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIElzTW91bnRlZE1peGluKTtcbiAgICBtaXhTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3BlYyk7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBkZWZhdWx0UHJvcHMgcHJvcGVydHkgYWZ0ZXIgYWxsIG1peGlucyBoYXZlIGJlZW4gbWVyZ2VkLlxuICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgIENvbnN0cnVjdG9yLmRlZmF1bHRQcm9wcyA9IENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcygpO1xuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBUaGlzIGlzIGEgdGFnIHRvIGluZGljYXRlIHRoYXQgdGhlIHVzZSBvZiB0aGVzZSBtZXRob2QgbmFtZXMgaXMgb2ssXG4gICAgICAvLyBzaW5jZSBpdCdzIHVzZWQgd2l0aCBjcmVhdGVDbGFzcy4gSWYgaXQncyBub3QsIHRoZW4gaXQncyBsaWtlbHkgYVxuICAgICAgLy8gbWlzdGFrZSBzbyB3ZSdsbCB3YXJuIHlvdSB0byB1c2UgdGhlIHN0YXRpYyBwcm9wZXJ0eSwgcHJvcGVydHlcbiAgICAgIC8vIGluaXRpYWxpemVyIG9yIGNvbnN0cnVjdG9yIHJlc3BlY3RpdmVseS5cbiAgICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgICAgQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkID0ge307XG4gICAgICB9XG4gICAgICBpZiAoQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEluaXRpYWxTdGF0ZSkge1xuICAgICAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0SW5pdGlhbFN0YXRlLmlzUmVhY3RDbGFzc0FwcHJvdmVkID0ge307XG4gICAgICB9XG4gICAgfVxuXG4gICAgX2ludmFyaWFudChDb25zdHJ1Y3Rvci5wcm90b3R5cGUucmVuZGVyLCAnY3JlYXRlQ2xhc3MoLi4uKTogQ2xhc3Mgc3BlY2lmaWNhdGlvbiBtdXN0IGltcGxlbWVudCBhIGByZW5kZXJgIG1ldGhvZC4nKTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghQ29uc3RydWN0b3IucHJvdG90eXBlLmNvbXBvbmVudFNob3VsZFVwZGF0ZSwgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnRTaG91bGRVcGRhdGUoKS4gRGlkIHlvdSBtZWFuIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpPyAnICsgJ1RoZSBuYW1lIGlzIHBocmFzZWQgYXMgYSBxdWVzdGlvbiBiZWNhdXNlIHRoZSBmdW5jdGlvbiBpcyAnICsgJ2V4cGVjdGVkIHRvIHJldHVybiBhIHZhbHVlLicsIHNwZWMuZGlzcGxheU5hbWUgfHwgJ0EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghQ29uc3RydWN0b3IucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNpZXZlUHJvcHMsICclcyBoYXMgYSBtZXRob2QgY2FsbGVkICcgKyAnY29tcG9uZW50V2lsbFJlY2lldmVQcm9wcygpLiBEaWQgeW91IG1lYW4gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpPycsIHNwZWMuZGlzcGxheU5hbWUgfHwgJ0EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgfVxuXG4gICAgLy8gUmVkdWNlIHRpbWUgc3BlbnQgZG9pbmcgbG9va3VwcyBieSBzZXR0aW5nIHRoZXNlIG9uIHRoZSBwcm90b3R5cGUuXG4gICAgZm9yICh2YXIgbWV0aG9kTmFtZSBpbiBSZWFjdENsYXNzSW50ZXJmYWNlKSB7XG4gICAgICBpZiAoIUNvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2ROYW1lXSkge1xuICAgICAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kTmFtZV0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfVxuXG4gIHJldHVybiBjcmVhdGVDbGFzcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5O1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl5WldGamRDOXViMlJsWDIxdlpIVnNaWE12WTNKbFlYUmxMWEpsWVdOMExXTnNZWE56TDJaaFkzUnZjbmt1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVpTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpOHFLbHh1SUNvZ1EyOXdlWEpwWjJoMElESXdNVE10Y0hKbGMyVnVkQ3dnUm1GalpXSnZiMnNzSUVsdVl5NWNiaUFxSUVGc2JDQnlhV2RvZEhNZ2NtVnpaWEoyWldRdVhHNGdLbHh1SUNvZ1ZHaHBjeUJ6YjNWeVkyVWdZMjlrWlNCcGN5QnNhV05sYm5ObFpDQjFibVJsY2lCMGFHVWdRbE5FTFhOMGVXeGxJR3hwWTJWdWMyVWdabTkxYm1RZ2FXNGdkR2hsWEc0Z0tpQk1TVU5GVGxORklHWnBiR1VnYVc0Z2RHaGxJSEp2YjNRZ1pHbHlaV04wYjNKNUlHOW1JSFJvYVhNZ2MyOTFjbU5sSUhSeVpXVXVJRUZ1SUdGa1pHbDBhVzl1WVd3Z1ozSmhiblJjYmlBcUlHOW1JSEJoZEdWdWRDQnlhV2RvZEhNZ1kyRnVJR0psSUdadmRXNWtJR2x1SUhSb1pTQlFRVlJGVGxSVElHWnBiR1VnYVc0Z2RHaGxJSE5oYldVZ1pHbHlaV04wYjNKNUxseHVJQ3BjYmlBcUwxeHVYRzRuZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCZllYTnphV2R1SUQwZ2NtVnhkV2x5WlNnbmIySnFaV04wTFdGemMybG5iaWNwTzF4dVhHNTJZWElnWlcxd2RIbFBZbXBsWTNRZ1BTQnlaWEYxYVhKbEtDZG1ZbXB6TDJ4cFlpOWxiWEIwZVU5aWFtVmpkQ2NwTzF4dWRtRnlJRjlwYm5aaGNtbGhiblFnUFNCeVpYRjFhWEpsS0NkbVltcHpMMnhwWWk5cGJuWmhjbWxoYm5RbktUdGNibHh1YVdZZ0tIQnliMk5sYzNNdVpXNTJMazVQUkVWZlJVNVdJQ0U5UFNBbmNISnZaSFZqZEdsdmJpY3BJSHRjYmlBZ2RtRnlJSGRoY201cGJtY2dQU0J5WlhGMWFYSmxLQ2RtWW1wekwyeHBZaTkzWVhKdWFXNW5KeWs3WEc1OVhHNWNiblpoY2lCTlNWaEpUbE5mUzBWWklEMGdKMjFwZUdsdWN5YzdYRzVjYmk4dklFaGxiSEJsY2lCbWRXNWpkR2x2YmlCMGJ5QmhiR3h2ZHlCMGFHVWdZM0psWVhScGIyNGdiMllnWVc1dmJubHRiM1Z6SUdaMWJtTjBhVzl1Y3lCM2FHbGphQ0JrYnlCdWIzUmNiaTh2SUdoaGRtVWdMbTVoYldVZ2MyVjBJSFJ2SUhSb1pTQnVZVzFsSUc5bUlIUm9aU0IyWVhKcFlXSnNaU0JpWldsdVp5QmhjM05wWjI1bFpDQjBieTVjYm1aMWJtTjBhVzl1SUdsa1pXNTBhWFI1S0dadUtTQjdYRzRnSUhKbGRIVnliaUJtYmp0Y2JuMWNibHh1ZG1GeUlGSmxZV04wVUhKdmNGUjVjR1ZNYjJOaGRHbHZiazVoYldWek8xeHVhV1lnS0hCeWIyTmxjM011Wlc1MkxrNVBSRVZmUlU1V0lDRTlQU0FuY0hKdlpIVmpkR2x2YmljcElIdGNiaUFnVW1WaFkzUlFjbTl3Vkhsd1pVeHZZMkYwYVc5dVRtRnRaWE1nUFNCN1hHNGdJQ0FnY0hKdmNEb2dKM0J5YjNBbkxGeHVJQ0FnSUdOdmJuUmxlSFE2SUNkamIyNTBaWGgwSnl4Y2JpQWdJQ0JqYUdsc1pFTnZiblJsZUhRNklDZGphR2xzWkNCamIyNTBaWGgwSnl4Y2JpQWdmVHRjYm4wZ1pXeHpaU0I3WEc0Z0lGSmxZV04wVUhKdmNGUjVjR1ZNYjJOaGRHbHZiazVoYldWeklEMGdlMzA3WEc1OVhHNWNibVoxYm1OMGFXOXVJR1poWTNSdmNua29VbVZoWTNSRGIyMXdiMjVsYm5Rc0lHbHpWbUZzYVdSRmJHVnRaVzUwTENCU1pXRmpkRTV2YjNCVmNHUmhkR1ZSZFdWMVpTa2dlMXh1SUNBdktpcGNiaUFnSUNvZ1VHOXNhV05wWlhNZ2RHaGhkQ0JrWlhOamNtbGlaU0J0WlhSb2IyUnpJR2x1SUdCU1pXRmpkRU5zWVhOelNXNTBaWEptWVdObFlDNWNiaUFnSUNvdlhHNWNibHh1SUNCMllYSWdhVzVxWldOMFpXUk5hWGhwYm5NZ1BTQmJYVHRjYmx4dUlDQXZLaXBjYmlBZ0lDb2dRMjl0Y0c5emFYUmxJR052YlhCdmJtVnVkSE1nWVhKbElHaHBaMmhsY2kxc1pYWmxiQ0JqYjIxd2IyNWxiblJ6SUhSb1lYUWdZMjl0Y0c5elpTQnZkR2hsY2lCamIyMXdiM05wZEdWY2JpQWdJQ29nYjNJZ2FHOXpkQ0JqYjIxd2IyNWxiblJ6TGx4dUlDQWdLbHh1SUNBZ0tpQlVieUJqY21WaGRHVWdZU0J1WlhjZ2RIbHdaU0J2WmlCZ1VtVmhZM1JEYkdGemMyQXNJSEJoYzNNZ1lTQnpjR1ZqYVdacFkyRjBhVzl1SUc5bVhHNGdJQ0FxSUhsdmRYSWdibVYzSUdOc1lYTnpJSFJ2SUdCU1pXRmpkQzVqY21WaGRHVkRiR0Z6YzJBdUlGUm9aU0J2Ym14NUlISmxjWFZwY21WdFpXNTBJRzltSUhsdmRYSWdZMnhoYzNOY2JpQWdJQ29nYzNCbFkybG1hV05oZEdsdmJpQnBjeUIwYUdGMElIbHZkU0JwYlhCc1pXMWxiblFnWVNCZ2NtVnVaR1Z5WUNCdFpYUm9iMlF1WEc0Z0lDQXFYRzRnSUNBcUlDQWdkbUZ5SUUxNVEyOXRjRzl1Wlc1MElEMGdVbVZoWTNRdVkzSmxZWFJsUTJ4aGMzTW9lMXh1SUNBZ0tpQWdJQ0FnY21WdVpHVnlPaUJtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ29nSUNBZ0lDQWdjbVYwZFhKdUlEeGthWFkrU0dWc2JHOGdWMjl5YkdROEwyUnBkajQ3WEc0Z0lDQXFJQ0FnSUNCOVhHNGdJQ0FxSUNBZ2ZTazdYRzRnSUNBcVhHNGdJQ0FxSUZSb1pTQmpiR0Z6Y3lCemNHVmphV1pwWTJGMGFXOXVJSE4xY0hCdmNuUnpJR0VnYzNCbFkybG1hV01nY0hKdmRHOWpiMndnYjJZZ2JXVjBhRzlrY3lCMGFHRjBJR2hoZG1WY2JpQWdJQ29nYzNCbFkybGhiQ0J0WldGdWFXNW5JQ2hsTG1jdUlHQnlaVzVrWlhKZ0tTNGdVMlZsSUdCU1pXRmpkRU5zWVhOelNXNTBaWEptWVdObFlDQm1iM0pjYmlBZ0lDb2diVzl5WlNCMGFHVWdZMjl0Y0hKbGFHVnVjMmwyWlNCd2NtOTBiMk52YkM0Z1FXNTVJRzkwYUdWeUlIQnliM0JsY25ScFpYTWdZVzVrSUcxbGRHaHZaSE1nYVc0Z2RHaGxYRzRnSUNBcUlHTnNZWE56SUhOd1pXTnBabWxqWVhScGIyNGdkMmxzYkNCaVpTQmhkbUZwYkdGaWJHVWdiMjRnZEdobElIQnliM1J2ZEhsd1pTNWNiaUFnSUNwY2JpQWdJQ29nUUdsdWRHVnlabUZqWlNCU1pXRmpkRU5zWVhOelNXNTBaWEptWVdObFhHNGdJQ0FxSUVCcGJuUmxjbTVoYkZ4dUlDQWdLaTljYmlBZ2RtRnlJRkpsWVdOMFEyeGhjM05KYm5SbGNtWmhZMlVnUFNCN1hHNWNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQkJiaUJoY25KaGVTQnZaaUJOYVhocGJpQnZZbXBsWTNSeklIUnZJR2x1WTJ4MVpHVWdkMmhsYmlCa1pXWnBibWx1WnlCNWIzVnlJR052YlhCdmJtVnVkQzVjYmlBZ0lDQWdLbHh1SUNBZ0lDQXFJRUIwZVhCbElIdGhjbkpoZVgxY2JpQWdJQ0FnS2lCQWIzQjBhVzl1WVd4Y2JpQWdJQ0FnS2k5Y2JpQWdJQ0J0YVhocGJuTTZJQ2RFUlVaSlRrVmZUVUZPV1Njc1hHNWNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQkJiaUJ2WW1wbFkzUWdZMjl1ZEdGcGJtbHVaeUJ3Y205d1pYSjBhV1Z6SUdGdVpDQnRaWFJvYjJSeklIUm9ZWFFnYzJodmRXeGtJR0psSUdSbFptbHVaV1FnYjI1Y2JpQWdJQ0FnS2lCMGFHVWdZMjl0Y0c5dVpXNTBKM01nWTI5dWMzUnlkV04wYjNJZ2FXNXpkR1ZoWkNCdlppQnBkSE1nY0hKdmRHOTBlWEJsSUNoemRHRjBhV01nYldWMGFHOWtjeWt1WEc0Z0lDQWdJQ3BjYmlBZ0lDQWdLaUJBZEhsd1pTQjdiMkpxWldOMGZWeHVJQ0FnSUNBcUlFQnZjSFJwYjI1aGJGeHVJQ0FnSUNBcUwxeHVJQ0FnSUhOMFlYUnBZM002SUNkRVJVWkpUa1ZmVFVGT1dTY3NYRzVjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJFWldacGJtbDBhVzl1SUc5bUlIQnliM0FnZEhsd1pYTWdabTl5SUhSb2FYTWdZMjl0Y0c5dVpXNTBMbHh1SUNBZ0lDQXFYRzRnSUNBZ0lDb2dRSFI1Y0dVZ2UyOWlhbVZqZEgxY2JpQWdJQ0FnS2lCQWIzQjBhVzl1WVd4Y2JpQWdJQ0FnS2k5Y2JpQWdJQ0J3Y205d1ZIbHdaWE02SUNkRVJVWkpUa1ZmVFVGT1dTY3NYRzVjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJFWldacGJtbDBhVzl1SUc5bUlHTnZiblJsZUhRZ2RIbHdaWE1nWm05eUlIUm9hWE1nWTI5dGNHOXVaVzUwTGx4dUlDQWdJQ0FxWEc0Z0lDQWdJQ29nUUhSNWNHVWdlMjlpYW1WamRIMWNiaUFnSUNBZ0tpQkFiM0IwYVc5dVlXeGNiaUFnSUNBZ0tpOWNiaUFnSUNCamIyNTBaWGgwVkhsd1pYTTZJQ2RFUlVaSlRrVmZUVUZPV1Njc1hHNWNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQkVaV1pwYm1sMGFXOXVJRzltSUdOdmJuUmxlSFFnZEhsd1pYTWdkR2hwY3lCamIyMXdiMjVsYm5RZ2MyVjBjeUJtYjNJZ2FYUnpJR05vYVd4a2NtVnVMbHh1SUNBZ0lDQXFYRzRnSUNBZ0lDb2dRSFI1Y0dVZ2UyOWlhbVZqZEgxY2JpQWdJQ0FnS2lCQWIzQjBhVzl1WVd4Y2JpQWdJQ0FnS2k5Y2JpQWdJQ0JqYUdsc1pFTnZiblJsZUhSVWVYQmxjem9nSjBSRlJrbE9SVjlOUVU1Wkp5eGNibHh1SUNBZ0lDOHZJRDA5UFQwZ1JHVm1hVzVwZEdsdmJpQnRaWFJvYjJSeklEMDlQVDFjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVsdWRtOXJaV1FnZDJobGJpQjBhR1VnWTI5dGNHOXVaVzUwSUdseklHMXZkVzUwWldRdUlGWmhiSFZsY3lCcGJpQjBhR1VnYldGd2NHbHVaeUIzYVd4c0lHSmxJSE5sZENCdmJseHVJQ0FnSUNBcUlHQjBhR2x6TG5CeWIzQnpZQ0JwWmlCMGFHRjBJSEJ5YjNBZ2FYTWdibTkwSUhOd1pXTnBabWxsWkNBb2FTNWxMaUIxYzJsdVp5QmhiaUJnYVc1Z0lHTm9aV05yS1M1Y2JpQWdJQ0FnS2x4dUlDQWdJQ0FxSUZSb2FYTWdiV1YwYUc5a0lHbHpJR2x1ZG05clpXUWdZbVZtYjNKbElHQm5aWFJKYm1sMGFXRnNVM1JoZEdWZ0lHRnVaQ0IwYUdWeVpXWnZjbVVnWTJGdWJtOTBJSEpsYkhsY2JpQWdJQ0FnS2lCdmJpQmdkR2hwY3k1emRHRjBaV0FnYjNJZ2RYTmxJR0IwYUdsekxuTmxkRk4wWVhSbFlDNWNiaUFnSUNBZ0tseHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UyOWlhbVZqZEgxY2JpQWdJQ0FnS2lCQWIzQjBhVzl1WVd4Y2JpQWdJQ0FnS2k5Y2JpQWdJQ0JuWlhSRVpXWmhkV3gwVUhKdmNITTZJQ2RFUlVaSlRrVmZUVUZPV1Y5TlJWSkhSVVFuTEZ4dVhHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1NXNTJiMnRsWkNCdmJtTmxJR0psWm05eVpTQjBhR1VnWTI5dGNHOXVaVzUwSUdseklHMXZkVzUwWldRdUlGUm9aU0J5WlhSMWNtNGdkbUZzZFdVZ2QybHNiQ0JpWlNCMWMyVmtYRzRnSUNBZ0lDb2dZWE1nZEdobElHbHVhWFJwWVd3Z2RtRnNkV1VnYjJZZ1lIUm9hWE11YzNSaGRHVmdMbHh1SUNBZ0lDQXFYRzRnSUNBZ0lDb2dJQ0JuWlhSSmJtbDBhV0ZzVTNSaGRHVTZJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJQ0FxSUNBZ0lDQnlaWFIxY200Z2UxeHVJQ0FnSUNBcUlDQWdJQ0FnSUdselQyNDZJR1poYkhObExGeHVJQ0FnSUNBcUlDQWdJQ0FnSUdadmIwSmhlam9nYm1WM0lFSmhla1p2YnlncFhHNGdJQ0FnSUNvZ0lDQWdJSDFjYmlBZ0lDQWdLaUFnSUgxY2JpQWdJQ0FnS2x4dUlDQWdJQ0FxSUVCeVpYUjFjbTRnZTI5aWFtVmpkSDFjYmlBZ0lDQWdLaUJBYjNCMGFXOXVZV3hjYmlBZ0lDQWdLaTljYmlBZ0lDQm5aWFJKYm1sMGFXRnNVM1JoZEdVNklDZEVSVVpKVGtWZlRVRk9XVjlOUlZKSFJVUW5MRnh1WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUUhKbGRIVnliaUI3YjJKcVpXTjBmVnh1SUNBZ0lDQXFJRUJ2Y0hScGIyNWhiRnh1SUNBZ0lDQXFMMXh1SUNBZ0lHZGxkRU5vYVd4a1EyOXVkR1Y0ZERvZ0owUkZSa2xPUlY5TlFVNVpYMDFGVWtkRlJDY3NYRzVjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJWYzJWeklIQnliM0J6SUdaeWIyMGdZSFJvYVhNdWNISnZjSE5nSUdGdVpDQnpkR0YwWlNCbWNtOXRJR0IwYUdsekxuTjBZWFJsWUNCMGJ5QnlaVzVrWlhJZ2RHaGxYRzRnSUNBZ0lDb2djM1J5ZFdOMGRYSmxJRzltSUhSb1pTQmpiMjF3YjI1bGJuUXVYRzRnSUNBZ0lDcGNiaUFnSUNBZ0tpQk9ieUJuZFdGeVlXNTBaV1Z6SUdGeVpTQnRZV1JsSUdGaWIzVjBJSGRvWlc0Z2IzSWdhRzkzSUc5bWRHVnVJSFJvYVhNZ2JXVjBhRzlrSUdseklHbHVkbTlyWldRc0lITnZYRzRnSUNBZ0lDb2dhWFFnYlhWemRDQnViM1FnYUdGMlpTQnphV1JsSUdWbVptVmpkSE11WEc0Z0lDQWdJQ3BjYmlBZ0lDQWdLaUFnSUhKbGJtUmxjam9nWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNvZ0lDQWdJSFpoY2lCdVlXMWxJRDBnZEdocGN5NXdjbTl3Y3k1dVlXMWxPMXh1SUNBZ0lDQXFJQ0FnSUNCeVpYUjFjbTRnUEdScGRqNUlaV3hzYnl3Z2UyNWhiV1Y5SVR3dlpHbDJQanRjYmlBZ0lDQWdLaUFnSUgxY2JpQWdJQ0FnS2x4dUlDQWdJQ0FxSUVCeVpYUjFjbTRnZTFKbFlXTjBRMjl0Y0c5dVpXNTBmVnh1SUNBZ0lDQXFJRUJ1YjNOcFpHVmxabVpsWTNSelhHNGdJQ0FnSUNvZ1FISmxjWFZwY21Wa1hHNGdJQ0FnSUNvdlhHNGdJQ0FnY21WdVpHVnlPaUFuUkVWR1NVNUZYMDlPUTBVbkxGeHVYRzRnSUNBZ0x5OGdQVDA5UFNCRVpXeGxaMkYwWlNCdFpYUm9iMlJ6SUQwOVBUMWNibHh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRWx1ZG05clpXUWdkMmhsYmlCMGFHVWdZMjl0Y0c5dVpXNTBJR2x6SUdsdWFYUnBZV3hzZVNCamNtVmhkR1ZrSUdGdVpDQmhZbTkxZENCMGJ5QmlaU0J0YjNWdWRHVmtMbHh1SUNBZ0lDQXFJRlJvYVhNZ2JXRjVJR2hoZG1VZ2MybGtaU0JsWm1abFkzUnpMQ0JpZFhRZ1lXNTVJR1Y0ZEdWeWJtRnNJSE4xWW5OamNtbHdkR2x2Ym5NZ2IzSWdaR0YwWVNCamNtVmhkR1ZrWEc0Z0lDQWdJQ29nWW5rZ2RHaHBjeUJ0WlhSb2IyUWdiWFZ6ZENCaVpTQmpiR1ZoYm1Wa0lIVndJR2x1SUdCamIyMXdiMjVsYm5SWGFXeHNWVzV0YjNWdWRHQXVYRzRnSUNBZ0lDcGNiaUFnSUNBZ0tpQkFiM0IwYVc5dVlXeGNiaUFnSUNBZ0tpOWNiaUFnSUNCamIyMXdiMjVsYm5SWGFXeHNUVzkxYm5RNklDZEVSVVpKVGtWZlRVRk9XU2NzWEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCSmJuWnZhMlZrSUhkb1pXNGdkR2hsSUdOdmJYQnZibVZ1ZENCb1lYTWdZbVZsYmlCdGIzVnVkR1ZrSUdGdVpDQm9ZWE1nWVNCRVQwMGdjbVZ3Y21WelpXNTBZWFJwYjI0dVhHNGdJQ0FnSUNvZ1NHOTNaWFpsY2l3Z2RHaGxjbVVnYVhNZ2JtOGdaM1ZoY21GdWRHVmxJSFJvWVhRZ2RHaGxJRVJQVFNCdWIyUmxJR2x6SUdsdUlIUm9aU0JrYjJOMWJXVnVkQzVjYmlBZ0lDQWdLbHh1SUNBZ0lDQXFJRlZ6WlNCMGFHbHpJR0Z6SUdGdUlHOXdjRzl5ZEhWdWFYUjVJSFJ2SUc5d1pYSmhkR1VnYjI0Z2RHaGxJRVJQVFNCM2FHVnVJSFJvWlNCamIyMXdiMjVsYm5RZ2FHRnpYRzRnSUNBZ0lDb2dZbVZsYmlCdGIzVnVkR1ZrSUNocGJtbDBhV0ZzYVhwbFpDQmhibVFnY21WdVpHVnlaV1FwSUdadmNpQjBhR1VnWm1seWMzUWdkR2x0WlM1Y2JpQWdJQ0FnS2x4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3UkU5TlJXeGxiV1Z1ZEgwZ2NtOXZkRTV2WkdVZ1JFOU5JR1ZzWlcxbGJuUWdjbVZ3Y21WelpXNTBhVzVuSUhSb1pTQmpiMjF3YjI1bGJuUXVYRzRnSUNBZ0lDb2dRRzl3ZEdsdmJtRnNYRzRnSUNBZ0lDb3ZYRzRnSUNBZ1kyOXRjRzl1Wlc1MFJHbGtUVzkxYm5RNklDZEVSVVpKVGtWZlRVRk9XU2NzWEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCSmJuWnZhMlZrSUdKbFptOXlaU0IwYUdVZ1kyOXRjRzl1Wlc1MElISmxZMlZwZG1WeklHNWxkeUJ3Y205d2N5NWNiaUFnSUNBZ0tseHVJQ0FnSUNBcUlGVnpaU0IwYUdseklHRnpJR0Z1SUc5d2NHOXlkSFZ1YVhSNUlIUnZJSEpsWVdOMElIUnZJR0VnY0hKdmNDQjBjbUZ1YzJsMGFXOXVJR0o1SUhWd1pHRjBhVzVuSUhSb1pWeHVJQ0FnSUNBcUlITjBZWFJsSUhWemFXNW5JR0IwYUdsekxuTmxkRk4wWVhSbFlDNGdRM1Z5Y21WdWRDQndjbTl3Y3lCaGNtVWdZV05qWlhOelpXUWdkbWxoSUdCMGFHbHpMbkJ5YjNCellDNWNiaUFnSUNBZ0tseHVJQ0FnSUNBcUlDQWdZMjl0Y0c5dVpXNTBWMmxzYkZKbFkyVnBkbVZRY205d2N6b2dablZ1WTNScGIyNG9ibVY0ZEZCeWIzQnpMQ0J1WlhoMFEyOXVkR1Y0ZENrZ2UxeHVJQ0FnSUNBcUlDQWdJQ0IwYUdsekxuTmxkRk4wWVhSbEtIdGNiaUFnSUNBZ0tpQWdJQ0FnSUNCc2FXdGxjMGx1WTNKbFlYTnBibWM2SUc1bGVIUlFjbTl3Y3k1c2FXdGxRMjkxYm5RZ1BpQjBhR2x6TG5CeWIzQnpMbXhwYTJWRGIzVnVkRnh1SUNBZ0lDQXFJQ0FnSUNCOUtUdGNiaUFnSUNBZ0tpQWdJSDFjYmlBZ0lDQWdLbHh1SUNBZ0lDQXFJRTVQVkVVNklGUm9aWEpsSUdseklHNXZJR1Z4ZFdsMllXeGxiblFnWUdOdmJYQnZibVZ1ZEZkcGJHeFNaV05sYVhabFUzUmhkR1ZnTGlCQmJpQnBibU52YldsdVp5QndjbTl3WEc0Z0lDQWdJQ29nZEhKaGJuTnBkR2x2YmlCdFlYa2dZMkYxYzJVZ1lTQnpkR0YwWlNCamFHRnVaMlVzSUdKMWRDQjBhR1VnYjNCd2IzTnBkR1VnYVhNZ2JtOTBJSFJ5ZFdVdUlFbG1JSGx2ZFZ4dUlDQWdJQ0FxSUc1bFpXUWdhWFFzSUhsdmRTQmhjbVVnY0hKdlltRmliSGtnYkc5dmEybHVaeUJtYjNJZ1lHTnZiWEJ2Ym1WdWRGZHBiR3hWY0dSaGRHVmdMbHh1SUNBZ0lDQXFYRzRnSUNBZ0lDb2dRSEJoY21GdElIdHZZbXBsWTNSOUlHNWxlSFJRY205d2MxeHVJQ0FnSUNBcUlFQnZjSFJwYjI1aGJGeHVJQ0FnSUNBcUwxeHVJQ0FnSUdOdmJYQnZibVZ1ZEZkcGJHeFNaV05sYVhabFVISnZjSE02SUNkRVJVWkpUa1ZmVFVGT1dTY3NYRzVjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJKYm5admEyVmtJSGRvYVd4bElHUmxZMmxrYVc1bklHbG1JSFJvWlNCamIyMXdiMjVsYm5RZ2MyaHZkV3hrSUdKbElIVndaR0YwWldRZ1lYTWdZU0J5WlhOMWJIUWdiMlpjYmlBZ0lDQWdLaUJ5WldObGFYWnBibWNnYm1WM0lIQnliM0J6TENCemRHRjBaU0JoYm1RdmIzSWdZMjl1ZEdWNGRDNWNiaUFnSUNBZ0tseHVJQ0FnSUNBcUlGVnpaU0IwYUdseklHRnpJR0Z1SUc5d2NHOXlkSFZ1YVhSNUlIUnZJR0J5WlhSMWNtNGdabUZzYzJWZ0lIZG9aVzRnZVc5MUozSmxJR05sY25SaGFXNGdkR2hoZENCMGFHVmNiaUFnSUNBZ0tpQjBjbUZ1YzJsMGFXOXVJSFJ2SUhSb1pTQnVaWGNnY0hKdmNITXZjM1JoZEdVdlkyOXVkR1Y0ZENCM2FXeHNJRzV2ZENCeVpYRjFhWEpsSUdFZ1kyOXRjRzl1Wlc1MFhHNGdJQ0FnSUNvZ2RYQmtZWFJsTGx4dUlDQWdJQ0FxWEc0Z0lDQWdJQ29nSUNCemFHOTFiR1JEYjIxd2IyNWxiblJWY0dSaGRHVTZJR1oxYm1OMGFXOXVLRzVsZUhSUWNtOXdjeXdnYm1WNGRGTjBZWFJsTENCdVpYaDBRMjl1ZEdWNGRDa2dlMXh1SUNBZ0lDQXFJQ0FnSUNCeVpYUjFjbTRnSVdWeGRXRnNLRzVsZUhSUWNtOXdjeXdnZEdocGN5NXdjbTl3Y3lrZ2ZIeGNiaUFnSUNBZ0tpQWdJQ0FnSUNBaFpYRjFZV3dvYm1WNGRGTjBZWFJsTENCMGFHbHpMbk4wWVhSbEtTQjhmRnh1SUNBZ0lDQXFJQ0FnSUNBZ0lDRmxjWFZoYkNodVpYaDBRMjl1ZEdWNGRDd2dkR2hwY3k1amIyNTBaWGgwS1R0Y2JpQWdJQ0FnS2lBZ0lIMWNiaUFnSUNBZ0tseHVJQ0FnSUNBcUlFQndZWEpoYlNCN2IySnFaV04wZlNCdVpYaDBVSEp2Y0hOY2JpQWdJQ0FnS2lCQWNHRnlZVzBnZXo5dlltcGxZM1I5SUc1bGVIUlRkR0YwWlZ4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3UDI5aWFtVmpkSDBnYm1WNGRFTnZiblJsZUhSY2JpQWdJQ0FnS2lCQWNtVjBkWEp1SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhSb1pTQmpiMjF3YjI1bGJuUWdjMmh2ZFd4a0lIVndaR0YwWlM1Y2JpQWdJQ0FnS2lCQWIzQjBhVzl1WVd4Y2JpQWdJQ0FnS2k5Y2JpQWdJQ0J6YUc5MWJHUkRiMjF3YjI1bGJuUlZjR1JoZEdVNklDZEVSVVpKVGtWZlQwNURSU2NzWEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCSmJuWnZhMlZrSUhkb1pXNGdkR2hsSUdOdmJYQnZibVZ1ZENCcGN5QmhZbTkxZENCMGJ5QjFjR1JoZEdVZ1pIVmxJSFJ2SUdFZ2RISmhibk5wZEdsdmJpQm1jbTl0WEc0Z0lDQWdJQ29nWUhSb2FYTXVjSEp2Y0hOZ0xDQmdkR2hwY3k1emRHRjBaV0FnWVc1a0lHQjBhR2x6TG1OdmJuUmxlSFJnSUhSdklHQnVaWGgwVUhKdmNITmdMQ0JnYm1WNGRGTjBZWFJsWUZ4dUlDQWdJQ0FxSUdGdVpDQmdibVY0ZEVOdmJuUmxlSFJnTGx4dUlDQWdJQ0FxWEc0Z0lDQWdJQ29nVlhObElIUm9hWE1nWVhNZ1lXNGdiM0J3YjNKMGRXNXBkSGtnZEc4Z2NHVnlabTl5YlNCd2NtVndZWEpoZEdsdmJpQmlaV1p2Y21VZ1lXNGdkWEJrWVhSbElHOWpZM1Z5Y3k1Y2JpQWdJQ0FnS2x4dUlDQWdJQ0FxSUU1UFZFVTZJRmx2ZFNBcUttTmhibTV2ZENvcUlIVnpaU0JnZEdocGN5NXpaWFJUZEdGMFpTZ3BZQ0JwYmlCMGFHbHpJRzFsZEdodlpDNWNiaUFnSUNBZ0tseHVJQ0FnSUNBcUlFQndZWEpoYlNCN2IySnFaV04wZlNCdVpYaDBVSEp2Y0hOY2JpQWdJQ0FnS2lCQWNHRnlZVzBnZXo5dlltcGxZM1I5SUc1bGVIUlRkR0YwWlZ4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3UDI5aWFtVmpkSDBnYm1WNGRFTnZiblJsZUhSY2JpQWdJQ0FnS2lCQWNHRnlZVzBnZTFKbFlXTjBVbVZqYjI1amFXeGxWSEpoYm5OaFkzUnBiMjU5SUhSeVlXNXpZV04wYVc5dVhHNGdJQ0FnSUNvZ1FHOXdkR2x2Ym1Gc1hHNGdJQ0FnSUNvdlhHNGdJQ0FnWTI5dGNHOXVaVzUwVjJsc2JGVndaR0YwWlRvZ0owUkZSa2xPUlY5TlFVNVpKeXhjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVsdWRtOXJaV1FnZDJobGJpQjBhR1VnWTI5dGNHOXVaVzUwSjNNZ1JFOU5JSEpsY0hKbGMyVnVkR0YwYVc5dUlHaGhjeUJpWldWdUlIVndaR0YwWldRdVhHNGdJQ0FnSUNwY2JpQWdJQ0FnS2lCVmMyVWdkR2hwY3lCaGN5QmhiaUJ2Y0hCdmNuUjFibWwwZVNCMGJ5QnZjR1Z5WVhSbElHOXVJSFJvWlNCRVQwMGdkMmhsYmlCMGFHVWdZMjl0Y0c5dVpXNTBJR2hoYzF4dUlDQWdJQ0FxSUdKbFpXNGdkWEJrWVhSbFpDNWNiaUFnSUNBZ0tseHVJQ0FnSUNBcUlFQndZWEpoYlNCN2IySnFaV04wZlNCd2NtVjJVSEp2Y0hOY2JpQWdJQ0FnS2lCQWNHRnlZVzBnZXo5dlltcGxZM1I5SUhCeVpYWlRkR0YwWlZ4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3UDI5aWFtVmpkSDBnY0hKbGRrTnZiblJsZUhSY2JpQWdJQ0FnS2lCQWNHRnlZVzBnZTBSUFRVVnNaVzFsYm5SOUlISnZiM1JPYjJSbElFUlBUU0JsYkdWdFpXNTBJSEpsY0hKbGMyVnVkR2x1WnlCMGFHVWdZMjl0Y0c5dVpXNTBMbHh1SUNBZ0lDQXFJRUJ2Y0hScGIyNWhiRnh1SUNBZ0lDQXFMMXh1SUNBZ0lHTnZiWEJ2Ym1WdWRFUnBaRlZ3WkdGMFpUb2dKMFJGUmtsT1JWOU5RVTVaSnl4Y2JseHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlFbHVkbTlyWldRZ2QyaGxiaUIwYUdVZ1kyOXRjRzl1Wlc1MElHbHpJR0ZpYjNWMElIUnZJR0psSUhKbGJXOTJaV1FnWm5KdmJTQnBkSE1nY0dGeVpXNTBJR0Z1WkNCb1lYWmxYRzRnSUNBZ0lDb2dhWFJ6SUVSUFRTQnlaWEJ5WlhObGJuUmhkR2x2YmlCa1pYTjBjbTk1WldRdVhHNGdJQ0FnSUNwY2JpQWdJQ0FnS2lCVmMyVWdkR2hwY3lCaGN5QmhiaUJ2Y0hCdmNuUjFibWwwZVNCMGJ5QmtaV0ZzYkc5allYUmxJR0Z1ZVNCbGVIUmxjbTVoYkNCeVpYTnZkWEpqWlhNdVhHNGdJQ0FnSUNwY2JpQWdJQ0FnS2lCT1QxUkZPaUJVYUdWeVpTQnBjeUJ1YnlCZ1kyOXRjRzl1Wlc1MFJHbGtWVzV0YjNWdWRHQWdjMmx1WTJVZ2VXOTFjaUJqYjIxd2IyNWxiblFnZDJsc2JDQm9ZWFpsSUdKbFpXNWNiaUFnSUNBZ0tpQmtaWE4wY205NVpXUWdZbmtnZEdoaGRDQndiMmx1ZEM1Y2JpQWdJQ0FnS2x4dUlDQWdJQ0FxSUVCdmNIUnBiMjVoYkZ4dUlDQWdJQ0FxTDF4dUlDQWdJR052YlhCdmJtVnVkRmRwYkd4VmJtMXZkVzUwT2lBblJFVkdTVTVGWDAxQlRsa25MRnh1WEc0Z0lDQWdMeThnUFQwOVBTQkJaSFpoYm1ObFpDQnRaWFJvYjJSeklEMDlQVDFjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUZWd1pHRjBaWE1nZEdobElHTnZiWEJ2Ym1WdWRDZHpJR04xY25KbGJuUnNlU0J0YjNWdWRHVmtJRVJQVFNCeVpYQnlaWE5sYm5SaGRHbHZiaTVjYmlBZ0lDQWdLbHh1SUNBZ0lDQXFJRUo1SUdSbFptRjFiSFFzSUhSb2FYTWdhVzF3YkdWdFpXNTBjeUJTWldGamRDZHpJSEpsYm1SbGNtbHVaeUJoYm1RZ2NtVmpiMjVqYVd4cFlYUnBiMjRnWVd4bmIzSnBkR2h0TGx4dUlDQWdJQ0FxSUZOdmNHaHBjM1JwWTJGMFpXUWdZMnhwWlc1MGN5QnRZWGtnZDJsemFDQjBieUJ2ZG1WeWNtbGtaU0IwYUdsekxseHVJQ0FnSUNBcVhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUh0U1pXRmpkRkpsWTI5dVkybHNaVlJ5WVc1ellXTjBhVzl1ZlNCMGNtRnVjMkZqZEdsdmJseHVJQ0FnSUNBcUlFQnBiblJsY201aGJGeHVJQ0FnSUNBcUlFQnZkbVZ5Y21sa1lXSnNaVnh1SUNBZ0lDQXFMMXh1SUNBZ0lIVndaR0YwWlVOdmJYQnZibVZ1ZERvZ0owOVdSVkpTU1VSRlgwSkJVMFVuWEc1Y2JpQWdmVHRjYmx4dUlDQXZLaXBjYmlBZ0lDb2dUV0Z3Y0dsdVp5Qm1jbTl0SUdOc1lYTnpJSE53WldOcFptbGpZWFJwYjI0Z2EyVjVjeUIwYnlCemNHVmphV0ZzSUhCeWIyTmxjM05wYm1jZ1puVnVZM1JwYjI1ekxseHVJQ0FnS2x4dUlDQWdLaUJCYkhSb2IzVm5hQ0IwYUdWelpTQmhjbVVnWkdWamJHRnlaV1FnYkdsclpTQnBibk4wWVc1alpTQndjbTl3WlhKMGFXVnpJR2x1SUhSb1pTQnpjR1ZqYVdacFkyRjBhVzl1WEc0Z0lDQXFJSGRvWlc0Z1pHVm1hVzVwYm1jZ1kyeGhjM05sY3lCMWMybHVaeUJnVW1WaFkzUXVZM0psWVhSbFEyeGhjM05nTENCMGFHVjVJR0Z5WlNCaFkzUjFZV3hzZVNCemRHRjBhV05jYmlBZ0lDb2dZVzVrSUdGeVpTQmhZMk5sYzNOcFlteGxJRzl1SUhSb1pTQmpiMjV6ZEhKMVkzUnZjaUJwYm5OMFpXRmtJRzltSUhSb1pTQndjbTkwYjNSNWNHVXVJRVJsYzNCcGRHVmNiaUFnSUNvZ1ltVnBibWNnYzNSaGRHbGpMQ0IwYUdWNUlHMTFjM1FnWW1VZ1pHVm1hVzVsWkNCdmRYUnphV1JsSUc5bUlIUm9aU0JjSW5OMFlYUnBZM05jSWlCclpYa2dkVzVrWlhKY2JpQWdJQ29nZDJocFkyZ2dZV3hzSUc5MGFHVnlJSE4wWVhScFl5QnRaWFJvYjJSeklHRnlaU0JrWldacGJtVmtMbHh1SUNBZ0tpOWNiaUFnZG1GeUlGSkZVMFZTVmtWRVgxTlFSVU5mUzBWWlV5QTlJSHRjYmlBZ0lDQmthWE53YkdGNVRtRnRaVG9nWm5WdVkzUnBiMjRnS0VOdmJuTjBjblZqZEc5eUxDQmthWE53YkdGNVRtRnRaU2tnZTF4dUlDQWdJQ0FnUTI5dWMzUnlkV04wYjNJdVpHbHpjR3hoZVU1aGJXVWdQU0JrYVhOd2JHRjVUbUZ0WlR0Y2JpQWdJQ0I5TEZ4dUlDQWdJRzFwZUdsdWN6b2dablZ1WTNScGIyNGdLRU52Ym5OMGNuVmpkRzl5TENCdGFYaHBibk1wSUh0Y2JpQWdJQ0FnSUdsbUlDaHRhWGhwYm5NcElIdGNiaUFnSUNBZ0lDQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0J0YVhocGJuTXViR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQnRhWGhUY0dWalNXNTBiME52YlhCdmJtVnVkQ2hEYjI1emRISjFZM1J2Y2l3Z2JXbDRhVzV6VzJsZEtUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdmVnh1SUNBZ0lIMHNYRzRnSUNBZ1kyaHBiR1JEYjI1MFpYaDBWSGx3WlhNNklHWjFibU4wYVc5dUlDaERiMjV6ZEhKMVkzUnZjaXdnWTJocGJHUkRiMjUwWlhoMFZIbHdaWE1wSUh0Y2JpQWdJQ0FnSUdsbUlDaHdjbTlqWlhOekxtVnVkaTVPVDBSRlgwVk9WaUFoUFQwZ0ozQnliMlIxWTNScGIyNG5LU0I3WEc0Z0lDQWdJQ0FnSUhaaGJHbGtZWFJsVkhsd1pVUmxaaWhEYjI1emRISjFZM1J2Y2l3Z1kyaHBiR1JEYjI1MFpYaDBWSGx3WlhNc0lDZGphR2xzWkVOdmJuUmxlSFFuS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUVOdmJuTjBjblZqZEc5eUxtTm9hV3hrUTI5dWRHVjRkRlI1Y0dWeklEMGdYMkZ6YzJsbmJpaDdmU3dnUTI5dWMzUnlkV04wYjNJdVkyaHBiR1JEYjI1MFpYaDBWSGx3WlhNc0lHTm9hV3hrUTI5dWRHVjRkRlI1Y0dWektUdGNiaUFnSUNCOUxGeHVJQ0FnSUdOdmJuUmxlSFJVZVhCbGN6b2dablZ1WTNScGIyNGdLRU52Ym5OMGNuVmpkRzl5TENCamIyNTBaWGgwVkhsd1pYTXBJSHRjYmlBZ0lDQWdJR2xtSUNod2NtOWpaWE56TG1WdWRpNU9UMFJGWDBWT1ZpQWhQVDBnSjNCeWIyUjFZM1JwYjI0bktTQjdYRzRnSUNBZ0lDQWdJSFpoYkdsa1lYUmxWSGx3WlVSbFppaERiMjV6ZEhKMVkzUnZjaXdnWTI5dWRHVjRkRlI1Y0dWekxDQW5ZMjl1ZEdWNGRDY3BPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdRMjl1YzNSeWRXTjBiM0l1WTI5dWRHVjRkRlI1Y0dWeklEMGdYMkZ6YzJsbmJpaDdmU3dnUTI5dWMzUnlkV04wYjNJdVkyOXVkR1Y0ZEZSNWNHVnpMQ0JqYjI1MFpYaDBWSGx3WlhNcE8xeHVJQ0FnSUgwc1hHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1UzQmxZMmxoYkNCallYTmxJR2RsZEVSbFptRjFiSFJRY205d2N5QjNhR2xqYUNCemFHOTFiR1FnYlc5MlpTQnBiblJ2SUhOMFlYUnBZM01nWW5WMElISmxjWFZwY21WelhHNGdJQ0FnSUNvZ1lYVjBiMjFoZEdsaklHMWxjbWRwYm1jdVhHNGdJQ0FnSUNvdlhHNGdJQ0FnWjJWMFJHVm1ZWFZzZEZCeWIzQnpPaUJtZFc1amRHbHZiaUFvUTI5dWMzUnlkV04wYjNJc0lHZGxkRVJsWm1GMWJIUlFjbTl3Y3lrZ2UxeHVJQ0FnSUNBZ2FXWWdLRU52Ym5OMGNuVmpkRzl5TG1kbGRFUmxabUYxYkhSUWNtOXdjeWtnZTF4dUlDQWdJQ0FnSUNCRGIyNXpkSEoxWTNSdmNpNW5aWFJFWldaaGRXeDBVSEp2Y0hNZ1BTQmpjbVZoZEdWTlpYSm5aV1JTWlhOMWJIUkdkVzVqZEdsdmJpaERiMjV6ZEhKMVkzUnZjaTVuWlhSRVpXWmhkV3gwVUhKdmNITXNJR2RsZEVSbFptRjFiSFJRY205d2N5azdYRzRnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQkRiMjV6ZEhKMVkzUnZjaTVuWlhSRVpXWmhkV3gwVUhKdmNITWdQU0JuWlhSRVpXWmhkV3gwVUhKdmNITTdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZTeGNiaUFnSUNCd2NtOXdWSGx3WlhNNklHWjFibU4wYVc5dUlDaERiMjV6ZEhKMVkzUnZjaXdnY0hKdmNGUjVjR1Z6S1NCN1hHNGdJQ0FnSUNCcFppQW9jSEp2WTJWemN5NWxibll1VGs5RVJWOUZUbFlnSVQwOUlDZHdjbTlrZFdOMGFXOXVKeWtnZTF4dUlDQWdJQ0FnSUNCMllXeHBaR0YwWlZSNWNHVkVaV1lvUTI5dWMzUnlkV04wYjNJc0lIQnliM0JVZVhCbGN5d2dKM0J5YjNBbktUdGNiaUFnSUNBZ0lIMWNiaUFnSUNBZ0lFTnZibk4wY25WamRHOXlMbkJ5YjNCVWVYQmxjeUE5SUY5aGMzTnBaMjRvZTMwc0lFTnZibk4wY25WamRHOXlMbkJ5YjNCVWVYQmxjeXdnY0hKdmNGUjVjR1Z6S1R0Y2JpQWdJQ0I5TEZ4dUlDQWdJSE4wWVhScFkzTTZJR1oxYm1OMGFXOXVJQ2hEYjI1emRISjFZM1J2Y2l3Z2MzUmhkR2xqY3lrZ2UxeHVJQ0FnSUNBZ2JXbDRVM1JoZEdsalUzQmxZMGx1ZEc5RGIyMXdiMjVsYm5Rb1EyOXVjM1J5ZFdOMGIzSXNJSE4wWVhScFkzTXBPMXh1SUNBZ0lIMHNYRzRnSUNBZ1lYVjBiMkpwYm1RNklHWjFibU4wYVc5dUlDZ3BJSHQ5SUgwN1hHNWNiaUFnWm5WdVkzUnBiMjRnZG1Gc2FXUmhkR1ZVZVhCbFJHVm1LRU52Ym5OMGNuVmpkRzl5TENCMGVYQmxSR1ZtTENCc2IyTmhkR2x2YmlrZ2UxeHVJQ0FnSUdadmNpQW9kbUZ5SUhCeWIzQk9ZVzFsSUdsdUlIUjVjR1ZFWldZcElIdGNiaUFnSUNBZ0lHbG1JQ2gwZVhCbFJHVm1MbWhoYzA5M2JsQnliM0JsY25SNUtIQnliM0JPWVcxbEtTa2dlMXh1SUNBZ0lDQWdJQ0F2THlCMWMyVWdZU0IzWVhKdWFXNW5JR2x1YzNSbFlXUWdiMllnWVc0Z1gybHVkbUZ5YVdGdWRDQnpieUJqYjIxd2IyNWxiblJ6WEc0Z0lDQWdJQ0FnSUM4dklHUnZiaWQwSUhOb2IzY2dkWEFnYVc0Z2NISnZaQ0JpZFhRZ2IyNXNlU0JwYmlCZlgwUkZWbDlmWEc0Z0lDQWdJQ0FnSUhCeWIyTmxjM011Wlc1MkxrNVBSRVZmUlU1V0lDRTlQU0FuY0hKdlpIVmpkR2x2YmljZ1B5QjNZWEp1YVc1bktIUjVjR1Z2WmlCMGVYQmxSR1ZtVzNCeWIzQk9ZVzFsWFNBOVBUMGdKMloxYm1OMGFXOXVKeXdnSnlWek9pQWxjeUIwZVhCbElHQWxjMkFnYVhNZ2FXNTJZV3hwWkRzZ2FYUWdiWFZ6ZENCaVpTQmhJR1oxYm1OMGFXOXVMQ0IxYzNWaGJHeDVJR1p5YjIwZ0p5QXJJQ2RTWldGamRDNVFjbTl3Vkhsd1pYTXVKeXdnUTI5dWMzUnlkV04wYjNJdVpHbHpjR3hoZVU1aGJXVWdmSHdnSjFKbFlXTjBRMnhoYzNNbkxDQlNaV0ZqZEZCeWIzQlVlWEJsVEc5allYUnBiMjVPWVcxbGMxdHNiMk5oZEdsdmJsMHNJSEJ5YjNCT1lXMWxLU0E2SUhadmFXUWdNRHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUIyWVd4cFpHRjBaVTFsZEdodlpFOTJaWEp5YVdSbEtHbHpRV3h5WldGa2VVUmxabWx1WldRc0lHNWhiV1VwSUh0Y2JpQWdJQ0IyWVhJZ2MzQmxZMUJ2YkdsamVTQTlJRkpsWVdOMFEyeGhjM05KYm5SbGNtWmhZMlV1YUdGelQzZHVVSEp2Y0dWeWRIa29ibUZ0WlNrZ1B5QlNaV0ZqZEVOc1lYTnpTVzUwWlhKbVlXTmxXMjVoYldWZElEb2diblZzYkR0Y2JseHVJQ0FnSUM4dklFUnBjMkZzYkc5M0lHOTJaWEp5YVdScGJtY2diMllnWW1GelpTQmpiR0Z6Y3lCdFpYUm9iMlJ6SUhWdWJHVnpjeUJsZUhCc2FXTnBkR3g1SUdGc2JHOTNaV1F1WEc0Z0lDQWdhV1lnS0ZKbFlXTjBRMnhoYzNOTmFYaHBiaTVvWVhOUGQyNVFjbTl3WlhKMGVTaHVZVzFsS1NrZ2UxeHVJQ0FnSUNBZ1gybHVkbUZ5YVdGdWRDaHpjR1ZqVUc5c2FXTjVJRDA5UFNBblQxWkZVbEpKUkVWZlFrRlRSU2NzSUNkU1pXRmpkRU5zWVhOelNXNTBaWEptWVdObE9pQlpiM1VnWVhKbElHRjBkR1Z0Y0hScGJtY2dkRzhnYjNabGNuSnBaR1VnSnlBcklDZGdKWE5nSUdaeWIyMGdlVzkxY2lCamJHRnpjeUJ6Y0dWamFXWnBZMkYwYVc5dUxpQkZibk4xY21VZ2RHaGhkQ0I1YjNWeUlHMWxkR2h2WkNCdVlXMWxjeUFuSUNzZ0oyUnZJRzV2ZENCdmRtVnliR0Z3SUhkcGRHZ2dVbVZoWTNRZ2JXVjBhRzlrY3k0bkxDQnVZVzFsS1R0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0F2THlCRWFYTmhiR3h2ZHlCa1pXWnBibWx1WnlCdFpYUm9iMlJ6SUcxdmNtVWdkR2hoYmlCdmJtTmxJSFZ1YkdWemN5QmxlSEJzYVdOcGRHeDVJR0ZzYkc5M1pXUXVYRzRnSUNBZ2FXWWdLR2x6UVd4eVpXRmtlVVJsWm1sdVpXUXBJSHRjYmlBZ0lDQWdJRjlwYm5aaGNtbGhiblFvYzNCbFkxQnZiR2xqZVNBOVBUMGdKMFJGUmtsT1JWOU5RVTVaSnlCOGZDQnpjR1ZqVUc5c2FXTjVJRDA5UFNBblJFVkdTVTVGWDAxQlRsbGZUVVZTUjBWRUp5d2dKMUpsWVdOMFEyeGhjM05KYm5SbGNtWmhZMlU2SUZsdmRTQmhjbVVnWVhSMFpXMXdkR2x1WnlCMGJ5QmtaV1pwYm1VZ0p5QXJJQ2RnSlhOZ0lHOXVJSGx2ZFhJZ1kyOXRjRzl1Wlc1MElHMXZjbVVnZEdoaGJpQnZibU5sTGlCVWFHbHpJR052Ym1ac2FXTjBJRzFoZVNCaVpTQmtkV1VnSnlBcklDZDBieUJoSUcxcGVHbHVMaWNzSUc1aGJXVXBPMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJQzhxS2x4dUlDQWdLaUJOYVhocGJpQm9aV3h3WlhJZ2QyaHBZMmdnYUdGdVpHeGxjeUJ3YjJ4cFkza2dkbUZzYVdSaGRHbHZiaUJoYm1RZ2NtVnpaWEoyWldSY2JpQWdJQ29nYzNCbFkybG1hV05oZEdsdmJpQnJaWGx6SUhkb1pXNGdZblZwYkdScGJtY2dVbVZoWTNRZ1kyeGhjM05sY3k1Y2JpQWdJQ292WEc0Z0lHWjFibU4wYVc5dUlHMXBlRk53WldOSmJuUnZRMjl0Y0c5dVpXNTBLRU52Ym5OMGNuVmpkRzl5TENCemNHVmpLU0I3WEc0Z0lDQWdhV1lnS0NGemNHVmpLU0I3WEc0Z0lDQWdJQ0JwWmlBb2NISnZZMlZ6Y3k1bGJuWXVUazlFUlY5RlRsWWdJVDA5SUNkd2NtOWtkV04wYVc5dUp5a2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ2RIbHdaVzltVTNCbFl5QTlJSFI1Y0dWdlppQnpjR1ZqTzF4dUlDQWdJQ0FnSUNCMllYSWdhWE5OYVhocGJsWmhiR2xrSUQwZ2RIbHdaVzltVTNCbFl5QTlQVDBnSjI5aWFtVmpkQ2NnSmlZZ2MzQmxZeUFoUFQwZ2JuVnNiRHRjYmx4dUlDQWdJQ0FnSUNCd2NtOWpaWE56TG1WdWRpNU9UMFJGWDBWT1ZpQWhQVDBnSjNCeWIyUjFZM1JwYjI0bklEOGdkMkZ5Ym1sdVp5aHBjMDFwZUdsdVZtRnNhV1FzSUNjbGN6b2dXVzkxWEZ3bmNtVWdZWFIwWlcxd2RHbHVaeUIwYnlCcGJtTnNkV1JsSUdFZ2JXbDRhVzRnZEdoaGRDQnBjeUJsYVhSb1pYSWdiblZzYkNBbklDc2dKMjl5SUc1dmRDQmhiaUJ2WW1wbFkzUXVJRU5vWldOcklIUm9aU0J0YVhocGJuTWdhVzVqYkhWa1pXUWdZbmtnZEdobElHTnZiWEJ2Ym1WdWRDd2dKeUFySUNkaGN5QjNaV3hzSUdGeklHRnVlU0J0YVhocGJuTWdkR2hsZVNCcGJtTnNkV1JsSUhSb1pXMXpaV3gyWlhNdUlDY2dLeUFuUlhod1pXTjBaV1FnYjJKcVpXTjBJR0oxZENCbmIzUWdKWE11Snl3Z1EyOXVjM1J5ZFdOMGIzSXVaR2x6Y0d4aGVVNWhiV1VnZkh3Z0oxSmxZV04wUTJ4aGMzTW5MQ0J6Y0dWaklEMDlQU0J1ZFd4c0lEOGdiblZzYkNBNklIUjVjR1Z2WmxOd1pXTXBJRG9nZG05cFpDQXdPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ1gybHVkbUZ5YVdGdWRDaDBlWEJsYjJZZ2MzQmxZeUFoUFQwZ0oyWjFibU4wYVc5dUp5d2dKMUpsWVdOMFEyeGhjM002SUZsdmRWeGNKM0psSUdGMGRHVnRjSFJwYm1jZ2RHOGdKeUFySUNkMWMyVWdZU0JqYjIxd2IyNWxiblFnWTJ4aGMzTWdiM0lnWm5WdVkzUnBiMjRnWVhNZ1lTQnRhWGhwYmk0Z1NXNXpkR1ZoWkN3Z2FuVnpkQ0IxYzJVZ1lTQW5JQ3NnSjNKbFozVnNZWElnYjJKcVpXTjBMaWNwTzF4dUlDQWdJRjlwYm5aaGNtbGhiblFvSVdselZtRnNhV1JGYkdWdFpXNTBLSE53WldNcExDQW5VbVZoWTNSRGJHRnpjem9nV1c5MVhGd25jbVVnWVhSMFpXMXdkR2x1WnlCMGJ5QW5JQ3NnSjNWelpTQmhJR052YlhCdmJtVnVkQ0JoY3lCaElHMXBlR2x1TGlCSmJuTjBaV0ZrTENCcWRYTjBJSFZ6WlNCaElISmxaM1ZzWVhJZ2IySnFaV04wTGljcE8xeHVYRzRnSUNBZ2RtRnlJSEJ5YjNSdklEMGdRMjl1YzNSeWRXTjBiM0l1Y0hKdmRHOTBlWEJsTzF4dUlDQWdJSFpoY2lCaGRYUnZRbWx1WkZCaGFYSnpJRDBnY0hKdmRHOHVYMTl5WldGamRFRjFkRzlDYVc1a1VHRnBjbk03WEc1Y2JpQWdJQ0F2THlCQ2VTQm9ZVzVrYkdsdVp5QnRhWGhwYm5NZ1ltVm1iM0psSUdGdWVTQnZkR2hsY2lCd2NtOXdaWEowYVdWekxDQjNaU0JsYm5OMWNtVWdkR2hsSUhOaGJXVmNiaUFnSUNBdkx5QmphR0ZwYm1sdVp5QnZjbVJsY2lCcGN5QmhjSEJzYVdWa0lIUnZJRzFsZEdodlpITWdkMmwwYUNCRVJVWkpUa1ZmVFVGT1dTQndiMnhwWTNrc0lIZG9aWFJvWlhKY2JpQWdJQ0F2THlCdGFYaHBibk1nWVhKbElHeHBjM1JsWkNCaVpXWnZjbVVnYjNJZ1lXWjBaWElnZEdobGMyVWdiV1YwYUc5a2N5QnBiaUIwYUdVZ2MzQmxZeTVjYmlBZ0lDQnBaaUFvYzNCbFl5NW9ZWE5QZDI1UWNtOXdaWEowZVNoTlNWaEpUbE5mUzBWWktTa2dlMXh1SUNBZ0lDQWdVa1ZUUlZKV1JVUmZVMUJGUTE5TFJWbFRMbTFwZUdsdWN5aERiMjV6ZEhKMVkzUnZjaXdnYzNCbFl5NXRhWGhwYm5NcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdadmNpQW9kbUZ5SUc1aGJXVWdhVzRnYzNCbFl5a2dlMXh1SUNBZ0lDQWdhV1lnS0NGemNHVmpMbWhoYzA5M2JsQnliM0JsY25SNUtHNWhiV1VwS1NCN1hHNGdJQ0FnSUNBZ0lHTnZiblJwYm5WbE8xeHVJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQnBaaUFvYm1GdFpTQTlQVDBnVFVsWVNVNVRYMHRGV1NrZ2UxeHVJQ0FnSUNBZ0lDQXZMeUJYWlNCb1lYWmxJR0ZzY21WaFpIa2dhR0Z1Wkd4bFpDQnRhWGhwYm5NZ2FXNGdZU0J6Y0dWamFXRnNJR05oYzJVZ1lXSnZkbVV1WEc0Z0lDQWdJQ0FnSUdOdmJuUnBiblZsTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCMllYSWdjSEp2Y0dWeWRIa2dQU0J6Y0dWalcyNWhiV1ZkTzF4dUlDQWdJQ0FnZG1GeUlHbHpRV3h5WldGa2VVUmxabWx1WldRZ1BTQndjbTkwYnk1b1lYTlBkMjVRY205d1pYSjBlU2h1WVcxbEtUdGNiaUFnSUNBZ0lIWmhiR2xrWVhSbFRXVjBhRzlrVDNabGNuSnBaR1VvYVhOQmJISmxZV1I1UkdWbWFXNWxaQ3dnYm1GdFpTazdYRzVjYmlBZ0lDQWdJR2xtSUNoU1JWTkZVbFpGUkY5VFVFVkRYMHRGV1ZNdWFHRnpUM2R1VUhKdmNHVnlkSGtvYm1GdFpTa3BJSHRjYmlBZ0lDQWdJQ0FnVWtWVFJWSldSVVJmVTFCRlExOUxSVmxUVzI1aGJXVmRLRU52Ym5OMGNuVmpkRzl5TENCd2NtOXdaWEowZVNrN1hHNGdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBdkx5QlRaWFIxY0NCdFpYUm9iMlJ6SUc5dUlIQnliM1J2ZEhsd1pUcGNiaUFnSUNBZ0lDQWdMeThnVkdobElHWnZiR3h2ZDJsdVp5QnRaVzFpWlhJZ2JXVjBhRzlrY3lCemFHOTFiR1FnYm05MElHSmxJR0YxZEc5dFlYUnBZMkZzYkhrZ1ltOTFibVE2WEc0Z0lDQWdJQ0FnSUM4dklERXVJRVY0Y0dWamRHVmtJRkpsWVdOMFEyeGhjM01nYldWMGFHOWtjeUFvYVc0Z2RHaGxJRndpYVc1MFpYSm1ZV05sWENJcExseHVJQ0FnSUNBZ0lDQXZMeUF5TGlCUGRtVnljbWxrWkdWdUlHMWxkR2h2WkhNZ0tIUm9ZWFFnZDJWeVpTQnRhWGhsWkNCcGJpa3VYRzRnSUNBZ0lDQWdJSFpoY2lCcGMxSmxZV04wUTJ4aGMzTk5aWFJvYjJRZ1BTQlNaV0ZqZEVOc1lYTnpTVzUwWlhKbVlXTmxMbWhoYzA5M2JsQnliM0JsY25SNUtHNWhiV1VwTzF4dUlDQWdJQ0FnSUNCMllYSWdhWE5HZFc1amRHbHZiaUE5SUhSNWNHVnZaaUJ3Y205d1pYSjBlU0E5UFQwZ0oyWjFibU4wYVc5dUp6dGNiaUFnSUNBZ0lDQWdkbUZ5SUhOb2IzVnNaRUYxZEc5Q2FXNWtJRDBnYVhOR2RXNWpkR2x2YmlBbUppQWhhWE5TWldGamRFTnNZWE56VFdWMGFHOWtJQ1ltSUNGcGMwRnNjbVZoWkhsRVpXWnBibVZrSUNZbUlITndaV011WVhWMGIySnBibVFnSVQwOUlHWmhiSE5sTzF4dVhHNGdJQ0FnSUNBZ0lHbG1JQ2h6YUc5MWJHUkJkWFJ2UW1sdVpDa2dlMXh1SUNBZ0lDQWdJQ0FnSUdGMWRHOUNhVzVrVUdGcGNuTXVjSFZ6YUNodVlXMWxMQ0J3Y205d1pYSjBlU2s3WEc0Z0lDQWdJQ0FnSUNBZ2NISnZkRzliYm1GdFpWMGdQU0J3Y205d1pYSjBlVHRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNCcFppQW9hWE5CYkhKbFlXUjVSR1ZtYVc1bFpDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSE53WldOUWIyeHBZM2tnUFNCU1pXRmpkRU5zWVhOelNXNTBaWEptWVdObFcyNWhiV1ZkTzF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0F2THlCVWFHVnpaU0JqWVhObGN5QnphRzkxYkdRZ1lXeHlaV0ZrZVNCaVpTQmpZWFZuYUhRZ1lua2dkbUZzYVdSaGRHVk5aWFJvYjJSUGRtVnljbWxrWlM1Y2JpQWdJQ0FnSUNBZ0lDQWdJRjlwYm5aaGNtbGhiblFvYVhOU1pXRmpkRU5zWVhOelRXVjBhRzlrSUNZbUlDaHpjR1ZqVUc5c2FXTjVJRDA5UFNBblJFVkdTVTVGWDAxQlRsbGZUVVZTUjBWRUp5QjhmQ0J6Y0dWalVHOXNhV041SUQwOVBTQW5SRVZHU1U1RlgwMUJUbGtuS1N3Z0oxSmxZV04wUTJ4aGMzTTZJRlZ1Wlhod1pXTjBaV1FnYzNCbFl5QndiMnhwWTNrZ0pYTWdabTl5SUd0bGVTQWxjeUFuSUNzZ0ozZG9aVzRnYldsNGFXNW5JR2x1SUdOdmJYQnZibVZ1ZENCemNHVmpjeTRuTENCemNHVmpVRzlzYVdONUxDQnVZVzFsS1R0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z1JtOXlJRzFsZEdodlpITWdkMmhwWTJnZ1lYSmxJR1JsWm1sdVpXUWdiVzl5WlNCMGFHRnVJRzl1WTJVc0lHTmhiR3dnZEdobElHVjRhWE4wYVc1blhHNGdJQ0FnSUNBZ0lDQWdJQ0F2THlCdFpYUm9iMlJ6SUdKbFptOXlaU0JqWVd4c2FXNW5JSFJvWlNCdVpYY2djSEp2Y0dWeWRIa3NJRzFsY21kcGJtY2dhV1lnWVhCd2NtOXdjbWxoZEdVdVhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2MzQmxZMUJ2YkdsamVTQTlQVDBnSjBSRlJrbE9SVjlOUVU1WlgwMUZVa2RGUkNjcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ2NISnZkRzliYm1GdFpWMGdQU0JqY21WaGRHVk5aWEpuWldSU1pYTjFiSFJHZFc1amRHbHZiaWh3Y205MGIxdHVZVzFsWFN3Z2NISnZjR1Z5ZEhrcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlNCbGJITmxJR2xtSUNoemNHVmpVRzlzYVdONUlEMDlQU0FuUkVWR1NVNUZYMDFCVGxrbktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lIQnliM1J2VzI1aGJXVmRJRDBnWTNKbFlYUmxRMmhoYVc1bFpFWjFibU4wYVc5dUtIQnliM1J2VzI1aGJXVmRMQ0J3Y205d1pYSjBlU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIQnliM1J2VzI1aGJXVmRJRDBnY0hKdmNHVnlkSGs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvY0hKdlkyVnpjeTVsYm5ZdVRrOUVSVjlGVGxZZ0lUMDlJQ2R3Y205a2RXTjBhVzl1SnlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkx5QkJaR1FnZG1WeVltOXpaU0JrYVhOd2JHRjVUbUZ0WlNCMGJ5QjBhR1VnWm5WdVkzUnBiMjRzSUhkb2FXTm9JR2hsYkhCeklIZG9aVzRnYkc5dmEybHVaMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMeUJoZENCd2NtOW1hV3hwYm1jZ2RHOXZiSE11WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoMGVYQmxiMllnY0hKdmNHVnlkSGtnUFQwOUlDZG1kVzVqZEdsdmJpY2dKaVlnYzNCbFl5NWthWE53YkdGNVRtRnRaU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhCeWIzUnZXMjVoYldWZExtUnBjM0JzWVhsT1lXMWxJRDBnYzNCbFl5NWthWE53YkdGNVRtRnRaU0FySUNkZkp5QXJJRzVoYldVN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQnRhWGhUZEdGMGFXTlRjR1ZqU1c1MGIwTnZiWEJ2Ym1WdWRDaERiMjV6ZEhKMVkzUnZjaXdnYzNSaGRHbGpjeWtnZTF4dUlDQWdJR2xtSUNnaGMzUmhkR2xqY3lrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1TzF4dUlDQWdJSDFjYmlBZ0lDQm1iM0lnS0haaGNpQnVZVzFsSUdsdUlITjBZWFJwWTNNcElIdGNiaUFnSUNBZ0lIWmhjaUJ3Y205d1pYSjBlU0E5SUhOMFlYUnBZM05iYm1GdFpWMDdYRzRnSUNBZ0lDQnBaaUFvSVhOMFlYUnBZM011YUdGelQzZHVVSEp2Y0dWeWRIa29ibUZ0WlNrcElIdGNiaUFnSUNBZ0lDQWdZMjl1ZEdsdWRXVTdYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJSFpoY2lCcGMxSmxjMlZ5ZG1Wa0lEMGdibUZ0WlNCcGJpQlNSVk5GVWxaRlJGOVRVRVZEWDB0RldWTTdYRzRnSUNBZ0lDQmZhVzUyWVhKcFlXNTBLQ0ZwYzFKbGMyVnlkbVZrTENBblVtVmhZM1JEYkdGemN6b2dXVzkxSUdGeVpTQmhkSFJsYlhCMGFXNW5JSFJ2SUdSbFptbHVaU0JoSUhKbGMyVnlkbVZrSUNjZ0t5QW5jSEp2Y0dWeWRIa3NJR0FsYzJBc0lIUm9ZWFFnYzJodmRXeGtibHhjSjNRZ1ltVWdiMjRnZEdobElGd2ljM1JoZEdsamMxd2lJR3RsZVM0Z1JHVm1hVzVsSUdsMElDY2dLeUFuWVhNZ1lXNGdhVzV6ZEdGdVkyVWdjSEp2Y0dWeWRIa2dhVzV6ZEdWaFpEc2dhWFFnZDJsc2JDQnpkR2xzYkNCaVpTQmhZMk5sYzNOcFlteGxJRzl1SUhSb1pTQW5JQ3NnSjJOdmJuTjBjblZqZEc5eUxpY3NJRzVoYldVcE8xeHVYRzRnSUNBZ0lDQjJZWElnYVhOSmJtaGxjbWwwWldRZ1BTQnVZVzFsSUdsdUlFTnZibk4wY25WamRHOXlPMXh1SUNBZ0lDQWdYMmx1ZG1GeWFXRnVkQ2doYVhOSmJtaGxjbWwwWldRc0lDZFNaV0ZqZEVOc1lYTnpPaUJaYjNVZ1lYSmxJR0YwZEdWdGNIUnBibWNnZEc4Z1pHVm1hVzVsSUNjZ0t5QW5ZQ1Z6WUNCdmJpQjViM1Z5SUdOdmJYQnZibVZ1ZENCdGIzSmxJSFJvWVc0Z2IyNWpaUzRnVkdocGN5QmpiMjVtYkdsamRDQnRZWGtnWW1VZ0p5QXJJQ2RrZFdVZ2RHOGdZU0J0YVhocGJpNG5MQ0J1WVcxbEtUdGNiaUFnSUNBZ0lFTnZibk4wY25WamRHOXlXMjVoYldWZElEMGdjSEp2Y0dWeWRIazdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdMeW9xWEc0Z0lDQXFJRTFsY21kbElIUjNieUJ2WW1wbFkzUnpMQ0JpZFhRZ2RHaHliM2NnYVdZZ1ltOTBhQ0JqYjI1MFlXbHVJSFJvWlNCellXMWxJR3RsZVM1Y2JpQWdJQ3BjYmlBZ0lDb2dRSEJoY21GdElIdHZZbXBsWTNSOUlHOXVaU0JVYUdVZ1ptbHljM1FnYjJKcVpXTjBMQ0IzYUdsamFDQnBjeUJ0ZFhSaGRHVmtMbHh1SUNBZ0tpQkFjR0Z5WVcwZ2UyOWlhbVZqZEgwZ2RIZHZJRlJvWlNCelpXTnZibVFnYjJKcVpXTjBYRzRnSUNBcUlFQnlaWFIxY200Z2UyOWlhbVZqZEgwZ2IyNWxJR0ZtZEdWeUlHbDBJR2hoY3lCaVpXVnVJRzExZEdGMFpXUWdkRzhnWTI5dWRHRnBiaUJsZG1WeWVYUm9hVzVuSUdsdUlIUjNieTVjYmlBZ0lDb3ZYRzRnSUdaMWJtTjBhVzl1SUcxbGNtZGxTVzUwYjFkcGRHaE9iMFIxY0d4cFkyRjBaVXRsZVhNb2IyNWxMQ0IwZDI4cElIdGNiaUFnSUNCZmFXNTJZWEpwWVc1MEtHOXVaU0FtSmlCMGQyOGdKaVlnZEhsd1pXOW1JRzl1WlNBOVBUMGdKMjlpYW1WamRDY2dKaVlnZEhsd1pXOW1JSFIzYnlBOVBUMGdKMjlpYW1WamRDY3NJQ2R0WlhKblpVbHVkRzlYYVhSb1RtOUVkWEJzYVdOaGRHVkxaWGx6S0NrNklFTmhibTV2ZENCdFpYSm5aU0J1YjI0dGIySnFaV04wY3k0bktUdGNibHh1SUNBZ0lHWnZjaUFvZG1GeUlHdGxlU0JwYmlCMGQyOHBJSHRjYmlBZ0lDQWdJR2xtSUNoMGQyOHVhR0Z6VDNkdVVISnZjR1Z5ZEhrb2EyVjVLU2tnZTF4dUlDQWdJQ0FnSUNCZmFXNTJZWEpwWVc1MEtHOXVaVnRyWlhsZElEMDlQU0IxYm1SbFptbHVaV1FzSUNkdFpYSm5aVWx1ZEc5WGFYUm9UbTlFZFhCc2FXTmhkR1ZMWlhsektDazZJQ2NnS3lBblZISnBaV1FnZEc4Z2JXVnlaMlVnZEhkdklHOWlhbVZqZEhNZ2QybDBhQ0IwYUdVZ2MyRnRaU0JyWlhrNklHQWxjMkF1SUZSb2FYTWdZMjl1Wm14cFkzUWdKeUFySUNkdFlYa2dZbVVnWkhWbElIUnZJR0VnYldsNGFXNDdJR2x1SUhCaGNuUnBZM1ZzWVhJc0lIUm9hWE1nYldGNUlHSmxJR05oZFhObFpDQmllU0IwZDI4Z0p5QXJJQ2RuWlhSSmJtbDBhV0ZzVTNSaGRHVW9LU0J2Y2lCblpYUkVaV1poZFd4MFVISnZjSE1vS1NCdFpYUm9iMlJ6SUhKbGRIVnlibWx1WnlCdlltcGxZM1J6SUNjZ0t5QW5kMmwwYUNCamJHRnphR2x1WnlCclpYbHpMaWNzSUd0bGVTazdYRzRnSUNBZ0lDQWdJRzl1WlZ0clpYbGRJRDBnZEhkdlcydGxlVjA3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVnh1SUNBZ0lISmxkSFZ5YmlCdmJtVTdYRzRnSUgxY2JseHVJQ0F2S2lwY2JpQWdJQ29nUTNKbFlYUmxjeUJoSUdaMWJtTjBhVzl1SUhSb1lYUWdhVzUyYjJ0bGN5QjBkMjhnWm5WdVkzUnBiMjV6SUdGdVpDQnRaWEpuWlhNZ2RHaGxhWElnY21WMGRYSnVJSFpoYkhWbGN5NWNiaUFnSUNwY2JpQWdJQ29nUUhCaGNtRnRJSHRtZFc1amRHbHZibjBnYjI1bElFWjFibU4wYVc5dUlIUnZJR2x1ZG05clpTQm1hWEp6ZEM1Y2JpQWdJQ29nUUhCaGNtRnRJSHRtZFc1amRHbHZibjBnZEhkdklFWjFibU4wYVc5dUlIUnZJR2x1ZG05clpTQnpaV052Ym1RdVhHNGdJQ0FxSUVCeVpYUjFjbTRnZTJaMWJtTjBhVzl1ZlNCR2RXNWpkR2x2YmlCMGFHRjBJR2x1ZG05clpYTWdkR2hsSUhSM2J5QmhjbWQxYldWdWRDQm1kVzVqZEdsdmJuTXVYRzRnSUNBcUlFQndjbWwyWVhSbFhHNGdJQ0FxTDF4dUlDQm1kVzVqZEdsdmJpQmpjbVZoZEdWTlpYSm5aV1JTWlhOMWJIUkdkVzVqZEdsdmJpaHZibVVzSUhSM2J5a2dlMXh1SUNBZ0lISmxkSFZ5YmlCbWRXNWpkR2x2YmlCdFpYSm5aV1JTWlhOMWJIUW9LU0I3WEc0Z0lDQWdJQ0IyWVhJZ1lTQTlJRzl1WlM1aGNIQnNlU2gwYUdsekxDQmhjbWQxYldWdWRITXBPMXh1SUNBZ0lDQWdkbUZ5SUdJZ1BTQjBkMjh1WVhCd2JIa29kR2hwY3l3Z1lYSm5kVzFsYm5SektUdGNiaUFnSUNBZ0lHbG1JQ2hoSUQwOUlHNTFiR3dwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUdJN1hHNGdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tHSWdQVDBnYm5Wc2JDa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdZVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJSFpoY2lCaklEMGdlMzA3WEc0Z0lDQWdJQ0J0WlhKblpVbHVkRzlYYVhSb1RtOUVkWEJzYVdOaGRHVkxaWGx6S0dNc0lHRXBPMXh1SUNBZ0lDQWdiV1Z5WjJWSmJuUnZWMmwwYUU1dlJIVndiR2xqWVhSbFMyVjVjeWhqTENCaUtUdGNiaUFnSUNBZ0lISmxkSFZ5YmlCak8xeHVJQ0FnSUgwN1hHNGdJSDFjYmx4dUlDQXZLaXBjYmlBZ0lDb2dRM0psWVhSbGN5QmhJR1oxYm1OMGFXOXVJSFJvWVhRZ2FXNTJiMnRsY3lCMGQyOGdablZ1WTNScGIyNXpJR0Z1WkNCcFoyNXZjbVZ6SUhSb1pXbHlJSEpsZEhWeWJpQjJZV3hsY3k1Y2JpQWdJQ3BjYmlBZ0lDb2dRSEJoY21GdElIdG1kVzVqZEdsdmJuMGdiMjVsSUVaMWJtTjBhVzl1SUhSdklHbHVkbTlyWlNCbWFYSnpkQzVjYmlBZ0lDb2dRSEJoY21GdElIdG1kVzVqZEdsdmJuMGdkSGR2SUVaMWJtTjBhVzl1SUhSdklHbHVkbTlyWlNCelpXTnZibVF1WEc0Z0lDQXFJRUJ5WlhSMWNtNGdlMloxYm1OMGFXOXVmU0JHZFc1amRHbHZiaUIwYUdGMElHbHVkbTlyWlhNZ2RHaGxJSFIzYnlCaGNtZDFiV1Z1ZENCbWRXNWpkR2x2Ym5NdVhHNGdJQ0FxSUVCd2NtbDJZWFJsWEc0Z0lDQXFMMXh1SUNCbWRXNWpkR2x2YmlCamNtVmhkR1ZEYUdGcGJtVmtSblZ1WTNScGIyNG9iMjVsTENCMGQyOHBJSHRjYmlBZ0lDQnlaWFIxY200Z1puVnVZM1JwYjI0Z1kyaGhhVzVsWkVaMWJtTjBhVzl1S0NrZ2UxeHVJQ0FnSUNBZ2IyNWxMbUZ3Y0d4NUtIUm9hWE1zSUdGeVozVnRaVzUwY3lrN1hHNGdJQ0FnSUNCMGQyOHVZWEJ3Ykhrb2RHaHBjeXdnWVhKbmRXMWxiblJ6S1R0Y2JpQWdJQ0I5TzF4dUlDQjlYRzVjYmlBZ0x5b3FYRzRnSUNBcUlFSnBibVJ6SUdFZ2JXVjBhRzlrSUhSdklIUm9aU0JqYjIxd2IyNWxiblF1WEc0Z0lDQXFYRzRnSUNBcUlFQndZWEpoYlNCN2IySnFaV04wZlNCamIyMXdiMjVsYm5RZ1EyOXRjRzl1Wlc1MElIZG9iM05sSUcxbGRHaHZaQ0JwY3lCbmIybHVaeUIwYnlCaVpTQmliM1Z1WkM1Y2JpQWdJQ29nUUhCaGNtRnRJSHRtZFc1amRHbHZibjBnYldWMGFHOWtJRTFsZEdodlpDQjBieUJpWlNCaWIzVnVaQzVjYmlBZ0lDb2dRSEpsZEhWeWJpQjdablZ1WTNScGIyNTlJRlJvWlNCaWIzVnVaQ0J0WlhSb2IyUXVYRzRnSUNBcUwxeHVJQ0JtZFc1amRHbHZiaUJpYVc1a1FYVjBiMEpwYm1STlpYUm9iMlFvWTI5dGNHOXVaVzUwTENCdFpYUm9iMlFwSUh0Y2JpQWdJQ0IyWVhJZ1ltOTFibVJOWlhSb2IyUWdQU0J0WlhSb2IyUXVZbWx1WkNoamIyMXdiMjVsYm5RcE8xeHVJQ0FnSUdsbUlDaHdjbTlqWlhOekxtVnVkaTVPVDBSRlgwVk9WaUFoUFQwZ0ozQnliMlIxWTNScGIyNG5LU0I3WEc0Z0lDQWdJQ0JpYjNWdVpFMWxkR2h2WkM1ZlgzSmxZV04wUW05MWJtUkRiMjUwWlhoMElEMGdZMjl0Y0c5dVpXNTBPMXh1SUNBZ0lDQWdZbTkxYm1STlpYUm9iMlF1WDE5eVpXRmpkRUp2ZFc1a1RXVjBhRzlrSUQwZ2JXVjBhRzlrTzF4dUlDQWdJQ0FnWW05MWJtUk5aWFJvYjJRdVgxOXlaV0ZqZEVKdmRXNWtRWEpuZFcxbGJuUnpJRDBnYm5Wc2JEdGNiaUFnSUNBZ0lIWmhjaUJqYjIxd2IyNWxiblJPWVcxbElEMGdZMjl0Y0c5dVpXNTBMbU52Ym5OMGNuVmpkRzl5TG1ScGMzQnNZWGxPWVcxbE8xeHVJQ0FnSUNBZ2RtRnlJRjlpYVc1a0lEMGdZbTkxYm1STlpYUm9iMlF1WW1sdVpEdGNiaUFnSUNBZ0lHSnZkVzVrVFdWMGFHOWtMbUpwYm1RZ1BTQm1kVzVqZEdsdmJpQW9ibVYzVkdocGN5a2dlMXh1SUNBZ0lDQWdJQ0JtYjNJZ0tIWmhjaUJmYkdWdUlEMGdZWEpuZFcxbGJuUnpMbXhsYm1kMGFDd2dZWEpuY3lBOUlFRnljbUY1S0Y5c1pXNGdQaUF4SUQ4Z1gyeGxiaUF0SURFZ09pQXdLU3dnWDJ0bGVTQTlJREU3SUY5clpYa2dQQ0JmYkdWdU95QmZhMlY1S3lzcElIdGNiaUFnSUNBZ0lDQWdJQ0JoY21kelcxOXJaWGtnTFNBeFhTQTlJR0Z5WjNWdFpXNTBjMXRmYTJWNVhUdGNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUM4dklGVnpaWElnYVhNZ2RISjVhVzVuSUhSdklHSnBibVFvS1NCaGJpQmhkWFJ2WW05MWJtUWdiV1YwYUc5a095QjNaU0JsWm1abFkzUnBkbVZzZVNCM2FXeHNYRzRnSUNBZ0lDQWdJQzh2SUdsbmJtOXlaU0IwYUdVZ2RtRnNkV1VnYjJZZ1hDSjBhR2x6WENJZ2RHaGhkQ0IwYUdVZ2RYTmxjaUJwY3lCMGNubHBibWNnZEc4Z2RYTmxMQ0J6YjF4dUlDQWdJQ0FnSUNBdkx5QnNaWFFuY3lCM1lYSnVMbHh1SUNBZ0lDQWdJQ0JwWmlBb2JtVjNWR2hwY3lBaFBUMGdZMjl0Y0c5dVpXNTBJQ1ltSUc1bGQxUm9hWE1nSVQwOUlHNTFiR3dwSUh0Y2JpQWdJQ0FnSUNBZ0lDQndjbTlqWlhOekxtVnVkaTVPVDBSRlgwVk9WaUFoUFQwZ0ozQnliMlIxWTNScGIyNG5JRDhnZDJGeWJtbHVaeWhtWVd4elpTd2dKMkpwYm1Rb0tUb2dVbVZoWTNRZ1kyOXRjRzl1Wlc1MElHMWxkR2h2WkhNZ2JXRjVJRzl1YkhrZ1ltVWdZbTkxYm1RZ2RHOGdkR2hsSUNjZ0t5QW5ZMjl0Y0c5dVpXNTBJR2x1YzNSaGJtTmxMaUJUWldVZ0pYTW5MQ0JqYjIxd2IyNWxiblJPWVcxbEtTQTZJSFp2YVdRZ01EdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElHbG1JQ2doWVhKbmN5NXNaVzVuZEdncElIdGNiaUFnSUNBZ0lDQWdJQ0J3Y205alpYTnpMbVZ1ZGk1T1QwUkZYMFZPVmlBaFBUMGdKM0J5YjJSMVkzUnBiMjRuSUQ4Z2QyRnlibWx1WnlobVlXeHpaU3dnSjJKcGJtUW9LVG9nV1c5MUlHRnlaU0JpYVc1a2FXNW5JR0VnWTI5dGNHOXVaVzUwSUcxbGRHaHZaQ0IwYnlCMGFHVWdZMjl0Y0c5dVpXNTBMaUFuSUNzZ0oxSmxZV04wSUdSdlpYTWdkR2hwY3lCbWIzSWdlVzkxSUdGMWRHOXRZWFJwWTJGc2JIa2dhVzRnWVNCb2FXZG9MWEJsY21admNtMWhibU5sSUNjZ0t5QW5kMkY1TENCemJ5QjViM1VnWTJGdUlITmhabVZzZVNCeVpXMXZkbVVnZEdocGN5QmpZV3hzTGlCVFpXVWdKWE1uTENCamIyMXdiMjVsYm5ST1lXMWxLU0E2SUhadmFXUWdNRHRjYmlBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWW05MWJtUk5aWFJvYjJRN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdkbUZ5SUhKbFltOTFibVJOWlhSb2IyUWdQU0JmWW1sdVpDNWhjSEJzZVNoaWIzVnVaRTFsZEdodlpDd2dZWEpuZFcxbGJuUnpLVHRjYmlBZ0lDQWdJQ0FnY21WaWIzVnVaRTFsZEdodlpDNWZYM0psWVdOMFFtOTFibVJEYjI1MFpYaDBJRDBnWTI5dGNHOXVaVzUwTzF4dUlDQWdJQ0FnSUNCeVpXSnZkVzVrVFdWMGFHOWtMbDlmY21WaFkzUkNiM1Z1WkUxbGRHaHZaQ0E5SUcxbGRHaHZaRHRjYmlBZ0lDQWdJQ0FnY21WaWIzVnVaRTFsZEdodlpDNWZYM0psWVdOMFFtOTFibVJCY21kMWJXVnVkSE1nUFNCaGNtZHpPMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdjbVZpYjNWdVpFMWxkR2h2WkR0Y2JpQWdJQ0FnSUgwN1hHNGdJQ0FnZlZ4dUlDQWdJSEpsZEhWeWJpQmliM1Z1WkUxbGRHaHZaRHRjYmlBZ2ZWeHVYRzRnSUM4cUtseHVJQ0FnS2lCQ2FXNWtjeUJoYkd3Z1lYVjBieTFpYjNWdVpDQnRaWFJvYjJSeklHbHVJR0VnWTI5dGNHOXVaVzUwTGx4dUlDQWdLbHh1SUNBZ0tpQkFjR0Z5WVcwZ2UyOWlhbVZqZEgwZ1kyOXRjRzl1Wlc1MElFTnZiWEJ2Ym1WdWRDQjNhRzl6WlNCdFpYUm9iMlFnYVhNZ1oyOXBibWNnZEc4Z1ltVWdZbTkxYm1RdVhHNGdJQ0FxTDF4dUlDQm1kVzVqZEdsdmJpQmlhVzVrUVhWMGIwSnBibVJOWlhSb2IyUnpLR052YlhCdmJtVnVkQ2tnZTF4dUlDQWdJSFpoY2lCd1lXbHljeUE5SUdOdmJYQnZibVZ1ZEM1ZlgzSmxZV04wUVhWMGIwSnBibVJRWVdseWN6dGNiaUFnSUNCbWIzSWdLSFpoY2lCcElEMGdNRHNnYVNBOElIQmhhWEp6TG14bGJtZDBhRHNnYVNBclBTQXlLU0I3WEc0Z0lDQWdJQ0IyWVhJZ1lYVjBiMEpwYm1STFpYa2dQU0J3WVdseWMxdHBYVHRjYmlBZ0lDQWdJSFpoY2lCdFpYUm9iMlFnUFNCd1lXbHljMXRwSUNzZ01WMDdYRzRnSUNBZ0lDQmpiMjF3YjI1bGJuUmJZWFYwYjBKcGJtUkxaWGxkSUQwZ1ltbHVaRUYxZEc5Q2FXNWtUV1YwYUc5a0tHTnZiWEJ2Ym1WdWRDd2diV1YwYUc5a0tUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQjJZWElnU1hOTmIzVnVkR1ZrVFdsNGFXNGdQU0I3WEc0Z0lDQWdZMjl0Y0c5dVpXNTBSR2xrVFc5MWJuUTZJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0FnSUhSb2FYTXVYMTlwYzAxdmRXNTBaV1FnUFNCMGNuVmxPMXh1SUNBZ0lIMHNYRzRnSUNBZ1kyOXRjRzl1Wlc1MFYybHNiRlZ1Ylc5MWJuUTZJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0FnSUhSb2FYTXVYMTlwYzAxdmRXNTBaV1FnUFNCbVlXeHpaVHRjYmlBZ0lDQjlYRzRnSUgwN1hHNWNiaUFnTHlvcVhHNGdJQ0FxSUVGa1pDQnRiM0psSUhSdklIUm9aU0JTWldGamRFTnNZWE56SUdKaGMyVWdZMnhoYzNNdUlGUm9aWE5sSUdGeVpTQmhiR3dnYkdWbllXTjVJR1psWVhSMWNtVnpJR0Z1WkZ4dUlDQWdLaUIwYUdWeVpXWnZjbVVnYm05MElHRnNjbVZoWkhrZ2NHRnlkQ0J2WmlCMGFHVWdiVzlrWlhKdUlGSmxZV04wUTI5dGNHOXVaVzUwTGx4dUlDQWdLaTljYmlBZ2RtRnlJRkpsWVdOMFEyeGhjM05OYVhocGJpQTlJSHRjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUZSUFJFODZJRlJvYVhNZ2QybHNiQ0JpWlNCa1pYQnlaV05oZEdWa0lHSmxZMkYxYzJVZ2MzUmhkR1VnYzJodmRXeGtJR0ZzZDJGNWN5QnJaV1Z3SUdFZ1kyOXVjMmx6ZEdWdWRGeHVJQ0FnSUNBcUlIUjVjR1VnYzJsbmJtRjBkWEpsSUdGdVpDQjBhR1VnYjI1c2VTQjFjMlVnWTJGelpTQm1iM0lnZEdocGN5d2dhWE1nZEc4Z1lYWnZhV1FnZEdoaGRDNWNiaUFnSUNBZ0tpOWNiaUFnSUNCeVpYQnNZV05sVTNSaGRHVTZJR1oxYm1OMGFXOXVJQ2h1WlhkVGRHRjBaU3dnWTJGc2JHSmhZMnNwSUh0Y2JpQWdJQ0FnSUhSb2FYTXVkWEJrWVhSbGNpNWxibkYxWlhWbFVtVndiR0ZqWlZOMFlYUmxLSFJvYVhNc0lHNWxkMU4wWVhSbExDQmpZV3hzWW1GamF5azdYRzRnSUNBZ2ZTeGNibHh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRU5vWldOcmN5QjNhR1YwYUdWeUlHOXlJRzV2ZENCMGFHbHpJR052YlhCdmMybDBaU0JqYjIxd2IyNWxiblFnYVhNZ2JXOTFiblJsWkM1Y2JpQWdJQ0FnS2lCQWNtVjBkWEp1SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUcxdmRXNTBaV1FzSUdaaGJITmxJRzkwYUdWeWQybHpaUzVjYmlBZ0lDQWdLaUJBY0hKdmRHVmpkR1ZrWEc0Z0lDQWdJQ29nUUdacGJtRnNYRzRnSUNBZ0lDb3ZYRzRnSUNBZ2FYTk5iM1Z1ZEdWa09pQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdJQ0JwWmlBb2NISnZZMlZ6Y3k1bGJuWXVUazlFUlY5RlRsWWdJVDA5SUNkd2NtOWtkV04wYVc5dUp5a2dlMXh1SUNBZ0lDQWdJQ0J3Y205alpYTnpMbVZ1ZGk1T1QwUkZYMFZPVmlBaFBUMGdKM0J5YjJSMVkzUnBiMjRuSUQ4Z2QyRnlibWx1WnloMGFHbHpMbDlmWkdsa1YyRnlia2x6VFc5MWJuUmxaQ3dnSnlWek9pQnBjMDF2ZFc1MFpXUWdhWE1nWkdWd2NtVmpZWFJsWkM0Z1NXNXpkR1ZoWkN3Z2JXRnJaU0J6ZFhKbElIUnZJR05zWldGdUlIVndJQ2NnS3lBbmMzVmljMk55YVhCMGFXOXVjeUJoYm1RZ2NHVnVaR2x1WnlCeVpYRjFaWE4wY3lCcGJpQmpiMjF3YjI1bGJuUlhhV3hzVlc1dGIzVnVkQ0IwYnlBbklDc2dKM0J5WlhabGJuUWdiV1Z0YjNKNUlHeGxZV3R6TGljc0lIUm9hWE11WTI5dWMzUnlkV04wYjNJZ0ppWWdkR2hwY3k1amIyNXpkSEoxWTNSdmNpNWthWE53YkdGNVRtRnRaU0I4ZkNCMGFHbHpMbTVoYldVZ2ZId2dKME52YlhCdmJtVnVkQ2NwSURvZ2RtOXBaQ0F3TzF4dUlDQWdJQ0FnSUNCMGFHbHpMbDlmWkdsa1YyRnlia2x6VFc5MWJuUmxaQ0E5SUhSeWRXVTdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQnlaWFIxY200Z0lTRjBhR2x6TGw5ZmFYTk5iM1Z1ZEdWa08xeHVJQ0FnSUgxY2JpQWdmVHRjYmx4dUlDQjJZWElnVW1WaFkzUkRiR0Z6YzBOdmJYQnZibVZ1ZENBOUlHWjFibU4wYVc5dUlDZ3BJSHQ5TzF4dUlDQmZZWE56YVdkdUtGSmxZV04wUTJ4aGMzTkRiMjF3YjI1bGJuUXVjSEp2ZEc5MGVYQmxMQ0JTWldGamRFTnZiWEJ2Ym1WdWRDNXdjbTkwYjNSNWNHVXNJRkpsWVdOMFEyeGhjM05OYVhocGJpazdYRzVjYmlBZ0x5b3FYRzRnSUNBcUlFTnlaV0YwWlhNZ1lTQmpiMjF3YjNOcGRHVWdZMjl0Y0c5dVpXNTBJR05zWVhOeklHZHBkbVZ1SUdFZ1kyeGhjM01nYzNCbFkybG1hV05oZEdsdmJpNWNiaUFnSUNvZ1UyVmxJR2gwZEhCek9pOHZabUZqWldKdmIyc3VaMmwwYUhWaUxtbHZMM0psWVdOMEwyUnZZM012ZEc5d0xXeGxkbVZzTFdGd2FTNW9kRzFzSTNKbFlXTjBMbU55WldGMFpXTnNZWE56WEc0Z0lDQXFYRzRnSUNBcUlFQndZWEpoYlNCN2IySnFaV04wZlNCemNHVmpJRU5zWVhOeklITndaV05wWm1sallYUnBiMjRnS0hkb2FXTm9JRzExYzNRZ1pHVm1hVzVsSUdCeVpXNWtaWEpnS1M1Y2JpQWdJQ29nUUhKbGRIVnliaUI3Wm5WdVkzUnBiMjU5SUVOdmJYQnZibVZ1ZENCamIyNXpkSEoxWTNSdmNpQm1kVzVqZEdsdmJpNWNiaUFnSUNvZ1FIQjFZbXhwWTF4dUlDQWdLaTljYmlBZ1puVnVZM1JwYjI0Z1kzSmxZWFJsUTJ4aGMzTW9jM0JsWXlrZ2UxeHVJQ0FnSUM4dklGUnZJR3RsWlhBZ2IzVnlJSGRoY201cGJtZHpJRzF2Y21VZ2RXNWtaWEp6ZEdGdVpHRmliR1VzSUhkbEoyeHNJSFZ6WlNCaElHeHBkSFJzWlNCb1lXTnJJR2hsY21VZ2RHOWNiaUFnSUNBdkx5Qmxibk4xY21VZ2RHaGhkQ0JEYjI1emRISjFZM1J2Y2k1dVlXMWxJQ0U5UFNBblEyOXVjM1J5ZFdOMGIzSW5MaUJVYUdseklHMWhhMlZ6SUhOMWNtVWdkMlVnWkc5dUozUmNiaUFnSUNBdkx5QjFibTVsWTJWemMyRnlhV3g1SUdsa1pXNTBhV1o1SUdFZ1kyeGhjM01nZDJsMGFHOTFkQ0JrYVhOd2JHRjVUbUZ0WlNCaGN5QW5RMjl1YzNSeWRXTjBiM0luTGx4dUlDQWdJSFpoY2lCRGIyNXpkSEoxWTNSdmNpQTlJR2xrWlc1MGFYUjVLR1oxYm1OMGFXOXVJQ2h3Y205d2N5d2dZMjl1ZEdWNGRDd2dkWEJrWVhSbGNpa2dlMXh1SUNBZ0lDQWdMeThnVkdocGN5QmpiMjV6ZEhKMVkzUnZjaUJuWlhSeklHOTJaWEp5YVdSa1pXNGdZbmtnYlc5amEzTXVJRlJvWlNCaGNtZDFiV1Z1ZENCcGN5QjFjMlZrWEc0Z0lDQWdJQ0F2THlCaWVTQnRiMk5yY3lCMGJ5QmhjM05sY25RZ2IyNGdkMmhoZENCblpYUnpJRzF2ZFc1MFpXUXVYRzVjYmlBZ0lDQWdJR2xtSUNod2NtOWpaWE56TG1WdWRpNU9UMFJGWDBWT1ZpQWhQVDBnSjNCeWIyUjFZM1JwYjI0bktTQjdYRzRnSUNBZ0lDQWdJSEJ5YjJObGMzTXVaVzUyTGs1UFJFVmZSVTVXSUNFOVBTQW5jSEp2WkhWamRHbHZiaWNnUHlCM1lYSnVhVzVuS0hSb2FYTWdhVzV6ZEdGdVkyVnZaaUJEYjI1emRISjFZM1J2Y2l3Z0oxTnZiV1YwYUdsdVp5QnBjeUJqWVd4c2FXNW5JR0VnVW1WaFkzUWdZMjl0Y0c5dVpXNTBJR1JwY21WamRHeDVMaUJWYzJVZ1lTQm1ZV04wYjNKNUlHOXlJQ2NnS3lBblNsTllJR2x1YzNSbFlXUXVJRk5sWlRvZ2FIUjBjSE02THk5bVlpNXRaUzl5WldGamRDMXNaV2RoWTNsbVlXTjBiM0o1SnlrZ09pQjJiMmxrSURBN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDOHZJRmRwY21VZ2RYQWdZWFYwYnkxaWFXNWthVzVuWEc0Z0lDQWdJQ0JwWmlBb2RHaHBjeTVmWDNKbFlXTjBRWFYwYjBKcGJtUlFZV2x5Y3k1c1pXNW5kR2dwSUh0Y2JpQWdJQ0FnSUNBZ1ltbHVaRUYxZEc5Q2FXNWtUV1YwYUc5a2N5aDBhR2x6S1R0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2RHaHBjeTV3Y205d2N5QTlJSEJ5YjNCek8xeHVJQ0FnSUNBZ2RHaHBjeTVqYjI1MFpYaDBJRDBnWTI5dWRHVjRkRHRjYmlBZ0lDQWdJSFJvYVhNdWNtVm1jeUE5SUdWdGNIUjVUMkpxWldOME8xeHVJQ0FnSUNBZ2RHaHBjeTUxY0dSaGRHVnlJRDBnZFhCa1lYUmxjaUI4ZkNCU1pXRmpkRTV2YjNCVmNHUmhkR1ZSZFdWMVpUdGNibHh1SUNBZ0lDQWdkR2hwY3k1emRHRjBaU0E5SUc1MWJHdzdYRzVjYmlBZ0lDQWdJQzh2SUZKbFlXTjBRMnhoYzNObGN5QmtiMlZ6YmlkMElHaGhkbVVnWTI5dWMzUnlkV04wYjNKekxpQkpibk4wWldGa0xDQjBhR1Y1SUhWelpTQjBhR1ZjYmlBZ0lDQWdJQzh2SUdkbGRFbHVhWFJwWVd4VGRHRjBaU0JoYm1RZ1kyOXRjRzl1Wlc1MFYybHNiRTF2ZFc1MElHMWxkR2h2WkhNZ1ptOXlJR2x1YVhScFlXeHBlbUYwYVc5dUxseHVYRzRnSUNBZ0lDQjJZWElnYVc1cGRHbGhiRk4wWVhSbElEMGdkR2hwY3k1blpYUkpibWwwYVdGc1UzUmhkR1VnUHlCMGFHbHpMbWRsZEVsdWFYUnBZV3hUZEdGMFpTZ3BJRG9nYm5Wc2JEdGNiaUFnSUNBZ0lHbG1JQ2h3Y205alpYTnpMbVZ1ZGk1T1QwUkZYMFZPVmlBaFBUMGdKM0J5YjJSMVkzUnBiMjRuS1NCN1hHNGdJQ0FnSUNBZ0lDOHZJRmRsSUdGc2JHOTNJR0YxZEc4dGJXOWphM01nZEc4Z2NISnZZMlZsWkNCaGN5QnBaaUIwYUdWNUozSmxJSEpsZEhWeWJtbHVaeUJ1ZFd4c0xseHVJQ0FnSUNBZ0lDQnBaaUFvYVc1cGRHbGhiRk4wWVhSbElEMDlQU0IxYm1SbFptbHVaV1FnSmlZZ2RHaHBjeTVuWlhSSmJtbDBhV0ZzVTNSaGRHVXVYMmx6VFc5amEwWjFibU4wYVc5dUtTQjdYRzRnSUNBZ0lDQWdJQ0FnTHk4Z1ZHaHBjeUJwY3lCd2NtOWlZV0pzZVNCaVlXUWdjSEpoWTNScFkyVXVJRU52Ym5OcFpHVnlJSGRoY201cGJtY2dhR1Z5WlNCaGJtUmNiaUFnSUNBZ0lDQWdJQ0F2THlCa1pYQnlaV05oZEdsdVp5QjBhR2x6SUdOdmJuWmxibWxsYm1ObExseHVJQ0FnSUNBZ0lDQWdJR2x1YVhScFlXeFRkR0YwWlNBOUlHNTFiR3c3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUY5cGJuWmhjbWxoYm5Rb2RIbHdaVzltSUdsdWFYUnBZV3hUZEdGMFpTQTlQVDBnSjI5aWFtVmpkQ2NnSmlZZ0lVRnljbUY1TG1selFYSnlZWGtvYVc1cGRHbGhiRk4wWVhSbEtTd2dKeVZ6TG1kbGRFbHVhWFJwWVd4VGRHRjBaU2dwT2lCdGRYTjBJSEpsZEhWeWJpQmhiaUJ2WW1wbFkzUWdiM0lnYm5Wc2JDY3NJRU52Ym5OMGNuVmpkRzl5TG1ScGMzQnNZWGxPWVcxbElIeDhJQ2RTWldGamRFTnZiWEJ2YzJsMFpVTnZiWEJ2Ym1WdWRDY3BPMXh1WEc0Z0lDQWdJQ0IwYUdsekxuTjBZWFJsSUQwZ2FXNXBkR2xoYkZOMFlYUmxPMXh1SUNBZ0lIMHBPMXh1SUNBZ0lFTnZibk4wY25WamRHOXlMbkJ5YjNSdmRIbHdaU0E5SUc1bGR5QlNaV0ZqZEVOc1lYTnpRMjl0Y0c5dVpXNTBLQ2s3WEc0Z0lDQWdRMjl1YzNSeWRXTjBiM0l1Y0hKdmRHOTBlWEJsTG1OdmJuTjBjblZqZEc5eUlEMGdRMjl1YzNSeWRXTjBiM0k3WEc0Z0lDQWdRMjl1YzNSeWRXTjBiM0l1Y0hKdmRHOTBlWEJsTGw5ZmNtVmhZM1JCZFhSdlFtbHVaRkJoYVhKeklEMGdXMTA3WEc1Y2JpQWdJQ0JwYm1wbFkzUmxaRTFwZUdsdWN5NW1iM0pGWVdOb0tHMXBlRk53WldOSmJuUnZRMjl0Y0c5dVpXNTBMbUpwYm1Rb2JuVnNiQ3dnUTI5dWMzUnlkV04wYjNJcEtUdGNibHh1SUNBZ0lHMXBlRk53WldOSmJuUnZRMjl0Y0c5dVpXNTBLRU52Ym5OMGNuVmpkRzl5TENCSmMwMXZkVzUwWldSTmFYaHBiaWs3WEc0Z0lDQWdiV2w0VTNCbFkwbHVkRzlEYjIxd2IyNWxiblFvUTI5dWMzUnlkV04wYjNJc0lITndaV01wTzF4dVhHNGdJQ0FnTHk4Z1NXNXBkR2xoYkdsNlpTQjBhR1VnWkdWbVlYVnNkRkJ5YjNCeklIQnliM0JsY25SNUlHRm1kR1Z5SUdGc2JDQnRhWGhwYm5NZ2FHRjJaU0JpWldWdUlHMWxjbWRsWkM1Y2JpQWdJQ0JwWmlBb1EyOXVjM1J5ZFdOMGIzSXVaMlYwUkdWbVlYVnNkRkJ5YjNCektTQjdYRzRnSUNBZ0lDQkRiMjV6ZEhKMVkzUnZjaTVrWldaaGRXeDBVSEp2Y0hNZ1BTQkRiMjV6ZEhKMVkzUnZjaTVuWlhSRVpXWmhkV3gwVUhKdmNITW9LVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvY0hKdlkyVnpjeTVsYm5ZdVRrOUVSVjlGVGxZZ0lUMDlJQ2R3Y205a2RXTjBhVzl1SnlrZ2UxeHVJQ0FnSUNBZ0x5OGdWR2hwY3lCcGN5QmhJSFJoWnlCMGJ5QnBibVJwWTJGMFpTQjBhR0YwSUhSb1pTQjFjMlVnYjJZZ2RHaGxjMlVnYldWMGFHOWtJRzVoYldWeklHbHpJRzlyTEZ4dUlDQWdJQ0FnTHk4Z2MybHVZMlVnYVhRbmN5QjFjMlZrSUhkcGRHZ2dZM0psWVhSbFEyeGhjM011SUVsbUlHbDBKM01nYm05MExDQjBhR1Z1SUdsMEozTWdiR2xyWld4NUlHRmNiaUFnSUNBZ0lDOHZJRzFwYzNSaGEyVWdjMjhnZDJVbmJHd2dkMkZ5YmlCNWIzVWdkRzhnZFhObElIUm9aU0J6ZEdGMGFXTWdjSEp2Y0dWeWRIa3NJSEJ5YjNCbGNuUjVYRzRnSUNBZ0lDQXZMeUJwYm1sMGFXRnNhWHBsY2lCdmNpQmpiMjV6ZEhKMVkzUnZjaUJ5WlhOd1pXTjBhWFpsYkhrdVhHNGdJQ0FnSUNCcFppQW9RMjl1YzNSeWRXTjBiM0l1WjJWMFJHVm1ZWFZzZEZCeWIzQnpLU0I3WEc0Z0lDQWdJQ0FnSUVOdmJuTjBjblZqZEc5eUxtZGxkRVJsWm1GMWJIUlFjbTl3Y3k1cGMxSmxZV04wUTJ4aGMzTkJjSEJ5YjNabFpDQTlJSHQ5TzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnYVdZZ0tFTnZibk4wY25WamRHOXlMbkJ5YjNSdmRIbHdaUzVuWlhSSmJtbDBhV0ZzVTNSaGRHVXBJSHRjYmlBZ0lDQWdJQ0FnUTI5dWMzUnlkV04wYjNJdWNISnZkRzkwZVhCbExtZGxkRWx1YVhScFlXeFRkR0YwWlM1cGMxSmxZV04wUTJ4aGMzTkJjSEJ5YjNabFpDQTlJSHQ5TzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmx4dUlDQWdJRjlwYm5aaGNtbGhiblFvUTI5dWMzUnlkV04wYjNJdWNISnZkRzkwZVhCbExuSmxibVJsY2l3Z0oyTnlaV0YwWlVOc1lYTnpLQzR1TGlrNklFTnNZWE56SUhOd1pXTnBabWxqWVhScGIyNGdiWFZ6ZENCcGJYQnNaVzFsYm5RZ1lTQmdjbVZ1WkdWeVlDQnRaWFJvYjJRdUp5azdYRzVjYmlBZ0lDQnBaaUFvY0hKdlkyVnpjeTVsYm5ZdVRrOUVSVjlGVGxZZ0lUMDlJQ2R3Y205a2RXTjBhVzl1SnlrZ2UxeHVJQ0FnSUNBZ2NISnZZMlZ6Y3k1bGJuWXVUazlFUlY5RlRsWWdJVDA5SUNkd2NtOWtkV04wYVc5dUp5QS9JSGRoY201cGJtY29JVU52Ym5OMGNuVmpkRzl5TG5CeWIzUnZkSGx3WlM1amIyMXdiMjVsYm5SVGFHOTFiR1JWY0dSaGRHVXNJQ2NsY3lCb1lYTWdZU0J0WlhSb2IyUWdZMkZzYkdWa0lDY2dLeUFuWTI5dGNHOXVaVzUwVTJodmRXeGtWWEJrWVhSbEtDa3VJRVJwWkNCNWIzVWdiV1ZoYmlCemFHOTFiR1JEYjIxd2IyNWxiblJWY0dSaGRHVW9LVDhnSnlBcklDZFVhR1VnYm1GdFpTQnBjeUJ3YUhKaGMyVmtJR0Z6SUdFZ2NYVmxjM1JwYjI0Z1ltVmpZWFZ6WlNCMGFHVWdablZ1WTNScGIyNGdhWE1nSnlBcklDZGxlSEJsWTNSbFpDQjBieUJ5WlhSMWNtNGdZU0IyWVd4MVpTNG5MQ0J6Y0dWakxtUnBjM0JzWVhsT1lXMWxJSHg4SUNkQklHTnZiWEJ2Ym1WdWRDY3BJRG9nZG05cFpDQXdPMXh1SUNBZ0lDQWdjSEp2WTJWemN5NWxibll1VGs5RVJWOUZUbFlnSVQwOUlDZHdjbTlrZFdOMGFXOXVKeUEvSUhkaGNtNXBibWNvSVVOdmJuTjBjblZqZEc5eUxuQnliM1J2ZEhsd1pTNWpiMjF3YjI1bGJuUlhhV3hzVW1WamFXVjJaVkJ5YjNCekxDQW5KWE1nYUdGeklHRWdiV1YwYUc5a0lHTmhiR3hsWkNBbklDc2dKMk52YlhCdmJtVnVkRmRwYkd4U1pXTnBaWFpsVUhKdmNITW9LUzRnUkdsa0lIbHZkU0J0WldGdUlHTnZiWEJ2Ym1WdWRGZHBiR3hTWldObGFYWmxVSEp2Y0hNb0tUOG5MQ0J6Y0dWakxtUnBjM0JzWVhsT1lXMWxJSHg4SUNkQklHTnZiWEJ2Ym1WdWRDY3BJRG9nZG05cFpDQXdPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJRkpsWkhWalpTQjBhVzFsSUhOd1pXNTBJR1J2YVc1bklHeHZiMnQxY0hNZ1lua2djMlYwZEdsdVp5QjBhR1Z6WlNCdmJpQjBhR1VnY0hKdmRHOTBlWEJsTGx4dUlDQWdJR1p2Y2lBb2RtRnlJRzFsZEdodlpFNWhiV1VnYVc0Z1VtVmhZM1JEYkdGemMwbHVkR1Z5Wm1GalpTa2dlMXh1SUNBZ0lDQWdhV1lnS0NGRGIyNXpkSEoxWTNSdmNpNXdjbTkwYjNSNWNHVmJiV1YwYUc5a1RtRnRaVjBwSUh0Y2JpQWdJQ0FnSUNBZ1EyOXVjM1J5ZFdOMGIzSXVjSEp2ZEc5MGVYQmxXMjFsZEdodlpFNWhiV1ZkSUQwZ2JuVnNiRHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlYRzVjYmlBZ0lDQnlaWFIxY200Z1EyOXVjM1J5ZFdOMGIzSTdYRzRnSUgxY2JseHVJQ0J5WlhSMWNtNGdZM0psWVhSbFEyeGhjM003WEc1OVhHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdabUZqZEc5eWVUdGNiaUpkZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbnZhciBlbXB0eUZ1bmN0aW9uID0gZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9O1xuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiBhcmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5RnVuY3Rpb247IiwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlPYmplY3QgPSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgT2JqZWN0LmZyZWV6ZShlbXB0eU9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlPYmplY3Q7XG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl5WldGamRDOXViMlJsWDIxdlpIVnNaWE12Wm1KcWN5OXNhV0l2Wlcxd2RIbFBZbXBsWTNRdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SXZLaXBjYmlBcUlFTnZjSGx5YVdkb2RDQW9ZeWtnTWpBeE15MXdjbVZ6Wlc1MExDQkdZV05sWW05dmF5d2dTVzVqTGx4dUlDb2dRV3hzSUhKcFoyaDBjeUJ5WlhObGNuWmxaQzVjYmlBcVhHNGdLaUJVYUdseklITnZkWEpqWlNCamIyUmxJR2x6SUd4cFkyVnVjMlZrSUhWdVpHVnlJSFJvWlNCQ1UwUXRjM1I1YkdVZ2JHbGpaVzV6WlNCbWIzVnVaQ0JwYmlCMGFHVmNiaUFxSUV4SlEwVk9VMFVnWm1sc1pTQnBiaUIwYUdVZ2NtOXZkQ0JrYVhKbFkzUnZjbmtnYjJZZ2RHaHBjeUJ6YjNWeVkyVWdkSEpsWlM0Z1FXNGdZV1JrYVhScGIyNWhiQ0JuY21GdWRGeHVJQ29nYjJZZ2NHRjBaVzUwSUhKcFoyaDBjeUJqWVc0Z1ltVWdabTkxYm1RZ2FXNGdkR2hsSUZCQlZFVk9WRk1nWm1sc1pTQnBiaUIwYUdVZ2MyRnRaU0JrYVhKbFkzUnZjbmt1WEc0Z0tseHVJQ292WEc1Y2JpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJR1Z0Y0hSNVQySnFaV04wSUQwZ2UzMDdYRzVjYm1sbUlDaHdjbTlqWlhOekxtVnVkaTVPVDBSRlgwVk9WaUFoUFQwZ0ozQnliMlIxWTNScGIyNG5LU0I3WEc0Z0lFOWlhbVZqZEM1bWNtVmxlbVVvWlcxd2RIbFBZbXBsWTNRcE8xeHVmVnh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdWdGNIUjVUMkpxWldOME95SmRmUT09IiwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCk7XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xufSkuY2FsbCh0aGlzLHJlcXVpcmUoJ19wcm9jZXNzJykpXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5eVpXRmpkQzl1YjJSbFgyMXZaSFZzWlhNdlptSnFjeTlzYVdJdmFXNTJZWEpwWVc1MExtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVNJc0ltWnBiR1VpT2lKblpXNWxjbUYwWldRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lMeW9xWEc0Z0tpQkRiM0I1Y21sbmFIUWdLR01wSURJd01UTXRjSEpsYzJWdWRDd2dSbUZqWldKdmIyc3NJRWx1WXk1Y2JpQXFJRUZzYkNCeWFXZG9kSE1nY21WelpYSjJaV1F1WEc0Z0tseHVJQ29nVkdocGN5QnpiM1Z5WTJVZ1kyOWtaU0JwY3lCc2FXTmxibk5sWkNCMWJtUmxjaUIwYUdVZ1FsTkVMWE4wZVd4bElHeHBZMlZ1YzJVZ1ptOTFibVFnYVc0Z2RHaGxYRzRnS2lCTVNVTkZUbE5GSUdacGJHVWdhVzRnZEdobElISnZiM1FnWkdseVpXTjBiM0o1SUc5bUlIUm9hWE1nYzI5MWNtTmxJSFJ5WldVdUlFRnVJR0ZrWkdsMGFXOXVZV3dnWjNKaGJuUmNiaUFxSUc5bUlIQmhkR1Z1ZENCeWFXZG9kSE1nWTJGdUlHSmxJR1p2ZFc1a0lHbHVJSFJvWlNCUVFWUkZUbFJUSUdacGJHVWdhVzRnZEdobElITmhiV1VnWkdseVpXTjBiM0o1TGx4dUlDcGNiaUFxTDF4dVhHNG5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JpOHFLbHh1SUNvZ1ZYTmxJR2x1ZG1GeWFXRnVkQ2dwSUhSdklHRnpjMlZ5ZENCemRHRjBaU0IzYUdsamFDQjViM1Z5SUhCeWIyZHlZVzBnWVhOemRXMWxjeUIwYnlCaVpTQjBjblZsTGx4dUlDcGNiaUFxSUZCeWIzWnBaR1VnYzNCeWFXNTBaaTF6ZEhsc1pTQm1iM0p0WVhRZ0tHOXViSGtnSlhNZ2FYTWdjM1Z3Y0c5eWRHVmtLU0JoYm1RZ1lYSm5kVzFsYm5SelhHNGdLaUIwYnlCd2NtOTJhV1JsSUdsdVptOXliV0YwYVc5dUlHRmliM1YwSUhkb1lYUWdZbkp2YTJVZ1lXNWtJSGRvWVhRZ2VXOTFJSGRsY21WY2JpQXFJR1Y0Y0dWamRHbHVaeTVjYmlBcVhHNGdLaUJVYUdVZ2FXNTJZWEpwWVc1MElHMWxjM05oWjJVZ2QybHNiQ0JpWlNCemRISnBjSEJsWkNCcGJpQndjbTlrZFdOMGFXOXVMQ0JpZFhRZ2RHaGxJR2x1ZG1GeWFXRnVkRnh1SUNvZ2QybHNiQ0J5WlcxaGFXNGdkRzhnWlc1emRYSmxJR3h2WjJsaklHUnZaWE1nYm05MElHUnBabVpsY2lCcGJpQndjbTlrZFdOMGFXOXVMbHh1SUNvdlhHNWNiblpoY2lCMllXeHBaR0YwWlVadmNtMWhkQ0E5SUdaMWJtTjBhVzl1SUhaaGJHbGtZWFJsUm05eWJXRjBLR1p2Y20xaGRDa2dlMzA3WEc1Y2JtbG1JQ2h3Y205alpYTnpMbVZ1ZGk1T1QwUkZYMFZPVmlBaFBUMGdKM0J5YjJSMVkzUnBiMjRuS1NCN1hHNGdJSFpoYkdsa1lYUmxSbTl5YldGMElEMGdablZ1WTNScGIyNGdkbUZzYVdSaGRHVkdiM0p0WVhRb1ptOXliV0YwS1NCN1hHNGdJQ0FnYVdZZ0tHWnZjbTFoZENBOVBUMGdkVzVrWldacGJtVmtLU0I3WEc0Z0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KMmx1ZG1GeWFXRnVkQ0J5WlhGMWFYSmxjeUJoYmlCbGNuSnZjaUJ0WlhOellXZGxJR0Z5WjNWdFpXNTBKeWs3WEc0Z0lDQWdmVnh1SUNCOU8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCcGJuWmhjbWxoYm5Rb1kyOXVaR2wwYVc5dUxDQm1iM0p0WVhRc0lHRXNJR0lzSUdNc0lHUXNJR1VzSUdZcElIdGNiaUFnZG1Gc2FXUmhkR1ZHYjNKdFlYUW9abTl5YldGMEtUdGNibHh1SUNCcFppQW9JV052Ym1ScGRHbHZiaWtnZTF4dUlDQWdJSFpoY2lCbGNuSnZjanRjYmlBZ0lDQnBaaUFvWm05eWJXRjBJRDA5UFNCMWJtUmxabWx1WldRcElIdGNiaUFnSUNBZ0lHVnljbTl5SUQwZ2JtVjNJRVZ5Y205eUtDZE5hVzVwWm1sbFpDQmxlR05sY0hScGIyNGdiMk5qZFhKeVpXUTdJSFZ6WlNCMGFHVWdibTl1TFcxcGJtbG1hV1ZrSUdSbGRpQmxiblpwY205dWJXVnVkQ0FuSUNzZ0oyWnZjaUIwYUdVZ1puVnNiQ0JsY25KdmNpQnRaWE56WVdkbElHRnVaQ0JoWkdScGRHbHZibUZzSUdobGJIQm1kV3dnZDJGeWJtbHVaM011SnlrN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJSFpoY2lCaGNtZHpJRDBnVzJFc0lHSXNJR01zSUdRc0lHVXNJR1pkTzF4dUlDQWdJQ0FnZG1GeUlHRnlaMGx1WkdWNElEMGdNRHRjYmlBZ0lDQWdJR1Z5Y205eUlEMGdibVYzSUVWeWNtOXlLR1p2Y20xaGRDNXlaWEJzWVdObEtDOGxjeTluTENCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQmhjbWR6VzJGeVowbHVaR1Y0S3l0ZE8xeHVJQ0FnSUNBZ2ZTa3BPMXh1SUNBZ0lDQWdaWEp5YjNJdWJtRnRaU0E5SUNkSmJuWmhjbWxoYm5RZ1ZtbHZiR0YwYVc5dUp6dGNiaUFnSUNCOVhHNWNiaUFnSUNCbGNuSnZjaTVtY21GdFpYTlViMUJ2Y0NBOUlERTdJQzh2SUhkbElHUnZiaWQwSUdOaGNtVWdZV0p2ZFhRZ2FXNTJZWEpwWVc1MEozTWdiM2R1SUdaeVlXMWxYRzRnSUNBZ2RHaHliM2NnWlhKeWIzSTdYRzRnSUgxY2JuMWNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JwYm5aaGNtbGhiblE3SWwxOSIsIihmdW5jdGlvbiAocHJvY2Vzcyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJy4vZW1wdHlGdW5jdGlvbicpO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGVtcHR5RnVuY3Rpb247XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKHgpIHt9XG4gICAgfTtcblxuICAgIHdhcm5pbmcgPSBmdW5jdGlvbiB3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKCdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAnKSA9PT0gMCkge1xuICAgICAgICByZXR1cm47IC8vIElnbm9yZSBDb21wb3NpdGVDb21wb25lbnQgcHJvcHR5cGUgY2hlY2suXG4gICAgICB9XG5cbiAgICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl5WldGamRDOXViMlJsWDIxdlpIVnNaWE12Wm1KcWN5OXNhV0l2ZDJGeWJtbHVaeTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJdktpcGNiaUFxSUVOdmNIbHlhV2RvZENBeU1ERTBMVEl3TVRVc0lFWmhZMlZpYjI5ckxDQkpibU11WEc0Z0tpQkJiR3dnY21sbmFIUnpJSEpsYzJWeWRtVmtMbHh1SUNwY2JpQXFJRlJvYVhNZ2MyOTFjbU5sSUdOdlpHVWdhWE1nYkdsalpXNXpaV1FnZFc1a1pYSWdkR2hsSUVKVFJDMXpkSGxzWlNCc2FXTmxibk5sSUdadmRXNWtJR2x1SUhSb1pWeHVJQ29nVEVsRFJVNVRSU0JtYVd4bElHbHVJSFJvWlNCeWIyOTBJR1JwY21WamRHOXllU0J2WmlCMGFHbHpJSE52ZFhKalpTQjBjbVZsTGlCQmJpQmhaR1JwZEdsdmJtRnNJR2R5WVc1MFhHNGdLaUJ2WmlCd1lYUmxiblFnY21sbmFIUnpJR05oYmlCaVpTQm1iM1Z1WkNCcGJpQjBhR1VnVUVGVVJVNVVVeUJtYVd4bElHbHVJSFJvWlNCellXMWxJR1JwY21WamRHOXllUzVjYmlBcVhHNGdLaTljYmx4dUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1MllYSWdaVzF3ZEhsR2RXNWpkR2x2YmlBOUlISmxjWFZwY21Vb0p5NHZaVzF3ZEhsR2RXNWpkR2x2YmljcE8xeHVYRzR2S2lwY2JpQXFJRk5wYldsc1lYSWdkRzhnYVc1MllYSnBZVzUwSUdKMWRDQnZibXg1SUd4dlozTWdZU0IzWVhKdWFXNW5JR2xtSUhSb1pTQmpiMjVrYVhScGIyNGdhWE1nYm05MElHMWxkQzVjYmlBcUlGUm9hWE1nWTJGdUlHSmxJSFZ6WldRZ2RHOGdiRzluSUdsemMzVmxjeUJwYmlCa1pYWmxiRzl3YldWdWRDQmxiblpwY205dWJXVnVkSE1nYVc0Z1kzSnBkR2xqWVd4Y2JpQXFJSEJoZEdoekxpQlNaVzF2ZG1sdVp5QjBhR1VnYkc5bloybHVaeUJqYjJSbElHWnZjaUJ3Y205a2RXTjBhVzl1SUdWdWRtbHliMjV0Wlc1MGN5QjNhV3hzSUd0bFpYQWdkR2hsWEc0Z0tpQnpZVzFsSUd4dloybGpJR0Z1WkNCbWIyeHNiM2NnZEdobElITmhiV1VnWTI5a1pTQndZWFJvY3k1Y2JpQXFMMXh1WEc1MllYSWdkMkZ5Ym1sdVp5QTlJR1Z0Y0hSNVJuVnVZM1JwYjI0N1hHNWNibWxtSUNod2NtOWpaWE56TG1WdWRpNU9UMFJGWDBWT1ZpQWhQVDBnSjNCeWIyUjFZM1JwYjI0bktTQjdYRzRnSUNobWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ2RtRnlJSEJ5YVc1MFYyRnlibWx1WnlBOUlHWjFibU4wYVc5dUlIQnlhVzUwVjJGeWJtbHVaeWhtYjNKdFlYUXBJSHRjYmlBZ0lDQWdJR1p2Y2lBb2RtRnlJRjlzWlc0Z1BTQmhjbWQxYldWdWRITXViR1Z1WjNSb0xDQmhjbWR6SUQwZ1FYSnlZWGtvWDJ4bGJpQStJREVnUHlCZmJHVnVJQzBnTVNBNklEQXBMQ0JmYTJWNUlEMGdNVHNnWDJ0bGVTQThJRjlzWlc0N0lGOXJaWGtyS3lrZ2UxeHVJQ0FnSUNBZ0lDQmhjbWR6VzE5clpYa2dMU0F4WFNBOUlHRnlaM1Z0Wlc1MGMxdGZhMlY1WFR0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2RtRnlJR0Z5WjBsdVpHVjRJRDBnTUR0Y2JpQWdJQ0FnSUhaaGNpQnRaWE56WVdkbElEMGdKMWRoY201cGJtYzZJQ2NnS3lCbWIzSnRZWFF1Y21Wd2JHRmpaU2d2SlhNdlp5d2dablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnWVhKbmMxdGhjbWRKYm1SbGVDc3JYVHRjYmlBZ0lDQWdJSDBwTzF4dUlDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCamIyNXpiMnhsSUNFOVBTQW5kVzVrWldacGJtVmtKeWtnZTF4dUlDQWdJQ0FnSUNCamIyNXpiMnhsTG1WeWNtOXlLRzFsYzNOaFoyVXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdkSEo1SUh0Y2JpQWdJQ0FnSUNBZ0x5OGdMUzB0SUZkbGJHTnZiV1VnZEc4Z1pHVmlkV2RuYVc1bklGSmxZV04wSUMwdExWeHVJQ0FnSUNBZ0lDQXZMeUJVYUdseklHVnljbTl5SUhkaGN5QjBhSEp2ZDI0Z1lYTWdZU0JqYjI1MlpXNXBaVzVqWlNCemJ5QjBhR0YwSUhsdmRTQmpZVzRnZFhObElIUm9hWE1nYzNSaFkydGNiaUFnSUNBZ0lDQWdMeThnZEc4Z1ptbHVaQ0IwYUdVZ1kyRnNiSE5wZEdVZ2RHaGhkQ0JqWVhWelpXUWdkR2hwY3lCM1lYSnVhVzVuSUhSdklHWnBjbVV1WEc0Z0lDQWdJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWh0WlhOellXZGxLVHRjYmlBZ0lDQWdJSDBnWTJGMFkyZ2dLSGdwSUh0OVhHNGdJQ0FnZlR0Y2JseHVJQ0FnSUhkaGNtNXBibWNnUFNCbWRXNWpkR2x2YmlCM1lYSnVhVzVuS0dOdmJtUnBkR2x2Yml3Z1ptOXliV0YwS1NCN1hHNGdJQ0FnSUNCcFppQW9abTl5YldGMElEMDlQU0IxYm1SbFptbHVaV1FwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0NkZ2QyRnlibWx1WnloamIyNWthWFJwYjI0c0lHWnZjbTFoZEN3Z0xpNHVZWEpuY3lsZ0lISmxjWFZwY21WeklHRWdkMkZ5Ym1sdVp5QW5JQ3NnSjIxbGMzTmhaMlVnWVhKbmRXMWxiblFuS1R0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2FXWWdLR1p2Y20xaGRDNXBibVJsZUU5bUtDZEdZV2xzWldRZ1EyOXRjRzl6YVhSbElIQnliM0JVZVhCbE9pQW5LU0E5UFQwZ01Da2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNDdJQzh2SUVsbmJtOXlaU0JEYjIxd2IzTnBkR1ZEYjIxd2IyNWxiblFnY0hKdmNIUjVjR1VnWTJobFkyc3VYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJR2xtSUNnaFkyOXVaR2wwYVc5dUtTQjdYRzRnSUNBZ0lDQWdJR1p2Y2lBb2RtRnlJRjlzWlc0eUlEMGdZWEpuZFcxbGJuUnpMbXhsYm1kMGFDd2dZWEpuY3lBOUlFRnljbUY1S0Y5c1pXNHlJRDRnTWlBL0lGOXNaVzR5SUMwZ01pQTZJREFwTENCZmEyVjVNaUE5SURJN0lGOXJaWGt5SUR3Z1gyeGxiakk3SUY5clpYa3lLeXNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQmhjbWR6VzE5clpYa3lJQzBnTWwwZ1BTQmhjbWQxYldWdWRITmJYMnRsZVRKZE8xeHVJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnY0hKcGJuUlhZWEp1YVc1bkxtRndjR3g1S0hWdVpHVm1hVzVsWkN3Z1cyWnZjbTFoZEYwdVkyOXVZMkYwS0dGeVozTXBLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlPMXh1SUNCOUtTZ3BPMXh1ZlZ4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlIZGhjbTVwYm1jN0lsMTkiLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuICB2YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbiAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9GdW5jdGlvbn0gZ2V0U3RhY2sgUmV0dXJucyB0aGUgY29tcG9uZW50IHN0YWNrLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBnZXRTdGFjaykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgIGlmICh0eXBlU3BlY3MuaGFzT3duUHJvcGVydHkodHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpbnZhcmlhbnQodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdID09PSAnZnVuY3Rpb24nLCAnJXM6ICVzIHR5cGUgYCVzYCBpcyBpbnZhbGlkOyBpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSAnICsgJ1JlYWN0LlByb3BUeXBlcy4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIGxvY2F0aW9uLCB0eXBlU3BlY05hbWUpO1xuICAgICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgfVxuICAgICAgICB3YXJuaW5nKCFlcnJvciB8fCBlcnJvciBpbnN0YW5jZW9mIEVycm9yLCAnJXM6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAlcyBgJXNgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAlcy4gJyArICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICsgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgZXJyb3IpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgd2FybmluZyhmYWxzZSwgJ0ZhaWxlZCAlcyB0eXBlOiAlcyVzJywgbG9jYXRpb24sIGVycm9yLm1lc3NhZ2UsIHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUHJvcFR5cGVzO1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl5WldGamRDOXViMlJsWDIxdlpIVnNaWE12Y0hKdmNDMTBlWEJsY3k5amFHVmphMUJ5YjNCVWVYQmxjeTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpTHlvcVhHNGdLaUJEYjNCNWNtbG5hSFFnTWpBeE15MXdjbVZ6Wlc1MExDQkdZV05sWW05dmF5d2dTVzVqTGx4dUlDb2dRV3hzSUhKcFoyaDBjeUJ5WlhObGNuWmxaQzVjYmlBcVhHNGdLaUJVYUdseklITnZkWEpqWlNCamIyUmxJR2x6SUd4cFkyVnVjMlZrSUhWdVpHVnlJSFJvWlNCQ1UwUXRjM1I1YkdVZ2JHbGpaVzV6WlNCbWIzVnVaQ0JwYmlCMGFHVmNiaUFxSUV4SlEwVk9VMFVnWm1sc1pTQnBiaUIwYUdVZ2NtOXZkQ0JrYVhKbFkzUnZjbmtnYjJZZ2RHaHBjeUJ6YjNWeVkyVWdkSEpsWlM0Z1FXNGdZV1JrYVhScGIyNWhiQ0JuY21GdWRGeHVJQ29nYjJZZ2NHRjBaVzUwSUhKcFoyaDBjeUJqWVc0Z1ltVWdabTkxYm1RZ2FXNGdkR2hsSUZCQlZFVk9WRk1nWm1sc1pTQnBiaUIwYUdVZ2MyRnRaU0JrYVhKbFkzUnZjbmt1WEc0Z0tpOWNibHh1SjNWelpTQnpkSEpwWTNRbk8xeHVYRzVwWmlBb2NISnZZMlZ6Y3k1bGJuWXVUazlFUlY5RlRsWWdJVDA5SUNkd2NtOWtkV04wYVc5dUp5a2dlMXh1SUNCMllYSWdhVzUyWVhKcFlXNTBJRDBnY21WeGRXbHlaU2duWm1KcWN5OXNhV0l2YVc1MllYSnBZVzUwSnlrN1hHNGdJSFpoY2lCM1lYSnVhVzVuSUQwZ2NtVnhkV2x5WlNnblptSnFjeTlzYVdJdmQyRnlibWx1WnljcE8xeHVJQ0IyWVhJZ1VtVmhZM1JRY205d1ZIbHdaWE5UWldOeVpYUWdQU0J5WlhGMWFYSmxLQ2N1TDJ4cFlpOVNaV0ZqZEZCeWIzQlVlWEJsYzFObFkzSmxkQ2NwTzF4dUlDQjJZWElnYkc5bloyVmtWSGx3WlVaaGFXeDFjbVZ6SUQwZ2UzMDdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1FYTnpaWEowSUhSb1lYUWdkR2hsSUhaaGJIVmxjeUJ0WVhSamFDQjNhWFJvSUhSb1pTQjBlWEJsSUhOd1pXTnpMbHh1SUNvZ1JYSnliM0lnYldWemMyRm5aWE1nWVhKbElHMWxiVzl5YVhwbFpDQmhibVFnZDJsc2JDQnZibXg1SUdKbElITm9iM2R1SUc5dVkyVXVYRzRnS2x4dUlDb2dRSEJoY21GdElIdHZZbXBsWTNSOUlIUjVjR1ZUY0dWamN5Qk5ZWEFnYjJZZ2JtRnRaU0IwYnlCaElGSmxZV04wVUhKdmNGUjVjR1ZjYmlBcUlFQndZWEpoYlNCN2IySnFaV04wZlNCMllXeDFaWE1nVW5WdWRHbHRaU0IyWVd4MVpYTWdkR2hoZENCdVpXVmtJSFJ2SUdKbElIUjVjR1V0WTJobFkydGxaRnh1SUNvZ1FIQmhjbUZ0SUh0emRISnBibWQ5SUd4dlkyRjBhVzl1SUdVdVp5NGdYQ0p3Y205d1hDSXNJRndpWTI5dWRHVjRkRndpTENCY0ltTm9hV3hrSUdOdmJuUmxlSFJjSWx4dUlDb2dRSEJoY21GdElIdHpkSEpwYm1kOUlHTnZiWEJ2Ym1WdWRFNWhiV1VnVG1GdFpTQnZaaUIwYUdVZ1kyOXRjRzl1Wlc1MElHWnZjaUJsY25KdmNpQnRaWE56WVdkbGN5NWNiaUFxSUVCd1lYSmhiU0I3UDBaMWJtTjBhVzl1ZlNCblpYUlRkR0ZqYXlCU1pYUjFjbTV6SUhSb1pTQmpiMjF3YjI1bGJuUWdjM1JoWTJzdVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvdlhHNW1kVzVqZEdsdmJpQmphR1ZqYTFCeWIzQlVlWEJsY3loMGVYQmxVM0JsWTNNc0lIWmhiSFZsY3l3Z2JHOWpZWFJwYjI0c0lHTnZiWEJ2Ym1WdWRFNWhiV1VzSUdkbGRGTjBZV05yS1NCN1hHNGdJR2xtSUNod2NtOWpaWE56TG1WdWRpNU9UMFJGWDBWT1ZpQWhQVDBnSjNCeWIyUjFZM1JwYjI0bktTQjdYRzRnSUNBZ1ptOXlJQ2gyWVhJZ2RIbHdaVk53WldOT1lXMWxJR2x1SUhSNWNHVlRjR1ZqY3lrZ2UxeHVJQ0FnSUNBZ2FXWWdLSFI1Y0dWVGNHVmpjeTVvWVhOUGQyNVFjbTl3WlhKMGVTaDBlWEJsVTNCbFkwNWhiV1VwS1NCN1hHNGdJQ0FnSUNBZ0lIWmhjaUJsY25KdmNqdGNiaUFnSUNBZ0lDQWdMeThnVUhKdmNDQjBlWEJsSUhaaGJHbGtZWFJwYjI0Z2JXRjVJSFJvY205M0xpQkpiaUJqWVhObElIUm9aWGtnWkc4c0lIZGxJR1J2YmlkMElIZGhiblFnZEc5Y2JpQWdJQ0FnSUNBZ0x5OGdabUZwYkNCMGFHVWdjbVZ1WkdWeUlIQm9ZWE5sSUhkb1pYSmxJR2wwSUdScFpHNG5kQ0JtWVdsc0lHSmxabTl5WlM0Z1UyOGdkMlVnYkc5bklHbDBMbHh1SUNBZ0lDQWdJQ0F2THlCQlpuUmxjaUIwYUdWelpTQm9ZWFpsSUdKbFpXNGdZMnhsWVc1bFpDQjFjQ3dnZDJVbmJHd2diR1YwSUhSb1pXMGdkR2h5YjNjdVhHNGdJQ0FnSUNBZ0lIUnllU0I3WEc0Z0lDQWdJQ0FnSUNBZ0x5OGdWR2hwY3lCcGN5QnBiblJsYm5ScGIyNWhiR3g1SUdGdUlHbHVkbUZ5YVdGdWRDQjBhR0YwSUdkbGRITWdZMkYxWjJoMExpQkpkQ2R6SUhSb1pTQnpZVzFsWEc0Z0lDQWdJQ0FnSUNBZ0x5OGdZbVZvWVhacGIzSWdZWE1nZDJsMGFHOTFkQ0IwYUdseklITjBZWFJsYldWdWRDQmxlR05sY0hRZ2QybDBhQ0JoSUdKbGRIUmxjaUJ0WlhOellXZGxMbHh1SUNBZ0lDQWdJQ0FnSUdsdWRtRnlhV0Z1ZENoMGVYQmxiMllnZEhsd1pWTndaV056VzNSNWNHVlRjR1ZqVG1GdFpWMGdQVDA5SUNkbWRXNWpkR2x2Ymljc0lDY2xjem9nSlhNZ2RIbHdaU0JnSlhOZ0lHbHpJR2x1ZG1Gc2FXUTdJR2wwSUcxMWMzUWdZbVVnWVNCbWRXNWpkR2x2Yml3Z2RYTjFZV3hzZVNCbWNtOXRJQ2NnS3lBblVtVmhZM1F1VUhKdmNGUjVjR1Z6TGljc0lHTnZiWEJ2Ym1WdWRFNWhiV1VnZkh3Z0oxSmxZV04wSUdOc1lYTnpKeXdnYkc5allYUnBiMjRzSUhSNWNHVlRjR1ZqVG1GdFpTazdYRzRnSUNBZ0lDQWdJQ0FnWlhKeWIzSWdQU0IwZVhCbFUzQmxZM05iZEhsd1pWTndaV05PWVcxbFhTaDJZV3gxWlhNc0lIUjVjR1ZUY0dWalRtRnRaU3dnWTI5dGNHOXVaVzUwVG1GdFpTd2diRzlqWVhScGIyNHNJRzUxYkd3c0lGSmxZV04wVUhKdmNGUjVjR1Z6VTJWamNtVjBLVHRjYmlBZ0lDQWdJQ0FnZlNCallYUmphQ0FvWlhncElIdGNiaUFnSUNBZ0lDQWdJQ0JsY25KdmNpQTlJR1Y0TzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIZGhjbTVwYm1jb0lXVnljbTl5SUh4OElHVnljbTl5SUdsdWMzUmhibU5sYjJZZ1JYSnliM0lzSUNjbGN6b2dkSGx3WlNCemNHVmphV1pwWTJGMGFXOXVJRzltSUNWeklHQWxjMkFnYVhNZ2FXNTJZV3hwWkRzZ2RHaGxJSFI1Y0dVZ1kyaGxZMnRsY2lBbklDc2dKMloxYm1OMGFXOXVJRzExYzNRZ2NtVjBkWEp1SUdCdWRXeHNZQ0J2Y2lCaGJpQmdSWEp5YjNKZ0lHSjFkQ0J5WlhSMWNtNWxaQ0JoSUNWekxpQW5JQ3NnSjFsdmRTQnRZWGtnYUdGMlpTQm1iM0puYjNSMFpXNGdkRzhnY0dGemN5QmhiaUJoY21kMWJXVnVkQ0IwYnlCMGFHVWdkSGx3WlNCamFHVmphMlZ5SUNjZ0t5QW5ZM0psWVhSdmNpQW9ZWEp5WVhsUFppd2dhVzV6ZEdGdVkyVlBaaXdnYjJKcVpXTjBUMllzSUc5dVpVOW1MQ0J2Ym1WUFpsUjVjR1VzSUdGdVpDQW5JQ3NnSjNOb1lYQmxJR0ZzYkNCeVpYRjFhWEpsSUdGdUlHRnlaM1Z0Wlc1MEtTNG5MQ0JqYjIxd2IyNWxiblJPWVcxbElIeDhJQ2RTWldGamRDQmpiR0Z6Y3ljc0lHeHZZMkYwYVc5dUxDQjBlWEJsVTNCbFkwNWhiV1VzSUhSNWNHVnZaaUJsY25KdmNpazdYRzRnSUNBZ0lDQWdJR2xtSUNobGNuSnZjaUJwYm5OMFlXNWpaVzltSUVWeWNtOXlJQ1ltSUNFb1pYSnliM0l1YldWemMyRm5aU0JwYmlCc2IyZG5aV1JVZVhCbFJtRnBiSFZ5WlhNcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnTHk4Z1QyNXNlU0J0YjI1cGRHOXlJSFJvYVhNZ1ptRnBiSFZ5WlNCdmJtTmxJR0psWTJGMWMyVWdkR2hsY21VZ2RHVnVaSE1nZEc4Z1ltVWdZU0JzYjNRZ2IyWWdkR2hsWEc0Z0lDQWdJQ0FnSUNBZ0x5OGdjMkZ0WlNCbGNuSnZjaTVjYmlBZ0lDQWdJQ0FnSUNCc2IyZG5aV1JVZVhCbFJtRnBiSFZ5WlhOYlpYSnliM0l1YldWemMyRm5aVjBnUFNCMGNuVmxPMXh1WEc0Z0lDQWdJQ0FnSUNBZ2RtRnlJSE4wWVdOcklEMGdaMlYwVTNSaFkyc2dQeUJuWlhSVGRHRmpheWdwSURvZ0p5YzdYRzVjYmlBZ0lDQWdJQ0FnSUNCM1lYSnVhVzVuS0daaGJITmxMQ0FuUm1GcGJHVmtJQ1Z6SUhSNWNHVTZJQ1Z6SlhNbkxDQnNiMk5oZEdsdmJpd2daWEp5YjNJdWJXVnpjMkZuWlN3Z2MzUmhZMnNnSVQwZ2JuVnNiQ0EvSUhOMFlXTnJJRG9nSnljcE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVJQ0I5WEc1OVhHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdZMmhsWTJ0UWNtOXdWSGx3WlhNN1hHNGlYWDA9IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIHNoaW0ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICBpZiAoc2VjcmV0ID09PSBSZWFjdFByb3BUeXBlc1NlY3JldCkge1xuICAgICAgLy8gSXQgaXMgc3RpbGwgc2FmZSB3aGVuIGNhbGxlZCBmcm9tIFJlYWN0LlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpbnZhcmlhbnQoXG4gICAgICBmYWxzZSxcbiAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICdVc2UgUHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzKCkgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICk7XG4gIH07XG4gIHNoaW0uaXNSZXF1aXJlZCA9IHNoaW07XG4gIGZ1bmN0aW9uIGdldFNoaW0oKSB7XG4gICAgcmV0dXJuIHNoaW07XG4gIH07XG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogc2hpbSxcbiAgICBib29sOiBzaGltLFxuICAgIGZ1bmM6IHNoaW0sXG4gICAgbnVtYmVyOiBzaGltLFxuICAgIG9iamVjdDogc2hpbSxcbiAgICBzdHJpbmc6IHNoaW0sXG4gICAgc3ltYm9sOiBzaGltLFxuXG4gICAgYW55OiBzaGltLFxuICAgIGFycmF5T2Y6IGdldFNoaW0sXG4gICAgZWxlbWVudDogc2hpbSxcbiAgICBpbnN0YW5jZU9mOiBnZXRTaGltLFxuICAgIG5vZGU6IHNoaW0sXG4gICAgb2JqZWN0T2Y6IGdldFNoaW0sXG4gICAgb25lT2Y6IGdldFNoaW0sXG4gICAgb25lT2ZUeXBlOiBnZXRTaGltLFxuICAgIHNoYXBlOiBnZXRTaGltXG4gIH07XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBlbXB0eUZ1bmN0aW9uO1xuICBSZWFjdFByb3BUeXBlcy5Qcm9wVHlwZXMgPSBSZWFjdFByb3BUeXBlcztcblxuICByZXR1cm4gUmVhY3RQcm9wVHlwZXM7XG59O1xuIiwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlclxuICB9O1xuXG4gIC8qKlxuICAgKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICAgKi9cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuICBmdW5jdGlvbiBpcyh4LCB5KSB7XG4gICAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICAgIH1cbiAgfVxuICAvKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuICAvKipcbiAgICogV2UgdXNlIGFuIEVycm9yLWxpa2Ugb2JqZWN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGFzIHBlb3BsZSBtYXkgY2FsbFxuICAgKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyLCB3ZSBkb24ndCB1c2UgcmVhbFxuICAgKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gICAqIGlzIHByb2hpYml0aXZlbHkgZXhwZW5zaXZlIGlmIHRoZXkgYXJlIGNyZWF0ZWQgdG9vIG9mdGVuLCBzdWNoIGFzIHdoYXRcbiAgICogaGFwcGVucyBpbiBvbmVPZlR5cGUoKSBmb3IgYW55IHR5cGUgYmVmb3JlIHRoZSBvbmUgdGhhdCBtYXRjaGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gUHJvcFR5cGVFcnJvcihtZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gIH1cbiAgLy8gTWFrZSBgaW5zdGFuY2VvZiBFcnJvcmAgc3RpbGwgd29yayBmb3IgcmV0dXJuZWQgZXJyb3JzLlxuICBQcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuICBmdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUgPSB7fTtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA9IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuXG4gICAgICBpZiAoc2VjcmV0ICE9PSBSZWFjdFByb3BUeXBlc1NlY3JldCkge1xuICAgICAgICBpZiAodGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAgICAgICAgIC8vIE5ldyBiZWhhdmlvciBvbmx5IGZvciB1c2VycyBvZiBgcHJvcC10eXBlc2AgcGFja2FnZVxuICAgICAgICAgIGludmFyaWFudChcbiAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgJ1VzZSBgUHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzKClgIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAgICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gT2xkIGJlaGF2aW9yIGZvciBwZW9wbGUgdXNpbmcgUmVhY3QuUHJvcFR5cGVzXG4gICAgICAgICAgdmFyIGNhY2hlS2V5ID0gY29tcG9uZW50TmFtZSArICc6JyArIHByb3BOYW1lO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gJiZcbiAgICAgICAgICAgIC8vIEF2b2lkIHNwYW1taW5nIHRoZSBjb25zb2xlIGJlY2F1c2UgdGhleSBhcmUgb2Z0ZW4gbm90IGFjdGlvbmFibGUgZXhjZXB0IGZvciBsaWIgYXV0aG9yc1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPCAzXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB3YXJuaW5nKFxuICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgJ1lvdSBhcmUgbWFudWFsbHkgY2FsbGluZyBhIFJlYWN0LlByb3BUeXBlcyB2YWxpZGF0aW9uICcgK1xuICAgICAgICAgICAgICAnZnVuY3Rpb24gZm9yIHRoZSBgJXNgIHByb3Agb24gYCVzYC4gVGhpcyBpcyBkZXByZWNhdGVkICcgK1xuICAgICAgICAgICAgICAnYW5kIHdpbGwgdGhyb3cgaW4gdGhlIHN0YW5kYWxvbmUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgICAnWW91IG1heSBiZSBzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byBhIHRoaXJkLXBhcnR5IFByb3BUeXBlcyAnICtcbiAgICAgICAgICAgICAgJ2xpYnJhcnkuIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmctZG9udC1jYWxsLXByb3B0eXBlcyAnICsgJ2ZvciBkZXRhaWxzLicsXG4gICAgICAgICAgICAgIHByb3BGdWxsTmFtZSxcbiAgICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSA9IHRydWU7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCAnICsgKCdpbiBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgbnVsbGAuJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGB1bmRlZmluZWRgLicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICAgIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuXG4gICAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcihleHBlY3RlZFR5cGUpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgICAvLyBgcHJvcFZhbHVlYCBiZWluZyBpbnN0YW5jZSBvZiwgc2F5LCBkYXRlL3JlZ2V4cCwgcGFzcyB0aGUgJ29iamVjdCdcbiAgICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAgIC8vICdvZiB0eXBlIGBvYmplY3RgJy5cbiAgICAgICAgdmFyIHByZWNpc2VUeXBlID0gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcmVjaXNlVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnYCcgKyBleHBlY3RlZFR5cGUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFueVR5cGVDaGVja2VyKCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgYXJyYXlPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBhcnJheS4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnWycgKyBpICsgJ10nLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpcyhwcm9wVmFsdWUsIGV4cGVjdGVkVmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBlY3RlZFZhbHVlcyk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHZhbHVlIGAnICsgcHJvcFZhbHVlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIG9uZSBvZiAnICsgdmFsdWVzU3RyaW5nICsgJy4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIG9iamVjdE9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIG9iamVjdC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcFZhbHVlKSB7XG4gICAgICAgIGlmIChwcm9wVmFsdWUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB3YXJuaW5nKFxuICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgJXMgYXQgaW5kZXggJXMuJyxcbiAgICAgICAgICBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcoY2hlY2tlciksXG4gICAgICAgICAgaVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNOb2RlKHByb3BWYWx1ZSkge1xuICAgIHN3aXRjaCAodHlwZW9mIHByb3BWYWx1ZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gIXByb3BWYWx1ZTtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcFZhbHVlLmV2ZXJ5KGlzTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BWYWx1ZSA9PT0gbnVsbCB8fCBpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4ocHJvcFZhbHVlKTtcbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwocHJvcFZhbHVlKTtcbiAgICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gcHJvcFZhbHVlLmVudHJpZXMpIHtcbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc05vZGUoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgIGlmICghaXNOb2RlKGVudHJ5WzFdKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSB7XG4gICAgLy8gTmF0aXZlIFN5bWJvbC5cbiAgICBpZiAocHJvcFR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddID09PSAnU3ltYm9sJ1xuICAgIGlmIChwcm9wVmFsdWVbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEZhbGxiYWNrIGZvciBub24tc3BlYyBjb21wbGlhbnQgU3ltYm9scyB3aGljaCBhcmUgcG9seWZpbGxlZC5cbiAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wVmFsdWUgaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEVxdWl2YWxlbnQgb2YgYHR5cGVvZmAgYnV0IHdpdGggc3BlY2lhbCBoYW5kbGluZyBmb3IgYXJyYXkgYW5kIHJlZ2V4cC5cbiAgZnVuY3Rpb24gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKSB7XG4gICAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ2FycmF5JztcbiAgICB9XG4gICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgLy8gT2xkIHdlYmtpdHMgKGF0IGxlYXN0IHVudGlsIEFuZHJvaWQgNC4wKSByZXR1cm4gJ2Z1bmN0aW9uJyByYXRoZXIgdGhhblxuICAgICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgICAvLyBwYXNzZXMgUHJvcFR5cGVzLm9iamVjdC5cbiAgICAgIHJldHVybiAnb2JqZWN0JztcbiAgICB9XG4gICAgaWYgKGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ3N5bWJvbCc7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbiAgLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG4gIGZ1bmN0aW9uIGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSkge1xuICAgIGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSAndW5kZWZpbmVkJyB8fCBwcm9wVmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJyArIHByb3BWYWx1ZTtcbiAgICB9XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gJ2RhdGUnO1xuICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgaXMgcG9zdGZpeGVkIHRvIGEgd2FybmluZyBhYm91dCBhbiBpbnZhbGlkIHR5cGUuXG4gIC8vIEZvciBleGFtcGxlLCBcInVuZGVmaW5lZFwiIG9yIFwib2YgdHlwZSBhcnJheVwiXG4gIGZ1bmN0aW9uIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyh2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuICdhbiAnICsgdHlwZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdyZWdleHAnOlxuICAgICAgICByZXR1cm4gJ2EgJyArIHR5cGU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm5zIGNsYXNzIG5hbWUgb2YgdGhlIG9iamVjdCwgaWYgYW55LlxuICBmdW5jdGlvbiBnZXRDbGFzc05hbWUocHJvcFZhbHVlKSB7XG4gICAgaWYgKCFwcm9wVmFsdWUuY29uc3RydWN0b3IgfHwgIXByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICByZXR1cm4gQU5PTllNT1VTO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGNoZWNrUHJvcFR5cGVzO1xuICBSZWFjdFByb3BUeXBlcy5Qcm9wVHlwZXMgPSBSZWFjdFByb3BUeXBlcztcblxuICByZXR1cm4gUmVhY3RQcm9wVHlwZXM7XG59O1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl5WldGamRDOXViMlJsWDIxdlpIVnNaWE12Y0hKdmNDMTBlWEJsY3k5bVlXTjBiM0o1VjJsMGFGUjVjR1ZEYUdWamEyVnljeTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SXZLaXBjYmlBcUlFTnZjSGx5YVdkb2RDQXlNREV6TFhCeVpYTmxiblFzSUVaaFkyVmliMjlyTENCSmJtTXVYRzRnS2lCQmJHd2djbWxuYUhSeklISmxjMlZ5ZG1Wa0xseHVJQ3BjYmlBcUlGUm9hWE1nYzI5MWNtTmxJR052WkdVZ2FYTWdiR2xqWlc1elpXUWdkVzVrWlhJZ2RHaGxJRUpUUkMxemRIbHNaU0JzYVdObGJuTmxJR1p2ZFc1a0lHbHVJSFJvWlZ4dUlDb2dURWxEUlU1VFJTQm1hV3hsSUdsdUlIUm9aU0J5YjI5MElHUnBjbVZqZEc5eWVTQnZaaUIwYUdseklITnZkWEpqWlNCMGNtVmxMaUJCYmlCaFpHUnBkR2x2Ym1Gc0lHZHlZVzUwWEc0Z0tpQnZaaUJ3WVhSbGJuUWdjbWxuYUhSeklHTmhiaUJpWlNCbWIzVnVaQ0JwYmlCMGFHVWdVRUZVUlU1VVV5Qm1hV3hsSUdsdUlIUm9aU0J6WVcxbElHUnBjbVZqZEc5eWVTNWNiaUFxTDF4dVhHNG5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJsYlhCMGVVWjFibU4wYVc5dUlEMGdjbVZ4ZFdseVpTZ25abUpxY3k5c2FXSXZaVzF3ZEhsR2RXNWpkR2x2YmljcE8xeHVkbUZ5SUdsdWRtRnlhV0Z1ZENBOUlISmxjWFZwY21Vb0oyWmlhbk12YkdsaUwybHVkbUZ5YVdGdWRDY3BPMXh1ZG1GeUlIZGhjbTVwYm1jZ1BTQnlaWEYxYVhKbEtDZG1ZbXB6TDJ4cFlpOTNZWEp1YVc1bkp5azdYRzVjYm5aaGNpQlNaV0ZqZEZCeWIzQlVlWEJsYzFObFkzSmxkQ0E5SUhKbGNYVnBjbVVvSnk0dmJHbGlMMUpsWVdOMFVISnZjRlI1Y0dWelUyVmpjbVYwSnlrN1hHNTJZWElnWTJobFkydFFjbTl3Vkhsd1pYTWdQU0J5WlhGMWFYSmxLQ2N1TDJOb1pXTnJVSEp2Y0ZSNWNHVnpKeWs3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0b2FYTldZV3hwWkVWc1pXMWxiblFzSUhSb2NtOTNUMjVFYVhKbFkzUkJZMk5sYzNNcElIdGNiaUFnTHlvZ1oyeHZZbUZzSUZONWJXSnZiQ0FxTDF4dUlDQjJZWElnU1ZSRlVrRlVUMUpmVTFsTlFrOU1JRDBnZEhsd1pXOW1JRk41YldKdmJDQTlQVDBnSjJaMWJtTjBhVzl1SnlBbUppQlRlVzFpYjJ3dWFYUmxjbUYwYjNJN1hHNGdJSFpoY2lCR1FWVllYMGxVUlZKQlZFOVNYMU5aVFVKUFRDQTlJQ2RBUUdsMFpYSmhkRzl5SnpzZ0x5OGdRbVZtYjNKbElGTjViV0p2YkNCemNHVmpMbHh1WEc0Z0lDOHFLbHh1SUNBZ0tpQlNaWFIxY201eklIUm9aU0JwZEdWeVlYUnZjaUJ0WlhSb2IyUWdablZ1WTNScGIyNGdZMjl1ZEdGcGJtVmtJRzl1SUhSb1pTQnBkR1Z5WVdKc1pTQnZZbXBsWTNRdVhHNGdJQ0FxWEc0Z0lDQXFJRUpsSUhOMWNtVWdkRzhnYVc1MmIydGxJSFJvWlNCbWRXNWpkR2x2YmlCM2FYUm9JSFJvWlNCcGRHVnlZV0pzWlNCaGN5QmpiMjUwWlhoME9seHVJQ0FnS2x4dUlDQWdLaUFnSUNBZ2RtRnlJR2wwWlhKaGRHOXlSbTRnUFNCblpYUkpkR1Z5WVhSdmNrWnVLRzE1U1hSbGNtRmliR1VwTzF4dUlDQWdLaUFnSUNBZ2FXWWdLR2wwWlhKaGRHOXlSbTRwSUh0Y2JpQWdJQ29nSUNBZ0lDQWdkbUZ5SUdsMFpYSmhkRzl5SUQwZ2FYUmxjbUYwYjNKR2JpNWpZV3hzS0cxNVNYUmxjbUZpYkdVcE8xeHVJQ0FnS2lBZ0lDQWdJQ0F1TGk1Y2JpQWdJQ29nSUNBZ0lIMWNiaUFnSUNwY2JpQWdJQ29nUUhCaGNtRnRJSHMvYjJKcVpXTjBmU0J0WVhsaVpVbDBaWEpoWW14bFhHNGdJQ0FxSUVCeVpYUjFjbTRnZXo5bWRXNWpkR2x2Ym4xY2JpQWdJQ292WEc0Z0lHWjFibU4wYVc5dUlHZGxkRWwwWlhKaGRHOXlSbTRvYldGNVltVkpkR1Z5WVdKc1pTa2dlMXh1SUNBZ0lIWmhjaUJwZEdWeVlYUnZja1p1SUQwZ2JXRjVZbVZKZEdWeVlXSnNaU0FtSmlBb1NWUkZVa0ZVVDFKZlUxbE5RazlNSUNZbUlHMWhlV0psU1hSbGNtRmliR1ZiU1ZSRlVrRlVUMUpmVTFsTlFrOU1YU0I4ZkNCdFlYbGlaVWwwWlhKaFlteGxXMFpCVlZoZlNWUkZVa0ZVVDFKZlUxbE5RazlNWFNrN1hHNGdJQ0FnYVdZZ0tIUjVjR1Z2WmlCcGRHVnlZWFJ2Y2tadUlEMDlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnYVhSbGNtRjBiM0pHYmp0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNBdktpcGNiaUFnSUNvZ1EyOXNiR1ZqZEdsdmJpQnZaaUJ0WlhSb2IyUnpJSFJvWVhRZ1lXeHNiM2NnWkdWamJHRnlZWFJwYjI0Z1lXNWtJSFpoYkdsa1lYUnBiMjRnYjJZZ2NISnZjSE1nZEdoaGRDQmhjbVZjYmlBZ0lDb2djM1Z3Y0d4cFpXUWdkRzhnVW1WaFkzUWdZMjl0Y0c5dVpXNTBjeTRnUlhoaGJYQnNaU0IxYzJGblpUcGNiaUFnSUNwY2JpQWdJQ29nSUNCMllYSWdVSEp2Y0hNZ1BTQnlaWEYxYVhKbEtDZFNaV0ZqZEZCeWIzQlVlWEJsY3ljcE8xeHVJQ0FnS2lBZ0lIWmhjaUJOZVVGeWRHbGpiR1VnUFNCU1pXRmpkQzVqY21WaGRHVkRiR0Z6Y3loN1hHNGdJQ0FxSUNBZ0lDQndjbTl3Vkhsd1pYTTZJSHRjYmlBZ0lDb2dJQ0FnSUNBZ0x5OGdRVzRnYjNCMGFXOXVZV3dnYzNSeWFXNW5JSEJ5YjNBZ2JtRnRaV1FnWENKa1pYTmpjbWx3ZEdsdmJsd2lMbHh1SUNBZ0tpQWdJQ0FnSUNCa1pYTmpjbWx3ZEdsdmJqb2dVSEp2Y0hNdWMzUnlhVzVuTEZ4dUlDQWdLbHh1SUNBZ0tpQWdJQ0FnSUNBdkx5QkJJSEpsY1hWcGNtVmtJR1Z1ZFcwZ2NISnZjQ0J1WVcxbFpDQmNJbU5oZEdWbmIzSjVYQ0l1WEc0Z0lDQXFJQ0FnSUNBZ0lHTmhkR1ZuYjNKNU9pQlFjbTl3Y3k1dmJtVlBaaWhiSjA1bGQzTW5MQ2RRYUc5MGIzTW5YU2t1YVhOU1pYRjFhWEpsWkN4Y2JpQWdJQ3BjYmlBZ0lDb2dJQ0FnSUNBZ0x5OGdRU0J3Y205d0lHNWhiV1ZrSUZ3aVpHbGhiRzluWENJZ2RHaGhkQ0J5WlhGMWFYSmxjeUJoYmlCcGJuTjBZVzVqWlNCdlppQkVhV0ZzYjJjdVhHNGdJQ0FxSUNBZ0lDQWdJR1JwWVd4dlp6b2dVSEp2Y0hNdWFXNXpkR0Z1WTJWUFppaEVhV0ZzYjJjcExtbHpVbVZ4ZFdseVpXUmNiaUFnSUNvZ0lDQWdJSDBzWEc0Z0lDQXFJQ0FnSUNCeVpXNWtaWEk2SUdaMWJtTjBhVzl1S0NrZ2V5QXVMaTRnZlZ4dUlDQWdLaUFnSUgwcE8xeHVJQ0FnS2x4dUlDQWdLaUJCSUcxdmNtVWdabTl5YldGc0lITndaV05wWm1sallYUnBiMjRnYjJZZ2FHOTNJSFJvWlhObElHMWxkR2h2WkhNZ1lYSmxJSFZ6WldRNlhHNGdJQ0FxWEc0Z0lDQXFJQ0FnZEhsd1pTQTZQU0JoY25KaGVYeGliMjlzZkdaMWJtTjhiMkpxWldOMGZHNTFiV0psY254emRISnBibWQ4YjI1bFQyWW9XeTR1TGwwcGZHbHVjM1JoYm1ObFQyWW9MaTR1S1Z4dUlDQWdLaUFnSUdSbFkyd2dPajBnVW1WaFkzUlFjbTl3Vkhsd1pYTXVlM1I1Y0dWOUtDNXBjMUpsY1hWcGNtVmtLVDljYmlBZ0lDcGNiaUFnSUNvZ1JXRmphQ0JoYm1RZ1pYWmxjbmtnWkdWamJHRnlZWFJwYjI0Z2NISnZaSFZqWlhNZ1lTQm1kVzVqZEdsdmJpQjNhWFJvSUhSb1pTQnpZVzFsSUhOcFoyNWhkSFZ5WlM0Z1ZHaHBjMXh1SUNBZ0tpQmhiR3h2ZDNNZ2RHaGxJR055WldGMGFXOXVJRzltSUdOMWMzUnZiU0IyWVd4cFpHRjBhVzl1SUdaMWJtTjBhVzl1Y3k0Z1JtOXlJR1Y0WVcxd2JHVTZYRzRnSUNBcVhHNGdJQ0FxSUNCMllYSWdUWGxNYVc1cklEMGdVbVZoWTNRdVkzSmxZWFJsUTJ4aGMzTW9lMXh1SUNBZ0tpQWdJQ0J3Y205d1ZIbHdaWE02SUh0Y2JpQWdJQ29nSUNBZ0lDQXZMeUJCYmlCdmNIUnBiMjVoYkNCemRISnBibWNnYjNJZ1ZWSkpJSEJ5YjNBZ2JtRnRaV1FnWENKb2NtVm1YQ0l1WEc0Z0lDQXFJQ0FnSUNBZ2FISmxaam9nWm5WdVkzUnBiMjRvY0hKdmNITXNJSEJ5YjNCT1lXMWxMQ0JqYjIxd2IyNWxiblJPWVcxbEtTQjdYRzRnSUNBcUlDQWdJQ0FnSUNCMllYSWdjSEp2Y0ZaaGJIVmxJRDBnY0hKdmNITmJjSEp2Y0U1aGJXVmRPMXh1SUNBZ0tpQWdJQ0FnSUNBZ2FXWWdLSEJ5YjNCV1lXeDFaU0FoUFNCdWRXeHNJQ1ltSUhSNWNHVnZaaUJ3Y205d1ZtRnNkV1VnSVQwOUlDZHpkSEpwYm1jbklDWW1YRzRnSUNBcUlDQWdJQ0FnSUNBZ0lDQWdJU2h3Y205d1ZtRnNkV1VnYVc1emRHRnVZMlZ2WmlCVlVra3BLU0I3WEc0Z0lDQXFJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQnVaWGNnUlhKeWIzSW9YRzRnSUNBcUlDQWdJQ0FnSUNBZ0lDQWdKMFY0Y0dWamRHVmtJR0VnYzNSeWFXNW5JRzl5SUdGdUlGVlNTU0JtYjNJZ0p5QXJJSEJ5YjNCT1lXMWxJQ3NnSnlCcGJpQW5JQ3RjYmlBZ0lDb2dJQ0FnSUNBZ0lDQWdJQ0JqYjIxd2IyNWxiblJPWVcxbFhHNGdJQ0FxSUNBZ0lDQWdJQ0FnSUNrN1hHNGdJQ0FxSUNBZ0lDQWdJQ0I5WEc0Z0lDQXFJQ0FnSUNBZ2ZWeHVJQ0FnS2lBZ0lDQjlMRnh1SUNBZ0tpQWdJQ0J5Wlc1a1pYSTZJR1oxYm1OMGFXOXVLQ2tnZXk0dUxuMWNiaUFnSUNvZ0lIMHBPMXh1SUNBZ0tseHVJQ0FnS2lCQWFXNTBaWEp1WVd4Y2JpQWdJQ292WEc1Y2JpQWdkbUZ5SUVGT1QwNVpUVTlWVXlBOUlDYzhQR0Z1YjI1NWJXOTFjejQrSnp0Y2JseHVJQ0F2THlCSmJYQnZjblJoYm5RaFhHNGdJQzh2SUV0bFpYQWdkR2hwY3lCc2FYTjBJR2x1SUhONWJtTWdkMmwwYUNCd2NtOWtkV04wYVc5dUlIWmxjbk5wYjI0Z2FXNGdZQzR2Wm1GamRHOXllVmRwZEdoVWFISnZkMmx1WjFOb2FXMXpMbXB6WUM1Y2JpQWdkbUZ5SUZKbFlXTjBVSEp2Y0ZSNWNHVnpJRDBnZTF4dUlDQWdJR0Z5Y21GNU9pQmpjbVZoZEdWUWNtbHRhWFJwZG1WVWVYQmxRMmhsWTJ0bGNpZ25ZWEp5WVhrbktTeGNiaUFnSUNCaWIyOXNPaUJqY21WaGRHVlFjbWx0YVhScGRtVlVlWEJsUTJobFkydGxjaWduWW05dmJHVmhiaWNwTEZ4dUlDQWdJR1oxYm1NNklHTnlaV0YwWlZCeWFXMXBkR2wyWlZSNWNHVkRhR1ZqYTJWeUtDZG1kVzVqZEdsdmJpY3BMRnh1SUNBZ0lHNTFiV0psY2pvZ1kzSmxZWFJsVUhKcGJXbDBhWFpsVkhsd1pVTm9aV05yWlhJb0oyNTFiV0psY2ljcExGeHVJQ0FnSUc5aWFtVmpkRG9nWTNKbFlYUmxVSEpwYldsMGFYWmxWSGx3WlVOb1pXTnJaWElvSjI5aWFtVmpkQ2NwTEZ4dUlDQWdJSE4wY21sdVp6b2dZM0psWVhSbFVISnBiV2wwYVhabFZIbHdaVU5vWldOclpYSW9KM04wY21sdVp5Y3BMRnh1SUNBZ0lITjViV0p2YkRvZ1kzSmxZWFJsVUhKcGJXbDBhWFpsVkhsd1pVTm9aV05yWlhJb0ozTjViV0p2YkNjcExGeHVYRzRnSUNBZ1lXNTVPaUJqY21WaGRHVkJibmxVZVhCbFEyaGxZMnRsY2lncExGeHVJQ0FnSUdGeWNtRjVUMlk2SUdOeVpXRjBaVUZ5Y21GNVQyWlVlWEJsUTJobFkydGxjaXhjYmlBZ0lDQmxiR1Z0Wlc1ME9pQmpjbVZoZEdWRmJHVnRaVzUwVkhsd1pVTm9aV05yWlhJb0tTeGNiaUFnSUNCcGJuTjBZVzVqWlU5bU9pQmpjbVZoZEdWSmJuTjBZVzVqWlZSNWNHVkRhR1ZqYTJWeUxGeHVJQ0FnSUc1dlpHVTZJR055WldGMFpVNXZaR1ZEYUdWamEyVnlLQ2tzWEc0Z0lDQWdiMkpxWldOMFQyWTZJR055WldGMFpVOWlhbVZqZEU5bVZIbHdaVU5vWldOclpYSXNYRzRnSUNBZ2IyNWxUMlk2SUdOeVpXRjBaVVZ1ZFcxVWVYQmxRMmhsWTJ0bGNpeGNiaUFnSUNCdmJtVlBabFI1Y0dVNklHTnlaV0YwWlZWdWFXOXVWSGx3WlVOb1pXTnJaWElzWEc0Z0lDQWdjMmhoY0dVNklHTnlaV0YwWlZOb1lYQmxWSGx3WlVOb1pXTnJaWEpjYmlBZ2ZUdGNibHh1SUNBdktpcGNiaUFnSUNvZ2FXNXNhVzVsWkNCUFltcGxZM1F1YVhNZ2NHOXNlV1pwYkd3Z2RHOGdZWFp2YVdRZ2NtVnhkV2x5YVc1bklHTnZibk4xYldWeWN5QnphR2x3SUhSb1pXbHlJRzkzYmx4dUlDQWdLaUJvZEhSd2N6b3ZMMlJsZG1Wc2IzQmxjaTV0YjNwcGJHeGhMbTl5Wnk5bGJpMVZVeTlrYjJOekwxZGxZaTlLWVhaaFUyTnlhWEIwTDFKbFptVnlaVzVqWlM5SGJHOWlZV3hmVDJKcVpXTjBjeTlQWW1wbFkzUXZhWE5jYmlBZ0lDb3ZYRzRnSUM4cVpYTnNhVzUwTFdScGMyRmliR1VnYm04dGMyVnNaaTFqYjIxd1lYSmxLaTljYmlBZ1puVnVZM1JwYjI0Z2FYTW9lQ3dnZVNrZ2UxeHVJQ0FnSUM4dklGTmhiV1ZXWVd4MVpTQmhiR2R2Y21sMGFHMWNiaUFnSUNCcFppQW9lQ0E5UFQwZ2VTa2dlMXh1SUNBZ0lDQWdMeThnVTNSbGNITWdNUzAxTENBM0xURXdYRzRnSUNBZ0lDQXZMeUJUZEdWd2N5QTJMbUl0Tmk1bE9pQXJNQ0FoUFNBdE1GeHVJQ0FnSUNBZ2NtVjBkWEp1SUhnZ0lUMDlJREFnZkh3Z01TQXZJSGdnUFQwOUlERWdMeUI1TzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQXZMeUJUZEdWd0lEWXVZVG9nVG1GT0lEMDlJRTVoVGx4dUlDQWdJQ0FnY21WMGRYSnVJSGdnSVQwOUlIZ2dKaVlnZVNBaFBUMGdlVHRjYmlBZ0lDQjlYRzRnSUgxY2JpQWdMeXBsYzJ4cGJuUXRaVzVoWW14bElHNXZMWE5sYkdZdFkyOXRjR0Z5WlNvdlhHNWNiaUFnTHlvcVhHNGdJQ0FxSUZkbElIVnpaU0JoYmlCRmNuSnZjaTFzYVd0bElHOWlhbVZqZENCbWIzSWdZbUZqYTNkaGNtUWdZMjl0Y0dGMGFXSnBiR2wwZVNCaGN5QndaVzl3YkdVZ2JXRjVJR05oYkd4Y2JpQWdJQ29nVUhKdmNGUjVjR1Z6SUdScGNtVmpkR3g1SUdGdVpDQnBibk53WldOMElIUm9aV2x5SUc5MWRIQjFkQzRnU0c5M1pYWmxjaXdnZDJVZ1pHOXVKM1FnZFhObElISmxZV3hjYmlBZ0lDb2dSWEp5YjNKeklHRnVlVzF2Y21VdUlGZGxJR1J2YmlkMElHbHVjM0JsWTNRZ2RHaGxhWElnYzNSaFkyc2dZVzU1ZDJGNUxDQmhibVFnWTNKbFlYUnBibWNnZEdobGJWeHVJQ0FnS2lCcGN5QndjbTlvYVdKcGRHbDJaV3g1SUdWNGNHVnVjMmwyWlNCcFppQjBhR1Y1SUdGeVpTQmpjbVZoZEdWa0lIUnZieUJ2Wm5SbGJpd2djM1ZqYUNCaGN5QjNhR0YwWEc0Z0lDQXFJR2hoY0hCbGJuTWdhVzRnYjI1bFQyWlVlWEJsS0NrZ1ptOXlJR0Z1ZVNCMGVYQmxJR0psWm05eVpTQjBhR1VnYjI1bElIUm9ZWFFnYldGMFkyaGxaQzVjYmlBZ0lDb3ZYRzRnSUdaMWJtTjBhVzl1SUZCeWIzQlVlWEJsUlhKeWIzSW9iV1Z6YzJGblpTa2dlMXh1SUNBZ0lIUm9hWE11YldWemMyRm5aU0E5SUcxbGMzTmhaMlU3WEc0Z0lDQWdkR2hwY3k1emRHRmpheUE5SUNjbk8xeHVJQ0I5WEc0Z0lDOHZJRTFoYTJVZ1lHbHVjM1JoYm1ObGIyWWdSWEp5YjNKZ0lITjBhV3hzSUhkdmNtc2dabTl5SUhKbGRIVnlibVZrSUdWeWNtOXljeTVjYmlBZ1VISnZjRlI1Y0dWRmNuSnZjaTV3Y205MGIzUjVjR1VnUFNCRmNuSnZjaTV3Y205MGIzUjVjR1U3WEc1Y2JpQWdablZ1WTNScGIyNGdZM0psWVhSbFEyaGhhVzVoWW14bFZIbHdaVU5vWldOclpYSW9kbUZzYVdSaGRHVXBJSHRjYmlBZ0lDQnBaaUFvY0hKdlkyVnpjeTVsYm5ZdVRrOUVSVjlGVGxZZ0lUMDlJQ2R3Y205a2RXTjBhVzl1SnlrZ2UxeHVJQ0FnSUNBZ2RtRnlJRzFoYm5WaGJGQnliM0JVZVhCbFEyRnNiRU5oWTJobElEMGdlMzA3WEc0Z0lDQWdJQ0IyWVhJZ2JXRnVkV0ZzVUhKdmNGUjVjR1ZYWVhKdWFXNW5RMjkxYm5RZ1BTQXdPMXh1SUNBZ0lIMWNiaUFnSUNCbWRXNWpkR2x2YmlCamFHVmphMVI1Y0dVb2FYTlNaWEYxYVhKbFpDd2djSEp2Y0hNc0lIQnliM0JPWVcxbExDQmpiMjF3YjI1bGJuUk9ZVzFsTENCc2IyTmhkR2x2Yml3Z2NISnZjRVoxYkd4T1lXMWxMQ0J6WldOeVpYUXBJSHRjYmlBZ0lDQWdJR052YlhCdmJtVnVkRTVoYldVZ1BTQmpiMjF3YjI1bGJuUk9ZVzFsSUh4OElFRk9UMDVaVFU5VlV6dGNiaUFnSUNBZ0lIQnliM0JHZFd4c1RtRnRaU0E5SUhCeWIzQkdkV3hzVG1GdFpTQjhmQ0J3Y205d1RtRnRaVHRjYmx4dUlDQWdJQ0FnYVdZZ0tITmxZM0psZENBaFBUMGdVbVZoWTNSUWNtOXdWSGx3WlhOVFpXTnlaWFFwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLSFJvY205M1QyNUVhWEpsWTNSQlkyTmxjM01wSUh0Y2JpQWdJQ0FnSUNBZ0lDQXZMeUJPWlhjZ1ltVm9ZWFpwYjNJZ2IyNXNlU0JtYjNJZ2RYTmxjbk1nYjJZZ1lIQnliM0F0ZEhsd1pYTmdJSEJoWTJ0aFoyVmNiaUFnSUNBZ0lDQWdJQ0JwYm5aaGNtbGhiblFvWEc0Z0lDQWdJQ0FnSUNBZ0lDQm1ZV3h6WlN4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ2REWVd4c2FXNW5JRkJ5YjNCVWVYQmxjeUIyWVd4cFpHRjBiM0p6SUdScGNtVmpkR3g1SUdseklHNXZkQ0J6ZFhCd2IzSjBaV1FnWW5rZ2RHaGxJR0J3Y205d0xYUjVjR1Z6WUNCd1lXTnJZV2RsTGlBbklDdGNiaUFnSUNBZ0lDQWdJQ0FnSUNkVmMyVWdZRkJ5YjNCVWVYQmxjeTVqYUdWamExQnliM0JVZVhCbGN5Z3BZQ0IwYnlCallXeHNJSFJvWlcwdUlDY2dLMXh1SUNBZ0lDQWdJQ0FnSUNBZ0oxSmxZV1FnYlc5eVpTQmhkQ0JvZEhSd09pOHZabUl1YldVdmRYTmxMV05vWldOckxYQnliM0F0ZEhsd1pYTW5YRzRnSUNBZ0lDQWdJQ0FnS1R0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaHdjbTlqWlhOekxtVnVkaTVPVDBSRlgwVk9WaUFoUFQwZ0ozQnliMlIxWTNScGIyNG5JQ1ltSUhSNWNHVnZaaUJqYjI1emIyeGxJQ0U5UFNBbmRXNWtaV1pwYm1Wa0p5a2dlMXh1SUNBZ0lDQWdJQ0FnSUM4dklFOXNaQ0JpWldoaGRtbHZjaUJtYjNJZ2NHVnZjR3hsSUhWemFXNW5JRkpsWVdOMExsQnliM0JVZVhCbGMxeHVJQ0FnSUNBZ0lDQWdJSFpoY2lCallXTm9aVXRsZVNBOUlHTnZiWEJ2Ym1WdWRFNWhiV1VnS3lBbk9pY2dLeUJ3Y205d1RtRnRaVHRjYmlBZ0lDQWdJQ0FnSUNCcFppQW9YRzRnSUNBZ0lDQWdJQ0FnSUNBaGJXRnVkV0ZzVUhKdmNGUjVjR1ZEWVd4c1EyRmphR1ZiWTJGamFHVkxaWGxkSUNZbVhHNGdJQ0FnSUNBZ0lDQWdJQ0F2THlCQmRtOXBaQ0J6Y0dGdGJXbHVaeUIwYUdVZ1kyOXVjMjlzWlNCaVpXTmhkWE5sSUhSb1pYa2dZWEpsSUc5bWRHVnVJRzV2ZENCaFkzUnBiMjVoWW14bElHVjRZMlZ3ZENCbWIzSWdiR2xpSUdGMWRHaHZjbk5jYmlBZ0lDQWdJQ0FnSUNBZ0lHMWhiblZoYkZCeWIzQlVlWEJsVjJGeWJtbHVaME52ZFc1MElEd2dNMXh1SUNBZ0lDQWdJQ0FnSUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZDJGeWJtbHVaeWhjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdabUZzYzJVc1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNkWmIzVWdZWEpsSUcxaGJuVmhiR3g1SUdOaGJHeHBibWNnWVNCU1pXRmpkQzVRY205d1ZIbHdaWE1nZG1Gc2FXUmhkR2x2YmlBbklDdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0oyWjFibU4wYVc5dUlHWnZjaUIwYUdVZ1lDVnpZQ0J3Y205d0lHOXVJR0FsYzJBdUlGUm9hWE1nYVhNZ1pHVndjbVZqWVhSbFpDQW5JQ3RjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdKMkZ1WkNCM2FXeHNJSFJvY205M0lHbHVJSFJvWlNCemRHRnVaR0ZzYjI1bElHQndjbTl3TFhSNWNHVnpZQ0J3WVdOcllXZGxMaUFuSUN0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSjFsdmRTQnRZWGtnWW1VZ2MyVmxhVzVuSUhSb2FYTWdkMkZ5Ym1sdVp5QmtkV1VnZEc4Z1lTQjBhR2x5WkMxd1lYSjBlU0JRY205d1ZIbHdaWE1nSnlBclhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNkc2FXSnlZWEo1TGlCVFpXVWdhSFIwY0hNNkx5OW1ZaTV0WlM5eVpXRmpkQzEzWVhKdWFXNW5MV1J2Ym5RdFkyRnNiQzF3Y205d2RIbHdaWE1nSnlBcklDZG1iM0lnWkdWMFlXbHNjeTRuTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0J3Y205d1JuVnNiRTVoYldVc1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUdOdmJYQnZibVZ1ZEU1aGJXVmNiaUFnSUNBZ0lDQWdJQ0FnSUNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J0WVc1MVlXeFFjbTl3Vkhsd1pVTmhiR3hEWVdOb1pWdGpZV05vWlV0bGVWMGdQU0IwY25WbE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnYldGdWRXRnNVSEp2Y0ZSNWNHVlhZWEp1YVc1blEyOTFiblFyS3p0Y2JpQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJR2xtSUNod2NtOXdjMXR3Y205d1RtRnRaVjBnUFQwZ2JuVnNiQ2tnZTF4dUlDQWdJQ0FnSUNCcFppQW9hWE5TWlhGMWFYSmxaQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2h3Y205d2MxdHdjbTl3VG1GdFpWMGdQVDA5SUc1MWJHd3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCdVpYY2dVSEp2Y0ZSNWNHVkZjbkp2Y2lnblZHaGxJQ2NnS3lCc2IyTmhkR2x2YmlBcklDY2dZQ2NnS3lCd2NtOXdSblZzYkU1aGJXVWdLeUFuWUNCcGN5QnRZWEpyWldRZ1lYTWdjbVZ4ZFdseVpXUWdKeUFySUNnbmFXNGdZQ2NnS3lCamIyMXdiMjVsYm5ST1lXMWxJQ3NnSjJBc0lHSjFkQ0JwZEhNZ2RtRnNkV1VnYVhNZ1lHNTFiR3hnTGljcEtUdGNiaUFnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUc1bGR5QlFjbTl3Vkhsd1pVVnljbTl5S0NkVWFHVWdKeUFySUd4dlkyRjBhVzl1SUNzZ0p5QmdKeUFySUhCeWIzQkdkV3hzVG1GdFpTQXJJQ2RnSUdseklHMWhjbXRsWkNCaGN5QnlaWEYxYVhKbFpDQnBiaUFuSUNzZ0tDZGdKeUFySUdOdmJYQnZibVZ1ZEU1aGJXVWdLeUFuWUN3Z1luVjBJR2wwY3lCMllXeDFaU0JwY3lCZ2RXNWtaV1pwYm1Wa1lDNG5LU2s3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUc1MWJHdzdYRzRnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2RtRnNhV1JoZEdVb2NISnZjSE1zSUhCeWIzQk9ZVzFsTENCamIyMXdiMjVsYm5ST1lXMWxMQ0JzYjJOaGRHbHZiaXdnY0hKdmNFWjFiR3hPWVcxbEtUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNWNiaUFnSUNCMllYSWdZMmhoYVc1bFpFTm9aV05yVkhsd1pTQTlJR05vWldOclZIbHdaUzVpYVc1a0tHNTFiR3dzSUdaaGJITmxLVHRjYmlBZ0lDQmphR0ZwYm1Wa1EyaGxZMnRVZVhCbExtbHpVbVZ4ZFdseVpXUWdQU0JqYUdWamExUjVjR1V1WW1sdVpDaHVkV3hzTENCMGNuVmxLVHRjYmx4dUlDQWdJSEpsZEhWeWJpQmphR0ZwYm1Wa1EyaGxZMnRVZVhCbE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdZM0psWVhSbFVISnBiV2wwYVhabFZIbHdaVU5vWldOclpYSW9aWGh3WldOMFpXUlVlWEJsS1NCN1hHNGdJQ0FnWm5WdVkzUnBiMjRnZG1Gc2FXUmhkR1VvY0hKdmNITXNJSEJ5YjNCT1lXMWxMQ0JqYjIxd2IyNWxiblJPWVcxbExDQnNiMk5oZEdsdmJpd2djSEp2Y0VaMWJHeE9ZVzFsTENCelpXTnlaWFFwSUh0Y2JpQWdJQ0FnSUhaaGNpQndjbTl3Vm1Gc2RXVWdQU0J3Y205d2MxdHdjbTl3VG1GdFpWMDdYRzRnSUNBZ0lDQjJZWElnY0hKdmNGUjVjR1VnUFNCblpYUlFjbTl3Vkhsd1pTaHdjbTl3Vm1Gc2RXVXBPMXh1SUNBZ0lDQWdhV1lnS0hCeWIzQlVlWEJsSUNFOVBTQmxlSEJsWTNSbFpGUjVjR1VwSUh0Y2JpQWdJQ0FnSUNBZ0x5OGdZSEJ5YjNCV1lXeDFaV0FnWW1WcGJtY2dhVzV6ZEdGdVkyVWdiMllzSUhOaGVTd2daR0YwWlM5eVpXZGxlSEFzSUhCaGMzTWdkR2hsSUNkdlltcGxZM1FuWEc0Z0lDQWdJQ0FnSUM4dklHTm9aV05yTENCaWRYUWdkMlVnWTJGdUlHOW1abVZ5SUdFZ2JXOXlaU0J3Y21WamFYTmxJR1Z5Y205eUlHMWxjM05oWjJVZ2FHVnlaU0J5WVhSb1pYSWdkR2hoYmx4dUlDQWdJQ0FnSUNBdkx5QW5iMllnZEhsd1pTQmdiMkpxWldOMFlDY3VYRzRnSUNBZ0lDQWdJSFpoY2lCd2NtVmphWE5sVkhsd1pTQTlJR2RsZEZCeVpXTnBjMlZVZVhCbEtIQnliM0JXWVd4MVpTazdYRzVjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJRzVsZHlCUWNtOXdWSGx3WlVWeWNtOXlLQ2RKYm5aaGJHbGtJQ2NnS3lCc2IyTmhkR2x2YmlBcklDY2dZQ2NnS3lCd2NtOXdSblZzYkU1aGJXVWdLeUFuWUNCdlppQjBlWEJsSUNjZ0t5QW9KMkFuSUNzZ2NISmxZMmx6WlZSNWNHVWdLeUFuWUNCemRYQndiR2xsWkNCMGJ5QmdKeUFySUdOdmJYQnZibVZ1ZEU1aGJXVWdLeUFuWUN3Z1pYaHdaV04wWldRZ0p5a2dLeUFvSjJBbklDc2daWGh3WldOMFpXUlVlWEJsSUNzZ0oyQXVKeWtwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnY21WMGRYSnVJRzUxYkd3N1hHNGdJQ0FnZlZ4dUlDQWdJSEpsZEhWeWJpQmpjbVZoZEdWRGFHRnBibUZpYkdWVWVYQmxRMmhsWTJ0bGNpaDJZV3hwWkdGMFpTazdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJqY21WaGRHVkJibmxVZVhCbFEyaGxZMnRsY2lncElIdGNiaUFnSUNCeVpYUjFjbTRnWTNKbFlYUmxRMmhoYVc1aFlteGxWSGx3WlVOb1pXTnJaWElvWlcxd2RIbEdkVzVqZEdsdmJpNTBhR0YwVW1WMGRYSnVjMDUxYkd3cE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdZM0psWVhSbFFYSnlZWGxQWmxSNWNHVkRhR1ZqYTJWeUtIUjVjR1ZEYUdWamEyVnlLU0I3WEc0Z0lDQWdablZ1WTNScGIyNGdkbUZzYVdSaGRHVW9jSEp2Y0hNc0lIQnliM0JPWVcxbExDQmpiMjF3YjI1bGJuUk9ZVzFsTENCc2IyTmhkR2x2Yml3Z2NISnZjRVoxYkd4T1lXMWxLU0I3WEc0Z0lDQWdJQ0JwWmlBb2RIbHdaVzltSUhSNWNHVkRhR1ZqYTJWeUlDRTlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCdVpYY2dVSEp2Y0ZSNWNHVkZjbkp2Y2lnblVISnZjR1Z5ZEhrZ1lDY2dLeUJ3Y205d1JuVnNiRTVoYldVZ0t5QW5ZQ0J2WmlCamIyMXdiMjVsYm5RZ1lDY2dLeUJqYjIxd2IyNWxiblJPWVcxbElDc2dKMkFnYUdGeklHbHVkbUZzYVdRZ1VISnZjRlI1Y0dVZ2JtOTBZWFJwYjI0Z2FXNXphV1JsSUdGeWNtRjVUMll1SnlrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCMllYSWdjSEp2Y0ZaaGJIVmxJRDBnY0hKdmNITmJjSEp2Y0U1aGJXVmRPMXh1SUNBZ0lDQWdhV1lnS0NGQmNuSmhlUzVwYzBGeWNtRjVLSEJ5YjNCV1lXeDFaU2twSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJSEJ5YjNCVWVYQmxJRDBnWjJWMFVISnZjRlI1Y0dVb2NISnZjRlpoYkhWbEtUdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHNWxkeUJRY205d1ZIbHdaVVZ5Y205eUtDZEpiblpoYkdsa0lDY2dLeUJzYjJOaGRHbHZiaUFySUNjZ1lDY2dLeUJ3Y205d1JuVnNiRTVoYldVZ0t5QW5ZQ0J2WmlCMGVYQmxJQ2NnS3lBb0oyQW5JQ3NnY0hKdmNGUjVjR1VnS3lBbllDQnpkWEJ3YkdsbFpDQjBieUJnSnlBcklHTnZiWEJ2Ym1WdWRFNWhiV1VnS3lBbllDd2daWGh3WldOMFpXUWdZVzRnWVhKeVlYa3VKeWtwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCd2NtOXdWbUZzZFdVdWJHVnVaM1JvT3lCcEt5c3BJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlHVnljbTl5SUQwZ2RIbHdaVU5vWldOclpYSW9jSEp2Y0ZaaGJIVmxMQ0JwTENCamIyMXdiMjVsYm5ST1lXMWxMQ0JzYjJOaGRHbHZiaXdnY0hKdmNFWjFiR3hPWVcxbElDc2dKMXNuSUNzZ2FTQXJJQ2RkSnl3Z1VtVmhZM1JRY205d1ZIbHdaWE5UWldOeVpYUXBPMXh1SUNBZ0lDQWdJQ0JwWmlBb1pYSnliM0lnYVc1emRHRnVZMlZ2WmlCRmNuSnZjaWtnZTF4dUlDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCbGNuSnZjanRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnY21WMGRYSnVJRzUxYkd3N1hHNGdJQ0FnZlZ4dUlDQWdJSEpsZEhWeWJpQmpjbVZoZEdWRGFHRnBibUZpYkdWVWVYQmxRMmhsWTJ0bGNpaDJZV3hwWkdGMFpTazdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJqY21WaGRHVkZiR1Z0Wlc1MFZIbHdaVU5vWldOclpYSW9LU0I3WEc0Z0lDQWdablZ1WTNScGIyNGdkbUZzYVdSaGRHVW9jSEp2Y0hNc0lIQnliM0JPWVcxbExDQmpiMjF3YjI1bGJuUk9ZVzFsTENCc2IyTmhkR2x2Yml3Z2NISnZjRVoxYkd4T1lXMWxLU0I3WEc0Z0lDQWdJQ0IyWVhJZ2NISnZjRlpoYkhWbElEMGdjSEp2Y0hOYmNISnZjRTVoYldWZE8xeHVJQ0FnSUNBZ2FXWWdLQ0ZwYzFaaGJHbGtSV3hsYldWdWRDaHdjbTl3Vm1Gc2RXVXBLU0I3WEc0Z0lDQWdJQ0FnSUhaaGNpQndjbTl3Vkhsd1pTQTlJR2RsZEZCeWIzQlVlWEJsS0hCeWIzQldZV3gxWlNrN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCdVpYY2dVSEp2Y0ZSNWNHVkZjbkp2Y2lnblNXNTJZV3hwWkNBbklDc2diRzlqWVhScGIyNGdLeUFuSUdBbklDc2djSEp2Y0VaMWJHeE9ZVzFsSUNzZ0oyQWdiMllnZEhsd1pTQW5JQ3NnS0NkZ0p5QXJJSEJ5YjNCVWVYQmxJQ3NnSjJBZ2MzVndjR3hwWldRZ2RHOGdZQ2NnS3lCamIyMXdiMjVsYm5ST1lXMWxJQ3NnSjJBc0lHVjRjR1ZqZEdWa0lHRWdjMmx1WjJ4bElGSmxZV04wUld4bGJXVnVkQzRuS1NrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCeVpYUjFjbTRnYm5Wc2JEdGNiaUFnSUNCOVhHNGdJQ0FnY21WMGRYSnVJR055WldGMFpVTm9ZV2x1WVdKc1pWUjVjR1ZEYUdWamEyVnlLSFpoYkdsa1lYUmxLVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUdOeVpXRjBaVWx1YzNSaGJtTmxWSGx3WlVOb1pXTnJaWElvWlhod1pXTjBaV1JEYkdGemN5a2dlMXh1SUNBZ0lHWjFibU4wYVc5dUlIWmhiR2xrWVhSbEtIQnliM0J6TENCd2NtOXdUbUZ0WlN3Z1kyOXRjRzl1Wlc1MFRtRnRaU3dnYkc5allYUnBiMjRzSUhCeWIzQkdkV3hzVG1GdFpTa2dlMXh1SUNBZ0lDQWdhV1lnS0NFb2NISnZjSE5iY0hKdmNFNWhiV1ZkSUdsdWMzUmhibU5sYjJZZ1pYaHdaV04wWldSRGJHRnpjeWtwSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJR1Y0Y0dWamRHVmtRMnhoYzNOT1lXMWxJRDBnWlhod1pXTjBaV1JEYkdGemN5NXVZVzFsSUh4OElFRk9UMDVaVFU5VlV6dGNiaUFnSUNBZ0lDQWdkbUZ5SUdGamRIVmhiRU5zWVhOelRtRnRaU0E5SUdkbGRFTnNZWE56VG1GdFpTaHdjbTl3YzF0d2NtOXdUbUZ0WlYwcE8xeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2JtVjNJRkJ5YjNCVWVYQmxSWEp5YjNJb0owbHVkbUZzYVdRZ0p5QXJJR3h2WTJGMGFXOXVJQ3NnSnlCZ0p5QXJJSEJ5YjNCR2RXeHNUbUZ0WlNBcklDZGdJRzltSUhSNWNHVWdKeUFySUNnbllDY2dLeUJoWTNSMVlXeERiR0Z6YzA1aGJXVWdLeUFuWUNCemRYQndiR2xsWkNCMGJ5QmdKeUFySUdOdmJYQnZibVZ1ZEU1aGJXVWdLeUFuWUN3Z1pYaHdaV04wWldRZ0p5a2dLeUFvSjJsdWMzUmhibU5sSUc5bUlHQW5JQ3NnWlhod1pXTjBaV1JEYkdGemMwNWhiV1VnS3lBbllDNG5LU2s3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0J5WlhSMWNtNGdiblZzYkR0Y2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlHTnlaV0YwWlVOb1lXbHVZV0pzWlZSNWNHVkRhR1ZqYTJWeUtIWmhiR2xrWVhSbEtUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR055WldGMFpVVnVkVzFVZVhCbFEyaGxZMnRsY2lobGVIQmxZM1JsWkZaaGJIVmxjeWtnZTF4dUlDQWdJR2xtSUNnaFFYSnlZWGt1YVhOQmNuSmhlU2hsZUhCbFkzUmxaRlpoYkhWbGN5a3BJSHRjYmlBZ0lDQWdJSEJ5YjJObGMzTXVaVzUyTGs1UFJFVmZSVTVXSUNFOVBTQW5jSEp2WkhWamRHbHZiaWNnUHlCM1lYSnVhVzVuS0daaGJITmxMQ0FuU1c1MllXeHBaQ0JoY21kMWJXVnVkQ0J6ZFhCd2JHbGxaQ0IwYnlCdmJtVlBaaXdnWlhod1pXTjBaV1FnWVc0Z2FXNXpkR0Z1WTJVZ2IyWWdZWEp5WVhrdUp5a2dPaUIyYjJsa0lEQTdYRzRnSUNBZ0lDQnlaWFIxY200Z1pXMXdkSGxHZFc1amRHbHZiaTUwYUdGMFVtVjBkWEp1YzA1MWJHdzdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ1puVnVZM1JwYjI0Z2RtRnNhV1JoZEdVb2NISnZjSE1zSUhCeWIzQk9ZVzFsTENCamIyMXdiMjVsYm5ST1lXMWxMQ0JzYjJOaGRHbHZiaXdnY0hKdmNFWjFiR3hPWVcxbEtTQjdYRzRnSUNBZ0lDQjJZWElnY0hKdmNGWmhiSFZsSUQwZ2NISnZjSE5iY0hKdmNFNWhiV1ZkTzF4dUlDQWdJQ0FnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCbGVIQmxZM1JsWkZaaGJIVmxjeTVzWlc1bmRHZzdJR2tyS3lrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvYVhNb2NISnZjRlpoYkhWbExDQmxlSEJsWTNSbFpGWmhiSFZsYzF0cFhTa3BJSHRjYmlBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnYm5Wc2JEdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0IyWVhJZ2RtRnNkV1Z6VTNSeWFXNW5JRDBnU2xOUFRpNXpkSEpwYm1kcFpua29aWGh3WldOMFpXUldZV3gxWlhNcE8xeHVJQ0FnSUNBZ2NtVjBkWEp1SUc1bGR5QlFjbTl3Vkhsd1pVVnljbTl5S0NkSmJuWmhiR2xrSUNjZ0t5QnNiMk5oZEdsdmJpQXJJQ2NnWUNjZ0t5QndjbTl3Um5Wc2JFNWhiV1VnS3lBbllDQnZaaUIyWVd4MVpTQmdKeUFySUhCeWIzQldZV3gxWlNBcklDZGdJQ2NnS3lBb0ozTjFjSEJzYVdWa0lIUnZJR0FuSUNzZ1kyOXRjRzl1Wlc1MFRtRnRaU0FySUNkZ0xDQmxlSEJsWTNSbFpDQnZibVVnYjJZZ0p5QXJJSFpoYkhWbGMxTjBjbWx1WnlBcklDY3VKeWtwTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z1kzSmxZWFJsUTJoaGFXNWhZbXhsVkhsd1pVTm9aV05yWlhJb2RtRnNhV1JoZEdVcE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdZM0psWVhSbFQySnFaV04wVDJaVWVYQmxRMmhsWTJ0bGNpaDBlWEJsUTJobFkydGxjaWtnZTF4dUlDQWdJR1oxYm1OMGFXOXVJSFpoYkdsa1lYUmxLSEJ5YjNCekxDQndjbTl3VG1GdFpTd2dZMjl0Y0c5dVpXNTBUbUZ0WlN3Z2JHOWpZWFJwYjI0c0lIQnliM0JHZFd4c1RtRnRaU2tnZTF4dUlDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCMGVYQmxRMmhsWTJ0bGNpQWhQVDBnSjJaMWJtTjBhVzl1SnlrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2JtVjNJRkJ5YjNCVWVYQmxSWEp5YjNJb0oxQnliM0JsY25SNUlHQW5JQ3NnY0hKdmNFWjFiR3hPWVcxbElDc2dKMkFnYjJZZ1kyOXRjRzl1Wlc1MElHQW5JQ3NnWTI5dGNHOXVaVzUwVG1GdFpTQXJJQ2RnSUdoaGN5QnBiblpoYkdsa0lGQnliM0JVZVhCbElHNXZkR0YwYVc5dUlHbHVjMmxrWlNCdlltcGxZM1JQWmk0bktUdGNiaUFnSUNBZ0lIMWNiaUFnSUNBZ0lIWmhjaUJ3Y205d1ZtRnNkV1VnUFNCd2NtOXdjMXR3Y205d1RtRnRaVjA3WEc0Z0lDQWdJQ0IyWVhJZ2NISnZjRlI1Y0dVZ1BTQm5aWFJRY205d1ZIbHdaU2h3Y205d1ZtRnNkV1VwTzF4dUlDQWdJQ0FnYVdZZ0tIQnliM0JVZVhCbElDRTlQU0FuYjJKcVpXTjBKeWtnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnYm1WM0lGQnliM0JVZVhCbFJYSnliM0lvSjBsdWRtRnNhV1FnSnlBcklHeHZZMkYwYVc5dUlDc2dKeUJnSnlBcklIQnliM0JHZFd4c1RtRnRaU0FySUNkZ0lHOW1JSFI1Y0dVZ0p5QXJJQ2duWUNjZ0t5QndjbTl3Vkhsd1pTQXJJQ2RnSUhOMWNIQnNhV1ZrSUhSdklHQW5JQ3NnWTI5dGNHOXVaVzUwVG1GdFpTQXJJQ2RnTENCbGVIQmxZM1JsWkNCaGJpQnZZbXBsWTNRdUp5a3BPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdabTl5SUNoMllYSWdhMlY1SUdsdUlIQnliM0JXWVd4MVpTa2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb2NISnZjRlpoYkhWbExtaGhjMDkzYmxCeWIzQmxjblI1S0d0bGVTa3BJSHRjYmlBZ0lDQWdJQ0FnSUNCMllYSWdaWEp5YjNJZ1BTQjBlWEJsUTJobFkydGxjaWh3Y205d1ZtRnNkV1VzSUd0bGVTd2dZMjl0Y0c5dVpXNTBUbUZ0WlN3Z2JHOWpZWFJwYjI0c0lIQnliM0JHZFd4c1RtRnRaU0FySUNjdUp5QXJJR3RsZVN3Z1VtVmhZM1JRY205d1ZIbHdaWE5UWldOeVpYUXBPMXh1SUNBZ0lDQWdJQ0FnSUdsbUlDaGxjbkp2Y2lCcGJuTjBZVzVqWlc5bUlFVnljbTl5S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdaWEp5YjNJN1hHNGdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0J5WlhSMWNtNGdiblZzYkR0Y2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlHTnlaV0YwWlVOb1lXbHVZV0pzWlZSNWNHVkRhR1ZqYTJWeUtIWmhiR2xrWVhSbEtUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR055WldGMFpWVnVhVzl1Vkhsd1pVTm9aV05yWlhJb1lYSnlZWGxQWmxSNWNHVkRhR1ZqYTJWeWN5a2dlMXh1SUNBZ0lHbG1JQ2doUVhKeVlYa3VhWE5CY25KaGVTaGhjbkpoZVU5bVZIbHdaVU5vWldOclpYSnpLU2tnZTF4dUlDQWdJQ0FnY0hKdlkyVnpjeTVsYm5ZdVRrOUVSVjlGVGxZZ0lUMDlJQ2R3Y205a2RXTjBhVzl1SnlBL0lIZGhjbTVwYm1jb1ptRnNjMlVzSUNkSmJuWmhiR2xrSUdGeVozVnRaVzUwSUhOMWNIQnNhV1ZrSUhSdklHOXVaVTltVkhsd1pTd2daWGh3WldOMFpXUWdZVzRnYVc1emRHRnVZMlVnYjJZZ1lYSnlZWGt1SnlrZ09pQjJiMmxrSURBN1hHNGdJQ0FnSUNCeVpYUjFjbTRnWlcxd2RIbEdkVzVqZEdsdmJpNTBhR0YwVW1WMGRYSnVjMDUxYkd3N1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCaGNuSmhlVTltVkhsd1pVTm9aV05yWlhKekxteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdJQ0IyWVhJZ1kyaGxZMnRsY2lBOUlHRnljbUY1VDJaVWVYQmxRMmhsWTJ0bGNuTmJhVjA3WEc0Z0lDQWdJQ0JwWmlBb2RIbHdaVzltSUdOb1pXTnJaWElnSVQwOUlDZG1kVzVqZEdsdmJpY3BJSHRjYmlBZ0lDQWdJQ0FnZDJGeWJtbHVaeWhjYmlBZ0lDQWdJQ0FnSUNCbVlXeHpaU3hjYmlBZ0lDQWdJQ0FnSUNBblNXNTJZV3hwWkNCaGNtZDFiV1Z1ZENCemRYQndiR2xrSUhSdklHOXVaVTltVkhsd1pTNGdSWGh3WldOMFpXUWdZVzRnWVhKeVlYa2diMllnWTJobFkyc2dablZ1WTNScGIyNXpMQ0JpZFhRZ0p5QXJYRzRnSUNBZ0lDQWdJQ0FnSjNKbFkyVnBkbVZrSUNWeklHRjBJR2x1WkdWNElDVnpMaWNzWEc0Z0lDQWdJQ0FnSUNBZ1oyVjBVRzl6ZEdacGVFWnZjbFI1Y0dWWFlYSnVhVzVuS0dOb1pXTnJaWElwTEZ4dUlDQWdJQ0FnSUNBZ0lHbGNiaUFnSUNBZ0lDQWdLVHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR1Z0Y0hSNVJuVnVZM1JwYjI0dWRHaGhkRkpsZEhWeWJuTk9kV3hzTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmx4dUlDQWdJR1oxYm1OMGFXOXVJSFpoYkdsa1lYUmxLSEJ5YjNCekxDQndjbTl3VG1GdFpTd2dZMjl0Y0c5dVpXNTBUbUZ0WlN3Z2JHOWpZWFJwYjI0c0lIQnliM0JHZFd4c1RtRnRaU2tnZTF4dUlDQWdJQ0FnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCaGNuSmhlVTltVkhsd1pVTm9aV05yWlhKekxteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdJQ0FnSUhaaGNpQmphR1ZqYTJWeUlEMGdZWEp5WVhsUFpsUjVjR1ZEYUdWamEyVnljMXRwWFR0Y2JpQWdJQ0FnSUNBZ2FXWWdLR05vWldOclpYSW9jSEp2Y0hNc0lIQnliM0JPWVcxbExDQmpiMjF3YjI1bGJuUk9ZVzFsTENCc2IyTmhkR2x2Yml3Z2NISnZjRVoxYkd4T1lXMWxMQ0JTWldGamRGQnliM0JVZVhCbGMxTmxZM0psZENrZ1BUMGdiblZzYkNrZ2UxeHVJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQnVkV3hzTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lISmxkSFZ5YmlCdVpYY2dVSEp2Y0ZSNWNHVkZjbkp2Y2lnblNXNTJZV3hwWkNBbklDc2diRzlqWVhScGIyNGdLeUFuSUdBbklDc2djSEp2Y0VaMWJHeE9ZVzFsSUNzZ0oyQWdjM1Z3Y0d4cFpXUWdkRzhnSnlBcklDZ25ZQ2NnS3lCamIyMXdiMjVsYm5ST1lXMWxJQ3NnSjJBdUp5a3BPMXh1SUNBZ0lIMWNiaUFnSUNCeVpYUjFjbTRnWTNKbFlYUmxRMmhoYVc1aFlteGxWSGx3WlVOb1pXTnJaWElvZG1Gc2FXUmhkR1VwTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1kzSmxZWFJsVG05a1pVTm9aV05yWlhJb0tTQjdYRzRnSUNBZ1puVnVZM1JwYjI0Z2RtRnNhV1JoZEdVb2NISnZjSE1zSUhCeWIzQk9ZVzFsTENCamIyMXdiMjVsYm5ST1lXMWxMQ0JzYjJOaGRHbHZiaXdnY0hKdmNFWjFiR3hPWVcxbEtTQjdYRzRnSUNBZ0lDQnBaaUFvSVdselRtOWtaU2h3Y205d2MxdHdjbTl3VG1GdFpWMHBLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ1WlhjZ1VISnZjRlI1Y0dWRmNuSnZjaWduU1c1MllXeHBaQ0FuSUNzZ2JHOWpZWFJwYjI0Z0t5QW5JR0FuSUNzZ2NISnZjRVoxYkd4T1lXMWxJQ3NnSjJBZ2MzVndjR3hwWldRZ2RHOGdKeUFySUNnbllDY2dLeUJqYjIxd2IyNWxiblJPWVcxbElDc2dKMkFzSUdWNGNHVmpkR1ZrSUdFZ1VtVmhZM1JPYjJSbExpY3BLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJSEpsZEhWeWJpQnVkV3hzTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z1kzSmxZWFJsUTJoaGFXNWhZbXhsVkhsd1pVTm9aV05yWlhJb2RtRnNhV1JoZEdVcE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdZM0psWVhSbFUyaGhjR1ZVZVhCbFEyaGxZMnRsY2loemFHRndaVlI1Y0dWektTQjdYRzRnSUNBZ1puVnVZM1JwYjI0Z2RtRnNhV1JoZEdVb2NISnZjSE1zSUhCeWIzQk9ZVzFsTENCamIyMXdiMjVsYm5ST1lXMWxMQ0JzYjJOaGRHbHZiaXdnY0hKdmNFWjFiR3hPWVcxbEtTQjdYRzRnSUNBZ0lDQjJZWElnY0hKdmNGWmhiSFZsSUQwZ2NISnZjSE5iY0hKdmNFNWhiV1ZkTzF4dUlDQWdJQ0FnZG1GeUlIQnliM0JVZVhCbElEMGdaMlYwVUhKdmNGUjVjR1VvY0hKdmNGWmhiSFZsS1R0Y2JpQWdJQ0FnSUdsbUlDaHdjbTl3Vkhsd1pTQWhQVDBnSjI5aWFtVmpkQ2NwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUc1bGR5QlFjbTl3Vkhsd1pVVnljbTl5S0NkSmJuWmhiR2xrSUNjZ0t5QnNiMk5oZEdsdmJpQXJJQ2NnWUNjZ0t5QndjbTl3Um5Wc2JFNWhiV1VnS3lBbllDQnZaaUIwZVhCbElHQW5JQ3NnY0hKdmNGUjVjR1VnS3lBbllDQW5JQ3NnS0NkemRYQndiR2xsWkNCMGJ5QmdKeUFySUdOdmJYQnZibVZ1ZEU1aGJXVWdLeUFuWUN3Z1pYaHdaV04wWldRZ1lHOWlhbVZqZEdBdUp5a3BPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdabTl5SUNoMllYSWdhMlY1SUdsdUlITm9ZWEJsVkhsd1pYTXBJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlHTm9aV05yWlhJZ1BTQnphR0Z3WlZSNWNHVnpXMnRsZVYwN1hHNGdJQ0FnSUNBZ0lHbG1JQ2doWTJobFkydGxjaWtnZTF4dUlDQWdJQ0FnSUNBZ0lHTnZiblJwYm5WbE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSFpoY2lCbGNuSnZjaUE5SUdOb1pXTnJaWElvY0hKdmNGWmhiSFZsTENCclpYa3NJR052YlhCdmJtVnVkRTVoYldVc0lHeHZZMkYwYVc5dUxDQndjbTl3Um5Wc2JFNWhiV1VnS3lBbkxpY2dLeUJyWlhrc0lGSmxZV04wVUhKdmNGUjVjR1Z6VTJWamNtVjBLVHRjYmlBZ0lDQWdJQ0FnYVdZZ0tHVnljbTl5S1NCN1hHNGdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHVnljbTl5TzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCeVpYUjFjbTRnYm5Wc2JEdGNiaUFnSUNCOVhHNGdJQ0FnY21WMGRYSnVJR055WldGMFpVTm9ZV2x1WVdKc1pWUjVjR1ZEYUdWamEyVnlLSFpoYkdsa1lYUmxLVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUdselRtOWtaU2h3Y205d1ZtRnNkV1VwSUh0Y2JpQWdJQ0J6ZDJsMFkyZ2dLSFI1Y0dWdlppQndjbTl3Vm1Gc2RXVXBJSHRjYmlBZ0lDQWdJR05oYzJVZ0oyNTFiV0psY2ljNlhHNGdJQ0FnSUNCallYTmxJQ2R6ZEhKcGJtY25PbHh1SUNBZ0lDQWdZMkZ6WlNBbmRXNWtaV1pwYm1Wa0p6cGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIUnlkV1U3WEc0Z0lDQWdJQ0JqWVhObElDZGliMjlzWldGdUp6cGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlDRndjbTl3Vm1Gc2RXVTdYRzRnSUNBZ0lDQmpZWE5sSUNkdlltcGxZM1FuT2x4dUlDQWdJQ0FnSUNCcFppQW9RWEp5WVhrdWFYTkJjbkpoZVNod2NtOXdWbUZzZFdVcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSEJ5YjNCV1lXeDFaUzVsZG1WeWVTaHBjMDV2WkdVcE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJR2xtSUNod2NtOXdWbUZzZFdVZ1BUMDlJRzUxYkd3Z2ZId2dhWE5XWVd4cFpFVnNaVzFsYm5Rb2NISnZjRlpoYkhWbEtTa2dlMXh1SUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUIwY25WbE8xeHVJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnZG1GeUlHbDBaWEpoZEc5eVJtNGdQU0JuWlhSSmRHVnlZWFJ2Y2tadUtIQnliM0JXWVd4MVpTazdYRzRnSUNBZ0lDQWdJR2xtSUNocGRHVnlZWFJ2Y2tadUtTQjdYRzRnSUNBZ0lDQWdJQ0FnZG1GeUlHbDBaWEpoZEc5eUlEMGdhWFJsY21GMGIzSkdiaTVqWVd4c0tIQnliM0JXWVd4MVpTazdYRzRnSUNBZ0lDQWdJQ0FnZG1GeUlITjBaWEE3WEc0Z0lDQWdJQ0FnSUNBZ2FXWWdLR2wwWlhKaGRHOXlSbTRnSVQwOUlIQnliM0JXWVd4MVpTNWxiblJ5YVdWektTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCM2FHbHNaU0FvSVNoemRHVndJRDBnYVhSbGNtRjBiM0l1Ym1WNGRDZ3BLUzVrYjI1bEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2doYVhOT2IyUmxLSE4wWlhBdWRtRnNkV1VwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklFbDBaWEpoZEc5eUlIZHBiR3dnY0hKdmRtbGtaU0JsYm5SeWVTQmJheXgyWFNCMGRYQnNaWE1nY21GMGFHVnlJSFJvWVc0Z2RtRnNkV1Z6TGx4dUlDQWdJQ0FnSUNBZ0lDQWdkMmhwYkdVZ0tDRW9jM1JsY0NBOUlHbDBaWEpoZEc5eUxtNWxlSFFvS1NrdVpHOXVaU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1pXNTBjbmtnUFNCemRHVndMblpoYkhWbE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9aVzUwY25rcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaUFvSVdselRtOWtaU2hsYm5SeWVWc3hYU2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCbVlXeHpaVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSeWRXVTdYRzRnSUNBZ0lDQmtaV1poZFd4ME9seHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1ptRnNjMlU3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnYVhOVGVXMWliMndvY0hKdmNGUjVjR1VzSUhCeWIzQldZV3gxWlNrZ2UxeHVJQ0FnSUM4dklFNWhkR2wyWlNCVGVXMWliMnd1WEc0Z0lDQWdhV1lnS0hCeWIzQlVlWEJsSUQwOVBTQW5jM2x0WW05c0p5a2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlIUnlkV1U3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeThnTVRrdU5DNHpMalVnVTNsdFltOXNMbkJ5YjNSdmRIbHdaVnRBUUhSdlUzUnlhVzVuVkdGblhTQTlQVDBnSjFONWJXSnZiQ2RjYmlBZ0lDQnBaaUFvY0hKdmNGWmhiSFZsV3lkQVFIUnZVM1J5YVc1blZHRm5KMTBnUFQwOUlDZFRlVzFpYjJ3bktTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z2RISjFaVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQXZMeUJHWVd4c1ltRmpheUJtYjNJZ2JtOXVMWE53WldNZ1kyOXRjR3hwWVc1MElGTjViV0p2YkhNZ2QyaHBZMmdnWVhKbElIQnZiSGxtYVd4c1pXUXVYRzRnSUNBZ2FXWWdLSFI1Y0dWdlppQlRlVzFpYjJ3Z1BUMDlJQ2RtZFc1amRHbHZiaWNnSmlZZ2NISnZjRlpoYkhWbElHbHVjM1JoYm1ObGIyWWdVM2x0WW05c0tTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z2RISjFaVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnlaWFIxY200Z1ptRnNjMlU3WEc0Z0lIMWNibHh1SUNBdkx5QkZjWFZwZG1Gc1pXNTBJRzltSUdCMGVYQmxiMlpnSUdKMWRDQjNhWFJvSUhOd1pXTnBZV3dnYUdGdVpHeHBibWNnWm05eUlHRnljbUY1SUdGdVpDQnlaV2RsZUhBdVhHNGdJR1oxYm1OMGFXOXVJR2RsZEZCeWIzQlVlWEJsS0hCeWIzQldZV3gxWlNrZ2UxeHVJQ0FnSUhaaGNpQndjbTl3Vkhsd1pTQTlJSFI1Y0dWdlppQndjbTl3Vm1Gc2RXVTdYRzRnSUNBZ2FXWWdLRUZ5Y21GNUxtbHpRWEp5WVhrb2NISnZjRlpoYkhWbEtTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlDZGhjbkpoZVNjN1hHNGdJQ0FnZlZ4dUlDQWdJR2xtSUNod2NtOXdWbUZzZFdVZ2FXNXpkR0Z1WTJWdlppQlNaV2RGZUhBcElIdGNiaUFnSUNBZ0lDOHZJRTlzWkNCM1pXSnJhWFJ6SUNoaGRDQnNaV0Z6ZENCMWJuUnBiQ0JCYm1SeWIybGtJRFF1TUNrZ2NtVjBkWEp1SUNkbWRXNWpkR2x2YmljZ2NtRjBhR1Z5SUhSb1lXNWNiaUFnSUNBZ0lDOHZJQ2R2WW1wbFkzUW5JR1p2Y2lCMGVYQmxiMllnWVNCU1pXZEZlSEF1SUZkbEoyeHNJRzV2Y20xaGJHbDZaU0IwYUdseklHaGxjbVVnYzI4Z2RHaGhkQ0F2WW14aEwxeHVJQ0FnSUNBZ0x5OGdjR0Z6YzJWeklGQnliM0JVZVhCbGN5NXZZbXBsWTNRdVhHNGdJQ0FnSUNCeVpYUjFjbTRnSjI5aWFtVmpkQ2M3WEc0Z0lDQWdmVnh1SUNBZ0lHbG1JQ2hwYzFONWJXSnZiQ2h3Y205d1ZIbHdaU3dnY0hKdmNGWmhiSFZsS1NrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUNkemVXMWliMnduTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z2NISnZjRlI1Y0dVN1hHNGdJSDFjYmx4dUlDQXZMeUJVYUdseklHaGhibVJzWlhNZ2JXOXlaU0IwZVhCbGN5QjBhR0Z1SUdCblpYUlFjbTl3Vkhsd1pXQXVJRTl1YkhrZ2RYTmxaQ0JtYjNJZ1pYSnliM0lnYldWemMyRm5aWE11WEc0Z0lDOHZJRk5sWlNCZ1kzSmxZWFJsVUhKcGJXbDBhWFpsVkhsd1pVTm9aV05yWlhKZ0xseHVJQ0JtZFc1amRHbHZiaUJuWlhSUWNtVmphWE5sVkhsd1pTaHdjbTl3Vm1Gc2RXVXBJSHRjYmlBZ0lDQnBaaUFvZEhsd1pXOW1JSEJ5YjNCV1lXeDFaU0E5UFQwZ0ozVnVaR1ZtYVc1bFpDY2dmSHdnY0hKdmNGWmhiSFZsSUQwOVBTQnVkV3hzS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnSnljZ0t5QndjbTl3Vm1Gc2RXVTdYRzRnSUNBZ2ZWeHVJQ0FnSUhaaGNpQndjbTl3Vkhsd1pTQTlJR2RsZEZCeWIzQlVlWEJsS0hCeWIzQldZV3gxWlNrN1hHNGdJQ0FnYVdZZ0tIQnliM0JVZVhCbElEMDlQU0FuYjJKcVpXTjBKeWtnZTF4dUlDQWdJQ0FnYVdZZ0tIQnliM0JXWVd4MVpTQnBibk4wWVc1alpXOW1JRVJoZEdVcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlDZGtZWFJsSnp0Y2JpQWdJQ0FnSUgwZ1pXeHpaU0JwWmlBb2NISnZjRlpoYkhWbElHbHVjM1JoYm1ObGIyWWdVbVZuUlhod0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQW5jbVZuWlhod0p6dGNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNGdJQ0FnY21WMGRYSnVJSEJ5YjNCVWVYQmxPMXh1SUNCOVhHNWNiaUFnTHk4Z1VtVjBkWEp1Y3lCaElITjBjbWx1WnlCMGFHRjBJR2x6SUhCdmMzUm1hWGhsWkNCMGJ5QmhJSGRoY201cGJtY2dZV0p2ZFhRZ1lXNGdhVzUyWVd4cFpDQjBlWEJsTGx4dUlDQXZMeUJHYjNJZ1pYaGhiWEJzWlN3Z1hDSjFibVJsWm1sdVpXUmNJaUJ2Y2lCY0ltOW1JSFI1Y0dVZ1lYSnlZWGxjSWx4dUlDQm1kVzVqZEdsdmJpQm5aWFJRYjNOMFptbDRSbTl5Vkhsd1pWZGhjbTVwYm1jb2RtRnNkV1VwSUh0Y2JpQWdJQ0IyWVhJZ2RIbHdaU0E5SUdkbGRGQnlaV05wYzJWVWVYQmxLSFpoYkhWbEtUdGNiaUFnSUNCemQybDBZMmdnS0hSNWNHVXBJSHRjYmlBZ0lDQWdJR05oYzJVZ0oyRnljbUY1SnpwY2JpQWdJQ0FnSUdOaGMyVWdKMjlpYW1WamRDYzZYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQW5ZVzRnSnlBcklIUjVjR1U3WEc0Z0lDQWdJQ0JqWVhObElDZGliMjlzWldGdUp6cGNiaUFnSUNBZ0lHTmhjMlVnSjJSaGRHVW5PbHh1SUNBZ0lDQWdZMkZ6WlNBbmNtVm5aWGh3SnpwY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUNkaElDY2dLeUIwZVhCbE8xeHVJQ0FnSUNBZ1pHVm1ZWFZzZERwY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSNWNHVTdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdMeThnVW1WMGRYSnVjeUJqYkdGemN5QnVZVzFsSUc5bUlIUm9aU0J2WW1wbFkzUXNJR2xtSUdGdWVTNWNiaUFnWm5WdVkzUnBiMjRnWjJWMFEyeGhjM05PWVcxbEtIQnliM0JXWVd4MVpTa2dlMXh1SUNBZ0lHbG1JQ2doY0hKdmNGWmhiSFZsTG1OdmJuTjBjblZqZEc5eUlIeDhJQ0Z3Y205d1ZtRnNkV1V1WTI5dWMzUnlkV04wYjNJdWJtRnRaU2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJRUZPVDA1WlRVOVZVenRjYmlBZ0lDQjlYRzRnSUNBZ2NtVjBkWEp1SUhCeWIzQldZV3gxWlM1amIyNXpkSEoxWTNSdmNpNXVZVzFsTzF4dUlDQjlYRzVjYmlBZ1VtVmhZM1JRY205d1ZIbHdaWE11WTJobFkydFFjbTl3Vkhsd1pYTWdQU0JqYUdWamExQnliM0JVZVhCbGN6dGNiaUFnVW1WaFkzUlFjbTl3Vkhsd1pYTXVVSEp2Y0ZSNWNHVnpJRDBnVW1WaFkzUlFjbTl3Vkhsd1pYTTdYRzVjYmlBZ2NtVjBkWEp1SUZKbFlXTjBVSEp2Y0ZSNWNHVnpPMXh1ZlR0Y2JpSmRmUT09IiwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIFN5bWJvbC5mb3IgJiZcbiAgICBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykpIHx8XG4gICAgMHhlYWM3O1xuXG4gIHZhciBpc1ZhbGlkRWxlbWVudCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgb2JqZWN0ICE9PSBudWxsICYmXG4gICAgICBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbiAgfTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKCdfcHJvY2VzcycpKVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OXlaV0ZqZEM5dWIyUmxYMjF2WkhWc1pYTXZjSEp2Y0MxMGVYQmxjeTlwYm1SbGVDNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVpTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpOHFLbHh1SUNvZ1EyOXdlWEpwWjJoMElESXdNVE10Y0hKbGMyVnVkQ3dnUm1GalpXSnZiMnNzSUVsdVl5NWNiaUFxSUVGc2JDQnlhV2RvZEhNZ2NtVnpaWEoyWldRdVhHNGdLbHh1SUNvZ1ZHaHBjeUJ6YjNWeVkyVWdZMjlrWlNCcGN5QnNhV05sYm5ObFpDQjFibVJsY2lCMGFHVWdRbE5FTFhOMGVXeGxJR3hwWTJWdWMyVWdabTkxYm1RZ2FXNGdkR2hsWEc0Z0tpQk1TVU5GVGxORklHWnBiR1VnYVc0Z2RHaGxJSEp2YjNRZ1pHbHlaV04wYjNKNUlHOW1JSFJvYVhNZ2MyOTFjbU5sSUhSeVpXVXVJRUZ1SUdGa1pHbDBhVzl1WVd3Z1ozSmhiblJjYmlBcUlHOW1JSEJoZEdWdWRDQnlhV2RvZEhNZ1kyRnVJR0psSUdadmRXNWtJR2x1SUhSb1pTQlFRVlJGVGxSVElHWnBiR1VnYVc0Z2RHaGxJSE5oYldVZ1pHbHlaV04wYjNKNUxseHVJQ292WEc1Y2JtbG1JQ2h3Y205alpYTnpMbVZ1ZGk1T1QwUkZYMFZPVmlBaFBUMGdKM0J5YjJSMVkzUnBiMjRuS1NCN1hHNGdJSFpoY2lCU1JVRkRWRjlGVEVWTlJVNVVYMVJaVUVVZ1BTQW9kSGx3Wlc5bUlGTjViV0p2YkNBOVBUMGdKMloxYm1OMGFXOXVKeUFtSmx4dUlDQWdJRk41YldKdmJDNW1iM0lnSmlaY2JpQWdJQ0JUZVcxaWIyd3VabTl5S0NkeVpXRmpkQzVsYkdWdFpXNTBKeWtwSUh4OFhHNGdJQ0FnTUhobFlXTTNPMXh1WEc0Z0lIWmhjaUJwYzFaaGJHbGtSV3hsYldWdWRDQTlJR1oxYm1OMGFXOXVLRzlpYW1WamRDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCMGVYQmxiMllnYjJKcVpXTjBJRDA5UFNBbmIySnFaV04wSnlBbUpseHVJQ0FnSUNBZ2IySnFaV04wSUNFOVBTQnVkV3hzSUNZbVhHNGdJQ0FnSUNCdlltcGxZM1F1SkNSMGVYQmxiMllnUFQwOUlGSkZRVU5VWDBWTVJVMUZUbFJmVkZsUVJUdGNiaUFnZlR0Y2JseHVJQ0F2THlCQ2VTQmxlSEJzYVdOcGRHeDVJSFZ6YVc1bklHQndjbTl3TFhSNWNHVnpZQ0I1YjNVZ1lYSmxJRzl3ZEdsdVp5QnBiblJ2SUc1bGR5QmtaWFpsYkc5d2JXVnVkQ0JpWldoaGRtbHZjaTVjYmlBZ0x5OGdhSFIwY0RvdkwyWmlMbTFsTDNCeWIzQXRkSGx3WlhNdGFXNHRjSEp2WkZ4dUlDQjJZWElnZEdoeWIzZFBia1JwY21WamRFRmpZMlZ6Y3lBOUlIUnlkV1U3WEc0Z0lHMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2NtVnhkV2x5WlNnbkxpOW1ZV04wYjNKNVYybDBhRlI1Y0dWRGFHVmphMlZ5Y3ljcEtHbHpWbUZzYVdSRmJHVnRaVzUwTENCMGFISnZkMDl1UkdseVpXTjBRV05qWlhOektUdGNibjBnWld4elpTQjdYRzRnSUM4dklFSjVJR1Y0Y0d4cFkybDBiSGtnZFhOcGJtY2dZSEJ5YjNBdGRIbHdaWE5nSUhsdmRTQmhjbVVnYjNCMGFXNW5JR2x1ZEc4Z2JtVjNJSEJ5YjJSMVkzUnBiMjRnWW1Wb1lYWnBiM0l1WEc0Z0lDOHZJR2gwZEhBNkx5OW1ZaTV0WlM5d2NtOXdMWFI1Y0dWekxXbHVMWEJ5YjJSY2JpQWdiVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQnlaWEYxYVhKbEtDY3VMMlpoWTNSdmNubFhhWFJvVkdoeWIzZHBibWRUYUdsdGN5Y3BLQ2s3WEc1OVhHNGlYWDA9IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xuIiwiXHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcclxuXHJcbnZhciBBY2NvdW50RmllbGRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4oXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgxPkFjY291bnQgSW5mbzo8L2gxPlxyXG4gICAgICAgIDxsYWJlbD5OYW1lPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgdHlwZSA9IFwidGV4dFwiIHJlZiA9IFwibmFtZVwiXHJcbiAgICAgICAgICBkZWZhdWx0VmFsdWUgPSB7dGhpcy5wcm9wcy5maWVsZFZhbHVlcy5uYW1lfS8+XHJcblxyXG4gICAgICAgIDxsYWJlbD5QYXNzd29yZDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IHR5cGUgPSBcInBhc3N3b3JkXCIgcmVmID0gXCJwYXNzd29yZFwiXHJcbiAgICAgICAgICBkZWZhdWx0VmFsdWUgPSB7dGhpcy5wcm9wcy5maWVsZFZhbHVlcy5wYXNzd29yZH0vPlxyXG5cclxuICAgICAgICA8bGFiZWw+RW1haWw8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlID0gXCJlbWFpbFwiIHJlZiA9IFwiZW1haWxcIlxyXG4gICAgICAgICAgZGVmYXVsdFZhbHVlID0ge3RoaXMucHJvcHMuZmllbGRWYWx1ZXMuZW1haWx9Lz5cclxuXHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2sgPSB7dGhpcy5zYXZlQW5kQ29udGludWV9PlNhdmUgJiBDb250aW51ZTwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9LFxyXG5cclxuICBzYXZlQW5kQ29udGludWU6IGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG5cclxuICAgIHZhciBkYXRhID0ge1xyXG4gICAgICBuYW1lIDogdGhpcy5yZWZzLm5hbWUuZ2V0RE9NTm9kZSgpLnZhbHVlLFxyXG4gICAgICBwYXNzd29yZCA6IHRoaXMucmVmcy5wYXNzd29yZC5nZXRET01Ob2RlKCkudmFsdWUsXHJcbiAgICAgIGVtYWlsIDogdGhpcy5yZWZzLmVtYWlsLmdldERPTU5vZGUoKS52YWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJvcHMuc2F2ZVZhbHVlcyhkYXRhKVxyXG4gICAgdGhpcy5wcm9wcy5uZXh0U3RlcCgpXHJcbiAgfVxyXG59KVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBY2NvdW50RmllbGRzXHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcclxuXHJcbnZhciBDb25maXJtYXRpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgyPkNvbmZpcm0gUmVnaXN0cmF0aW9uPC9oMj5cclxuICAgICAgICA8dWw+XHJcbiAgICAgICAgICA8bGk+PGI+TmFtZTo8L2I+IHt0aGlzLnByb3BzLmZpZWxkVmFsdWVzLm5hbWV9PC9saT5cclxuICAgICAgICAgIDxsaT48Yj5FbWFpbDo8L2I+IHt0aGlzLnByb3BzLmZpZWxkVmFsdWVzLmVtYWlsfTwvbGk+XHJcbiAgICAgICAgICA8bGk+PGI+RG9nZ2llOjwvYj4ge3RoaXMucHJvcHMuZmllbGRWYWx1ZXMuZG9nZ2llTmFtZX08L2xpPlxyXG4gICAgICAgICAgPGxpPjxiPlNleDo8L2I+IHt0aGlzLnByb3BzLmZpZWxkVmFsdWVzLmRvZ2dpZVNleH08L2xpPlxyXG4gICAgICAgICAgPGxpPjxiPlJhY2U6PC9iPiB7dGhpcy5wcm9wcy5maWVsZFZhbHVlcy5kb2dnaWVSYWNlfTwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwiZm9ybS1maWVsZHNcIj5cclxuICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJmb3JtLWZvb3RlclwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biAtZGVmYXVsdCBwdWxsLWxlZnRcIiBvbkNsaWNrPXt0aGlzLnByb3BzLnByZXZpb3VzU3RlcH0+QmFjazwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biAtcHJpbWFyeSBwdWxsLXJpZ2h0XCIgb25DbGljaz17dGhpcy5wcm9wcy5zdWJtaXRSZWdpc3RyYXRpb259PlN1Ym1pdCBSZWdpc3RyYXRpb248L2J1dHRvbj5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59KVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb25maXJtYXRpb25cclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxyXG5cclxudmFyIENvbnRhY3RGaWVsZHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybihcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8aDE+Q29udGFjdCBJbmZvOjwvaDE+XHJcbiAgICAgICAgPGxhYmVsPlRlbGVwaG9uZTwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IHR5cGUgPSBcInRleHRcIiByZWYgPSBcInRlbGVwaG9uZVwiXHJcbiAgICAgICAgICBkZWZhdWx0VmFsdWUgPSB7dGhpcy5wcm9wcy5maWVsZFZhbHVlcy50ZWxlcGhvbmV9Lz5cclxuXHJcbiAgICAgICAgPGxhYmVsPkFkZHJlc3M8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlID0gXCJ0ZXh0XCIgcmVmID0gXCJhZGRyZXNzbGluZVwiXHJcbiAgICAgICAgICBkZWZhdWx0VmFsdWUgPSB7dGhpcy5wcm9wcy5maWVsZFZhbHVlcy5hZGRyZXNzLmFkZHJlc3NsaW5lfS8+XHJcblxyXG4gICAgICAgIDxsYWJlbD5DaXR5PC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgdHlwZSA9IFwidGV4dFwiIHJlZiA9IFwiY2l0eVwiXHJcbiAgICAgICAgICBkZWZhdWx0VmFsdWUgPSB7dGhpcy5wcm9wcy5maWVsZFZhbHVlcy5hZGRyZXNzLmNpdHl9Lz5cclxuXHJcbiAgICAgICAgPGxhYmVsPlN0YXRlPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgdHlwZSA9IFwidGV4dFwiIHJlZiA9IFwic3RhdGVcIlxyXG4gICAgICAgICAgZGVmYXVsdFZhbHVlID0ge3RoaXMucHJvcHMuZmllbGRWYWx1ZXMuYWRkcmVzcy5zdGF0ZX0vPlxyXG5cclxuICAgICAgICA8bGFiZWw+Q291bnRyeTwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IHR5cGUgPSBcInRleHRcIiByZWYgPSBcImNvdW50cnlcIlxyXG4gICAgICAgICAgZGVmYXVsdFZhbHVlID0ge3RoaXMucHJvcHMuZmllbGRWYWx1ZXMuYWRkcmVzcy5jb3VudHJ5fS8+XHJcblxyXG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJmb3JtLWZpZWxkc1wiPlxyXG4gICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImZvcm0tZm9vdGVyXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIC1kZWZhdWx0IHB1bGwtbGVmdFwiIG9uQ2xpY2s9e3RoaXMucHJvcHMucHJldmlvdXNTdGVwfT5CYWNrPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIC1wcmltYXJ5IHB1bGwtcmlnaHRcIiBvbkNsaWNrPXt0aGlzLnNhdmVBbmRDb250aW51ZX0+U2F2ZSAmIENvbnRpbnVlPC9idXR0b24+XHJcbiAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIDwvdWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH0sXHJcblxyXG4gIHNhdmVBbmRDb250aW51ZTogZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgIHRlbGVwaG9uZSA6IHRoaXMucmVmcy50ZWxlcGhvbmUuZ2V0RE9NTm9kZSgpLnZhbHVlLFxyXG4gICAgICBhZGRyZXNzIDoge1xyXG4gICAgICAgIGFkZHJlc3NsaW5lIDogdGhpcy5yZWZzLmFkZHJlc3NsaW5lLmdldERPTU5vZGUoKS52YWx1ZSxcclxuICAgICAgICBjaXR5IDogdGhpcy5yZWZzLmNpdHkuZ2V0RE9NTm9kZSgpLnZhbHVlLFxyXG4gICAgICAgIHN0YXRlIDogdGhpcy5yZWZzLnN0YXRlLmdldERPTU5vZGUoKS52YWx1ZSxcclxuICAgICAgICBjb3VudHJ5IDogdGhpcy5yZWZzLmNvdW50cnkuZ2V0RE9NTm9kZSgpLnZhbHVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnByb3BzLnNhdmVWYWx1ZXMoZGF0YSlcclxuICAgIHRoaXMucHJvcHMubmV4dFN0ZXAoKVxyXG4gIH1cclxufSlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29udGFjdEZpZWxkc1xyXG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXHJcblxyXG52YXIgRG9nZ2llRmllbGRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4oXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgxPkRvZ2dpZSBJbmZvOjwvaDE+XHJcbiAgICAgICAgPGxhYmVsPk5hbWU8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlID0gXCJ0ZXh0XCIgcmVmID0gXCJuYW1lXCJcclxuICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IHt0aGlzLnByb3BzLmZpZWxkVmFsdWVzLmRvZ2dpZU5hbWV9Lz5cclxuXHJcbiAgICAgICAgPGxhYmVsPlJhY2U8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlID0gXCJ0ZXh0XCIgcmVmID0gXCJyYWNlXCJcclxuICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IHt0aGlzLnByb3BzLmZpZWxkVmFsdWVzLmRvZ2dpZVJhY2V9Lz5cclxuXHJcbiAgICAgICAgPGxhYmVsPlNleDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IHR5cGUgPSBcInRleHRcIiByZWYgPSBcInNleFwiXHJcbiAgICAgICAgICBkZWZhdWx0VmFsdWUgPSB7dGhpcy5wcm9wcy5maWVsZFZhbHVlcy5kb2dnaWVTZXh9Lz5cclxuXHJcbiAgICAgICAgPGxhYmVsPkFnZTwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IHR5cGUgPSBcInRleHRcIiByZWYgPSBcImFnZVwiXHJcbiAgICAgICAgICBkZWZhdWx0VmFsdWUgPSB7dGhpcy5wcm9wcy5maWVsZFZhbHVlcy5kb2dnaWVBZ2V9Lz5cclxuXHJcbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cImZvcm0tZmllbGRzXCI+XHJcbiAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZm9ybS1mb290ZXJcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gLWRlZmF1bHQgcHVsbC1sZWZ0XCIgb25DbGljaz17dGhpcy5wcm9wcy5wcmV2aW91c1N0ZXB9PkJhY2s8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9e3RoaXMuc2F2ZUFuZENvbnRpbnVlfT5TYXZlICYgQ29udGludWU8L2J1dHRvbj5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfSxcclxuXHJcbiAgc2F2ZUFuZENvbnRpbnVlOiBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgZG9nZ2llTmFtZSA6IHRoaXMucmVmcy5uYW1lLmdldERPTU5vZGUoKS52YWx1ZSxcclxuICAgICAgZG9nZ2llUmFjZSA6IHRoaXMucmVmcy5yYWNlLmdldERPTU5vZGUoKS52YWx1ZSxcclxuICAgICAgZG9nZ2llQWdlIDogdGhpcy5yZWZzLmFnZS5nZXRET01Ob2RlKCkudmFsdWUsXHJcbiAgICAgIGRvZ2dpZVNleCA6IHRoaXMucmVmcy5zZXguZ2V0RE9NTm9kZSgpLnZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wcm9wcy5zYXZlVmFsdWVzKGRhdGEpXHJcbiAgICB0aGlzLnByb3BzLm5leHRTdGVwKClcclxuICB9XHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERvZ2dpZUZpZWxkc1xyXG4iLCJcclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxyXG52YXIgQWNjb3VudEZpZWxkcyA9IHJlcXVpcmUoJy4vQWNjb3VudEZpZWxkcycpXHJcbnZhciBDb250YWN0RmllbGRzID0gcmVxdWlyZSgnLi9Db250YWN0RmllbGRzJylcclxudmFyIERvZ2dpZUZpZWxkcyA9IHJlcXVpcmUoJy4vRG9nZ2llRmllbGRzJylcclxudmFyIENvbmZpcm1hdGlvbiA9IHJlcXVpcmUoJy4vQ29uZmlybWF0aW9uJylcclxudmFyIFN1Y2Nlc3MgPSByZXF1aXJlKCcuL1N1Y2Nlc3MnKVxyXG5cclxudmFyIGZpZWxkVmFsdWVzID0ge1xyXG4gIC8vQWNjb3VudCBGaWVsZHNcclxuICBuYW1lIDogbnVsbCxcclxuICBlbWFpbCA6IG51bGwsXHJcbiAgcGFzc3dvcmQgOiBudWxsLFxyXG4gIC8vQ29udGFjdCBGaWVsZHNcclxuICB0ZWxlcGhvbmUgOiBudWxsLFxyXG4gIGFkZHJlc3MgOiB7XHJcbiAgICBhZGRyZXNzbGluZSA6IG51bGwsXHJcbiAgICBjaXR5IDogbnVsbCxcclxuICAgIHN0YXRlIDogbnVsbCxcclxuICAgIGNvdW50cnkgOiBudWxsXHJcbiAgfSxcclxuICAvL0RvZ2dpZSBGaWVsZHNcclxuICBkb2dnaWVOYW1lIDogbnVsbCxcclxuICBkb2dnaWVSYWNlIDogbnVsbCxcclxuICBkb2dnaWVTZXggOiBudWxsLFxyXG4gIGRvZ2dpZUFnZSA6IG51bGwsXHJcbiAgZG9nZ2llUGljIDogbnVsbFxyXG59XHJcblxyXG52YXIgUmVnaXN0cmF0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdGVwOiAxXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzdHlsZSA9ICB7XHJcbiAgICAgIHdpZHRoIDogKHRoaXMuc3RhdGUuc3RlcCAvIDQgKiAxMDApICsgJyUnXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPG1haW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHJvZ3Jlc3Mtc3RlcFwiPlN0ZXAge3RoaXMuc3RhdGUuc3RlcH08L3NwYW4+XHJcbiAgICAgICAgPHByb2dyZXNzIGNsYXNzTmFtZT1cInByb2dyZXNzXCIgc3R5bGU9e3N0eWxlfT48L3Byb2dyZXNzPlxyXG4gICAgICAgIHt0aGlzLnNob3dTdGVwKCl9XHJcbiAgICAgIDwvbWFpbj5cclxuICAgIClcclxuICB9LFxyXG5cclxuICBzaG93U3RlcDogZnVuY3Rpb24oKSB7XHJcbiAgICBzd2l0Y2godGhpcy5zdGF0ZS5zdGVwKSB7XHJcbiAgICAgIGNhc2UgMTpcclxuICAgICAgICByZXR1cm4gPEFjY291bnRGaWVsZHMgZmllbGRWYWx1ZXM9e2ZpZWxkVmFsdWVzfVxyXG4gICAgICAgICAgbmV4dFN0ZXA9e3RoaXMubmV4dFN0ZXB9IHNhdmVWYWx1ZXM9e3RoaXMuc2F2ZVZhbHVlc30vPlxyXG4gICAgICBjYXNlIDI6XHJcbiAgICAgICAgcmV0dXJuIDxDb250YWN0RmllbGRzIGZpZWxkVmFsdWVzPXtmaWVsZFZhbHVlc31cclxuICAgICAgICAgIG5leHRTdGVwPXt0aGlzLm5leHRTdGVwfSBwcmV2aW91c1N0ZXA9e3RoaXMucHJldmlvdXNTdGVwfVxyXG4gICAgICAgICAgc2F2ZVZhbHVlcz17dGhpcy5zYXZlVmFsdWVzfS8+XHJcbiAgICAgIGNhc2UgMzpcclxuICAgICAgICByZXR1cm4gPERvZ2dpZUZpZWxkcyBmaWVsZFZhbHVlcz17ZmllbGRWYWx1ZXN9XHJcbiAgICAgICAgICBuZXh0U3RlcD17dGhpcy5uZXh0U3RlcH0gcHJldmlvdXNTdGVwPXt0aGlzLnByZXZpb3VzU3RlcH1cclxuICAgICAgICAgIHNhdmVWYWx1ZXM9e3RoaXMuc2F2ZVZhbHVlc30vPlxyXG4gICAgICBjYXNlIDQ6XHJcbiAgICAgICAgcmV0dXJuIDxDb25maXJtYXRpb24gZmllbGRWYWx1ZXM9e2ZpZWxkVmFsdWVzfVxyXG4gICAgICAgICAgcHJldmlvdXNTdGVwPXt0aGlzLnByZXZpb3VzU3RlcH0gc3VibWl0UmVnaXN0cmF0aW9uPXt0aGlzLnN1Ym1pdFJlZ2lzdHJhdGlvbn0vPlxyXG4gICAgICBjYXNlIDU6XHJcbiAgICAgICAgcmV0dXJuIDxTdWNjZXNzIGZpZWxkVmFsdWVzPXtmaWVsZFZhbHVlc30vPlxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNhdmVWYWx1ZXM6IGZ1bmN0aW9uKGZpZWxkcykge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICBmaWVsZFZhbHVlcyA9IE9iamVjdC5hc3NpZ24oe30sIGZpZWxkVmFsdWVzLCBmaWVsZHMpXHJcbiAgICB9KClcclxuICB9LFxyXG5cclxuICBuZXh0U3RlcDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgc3RlcCA6IHRoaXMuc3RhdGUuc3RlcCArIDFcclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgcHJldmlvdXNTdGVwOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBzdGVwIDogdGhpcy5zdGF0ZS5zdGVwIC0gMVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBzdWJtaXRSZWdpc3RyYXRpb246IGZ1bmN0aW9uKCkge1xyXG4gICAgLy9UT0RPXHJcbiAgICB0aGlzLm5leHRTdGVwKClcclxuICB9XHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlZ2lzdHJhdGlvblxyXG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXHJcblxyXG52YXIgU3VjY2VzcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8aDI+U3VjY2Vzc2Z1bGx5IFJlZ2lzdGVyZWQhPC9oMj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59KVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTdWNjZXNzXHJcbiJdfQ==
