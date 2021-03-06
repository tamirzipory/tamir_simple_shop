import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';

function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, err, users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const{
    loading: loadingDelete,
    err: errDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({type: USER_DETAILS_RESET});
  }, [dispatch, successDelete]);

  function deleteHandler(user){
  
    if(window.confirm('are you sure that you want to delete this user?')){
      dispatch(deleteUser(user._id));
    }
  }

    return (
        <div>
            <h1>Users</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errDelete && <MessageBox variant="danger">{errDelete}</MessageBox>}
            {successDelete && (
              <MessageBox variant="success">User deleted successfully</MessageBox>
            )}
            {loading ? (
                 <LoadingBox></LoadingBox> 
            ): err? (
                <MessageBox variant="danger">{err}</MessageBox>
            ):(
                <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>IS SELLER</th>
                    <th>IS ADMIN</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.isSeller ? 'YES' : ' NO'}</td>
                      <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                      <td>
                        <button 
                        type="button"
                        className="small"
                        onClick={() => props.history.push(`/user/${user._id}/edit`)}
                        >Edit
                        </button>
                        <button
                        type="buttun"
                        className="small"
                        onClick={() => deleteHandler(user)}
                        >Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
        }
        </div>
    )
}

export default UserListScreen
