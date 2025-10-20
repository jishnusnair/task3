import React from 'react';
import {
  Modal,
  Descriptions,
  Tag,
  Typography,
  Timeline,
  Space,
  Empty,
} from 'antd';
import { Task } from '../types/task';

const { Title, Text } = Typography;
const { Item } = Descriptions;

interface TaskDetailsProps {
  task: Task | null;
  visible: boolean;
  onClose: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
  task,
  visible,
  onClose,
}) => {
  if (!task) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Modal
      title="Task Details"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Descriptions bordered column={2}>
          <Item label="Task ID">
            <Tag color="blue">{task.id}</Tag>
          </Item>
          <Item label="Name">
            <Text strong>{task.name}</Text>
          </Item>
          <Item label="Owner">{task.owner}</Item>
          <Item label="Command">
            <code style={{ background: '#f5f5f5', padding: 4, borderRadius: 3 }}>
              {task.command}
            </code>
          </Item>
          <Item label="Total Executions" span={2}>
            <Tag color={task.taskExecutions.length > 0 ? 'green' : 'default'}>
              {task.taskExecutions.length} execution(s)
            </Tag>
          </Item>
        </Descriptions>

        <div>
          <Title level={5}>Execution History</Title>
          {task.taskExecutions.length > 0 ? (
            <Timeline>
              {task.taskExecutions.map((execution, index) => (
                <Timeline.Item key={index}>
                  <Space direction="vertical" size="small">
                    <div>
                      <Text strong>Start:</Text>{' '}
                      <Text type="secondary">
                        {formatDate(execution.startTime)}
                      </Text>
                    </div>
                    <div>
                      <Text strong>End:</Text>{' '}
                      <Text type="secondary">
                        {formatDate(execution.endTime)}
                      </Text>
                    </div>
                    <div>
                      <Text strong>Output:</Text>
                      <pre
                        style={{
                          background: '#f5f5f5',
                          padding: 8,
                          borderRadius: 4,
                          marginTop: 4,
                          fontSize: 12,
                          maxHeight: 150,
                          overflow: 'auto',
                        }}
                      >
                        {execution.output || 'No output'}
                      </pre>
                    </div>
                  </Space>
                </Timeline.Item>
              ))}
            </Timeline>
          ) : (
            <Empty
              description="No execution history"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      </Space>
    </Modal>
  );
};

export default TaskDetails;
