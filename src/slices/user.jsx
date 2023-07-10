import { createSlice } from '@reduxjs/toolkit'
import axios from '../utils/axios';
import jwt_decode from "jwt-decode";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    avatar: "",
    username: "",
    userId: "",
    followingUsers: [],
    followingUsersId: []
  },
  reducers: {
    updateAvatar(state, action) {
      state.avatar = action.payload.avatar;
      state.username = action.payload.username;
      state.userId = action.payload.userId
    },
    updateFollowing(state, action) {
      state.followingUsers = action.payload
      state.followingUsersId = action.payload.map(value => value.id)
    }
  },
})

export const { updateAvatar, updateFollowing } = userSlice.actions

export const loginReduceer = (data, enqueueSnackbar) => async (dispatch) => {
  await axios.post('/auth/login', data)
    .then(data => {
      localStorage.setItem('token', data.data.token)
      dispatch(userSlice.actions.updateAvatar(jwt_decode(data.data.token)));
      window.location.reload();
    })
    .catch(err => enqueueSnackbar(err.response.data.error, { variant: 'error' }));
}

export const registerReduceer = (data, enqueueSnackbar) => async (dispatch) => {
  await axios.post('/auth/register', data)
    .then(data => {
      localStorage.setItem('token', data.data.token)
      dispatch(userSlice.actions.updateAvatar(jwt_decode(data.data.token)));
      window.location.reload();
    })
    .catch(err => enqueueSnackbar(err.response.data.error, { variant: 'error' }));
}

export const followingReduceer = () => async (dispatch) => {
  await axios.get('/users/follow')
    .then(data => {
      dispatch(userSlice.actions.updateFollowing(data.data.data));
    })
    .catch(err => console.log(err));
}

export const unFollowingReduceer = (id) => async (dispatch) => {
  await axios.post(`/users/${id}/unfollow`)
    .then(data => {
      dispatch(followingReduceer());
    })
    .catch(err => console.log(err));
}

export const followReduceer = (id) => async (dispatch) => {
  await axios.post(`/users/${id}/follow`)
    .then(data => {
      dispatch(followingReduceer());
    })
    .catch(err => console.log(err));
}

export default userSlice.reducer