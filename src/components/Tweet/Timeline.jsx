import React, { useEffect } from 'react';
import { fetchTweetData } from '../../slices/tweet';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import BasicTabs from "./Tabs";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { Avatar, Typography } from '@mui/material';
import styles from './style.module.css';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import AddIcon from '@mui/icons-material/Add';
import CreateTweet from './CreateTweet';
import { followReduceer, followingReduceer, unFollowingReduceer } from '../../slices/user';

function TimelineComponent() {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const { tweetData } = useSelector((state) => state.tweets)
  const { avatar, username, followingUsersId, userId } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(fetchTweetData())
    dispatch(followingReduceer())
  }, [dispatch]);


  const toggleDrawer = (open) => {
    setState(open);
  };

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const followUser = (id) => {
    dispatch(followReduceer(id))
  }

  const unfollow = (id) => {
    dispatch(unFollowingReduceer(id))
  }

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }
  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <h3 style={{ marginLeft: "1rem" }}>Tweet</h3>
        <div className={styles.headerMenu}>
          <Button onClick={handleClickOpen}>
            <AddIcon />
          </Button>
          <CreateTweet open={open} handleClose={handleClose} />
          <Button onClick={() => toggleDrawer(true)}>
            <Avatar
              alt="Remy Sharp"
              src={avatar}
            />
          </Button>
          <Button onClick={() => logout()}>
            logout
          </Button>
          <SwipeableDrawer
            anchor="right"
            open={state}
            onClose={() => toggleDrawer(false)}
            onOpen={() => toggleDrawer(true)}
          >
            <BasicTabs toggleDrawer={toggleDrawer} avatar={avatar} username={username} />
          </SwipeableDrawer>
        </div>
      </header>
      <div className={styles.tweetSection}>
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}>
          {tweetData?.map((tweet) => (
            <TimelineItem key={tweet?.id} style={{ marginBottom: "16px" }}>
              <TimelineSeparator>
                <Avatar
                  alt="Remy Sharp"
                  src={tweet?.avatar}
                  sx={{ width: 30, height: 30 }}
                />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent style={{ wordBreak: "break-word" }}>
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                  <Typography style={{ fontWeight: "bolder" }}>
                    {tweet?.username}
                    {tweet?.author !== userId ?
                      followingUsersId.includes(tweet?.author) ?
                        <Button onClick={() => unfollow(tweet?.author)}>Unfollow</Button>
                        :
                        <Button onClick={() => followUser(tweet?.author)}>Follow</Button>
                      : null
                    }
                  </Typography>
                  <Typography variant="caption" display="block" style={{ color: "lightgray" }}>
                    {getTimeDifference(tweet?.createdAt)}
                  </Typography>
                </div>
                {tweet?.content}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  );
}

export default TimelineComponent;
