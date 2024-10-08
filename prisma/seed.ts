import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
const prisma = new PrismaClient();

async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    if (model) {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } else {
      console.error(`Model ${modelName} not found. Please ensure the model name is correctly specified.`);
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, 'seedData');

  const orderedFileNames = [
    'categories.json',
    'brands.json',
    'suppliers.json',
    'warehouses.json',
    'products.json',
    'stockMovements.json',
    'purchases.json',
    'purchaseDetails.json',
    'modulesTypes.json',
    'modules.json',
    'roles.json',
    'roleModules.json',
    'users.json',
    'sales.json',
    'salesDetails.json',
  ];

  await deleteAllData(orderedFileNames);

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

    for (const data of jsonData) {
      if (modelName === 'users') {
        const { roleId, ...userData } = data;
        await model.create({
          data: {
            ...userData,
            role: {
              connect: {
                roleId: roleId,
              },
            },
          },
        });
      } else if (modelName === 'sales') {
        const { warehouseId, userId, ...saleData } = data;
        await model.create({
          data: {
            ...saleData,
            warehouse: {
              connect: {
                warehouseId: warehouseId,
              },
            },
            user: {
              connect: {
                userId: userId,
              },
            },
          },
        });
      } else {
        await model.create({
          data,
        });
      }
    }

    console.log(`Seeded ${modelName} with data from ${fileName}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
