import styles from './Search.module.css'

import { Link } from 'react-router-dom';

// HOOKS
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
// COMPONENTS
import PostDetail from '../../components/PostDetail'

const Search = () => {
    const query = useQuery()
    const search = query.get("q")

    const { documents: posts } = useFetchDocuments("posts", search)

    return (
        <div className={styles.search_container}>
            <h2>search</h2>
            <div>
                {
                    posts && posts.length === 0 && (
                        <div className={styles.noposts}>
                            <p>There are no tags with result "{search}".</p>
                            <Link to="/" className='btn btn-dark'>Back</Link>
                        </div>
                    )
                }
                {
                    posts && posts.map((post)=>(
                        <PostDetail key={post.id} post={post} />
                    ))
                }
            </div>
        </div>
    )
}

export default Search;