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
            alert('회원가입을 완료했으니 메인페이지로 이동합니다.');
            Router.replace('/');
        }
    }, [signUpDone]);

    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [name, onChangeName] = useInput('');
    // const [faceimage, setFaceimage] = useState('');

    // 비밀번호 체크는 조금 다른 부분이 있음
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
          return setPasswordError(true);
        }
        return dispatch({
          type: REGISTER_USER_REQUEST,
          data: {
            email,
            password,
            name,
            // faceimage,
          },
        });
      }, [email, password, name, passwordCheck]);
    
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);

    return (
        <AppLayout>
            <Head>
                <title>회원가입 | Nodebird</title>
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
                <div>
                    여기에 자기 정면 사진 업로드 올리기
                </div>
                <div style={{ marginTop: 10 }}>
                    <Button type="danger" htmlType="submit" loading={signUpLoading}>가입하기</Button>
                </div>
            </Form>
        </AppLayout>
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
