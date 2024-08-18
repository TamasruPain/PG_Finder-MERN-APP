import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import FloatingUpButton from '../FloatingUpButton'
import { Link, useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, AntDesignOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme, Breadcrumb } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuildingCircleArrowRight, faInbox, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { handleSuccess } from '../../utils';
const { Header, Sider, Content } = Layout;
// import axios from 'axios';

const UserDash = () => {
  
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('');
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('You are logged out !!');
    setTimeout(() => {
      navigate('/');
    }, 1000)
  }

  const [collapsed, setCollapsed] = useState(false);
  const breadcrumbItems = [
    { title: <Link to="/userDashboard" style={{ textDecoration: 'none' }}>Home</Link> }
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <NavBar />
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            items={[
              {
                key: '1',
                icon: <AntDesignOutlined />,
                label: <Link to="/userpropertylist" style={{ textDecoration: 'none' }}>Properties</Link>,
              },
              {
                key: '2',
                icon: <AntDesignOutlined />,
                label: <Link to="/customerqueries" style={{ textDecoration: 'none' }}>Enqueries</Link>,
              },
              {
                key: '3',
                icon: <AntDesignOutlined />,
                label: <Link to="/userprofile" style={{ textDecoration: 'none' }}>Profile</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,

            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>

          <Breadcrumb items={breadcrumbItems}
            style={{
              margin: '16px 0',
              padding: '0 24px',
            }}
          />

          <Content
            style={{
              margin: '24px 16px',
              padding: 5,
              minHeight: 510,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className='my-4'>
              <h1 align='center'>Welcome {loggedInUser}</h1>
            </div>
            <div className="p-5">
              <div className="row" >
                <div className="col-md-3 my-2">
                  <Link to="/userpropertylist" style={{ textDecoration: 'none' }}>
                    <div className="card">
                      <div className="card-body">
                        <div className='d-flex justify-content-center m-3'>
                          <FontAwesomeIcon icon={faBuildingCircleArrowRight} style={{ height: '100px', color: "#B197FC", }} />
                        </div>
                        <div className='d-flex justify-content-center m-3'>
                          <h4 className='card-title'> Your Properties </h4>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-md-3 my-2">
                  <Link to="/customerqueries" style={{ textDecoration: 'none' }}>
                    <div className="card">
                      <div className="card-body">
                        <div className='d-flex justify-content-center m-3'>
                          <FontAwesomeIcon icon={faInbox} style={{ height: '100px', color: "#B197FC", }} />
                        </div>
                        <div className='d-flex justify-content-center m-3'>
                          <h4 className='card-title'>Recived Enqueries</h4>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-md-3 my-2">
                  <Link to="/userprofile" style={{ textDecoration: 'none' }}>
                    <div className="card">
                      <div className="card-body">
                        <div className='d-flex justify-content-center m-3'>
                          <FontAwesomeIcon icon={faUser} style={{ height: '116px', color: "#B197FC", }} />
                        </div>
                        <div className='d-flex justify-content-center'>
                          <h4 className='card-title'>Your Profile</h4>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-md-3 my-2">
                  <div className="card">
                    <div className="card-body">
                      <div className='d-flex justify-content-center m-3'>
                        <FontAwesomeIcon icon={faPaperPlane} style={{ height: '116px', color: "#B197FC", }} />
                      </div>
                      <div className='d-flex justify-content-center'>
                        <h4 className='card-title'>contact us</h4>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
      <FloatingUpButton />
      <Footer />
    </>
  );
};

export default UserDash;
