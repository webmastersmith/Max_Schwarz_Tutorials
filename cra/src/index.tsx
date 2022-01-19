import React from 'react'
import ReactDOM from 'react-dom'
import 'global.scss'
import App from 'App'
import { FavoriteContextProvider } from 'store'

ReactDOM.render(
  <React.StrictMode>
    <FavoriteContextProvider>
      <App />
    </FavoriteContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
