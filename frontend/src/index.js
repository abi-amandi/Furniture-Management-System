import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { RoleProvider } from './components/RoleContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoleProvider>
      <Provider store={store}>
        <App />
      </Provider>  
    </RoleProvider>   
  </React.StrictMode>
);


reportWebVitals();
