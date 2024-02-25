
import { useSelector } from 'react-redux'
import PostsExcerpt from './PostsExcerpt'
import { selectPostIds, useGetPostsQuery } from './postsSlice'

const PostsList = () => {
    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery()

    const orderedPosts = useSelector(selectPostIds)
    let content
    if (isLoading){
        content = <p>Loading...</p>
    } else if (isSuccess){
        content = orderedPosts.map(postId => <PostsExcerpt key={postId} postId={postId} />)
    } else  if (isError){
        content = <p>{error}</p>
    }
  return (
    <section>
        <h2>Posts</h2>
        {content}
    </section>
  )
}

export default PostsList