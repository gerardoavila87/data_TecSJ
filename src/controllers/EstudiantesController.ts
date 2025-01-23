import { Request, Response } from 'express';
import * as estudiantesServices from '../services/DimEstudianteServices';

export const getEstudiantes = async (req: Request, res: Response) => {
  try {
    const { tipo } = req.params;
    const {inicio, fin, unidad, carreras, periodo} = req.query;
    const data = await estudiantesServices.getEstudiantes(tipo, unidad as string, inicio as string, fin as string, carreras as string, periodo as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
