import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
// import CreateTweet from './components/Tweet/CreateTweet';
// import EditTweet from './components/Tweet/EditTweet';
// import DeleteTweet from './components/Tweet/DeleteTweet';
// import FollowUser from './components/User/FollowUser';
// import UnfollowUser from './components/User/UnfollowUser';
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
            {/* <Route path="/create-tweet" element={<CreateTweet />} />
            <Route path="/edit-tweet/:id" element={<EditTweet />} />
            <Route path="/delete-tweet/:id" element={<DeleteTweet />} />
            <Route path="/follow/:id" element={<FollowUser />} />
            <Route path="/unfollow/:id" element={<UnfollowUser />} /> */}
            <Route path="/" element={<TimelineComponent />} />
            <Route path="/register" element={<Navigate to="/" />} />
            <Route path="/login" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

