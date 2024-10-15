import InvariantError from '../exeptions/InvariantError';
import NotFoundError from '../exeptions/NotFoundError';
import { CategoryRepository } from '../repositories/category';
import { ICategory } from '../types/model';

const categoryRepository = new CategoryRepository();

export class CategoryService {
  async getCategories() {
    return await categoryRepository.getAllCategories();
  }

  async getCategoryById(id: number) {
    const category = await categoryRepository.getCategoryById(id);

    if (!category) {
      throw new NotFoundError('Category not found, please register first');
    }

    return category;
  }

  async updateCategory(category: ICategory) {
    const categoryData = await categoryRepository.getCategoryById(category.categoryId as number);

    if (!categoryData) {
      throw new NotFoundError('Category not found, please register first');
    }

    if (category.name && category.name.toLocaleLowerCase() !== categoryData.name.toLocaleLowerCase()) {
      const categoryExist = await categoryRepository.getCategoryByName(category.name.toLocaleLowerCase());
      if (categoryExist) {
        throw new InvariantError('Category already exists, please try another name');
      }
    }

    let path = categoryData.path;

    if (category.parentId && category.parentId !== categoryData.parentId) {
      const parentCategory = await categoryRepository.getCategoryById(category.parentId);
      if (parentCategory) {
        path = `${parentCategory.path}/${category.categoryId}`.replace(/\/+/g, '/');
      } else {
        throw new NotFoundError('Parent category not found');
      }
    } else if (!category.parentId) {
      path = `/${category.categoryId}`;
    }

    const parseParentId =
      typeof category.parentId === 'number'
        ? category.parentId
        : category.parentId
        ? parseInt(category.parentId as unknown as string, 10)
        : null;

    const parseCategoryId =
      typeof category.categoryId === 'number'
        ? category.categoryId
        : parseInt(category.categoryId as unknown as string, 10);

    const updatedCategoryData = {
      ...categoryData,
      ...category,
      path,
      parentId: parseParentId,
      categoryId: parseCategoryId,
    };

    const updatedCategory = await categoryRepository.update(updatedCategoryData);

    return updatedCategory;
  }

  async createCategory(category: ICategory) {
    if (category.name) {
      const categoryExist = await categoryRepository.getCategoryByName(category.name.toLocaleLowerCase());
      if (categoryExist) {
        throw new InvariantError('Category already exists, please try another name');
      }
    }

    const parseParentId =
      typeof category.parentId === 'number'
        ? category.parentId
        : category.parentId
        ? parseInt(category.parentId as unknown as string, 10)
        : null;

    const createdCategory = await categoryRepository.create({
      ...category,
      parentId: parseParentId,
    });

    let path = `/${createdCategory.categoryId}`;

    if (createdCategory.parentId) {
      const parentCategory = await categoryRepository.getCategoryById(createdCategory.parentId);
      if (parentCategory) {
        path = `${parentCategory.path}/${createdCategory.categoryId}`;
      }
    }

    createdCategory.path = path;
    await categoryRepository.update(createdCategory);

    return createdCategory;
  }

  async softDeleteCategories(categoryIds: number[]) {
    for (const categoryId of categoryIds) {
      const categoryData = await categoryRepository.getCategoryById(categoryId);
      if (!categoryData) {
        throw new NotFoundError(`Category with ID ${categoryId} not found, please register first`);
      }

      const childCategories = await categoryRepository.getChildCategories(categoryId);
      if (childCategories && childCategories.length > 0) {
        await this.softDeleteCategories(childCategories.map((child) => child.categoryId as number));
      }

      await categoryRepository.softDelete(categoryData.categoryId as number);
    }
  }

  async restoreCategories(categoryIds: number[]) {
    for (const categoryId of categoryIds) {
      const categoryData = await categoryRepository.getCategoryById(categoryId);
      if (!categoryData) {
        throw new NotFoundError(`Category with ID ${categoryId} not found, please register first`);
      }

      const childCategories = await categoryRepository.getChildCategories(categoryId);
      if (childCategories && childCategories.length > 0) {
        await this.restoreCategories(childCategories.map((child) => child.categoryId as number));
      }

      await categoryRepository.restore(categoryData.categoryId as number);
    }
  }

  async forceDeleteCategories(categoryIds: number[]) {
    for (const categoryId of categoryIds) {
      const categoryData = await categoryRepository.getCategoryById(categoryId);
      if (!categoryData) {
        throw new NotFoundError(`Category with ID ${categoryId} not found, please register first`);
      }

      const childCategories = await categoryRepository.getChildCategories(categoryId);
      if (childCategories && childCategories.length > 0) {
        await this.forceDeleteCategories(childCategories.map((child) => child.categoryId as number));
      }

      await categoryRepository.forceDelete(categoryData.categoryId as number);
    }
  }
}
