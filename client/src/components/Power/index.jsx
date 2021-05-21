import styled from "styled-components"
import Header from "../Header"
import Toggle from "../Toggle"
import {Switch} from '@material-ui/core'
import Redirector from "../Redirector"

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

    & .MuiSwitch-colorSecondary.Mui-checked {
        color: ${props => props.theme.color.fill.primary};
    }
`

const Power = () => {
    return (
        <Redirector>
            <Container>
                <Header text={'Bật/tắt hệ thống'}/>
                <Body>
                    <div>
                        <Toggle />
                        <Switch size="medium"/>
                    </div>
                    
                </Body>
            </Container>
        </Redirector>
    )
}

export default Power