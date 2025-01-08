import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Edit2, Send, Eye } from 'lucide-react';
import type { API } from '../types';

interface APITableProps {
  data: API[];
  onEdit: (record: API) => void;
  onPublish: (record: API) => void;
  onView: (record: API) => void;
}

const APITable: React.FC<APITableProps> = ({ data, onEdit, onPublish, onView }) => {
  const columns: ColumnsType<API> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Business',
      dataIndex: 'business',
      key: 'business',
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
      render: (method) => (
        <Tag color={
          method === 'GET' ? 'green' :
          method === 'POST' ? 'blue' :
          method === 'PUT' ? 'orange' :
          'red'
        }>
          {method}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'published' ? 'green' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<Eye className="w-4 h-4" />}
            onClick={() => onView(record)}
          />
          <Button
            type="text"
            icon={<Edit2 className="w-4 h-4" />}
            onClick={() => onEdit(record)}
          />
          <Button
            type="text"
            icon={<Send className="w-4 h-4" />}
            onClick={() => onPublish(record)}
            disabled={record.status === 'published'}
          >
            {record.status === 'published' ? 'Published' : 'Publish'}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
};

export default APITable;