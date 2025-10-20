import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  message,
  Space,
  Typography,
  Alert,
} from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { taskService } from '../services/api';
import { CreateTaskRequest } from '../types/task';

const { Title } = Typography;
const { TextArea } = Input;

const CreateTask: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: CreateTaskRequest) => {
    setSubmitting(true);
    try {
      await taskService.createTask(values);
      message.success('Task created successfully!');
      form.resetFields();
      navigate('/');
    } catch (error: any) {
      message.error(error.response?.data || 'Failed to create task');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            type="text"
          />
          <Title level={3} style={{ margin: 0 }}>Create New Task</Title>
        </div>

        <Alert
          message="Task Information"
          description="Create a new task that can execute shell commands. Only safe commands are allowed."
          type="info"
          showIcon
        />

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="Task ID"
            name="id"
            rules={[
              { required: true, message: 'Please enter a task ID' },
              { min: 1, message: 'Task ID must be at least 1 character' },
            ]}
          >
            <Input placeholder="Enter unique task ID" />
          </Form.Item>

          <Form.Item
            label="Task Name"
            name="name"
            rules={[
              { required: true, message: 'Please enter a task name' },
              { min: 2, message: 'Task name must be at least 2 characters' },
            ]}
          >
            <Input placeholder="Enter task name" />
          </Form.Item>

          <Form.Item
            label="Owner"
            name="owner"
            rules={[
              { required: true, message: 'Please enter owner name' },
              { min: 2, message: 'Owner name must be at least 2 characters' },
            ]}
          >
            <Input placeholder="Enter owner name" />
          </Form.Item>

          <Form.Item
            label="Command"
            name="command"
            rules={[
              { required: true, message: 'Please enter a command' },
              { min: 3, message: 'Command must be at least 3 characters' },
            ]}
            extra="Allowed commands: echo, ls, pwd, date, whoami, cat"
          >
            <TextArea
              rows={3}
              placeholder="Enter shell command (e.g., echo 'Hello World')"
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={submitting}
                size="large"
              >
                Create Task
              </Button>
              <Button onClick={handleBack} size="large">
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Space>
    </Card>
  );
};

export default CreateTask;
