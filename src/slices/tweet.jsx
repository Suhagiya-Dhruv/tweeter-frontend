import { createSlice } from '@reduxjs/toolkit'
import axios from '../utils/axios'

export const tweetSlice = createSlice({
  name: 'user',
  initialState: {
    tweetData: [],
  },
  reducers: {
    fetchData(state, action) {
      state.tweetData = action.payload;
    }
  },
})

export const { fetchData } = tweetSlice.actions

export const fetchTweetData = () => async (dispatch) => {
  await axios.get('/tweets')
    .then(data => {
      dispatch(tweetSlice.actions.fetchData(data.data.data));
    })
    .catch(err => console.log(err));
}

export const postTweet = (data) => async (dispatch) => {
  await axios.post('/tweets', { content: data })
    .then(data => {
      dispatch(fetchTweetData());
    })
    .catch(err => console.log(err));
}

export const updateTweet = (id, data) => async (dispatch) => {
  await axios.put(`/tweets/${id}`, { content: data })
    .then(data => {
      dispatch(fetchTweetData());
    })
    .catch(err => console.log(err));
}

export const deleteTweet = (id) => async (dispatch) => {
  await axios.delete(`/tweets/${id}`)
    .then(data => {
      dispatch(fetchTweetData());
    })
    .catch(err => console.log(err));
}

export default tweetSlice.reducer