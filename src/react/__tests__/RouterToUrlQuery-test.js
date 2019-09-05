import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { __RouterContext as ReactRouterContext } from 'react-router';
import RouterToUrlQuery from '../RouterToUrlQuery';
import urlQueryConfig from '../../urlQueryConfig';

/* eslint-disable react/no-multi-comp */

describe('<RouterToUrlQuery />', () => {
  it('reads router in from context and can push and replace', () => {
    const wrapper = mount(
      <ReactRouterContext.Provider value={{
        replace: jest.fn().mockImplementation(location => location),
        push: jest.fn().mockImplementation(location => location),
      }}>
        <RouterToUrlQuery>
          <div className="test" />
        </RouterToUrlQuery>
      </ReactRouterContext.Provider>
    );

    expect(wrapper.contains(<div className="test" />)).toBe(true);

    expect(urlQueryConfig.history).toBeDefined();
    expect(urlQueryConfig.history.push).toBeDefined();
    expect(urlQueryConfig.history.replace).toBeDefined();

    urlQueryConfig.history.push();
    expect(urlQueryConfig.history.push).toBeCalled();

    urlQueryConfig.history.replace();
    expect(urlQueryConfig.history.replace).toBeCalled();
  });

  it('reads router in from context and can push and replace when router has transitionTo and replaceWith', () => {
    const wrapper = mount(
      <ReactRouterContext.Provider value={{
        replaceWith: jest.fn().mockImplementation(location => location),
        transitionTo: jest.fn().mockImplementation(location => location),
      }}>
        <RouterToUrlQuery>
          <div className="test" />
        </RouterToUrlQuery>
      </ReactRouterContext.Provider>
    );

    expect(wrapper.contains(<div className="test" />)).toBe(true);

    expect(urlQueryConfig.history).toBeDefined();
    expect(urlQueryConfig.history.push).toBeDefined();
    expect(urlQueryConfig.history.replace).toBeDefined();

    urlQueryConfig.history.push();
    expect(urlQueryConfig.history.push).toBeCalled();

    urlQueryConfig.history.replace();
    expect(urlQueryConfig.history.replace).toBeCalled();
  });
});
