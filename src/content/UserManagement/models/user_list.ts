interface UsersParams {
  limit: any;
  page: any;
}

export interface UserList {
  id?: number;
  name: string;
  username: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export default interface UserListProps {
  data: UserList[];
  total: number;
  params: UsersParams;
  setParams: (any) => any;
}

export interface UserFormProps {
  id: number;
  name: string;
  username: string;
  password: string;
}
