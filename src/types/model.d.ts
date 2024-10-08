export interface IUpload {
  uploadId: string;
  filename: string;
  category: string;
  path: string;
  type: string;
  mime: string;
  extension: string;
  size: number;
  filenameOrigin: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface IUser {
  userId: string;
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  avatarId: string;
  roleId: string;
  role: IRole;
  avatar: IUpload;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IRole {
  roleId: string;
  name: string;
  alias: string;
  color: string;
  description: string;
  users: IUser[];
  roleModules: IRoleModules[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IModule {
  moduleId?: number;
  moduleTypeId: string;
  parentId?: number | null;
  path: string;
  name: string;
  icon: string;
  route: string;
  description: string;
  roleModules: IRoleModules[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  moduleType: IModuleType;
  parentModule?: IModule | null;
  childModules: IModule[];
}

export interface IModuleType {
  moduleTypeId: string;
  name: string;
  icon: string;
  description: string;
  modules: IModule[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface IRoleModules {
  roleModuleId?: string;
  roleId: string;
  moduleId: number;
  checked: boolean;
  role?: IRole;
  module?: IModule;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface IProduct {
  productId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  rating: number;
  reorderLevel: number;
  categoryId: string;
  brandId: string;
  supplierId?: string;
  imageId?: string;
  image?: IUpload;
  category?: ICategory;
  brand?: IBrand;
  supplier?: ISupplier;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface ICategory {
  categoryId: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface IBrand {
  brandId: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface ISupplier {
  supplierId: string;
  name: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
