import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { Switch, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Loading from './components/loading/Loading';
import PrRouter from './pages/PrRouter';
import { loginStatuses } from './constants/configValues';
import { useStore } from './hook';
import './App.css';
import 'antd/dist/antd.css';
import { useEffect } from 'react';

const App = observer(() => {
  const AuthStore = useStore('AuthStore');
  const { login } = AuthStore;

  // TODO: add useEffect for conversations, update when userId change
  // TODO: socket events, use socketEvents.? from /constants/configValues.js

  return (
    <>
      <Switch>
        <Route path="/login">
          {login === loginStatuses.LOGINED ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {login === loginStatuses.LOGINED ? <Redirect to="/" /> : <Register />}
        </Route>
        <ProtectedRoute path="/" component={PrRouter} login={login} />
      </Switch>
    </>
  );
});

const ProtectedRoute = ({ login, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (login === loginStatuses.WAITING) {
          return <Loading isLoading={true} />;
        }
        if (login === loginStatuses.LOGINED) {
          return <Component />;
        }
        if (login === loginStatuses.ANONYMOUS) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};

export default App;
