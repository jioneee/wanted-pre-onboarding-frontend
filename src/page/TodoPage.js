import styled from 'styled-components'
import Todo from '../components/Todo'


const Container = styled.div`
margin: 0 auto;
box-sizing: border-box;
height: 550px;
width:450px;
border: 1px solid black;

`


const TodoPage = () => {
    return (
        <Container>
            <Todo />
        </Container>
    )


}

export default TodoPage