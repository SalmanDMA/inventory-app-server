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

	users?: IUser[];
	products?: IProduct[];
	brands?: IBrand[];
	customers?: ICustomer[];
	suppliers?: ISupplier[];
}

export interface IUser {
	userId: string;
	name: string;
	username: string;
	email: string;
	password?: string;
	phone?: string;
	address?: string;
	avatarId?: string;
	roleId: string;

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;

	avatar?: IUpload;
	role: IRole;
	warehouses: IWarehouse[];
	productHistories: IProductHistory[];
}

export interface IUserLogin {
	id: string;
	name: string;
	roleId: string;
	roleName: string;
}

export interface IRole {
	roleId: string;
	name: string;
	alias?: string;
	color?: string;
	description?: string;

	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;

	users: IUser[];
	roleModules: IRoleModules[];
}

export interface IModule {
	moduleId: number;
	moduleTypeId: string;
	parentId?: number | null;
	path?: string;
	name: string;
	icon?: string | null;
	route?: string | null;
	description?: string;

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;

	roleModules: IRoleModules[];
	moduleType: IModuleType;
	parentModule?: IModule | null;
	childModules: IModule[];
}

export interface IModuleType {
	moduleTypeId: string;
	name: string;
	icon: string;
	description: string;

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;

	modules: IModule[];
}

export interface IRoleModules {
	roleModuleId?: string;
	roleId: string;
	moduleId: number;
	checked: boolean;

	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;

	role?: IRole;
	module?: IModule;
}

export interface IProduct {
	productId: string;
	sku: string;
	discount?: number;
	costPrice: number;
	name: string;
	description?: string;
	price: number;
	rating?: number;
	stock: number;
	reorderLevel: number;
	categoryId: number;
	brandId: string;
	supplierId: string;
	imageId?: string;
	height?: number;
	width?: number;
	weight?: number;

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;

	image?: IUpload;
	category?: ICategory;
	brand?: IBrand;
	supplier?: ISupplier;
	stockMovements?: IStockMovement[];
	purchaseDetails?: IPurchaseDetail[];
	salesDetails?: ISalesDetail[];
	productHistories?: IProductHistory[];
}

export interface IProductHistory {
	productHistoryId: string;
	productId: string;
	oldPrice: number;
	newPrice: number;
	userId: string;

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;

	product?: IProduct;
	user?: IUser;
}

export interface ICategory {
	categoryId: number;
	parentId?: number | null;
	path?: string;
	name: string;
	alias?: string;
	color?: string;
	description?: string;

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;

	products?: IProduct[];
	parentCategory?: ICategory | null;
	childCategories?: ICategory[];
}

export interface IBrand {
	brandId: string;
	name: string;
	description?: string;
	imageId?: string;
	alias?: string;
	color?: string;

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;

	products?: IProduct[];
	image?: IUpload;
}

export interface ICustomer {
	customerId: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	companyName?: string;
	taxNumber?: string;
	contractStartDate?: Date;
	contractEndDate?: Date;
	paymentTerm?: string;
	creditLimit?: number;
	discount?: number;
	imageId?: string;

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;

	sales?: ISale[];
	image?: IUpload;
}

export interface ISupplier {
	supplierId: string;
	companyName: string;
	name: string;
	email: string;
	phone: string;
	address?: string;
	taxNumber?: string;
	bankAccount?: string;
	contractStartDate?: Date;
	contractEndDate?: Date;
	paymentTerm?: string;
	deliveryLeadTime?: number;
	rating?: number;
	imageId: string;

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;

	purchases?: IPurchase[];
	products?: IProduct[];
	image?: IUpload;
}

export interface IStockMovement {
	stockMovementId: string;
	productId: string;
	warehouseId: string;
	movementType: 'IN' | 'OUT';
	movementReason?: string;
	quantity: number;
	transactionDate: Date;

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;

	product?: IProduct;
	warehouse?: IWarehouse;
}

export interface IPurchase {
	purchaseId: string;
	supplierId: string;
	warehouseId: string;
	status: 'PENDING' | 'PROCESSED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
	total: number;
	paymentStatus: 'PAID' | 'UNPAID' | 'CANCELLED' | 'OVERDUE';
	paymentMethod: 'CASH' | 'CREDITCARD';

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;

	supplier?: ISupplier;
	warehouse?: IWarehouse;
	details?: IPurchaseDetail[];
}

export interface IPurchaseDetail {
	purchaseDetailId: string;
	purchaseId: string;
	productId: string;
	quantity: number;
	price: number;
	discount?: number;
	tax?: number;

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;

	purchase?: IPurchase;
	product?: IProduct;
}

export interface ISale {
	saleId: string;
	customerId: string;
	warehouseId: string;
	status: 'PENDING' | 'PROCESSED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
	total: number;
	paymentStatus: 'PAID' | 'UNPAID' | 'CANCELLED' | 'OVERDUE';
	paymentMethod: 'CASH' | 'CREDITCARD';

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;

	warehouse?: IWarehouse;
	customer?: ICustomer;
	details?: ISalesDetail[];
}

export interface ISalesDetail {
	salesDetailId: string;
	saleId: string;
	productId: string;
	quantity: number;
	price: number;
	discount?: number;
	tax?: number;

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;

	sale?: ISale;
	product?: IProduct;
}

export interface IWarehouse {
	warehouseId: string;
	name: string;
	location: string;
	capacity: number;
	description?: string;
	picId: string;
	status?: 'AVAILABLE' | 'FULL';

	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;

	products?: IStockMovement[];
	sales?: ISale[];
	purchases?: IPurchase[];
	pic: IUser;
}
