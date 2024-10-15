-- CreateEnum
CREATE TYPE "MovementType" AS ENUM ('IN', 'OUT');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'UNPAID', 'OVERDUE', 'CANCELED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CREDITCARD');

-- CreateTable
CREATE TABLE "Uploads" (
    "uploadId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "filenameOrigin" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Uploads_pkey" PRIMARY KEY ("uploadId")
);

-- CreateTable
CREATE TABLE "Users" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "avatarId" TEXT,
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Roles" (
    "roleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "Modules" (
    "moduleId" SERIAL NOT NULL,
    "moduleTypeId" TEXT NOT NULL,
    "parentId" INTEGER,
    "path" TEXT,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "route" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Modules_pkey" PRIMARY KEY ("moduleId")
);

-- CreateTable
CREATE TABLE "ModulesTypes" (
    "moduleTypeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ModulesTypes_pkey" PRIMARY KEY ("moduleTypeId")
);

-- CreateTable
CREATE TABLE "RoleModules" (
    "roleModuleId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "checked" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "RoleModules_pkey" PRIMARY KEY ("roleModuleId")
);

-- CreateTable
CREATE TABLE "Products" (
    "productId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "discount" DOUBLE PRECISION,
    "costPrice" DOUBLE PRECISION NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "rating" DOUBLE PRECISION,
    "stock" INTEGER NOT NULL,
    "reorderLevel" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "brandId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "imageId" TEXT,
    "height" DOUBLE PRECISION,
    "width" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Products_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Categories" (
    "categoryId" SERIAL NOT NULL,
    "parentId" INTEGER,
    "path" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "Brands" (
    "brandId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageId" TEXT,
    "alias" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Brands_pkey" PRIMARY KEY ("brandId")
);

-- CreateTable
CREATE TABLE "Suppliers" (
    "supplierId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("supplierId")
);

-- CreateTable
CREATE TABLE "StockMovements" (
    "stockMovementId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "movementType" "MovementType" NOT NULL,
    "movementReason" TEXT,
    "quantity" INTEGER NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "StockMovements_pkey" PRIMARY KEY ("stockMovementId")
);

-- CreateTable
CREATE TABLE "Purchases" (
    "purchaseId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Purchases_pkey" PRIMARY KEY ("purchaseId")
);

-- CreateTable
CREATE TABLE "PurchaseDetails" (
    "purchaseDetailId" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,
    "tax" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PurchaseDetails_pkey" PRIMARY KEY ("purchaseDetailId")
);

-- CreateTable
CREATE TABLE "Sales" (
    "saleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("saleId")
);

-- CreateTable
CREATE TABLE "SalesDetails" (
    "salesDetailId" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,
    "tax" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SalesDetails_pkey" PRIMARY KEY ("salesDetailId")
);

-- CreateTable
CREATE TABLE "Warehouses" (
    "warehouseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "description" TEXT,
    "picId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Warehouses_pkey" PRIMARY KEY ("warehouseId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_name_key" ON "Roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Modules_name_key" ON "Modules"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ModulesTypes_name_key" ON "ModulesTypes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Products_sku_key" ON "Products"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Uploads"("uploadId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modules" ADD CONSTRAINT "Modules_moduleTypeId_fkey" FOREIGN KEY ("moduleTypeId") REFERENCES "ModulesTypes"("moduleTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modules" ADD CONSTRAINT "Modules_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Modules"("moduleId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleModules" ADD CONSTRAINT "RoleModules_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleModules" ADD CONSTRAINT "RoleModules_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Modules"("moduleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Uploads"("uploadId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brands"("brandId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Suppliers"("supplierId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Categories"("categoryId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brands" ADD CONSTRAINT "Brands_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Uploads"("uploadId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovements" ADD CONSTRAINT "StockMovements_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovements" ADD CONSTRAINT "StockMovements_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouses"("warehouseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Suppliers"("supplierId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouses"("warehouseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDetails" ADD CONSTRAINT "PurchaseDetails_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchases"("purchaseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDetails" ADD CONSTRAINT "PurchaseDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouses"("warehouseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesDetails" ADD CONSTRAINT "SalesDetails_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sales"("saleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesDetails" ADD CONSTRAINT "SalesDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouses" ADD CONSTRAINT "Warehouses_picId_fkey" FOREIGN KEY ("picId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
