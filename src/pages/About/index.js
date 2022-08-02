import styles from './About.module.css'
import { Link } from 'react-router-dom';

const About = () => {
    return(
        <div className={styles.about}>
            <h2>About Mini <span>Blog</span></h2>
            <p>This project consists of ReactJs on the frontend and firebase on the backend.</p>
            <Link to="/posts/create" className="btn">Create post</Link>
        </div>
    )
}

export default About;