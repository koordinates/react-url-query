'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _enzyme = require('enzyme');

var _reactRouter = require('react-router');

var _RouterToUrlQuery = require('../RouterToUrlQuery');

var _RouterToUrlQuery2 = _interopRequireDefault(_RouterToUrlQuery);

var _urlQueryConfig = require('../../urlQueryConfig');

var _urlQueryConfig2 = _interopRequireDefault(_urlQueryConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/no-multi-comp */

describe('<RouterToUrlQuery />', function () {
  it('reads router in from context and can push and replace', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _reactRouter.__RouterContext.Provider,
      { value: {
          replace: jest.fn().mockImplementation(function (location) {
            return location;
          }),
          push: jest.fn().mockImplementation(function (location) {
            return location;
          })
        } },
      _react2.default.createElement(
        _RouterToUrlQuery2.default,
        null,
        _react2.default.createElement('div', { className: 'test' })
      )
    ));

    expect(wrapper.contains(_react2.default.createElement('div', { className: 'test' }))).toBe(true);

    expect(_urlQueryConfig2.default.history).toBeDefined();
    expect(_urlQueryConfig2.default.history.push).toBeDefined();
    expect(_urlQueryConfig2.default.history.replace).toBeDefined();

    _urlQueryConfig2.default.history.push();
    expect(_urlQueryConfig2.default.history.push).toBeCalled();

    _urlQueryConfig2.default.history.replace();
    expect(_urlQueryConfig2.default.history.replace).toBeCalled();
  });

  it('reads router in from context and can push and replace when router has transitionTo and replaceWith', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _reactRouter.__RouterContext.Provider,
      { value: {
          replaceWith: jest.fn().mockImplementation(function (location) {
            return location;
          }),
          transitionTo: jest.fn().mockImplementation(function (location) {
            return location;
          })
        } },
      _react2.default.createElement(
        _RouterToUrlQuery2.default,
        null,
        _react2.default.createElement('div', { className: 'test' })
      )
    ));

    expect(wrapper.contains(_react2.default.createElement('div', { className: 'test' }))).toBe(true);

    expect(_urlQueryConfig2.default.history).toBeDefined();
    expect(_urlQueryConfig2.default.history.push).toBeDefined();
    expect(_urlQueryConfig2.default.history.replace).toBeDefined();

    _urlQueryConfig2.default.history.push();
    expect(_urlQueryConfig2.default.history.push).toBeCalled();

    _urlQueryConfig2.default.history.replace();
    expect(_urlQueryConfig2.default.history.replace).toBeCalled();
  });
});