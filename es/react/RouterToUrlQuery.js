'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _configureUrlQuery = require('../configureUrlQuery');

var _configureUrlQuery2 = _interopRequireDefault(_configureUrlQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class exists to read in the router from context (useful in react-router v4)
 * to get an equivalent history object so we can push and replace the URL.
 */
var RouterToUrlQuery = function (_Component) {
  _inherits(RouterToUrlQuery, _Component);

  function RouterToUrlQuery() {
    _classCallCheck(this, RouterToUrlQuery);

    return _possibleConstructorReturn(this, (RouterToUrlQuery.__proto__ || Object.getPrototypeOf(RouterToUrlQuery)).apply(this, arguments));
  }

  _createClass(RouterToUrlQuery, [{
    key: 'render',
    value: function render() {
      var children = this.props.children;


      return _react2.default.createElement(
        _reactRouter.__RouterContext.Consumer,
        null,
        function (router) {
          return _react2.default.createElement(RouterToUrlQueryInternal, { children: children, router: router });
        }
      );
    }
  }]);

  return RouterToUrlQuery;
}(_react.Component);

RouterToUrlQuery.propTypes = {
  children: _propTypes2.default.node
};
exports.default = RouterToUrlQuery;

var RouterToUrlQueryInternal = function (_Component2) {
  _inherits(RouterToUrlQueryInternal, _Component2);

  function RouterToUrlQueryInternal() {
    _classCallCheck(this, RouterToUrlQueryInternal);

    return _possibleConstructorReturn(this, (RouterToUrlQueryInternal.__proto__ || Object.getPrototypeOf(RouterToUrlQueryInternal)).apply(this, arguments));
  }

  _createClass(RouterToUrlQueryInternal, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var router = this.props.router;


      if (process.env.NODE_ENV === 'development' && !router) {
        // eslint-disable-next-line
        console.warn('RouterToUrlQuery: `router` object not found in context. Not configuring history for react-url-query.');
        return;
      }

      var history = void 0;
      if (router.history && router.history.push && router.history.replace) {
        history = router.history;
      } else if (router.push && router.replace) {
        history = router;
      } else if (router.transitionTo && router.replaceWith) {
        history = {
          push: router.transitionTo,
          replace: router.replaceWith
        };
      }

      (0, _configureUrlQuery2.default)({
        history: history
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;


      return _react2.default.Children.only(children);
    }
  }]);

  return RouterToUrlQueryInternal;
}(_react.Component);

RouterToUrlQueryInternal.propTypes = {
  children: _propTypes2.default.node,
  router: _propTypes2.default.object
};