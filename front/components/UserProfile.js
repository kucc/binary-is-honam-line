import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button } from 'antd';

import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const style = useMemo(() => ({ marginTop: '30px' }));
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <div style={{ paddingLeft: '4px' }}>
      <Card
        style={style}
        actions={[
          <div key="twit">KUCC♥</div>,
          <div key="twit">게시글</div>,
          <div key="twit">게시글</div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{me.userId[0]}</Avatar>}
          title={me.nickname}
        />
        <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
      </Card>
    </div>
  );
};

export default UserProfile;
