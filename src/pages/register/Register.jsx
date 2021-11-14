import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './register.css';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hook';
import { routes } from '../../constants/routes';

const Register = observer(() => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const AuthStore = useStore('AuthStore');
  const history = useHistory();
  
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
      return;
    } 

    const user = {
      username: username.current.value,
      password: password.current.value,
      email: email.current.value,
    };
    const result = await AuthStore.action_register(user);
    result && history.push(routes.LOGIN);
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">DBMS ChatApp</h3>
          <span className="loginDesc">
            Connect with friends and the world around you.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox">
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
              minLength="6"
            />
            <button className="loginButton" type="submit" onClick={handleClick}>
              Sign Up
            </button>
          </form>
          <button className="loginRegisterButton">
            <Link to="/login">Log into Account</Link>
          </button>
        </div>
      </div>
    </div>
  );
});

export default Register;
