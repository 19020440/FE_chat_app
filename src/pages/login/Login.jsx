import { useRef } from 'react';
import './login.css';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useStore } from '../../hook';
import { observer } from 'mobx-react-lite';
import { routes } from '../../constants/routes'

const Login = observer(() => {
  const AuthStore = useStore('AuthStore');

  const username = useRef();
  const password = useRef();

  const history = useHistory();
  const handleClick = async (e) => {
    e.preventDefault();
    const result = await AuthStore.action_login({
      username: username.current.value,
      password: password.current.value,
    });
    if (result) history.push(routes.MESSENGER);
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
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              type="text"
              required
              className="loginInput"
              ref={username}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit">
              Log In
            </button>
            <button className="loginRegisterButton">
              <Link to="/register">Create a New Account</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
});

export default Login;
