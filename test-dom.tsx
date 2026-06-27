import { JSDOM } from 'jsdom';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App.tsx';

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>');
global.window = dom.window as any;
global.document = dom.window.document;
Object.defineProperty(global, 'navigator', {
  value: dom.window.navigator,
  writable: true
});

try {
  const root = createRoot(document.getElementById('root')!);
  root.render(React.createElement(App));
  console.log('success');
} catch (e) {
  console.error('ERROR:', e);
}
