import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Avatar, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MyTweets from './MyTweet';
import { useSelector } from 'react-redux';
import MyFollowing from '../User/FollowUser';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ avatar, username, toggleDrawer }) {

  const { tweetData } = useSelector((state) => state.tweets);
  const { userId } = useSelector((state) => state.users)


  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '30rem' }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "5vh", padding: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt="Remy Sharp"
            src={avatar}
            sx={{ width: 36, height: 36 }}
          />
          <h3 style={{ marginLeft: "4px" }}>{username}</h3>
        </div>
        <Button onClick={() => toggleDrawer(false)}><CloseIcon /></Button>
      </div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="My tweets" {...a11yProps(0)} />
          <Tab label="Following" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <MyTweets contents={tweetData.filter(value => value.author === userId)} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MyFollowing />
      </CustomTabPanel>
    </Box>
  );
}
