import InvariantError from '../exeptions/InvariantError';
import NotFoundError from '../exeptions/NotFoundError';
import { ProductRepository } from '../repositories/product';
import { IProductHistory, IUserLogin } from '../types/model';
import { getUpdatedFields } from '../utils/common';
import { ProductHistoryRepository } from '../repositories/productHistory';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const productRepository = new ProductRepository();
const productHistoryRepository = new ProductHistoryRepository();

export class ProductHistoryService {
  async getProductHistories() {
    return await productHistoryRepository.getAllProductHistories();
  }

  async getUniqueProductHistories() {
    return await productHistoryRepository.getAllUniqueProductHistories();
  }

  async getProductHistoriesByProductId(productId: string) {
    return await productHistoryRepository.getAllProductHistoriesByProductId(productId);
  }

  async getProductHistoryById(id: string) {
    const productHistory = await productHistoryRepository.getProductHistoryById(id);

    if (!productHistory) {
      throw new NotFoundError('Product history not found, please register first');
    }

    return productHistory;
  }

  async updateProductHistory(productHistory: IProductHistory, userLogin: IUserLogin) {
    const productHistoryData = await productHistoryRepository.getProductHistoryById(productHistory.productHistoryId);
    if (!productHistoryData) {
      throw new NotFoundError('Product history not found, please register first');
    }
  
    if (!userLogin || !userLogin.id) {
      throw new InvariantError('Please login first');
    }
  
    productHistory.userId = userLogin.id;
  
    const updatedFields = getUpdatedFields(productHistory, productHistoryData);
  
    if (updatedFields.productId && updatedFields.productId !== productHistoryData.productId) {
      const productData = await productRepository.getProductById(updatedFields.productId as string);
      if (!productData) {
        throw new NotFoundError('Product not found, please register first');
      }
    }
  
    if (Object.keys(updatedFields).length === 0) {
      return productHistoryData;
    }
  
    const updatedProductHistory = await prisma.$transaction(async (prisma) => {
      const updatedHistory = await productHistoryRepository.updateProductHistory({
        ...productHistoryData,
        ...updatedFields,
      });
  
      if (updatedFields.newPrice) {
        const latestProductHistory = await productHistoryRepository.getLatestProductHistoryByProductId(productHistoryData.productId);
        
        if (latestProductHistory && latestProductHistory.newPrice === updatedFields.newPrice) {
          const productData = await productRepository.getProductById(productHistoryData.productId);
          if (productData) {
            productData.price = updatedFields.newPrice;
            await productRepository.updateProduct(productData);
          }
        }
      }
  
      return updatedHistory;
    });
  
    return updatedProductHistory;
  }

  async createProductHistory(productHistory: IProductHistory, userLogin: IUserLogin) {
    if (!productHistory.productId || typeof productHistory.newPrice !== 'number') {
      throw new InvariantError('Please provide all required fields');
    }
  
    if (!userLogin || !userLogin.id) {
      throw new InvariantError('Please login first');
    }
  
    const productData = await productRepository.getProductById(productHistory.productId);
    if (!productData) {
      throw new NotFoundError('Product not found, please register first');
    }
  
    productHistory.userId = userLogin.id;
    productHistory.oldPrice = productData.price;
  
    const createdProductHistory = await prisma.$transaction(async (prisma) => {
      const createdHistory = await productHistoryRepository.createProductHistory(productHistory);
      
      productData.price = createdHistory.newPrice;
      await productRepository.updateProduct(productData);
  
      return createdHistory;
    });
  
    return createdProductHistory;
  }

  async softDeleteProductHistories(productHistoryIds: string[]) {
    for (const productHistoryId of productHistoryIds) {
      const productHistoryData = await productHistoryRepository.getProductHistoryById(productHistoryId);
      if (!productHistoryData) {
        throw new NotFoundError(`Product history with ID ${productHistoryId} not found, please register first`);
      }

      await productHistoryRepository.softDelete(productHistoryData.productHistoryId);
    }
  }

  async restoreProductHistories(productHistoryIds: string[]) {
    for (const productHistoryId of productHistoryIds) {
      const productHistoryData = await productHistoryRepository.getProductHistoryById(productHistoryId);
      if (!productHistoryData) {
        throw new NotFoundError(`Product history with ID ${productHistoryId} not found, please register first`);
      }
      await productHistoryRepository.restore(productHistoryData.productHistoryId);
    }
  }

  async forceDeleteProductHistories(productHistoryIds: string[]) {
    for (const productHistoryId of productHistoryIds) {
      const productHistoryData = await productHistoryRepository.getProductHistoryById(productHistoryId);
      if (!productHistoryData) {
        throw new NotFoundError(`Product history with ID ${productHistoryId} not found, please register first`);
      }
      await productHistoryRepository.forceDelete(productHistoryData.productHistoryId);
    }
  }
}
