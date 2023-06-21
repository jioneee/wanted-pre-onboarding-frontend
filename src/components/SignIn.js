import styled from 'styled-components'

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
    return (
    

            <SignInContainer>
               <SignInHeader>로그인</SignInHeader>
               이메일
               <input data-testid="email-input" place="이메일을 입력하세요" type="email" />
               비밀번호
               <input data-testid="password-input" place="비밀번호를 입력하세요" type="password" />
              
               <button data-testid="signin-button">로그인</button>
            </SignInContainer>

    )


}

export default SignIn