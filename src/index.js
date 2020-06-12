import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import message from 'antd/es/message';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from './App';
import * as serviceWorker from './serviceWorker';

import ErrorBoundary from './components/ErrorBoundary';

import configureStore from './configs/store.config';

import { GREEN } from './constants/colors';

import './configs/axios.config';
import 'antd/dist/antd.css';
import './scss/style-guide.scss';
import 'jexcel/dist/jexcel.css';
import 'typeface-roboto';

const production = process.env.NODE_ENV === 'production';

if (production) {
  console.log = () => {};
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: GREEN,
    },
    type: 'dark',
  },
});

message.config({ duration: 5 });

ReactDOM.render(
  <Provider store={configureStore()}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
