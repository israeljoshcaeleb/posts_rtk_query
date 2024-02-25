import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'

const PostsExcerpt = ({postId}) => {
    const navigate = useNavigate()
    const post = useSelector(state => selectPostById(state, postId))
  return (
    <article onClick={() => navigate(`post/${post.id}`)}>
        <h3>{post.title}</h3>
        <p>{post.body.substring(0,75)}</p>
        <p className='postCredit'>
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
    </article>
  )
}

export default PostsExcerpt