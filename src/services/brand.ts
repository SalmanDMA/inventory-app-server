import InvariantError from '../exeptions/InvariantError';
import NotFoundError from '../exeptions/NotFoundError';
import { BrandRepository } from '../repositories/brand';
import { IBrand } from '../types/model';

const brandRepository = new BrandRepository();

export class BrandService {
  async getBrands() {
    return await brandRepository.getAllBrands();
  }

  async getBrandById(id: string) {
    const brand = await brandRepository.getBrandById(id);

    if (!brand) {
      throw new NotFoundError('Brand not found, please register first');
    }

    return brand;
  }

  async updateBrand(brand: IBrand) {
    const brandData = await brandRepository.getBrandById(brand.brandId);

    if (!brandData) {
      throw new NotFoundError('Brand not found, please register first');
    }

    const updatedBrand = await brandRepository.updateBrand(brand);

    return updatedBrand;
  }

  async createBrand(brand: IBrand) {
    if (!brand.name) {
      throw new InvariantError('Please provide all required fields');
    }

    const createdBrand = await brandRepository.createBrand(brand);
    return createdBrand;
  }

  async softDeleteBrands(brandIds: string[]) {
    for (const brandId of brandIds) {
      const brandData = await brandRepository.getBrandById(brandId);
      if (!brandData) {
        throw new NotFoundError(`Brand with ID ${brandId} not found, please register first`);
      }
      await brandRepository.softDelete(brandData.brandId);
    }
  }

  async restoreBrands(brandIds: string[]) {
    for (const brandId of brandIds) {
      const brandData = await brandRepository.getBrandById(brandId);
      if (!brandData) {
        throw new NotFoundError(`Brand with ID ${brandId} not found, please register first`);
      }
      await brandRepository.restore(brandData.brandId);
    }
  }

  async forceDeleteBrands(brandIds: string[]) {
    for (const brandId of brandIds) {
      const brandData = await brandRepository.getBrandById(brandId);
      if (!brandData) {
        throw new NotFoundError(`Brand with ID ${brandId} not found, please register first`);
      }
      await brandRepository.forceDelete(brandData.brandId);
    }
  }
}
