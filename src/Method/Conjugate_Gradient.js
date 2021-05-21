import React, { useState } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { Menu, Input, Button } from 'antd';
import '../App.css';
import {
    CalculatorOutlined, ApartmentOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { sqrt, multiply, subtract, add, round } from 'mathjs';
import axios from 'axios';

function Conjugate_Gradient() {
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

    function componentDidMount() {
        let api;

        axios.get('http://localhost:8000/data/Conjugate_Gradient').then(res => {
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

        let X = [
            [100],
            [100],
            [100],
        ];

        let A = [
            [x11, x21, x31,],
            [x12, x22, x32,],
            [x13, x23, x33,]
        ];
        console.log("A =", A);

        let B = [
            [ans1],
            [ans2],
            [ans3],
        ];
        console.log("B =", B);

        let R = multiply(A, X);
        R = subtract(R, B);
        console.log("R =", R);

        let D = multiply(R, -1);
        console.log("D =", D);

        let k = 1;
        let i = 0;
        let sum, E, a, sum2;

        while (k > 0) {
            arr2.push(X[0]);
            arr3.push(X[1]);
            arr4.push(X[2]);

            console.log("X", i, "=", round(X, 4), "error =", round(k, 4));
            sum = multiply(A, D);
            E = -(((D[0] * R[0]) + (D[1] * R[1]) + (D[2] * R[2])) / ((sum[0] * D[0]) + (sum[1] * D[1]) + (sum[2] * D[2])));

            X = add(X, multiply(E, D));

            R = subtract(multiply(A, X), B);

            k = sqrt((R[0] * R[0]) + (R[1] * R[1]) + (R[2] * R[2]));

            sum = multiply(A, R);
            sum2 = multiply(A, D);
            a = (((D[0] * sum[0]) + (D[1] * sum[1]) + (D[2] * sum[2])) / ((sum2[0] * D[0]) + (sum2[1] * D[1]) + (sum2[2] * D[2])));

            D = add(multiply(R, -1), multiply(a, D));
            arr1.push(i);
            output();

            i = i + 1;
        }

        let x1 = round(X[0]);
        console.log(x1);

        let x2 = round(X[1]);
        console.log(x2);

        let x3 = round(X[2]);
        console.log(x3)

        document.getElementById('x1').innerHTML = "X1 = " + x1;
        document.getElementById('x2').innerHTML = "X2 = " + x2;
        document.getElementById('x3').innerHTML = "X3 = " + x3;
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
        document.getElementById('out-X1').appendChild(newDiv2);


        newDiv3.innerHTML = "<h4 style='margin-left:40px;text-align:center ;'>" + round(arr3[arr3.length - 1], 6) + "</h4>";
        document.getElementById('out-X2').appendChild(newDiv3);


        newDiv4.innerHTML = "<h4 style='margin-left:40px;text-align:center ;'>" + round(arr4[arr4.length - 1], 6) + "</h4>";
        document.getElementById('out-X3').appendChild(newDiv4);
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
                            <h1 style={{ textAlign: 'center', paddingBottom: '20px', margin: 0 }}>Conjugate Gradient Method</h1>
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
                            <div id="iteration" style={{ width: 960 }}>
                                <div style={{ display: 'flex' }}>
                                    <div><h1 style={{ margin: "0px 95px 15px 95px" }}>Iteration</h1></div>
                                    <div><h1 style={{ margin: "0px 100px 15px 100px" }}> X<sub>1</sub></h1></div>
                                    <div><h1 style={{ margin: "0px 100px 15px 100px" }}> X<sub>2</sub></h1></div>
                                    <div><h1 style={{ margin: "0px 110px 15px 100px" }}> X<sub>3</sub></h1></div>
                                </div>

                                <div style={{ borderTop: "1px solid black", width: "100%", marginBottom: 15 }}></div>

                                <div style={{ display: 'flex' }}>
                                    <div id="out-iteration" style={{ width: 200 }}></div>
                                    <div id="out-X1" style={{ width: 260 }}></div>
                                    <div id="out-X2" style={{ width: 200 }}></div>
                                    <div id="out-X3" style={{ width: 230 }}></div>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div >
    );
}
export default Conjugate_Gradient;