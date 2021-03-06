import React, { useState } from 'react';
import Bisection_Graph from '../components/Bisection_Graph';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { Menu, Input, Button } from 'antd';
import '../App.css';
import {
    CalculatorOutlined, ApartmentOutlined
} from '@ant-design/icons';
import { compile, abs, round } from 'mathjs';
import axios from 'axios';

export default function Bisection() {
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
    const [xl, setXl] = useState();
    const [xr, setXr] = useState();
    const [isSubmit, setSubmit] = useState(false);

    function componentDidMount() {
        let api;

        axios.get('http://localhost:8000/data/Bisection').then(res => {
            api = res.data;
            console.log("reply: ", api);
            setFunction(api.fx);
            setXl(api.xl);
            setXr(api.xr);
        });

    }

    function refreshPage() {
        window.location.reload(false);
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        const blog = { fx, xl, xr };

        document.getElementById('fx').disabled = true;
        document.getElementById('xl').disabled = true;
        document.getElementById('xr').disabled = true;

        let i = 1;
        let a = 1;
        let Xl = parseFloat(blog.xl);
        let Xr = parseFloat(blog.xr);
        let xm, fxm, fxr, xlnew, xrnew, xmnew;

        xm = ((Xl + Xr) / 2);
        fxm = compile(fx).evaluate({ x: xm });
        fxr = compile(fx).evaluate({ x: Xr });

        if (fxm * fxr < 0) {
            Xl = xm;
        }
        else {
            Xr = xm;
        }

        while (a > 0.00001) {
            if (isNaN(Xl) == true || isNaN(Xr) == true) {
                console.log('Please input value')
                break;
            }
            else {
                xmnew = (Xl + Xr) / 2;
                fxm = compile(fx).evaluate({ x: xmnew });
                fxr = compile(fx).evaluate({ x: Xr });
                if (fxm * fxr < 0) {
                    arr2.push(Xl);
                    arr3.push(Xr);
                    xlnew = xmnew;
                    a = abs((xlnew - xm) / xmnew);
                    Xl = xlnew;
                    xm = xmnew
                    console.log("iteration", i, "epsilon =", round(a, 6));
                    arr1.push(i);
                    arr4.push(a);
                    output();
                }
                else {
                    arr2.push(Xl);
                    arr3.push(Xr);
                    xrnew = xmnew;
                    a = abs((xrnew - xm) / xmnew);
                    Xr = xrnew;
                    xm = xmnew
                    console.log("iteration", i, "epsilon =", round(a, 6));
                    arr1.push(i);
                    arr4.push(a);
                    output();
                }
                i = i + 1;
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
        document.getElementById('out-Xl').appendChild(newDiv2);


        newDiv3.innerHTML = "<h4 style='margin-left:40px;text-align:center ;'>" + round(arr3[arr3.length - 1], 6) + "</h4>";
        document.getElementById('out-Xr').appendChild(newDiv3);


        newDiv4.innerHTML = "<h4 style='margin-left:40px;text-align:center ;'>" + round(arr4[arr4.length - 1], 6) + "</h4>";
        document.getElementById('out-error').appendChild(newDiv4);


    }

    return (
        <div>
            <Sider id="sider" width={300}>
                <Menu mode="inline" onOpenChange={onOpenChange} theme="light" defaultOpenKeys={['sub1']}>

                    <Content id="content">
                        <div id="c1" onSubmit={handleSubmit}>
                            <h1 style={{ textAlign: 'center', paddingBottom: '20px', margin: 0 }}>Bisection Method</h1>
                            <div style={{ display: 'flex' }}>
                                <form id="Form" >
                                    <Input id="fx" addonBefore="F(x)" size='small' placeholder="input F(x)" style={{ width: 300 }} value={fx} onChange={(e) => setFunction(e.target.value)} />
                                    <br /><br />
                                    <Input id="xl" addonBefore="Xl" size='small' placeholder="input Xl" style={{ width: 300 }} value={xl} onChange={(e) => setXl(e.target.value)} />
                                    <br /><br />
                                    <Input id="xr" addonBefore="Xr" size='small' placeholder="input Xr" style={{ width: 300 }} value={xr} onChange={(e) => setXr(e.target.value)} />
                                    <br />
                                    <h4 style={{ marginTop: '10px' }}>Create Graph</h4>
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
                                <div id='Graph'>
                                    {
                                        isSubmit &&
                                        <Bisection_Graph fx={fx} xl={xl} xr={xr} error={arr4} />
                                    }
                                </div>
                            </div>
                            <div id="iteration" style={{ width: 960 }}>
                                <div style={{ display: 'flex' }}>
                                    <div><h1 style={{ margin: "0px 100px 15px 114px" }}>Iteration</h1></div>
                                    <div><h1 style={{ margin: "0px 100px 15px 100px" }}> X<sub>L</sub></h1></div>
                                    <div><h1 style={{ margin: "0px 100px 15px 100px" }}> X<sub>R</sub></h1></div>
                                    <div><h1 style={{ margin: "0px 110px 15px 100px" }}> Error</h1></div>
                                </div>

                                <div style={{ borderTop: "1px solid black", width: "100%", marginBottom: 15 }}></div>

                                <div style={{ display: 'flex' }}>
                                    <div id="out-iteration" style={{ width: 232 }}></div>
                                    <div id="out-Xl" style={{ width: 232 }}></div>
                                    <div id="out-Xr" style={{ width: 232 }}></div>
                                    <div id="out-error" style={{ width: 232 }}></div>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Menu>
            </Sider>
        </div >
    );
}