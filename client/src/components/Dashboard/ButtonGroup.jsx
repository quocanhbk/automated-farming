import styled from "styled-components"
import NavigateButton from "./NavigateButton"

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    border-top: 1px solid ${props => props.theme.color.border.primary};
    padding-top: 1rem;
`

const ButtonGroup = () => {
    return (
        <Container>
            <NavigateButton icon='humid' path='/humid' text='Cập nhật ngưỡng'/>
            <NavigateButton icon='history' path='/history' text='Xem lịch sử tưới'/>
            <NavigateButton icon='flower' path='/manual-watering' text='Tưới cây thủ công'/>
            <NavigateButton icon='setting' path='/setting' text='Điều chỉnh công suất'/>
            <NavigateButton icon='mode' path='/mode' text='Đổi chế độ tưới'/>
            <NavigateButton icon='power' path='/power' text='Bật/tắt hệ thống'/>
        </Container>
    )
}

export default ButtonGroup