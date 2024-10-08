import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardMetrics = async (req: Request, res: Response): Promise<void> => {
  try {
    const popularProducts = await prisma.products.findMany({
      take: 15,
      orderBy: {
        stock: 'desc',
      },
    });

    res.json({
      popularProducts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving dashboard metrics' });
  }
};
