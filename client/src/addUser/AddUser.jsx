import { Link , useNavigate } from "react-router-dom";
import "../addUser/AddUser.scss";
import axios from "axios";
import { useState } from "react";
import {toast} from  "react-hot-toast";
const AddUser = () => {
  const Navigate = useNavigate();
  const user = {
    user: "",
    email: "",
    pass: "",
  };
  const [users, setUsers] = useState(user);
  const HandleInput = (e) => {
    const {name , value} = e.target;
    setUsers({...users, [name]: value });
    
  };
  const HandleSubmit =  async (e)=>{
    e.preventDefault();
    try{
        await axios.post("http://localhost:3000/api/create",users)
        .then((res)=>{
            toast.success(res.data.msg,{position: "top-right"});
            Navigate("/");
        })
        .catch((e)=>console.log("user not create"));
    }catch(e){
        console.log("error",e);
    }
  }
  return (
    <div className="AddUser">
      <Link to={"/"}>Back</Link>
      <h1>AddUser</h1>
      <form onSubmit={HandleSubmit} >
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            onChange={HandleInput}
            name="user"
            id="user"
            placeholder="Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={HandleInput}
            name="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="textpassword"
            name="pass"
            id="pass"
            placeholder="Password"
            onChange={HandleInput}
          />
        </div>
        <div className="inputGroup">
          <button type="submit">ADD</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
