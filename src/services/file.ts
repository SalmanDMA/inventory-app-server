import NotFoundError from '../exeptions/NotFoundError';
import { UploadRepository } from '../repositories/upload';

const uploadRepository = new UploadRepository();

export class FileService {
  async getFile(id: string) {
    const file = await uploadRepository.getUploadById(id);

    if (!file) {
      throw new NotFoundError('File not found');
    }

    return file.path;
  }
}
