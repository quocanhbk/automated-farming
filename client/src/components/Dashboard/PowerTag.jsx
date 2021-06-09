import styled from "styled-components"
import {getFader} from '../../utils/color'

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem    ;
    border-radius: 0.5rem;
    background: ${props => getFader(props.status ? props.theme.color.fill.success : props.theme.color.fill.danger, 0.1)};
    color: ${props => props.status ? props.theme.color.fill.success : props.theme.color.fill.danger};

    & p {
        margin-bottom: 0.1rem;
    }
`
const Led = styled.div`
    border-radius: 99px;
    background: ${props => props.status ? props.theme.color.fill.success : props.theme.color.fill.danger};
    width: 12px;
    height: 12px;
`

const PowerTag = ({status}) => {
    const genText = () => {
        if (status) return "Hệ thống đang bật"
        else return "Hệ thống đang tắt"
    }
    
    return (
        <Container status={status}>
            <Led status={status}/>
            <p>{genText()}</p>
        </Container>
    )
}

export default PowerTag