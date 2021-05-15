import styled from "styled-components"
import Header from "../Header"
import { getFader } from "../../utils/color"


const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
   
`
const Body = styled.div`
    flex: 1;
    padding: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    
`

const Button = styled.button`
    display: block;    
    width:100%;    
    background: ${props => props.theme.color.fill.primary};
    color: ${props => props.theme.color.background.primary};
    border: none;
    outline: none;
    padding: 0.5rem 0.5rem;
    border-radius: 0.5rem;
    gap: 0.5rem;
    &:hover {
        background: ${props => getFader(props.theme.color.fill.primary, 0.8)}
    }
`


const Wrapper = styled.div`
    
    display:flex;    
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.2rem;
    align-items:center;
    height:20%;
    
    & input {
        width:100%;        
        background: transparent;
        border: 1px solid ${props => props.theme.color.border.primary};
        padding: 0.5rem;
        border-radius: 0.5rem;
        outline: none;
        color: ${props => props.theme.color.text.primary};
        transition: border 0.15s ease-in-out;
        &:focus {
            border: 1px solid ${props => props.theme.color.fill.primary};
        }
        &::-ms-reveal,
        &::-ms-clear {
        display: none;        
        }
        text-align:center;
        font-size: large;
    }
`




const Watering = () => {
    return (
        <Container>
            <Header text={'Tưới cây thủ công'} />
            <Body>     
                                           
                <Wrapper>

                    <input type='text' placeholder="Nhập thời gian tưới..."/>                   
                
                
                    <Button >   Bắt đầu   </Button>
                    
                </Wrapper>

            </Body>
        </Container>
    )
}

export default Watering