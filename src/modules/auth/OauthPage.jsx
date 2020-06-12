import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { LOGIN } from 'constants/actionTypes';
import { UNAUTHORIZED } from 'constants/elementKeys';

function OauthPage({
  login,
  authenticating,
  authenticated,
  entry,
  location: { pathname },
}) {
  useEffect(() => {
    const payload = pathname
      .slice(1)
      .split('&')
      .reduce((prev, curr) => {
        const [key, value] = curr.split('=');
        return { ...prev, [key]: value };
      }, {});

    login(payload);
  }, [pathname, login]);

  if (authenticated) {
    return <Redirect to={entry}></Redirect>;
  }

  if (!authenticating && !authenticated) {
    return <Redirect to={UNAUTHORIZED}></Redirect>;
  }

  return <div>Loading...</div>;
}

const mapStateToProps = ({
  auth: { authenticating, authenticated, entry },
}) => ({ authenticating, authenticated, entry });

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch({ payload, type: LOGIN }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OauthPage);
