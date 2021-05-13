import styled from "styled-components"
import { getFader } from "../../utils/color"

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`
const LoginWindow = styled.div`
    width: 80%;
    border: 2px solid ${props => props.theme.color.fill.primary};
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-radius: 0.5rem;
    overflow: hidden;
`
const FormControl = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & label {
        color: ${props => props.theme.color.fill.secondary};
    }

    & input {
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
    }
`
const Header = styled.div`
    text-align: center;
    padding: 0.5rem;
    background: ${props => props.theme.color.background.secondary};
    color: ${props => props.theme.color.fill.primary};
    font-weight: 700;
`
const FormWrapper = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`
const ButtonWrapper = styled.div`
    padding: 0 1rem 1rem 1rem;
    
    & button {
        display: block;
        width: 100%;
        background: ${props => props.theme.color.fill.primary};
        color: ${props => props.theme.color.background.primary};
        border: none;
        outline: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        &:hover {
            background: ${props => getFader(props.theme.color.fill.primary, 0.8)}
        }
    }
`
const WelcomeText = styled.div`
    font-size: 1.2rem;
    color: ${props => props.theme.color.fill.secondary};
    font-family: 'Paytone One';
`
const Login = () => {
    return (
        <Container>
            <WelcomeText>Welcome to Smiley Farm</WelcomeText>
            <LoginWindow>
                <Header>ĐĂNG NHẬP</Header>
                <FormWrapper>
                    <FormControl>
                        <label>Tên tài khoản</label>
                        <input type="text" spellCheck={false}/>
                    </FormControl>
                    <FormControl>
                        <label>Mật khẩu</label>
                        <input type="password"/>
                    </FormControl>
                </FormWrapper>
                <ButtonWrapper>
                    <button>Đăng nhập</button>
                </ButtonWrapper>
            </LoginWindow>
        </Container>
    )
}

export default Login