import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

interface UserData {
    name: String;
    id: String;
    email: String;
}

const Test = () => {
    const [data, setData] = useState<UserData>({
        name: '',
        id: '',
        email: ''
    });

    // 컴포넌트가 처음 렌더링될 때 한 번만 실행
    useEffect(() => {
        axios.get<UserData>("/api/hello")
        .then(res => {
            setData(res.data);
        })
        .catch(error => {
            console.error("API 요청 실패:", error);
        });
    }, []); // 빈 배열: 마운트 시 한 번만 실행

  return (
    <div>
        서버로부터 온 메시지: {data.name}, {data.id}, {data.email}
    </div>
  )
}

export default Test