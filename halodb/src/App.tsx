import React, { useContext, Suspense, lazy, useEffect } from 'react'
import {
  Route,
  Routes as Switch,
  useLocation,
  useNavigate,
  BrowserRouter as Router
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Home from './pages/Home';
import "./index.css";


const queryClient = new QueryClient()

const Routes = () => {

  return (
    <div className="app-body-content">
      
      <Suspense fallback={<div></div>}>
        <Switch>
          <Route path="/" element={<Home />}/>
          
        </Switch>

      </Suspense>
    </div>
  )

}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
          <div className='app-all-content-grid'>
          <Routes />
          </div>
    </Router>
      </QueryClientProvider>
  );
}