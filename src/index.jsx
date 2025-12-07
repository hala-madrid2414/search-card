import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root } from '@lynx-js/react';
import { Provider } from 'react-redux';
import { App } from './App.jsx';
import store from './store';

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
