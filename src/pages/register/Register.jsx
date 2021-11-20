import axios from "axios";
import { useRef } from "react";
import {Link} from 'react-router-dom'
import "./register.css";
import { useHistory } from "react-router";
import {observer} from 'mobx-react-lite';
import {useStore} from '../../hook'
import  {showMessageError} from '../../helper/function'
 const Register = observer(() =>  {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const AuthStore = useStore('AuthStore');

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      showMessageError("Mật khẩu không trùng nhau!")
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      const result = await AuthStore.action_register(user);
      result && history.push("/login");
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton"><Link to="/login">Log into Account</Link></button>
          </form>
        </div>
      </div>
    </div>
  );
});
export default Register;
