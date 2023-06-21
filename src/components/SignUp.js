import styled from 'styled-components';
import axios from 'axios';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 200px;
  color: black;
  text-align: center;
  align-items: center;
`;

const SignUpHeader = styled.h1`
  text-align: center;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const url = 'https://www.pre-onboarding-selection-task.shop'; // Remove trailing slash
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

  const onClickSubmit = async () => {
    try {
      const signUpData = {
        email: userEmail,
        password: userPassword,
      };

      await axios.post(`${url}/auth/signup`, signUpData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      navigate(`/signin`)
    } 
    catch (error) {
      if(userEmail.length <= 0 || userPassword.length <= 0){
        alert('email, password를 입력하세요')
      } else {
        alert('이미 존재하는 email 입니다')
      }
   
    }
  };

  return (
    <SignUpContainer>
      <SignUpHeader>회원가입</SignUpHeader>
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
        <button data-testid="signup-button" disabled="disabled">
          회원가입
        </button>
      ) : (
        <button data-testid="signup-button" onClick={onClickSubmit}>
          회원가입
        </button>
      )}
    </SignUpContainer>
  );
};

export default SignUp;



// import styled from 'styled-components'
// import axios from 'axios'

// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'


// const SignUpContainer = styled.div`
// padding:20px;
// display: flex;
// flex-direction: column;
// box-sizing: border-box;
// width:200px;
// color:black;
// text-align: center;
// align-items: center;

// `

// const SignUpHeader = styled.h1`
// text-align: center;
// `

// const SignUp = () => {
//   // const navigate = useNavigate();
//     const url = 'https://www.pre-onboarding-selection-task.shop/'
//     const [userEmail, setUserEmail] = useState("");
//     const [userEmailError, setUserEmailError] = useState(false);
//     const [userPassword, setUserPassword] = useState("");
//     const [userPasswordError, setUserPasswordError] = useState(false);



//     const onChangeUserEmail = (e) => {
//         const userEmailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
//         if ((!e.target.value || (userEmailRegex.test(e.target.value)))) setUserEmailError(false);
//         else setUserEmailError(true);
//         setUserEmail(e.target.value);
//     };


//     const onChangeUserPassword = (e) => {
//         const userPasswordRegex = /^(?=.*[0-9]).{8,25}$/
//         if ((!e.target.value || (userPasswordRegex.test(e.target.value)))) setUserPasswordError(false);
//         else setUserPasswordError(true);
//         setUserPassword(e.target.value);
//     };

//     const SignUpData = JSON.stringify({
//       userEmail:userEmail,
//       userPassword:userPassword,
//   })

//     const onClickSubmit = async (res) => {
//         try {
//           await axios.post(`${url}auth/signup`,SignUpData, { 
  
  
//           })
//           console.log('userdate', SignUpData)
//           console.log('res',res)
//         } catch (e) {
//             console.log('error', SignUpData)
//             console.log('res',res)
//         }
//       };


    
//     return (
    

//             <SignUpContainer>
//                <SignUpHeader>회원가입</SignUpHeader>
//                이메일
//                <input data-testid="email-input" placeholder="이메일을 입력하세요" type="email" name='userEmail' value={userEmail} onChange={onChangeUserEmail} />
//                {userEmailError && <div className="invalid-input">정확한 이메일을 입력해주세요</div>}
//                비밀번호
//                <input data-testid="password-input"  placeholder="비밀번호를 입력하세요" type="password" name='userPassword' vlaue={userPassword} onChange={onChangeUserPassword} />
//                {userPasswordError && <div className="invalid-input">비밀번호는 8자이상으로 입력해주세요</div>}
              
               
//                {(userEmailError || userPasswordError) ? <button data-testid="signup-button" disabled='disabled'>회원가입</button> : <button data-testid="signup-button" onClick={onClickSubmit}>회원가입</button>}
//             </SignUpContainer>

//     )


// }

// export default SignUp