import React from 'react';
import { Layout, Typography, Space } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import Header from './components/Header';
import './App.css';

const { Content, Footer } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Content style={{ padding: '24px', background: '#f5f5f5' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Title level={2}>Task Management System</Title>
              <Routes>
                <Route path="/" element={<TaskList />} />
                <Route path="/create" element={<CreateTask />} />
              </Routes>
            </Space>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Kaiburr Task 3 - React Frontend ©2025
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
