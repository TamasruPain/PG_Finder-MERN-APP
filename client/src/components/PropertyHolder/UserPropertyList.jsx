import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import FloatingUpButton from '../FloatingUpButton';
import { MenuFoldOutlined, MenuUnfoldOutlined, AntDesignOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faEye, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const { Header, Sider, Content } = Layout;

const UserPropertyList = () => {
    const [propHolder_ID, setPropHolder_ID] = useState('');
    const [properties, setProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        setPropHolder_ID(localStorage.getItem('propHolder_ID'));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4000/api/properties')
            .then(result => {
                // Filter properties based on propHolder_ID
                const filteredProperties = result.data.filter(property => property.propHolder_ID === propHolder_ID);
                setProperties(filteredProperties);
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch(err => {
                console.log(err);
                setLoading(false); // Set loading to false even if there's an error
            });
    }, [propHolder_ID]);

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this Property?");

        if (isConfirmed) {
            axios.delete('http://localhost:4000/api/properties/' + id)
                .then(res => {
                    console.log(res);
                    // Update the property list after deletion
                    setProperties(properties.filter(property => property._id !== id));
                })
                .catch(error => console.log(error));
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProperties = properties.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //ant_design Style
    const breadcrumbItems = [
        { title: <Link to="/userDashboard" style={{ textDecoration: 'none' }}>Home</Link> },
        { title: "Properties" }
    ];
    const [collapsed, setCollapsed] = useState(false);
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
                        defaultSelectedKeys={['1']}
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

                        <div className='container'>
                            <div className='row'>
                                <div className="col-md-4 my-2">
                                    <h4>Your Properties</h4>
                                </div>
                                <div className="col-md-2 my-2">
                                    <input
                                        type="text"
                                        placeholder="Search by Name"
                                        id='search'
                                        name='search'
                                        className="form-control"
                                        value={searchQuery}
                                        onChange={handleSearch} // Handle search input
                                    />
                                </div>
                                <div className="col-md-2 my-2">
                                    <button className="btn btn-outline-warning" onClick={() => setSearchQuery('')}>Clear</button>
                                </div>
                                <div className="col-md-4 my-2" align='right'>
                                    <Link to='/addProperty' className='btn btn-outline-primary'>
                                        <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#B197FC" }} />&nbsp; Add a Property
                                    </Link>
                                </div>
                            </div>

                            {loading ? (
                                <div align='center'>
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="row my-4">
                                    {
                                        filteredProperties.map((property) => (
                                            <div className="col-sm-4 mb-3" key={property._id}>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div align='right'>
                                                            <span className='text-muted' align='right'>{property.availability}</span>
                                                        </div>
                                                        <div className='my-3 col-md-10'>
                                                            <h4 className="card-title">{property.title}</h4>
                                                        </div>
                                                        <div className='my-4'>
                                                            <p className="card-text my-3"><b>Property Holder: </b> {property.propHolder}</p>
                                                            <p className="card-text my-3"><b>Location: </b> {property.city}, {property.state}</p>
                                                            <p className="card-text my-3"><b>PG Type: </b>{property.pgType}</p>
                                                        </div>
                                                        <h6>Price: Rs.{property.price}</h6>
                                                        <div className='p-1' align="right">
                                                            <Link to={`/viewProperty/${property._id}`} className="btn btn-outline-success mx-2 my-2"><FontAwesomeIcon icon={faEye} style={{ color: "#B197FC" }} /></Link>
                                                            <Link to={`/updateProperty/${property._id}`} className="btn btn-outline-primary mx-2 my-2"><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#B197FC" }} /></Link>
                                                            <button className='btn btn-outline-dark mx-2 my-2' onClick={() => handleDelete(property._id)}>
                                                                <FontAwesomeIcon icon={faTrashCan} style={{ color: "#B197FC" }} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )}

                        </div>

                    </Content>
                </Layout>
            </Layout>
            <FloatingUpButton />
            <Footer />
        </>
    );
}

export default UserPropertyList;
