import React from 'react';
import { Layout, Menu, Button, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { TaskOutlined, PlusOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <AntHeader style={{ 
      display: 'flex', 
      alignItems: 'center',
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto'
      }}>
        <Space>
          <TaskOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          <span style={{ 
            fontSize: '20px', 
            fontWeight: 'bold',
            color: '#1890ff'
          }}>
            Task Manager
          </span>
        </Space>
        
        <Space>
          <Menu 
            mode="horizontal" 
            selectedKeys={[location.pathname]}
            style={{ border: 'none', background: 'transparent' }}
          >
            <Menu.Item key="/">
              <Link to="/">All Tasks</Link>
            </Menu.Item>
          </Menu>
          <Link to="/create">
            <Button type="primary" icon={<PlusOutlined />}>
              Create Task
            </Button>
          </Link>
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;
