import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  message,
  Modal,
  Input,
  Typography,
  Empty,
  Spin,
} from 'antd';
import {
  SearchOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Task } from '../types/task';
import { taskService } from '../services/api';
import TaskDetails from './TaskDetails';

const { Title } = Typography;
const { Search } = Input;

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [executingTask, setExecutingTask] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await taskService.getTasks();
      setTasks(Array.isArray(data) ? data : [data]);
      message.success('Tasks loaded successfully');
    } catch (error) {
      message.error('Failed to load tasks');
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      loadTasks();
      return;
    }

    setSearchLoading(true);
    try {
      const data = await taskService.searchTasks(value);
      setTasks(Array.isArray(data) ? data : [data]);
      message.success(`Found ${Array.isArray(data) ? data.length : 1} task(s)`);
    } catch (error) {
      message.error('No tasks found');
      setTasks([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleExecute = async (taskId: string) => {
    setExecutingTask(taskId);
    try {
      const updatedTask = await taskService.executeTask(taskId);
      setTasks(prev => prev.map(task => 
        task.id === taskId ? updatedTask : task
      ));
      message.success('Task executed successfully');
    } catch (error) {
      message.error('Failed to execute task');
    } finally {
      setExecutingTask(null);
    }
  };

  const handleDelete = async (taskId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this task?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await taskService.deleteTask(taskId);
          setTasks(prev => prev.filter(task => task.id !== taskId));
          message.success('Task deleted successfully');
        } catch (error) {
          message.error('Failed to delete task');
        }
      },
    });
  };

  const showDetails = (task: Task) => {
    setSelectedTask(task);
    setDetailsVisible(true);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (id: string) => <Tag color="blue">{id}</Tag>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <strong>{name}</strong>,
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Command',
      dataIndex: 'command',
      key: 'command',
      render: (command: string) => (
        <code style={{ background: '#f5f5f5', padding: '2px 4px', borderRadius: 3 }}>
          {command}
        </code>
      ),
    },
    {
      title: 'Executions',
      dataIndex: 'taskExecutions',
      key: 'executions',
      render: (executions: any[]) => (
        <Tag color={executions?.length > 0 ? 'green' : 'default'}>
          {executions?.length || 0}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Task) => (
        <Space size="small">
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => showDetails(record)}
          >
            Details
          </Button>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            size="small"
            loading={executingTask === record.id}
            onClick={() => handleExecute(record.id)}
          >
            Execute
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={4} style={{ margin: 0 }}>Task List</Title>
        <Space>
          <Search
            placeholder="Search tasks by name..."
            allowClear
            enterButton={<SearchOutlined />}
            size="middle"
            onSearch={handleSearch}
            loading={searchLoading}
            style={{ width: 300 }}
          />
          <Button
            icon={<ReloadOutlined />}
            onClick={loadTasks}
            loading={loading}
          >
            Refresh
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        loading={loading}
        locale={{
          emptyText: (
            <Empty
              description="No tasks found"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ),
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />

      <TaskDetails
        task={selectedTask}
        visible={detailsVisible}
        onClose={() => setDetailsVisible(false)}
      />
    </Card>
  );
};

export default TaskList;
