import React, { useState } from 'react';
import One_Point_Iteration_Graph from '../components/One_Point_Iteration_Graph';
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

export default function One_Point_Iteration() {
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
    const [start, setStart] = useState();
    const [isSubmit, setSubmit] = useState(false);

    function componentDidMount() {
        let api;

        axios.get('http://localhost:8000/data/One_Point_Iteration').then(res => {
            api = res.data;
            console.log("reply: ", api);
            setFunction(api.fx);
            setStart(api.start);
        });

    }

    function refreshPage() {
        window.location.reload(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { fx, start };
        document.getElementById('fx').disabled = true;
        document.getElementById('start').disabled = true;

        let i = 0;
        let a = 1;
        let a1 = [];
        let x0 = parseFloat(blog.start);
        let fx0, x;

        while (a > 0.000001) {
            arr2.push(x0);
            fx0 = compile(fx).evaluate({ x: x0 });
            x = fx0;
            a = abs((x - x0) / x);
            a1[i] = a;
            console.log("iteration", i, "epsilon =", round(a, 6));
            x0 = x;
            i = i + 1;
            arr1.push(i);
            arr3.push(x);
            arr4.push(a);
            output();
            if (a1[i - 2] == a) {
                break;
            }
            if (a1[i - 3] == a) {
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
        document.getElementById('out-Xold').appendChild(newDiv2);


        newDiv3.innerHTML = "<h4 style='margin-left:40px;text-align:center ;'>" + round(arr3[arr3.length - 1], 6) + "</h4>";
        document.getElementById('out-Xnew').appendChild(newDiv3);


        newDiv4.innerHTML = "<h4 style='margin-left:40px;text-align:center ;'>" + round(arr4[arr4.length - 1], 6) + "</h4>";
        document.getElementById('out-error').appendChild(newDiv4);


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
                            <h1 style={{ textAlign: 'center', paddingBottom: '20px', margin: 0 }}>One-Point Iteration Method</h1>
                            <div style={{ display: 'flex' }}>
                                <form id="Form" onSubmit={handleSubmit}>
                                    <Input id="fx" addonBefore="F(x)" size='small' placeholder="input F(x)" style={{ width: 300 }} value={fx} onChange={(e) => setFunction(e.target.value)} />
                                    <br /><br />
                                    <Input id="start" addonBefore="Start" size='small' placeholder="input Start" style={{ width: 300 }} value={start} onChange={(e) => setStart(e.target.value)} />
                                    <br /><br /><br />
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
                                        <One_Point_Iteration_Graph fx={fx} start={start} error={arr4} />
                                    }
                                </div>
                            </div>
                            <div id="iteration" style={{ width: 960 }}>
                                <div style={{ display: 'flex' }}>
                                    <div><h1 style={{ margin: "0px 95px 15px 95px" }}>Iteration</h1></div>
                                    <div><h1 style={{ margin: "0px 100px 15px 100px" }}> X<sub>old</sub></h1></div>
                                    <div><h1 style={{ margin: "0px 100px 15px 100px" }}> X<sub>new</sub></h1></div>
                                    <div><h1 style={{ margin: "0px 110px 15px 100px" }}> Error</h1></div>
                                </div>

                                <div style={{ borderTop: "1px solid black", width: "100%", marginBottom: 15 }}></div>

                                <div style={{ display: 'flex' }}>
                                    <div id="out-iteration" style={{ width: 200 }}></div>
                                    <div id="out-Xold" style={{ width: 260 }}></div>
                                    <div id="out-Xnew" style={{ width: 240 }}></div>
                                    <div id="out-error" style={{ width: 230 }}></div>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div >
    );
}