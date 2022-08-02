import styles from './Header.module.css'
import { NavLink } from "react-router-dom"
// Authentication
import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthValue } from '../../contexts/AuthContext'

const Header = () => {
    const { user } = useAuthValue()
    const { logOut } = useAuthentication()

    return (
        <header>
            <nav className={styles.navbar}>
                <NavLink to="/" className={styles.brand}>
                    Mini <span>Blog</span>
                </NavLink>
                <ul className={styles.links_list}>
                    <li><NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>Home</NavLink></li>
                    {
                        !user && (
                            <>
                                <li><NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")}>Login</NavLink></li>
                                <li><NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : "")}>Register</NavLink></li>
                            </>
                        )
                    }
                    {
                        user && (
                            <>
                                <li><NavLink to="/posts/create" className={({ isActive }) => (isActive ? styles.active : "")}>New post</NavLink></li>
                                <li><NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : "")}>Dashboard</NavLink></li>
                            </>
                        )
                    }
                    <li><NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : "")}>About</NavLink></li>
                    {
                        user && (
                            <>
                                <li>
                                    <button onClick={logOut}>Log out</button>
                                </li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;