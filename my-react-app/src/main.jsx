import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {MyComponent} from './App.jsx';
import UserForm from './main.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyComponent />
    <UserForm />
  </StrictMode>,
)

if (module.hot) {
  module.hot.accept();
}
