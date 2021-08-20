import React, {useState, useEffect} from 'react'
import { Button } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import Axios from 'axios';
const { Option } = Select;
const { TextArea } = Input;
import MultipleDatePicker from 'react-multiple-datepicker'

function sessionupload() {
    const [userArray, setuserArray] = useState([])
    const [SessionName, setSessionName] = useState("")
    const [SessionLeader, setSessionLeader] = useState("")
    const [SessionMember, setSessionMember] = useState([])
    const [SessionDate, setSessionDate] = useState([])


    const SessionNameChangeHandler = (e) => {
        setSessionName(e.target.value)
    }

    const SessionLeaderChangeHandler = (e) => {
        setSessionLeader(e.target.value)
    }

    const SessionMemberChangeHandler = (e) => {
        console.log(e)
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
            SessionName: SessionName,
            SessionLeader: SessionLeader,
            SessionMember: SessionMember,
            SessionDate: SessionDate,
        }
        Axios.post('/api/sessions/create', body)
        .then(response=> {
            if(response.data.success){
                alert('업로드 했습니다!')
                //랜딩 페이지로 보냄
                console.log(body)
                // props.history.push('/')
            } else {
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

  useEffect(() => {
    getProduct()
  }, [])

    return (
        <div className={"mainUploadProducPage"}>
            <form 
            className={"form_UploadProductPage"}
            onSubmit={submitHandler}
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
                 멤버
                <Select style={{ width: 120 }}
                onChange={SessionMemberChangeHandler} value={SessionMember}>
                    {userArray.map((item, key) => (
                        <Option key={key} value={item.name}>{item.name}</Option>
                    ))}
                </Select>
                <MultipleDatePicker onSubmit={dates => console.log(dates)}/>
                <Button 
                style={{width:'80px'}}
                htmlType="submit"
                >Submit</Button>
            </form>
        </div>
    )
}

export default sessionupload
