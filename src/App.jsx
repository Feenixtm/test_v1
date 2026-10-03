import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DevHeader from './components/DevHeader';
import Login from './components/forms/Login';
import SignUp from './components/forms/SignUp';
import Home from './components/Home';
import Journal from './features/journal/components/Journal';
import Habits from './features/habits/components/Habits';
import Tasks from './features/tasks/components/Tasks';

import YearlyHeatmap from './features/heatmaps/components/YearlyHeatmap';
import MonthlyHeatmap from './features/heatmaps/components/MonthlyHeatmap';

import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, []);

  return (
    <>

      <DevHeader/>

      <main className="flex justify-center items-center p-4 bg-gray-500 h-[calc(100vh-2.5rem)]">

      <Routes>

        <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn}/>}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/heatmaps/yearly" element={<YearlyHeatmap />} /> */}
          <Route path="/heatmaps/monthly" element={<MonthlyHeatmap />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>

        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser}  />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>

      </main>

    </>
  )
}

export default App
