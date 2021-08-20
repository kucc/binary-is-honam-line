import React from 'react'
import { Menu, Row, Col } from 'antd';
import Link from 'next/link';

function Navbar() {
  return (
    <div style={{height:'50px'}}>
      <Menu mode="horizontal" style={{float:'left'}}>
          <Menu.Item>
              <Link href="/"><img src="/img/kucc.png" style={{height:'80px'}}/></Link>
          </Menu.Item>
      </Menu>
      <Menu mode="horizontal" style={{float:'right'}}>
          <Menu.Item>
              <Link href="/session"><a>세션 사진 업로드</a></Link>
          </Menu.Item>
          <Menu.Item>
              <Link href="/??"><a>잡담 페이지</a></Link>
          </Menu.Item>
          <Menu.Item>
              <Link href="/member"><a>회원</a></Link>
          </Menu.Item>
          <Menu.Item>
              <Link href="/login"><a>로그인</a></Link>
          </Menu.Item>
      </Menu>
    </div>
  )
}

export default Navbar
