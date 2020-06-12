import React, { useState } from 'react';
import Layout from 'antd/es/layout';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import { makeStyles } from '@material-ui/styles';

import HeaderComp from './Header';
import SideBar from './SideBar';

import layoutConfig from 'metadata/layoutConfig';

const { Sider, Content } = Layout;

const useStyles = makeStyles({
  header: ({ collapsed }) => ({
    position: 'fixed',
    zIndex: 99,
    minWidth: 1080,
    padding: 0,
    width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 225px)',
    transition: 'all 0.2s',
  }),
  body: {
    marginTop: 80,
  },
});

export default function LayoutComp({
  children,
  location,
  username = '',
  tabs = [],
  menus = [],
}) {
  const [collapsed, setCollapsed] = useState(true);
  const activePage = location.pathname.slice(1);
  const classes = useStyles({ collapsed });
  return (
    <Layout className="app-layout">
      <Sider
        className={`app-sider ${collapsed && 'collapsed'}`}
        collapsed={collapsed}
        collapsible={true}
        onCollapse={(collapsed, type) => {
          setCollapsed(collapsed);
        }}>
        <SideBar
          tabs={tabs}
          menus={menus}
          activePage={activePage}
          username={username}
          collapsed={collapsed}
        />
      </Sider>

      <Layout>
        <Content className="app-body">
          <div className={classes.header} {...layoutConfig}>
            <HeaderComp activePage={activePage} />
          </div>
          <Col className={classes.body} {...layoutConfig}>
            <Row>{children}</Row>
          </Col>
        </Content>
      </Layout>
    </Layout>
  );
}
