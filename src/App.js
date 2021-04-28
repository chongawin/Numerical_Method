import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  CalculatorOutlined, ApartmentOutlined
} from '@ant-design/icons';
//import { icons } from 'antd/lib/image/PreviewGroup';

function App() {

  const { Header, Sider, Content } = Layout;
  const { SubMenu } = Menu;
  const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
  const [openKeys, setOpenKeys] = React.useState(['sub1']);

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <div>
      <Layout>
        <Header id='header'>
          <h1> <Link to="" style={{ color: 'white' }}><CalculatorOutlined /> Numerical</Link></h1>
        </Header>
      </Layout>
      <Layout style={{ marginTop: 64 }}>
        <Sider id='sider' width={300}>
          <Menu mode="inline" onOpenChange={onOpenChange} theme="light">
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
          <Content id='content'>
          </Content>
        </Layout>
      </Layout>
    </div >
  );
}
export default App;

