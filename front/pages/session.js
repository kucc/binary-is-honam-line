import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'

function session() {
  const getProduct = () => {
    axios.get('/api/sessions/sessionList')
    .then(response => {
      if (response.data.success){
        console.log(response.data)
        // setuserArray(response.data.userList)
      } else{
        // alert("유저 정보를 가져오는데 실패했습니다.")
      }
    })
  }


  useEffect(() => {
    getProduct()
  }, [])

  return (
    <>
    <Navbar/>
    <div>

    </div>
    </>
  )
}

export default session
