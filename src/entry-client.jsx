import React from 'react'
import ReactDOM from 'react-dom/client' 
// import app from './app'
import createApp from './app'

const app = createApp();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     {app}
  </React.StrictMode>,
)