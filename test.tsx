import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App.tsx';

try {
  renderToString(React.createElement(App));
  console.log('success');
} catch (e) {
  console.error('ERROR:', e);
}
