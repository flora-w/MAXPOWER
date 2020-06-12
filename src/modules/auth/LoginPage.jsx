import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as REDUCERS from 'constants/reducerNames';
import * as ACTIONS from 'constants/actionTypes';
import { UserAgentApplication } from 'msal';
import Button from '@material-ui/core/Button';
import { Radio } from 'antd';
import env from 'environments/environment';

const { authorityHostUri, tenantId, clientId } = env;
const loginForm = [];

function LoginPage({ authenticated, entry, category, categoryChange}) {
  console.log(category)
  function handleOauth(e) {
    e.preventDefault();
    const msalConfig = {
      auth: {
        clientId,
        authority: `${authorityHostUri}/${tenantId}`,
        redirectUri: `${window.location.origin}`,
      },
    };

    const msalInstance = new UserAgentApplication(msalConfig);
    const loginRequest = { scopes: ['user.read'] };
    msalInstance.handleRedirectCallback(() => {});
    msalInstance.loginRedirect(loginRequest);
  }

  function handleAccount(){

  }

  function handleCategoryChange(e){
    console.log(e.target.value)
    categoryChange(e.target.value)
  }

  if (authenticated) {
    return <Redirect to={entry} />;
  }

  return (
    <div className="login">
      <div id="login_box">
        <div id="tab">
          <Radio.Group id="radio" defaultValue={category} buttonStyle="solid" onChange={handleCategoryChange}>
            <Radio.Button value="oauth">郵箱登錄</Radio.Button>
            <Radio.Button value="account">賬密登錄</Radio.Button>
          </Radio.Group>
        </div>
        {
          category==="oauth"&&<form id="login" key="login_oauth" style={{ textAlign: 'center' }} onSubmit={handleOauth}>
          <img className="user-icon" src="/images/user.png" alt="bg-img" />
          <div style={{ color: 'white', margin: '1.5em 0' }}>
            <span style={{ fontSize: '1.2em' }}></span>
          </div>
          <div>
            <Button
              className="login-button"
              type="submit"
              onClick={handleOauth}
              style={{
                margin: '2.5em auto',
                color: '#F0F0F0',
                border: '0.1em solid #F0F0F0',
                borderRadius: '0.3em',
                padding: '0.5em 1em',
            }}>
              <img
                className="azure-icon"
                src="/icons/azure.png"
                alt="azure-icon"
              />
              <span style={{ fontSize: '1.2em' }}>Login</span>
            </Button>
          </div>
        </form>
        }
        {
          category==="account"&&<form id="login" key="login_oauth" style={{ textAlign: 'center' }} onSubmit={handleOauth}>
          <img className="user-icon" src="/images/user.png" alt="bg-img" />
          <div style={{ color: 'white', margin: '1.5em 0' }}>
            <span style={{ fontSize: '1.2em' }}>
              
            </span>
          </div>
          <Button
              className="login-button"
              type="submit"
              onClick={handleAccount}
              style={{
                margin: '2.5em auto',
                color: '#F0F0F0',
                border: '0.1em solid #F0F0F0',
                borderRadius: '0.3em',
                padding: '0.5em 1em',
            }}>
              <span style={{ fontSize: '1.2em' }}>Login</span>
            </Button>
          </form>
        }
      </div>
      <div id="end_bar">
        <div
          id="misc"
          style={{ float: 'right', margin: '1em 2em 0 0', color: '#8a8a8a' }}>
          <span>© 2020 Wistron</span>
        </div>
      </div>
    </div>
  );
}

const loginCategoryChangeAction = payload => ({
  payload,
  type: ACTIONS.LOGIN_CATEGORY_CHANGE,
  target: REDUCERS.AUTH,
});

const mapStateToProps = ({ auth: { authenticated, entry, category } }) => ({
  authenticated,
  entry,
  category
});

const mapDispatchToProps = dispatch => ({
  categoryChange: payload => dispatch(loginCategoryChangeAction(payload)),
});

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);
