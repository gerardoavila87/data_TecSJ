import { Request, Response } from 'express';
import { getMatricula, getMatriculaUnidadReal, getMatriculaUnidadOficial, getMatriculaOUnidad, getMatriculaRUnidad } from '../services/FactMatriculaService';

export const fetchMatriculaData = async (req: Request, res: Response) => {
  try {
    const data = await getMatricula();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMatriculaUReal = async (req: Request, res: Response) => {
  try {
    const data = await getMatriculaUnidadReal();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMatriculaUOficial = async (req: Request, res: Response) => {
  try {
    const data = await getMatriculaUnidadOficial();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMatriculaO = async (req: Request, res: Response) => {
  try {
    const {unidad} = req.params;
    const data = await getMatriculaOUnidad(unidad);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMatriculaR = async (req: Request, res: Response) => {
  try {
    const {unidad} = req.params;
    const data = await getMatriculaRUnidad(unidad);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};