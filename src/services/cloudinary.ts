import { v4 as uuidv4 } from 'uuid';
import cloudinary from '../configs/cloudinary';
import InvariantError from '../exeptions/InvariantError';

interface IUploadImage {
  image: string;
  folder: string;
  prefix: string;
  subFolder?: string;
}

const handleUploadImage = async ({ image, folder, prefix, subFolder }: IUploadImage) => {
  const id = uuidv4();

  if (!image) {
    throw new InvariantError('Image is required');
  }

  if (!folder) {
    throw new InvariantError('Folder is required');
  }

  if (!prefix) {
    throw new InvariantError('Prefix is required');
  }

  const result = await cloudinary.uploader.upload(image, {
    public_id: `${prefix}-${id}`,
    resource_type: 'auto',
    folder: `inventory-app/${folder}${subFolder ? `/${subFolder}` : ''}`,
  });

  const { public_id, url } = result;

  return { public_id, url };
};

const handleRemoveImage = async (imageId: string) => {
  if (!imageId) {
    throw new InvariantError('Image id is required');
  }

  const result = await cloudinary.uploader.destroy(imageId, (err: any, result: any) => {
    if (err) throw new InvariantError('Image not found') || err;
    return result;
  });

  return result;
};

export { handleUploadImage, handleRemoveImage };
