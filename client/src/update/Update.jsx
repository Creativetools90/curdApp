import { Link, useParams , useNavigate } from "react-router-dom";
import "../addUser/AddUser.scss";
import { useEffect, useState } from "react";
import {toast} from  "react-hot-toast";
import axios from "axios";
const Update = () => {
    const [user,setUser] = useState({});
  const { id } = useParams();
  const Navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:3000/api/user/${id}`)
    .then((res)=>{
        setUser(res.data.findUser);
    })
    .catch((e)=>console.log("user not found",e));
  }, [id]);
  const HandleUpdate =(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const {user , email , pass} = Object.fromEntries(formData);
    axios.put(`http://localhost:3000/api/update/${id}`,{user,email,pass}).
    then((res)=>{
        toast.success(res.data.msg,{position: "top-right"});
        Navigate("/");
    })
    .catch((e)=>console.log("not update",e))
  }

  return (
    <div className="AddUser">
      <Link to={"/"}>Back</Link>
      <h1>Update</h1>
      <form onSubmit={HandleUpdate} >
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input type="text" name="user" id="user" defaultValue={user.user} placeholder="Name" />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" defaultValue={user.email} id="email" placeholder="Email" />
        </div>
        <div className="inputGroup">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default Update;
