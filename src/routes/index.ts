import express from 'express';

import dashboardRoutes from './dashboard';
import productRoutes from './product';
import userRoutes from './user';
import roleRoutes from './role';
import routerCloudinary from './cloudinary';
import routerAuth from './auth';
import moduleRoutes from './module';
import roleModuleRoutes from './rolemodule';
import moduleTypeRoutes from './moduleType';
import uploadRoutes from './upload';
import fileRoutes from './file';
import warehouseRoutes from './warehouse';
import categoryRoutes from './category';
import brandRoutes from './brand';
import supplierRoutes from './supplier';
import customerRoutes from './customer';
import productHistoryRoutes from './productHistory';
import stockMovementRoutes from './stockMovement';

const apiRouter = express.Router();

apiRouter.use('/auth', routerAuth);
apiRouter.use('/uploads', uploadRoutes);
apiRouter.use('/file', fileRoutes);
apiRouter.use('/cloudinary', routerCloudinary);
apiRouter.use('/dashboard', dashboardRoutes);
apiRouter.use('/products/categories', categoryRoutes);
apiRouter.use('/products/brands', brandRoutes);
apiRouter.use('/products/histories', productHistoryRoutes);
apiRouter.use('/products/stockMovements', stockMovementRoutes);
apiRouter.use('/products', productRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/roles', roleRoutes);
apiRouter.use('/roles', roleModuleRoutes);
apiRouter.use('/modules', moduleRoutes);
apiRouter.use('/modules-types', moduleTypeRoutes);
apiRouter.use('/suppliers', supplierRoutes);
apiRouter.use('/customers', customerRoutes);
apiRouter.use('/warehouses', warehouseRoutes);

export default apiRouter;
