import styles from './Login.module.css'

import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { logIn, error: authError, loading } = useAuthentication()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("")

        const user = {
            email, password
        }

        function validateEmail(email) {
            let re = /\S+@\S+\.\S+/;
            return re.test(email);
        }

        if (!validateEmail(email)) {
            setError("Invalid email!")
            return
        }

        const res = await logIn(user)

        console.log(res)
    }

    useEffect(() => {
        if (authError) {
            setError(authError)
        }
    }, [authError])

    return (
        <div className={styles.login}>
            <h1>Login!</h1>
            <p>Login to use the system.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>E-mail:</span>
                    <input type="email" name="email" id="email" placeholder="User e-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    <span>Password:</span>
                    <input type="password" name="password" id="password" placeholder="User password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                {!loading && <button className='btn'>Login</button>}
                {loading && <button className='btn' disabled>Wait...</button>}
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}

export default Login;