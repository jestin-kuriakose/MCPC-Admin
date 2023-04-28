import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from './App'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <App />
      <ReactQueryDevtools/>
    </QueryClientProvider>
  </React.StrictMode>,
)
