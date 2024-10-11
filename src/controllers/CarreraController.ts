import { Request, Response } from 'express';
import { getAllCarrerasUO, getAllCarrerasUR, getCarreraUO, getCarreraUR, getAllCarrerasUReal } from '../services/DimCarreraServices';

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

export const getAllCarrerasReal = async (req: Request, res: Response) => {
  try {
    const data = await getAllCarrerasUReal();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getCarreraR = async (req: Request, res: Response) => {
  try {
    const { unidad } = req.params;
    const { inicio, fin, periodo } = req.query;
    const data = await getCarreraUR(unidad, inicio as string, fin as string, periodo as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};