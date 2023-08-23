import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Feedback from './pages/Dashboard/Feedback';
import Layout from './pages/Dashboard/Layout';
import Questions from './pages/Dashboard/Questions';
import Report from './pages/Dashboard/Report';
import Subjects from './pages/Dashboard/Subjects';
import Users from './pages/Dashboard/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Report />} />
          <Route path="users" element={<Users />} />
          <Route path="questions" element={<Questions />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
