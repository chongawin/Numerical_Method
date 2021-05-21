import React, { useState } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { Menu, Input, Button } from 'antd';
import '../App.css';
import {
    CalculatorOutlined, ApartmentOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { round, det } from 'mathjs';
import axios from 'axios';

export default function Cramers_Rule() {
    const { Header, Sider, Content } = Layout;
    const { SubMenu } = Menu;
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
    const [openKeys, setOpenKeys] = React.useState(['sub1']);

    function componentDidMount() {
        let api;

        axios.get('http://localhost:8000/data/Cramers_Rule').then(res => {
            api = res.data;
            console.log("reply: ", api);
            setX11(api.x11);
            setX21(api.x21);
            setX31(api.x31);

            setX12(api.x12);
            setX22(api.x22);
            setX32(api.x32);

            setX13(api.x13);
            setX23(api.x23);
            setX33(api.x33);

            setAns1(api.ans1);
            setAns2(api.ans2);
            setAns3(api.ans3);
        });

    }

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const [X11, setX11] = useState();
    const [X21, setX21] = useState();
    const [X31, setX31] = useState();

    const [X12, setX12] = useState();
    const [X22, setX22] = useState();
    const [X32, setX32] = useState();

    const [X13, setX13] = useState();
    const [X23, setX23] = useState();
    const [X33, setX33] = useState();

    const [Ans1, setAns1] = useState();
    const [Ans2, setAns2] = useState();
    const [Ans3, setAns3] = useState();

    function refreshPage() {
        window.location.reload(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { X11, X12, X13, X21, X22, X23, X31, X32, X33, Ans1, Ans2, Ans3 };

        document.getElementById('X11').disabled = true;
        document.getElementById('X21').disabled = true;
        document.getElementById('X31').disabled = true;
        document.getElementById('X12').disabled = true;
        document.getElementById('X22').disabled = true;
        document.getElementById('X32').disabled = true;
        document.getElementById('X13').disabled = true;
        document.getElementById('X23').disabled = true;
        document.getElementById('X33').disabled = true;
        document.getElementById('Ans1').disabled = true;
        document.getElementById('Ans2').disabled = true;
        document.getElementById('Ans3').disabled = true;

        let x11 = parseFloat(blog.X11);
        let x21 = parseFloat(blog.X21);
        let x31 = parseFloat(blog.X31);

        let x12 = parseFloat(blog.X12);
        let x22 = parseFloat(blog.X22);
        let x32 = parseFloat(blog.X32);

        let x13 = parseFloat(blog.X13);
        let x23 = parseFloat(blog.X23);
        let x33 = parseFloat(blog.X33);

        let ans1 = parseFloat(blog.Ans1);
        let ans2 = parseFloat(blog.Ans2);
        let ans3 = parseFloat(blog.Ans3);


        let A = [
            [x11, x21, x31],
            [x12, x22, x32],
            [x13, x23, x33]
        ];
        A = round(det(A));

        let A1 = [
            [ans1, x21, x31],
            [ans2, x22, x32],
            [ans3, x23, x33]
        ];
        A1 = round(det(A1));

        let A2 = [
            [x11, ans1, x31],
            [x12, ans2, x32],
            [x13, ans3, x33]
        ];
        A2 = round(det(A2));

        let A3 = [
            [x11, x21, ans1],
            [x12, x22, ans2],
            [x13, x23, ans3]
        ];
        A3 = round(det(A3));

        let x1 = A1 / A, x2 = A2 / A, x3 = A3 / A;
        console.log("x1 =", x1, "x2 =", x2, "x3 =", x3);
        document.getElementById('x1').innerHTML = "X1 = " + x1;
        document.getElementById('x2').innerHTML = "X2 = " + x2;
        document.getElementById('x3').innerHTML = "X3 = " + x3;
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
                    <Menu mode="inline" onOpenChange={onOpenChange} theme="light" defaultOpenKeys={['sub2']}>
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
                        <div id="c2">
                            <h1 style={{ textAlign: 'center', paddingBottom: '20px', margin: 0 }}>Cramer's Rule Method</h1>
                            <div style={{ display: 'flex' }}>
                                <form id="Form2" onSubmit={handleSubmit}>
                                    <div style={{ marginBottom: 15 }}>
                                        <h4>Input Matrix and Answer</h4>
                                        <Input id="X11" size='middle' placeholder="X[11]" style={{ width: 60, margin: 2 }} value={X11} onChange={(e) => setX11(e.target.value)} />
                                        <Input id="X21" size='middle' placeholder="X[21]" style={{ width: 60, margin: 2 }} value={X21} onChange={(e) => setX21(e.target.value)} />
                                        <Input id="X31" size='middle' placeholder="X[31]" style={{ width: 60, margin: 2 }} value={X31} onChange={(e) => setX31(e.target.value)} />
                                        <Input id="Ans1" size='middle' placeholder="Ans" style={{ width: 60, marginLeft: 29 }} value={Ans1} onChange={(e) => setAns1(e.target.value)} />
                                        <br />
                                        <Input id="X12" size='middle' placeholder="X[12]" style={{ width: 60, margin: 2 }} value={X12} onChange={(e) => setX12(e.target.value)} />
                                        <Input id="X22" size='middle' placeholder="X[22]" style={{ width: 60, margin: 2 }} value={X22} onChange={(e) => setX22(e.target.value)} />
                                        <Input id="X32" size='middle' placeholder="X[32]" style={{ width: 60, margin: '2px 10px 2px 2px' }} value={X32} onChange={(e) => setX32(e.target.value)} />
                                        <h1 style={{ width: 20, display: 'contents' }}>=</h1>
                                        <Input id="Ans2" size='middle' placeholder="Ans" style={{ width: 60, marginLeft: 10 }} value={Ans2} onChange={(e) => setAns2(e.target.value)} />
                                        <br />
                                        <Input id="X13" size='middle' placeholder="X[13]" style={{ width: 60, margin: 2 }} value={X13} onChange={(e) => setX13(e.target.value)} />
                                        <Input id="X23" size='middle' placeholder="X[23]" style={{ width: 60, margin: 2 }} value={X23} onChange={(e) => setX23(e.target.value)} />
                                        <Input id="X33" size='middle' placeholder="X[33]" style={{ width: 60, margin: 2 }} value={X33} onChange={(e) => setX33(e.target.value)} />
                                        <Input id="Ans3" size='middle' placeholder="Ans" style={{ width: 60, marginLeft: 29 }} value={Ans3} onChange={(e) => setAns3(e.target.value)} />
                                    </div>
                                    <h4 style={{ marginTop: '10px' }}>Calculate</h4>
                                    <Button type="primary" size='large' htmlType={'submit'} style={{ backgroundColor: "#333333", borderColor: "#333333" }}>
                                        Submit
                                    </Button>
                                    <Button type="primary" size='large' onClick={refreshPage} style={{ marginLeft: 15, backgroundColor: "#333333", borderColor: "#333333" }}>
                                        Refresh
                                    </Button>
                                    <Button type="primary" size='large' onClick={componentDidMount} style={{ marginLeft: 15, backgroundColor: "#333333", borderColor: "#333333" }}>
                                        Sample
                                    </Button>
                                </form>
                                <div id='Answer'>
                                    <h1 id="x1" style={{ margin: '35px' }}></h1>
                                    <h1 id="x2" style={{ margin: '35px' }}></h1>
                                    <h1 id="x3" style={{ margin: '35px' }}></h1>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div >
    );
}