import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';

import useInput from '../hooks/useInput';
import { LOAD_MY_INFO_REQUEST, REGISTER_USER_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import FileUpload from '../components/FileUpload';
import Navbar from '../components/Navbar';


const ErrorMessage = styled.div`
    color: red;        
`;

const Signup = () => {
    const dispatch = useDispatch();
    const { signUpDone, signUpLoading, signUpError, me } = useSelector((state) => state.user);

    useEffect(() => {
        if ((me && me.id)) {
            Router.replace('/');
        }
    }, [me && me.id]);
    
    useEffect(() => {
        if (signUpError) {
            alert(signUpError);
        }
    }, [signUpError]);
    
    useEffect(() => {
        if (signUpDone) {
            alert('회원가입을 완료했으니 로그인 페이지로 이동합니다.');
            Router.replace('/login');
        }
    }, [signUpDone]);

    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [name, onChangeName] = useInput('');
    const [Image, setImage] = useState('');

    // 비밀번호 체크는 조금 다른 부분이 있음
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const onSubmit = () => {
        if (password !== passwordCheck) {
          return setPasswordError(true);
        }
        const body = {
            email: email,
            passsword: password,
            name: name,
            faceImage: Image,
          }
        axios.post('/api/users/register', body)
        .then(response => {
            console.log(response.data)
            if (response.data.success){
                Router.replace('/');
            } else {
                alert('회원가입하는데 실패했습니다.')
            }
        })
      };
    
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);

    const updateImages = (newImages) => {
        console.log(newImages);
        setImage(newImages);
    };

    return (
        <>
        <Navbar/>
        <div>
            <Head>
                <title>회원가입 | KUCC</title>
            </Head>
            <Form
                style={{ width: 400, margin: 'auto', marginTop: 10 }} 
                onFinish={onSubmit}
            >
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br />
                    <Input 
                        name="user-email" 
                        type="email"
                        value={email} 
                        required 
                        onChange={onChangeEmail}
                        style={{ marginBottom: 20 }}
                    />
                </div>
                <div>
                    <label htmlFor="user-name">이름</label>
                    <br />
                    <Input 
                        name="user-name" 
                        value={name} 
                        required 
                        onChange={onChangeName}
                        style={{ marginBottom: 20 }}
                    />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input 
                        name="user-password" 
                        type="password"
                        value={password} 
                        required 
                        onChange={onChangePassword}
                        style={{ marginBottom: 20 }}
                    />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호 체크</label>
                    <br />
                    <Input 
                        name="user-password-check" 
                        type="password"
                        value={passwordCheck} 
                        required 
                        onChange={onChangePasswordCheck}
                    />
                    {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                </div>
                <div style={{ marginTop: '30px' }}>
                    <FileUpload refreshFunction={updateImages} />
                </div>
                <div style={{ marginTop: 10 }}>
                    <Button type="danger" htmlType="submit" loading={signUpLoading}>가입하기</Button>
                </div>
            </Form>
        </div>
        </>
    );
};

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//     const cookie = context.req ? context.req.headers.cookie : '';
//     axios.defaults.headers.Cookie = '';
//     if (context.req && cookie) {
//       axios.defaults.headers.Cookie = cookie;
//     }
//     context.store.dispatch({
//       type: LOAD_MY_INFO_REQUEST,
//     });
//     context.store.dispatch(END);
//     await context.store.sagaTask.toPromise();
//   });

export default Signup;
