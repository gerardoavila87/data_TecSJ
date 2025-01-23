import { Request, Response } from 'express';
import { getAllUnidadOficial, getAllUnidadReal } from '../services/DimUnidadServices';

export const getAllUnidadO = async (req: Request, res: Response) => {
  try {
    const data = await getAllUnidadOficial();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllUnidadR = async (req: Request, res: Response) => {
  try {
    const data = await getAllUnidadReal();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};