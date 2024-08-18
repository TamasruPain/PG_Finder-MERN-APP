import React, { useState } from 'react'
import NavBar from '../NavBar';
import Footer from '../Footer';
import { MenuFoldOutlined, MenuUnfoldOutlined, AntDesignOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
import Profile from './Profile';

const { Header, Sider, Content } = Layout;

const UserProfile = () => {

    const breadcrumbItems = [
        { title: <Link to="/userDashboard" style={{ textDecoration: 'none' }}>Home</Link> },
        { title: "Profile" }
    ];

    const [collapsed, setCollapsed] = useState(false);
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
                        defaultSelectedKeys={['3']}
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

                    <Content style={{ margin: '24px 16px', padding: 24, minHeight: 510, background: colorBgContainer, borderRadius: borderRadiusLG }}>

                        <div>
                            <Profile />
                        </div>


                    </Content>
                </Layout>
            </Layout>
            <Footer />
        </>
    )
}

export default UserProfile
