import styles from './Register.module.css'

import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const { createUser, error: authError, loading } = useAuthentication()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("")

        const user = {
            displayName, email, password
        }

        function validateEmail(email) {
            let re = /\S+@\S+\.\S+/;
            return re.test(email);
        }

        if (!validateEmail(email)) {
            setError("Invalid email!")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords must be the same!")
            return
        }

        const res = await createUser(user)

        console.log(res)
    }

    useEffect(() => {
        if (authError) {
            setError(authError)
        }
    }, [authError])

    return (
        <div className={styles.register}>
            <h1>Sign up to share!</h1>
            <p>Create your user and share your stories.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Name:</span>
                    <input type="text" name="displayName" id="displayName" placeholder="Username" required value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </label>
                <label>
                    <span>E-mail:</span>
                    <input type="email" name="email" id="email" placeholder="User e-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    <span>Password:</span>
                    <input type="password" name="password" id="password" placeholder="User password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                    <span>Password confirmation:</span>
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm your password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
                {!loading && <button className='btn'>Register</button>}
                {loading && <button className='btn' disabled>Wait...</button>}
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}

export default Register;