import '@lynx-js/preact-devtools'
import '@lynx-js/react/debug'
import { root } from '@lynx-js/react'
import { Provider } from 'react-redux'
import store from './store'

import { App } from './App.jsx'

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
