import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost, selectPostById, updatePost, useDeletePostMutation, useUpdatePostMutation } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

const EditPostForm = () => {
    const {postId} =  useParams()
    const navigate = useNavigate()

    const post =  useSelector((state) => selectPostById(state,Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] =  useState(post?.body)
    const [userId,  setUserId]  = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState('idle')

    const [updatePost, {isLoading}] = useUpdatePostMutation()
    const [deletePost] =  useDeletePostMutation()

    if (!post){
        return (
            <section>
                <h2>Post not Found</h2>
            </section>
        );
    }

    const onTitleChanged = e => setTitle(e.target.value)
    const onAuthorChanged = e => setUserId(Number(e.target.value))
    const onContentChanged  = e => setContent(e.target.value)

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle'

    const onSavePost = async () => {
        if  (canSave){
            try{
                await updatePost({id: post.id, title, body: content, userId}).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            }catch(err){
                console.error('Failed to update', err)
            }
        }
    }

    const usersOptions = users.map(user => {
        return (
            <option key={user.id} value={user.id}>{user.name}</option>
        )
    })

    const onDeletePost = async () =>  {
        try {
            await deletePost({id: post.id}).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch(err){
            console.err('Failed to delete', err)
        } finally{
            setRequestStatus('idle')
        }
    }
  return (
    <section>
        <h2>Edit Post</h2>
        <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePost}
                    disabled={!canSave}
                >
                    Save Post
                </button>
                <button className="deleteButton"
                    type="button"
                    onClick={onDeletePost}
                >
                    Delete Post
                </button>
            </form>
    </section>
  )
}

export default EditPostForm