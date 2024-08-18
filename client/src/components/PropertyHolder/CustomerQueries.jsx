import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../NavBar';
import Footer from '../Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEye } from '@fortawesome/free-solid-svg-icons';
import FloatingUpButton from '../FloatingUpButton';
import { MenuFoldOutlined, MenuUnfoldOutlined, AntDesignOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { format } from 'date-fns';

const { Header, Sider, Content } = Layout;

const CustomerQueries = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [queries, setQueries] = useState([]);
  const [properties, setProperties] = useState([]);
  const [propHolder_ID, setPropHolder_ID] = useState('');

  useEffect(() => {
    setPropHolder_ID(localStorage.getItem('propHolder_ID'));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:4000/api/properties')
      .then(result => setProperties(result.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:4000/api/query')
      .then(result => {
        const filterQueries = result.data.filter(query => query.propHolder_ID===propHolder_ID);
        setQueries(filterQueries);
      })
      .catch(err => console.log(err));
  }, [propHolder_ID]);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Query?");
    if (isConfirmed) {
      axios.delete('http://localhost:4000/api/query/' + id)
        .then(res => {
          console.log(res);
          window.location.reload();
        })
        .catch(error => console.log(error));
    }
  };

  const breadcrumbItems = [
    { title: <Link to="/userDashboard" style={{ textDecoration: 'none' }}>Home</Link> },
    { title: "Enquiries" }
  ];

  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  return (
    <>
      <NavBar />
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['2']}
            items={[
              {
                key: '1',
                icon: <AntDesignOutlined />,
                label: <Link to="/userpropertylist" style={{ textDecoration: 'none' }}>Properties</Link>,
              },
              {
                key: '2',
                icon: <AntDesignOutlined />,
                label: <Link to="/customerqueries" style={{ textDecoration: 'none' }}>Enquiries</Link>,
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
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
          </Header>
          <Breadcrumb
            items={breadcrumbItems}
            style={{ margin: '16px 0', padding: '0 24px' }}
          />
          <Content style={{ margin: '24px 16px', padding: 24, minHeight: 510, background: colorBgContainer, borderRadius: borderRadiusLG }}>
            <div className='container'>
              <div className='row'>
                <div className="col-md-4 my-2">
                  <h4>Customer Queries</h4>
                </div>
              </div>
              <div className="row my-4">
                {queries.map(query => {
                  const property = properties.find(property => property._id === query.propertyID);
                  return (
                    <div className="col-sm-4 mb-3" key={query._id}>
                      <div className="card">
                        <div className="card-body">
                          <div align="right">
                            <label className='text-muted'>{format(new Date(query.createdAt), 'dd-MM-yyyy')}</label>
                          </div>

                          <div>
                            <h5 className="card-text"><b>Customer: </b>{query.customerName}</h5>
                          </div>
                          <div className='my-4'>

                            <p className="card-text">Query on <b> {property ? property.title : "Property not found"} </b> Property</p>
                            <p className="card-text"><b>Customer Email/Phone: <br></br></b>{query.customerEmail}/{query.customerNumber}</p>
                          </div>
                          <div className='p-1' align="right">
                            <Link to={`/viewQuery/${query._id}`} className="btn btn-outline-success mx-2">
                              <FontAwesomeIcon icon={faEye} style={{ color: "#B197FC" }} />
                            </Link>
                            <button className='btn btn-outline-dark mx-2' onClick={() => handleDelete(query._id)}>
                              <FontAwesomeIcon icon={faTrashCan} style={{ color: "#B197FC" }} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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

export default CustomerQueries;