import NotFoundError from '../exeptions/NotFoundError';
import { UploadRepository } from '../repositories/upload';
import { IUpload } from '../types/model';

const uploadRepository = new UploadRepository();

export class UploadService {
  async getUploads() {
    return uploadRepository.getUploads();
  }
  async getUploadById(uploadId: string) {
    const upload = await uploadRepository.getUploadById(uploadId);

    if (!upload) {
      throw new NotFoundError('Upload not found');
    }

    return upload;
  }
  async create(upload: IUpload) {
    if (!upload.filename || !upload.path || !upload.category || !upload.type) {
      throw new Error('Required fields are missing');
    }

    return uploadRepository.create(upload);
  }

  async update(upload: IUpload) {
    if (!upload.uploadId) {
      throw new Error('Required fields are missing');
    }

    const uploadExists = await this.getUploadById(upload.uploadId);

    if (!uploadExists) {
      throw new NotFoundError('Upload not found');
    }

    return uploadRepository.update(upload);
  }

  async softDelete(uploadIds: string[]) {
    for (const id of uploadIds) {
      const upload = await this.getUploadById(id);

      if (!upload) {
        throw new NotFoundError(`Upload with id ${id} not found`);
      }

      await uploadRepository.softDelete(id);
    }
  }

  async restore(uploadIds: string[]) {
    for (const id of uploadIds) {
      const upload = await this.getUploadById(id);

      if (!upload) {
        throw new NotFoundError(`Upload with id ${id} not found`);
      }

      await uploadRepository.restore(id);
    }
  }

  async forceDelete(uploadIds: string[]) {
    for (const id of uploadIds) {
      const upload = await this.getUploadById(id);

      if (!upload) {
        throw new NotFoundError(`Upload with id ${id} not found`);
      }

      await uploadRepository.forceDelete(id);
    }
  }
}
