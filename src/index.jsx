import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store'
import { Provider } from 'react-redux'
import { AuthProvider } from './AuthContext';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <SnackbarProvider maxSnack={2} autoHideDuration={1500}>
          <App />
        </SnackbarProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
