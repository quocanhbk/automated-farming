import styled from "styled-components"
import Header from "../Header"
import BoundForm from "./BoundForm"

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





const Humid = () => {
    return (
        <Container>
            <Header text={'Cập nhật ngưỡng'} />
            <Body>
                
                <BoundForm upper='100' lower ='50' />
                
            </Body>
        </Container>
    )
}

export default Humid