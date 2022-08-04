import styles from './Error.module.css'
import { Link } from "react"

const Error = () => {
    return (
        <div className={styles.error_container}>
            <h2>Page not found</h2>
            <Link to="/" className="btn">Home</Link>
        </div>
    )
}

export default Error;