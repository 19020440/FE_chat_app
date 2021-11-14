import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const routes = [];

const PrRouter = observer((props) => {
  return (
    <Switch>
      {routes.map((route, idx) => {
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
