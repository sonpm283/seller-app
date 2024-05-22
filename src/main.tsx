import CssBaseline from '@mui/material/CssBaseline'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from '~/store/store'
import React from 'react'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <App />
      </CssVarsProvider>
    </React.StrictMode>
  </Provider>,
)
