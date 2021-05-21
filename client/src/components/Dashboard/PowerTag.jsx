import styled from "styled-components"
import {getFader} from '../../utils/color'

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem    ;
    border-radius: 0.5rem;
    background: ${props => getFader(props.status === true ? props.theme.color.fill.success : props.status === false ? props.theme.color.fill.danger : props.theme.color.fill.warning, 0.1)};
    color: ${props => props.status === true ? props.theme.color.fill.success : props.status === false ? props.theme.color.fill.danger : props.theme.color.fill.warning};

    & p {
        margin-bottom: 0.1rem;
    }
`
const Led = styled.div`
    border-radius: 99px;
    background: ${props => props.status === true ? props.theme.color.fill.success : props.status === false ? props.theme.color.fill.danger : props.theme.color.fill.warning};
    width: 12px;
    height: 12px;
`

const PowerTag = ({status}) => {
    const genText = () => {
        switch (status) {
            case true:
                return 'Hệ thống đang bật'
            case false:
                return 'Hệ thống đang tắt'
            default:
                return 'Không xác định'
        }
    }
    
    return (
        <Container status={status}>
            <Led status={status}/>
            <p>{genText()}</p>
        </Container>
    )
}

export default PowerTag