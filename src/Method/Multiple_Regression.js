import React, { useState } from 'react';
import Largrange_Polynomials_Graph from '../components/Largrange_Polynomials_Graph';
import { Layout, Table } from 'antd';
import 'antd/dist/antd.css';
import { Menu, Input, Button } from 'antd';
import '../App.css';
import {
    CalculatorOutlined, ApartmentOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
const { regression } = require("multiregress");

export default function Multiple_Regression() {
    const { Header, Sider, Content } = Layout;
    const { SubMenu } = Menu;
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
    const [openKeys, setOpenKeys] = React.useState(['sub1']);

    const [x1, setX1] = useState();
    const [x2, setX2] = useState();
    const [fx, setFx] = useState();

    const [x10, setX10] = useState();
    const [x11, setX11] = useState();
    const [x12, setX12] = useState();
    const [x13, setX13] = useState();
    const [x14, setX14] = useState();
    const [x15, setX15] = useState();

    const [x20, setX20] = useState();
    const [x21, setX21] = useState();
    const [x22, setX22] = useState();
    const [x23, setX23] = useState();
    const [x24, setX24] = useState();
    const [x25, setX25] = useState();

    const [fx0, setFx0] = useState();
    const [fx1, setFx1] = useState();
    const [fx2, setFx2] = useState();
    const [fx3, setFx3] = useState();
    const [fx4, setFx4] = useState();
    const [fx5, setFx5] = useState();
    const [isSubmit, setSubmit] = useState(false);

    const columns = [
        {
            title: 'Point',
            dataIndex: 'point',
            key: 'point',
        },
        {
            title: 'x1',
            dataIndex: 'x1',
            key: 'x1',
        },
        {
            title: 'x2',
            dataIndex: 'x2',
            key: 'x2',
        },
        ,
        {
            title: 'y',
            dataIndex: 'y',
            key: 'y',
        },
    ];

    const data = [
        {
            key: '1',
            point: 1,
            x1: <Input id="x10" size='small' placeholder="x11" style={{ width: 60 }} value={x10} onChange={(e) => setX10(e.target.value)} />,
            x2: <Input id="x20" size='small' placeholder="x21" style={{ width: 60 }} value={x20} onChange={(e) => setX20(e.target.value)} />,
            y: <Input id="fx0" size='small' placeholder="y1" style={{ width: 60 }} value={fx0} onChange={(e) => setFx0(e.target.value)} />
        },
        {
            key: '2',
            point: 2,
            x1: <Input id="x11" size='small' placeholder="x12" style={{ width: 60 }} value={x11} onChange={(e) => setX11(e.target.value)} />,
            x2: <Input id="x21" size='small' placeholder="x22" style={{ width: 60 }} value={x21} onChange={(e) => setX21(e.target.value)} />,
            y: <Input id="fx1" size='small' placeholder="y2" style={{ width: 60 }} value={fx1} onChange={(e) => setFx1(e.target.value)} />
        },
        {
            key: '3',
            point: 3,
            x1: <Input id="x12" size='small' placeholder="x13" style={{ width: 60 }} value={x12} onChange={(e) => setX12(e.target.value)} />,
            x2: <Input id="x22" size='small' placeholder="x23" style={{ width: 60 }} value={x22} onChange={(e) => setX22(e.target.value)} />,
            y: <Input id="fx2" size='small' placeholder="y3" style={{ width: 60 }} value={fx2} onChange={(e) => setFx2(e.target.value)} />
        },
        {
            key: '4',
            point: 4,
            x1: <Input id="x13" size='small' placeholder="x14" style={{ width: 60 }} value={x13} onChange={(e) => setX13(e.target.value)} />,
            x2: <Input id="x23" size='small' placeholder="x24" style={{ width: 60 }} value={x23} onChange={(e) => setX23(e.target.value)} />,
            y: <Input id="fx3" size='small' placeholder="y4" style={{ width: 60 }} value={fx3} onChange={(e) => setFx3(e.target.value)} />
        },
        {
            key: '5',
            point: 5,
            x1: <Input id="x14" size='small' placeholder="x15" style={{ width: 60 }} value={x14} onChange={(e) => setX14(e.target.value)} />,
            x2: <Input id="x24" size='small' placeholder="x25" style={{ width: 60 }} value={x24} onChange={(e) => setX24(e.target.value)} />,
            y: <Input id="fx4" size='small' placeholder="y5" style={{ width: 60 }} value={fx4} onChange={(e) => setFx4(e.target.value)} />
        },
        {
            key: '6',
            point: 6,
            x1: <Input id="x15" size='small' placeholder="x16" style={{ width: 60 }} value={x15} onChange={(e) => setX15(e.target.value)} />,
            x2: <Input id="x25" size='small' placeholder="x26" style={{ width: 60 }} value={x25} onChange={(e) => setX25(e.target.value)} />,
            y: <Input id="fx5" size='small' placeholder="y6" style={{ width: 60 }} value={fx5} onChange={(e) => setFx5(e.target.value)} />
        }
    ];

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    function componentDidMount() {
        let api;

        axios.get('http://localhost:8000/data/Multiple_Regression').then(res => {
            api = res.data;
            console.log("reply: ", api);
            setFx0(api.fx0);
            setFx1(api.fx1);
            setFx2(api.fx2);
            setFx3(api.fx3);
            setFx4(api.fx4);
            setFx5(api.fx5);

            setX10(api.x10);
            setX11(api.x11);
            setX12(api.x12);
            setX13(api.x13);
            setX14(api.x14);
            setX15(api.x15);

            setX20(api.x20);
            setX21(api.x21);
            setX22(api.x22);
            setX23(api.x23);
            setX24(api.x24);
            setX25(api.x25);

            setX1(api.x1);
            setX2(api.x2);
        });

    }

    function refreshPage() {
        window.location.reload(false);
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        const blog = { x1, x2, fx0, fx1, fx2, fx3, fx4, fx5, x10, x11, x12, x13, x14, x15, x20, x21, x22, x23, x24, x25 };

        document.getElementById('fx0').disabled = true;
        document.getElementById('fx1').disabled = true;
        document.getElementById('fx2').disabled = true;
        document.getElementById('fx3').disabled = true;
        document.getElementById('fx4').disabled = true;
        document.getElementById('x10').disabled = true;
        document.getElementById('x11').disabled = true;
        document.getElementById('x12').disabled = true;
        document.getElementById('x13').disabled = true;
        document.getElementById('x14').disabled = true;

        document.getElementById('x20').disabled = true;
        document.getElementById('x21').disabled = true;
        document.getElementById('x22').disabled = true;
        document.getElementById('x23').disabled = true;
        document.getElementById('x24').disabled = true;

        let X1 = parseFloat(blog.x1);
        let X2 = parseFloat(blog.x2);

        let X10 = parseFloat(blog.x10);
        let X11 = parseFloat(blog.x11);
        let X12 = parseFloat(blog.x12);
        let X13 = parseFloat(blog.x13);
        let X14 = parseFloat(blog.x14);
        let X15 = parseFloat(blog.x15);

        let X20 = parseFloat(blog.x20);
        let X21 = parseFloat(blog.x21);
        let X22 = parseFloat(blog.x22);
        let X23 = parseFloat(blog.x23);
        let X24 = parseFloat(blog.x24);
        let X25 = parseFloat(blog.x25);

        let Fx0 = parseFloat(blog.fx0);
        let Fx1 = parseFloat(blog.fx1);
        let Fx2 = parseFloat(blog.fx2);
        let Fx3 = parseFloat(blog.fx3);
        let Fx4 = parseFloat(blog.fx4);
        let Fx5 = parseFloat(blog.fx5);
        let Fx;

        const result = regression([[X10, X20, Fx0], [X11, X21, Fx1], [X12, X22, Fx2], [X13, X23, Fx3], [X14, X24, Fx4], [X15, X25, Fx5]]);
        console.log(result);

        Fx = (result[2]*(X2**2))+(result[1]*X1)+result[0];
        setFx(Fx);
        document.getElementById('fx').innerHTML = "g" + "=" + Fx;
    }

    return (
        <div>
            <Layout>
                <Header id='header'>
                    <h1> <Link to="" style={{ color: 'white' }}><CalculatorOutlined /> Numerical</Link></h1>
                </Header>
            </Layout>
            <Layout style={{ marginTop: 64 }}>
                <Sider id="sider" width={300}>
                    <Menu mode="inline" onOpenChange={onOpenChange} theme="light" defaultOpenKeys={['sub4']}>
                        <SubMenu key="sub1" title="Root of Equations" icon={<ApartmentOutlined />}>
                            <Menu.Item key="1">
                                <Link to="/Bisection">Bisection Method</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/False_Position">False-Position Method</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/One_Point_Iteration"> One-Point Iteration Method</Link>
                            </Menu.Item>
                            <Menu.Item key="4"><Link to="/Newton_Raphson"> Newton-Raphson Method</Link></Menu.Item>
                            <Menu.Item key="5"><Link to="/Secant"> Secant Method</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title="Linear Algebraic Equation" icon={<ApartmentOutlined />}>
                            <Menu.Item key="6"><Link to="/Cramers_Rule">Cramer's Rule</Link></Menu.Item>
                            <Menu.Item key="7"><Link to="/Gauss_Elimination"> Gauss Elimination Method</Link></Menu.Item>
                            <Menu.Item key="8"><Link to="/Gauss_Jordan">Gauss-Jordan Method</Link></Menu.Item>
                            <Menu.Item key="10"><Link to="/LU_Decomposition">LU Decomposition Method</Link></Menu.Item>
                            <Menu.Item key="12"><Link to="/Jacobi_Iteration">Jacobi Iteration Method</Link></Menu.Item>
                            <Menu.Item key="13"><Link to="/Gauss_Seidel">Gauss-Seidel Iteration Method</Link></Menu.Item>
                            <Menu.Item key="14"><Link to="/Conjugate_Gradient">Conjugate Gradient Method</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title="Interpolation & Extrapolation" icon={<ApartmentOutlined />}>
                            <Menu.Item key="15"><Link to="Newton_Divide"> Newton's divided-diffrences</Link></Menu.Item>
                            <Menu.Item key="16"><Link to="Largrange_Polynomials">Largrange Polynomials</Link></Menu.Item>
                            <Menu.Item key="17"><Link to="Spline_Iterpolation">Spline Iterpolation</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" title="Least-Squares Regression" icon={<ApartmentOutlined />}>
                            <Menu.Item key="18"><Link to="Linear_Regression">Linear Regression</Link></Menu.Item>
                            <Menu.Item key="19"><Link to="Polynomial_Regression">Polynomial Regression</Link></Menu.Item>
                            <Menu.Item key="20"><Link to="Multiple_Regression">Multiple Linear Regression</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Content id="content">
                        <div id="c1" onSubmit={handleSubmit}>
                            <h1 style={{ textAlign: 'center', paddingBottom: '20px', margin: 0 }}>Multiple Linear Regression Method</h1>
                            <div style={{ display: 'flex' }}>
                                <form id="Form2" >
                                    <br /><br />
                                    <Table dataSource={data} columns={columns} />
                                    <h3>find g</h3>
                                    <Input id="x1" addonBefore="x1" size='middle' placeholder="input x1" style={{ width: 300 }} value={x1} onChange={(e) => setX1(e.target.value)} />
                                    <br /><br />
                                    <Input id="x2" addonBefore="x2" size='middle' placeholder="input x2" style={{ width: 300 }} value={x2} onChange={(e) => setX2(e.target.value)} />
                                    <br />
                                    <h4 style={{ marginTop: '10px' }}>Calculate</h4>
                                    <Button type="primary" size='large' htmlType={'submit'} onClick={() => { setSubmit(true) }} style={{ backgroundColor: "#333333", borderColor: "#333333" }}>
                                        Submit
                                    </Button>
                                    <Button type="primary" size='large' onClick={refreshPage} style={{ marginLeft: 15, backgroundColor: "#333333", borderColor: "#333333" }}>
                                        Refresh
                                    </Button>
                                    <Button type="primary" size='large' onClick={componentDidMount} style={{ marginLeft: 15, backgroundColor: "#333333", borderColor: "#333333" }}>
                                        Sample
                                    </Button>
                                </form>
                                <div >
                                    <div id='Answer4'>
                                        <h1>Answer</h1>
                                        <h1 id="fx" style={{ margin: '35px' }}></h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div >
    );
}