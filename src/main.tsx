import CssBaseline from '@mui/material/CssBaseline'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from '~/store/store'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme.ts'
import { ConfirmProvider } from 'material-ui-confirm'

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <CssVarsProvider theme={theme}>
        <ConfirmProvider
          defaultOptions={{
            allowClose: false,
            dialogProps: { maxWidth: 'xs' },
            buttonOrder: ['confirm', 'cancel'],
            cancellationButtonProps: { color: 'inherit' },
            confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
          }}
        >
          <CssBaseline />
          <App />
        </ConfirmProvider>
      </CssVarsProvider>
    </PersistGate>
  </Provider>,
)
