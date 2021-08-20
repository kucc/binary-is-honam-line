import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Row, Col } from 'antd';
import { createGlobalStyle } from 'styled-components';
import Footer from './Footer';

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

    return (
        <div>
            <div>
                <Global />
                <Menu mode="horizontal">
                    <Menu.Item>
                        <Link href="/"><a>메인 페이지</a></Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href="/session"><a>세션 업로드 페이지</a></Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href="/??"><a>잡담 페이지</a></Link>
                    </Menu.Item>
                </Menu>
                <Row gutter={8}>
                    <Col xs={24} md={6}>
                        Hello
                    </Col>
                    <Col xs={24} md={12}>
                        {children}
                    </Col>
                    <Col style={style} xs={24} md={6}>
                        Made by Binary
                    </Col>
                    <Footer />
                </Row>

            </div>
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;
