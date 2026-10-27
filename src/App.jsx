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

import YearlyHeatmap from './features/heatmaps/components/YearlyHeatmapForHabits';
import MonthlyHeatmap from './features/heatmaps/components/MonthlyHeatmap';

import ProtectedRoutes from './components/ProtectedRoutes';
import CustomTextAreas from './features/custom-text-areas/components/CustomTextAreas';

function App() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const [userCustomTextAreas, setUserCustomTextAreas] = useState(null);
  const [userEntries, setUserEntries] = useState(null);
  const [userHabits, setUserHabits] = useState(null);
  const [userTasks, setUserTasks] = useState(null);

  const navigate = useNavigate();

  return (
    <>

      <DevHeader 
        user={user} 
        setUser={setUser} 
        accessToken={ accessToken }
        setAccessToken={setAccessToken}
      />

      <main className="flex justify-center items-center p-4 bg-gray-500 min-h-[calc(100vh-2.5rem)]">

      <Routes>

        <Route element={<ProtectedRoutes user={user} />}>
        
          <Route path="/" element={<Home accessToken={accessToken} />} />
          {/* <Route path="/heatmaps/yearly" element={<YearlyHeatmap />} /> */}
          <Route path="/custom-text-areas" element={<CustomTextAreas accessToken={ accessToken } userCustomTextAreas={userCustomTextAreas} setUserCustomTextAreas={ setUserCustomTextAreas }/>}></Route>
          <Route path="/heatmaps/monthly" element={<MonthlyHeatmap />} />

          <Route path="/journal" element={<Journal accessToken={accessToken} userEntries={userEntries} setUserEntries={setUserEntries} />} />
          <Route path="/habits" element={<Habits accessToken={accessToken} userHabits={userHabits} setUserHabits={setUserHabits} />} />
          <Route path="/tasks" element={<Tasks accessToken={accessToken} userTasks={userTasks} setUserTasks={setUserTasks} />} />

        </Route>

        <Route path="/login" element={
          <Login 
            setUser={setUser} 
            setAccessToken={setAccessToken}
            setUserCustomTextAreas={setUserCustomTextAreas} 
            setUserEntries={setUserEntries}
            setUserHabits={setUserHabits}
            setUserTasks={setUserTasks}
          />
        }/>

        <Route path="/sign-up" element={<SignUp />} />
      </Routes>

      </main>

    </>
  )
}

export default App
