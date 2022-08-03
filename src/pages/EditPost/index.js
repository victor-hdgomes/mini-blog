import styles from './EditPost.module.css'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../contexts/AuthContext'
import { useFetchDocument } from "../../hooks/useFetchDocument"
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const EditPost = () => {
    const { id } = useParams()
    const { document: post } = useFetchDocument("posts", id)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState("")
    const [imagePreview, setImagePreview] = useState(image)

    useEffect(() => {
        if (image) {
            setImagePreview(image)
        }
    }, [image])

    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setBody(post.body)
            setImage(post.image)
            const textTags = post.tagsArray.join(", ")
            setTags(textTags)
        }
    }, [post])

    const { user } = useAuthValue()

    const { updateDocument, response } = useUpdateDocument("posts")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        setFormError("")

        // Validate image URL
        try {
            new URL(image)
        } catch (error) {
            setFormError("The image must be a URL.")
        }

        // Create tags array
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

        // Check all values
        if (!title || !image || !tags || !body) {
            setFormError("Please fill in all data.")
        }

        if (formError) return;

        const data = {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        }

        updateDocument(id, data)

        // Redirect to home page
        navigate("/dashboard")
    }

    return (
        <div className={styles.edit_post}>
            {
                !post && <p>Loading...</p>
            }
            {
                post && (
                    <>
                        <h2>Editing post: {post.title}</h2>
                        <p>Change the post data as you like.</p>
                        <form onSubmit={handleSubmit}>
                            <label>
                                <span>Title:</span>
                                <input type="text" name='title' required placeholder='Think of a good title' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </label>
                            <label>
                                <span>Image URL:</span>
                                <input type="text" name='image' required placeholder='Put the image that describes your post' value={image} onChange={(e) => setImage(e.target.value)} />
                            </label>
                            <p className={styles.preview_title}>Image preview:</p>
                            <img className={styles.image_preview} src={imagePreview} alt={post.title} />
                            <label>
                                <span>Body:</span>
                                <textarea name="body" id="body" required placeholder="Put post's body" value={body} onChange={(e) => setBody(e.target.value)} ></textarea>
                            </label>
                            <label>
                                <span>Tags:</span>
                                <input type="text" name='tags' required placeholder='Put tags by comma separator' value={tags} onChange={(e) => setTags(e.target.value)} />
                            </label>
                            {!response.loading && <button className='btn'>Edit</button>}
                            {response.loading && <button className='btn' disabled>Wait...</button>}
                            {response.error && <p className='error'>{response.error}</p>}
                            {formError && <p className='error'>{formError}</p>}
                        </form>
                    </>
                )
            }
        </div>
    )
}

export default EditPost;