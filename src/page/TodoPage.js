import styled from 'styled-components'
import Todo from '../components/Todo'
import { useNavigate } from 'react-router-dom'



const Container = styled.div`
margin: 0 auto;
box-sizing: border-box;
height: 550px;
width:450px;
border: 1px solid black;

`
const LogOutBtn = styled.button`
background-color: gray;
`



const TodoPage = () => {
    const navigate = useNavigate()
    const handleLogout=()=> {
        localStorage.clear()
        navigate('/signup')
        
    }
    return (
        <Container>
            <LogOutBtn onClick={handleLogout}>로그아웃</LogOutBtn>
            <Todo />
        </Container>
    )


}

export default TodoPage