import React, {useState, useEffect} from 'react'
import { Button } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import Router from 'next/router';
import Axios from 'axios';
const { Option } = Select;
const { TextArea } = Input;
import MultipleDatePicker from 'react-multiple-datepicker'
import Navbar from '../components/Navbar';

function sessionupload() {
    const [userArray, setuserArray] = useState([])
    const [SessionName, setSessionName] = useState("")
    const [SessionLeader, setSessionLeader] = useState("")
    const [SessionMember, setSessionMember] = useState("")
    const [SessionMemberArray, setSessionMemberArray] = useState([])
    const [SessionDate, setSessionDate] = useState([])


    const SessionNameChangeHandler = (e) => {
        setSessionName(e.target.value)
    }

    const SessionLeaderChangeHandler = (e) => {
        setSessionLeader(e.target.value)
    }

    const SessionMemberChangeHandler = (e) => {
        setSessionMember(e)
        // console.log(e)
        setSessionMemberArray([...SessionMemberArray, e])
    }

    const SessionDateChangeHandler = (e) => {
        console.log(e)
    }


    const submitHandler = (e) => {
        e.preventDefault();
        if(!SessionName || !SessionLeader || !SessionMember || !SessionDate || !Image) {
            // alert 고치기
            return alert('모든 값을 넣어주셔야 합니다.')
        }

        const body = {
            // 로그인된 사람의 ID를 가져오기, auth에서 user 값을 return했기 때문에 prop으로 항상 받아올 수가 있음.
            sessionName: SessionName,
            sessionLeader: SessionLeader,
            sessionMember: SessionMemberArray,
            sessionDate: SessionDate,
        }
        console.log(body)
        Axios.post('/api/sessions/create', body)
        .then(response=> {
            if(response.data.success){
                alert('업로드 했습니다!')
                //랜딩 페이지로 보냄
                console.log(body)
                // props.history.push('/')
                Router.replace('/');
            } else {
                console.log(response.data.error)
                alert('업로드에 실패했습니다.')
            }
        })
    }

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

  const memberDeleteHandler = (index) => {
    let newArray = [...SessionMemberArray]
    newArray.splice(index, 1)
    setSessionMemberArray(newArray)
  }

  useEffect(() => {
    getProduct()
  }, [])

    return (
        <>
        <Navbar/>
        <div style={{display:'grid', placeContent:'center', fontSize:'50px', fontWeight:'bold', marginTop:'150px'}}>
        세션 정보를 입력해주세요!
        </div>
        <div style={{display:'grid', placeItems:'center', marginTop:'30px'}}>
            <form 
            className={"form_UploadProductPage"}
            onSubmit={submitHandler}
            style={{width:'500px', display:'grid', gap:'30px'}}
            >
                <div>
                    <div>세션 이름</div>
                    <Input onChange={SessionNameChangeHandler}
                    value={SessionName}/>
                </div>
                <div>
                    <div>세션장</div>
                    <TextArea onChange={SessionLeaderChangeHandler}
                    value={SessionLeader}/>   
                </div>
                <div>
                    멤버
                    <br/>
                    <Select
                    style={{width:'300px'}}
                    onChange={SessionMemberChangeHandler} value={SessionMember}>
                        {userArray.map((item, key) => (
                            <Option key={key} value={item.name}>{item.name}</Option>
                        ))}
                    </Select>
                    {SessionMemberArray[0] &&
                      SessionMemberArray.map((member, index) => 
                      // onclick 함수에 데이터를 보내고 싶을때 이렇게 사용!!
                          <span key={index} onClick={() => memberDeleteHandler(index)}>
                            <div
                            style={{width: '100px', height:'20px'}}
                            >❌{"     "+member}</div>
                          </span>
                      )}
                </div>
                <div>
                    활동 날짜
                    <MultipleDatePicker onSubmit={dates => setSessionDate(dates)}/>
                    <Button 
                    style={{width:'80px', marginTop:'20px'}}
                    htmlType="submit"
                    >Submit</Button>
                </div>
            </form>
        </div>
        </>
    )
}

export default sessionupload
