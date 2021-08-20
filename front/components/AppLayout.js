import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Row, Col } from 'antd';
import { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import Navbar from './Navbar';

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

    return (
        <div>
            <div>
                <Global />
                <Navbar/>
                <Row gutter={8}>
                    <Col xs={24} md={6}>
                        {/* {me ? <UserProfile /> : <LoginForm />} */}
                    </Col>
                    <Col xs={24} md={12}>
                        {children}
                    </Col>
                    <Col style={style} xs={24} md={6}>
                        ☆ Made by Binary ☆
                    </Col>
                </Row>
                <Link href="/sessionupload"><a>세션 업로드</a></Link>
            </div>
        </div>
    );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
