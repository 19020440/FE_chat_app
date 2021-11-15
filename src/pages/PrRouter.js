import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { routes } from '../constants/routes';
import Messenger from './messenger/Messenger';

const protectedRoutes = [
  {
    path: routes.MESSENGER,
    name: 'Messenger',
    component: Messenger,
  },
];

const PrRouter = observer((props) => {
  return (
    <Switch>
      {protectedRoutes.map((route, idx) => {
        return (
          route.component && (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              render={(props) => <route.component {...props} />}
            />
          )
        );
      })}
    </Switch>
  );
});

export default PrRouter;
