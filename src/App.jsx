import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DevHeader from './components/DevHeader';
import Login from './components/forms/Login';
import SignUp from './components/forms/SignUp';
import Home from './components/Home';
import Journal from './features/journal/components/Journal';
import Habits from './features/habits/components/Habits';
import Tasks from './features/tasks/components/Tasks';


function App() {

  return (
    <>
      <BrowserRouter>

        <DevHeader/>

        <main className="flex justify-center items-center p-4 bg-gray-500 h-[calc(100vh-2.5rem)]">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>

        </main>

      </BrowserRouter>
    </>
  )
}

export default App
