import { Request, Response } from 'express';
import { getAllDiscapacidad, getDiscapacidadU, getDiscapacidadC } from '../services/DimDiscapacidadServices';

export const getAllDiscapacidades = async (req: Request, res: Response) => {
  try {
    const data = await getAllDiscapacidad();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getDiscapacidadesU = async (req: Request, res: Response) => {
  try {
    const { unidad } = req.params;
    const data = await getDiscapacidadU(unidad);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getDiscapacidadesC = async (req: Request, res: Response) => {
  try {
    const { unidad, carrera } = req.params;
    const data = await getDiscapacidadC(unidad, carrera);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};