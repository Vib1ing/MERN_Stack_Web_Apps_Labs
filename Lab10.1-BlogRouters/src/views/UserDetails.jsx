import { useParams } from "react-router-dom"
const UserDetails = ({users}) => {
    const params=useParams();
    const id=params.id
    const user=users.find(u=>u.id==id);
    if(!user){
        return <p>NO USER FOUND :(</p>
    }
  return (
    <div>
        <div>Name: {user.name}</div>
        <div>Username: {user.username}</div>
        <div>Number of Comments: {user.numberOfBlogs}</div>
    </div>
  )
}

export default UserDetails;