import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import Login from './components/Auth/Login';
import TimelineComponent from './components/Tweet/Timeline';
import jwt_decode from "jwt-decode";
import { updateAvatar } from './slices/user';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(updateAvatar(jwt_decode(localStorage.getItem('token'))))
    }
  }, [dispatch])

  return (
    <Router>
      <Routes>

        {localStorage.getItem('token') ? (
          <>
            <Route path="/" element={<TimelineComponent />} />
            <Route path="/login" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

