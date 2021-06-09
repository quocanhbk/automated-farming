import { useState } from "react"
import styled, { keyframes } from "styled-components"
import { getFader } from "../../utils/color"
import axios from 'axios'
import { useStoreActions } from "easy-peasy"
import {FaReact} from 'react-icons/fa'


const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: ${props => getFader(props.theme.color.fill.primary, 0.2)};
`
const LoginWindow = styled.form`
    width: 80%;
    border: 2px solid ${props => props.theme.color.fill.primary};
    display: flex;
    flex-direction: column;
    gap: 0rem;
    border-radius: 0.5rem;
    overflow: hidden;
    background: ${props => props.theme.color.background.primary};
    position: relative;
`
const FormControl = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & label {
        color: ${props => props.theme.color.fill.secondary};
    }

    & input {
        letter-spacing: 1px;
        background: transparent;
        border: 1px solid ${props => props.theme.color.border.primary};
        padding: 0.5rem;
        border-radius: 0.5rem;
        outline: none;
        color: ${props => props.theme.color.fill.primary};
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
        position: relative;
        margin-bottom: 0.2rem;
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
const spin = keyframes`
    from {transform: rotate(0deg)}
    to {transform: rotate(360deg)}
`
const Loader = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.color.fill.danger};
    & .auth-spin {
        animation: ${spin} 0.75s linear 0s infinite normal forwards;
    }
`

const Login = () => {
    const setUsername = useStoreActions(state => state.setUsername)
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [data, setData] = useState({
        username: "",
        password: ""
    })

    const handleChange = (field, e) => {
        setData({...data, [field]: e.target.value})
        if (errorMessage !== "") setErrorMessage("")
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
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (data.username === "") {
            handleError('no_username')
            return
        }
        else if (data.password === "") {
            handleError('no_password')
            return
        }
        setLoading(true)
        let path = isLogin ? '/api/auth/login' : '/api/auth/signup'
        let returnData = (await axios.post(path, {username: data.username, password: data.password})).data
        if (returnData.error) {
            setLoading(false)
            handleError(returnData.error)
        } 
        else if (returnData.username) {
            setLoading(false)
            setUsername(returnData.username)
        }
    }
    return (
        <Container>
            <WelcomeText>Welcome to Smiley Farm</WelcomeText>
            <LoginWindow onSubmit={handleSubmit}>
         
                <Header>{isLogin ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}</Header>
                <FormWrapper>
                    <FormControl>
                        <label>Tên tài khoản</label>
                        <input type="text" spellCheck={false} value={data.username} onChange={e => handleChange("username", e)}/>
                    </FormControl>
                    <FormControl>
                        <label>Mật khẩu</label>
                        <input type="password" value={data.password} onChange={e => handleChange("password", e)}/>
                    </FormControl>
                </FormWrapper>
                <ButtonWrapper>
                    <div className="error-message">
                        {loading && 
                        <Loader>
                            <FaReact size="1.2rem" className="auth-spin"/>
                        </Loader>}
                        {errorMessage}
                    </div>
                    <button>{isLogin ? "Đăng nhập" : "Đăng ký"}</button>
                    <div className="mode" onClick={changeMode}>{isLogin ? "Đăng ký" : "Đăng nhập"}</div>
                </ButtonWrapper>
            </LoginWindow>
        </Container>
    )
}

export default Login