import { useState } from "react"
import styled from "styled-components"
import { getFader } from "../../utils/color"
import axios from 'axios'
import { useStoreActions } from "easy-peasy"

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
    gap: 0rem;
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
    padding: 0 1rem 0.5rem 1rem;
    
    & button {
        display: block;
        width: 100%;
        background: ${props => props.theme.color.fill.primary};
        color: ${props => props.theme.color.background.primary};
        border: none;
        outline: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        &:hover {
            background: ${props => getFader(props.theme.color.fill.primary, 0.8)}
        }
    }
    & .error-message {
        color: ${props => props.theme.color.text.danger};
        height: 1.5rem;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    & .mode {
        font-style: italic;
        text-decoration: underline;
        cursor: pointer;
        color: ${props => props.theme.color.fill.secondary};
        text-align: right;
        font-size: 0.9rem;
        margin-top: 0.2rem;
    }
`
const WelcomeText = styled.div`
    font-size: 1.2rem;
    color: ${props => props.theme.color.fill.secondary};
    font-family: 'Paytone One';
`

const Login = () => {
    const setUsername = useStoreActions(state => state.setUsername)
    const [isLogin, setIsLogin] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const [data, setData] = useState({
        username: "",
        password: ""
    })

    const handleChange = (field, e) => {
        setData({...data, [field]: e.target.value})
        if (errorMessage !== "") setErrorMessage("")
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter")
            submitForm()
    }
    const submitForm = async () => {
        if (data.username === "") {
            handleError('no_username')
            return
        }
        else if (data.password === "") {
            handleError('no_password')
            return
        }
        let path = isLogin ? '/api/auth/login' : '/api/auth/signup'
        let returnData = (await axios.post(path, {username: data.username, password: data.password})).data
        if (returnData.error)
            handleError(returnData.error)
        else if (returnData.username)
            setUsername(returnData.username)
    }
    const changeMode = () => {
        setData({username: "", password: ""})
        setErrorMessage("")
        setIsLogin(!isLogin)
    }
    const handleError = (message) => {
        if (message === "invalid_username")
            setErrorMessage("Tài khoản không hợp lệ")
        else if (message === "wrong_password")
            setErrorMessage("Sai mật khẩu")
        else if (message === "existed_username")
            setErrorMessage("Tên tài khoản đã tồn tại")
        else if (message === "no_username")
            setErrorMessage("Chưa nhập tên tài khoản")
        else if (message === "no_password")
            setErrorMessage("Chưa nhập mật khẩu")
    }
    return (
        <Container>
            <WelcomeText>Welcome to Smiley Farm</WelcomeText>
            <LoginWindow>
                <Header>{isLogin ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}</Header>
                <FormWrapper>
                    <FormControl>
                        <label>Tên tài khoản</label>
                        <input type="text" spellCheck={false} value={data.username} onChange={e => handleChange("username", e)}/>
                    </FormControl>
                    <FormControl>
                        <label>Mật khẩu</label>
                        <input type="password" value={data.password} onChange={e => handleChange("password", e)} onKeyDown={handleKeyDown}/>
                    </FormControl>
                </FormWrapper>
                <ButtonWrapper>
                    <div className="error-message">{errorMessage}</div>
                    <button onClick={submitForm}>{isLogin ? "Đăng nhập" : "Đăng ký"}</button>
                    <div className="mode" onClick={changeMode}>{isLogin ? "Đăng ký" : "Đăng nhập"}</div>
                </ButtonWrapper>
            </LoginWindow>
        </Container>
    )
}

export default Login