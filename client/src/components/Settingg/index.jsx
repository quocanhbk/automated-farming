import styled from "styled-components"
import Header from "../Header"
import { getFader } from "../../utils/color"
import NumPicker from "./NumPicker"

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
const MainContext = styled.div`
    display: flex;
    padding:0.7rem;
    width: 100%;
    border: 2px solid grey;    
    flex-direction: column;    
    border-radius: 0.2rem;
    gap: 0.5rem;
    
`

const Button = styled.button`
    display: block;    
    width:40%;
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
const LabelWrapper = styled.div`
    text-align: center;
    width: 100%;
    padding: 0.5rem;
    background: ${props => props.theme.color.background.secondary};
    color: ${props => props.theme.color.fill.primary};
    font-weight: 700;

`
const ElementWrapper = styled.div`
    
    display:flex;
    width: 100%;
    flex-direction: row;
    gap: 1rem;
    align-items:center;
    justify-content: center;
`
const ButtonWrapper = styled.div`
    
    display:flex;
    flex-direction: row;
    gap: 1rem;
    align-items:center;
    justify-content: space-between;
`
const Wrapper = styled.div`
    
    display:flex;
    flex-direction: column;
    gap: 1rem;
    align-items:center;
    justify-content: space-between;
`




const Settingg = () => {
    return (
        <Container>
            <Header text={'Điều chỉnh công suất'}/>
            <Body>
                <MainContext>
                    <Wrapper>
                        <LabelWrapper>
                            <label>Công suất máy bơm</label>
                        </LabelWrapper>
                        <ElementWrapper>
                            <NumPicker num='150' />
                        </ElementWrapper>
                    </Wrapper>
                </MainContext>
                <ButtonWrapper>
                    <Button >   Lưu   </Button>
                    <Button >   Hủy </Button>
                </ButtonWrapper>              
                
            </Body>
        </Container>
    )
}

export default Settingg