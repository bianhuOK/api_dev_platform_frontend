import React, { useState } from 'react';
import { Layout, Input, Button, message, Menu, Breadcrumb } from 'antd';
import { 
  PlusCircle, 
  Database, 
  Shield, 
  Settings, 
  History, 
  Users,
  LayoutDashboard
} from 'lucide-react';
import APITable from './components/APITable';
import APIForm from './components/APIForm';
import type { API, MenuItem } from './types';

const { Header, Content, Sider } = Layout;
const { Search } = Input;

const menuItems: MenuItem[] = [
  { key: 'apis', label: 'API Management', icon: <LayoutDashboard className="w-4 h-4" /> },
  { key: 'datasources', label: 'Data Sources', icon: <Database className="w-4 h-4" /> },
  { key: 'permissions', label: 'Permissions', icon: <Shield className="w-4 h-4" /> },
  { key: 'variables', label: 'Global Variables', icon: <Settings className="w-4 h-4" /> },
  { key: 'history', label: 'API History', icon: <History className="w-4 h-4" /> },
  { key: 'clients', label: 'Client Management', icon: <Users className="w-4 h-4" /> },
];

function App() {
  const [apis, setApis] = useState<API[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [editingApi, setEditingApi] = useState<API | undefined>();
  const [selectedMenu, setSelectedMenu] = useState('apis');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const filteredApis = apis.filter(api => 
    api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    api.business.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = (values: Partial<API>) => {
    const newApi: API = {
      ...values,
      id: Date.now().toString(),
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as API;

    setApis([...apis, newApi]);
    setFormVisible(false);
    message.success('API created successfully');
  };

  const handleEdit = (api: API) => {
    setEditingApi(api);
    setFormVisible(true);
  };

  const handleUpdate = (values: Partial<API>) => {
    if (!editingApi) return;

    const updatedApis = apis.map(api => 
      api.id === editingApi.id 
        ? { ...api, ...values, updatedAt: new Date().toISOString() }
        : api
    );

    setApis(updatedApis);
    setFormVisible(false);
    setEditingApi(undefined);
    message.success('API updated successfully');
  };

  const handlePublish = (api: API) => {
    const updatedApis = apis.map(item => 
      item.id === api.id 
        ? { ...item, status: 'published', updatedAt: new Date().toISOString() }
        : item
    );

    setApis(updatedApis);
    message.success('API published successfully');
  };

  const handleView = (api: API) => {
    console.log('Viewing API:', api);
  };

  const getCurrentBreadcrumb = () => {
    const currentItem = menuItems.find(item => item.key === selectedMenu);
    return [
      {title: 'Home'},
      {title: currentItem?.label || 'Unknown'}
    ]
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'apis':
        return (
          <>
            <div className="flex justify-between mb-4">
              <Search
                placeholder="Search APIs..."
                allowClear
                onSearch={handleSearch}
                style={{ width: 300 }}
              />
              <Button
                type="primary"
                icon={<PlusCircle className="w-4 h-4" />}
                onClick={() => setFormVisible(true)}
              >
                New API
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <APITable
                data={filteredApis}
                onEdit={handleEdit}
                onPublish={handlePublish}
                onView={handleView}
              />
            </div>
          </>
        );
      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{menuItems.find(item => item.key === selectedMenu)?.label}</h2>
            <p className="text-gray-500 mt-2">This feature is coming soon...</p>
          </div>
        );
    }
  };

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white shadow-md flex items-center px-6">
        <h1 className="text-xl font-semibold">API Management System</h1>
      </Header>
      
      <Layout>
        <Sider width={200} className="bg-white">
          <Menu
            mode="inline"
            selectedKeys={[selectedMenu]}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems.map(item => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
            }))}
            onClick={({ key }) => setSelectedMenu(key)}
          />
        </Sider>
        
        <Content className="p-6">
          <Breadcrumb 
            items={getCurrentBreadcrumb()}
             className="mb-4"
          />
          {renderContent()}
        </Content>
      </Layout>

      <APIForm
        visible={formVisible}
        initialValues={editingApi}
        onCancel={() => {
          setFormVisible(false);
          setEditingApi(undefined);
        }}
        onSubmit={editingApi ? handleUpdate : handleCreate}
      />
    </Layout>
  );
}

export default App;