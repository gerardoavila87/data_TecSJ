import { Request, Response } from 'express';
import { getAllCarrerasUO, getAllCarrerasUR, getCarreraUO, getCarreraUR } from '../services/DimCarreraServices';

export const getAllCarrerasO = async (req: Request, res: Response) => {
  try {
    const { unidad } = req.params;
    const data = await getAllCarrerasUO(unidad);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getCarreraO = async (req: Request, res: Response) => {
  try {
    const { unidad } = req.params;
    const data = await getCarreraUO(unidad);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllCarrerasR = async (req: Request, res: Response) => {
  try {
    const { unidad } = req.params;
    const data = await getAllCarrerasUR(unidad);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getCarreraR = async (req: Request, res: Response) => {
  try {
    const { unidad } = req.params;
    const data = await getCarreraUR(unidad);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};