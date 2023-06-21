import styled from 'styled-components'
import SignIn from '../components/SignIn'


const Container = styled.div`
margin: 0 auto;
box-sizing: border-box;
height: 550px;
width:450px;
border: 1px solid black;

`


const SignInPage = () => {
    return (
        <Container>
        <SignIn />
        </Container>
    )


}

export default SignInPage