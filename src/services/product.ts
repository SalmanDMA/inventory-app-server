import NotFoundError from '../exeptions/NotFoundError';
import { ProductRepository } from '../repositories/product';
import { IProduct } from '../types/model';

const productRepository = new ProductRepository();

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

  async createProduct(product: IProduct) {}
}
