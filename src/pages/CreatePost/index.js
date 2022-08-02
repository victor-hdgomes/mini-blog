import styles from './CreatePost.module.css'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../contexts/AuthContext'
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState("")

    const { user } = useAuthValue()

    const { insertDocument, response } = useInsertDocument("posts")

    const handleSubmit = (e) => {
        e.preventDefault()

        setFormError("")

        // Validate image URL

        // Create tags array

        // Check all values

        insertDocument({
            title,
            image,
            body,
            tags,
            uid: user.uid,
            createdBy: user.displayName
        })

        // Redirect to home page

    }

    return (
        <div className={styles.create_post}>
            <h2>Create post</h2>
            <p>Describe what you want and share your knowledge.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Title:</span>
                    <input type="text" name='title' required placeholder='Think of a good title' value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    <span>Image URL:</span>
                    <input type="text" name='image' required placeholder='Put the image that describes your post' value={image} onChange={(e) => setImage(e.target.value)} />
                </label>
                <label>
                    <span>Body:</span>
                    <textarea name="body" id="body" required placeholder="Put post's body" value={body} onChange={(e) => setBody(e.target.value)} ></textarea>
                </label>
                <label>
                    <span>Tags:</span>
                    <input type="text" name='tags' required placeholder='Put tags by comma separator' value={tags} onChange={(e) => setTags(e.target.value)} />
                </label>
                {!response.loading && <button className='btn'>Create</button>}
                {response.loading && <button className='btn' disabled>Wait...</button>}
                {response.error && <p className='error'>{response.error}</p>}
            </form>
        </div>
    )
}

export default CreatePost;