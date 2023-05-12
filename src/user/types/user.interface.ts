export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  deletedAt?: Date;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface UpdateUserData {
  name: string;
  email: string;
}

export interface getUsersData {
  search: string;
  page: number;
}

export interface PaginatedUser {
  data: Partial<IUser>;
  count: number;
  limit: number;
}
