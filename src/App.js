import PostsList from './features/posts/PostsList';
import AddPostForm from './features/posts/AddPostForm';
import { Routes, Route  } from 'react-router-dom'
import Layout from './components/Layout';
import SinglePost from './features/posts/SinglePost';
import EditPostForm from './features/posts/EditPostForm';
import UserPage from './features/users/UserPage';
import UserList from './features/users/UserList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index  element={<PostsList />} />
        <Route path='post'>
          <Route index element={<AddPostForm  />}/>
          <Route path=":postId" element={<SinglePost />}/>
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path='user'>
          <Route index element={<UserList  />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
