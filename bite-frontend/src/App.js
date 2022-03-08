import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalProvider } from './Context/GlobalState';
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Pages/landing';
import ResultsPage from './Pages/results';
import FilterPage from './Pages/filter';
import PrimaryResultPage from './Pages/primary_result';
import DashboardPage from './Pages/dashboard';
import AboutPage from './Pages/about';
import PrivacyPolicy from './Pages/privacy_policy';


function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/filter" element={<FilterPage />} />
            <Route path="/primary_result" element={<PrimaryResultPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={
              <div>
                <h1>404</h1>
                <h3>( Page not found )</h3>
                <div style={{height: '70vh'}} />
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </div>
  );
}

export default App;