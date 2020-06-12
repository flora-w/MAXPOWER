import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({
  authenticated,
  views,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => {
        if (!authenticated) {
          return <Redirect to="/" />;
        }
        return views.find(view =>
          new RegExp(view).test(props.location.pathname),
        ) ? (
          <Suspense fallback={null}>
            <Component {...props} />
          </Suspense>
        ) : (
          <Redirect to="/unauthorized" />
        );
      }}
    />
  );
}
