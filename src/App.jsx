import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import { en } from 'react-intl/locale-data';

import { publicRoutes, privateRoutes } from './appRoutes';

import PrivateRoute from './components/PrivateRoute';
import Spinner from './components/Spinner';

import { LOGIN } from './constants/elementKeys';

import NotFoundPage from './modules/auth/NotFoundPage';

addLocaleData(en);

function App({ authenticated, views, tabs, menus, username }) {
  return (
    <HashRouter>
      <div id="app">
        <Spinner />
        <IntlProvider locale="en">
          <Switch>
            {publicRoutes.map(({ path, component: Component }) => (
              <Route
                exact
                key={path}
                path={path}
                render={props => (
                  <Suspense fallback={null}>
                    <Component {...props} />
                  </Suspense>
                )}
              />
            ))}
            {privateRoutes.map(({ Layout, subRoutes }, i) => (
              <Route
                exact
                key={i}
                path={subRoutes.map(({ path }) => path)}
                render={props =>
                  authenticated ? (
                    <Layout
                      tabs={tabs}
                      menus={menus}
                      username={username}
                      {...props}>
                      {subRoutes.map(({ path, component }) => (
                        <PrivateRoute
                          key={path}
                          path={path}
                          component={component}
                          authenticated={authenticated}
                          views={views}
                        />
                      ))}
                    </Layout>
                  ) : (
                    <Redirect to={`${LOGIN}`} />
                  )
                }></Route>
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </IntlProvider>
      </div>
    </HashRouter>
  );
}

const mapStateToProps = ({
  auth: { authenticated, views, tabs, menus, username },
}) => ({
  authenticated,
  views,
  tabs,
  menus,
  username,
});

export default connect(mapStateToProps)(App);
