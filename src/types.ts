export interface API {
  id: string;
  name: string;
  description: string;
  business: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export type MenuItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
};