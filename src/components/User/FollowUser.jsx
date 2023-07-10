import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, Typography } from '@mui/material';
import { unFollowingReduceer } from '../../slices/user';

function FollowUser() {

  const { followingUsers } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const unfollow = (id) => {
    dispatch(unFollowingReduceer(id))  
  }
  return (
    <div>
      {followingUsers.length === 0 && <Typography variant="body2" color="text.secondary" style={{ wordBreak: "break-word" }}>
        No following...
      </Typography>}
      {followingUsers?.map(user => {
        return (
          <Card sx={{ width: "100%", margin: "8px 0px" }} key={user?.id}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Avatar
                alt="Remy Sharp"
                src={user.avatar}
                sx={{ width: 36, height: 36 }}
              />
              <Typography variant="body2" style={{ marginRight: 'auto', marginLeft: "4px" }}>
                {user?.username}
              </Typography>
              <Button onClick={()=>unfollow(user?.id)}>Unfollow</Button>
            </div>

          </Card>
        )
      })}
    </div>
  );
}

export default FollowUser;
