import Axios from 'axios';
import React, {useEffect, useState, useRef} from 'react';
import {Card, Col, Row} from 'antd';
import { image_SERVER } from '../config/config';
import Navbar from '../components/Navbar';
const { Meta } = Card;


function member() {

  const [userArray, setuserArray] = useState([])


  const getProduct = () => {
    Axios.get('/api/users/userList')
    .then(response => {
      if (response.data.success){
        // if (body.loadMore === true){
        //   console.log(body.loadMore)
        //   setProducts([...Products, ...response.data.productInfo])
        // } else {
        //   setProducts(response.data.productInfo)
        // }
        // setPostSize(response.data.postSize)
        console.log(response.data.userList)
        setuserArray(response.data.userList)
      } else{
        alert("유저 정보를 가져오는데 실패했습니다.")
      }
    })
  }

  useEffect(() => {
    getProduct()
  }, [])

  const renderCard = userArray.map((user) => {
    return <Col xxl={6} lg={8} xs={12}>
      <Card 
        style={{maxWidth:'300px'}}
        hoverable
        cover={user.faceImage && 
        <img src={image_SERVER+user.faceImage} />
        }
      >
        <Meta 
          title={user.name}
          description={user.email}
        />
      </Card>
    </Col>
  })

  return (
    <div>
      <Navbar/>
      <div style={{marginTop:'30px'}}>
        <Row gutter={[32, 32]}>
          {renderCard}
        </Row>
      </div>
    </div>
  )
}

export default member
