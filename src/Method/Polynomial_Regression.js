import React, { useState } from 'react';
import Largrange_Polynomials_Graph from '../components/Largrange_Polynomials_Graph';
import { Layout, Table } from 'antd';
import 'antd/dist/antd.css';
import { Menu, Input, Button, Select } from 'antd';
import '../App.css';
import {
    CalculatorOutlined, ApartmentOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import regression from 'regression';


const { Option } = Select;

export default function Polynomial_Regression() {
    const { Header, Sider, Content } = Layout;
    const { SubMenu } = Menu;
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
    const [openKeys, setOpenKeys] = React.useState(['sub1']);
    const arr1 = [];
    const arr2 = [];
    const arr3 = [];
    const arr4 = [];

    const [x, setX] = useState();
    const [x0, setX0] = useState();
    const [x1, setX1] = useState();
    const [x2, setX2] = useState();
    const [x3, setX3] = useState();
    const [x4, setX4] = useState();
    const [x5, setX5] = useState();

    const [fx, setFx] = useState();
    const [fx0, setFx0] = useState();
    const [fx1, setFx1] = useState();
    const [fx2, setFx2] = useState();
    const [fx3, setFx3] = useState();
    const [fx4, setFx4] = useState();
    const [fx5, setFx5] = useState();

    const [m, setM] = useState();
    const [isSubmit, setSubmit] = useState(false);

    const columns = [
        {
            title: 'Point',
            dataIndex: 'point',
            key: 'point',
        },
        {
            title: 'x',
            dataIndex: 'x',
            key: 'x',
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
            x: <Input id="x0" size='small' placeholder="x1" style={{ width: 60 }} value={x0} onChange={(e) => setX0(e.target.value)} />,
            y: <Input id="fx0" size='small' placeholder="y1" style={{ width: 60 }} value={fx0} onChange={(e) => setFx0(e.target.value)} />
        },
        {
            key: '2',
            point: 2,
            x: <Input id="x1" size='small' placeholder="x2" style={{ width: 60 }} value={x1} onChange={(e) => setX1(e.target.value)} />,
            y: <Input id="fx1" size='small' placeholder="y2" style={{ width: 60 }} value={fx1} onChange={(e) => setFx1(e.target.value)} />
        },
        {
            key: '3',
            point: 3,
            x: <Input id="x2" size='small' placeholder="x3" style={{ width: 60 }} value={x2} onChange={(e) => setX2(e.target.value)} />,
            y: <Input id="fx2" size='small' placeholder="y3" style={{ width: 60 }} value={fx2} onChange={(e) => setFx2(e.target.value)} />
        },
        {
            key: '4',
            point: 4,
            x: <Input id="x3" size='small' placeholder="x4" style={{ width: 60 }} value={x3} onChange={(e) => setX3(e.target.value)} />,
            y: <Input id="fx3" size='small' placeholder="y4" style={{ width: 60 }} value={fx3} onChange={(e) => setFx3(e.target.value)} />
        },
        {
            key: '5',
            point: 5,
            x: <Input id="x4" size='small' placeholder="x5" style={{ width: 60 }} value={x4} onChange={(e) => setX4(e.target.value)} />,
            y: <Input id="fx4" size='small' placeholder="y5" style={{ width: 60 }} value={fx4} onChange={(e) => setFx4(e.target.value)} />
        },
        {
            key: '6',
            point: 6,
            x: <Input id="x5" size='small' placeholder="x6" style={{ width: 60 }} value={x5} onChange={(e) => setX5(e.target.value)} />,
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

        axios.get('http://localhost:8000/data/Least_Squares').then(res => {
            api = res.data;
            console.log("reply: ", api);
            setFx0(api.fx0);
            setFx1(api.fx1);
            setFx2(api.fx2);
            setFx3(api.fx3);
            setFx4(api.fx4);
            setFx5(api.fx5);

            setX0(api.x0);
            setX1(api.x1);
            setX2(api.x2);
            setX3(api.x3);
            setX4(api.x4);
            setX5(api.x5);
            setX(api.x);
        });

    }

    function refreshPage() {
        window.location.reload(false);
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
        setM(value);
    }


    const handleSubmit = (e) => {

        e.preventDefault();
        const blog = { fx0, fx1, fx2, fx3, fx4, fx5, x0, x1, x2, x3, x4, x5, x, m };

        if (blog.m == undefined) {
            blog.m = "M2";
            console.log(blog.m);
        }

        if (blog.m == "M2") {
            blog.m = 2;
            console.log(blog.m);
        }
        else if (blog.m == "M3") {
            blog.m = 3;
            console.log(blog.m);
        }

        document.getElementById('fx0').disabled = true;
        document.getElementById('fx1').disabled = true;
        document.getElementById('fx2').disabled = true;
        document.getElementById('fx3').disabled = true;
        document.getElementById('fx4').disabled = true;
        document.getElementById('x0').disabled = true;
        document.getElementById('x1').disabled = true;
        document.getElementById('x2').disabled = true;
        document.getElementById('x3').disabled = true;
        document.getElementById('x4').disabled = true;
        document.getElementById('x').disabled = true;

        let X = parseFloat(blog.x);
        let X0 = parseFloat(blog.x0);
        let X1 = parseFloat(blog.x1);
        let X2 = parseFloat(blog.x2);
        let X3 = parseFloat(blog.x3);
        let X4 = parseFloat(blog.x4);
        let X5 = parseFloat(blog.x5);

        let Fx0 = parseFloat(blog.fx0);
        let Fx1 = parseFloat(blog.fx1);
        let Fx2 = parseFloat(blog.fx2);
        let Fx3 = parseFloat(blog.fx3);
        let Fx4 = parseFloat(blog.fx4);
        let Fx5 = parseFloat(blog.fx5);
        let Fx, a0, a1, a2, a3;

        const result = regression.polynomial([[X0, Fx0], [X1, Fx1], [X2, Fx2], [X3, Fx3], [X4, Fx4], [X5, Fx5]], { order: blog.m, precision: 6 });
        if (blog.m == 2) {
            a0 = result.equation[2];
            a1 = result.equation[1];
            a2 = result.equation[0];
            console.log(a0);
            console.log(a1);
            console.log(a2);
            Fx = a0 + (a1 * X) + (a2 * (X ** 2));
            setFx(Fx);
            document.getElementById('fx').innerHTML = "g(" + X + ")" + "=" + Fx;
        }
        else if (blog.m == 3) {
            a0 = result.equation[3];
            a1 = result.equation[2];
            a2 = result.equation[1];
            a3 = result.equation[0];
            console.log(a0);
            console.log(a1);
            console.log(a2);
            console.log(a3);
            Fx = a0 + (a1 * X) + (a2 * (X ** 2)) + (a3 * (X ** 3));
            setFx(Fx);
            document.getElementById('fx').innerHTML = "g(" + X + ")" + "=" + Fx;
        }
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
                            <h1 style={{ textAlign: 'center', paddingBottom: '20px', margin: 0 }}>Polynomial Regression Method</h1>
                            <div style={{ display: 'flex' }}>
                                <form id="Form2" >
                                    <br /><br />
                                    <Table dataSource={data} columns={columns} />
                                    <h3>find g(x) When x = ? </h3>
                                    <Input id="x" addonBefore="x" size='middle' placeholder="input x" style={{ width: 300 }} value={x} onChange={(e) => setX(e.target.value)} />
                                    <br /><br />
                                    <div style={{ display: 'flex' }}>
                                        <h3>m =</h3>
                                        <Select defaultValue="M2" size='middle' style={{ width: 50 }} onChange={handleChange}>
                                            <Option value="M2">2</Option>
                                            <Option value="M3">3</Option>
                                        </Select>
                                    </div>
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