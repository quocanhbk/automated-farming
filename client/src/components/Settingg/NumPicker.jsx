// eslint-disable-next-line
import styled from "styled-components"

const Container = styled.div`
    
    display: flex;
    width:100%;
    flex-direction: row;
    justify-content: center;

    & button {
        display: block;
        width: 20%;
        background: ${props => props.theme.color.fill.primary};
        color: ${props => props.theme.color.background.primary};
        text-align: center;
        border: none;
        outline: none;
        padding: 0.5rem 1rem;
        
        &:hover {
            background: grey;
        }
        justify-content:space-between;
    }
    & input[type='text']{
        width: 60%;
        text-align: center;
    }
        
    
    
`


const NumPicker = ({ num }) => {

    return (
        <Container>
            <button>-</button>
            <input type='text' value={num} disabled/>
            <button>+</button>
        </Container>

    )
}

export default NumPicker