import { PrismaClient } from '@prisma/client';
import { ICategory } from '../types/model';

const prisma = new PrismaClient();

export class CategoryRepository {
  async getAllCategories(): Promise<ICategory[]> {
    const categories = await prisma.categories.findMany({
      include: {
        childCategories: true,
        parentCategory: true,
        products: true,
      },
    });

    return categories as ICategory[];
  }

  async getCategoryById(id: number): Promise<ICategory | null> {
    const categoryId = typeof id === 'number' ? id : parseInt(id, 10);

    const category = await prisma.categories.findUnique({
      where: {
        categoryId,
      },
      include: {
        childCategories: true,
        parentCategory: true,
        products: true,
      },
    });

    return category as ICategory;
  }

  async getCategoryByName(name: string): Promise<ICategory | null> {
    const category = await prisma.categories.findUnique({
      where: {
        name,
      },
      include: {
        childCategories: true,
        parentCategory: true,
        products: true,
      },
    });

    return category as ICategory;
  }

  async getChildCategories(parentId: number): Promise<ICategory[]> {
    const childCategories = await prisma.categories.findMany({
      where: {
        parentId,
      },
    });

    return childCategories as ICategory[];
  }

  async create(category: ICategory): Promise<ICategory> {
    const { childCategories, parentCategory, products, categoryId, ...categoryData } = category;

    const maxCategoryId = await prisma.categories.findFirst({
      orderBy: {
        categoryId: 'desc',
      },
      select: {
        categoryId: true,
      },
    });

    const nextCategoryId = (maxCategoryId?.categoryId || 0) + 1;

    const createdCategory = await prisma.categories.create({
      data: {
        ...categoryData,
        categoryId: nextCategoryId,
      },
    });

    return createdCategory as ICategory;
  }

  async update(category: ICategory): Promise<ICategory> {
    const { childCategories, parentCategory, products, categoryId, ...categoryData } = category;

    const updatedCategory = await prisma.categories.update({
      where: {
        categoryId: category.categoryId,
      },
      data: {
        ...categoryData,
      },
    });

    return updatedCategory as ICategory;
  }

  async softDelete(categoryId: number): Promise<ICategory> {
    const deletedCategory = await prisma.categories.update({
      where: {
        categoryId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return deletedCategory as ICategory;
  }

  async restore(categoryId: number): Promise<ICategory> {
    const restoredCategory = await prisma.categories.update({
      where: {
        categoryId,
      },
      data: {
        deletedAt: null,
      },
    });

    return restoredCategory as ICategory;
  }

  async forceDelete(categoryId: number): Promise<ICategory> {
    const forceDeletedCategory = await prisma.categories.delete({
      where: {
        categoryId,
      },
    });

    return forceDeletedCategory as ICategory;
  }
}
