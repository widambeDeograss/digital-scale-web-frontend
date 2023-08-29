import React from 'react';
import { Layout, Space } from 'antd';
import { Colors } from '../../constants/Colors';
import { HeaderLs } from './Header';
import { Outlet } from 'react-router-dom';
import Footerls from './Footer';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 100,
  paddingInline: 150,
  // lineHeight: '64px',
  backgroundColor: Colors.primary,
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: Colors.primary,
};

const Main = ({children}:any) => (
  <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
    <Layout>
      <Header style={headerStyle}>
        <HeaderLs />
      </Header>
      <Content style={contentStyle}>
        {children}

      </Content>
      <Footer style={footerStyle}>
        <Footerls />
      </Footer>
    </Layout>
  

  </Space>
);

export default Main;