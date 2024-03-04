import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import LoginLogo from '../assets/icons/Your_App.svg' 
import '../assets/styles/Login.css'
import { handleSubmitClickedService } from "../service";

const Login = () => {
    const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmitClicked = (e) => {
		e.preventDefault()

        handleSubmitClickedService(email.password).then(result => {
            const token = result.accessToken
			localStorage.setItem("ozinshe_token", token)
            navigate("/") 
        })
	}

    useEffect(() => {
		const token_ = localStorage.getItem("ozinshe_token")

		if (token_) {
			navigate("/projects")
		}
	}, [navigate])

    return (
    <div className="login__section">
        <img src={LoginLogo} className="login__logo" alt=""/>
        <form onSubmit={handleSubmitClicked} className="login__form">
            <h2 className="login__form-header">Добро пожаловать</h2>
            <p className="login__form-description">Войдите в систему, чтобы продолжить</p>
            <div className="form_box">
                <input
                    className="input"
                    type="email"
                    minLength={4}
                    maxLength={50}
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />            
            </div>

            <div className="form_box">
                <input
                    className="input"
                    type="password"
                    minLength={4}
                    maxLength={50}
                    placeholder="Пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />            
            </div>
            <button className="submit__button" type="submit">Войти</button>
            <p className="login__footer">Забыли пароль?<Link className="login__footer-link">Восстановить</Link></p>
        </form>    
    </div>
    );
};

export default Login;