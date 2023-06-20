import styled from 'styled-components'
import SignUp from '../components/SignUp'


const Container = styled.div`
margin: 0 auto;
box-sizing: border-box;
height: 550px;
width:450px;
border: 1px solid black;

`


const SignUpPage = () => {
    return (
        <Container>
        <SignUp />
        </Container>
    )


}

export default SignUpPage