import React, { useState } from 'react';
import Secant_Graph from '../components/Secant_Graph';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { Menu, Input, Button } from 'antd';
import '../App.css';
import {
    CalculatorOutlined, ApartmentOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { compile, abs, round } from 'mathjs';
import axios from 'axios';

export default function Secant() {
    const { Header, Sider, Content } = Layout;
    const { SubMenu } = Menu;
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
    const [openKeys, setOpenKeys] = React.useState(['sub1']);
    const arr1 = [];
    const arr2 = [];
    const arr3 = [];
    const arr4 = [];

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const [fx, setFunction] = useState();
    const [X0, setX0] = useState();
    const [X1, setX1] = useState();
    const [isSubmit, setSubmit] = useState(false);

    function componentDidMount() {
        let api;

        axios.get('http://localhost:8000/data/Secant').then(res => {
            api = res.data;
            console.log("reply: ", api);
            setFunction(api.fx);
            setX0(api.x0);
            setX1(api.x1);
        });

    }

    function refreshPage() {
        window.location.reload(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { fx, X0, X1 };
        document.getElementById('fx').disabled = true;
        document.getElementById('X0').disabled = true;
        document.getElementById('X1').disabled = true;

        let i = 1;
        let a = 1;
        let a1 = [];
        let x0 = parseFloat(blog.X0);
        let x1 = parseFloat(blog.X1);
        let fx0, fx1, xnew;

        fx0 = compile(fx).evaluate({ x: x0 });
        fx1 = compile(fx).evaluate({ x: x1 });

        xnew = (((x0 * fx1) - (x1 * fx0)) / (fx1 - fx0));
        x0 = x1;
        x1 = xnew;

        while (a > 0.001) {
            arr2.push(x0);
            arr3.push(x1);
            arr4.push(xnew);
            a = abs(x1 - x0 / x1);
            a1[i] = a;
            console.log("iteration", i, "epsilon =", round(a, 6));
            fx0 = compile(fx).evaluate({ x: x0 });
            fx1 = compile(fx).evaluate({ x: x1 });

            xnew = (((x0 * fx1) - (x1 * fx0)) / (fx1 - fx0));
            console.log(xnew);
            x0 = x1;
            x1 = xnew;
            arr1.push(i);
            output();
            i = i + 1;
            if (a1[i - 2] == a1[i - 1]) {
                break;
            }
        }
    }
    function output() {
        let newDiv1 = document.createElement('div');
        let newDiv2 = document.createElement('div');
        let newDiv3 = document.createElement('div');
        let newDiv4 = document.createElement('div');

        console.log(arr1);
        console.log(arr2);
        console.log(arr3);
        console.log(arr4);

        newDiv1.innerHTML = "<h4 style='margin-left:60px;text-align:center ;'>" + arr1[arr1.length - 1] + "</h4>";
        document.getElementById('out-iteration').appendChild(newDiv1);


        newDiv2.innerHTML = "<h4 style='margin-left:70px;text-align:center ;'>" + round(arr2[arr2.length - 1], 6) + "</h4>";
        document.getElementById('out-X0').appendChild(newDiv2);


        newDiv3.innerHTML = "<h4 style='margin-left:40px;text-align:center ;'>" + round(arr3[arr3.length - 1], 6) + "</h4>";
        document.getElementById('out-X1').appendChild(newDiv3);


        newDiv4.innerHTML = "<h4 style='margin-left:40px;text-align:center ;'>" + round(arr4[arr4.length - 1], 6) + "</h4>";
        document.getElementById('out-Xnew').appendChild(newDiv4);


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
                    <Menu mode="inline" onOpenChange={onOpenChange} theme="light" defaultOpenKeys={['sub1']}>
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
                        <SubMenu key="sub4" title="Least-Square Regression" icon={<ApartmentOutlined />}>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Content id="content">
                        <div id="c1">
                            <h1 style={{ textAlign: 'center', paddingBottom: '20px', margin: 0 }}>Secant Method</h1>
                            <div style={{ display: 'flex' }}>
                                <form id="Form" onSubmit={handleSubmit}>
                                    <Input id="fx" addonBefore="F(x)" size='small' placeholder="input F(x)" style={{ width: 300 }} value={fx} onChange={(e) => setFunction(e.target.value)} />
                                    <br /><br />
                                    <Input id="X0" addonBefore="X0" size='small' placeholder="input X0" style={{ width: 300 }} value={X0} onChange={(e) => setX0(e.target.value)} />
                                    <br /><br />
                                    <Input id="X1" addonBefore="X1" size='small' placeholder="input X1" style={{ width: 300 }} value={X1} onChange={(e) => setX1(e.target.value)} />
                                    <br />
                                    <h4 style={{ marginTop: '10px' }}>Create Graph</h4>
                                    <Button type="primary" size='large' htmlType={'submit'} onClick={() => setSubmit(true)} style={{ backgroundColor: "#333333", borderColor: "#333333" }}>
                                        Submit
                                    </Button>
                                    <Button type="primary" size='large' onClick={refreshPage} style={{ marginLeft: 15, backgroundColor: "#333333", borderColor: "#333333" }}>
                                        Refresh
                                    </Button>
                                    <Button type="primary" size='large' onClick={componentDidMount} style={{ marginLeft: 15, backgroundColor: "#333333", borderColor: "#333333" }}>
                                        Sample
                                    </Button>
                                </form>
                                <div id='Graph'>
                                    {
                                        isSubmit &&
                                        <Secant_Graph fx={fx} x0={X0} x1={X1} xnew={arr4} />
                                    }
                                </div>
                            </div>
                            <div id="iteration" style={{ width: 960 }}>
                                <div style={{ display: 'flex' }}>
                                    <div><h1 style={{ margin: "0px 95px 15px 95px" }}>Iteration</h1></div>
                                    <div><h1 style={{ margin: "0px 100px 15px 100px" }}> X<sub>0</sub></h1></div>
                                    <div><h1 style={{ margin: "0px 100px 15px 100px" }}> X<sub>1</sub></h1></div>
                                    <div><h1 style={{ margin: "0px 110px 15px 100px" }}> X<sub>New</sub></h1></div>
                                </div>

                                <div style={{ borderTop: "1px solid black", width: "100%", marginBottom: 15 }}></div>

                                <div style={{ display: 'flex' }}>
                                    <div id="out-iteration" style={{ width: 200 }}></div>
                                    <div id="out-X0" style={{ width: 260 }}></div>
                                    <div id="out-X1" style={{ width: 200 }}></div>
                                    <div id="out-Xnew" style={{ width: 250 }}></div>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div >
    );
}