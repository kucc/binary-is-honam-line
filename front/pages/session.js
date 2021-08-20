import { Select } from "antd";
import Form from "antd/lib/form/Form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import Navbar from "../components/Navbar";

function session() {
  const [SessionArray, setSessionArray] = useState([]);
  const [Session, setSession] = useState("");
  const [SessionDateArray, setSessionDateArray] = useState([]);
  const [SessionDate, setSessionDate] = useState("");
  const [RealSessionDate, setRealSessionDate] = useState("");
  const [Image, setImage] = useState("");

  const getProduct = () => {
    axios.get("/api/sessions/sessionList").then(response => {
      if (response.data.success) {
        // console.log(response.data)
        setSessionDateArray(response.data.sessionList);
        // setuserArray(response.data.userList)
      } else {
        // alert("유저 정보를 가져오는데 실패했습니다.")
      }
    });
  };

  const SessionChangeHandler = e => {
    setSession(e);
    axios.get(`/api/sessions/findSession?name=${e}`).then(response => {
      if (response.data.success) {
        // console.log(response.data.sessionInfo[0].sessionDate)
        setSessionDate(response.data.sessionInfo[0].sessionDate);
        // setSessionArray(response.data.sessionList)
        // setuserArray(response.data.userList)
      } else {
        // alert("유저 정보를 가져오는데 실패했습니다.")
      }
    });
  };
  const SessionDateChangeHandler = e => {
    setRealSessionDate(e);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const updateImages = newImages => {
    console.log(newImages);
    setImage(newImages);
  };

  const submitHandler = () => {
    const body = {
      date: RealSessionDate,
      imageAddress: Image,
      sessionName: Session,
    };

  console.log(RealSessionDate)


  return (
    <>
    <Navbar/>
      <div style={{display:'grid', placeContent:'center', fontSize:'50px', fontWeight:'bold', marginTop:'150px'}}>
        세션 활동 사항를 입력해주세요!
      </div>
    <div style={{display:'grid', placeContent:'center', marginTop:'30px'}}>
      <Form style={{display:'grid', width:'300px', gap:'30px'}}>
        {SessionArray && <Select 
        style={{width:'300px'}}
        onChange={SessionChangeHandler} value={Session}>
            {SessionDateArray.map((item, key) => (
                <Option key={key} value={item.sessionName}>{item.sessionName}</Option>
        ))}
        </Select>}
        {SessionDate && <Select 
        style={{width:'300px'}}
        onChange={SessionDateChangeHandler} value={RealSessionDate}>
            {SessionDate.map((item, key) => (
                <Option key={key} value={item}>{item.slice(0, 10)}</Option>
        ))}
        </Select>}
        <FileUpload refreshFunction={updateImages} />
        <button
        style={{width:'300px'}}
        onClick={submitHandler}>Submit</button>
      </Form>
    </div>
    </>
  );
}

export default session;
