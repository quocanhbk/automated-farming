import styled from "styled-components"
import Header from "../Header"
import BoundForm from "./BoundForm"
import { getFader } from '../../utils/color'
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    background: ${props => getFader(props.theme.color.fill.primary, 0.2)};
`
const Body = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`

const Humid = () => {
    return (
        <Container>
            <Header text={'Cập nhật ngưỡng'} />
            <Body>
                <BoundForm/>
            </Body>
        </Container>
    )
}

export default Humid