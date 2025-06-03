import User from "../components/User";
import { Link } from "react-router-dom";

const UserList = ({users}) => {


  return (
    <div>
      <h3>Users</h3>
      {users.map((user) => (
        <Link to={"/users/"+user.id}><User user={user} key={user.id} /></Link>
      ))}
    </div>
  );
};

export default UserList;
