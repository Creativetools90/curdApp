import { Link } from "react-router-dom";
import "./Home.scss";
import { useEffect, useState } from "react";
import {toast} from  "react-hot-toast";
import axios from "axios";
const Home = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const request = async () => {
      try {
        const req = await axios.get("http://localhost:8000/api/find");
        setUser(req.data.usersData);
        // console.log(req.data.usersData)
      } catch (err) {
        console.log("error", err);
      }
    };
    request();
  }, []);
  const handleDelete = async (e) => {
    await axios
      .delete(`http://localhost:3000/api/delete/${e}`)
      .then((res) => {
        setUser((prevUser)=>prevUser.filter((user)=>user._id!==e));
        toast.success(res.data.msg,{position: "top-right"});
      })                          
      .catch((e) => console.log("user not delete", e));
  };
  return (
    <div className="Home">
      <Link to={"/addUser"} className="AddUser">
        <button>Add User</button>
      </Link>
      <Link to={"/login"} className="AddUser">
        <button>login</button>
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user.map((e, index) => {
            return (
              <tr key={index}>
                <td> {e.user} </td>
                <td>{e.email}</td>
                <td>
                  <Link to={"/update/" + e._id}>
                    <button className="Update">Update</button>
                  </Link>
                  <button onClick={() => handleDelete(e._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
