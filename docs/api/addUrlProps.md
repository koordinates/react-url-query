### `addUrlProps([options])(WrappedComponent)`

Higher order component that injects URL query parameters as props in the wrapped component. To configure how to decode values from the URL into props for the component, specify a `urlPropsQueryConfig` or, alternatively, provide `mapUrlToProps`. The following options are available to configure `addUrlProps`:

* `urlPropsQueryConfig` (*Object*): The `urlPropsQueryConfig` object, [see below for details](#urlPropsQueryConfig). Most commonly this is the only option configured.

* `addUrlChangeHandlers` (*Boolean*): If true and a `urlPropsQueryConfig` object is provided, change handler functions will be generated for each configured query parameter. It will also add a special handler `onChangeUrlQueryParams()` for updating multiple parameters at once (pass an object mapping prop names to their new (unencoded) values; besides this handler will also be updated based on [changeHandlerName](https://github.com/pbeshai/react-url-query/blob/master/src/urlQueryConfig.js)). If not provided, it uses whatever was configured in [`configureUrlQuery`](configureUrlQuery.md).

* `changeHandlerName` (*Function*): Specifies how change handler names are generated when `addUrlChangeHandlers` is set to `true`. By default, maps `propName` to `onChangePropName`. If not provided, it uses whatever was configured in [`configureUrlQuery`](configureUrlQuery.md).

* `addRouterParams` (*Boolean*): If true, lifts values from `props.params` provided by React Router to direct `props`. Defaults to `true`. If not provided, it uses whatever was configured in [`configureUrlQuery`](configureUrlQuery.md).

* `mapUrlToProps` (*Function*): A function that takes `(url, props)` and returns an object consisting of whichever parameters from `url` should be added as props. If used in tandem with `urlPropsQueryConfig`, the values inside `url` will already be decoded.

* `mapUrlChangeHandlersToProps` (*Function*): A function that takes `(props, generatedHandlers)` and returns an object consisting of whichever handlers should be added as props. If used in tandem with `urlPropsQueryConfig` then the second argument, `generatedHandlers` consists of those generated by the config. If the config is not being used, then `generatedHandlers` is not provided.



#### <a id='urlPropsQueryConfig'></a>`urlPropsQueryConfig`

The most common method of configuring how to decode parameters from the URL is to provide a config object called `urlPropsQueryConfig`. The config is a plain object that maps from prop names to objects that describe query parameters. The typical format is as follows:

```js
const urlPropsQueryConfig = {
  propName1: { type, updateType, queryParam },
  propName2: { type, updateType, queryParam },
  ...
};
```

Query parameters can be specified by passing by the following properties:

* `type` (*String|Object*): The type of the data, typically a string from [UrlQueryParamTypes](UrlQueryParamTypes.md). If you would like to use your own custom type, pass in an object with shape `{ encode, decode }`, where `encode` and `decode` are functions that can encode/decode the data to/from the URL. See [Serialize](Serialize.md) for details. The type will be used to decode the parameter from the URL and provide it as a prop, and to generate a change handler that will encode the value as a string before updating the URL.

* [`updateType`] (*String*): How the URL should be updated when using the generated handlers. Must be a value from [UrlUpdateTypes](UrlUpdateTypes.md) (e.g., replaceIn, push, etc). If not provided, it defaults to replaceIn.

* [`queryParam`] (*String*): Specifies the name of the property in the URL query string if it is different from the name of the property. For example, if the URL read `/page?start=2015-01-02`, the config might read: `{ startDate: { type: UrlQueryParamTypes.date, queryParam: 'start' } }`, in which case the decoded value would be read through the component prop `startDate`.

By default, each key, *myProp*, in the `urlPropsQueryConfig` will add the following props to the wrapped component:

* `myProp`: The decoded property from the URL query param `myProp` (or however specified by `queryParam`).
* `onChangeMyProp`: The change handler for updating the URL with the new value for `myProp`.

See the examples [below](#examples) and [those in the repo](../Examples.md) to get a better idea of how it all works.

#### Arguments

1. [`options`] (*Object*): The options object as described above.
2. `WrappedComponent` (*React Component*): The component to inject the URL query parameters into as props.

#### Returns

A React component class

#### Remarks

* Needs to be called twice `addUrlProps(options)(MyComponent)`.

#### <a id="examples"></a>Examples

##### Usage with `urlPropsQueryConfig`

```js
import React, { Component, PropTypes } from 'react';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';

/**
 * Specify how the URL gets decoded here. This is an object that takes the prop
 * name as a key, and a query param specifier as the value. The query param
 * specifier can have a `type`, indicating how to decode the value from the
 * URL, and a `queryParam` field that indicates which key in the query
 * parameters should be read (this defaults to the prop name if not provided).
 *
 * Here we specify two props,  `bar` and `foo` that correspond to query parameters
 * `bar` and `fooInUrl` respectively. React URL Query will interpret URLs like
 * /app?bar=react&fooInUrl=137 and pass the props `{ bar: "react", foo: 137 }`
 * to the MainPage component.
 */
const urlPropsQueryConfig = {
  bar: { type: UrlQueryParamTypes.string },
  foo: { type: UrlQueryParamTypes.number, queryParam: 'fooInUrl' },
};

class MainPage extends Component {
  static propTypes = {
    // URL props are automatically decoded and passed in based on the config
    bar: PropTypes.string,
    foo: PropTypes.number,

    // change handlers are automatically generated when given a config.
    // By default they update that single query parameter and maintain existing
    // values in the other parameters.
    onChangeFoo: PropTypes.func,
    onChangeBar: PropTypes.func,
  }

  static defaultProps = {
    foo: 123,
    bar: 'bar',
  }

  render() {
    const { foo, bar, onChangeFoo, onChangeBar } = this.props;

    return (
      <div>
        <div>
          foo={foo}
          <button onClick={() => onChangeFoo(999)}>Set foo to 999</button>
        </div>
        <div>
          bar={bar}
          <button onClick={() => onChangeBar('testing')}>
            Set bar to "testing"
          </button>
        </div>
      </div>
    );
  }
}

/**
 * Use the addUrlProps higher-order component to hook-in react-url-query.
 */
export default addUrlProps({ urlPropsQueryConfig })(MainPage);
```


##### Alternative usage with `mapUrlToProps`

```js
import React, { Component, PropTypes } from 'react';
import { decode, encode, addUrlProps, UrlQueryParamTypes, replaceInUrlQuery } from 'react-url-query';

/**
 * Map from url query params to props. The values in `url` will still be encoded
 * as strings since we did not pass a `urlPropsQueryConfig` to addUrlProps.
 */
function mapUrlToProps(url, props) {
  return {
    foo: decode(UrlQueryParamTypes.number, url.fooInUrl),
    bar: url.bar,
  };
}

/**
 * Manually specify how to deal with changes to URL query param props.
 * We do this since we are not using a urlPropsQueryConfig.
 */
function mapUrlChangeHandlersToProps(props) {
  return {
    onChangeFoo: (value) => replaceInUrlQuery('fooInUrl', encode(UrlQueryParamTypes.number, value)),
    onChangeBar: (value) => replaceInUrlQuery('bar', value),
  }
}

class MainPage extends Component {
  static propTypes = {
    // URL props are decoded by `mapUrlToProps`
    bar: PropTypes.string,
    foo: PropTypes.number,

    // change handlers are provided by `mapUrlChangeHandlersToProps`
    // Since we explicitly use `replaceInUrlQuery`, these update a single query
    // parameter and maintain existing values in the other parameters.
    onChangeFoo: PropTypes.func,
    onChangeBar: PropTypes.func,
  }

  static defaultProps = {
    foo: 123,
    bar: 'bar',
  }

  render() {
    const { foo, bar, onChangeFoo, onChangeBar } = this.props;

    return (
      <div>
        <div>
          foo={foo}
          <button onClick={() => onChangeFoo(999)}>Set foo to 999</button>
        </div>
        <div>
          bar={bar}
          <button onClick={() => onChangeBar('testing')}>
            Set bar to "testing"
          </button>
        </div>
      </div>
    );
  }
}

/**
 * Use the addUrlProps higher-order component to hook-in react-url-query.
 */
export default addUrlProps({ mapUrlToProps, mapUrlChangeHandlersToProps })(MainPage);
```
