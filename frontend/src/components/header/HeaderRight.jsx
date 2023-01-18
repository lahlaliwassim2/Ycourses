import { Link } from "react-router-dom";
import {useSelector} from 'react-redux' 
import { useState } from "react";
const HeaderRight = () => {
  const { user } = useSelector(state => state.auth)

  const [dropdown,setDropDown] = useState(false);


  return (
    <div className="header-right">
      {user ?
      (<>
       <div className="header-right-user-info">
       <span onClick={()=>  setDropDown(!dropdown)  }
        className="header-right-username">
          {user?.username}
        </span>
        <img src={user?.profilePhoto.url} alt="UserPhoto" className="header-right-user-photo"/>
       {dropdown && (
         <div className="header-drop">
         <Link to={`/profile/${user?._id}`} className="header-drop-item" >
          <i className="bi bi-file-person"></i>
          <span>Profil</span>
         </Link>
         <div to={`/profile/${user?._id}`} className="header-drop-item" >
            <i className="bi bi-box-arrow-in-left"></i>
            <span>Logout</span>
         </div>
        </div>
       )}
       </div>
      </>):
      (
      <>
      <Link className="header-right-link" to="/login">
      <i className="bi bi-box-arrow-in-right"></i>
      <span>Login</span>
    </Link>
    <Link className="header-right-link" to="/register">
      <i className="bi bi-person-plus"></i>
      <span>Register</span>
    </Link>
      </>)  
    }
    </div>
  );
};

export default HeaderRight;
