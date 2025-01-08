import React from 'react';
import { Form, Input, Select, Button, Modal } from 'antd';
import type { API } from '../types';

interface APIFormProps {
  initialValues?: API;
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: Partial<API>) => void;
}

const APIForm: React.FC<APIFormProps> = ({
  initialValues,
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  return (
    <Modal
      title={initialValues ? 'Edit API' : 'Register New API'}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {initialValues ? 'Update' : 'Create'}
        </Button>,
      ]}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="API Name"
          rules={[{ required: true, message: 'Please enter API name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="business"
          label="Business"
          rules={[{ required: true, message: 'Please enter business' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="method"
          label="Method"
          rules={[{ required: true, message: 'Please select method' }]}
        >
          <Select>
            <Select.Option value="GET">GET</Select.Option>
            <Select.Option value="POST">POST</Select.Option>
            <Select.Option value="PUT">PUT</Select.Option>
            <Select.Option value="DELETE">DELETE</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default APIForm;