import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Row, Col } from 'antd';
import { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import Navbar from './Navbar';
import axios from 'axios';

const Global = createGlobalStyle`
    .ant-row {
        margin-right: 0 !important;
        margin-left: 0 !important;
    }

    .ant-col:first-child {
        padding-left: 0 !important;
    }

    .ant-col:last-child {
        padding-right: 0 !important;
    }
`;

const AppLayout = ({ children }) => {
    // 서버쪽이 없다는 가정하에 더미 데이터로 로그인 구현하기
    const style = useMemo(() => ({ fontSize: '15px', fontWeight: 'bold', marginTop: '28px', textAlign: 'center' }));
    const { me } = useSelector((state) => state.user);
    const [usage, setusage] = useState(false)
    const [usageShower, setusageShower] = useState("")

    const buttonHandler = () => {
      if (usage === false){
        sendUsage()
        setusage(true)
        setusageShower("사용중")
      } else{
        sendUsage()
        setusage(false)
        setusageShower("비었음")
      }
    }

    useEffect(() => {
      axios.get('/api/usage/usagestatus')
      .then(response => {
        console.log(response.data)
        if (response.data.success){
          console.log(response.data)
        } else{
          alert("동방 사용 정보를 가져오는데 실패했습니다.")
        }
      })
    }, [])

    const sendUsage = () => {
      const body = {
        isUsage: usage
      }

      axios.post('/api/usage/create', body)
      .then(response => {
        if (response.data.success){
          console.log(response.data)
        } else{
          alert("동방 사용 정보를 가져오는데 실패했습니다.")
        }
      })
    }

    return (
        <div>
            <div>
                <Global />
                <Navbar/>
                <div style={{display:'grid', placeItems:'center'}}>
                  <div style={{fontSize:'50px', fontWeight:'bold', marginTop:'30px'}}>
                    지금 동방은? <span style={{fontSize:'70px', color:'tomato'}}>{usageShower}</span>
                  </div>
                  <img onClick={buttonHandler} src="img/button.jpeg" style={{width:'500px'}}></img> 
                </div>
            </div>
        </div>
    );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
