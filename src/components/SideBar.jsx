import React from 'react';
import Menu from 'antd/es/menu';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import menuOptions from 'metadata/sideBarMenus';

const { SubMenu, ItemGroup, Divider, Item } = Menu;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: 0,
    marginBottom: 0,
  },
  logo: {
    position: 'absolute',
    left: 20,
    top:25
  },
  logo_s: {
    position: 'absolute',
    left: 10,
    top:30
  },
  logoTitle: {
    fontSize: 22,
  },
  avatarContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    height: 40,
  },
  avatar: {
    position: 'absolute',
    left: 10,
  },
  username: {
    fontSize: 16,
  },
  menu: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  item:{
    paddingLeft:12
  }
});

export default function SideBar({
  collapsed,
  activePage,
  username,
  tabs = [],
  menus = [],
}) {
  const nextMenuOptions = menuOptions
    .filter(({ key }) => tabs.find(tab => new RegExp(tab).test(key)))
    .map(({ children = [], ...rest }) => ({
      ...rest,
      children: children.filter(({ key: childKey }) =>
        menus.find(menu => new RegExp(menu).test(childKey)),
      ),
    }));

  // const shortUsername = username.split('/')[0];
  // const userAbbreviation = shortUsername.includes(' ')
  //   ? shortUsername
  //       .split(' ')
  //       .map(s => s[0].toUpperCase())
  //       .join('')
  //   : shortUsername[0].toUpperCase();

  const mode = collapsed ? 'vertical' : 'inline';
  const classes = useStyles({ collapsed });
  return (
    <div className={`${classes.root} base-margin-top`}>
      <div className={classes.logoContainer}>
        {!collapsed &&<img
          className={classes.logo}
          src="/images/logo_n.png"
          alt="logo"
          width="180px"
        />}
        {collapsed &&<img
          className={classes.logo_s}
          src="/images/logo_n.png"
          alt="logo"
          width="60px"
        />}
      </div>

      {/* <div className={classes.avatarContainer}>
        <div className={classes.avatar}>
          <UserAvatar userAbbreviation={userAbbreviation} />
        </div>
        {!collapsed && <div className={classes.username}>{shortUsername}</div>}
      </div> */}

      <Menu
        theme="dark"
        className="app-sidebar"
        selectedKeys={[activePage]}
        mode={mode}>
        {nextMenuOptions.map(({ key, icon, title, children = [] }) => {
          let isActive = children.some(child => child.key === activePage
          ||(child.child.length>0 &&
            child.child.map((key,index)=>{
              const flag = (child.child[index].key === activePage);
              return flag
            }).some(child=> child ===true)
          
          ));
          const menuItem = collapsed ? (
            <span className={`icon-5x ${icon} ${isActive ? 'active' : ''}`} />
          ) : (
            <div className={classes.menu}>
              <div
                className={`icon-5x ${icon} ${
                  isActive ? 'active' : ''
                } base-margin-right`}
              />
              {title}
            </div>
          );
          return (
            <SubMenu
              key={key}
              title={menuItem}
              >
              {collapsed ? (
                <ItemGroup title={title}>
                  <Divider />
                  {children.map(({ key, label,child=[] }) => (
                    child.length===0?
                    (
                      <Item key={key}>
                        <Link to={`/${key}`}>{label}</Link>
                      </Item>
                    ):(
                     child.map(({ key, label }) => (
                        <Item key={key}>
                          <Link to={`/${key}`}>{label}</Link>
                        </Item>
                      ))
                    )
                  ))}
                </ItemGroup>
              ) : (
                children.map(({ key, label, child=[] }) => (
                  child.length===0?
                  (
                    <Item key={key}>
                      <Link to={`/${key}`}><span className={classes.item}>{label}</span></Link>
                    </Item>
                  ):(
                    <SubMenu title={<div className={classes.menu}>{label}</div>} key={key}>
                      {child.map(({ key, label }) => (
                        <Item key={key}>
                          <Link to={`/${key}`}>{label}</Link>
                        </Item>
                      ))}
                    </SubMenu>
                  )
                ))
              )}
            </SubMenu>
          );
        })}
      </Menu>
    </div>
  );
}
