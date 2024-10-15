import InvariantError from '../exeptions/InvariantError';
import NotFoundError from '../exeptions/NotFoundError';
import { BrandRepository } from '../repositories/brand';
import { CategoryRepository } from '../repositories/category';
import { ProductRepository } from '../repositories/product';
import { IProduct } from '../types/model';
import { v4 as uuidv4 } from 'uuid';
import { getUpdatedFields } from '../utils/common';

const productRepository = new ProductRepository();
const brandRepository = new BrandRepository();
const categoryRepository = new CategoryRepository();

export class ProductService {
  async getProducts() {
    return await productRepository.getAllProducts();
  }

  async getProductById(id: string) {
    const product = await productRepository.getProductById(id);

    if (!product) {
      throw new NotFoundError('Product not found, please register first');
    }

    return product;
  }

  async updateProduct(product: IProduct) {
    const productData = await productRepository.getProductById(product.productId);

    if (!productData) {
      throw new NotFoundError('Product not found, please register first');
    }

    const updatedFields = getUpdatedFields(product, productData);

    if (typeof product.categoryId === 'string') {
      product.categoryId = parseInt(product.categoryId, 10);
    }

    if (product.categoryId !== productData.categoryId || product.brandId !== productData.brandId) {
      const categoryCode = await categoryRepository.getCategoryById(product.categoryId);
      const brandCode = await brandRepository.getBrandById(product.brandId);

      if (!categoryCode || !brandCode) {
        throw new InvariantError('Invalid category or brand');
      }

      const categoryAlias = categoryCode.alias || categoryCode.name?.substring(0, 3).toUpperCase();
      const brandAlias = brandCode.alias || brandCode.name?.substring(0, 3).toUpperCase();

      const uniqueCode = uuidv4().slice(0, 6).toUpperCase();

      updatedFields.sku = `${categoryAlias}-${brandAlias}-${uniqueCode}`;
      updatedFields.categoryId = product.categoryId;
      updatedFields.brandId = product.brandId;
    }

    if (Object.keys(updatedFields).length === 0) {
      return productData;
    }

    const updatedProduct = await productRepository.updateProduct({
      ...productData,
      ...updatedFields,
    });

    return updatedProduct;
  }

  async createProduct(product: IProduct) {
    if (
      !product.name ||
      !product.price ||
      !product.stock ||
      !product.reorderLevel ||
      !product.categoryId ||
      !product.brandId ||
      !product.supplierId
    ) {
      throw new InvariantError('Please provide all required fields');
    }

    if (typeof product.categoryId === 'string') {
      product.categoryId = parseInt(product.categoryId, 10);
    }

    const categoryCode = await categoryRepository.getCategoryById(product.categoryId);
    const brandCode = await brandRepository.getBrandById(product.brandId);

    if (!categoryCode || !brandCode) {
      throw new InvariantError('Invalid category or brand');
    }

    const categoryAlias = categoryCode.alias || categoryCode.name?.substring(0, 3).toUpperCase();
    const brandAlias = brandCode.alias || brandCode.name?.substring(0, 3).toUpperCase();

    const uniqueCode = uuidv4().slice(0, 6).toUpperCase();

    product.sku = `${categoryAlias}-${brandAlias}-${uniqueCode}`;

    const createdProduct = await productRepository.createProduct(product);
    return createdProduct;
  }

  async softDeleteProducts(productIds: string[]) {
    for (const productId of productIds) {
      const productData = await productRepository.getProductById(productId);
      if (!productData) {
        throw new NotFoundError(`Product with ID ${productId} not found, please register first`);
      }

      await productRepository.softDelete(productData.productId);
    }
  }

  async restoreProducts(productIds: string[]) {
    for (const productId of productIds) {
      const productData = await productRepository.getProductById(productId);
      if (!productData) {
        throw new NotFoundError(`Product with ID ${productId} not found, please register first`);
      }
      await productRepository.restore(productData.productId);
    }
  }

  async forceDeleteProducts(productIds: string[]) {
    for (const productId of productIds) {
      const productData = await productRepository.getProductById(productId);
      if (!productData) {
        throw new NotFoundError(`Product with ID ${productId} not found, please register first`);
      }
      await productRepository.forceDelete(productData.productId);
    }
  }
}
