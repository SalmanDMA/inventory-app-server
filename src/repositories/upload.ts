import { PrismaClient } from '@prisma/client';
import { IUpload } from '../types/model';

const prisma = new PrismaClient();

export class UploadRepository {
  async getUploads() {
    const uploads = await prisma.uploads.findMany();
    return uploads;
  }

  async getUploadById(uploadId: string) {
    const upload = await prisma.uploads.findUnique({
      where: {
        uploadId,
      },
    });
    return upload;
  }

  async create(upload: IUpload) {
    const newUpload = await prisma.uploads.create({
      data: {
        filename: upload.filename,
        category: upload.category,
        path: upload.path,
        extension: upload.extension,
        filenameOrigin: upload.filenameOrigin,
        mime: upload.mime,
        size: upload.size,
        type: upload.type,
      },
    });
    return newUpload;
  }

  async update(upload: IUpload) {
    const updatedUpload = await prisma.uploads.update({
      where: {
        uploadId: upload.uploadId,
      },
      data: {
        filename: upload.filename,
        category: upload.category,
        path: upload.path,
        extension: upload.extension,
        filenameOrigin: upload.filenameOrigin,
        mime: upload.mime,
        size: upload.size,
        type: upload.type,
      },
    });
    return updatedUpload;
  }

  async softDelete(uploadId: string): Promise<IUpload> {
    const deletedUpload = await prisma.uploads.update({
      where: {
        uploadId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return deletedUpload as IUpload;
  }

  async restore(uploadId: string): Promise<IUpload> {
    const restoredUpload = await prisma.uploads.update({
      where: {
        uploadId,
      },
      data: {
        deletedAt: null,
      },
    });

    return restoredUpload as IUpload;
  }

  async forceDelete(uploadId: string): Promise<IUpload> {
    const forceDeletedUpload = await prisma.uploads.delete({
      where: {
        uploadId,
      },
    });

    return forceDeletedUpload as IUpload;
  }
}
