import styled from "styled-components"
import Header from "../Header"
import Redirector from '../Redirector'
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

const Mode = () => {
    return (
        <Redirector>
            <Container>
                <Header text={'Đổi chế độ tưới'}/>
                <Body>
                    Đổi chế độ tưới
                </Body>
            </Container>
        </Redirector>

    )
}

export default Mode