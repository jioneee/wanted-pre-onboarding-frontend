import styled from 'styled-components'

import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const SignInContainer = styled.div`
padding:20px;
display: flex;
flex-direction: column;
box-sizing: border-box;
width:200px;
color:black;
text-align: center;
align-items: center;

`

const SignInHeader = styled.h1`
text-align: center;
`

const SignIn = () => {
    const navigate = useNavigate();
    const url = 'https://www.pre-onboarding-selection-task.shop'; 
    const hasAccessToken = !!localStorage.getItem('accessToken');

    useEffect(() => {
      if (hasAccessToken) {
        navigate('/todo');
      }
    }, [hasAccessToken, navigate]);
    const [userEmail, setUserEmail] = useState('');
    const [userEmailError, setUserEmailError] = useState(false);
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordError, setUserPasswordError] = useState(false);
  
    const onChangeUserEmail = (e) => {
      const userEmailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if (!e.target.value || userEmailRegex.test(e.target.value)) setUserEmailError(false);
      else setUserEmailError(true);
      setUserEmail(e.target.value);
    };
  
    const onChangeUserPassword = (e) => {
        const userPasswordRegex = /^.{8,}$/;
      if (!e.target.value || userPasswordRegex.test(e.target.value)) setUserPasswordError(false);
      else setUserPasswordError(true);
      setUserPassword(e.target.value);
    };
  
    const onClickSignIn = async () => {
      try {
        const signUpData = {
          email: userEmail,
          password: userPassword,
        };
  
      const response =  await axios.post(`${url}/auth/signin`, signUpData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  

        console.log('token',response.data.access_token )
        const accessToken = response.data.access_token;
        localStorage.setItem('accessToken', accessToken);
        navigate(`/todo`)
      } 
      catch (error) {
        console.log('Error:', error.response.data);
    
      }
    };
    if (hasAccessToken) {
        return navigate('/todo', { replace: true });
      }
    return (

        <SignInContainer>
        <SignInHeader>로그인</SignInHeader>
                   이메일
          <input
            data-testid="email-input"
            placeholder="이메일을 입력하세요"
            type="email"
            name="userEmail"
            value={userEmail}
            onChange={onChangeUserEmail}
          />
          {userEmailError && <div className="invalid-input">정확한 이메일을 입력해주세요</div>}
          비밀번호
          <input
            data-testid="password-input"
            placeholder="비밀번호를 입력하세요"
            type="password"
            name="userPassword"
            value={userPassword}
            onChange={onChangeUserPassword}
          />
          {userPasswordError && <div className="invalid-input">비밀번호는 8자 이상으로 입력해주세요</div>}
    
          {(userEmailError || userPasswordError) ? (
            <button data-testid="signin-button" disabled="disabled">
              로그인
            </button>
          ) : (
            <button data-testid="signin-button" onClick={onClickSignIn}>
              로그인
            </button>
          )}
                </SignInContainer>

    )


}

export default SignIn