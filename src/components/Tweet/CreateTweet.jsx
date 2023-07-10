import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import { postTweet } from '../../slices/tweet';
import { useDispatch } from 'react-redux';

function CreateTweet({ open, handleClose }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const handleCreateTweet = async (e) => {
    e.preventDefault();
    try {
      dispatch(postTweet(content));
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Tweet your thought</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            rows={4}
            margin="dense"
            placeholder='Write somting.....'
            id="name"
            fullWidth
            variant='standard'
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateTweet}>Post</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateTweet;
