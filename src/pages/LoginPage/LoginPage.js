import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
    const [Id, setId] = useState("")
    const [Password, setPassword] = useState("")

	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 
    const handleInputID = (e) => {
        setId(e.target.value)
    }

    const handleInputPW = (e) => {
        setPassword(e.target.value)
    }

	// login 버튼 클릭 이벤트
    const onClickLogin = () => {
        console.log('click login')
    }

	// 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(() => {
        axios.get('/api/login')
        .then(res => console.log(res))
        .catch()
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    [])

    return(
        <div>
            <h2>Login</h2>
            <div>
                <label>ID : </label>
                <input type='text' name='id' value={Id} onChange={handleInputID} />
            </div>
            <div>
                <label>PW : </label>
                <input type='password' name='Password' value={Password} onChange={handleInputPW} />
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>Login</button>
            </div>
        </div>
    )
}

export default Login;