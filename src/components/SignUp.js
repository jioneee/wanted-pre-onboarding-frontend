import styled from 'styled-components'

const SignUpContainer = styled.div`
padding:20px;
display: flex;
flex-direction: column;
box-sizing: border-box;
width:200px;
color:black;
text-align: center;
align-items: center;

`

const SignUpHeader = styled.h1`
text-align: center;
`

const SignUp = () => {
    return (
    

            <SignUpContainer>
               <SignUpHeader>회원가입</SignUpHeader>
               이메일
               <input data-testid="email-input" place="이메일을 입력하세요" type="email"/>
               비밀번호
               <input data-testid="password-input"  place="비밀번호를 입력하세요" type="password"/>
              
               <button data-testid="signup-button">회원가입</button>
            </SignUpContainer>

    )


}

export default SignUp