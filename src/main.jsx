import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Survey from './Survey.jsx'
import './index.css'

const path = window.location.pathname
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    {path === '/survey' ? <Survey /> : <App />}
  </React.StrictMode>,
)
