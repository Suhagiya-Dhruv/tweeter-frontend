import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from "react-redux";
import { deleteTweet, updateTweet } from "../../slices/tweet";
import SaveIcon from '@mui/icons-material/Save';
import { TextField } from "@mui/material";

export default function MyTweets({ contents }) {

  const dispatch = useDispatch();
  const [content, setContent] = React.useState('');
  const [id, setId] = React.useState('');
  const getTimeDifference = (timestamp) => {
    const currentTime = Date.now();
    const tweetTime = Date.parse(timestamp);
    const timeDiff = currentTime - tweetTime;
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(minutes / 60);

    if (minutes < 1) {
      return 'just now';
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return new Date(timestamp).toLocaleString();
    }
  };

  const editTweet = (id, content) => {
    setContent(content);
    setId(id)
  }

  const deleteT = (id) => {
    dispatch(deleteTweet(id))
  }

  const saveTweet = () => {
    dispatch(updateTweet(id, content));
    setContent("");
    setId("")
  }

  return (
    <div>
      {contents.length === 0 && <Typography variant="body2" color="text.secondary" style={{ wordBreak: "break-word" }}>
        No Tweets...
      </Typography>}
      {contents?.map(tweet => {
        return (
          <Card sx={{ width: "100%", margin: "8px 0px" }} key={tweet?.id}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <CardHeader subheader={getTimeDifference(tweet?.createdAt)} />
              <CardActions disableSpacing>
                {tweet?.id !== id ?
                  <IconButton onClick={() => editTweet(tweet?.id, tweet?.content)}>
                    <EditIcon />
                  </IconButton>
                  :
                  <IconButton onClick={() => saveTweet()}>
                    <SaveIcon />
                  </IconButton>
                }
                <IconButton onClick={() => deleteT(tweet?.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </div>
            <CardContent>
              {tweet?.id === id ?
                <TextField
                  autoFocus
                  multiline
                  rows={4}
                  margin="dense"
                  placeholder='Write somting.....'
                  id="name"
                  fullWidth
                  variant='standard'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                :
                <Typography variant="body2" color="text.secondary" style={{ wordBreak: "break-word" }}>
                  {tweet?.content}
                </Typography>
              }

            </CardContent>
          </Card>
        )
      })}
    </div>

  );
}
