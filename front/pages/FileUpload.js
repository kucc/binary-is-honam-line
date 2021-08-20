import Axios from 'axios';
import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
// import './FileUpload.css';
import {DeleteOutlined} from '@ant-design/icons';
import { image_SERVER } from '../config/config';

function FileUpload(props) {
  const [imageArray, setimageArray] = useState([])
  const [imageExistence, setimageExistence] = useState(true)
  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: {'content-type': 'multipart/form-data'}
    }
    formData.append('file', files[0])
    console.log(formData, config)

    Axios.post('/api/sessions/image', formData, config)
      .then(response => {
        if(response.data.success){
          // console.log(response.data)
          setimageArray([...imageArray, response.data.filePath])
          props.refreshFunction(response.data.filePath)
          setimageExistence(false)
        } else {
          alert('파일을 저장하는데 실패했습니다.')
        }
      })
  } 

  const imgDeleteHandler = (index) => {
    let newArray = [...imageArray]
    newArray.splice(index, 1)
    setimageArray(newArray)
    // 상위 컴포넌트로 보낼 때 함수를 사용
    props.refreshFunction(newArray)
    setimageExistence(true)
  }

  return (
    <>
      <div style={{display:'flex', justifyContent: 'space-between'}}>
      {imageExistence &&
        <Dropzone onDrop={dropHandler}>
          {({getRootProps, getInputProps}) => (
            <div style={{width:'300px', height:'200px', border:'1px solid lightgray', display:'grid', placeItems:'center'}} {...getRootProps()}>
              <input {...getInputProps()}/>
              <div style={{fontWeight:'700', fontSize:'35px', color:'silver'}}>+</div>
            </div>
          )} 
        </Dropzone>}
        <div 
        className={'imageArea'} 
        style={{ display: 'flex', width: '350px', height: '215px', overflowX: 'overlay'}}
        >
          {imageArray[0] &&
          imageArray.map((image, index) => 
          // onclick 함수에 데이터를 보내고 싶을때 이렇게 사용!!
            <span key={index} onClick={() => imgDeleteHandler(index)}>
            <div className={"screenContainer"}>
              <div className={"screen"}>
                {/* <div className={"bottom"}><DeleteOutlined />Delete</div> */}
                <img 
                style={{ minWidth:'300px', width: '300px', height:'200px'}}
                src={image_SERVER+image}
                />
              </div>
            </div>
            </span>
          )}
        </div>
      </div>
    </>
  )
}


export default FileUpload