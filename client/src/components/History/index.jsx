import styled from "styled-components"
import Header from "../Header"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`
const Body = styled.div`
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const History = () => {
    return (
        <Container>
            <Header text={'Xem lịch sử tưới'}/>
            <Body>
                Xem lịch sử tưới
            </Body>
        </Container>
    )
}

export default History