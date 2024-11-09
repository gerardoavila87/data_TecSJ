import { Request, Response } from 'express';
import * as fechaServices from '../services/DimFechaServices';

export const getAllFechas = async (req: Request, res: Response) => {
  try {
    const { periodo } = req.params;
    const data = await fechaServices.getAllFechas(periodo);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getPeriodo = async (req: Request, res: Response)=>{
  try {
    const data = await fechaServices.getPeriodo();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });

  }
};

export const getFecha = async (req: Request, res: Response) => {
  try {
    const data = await fechaServices.getFechaAct();
    res.json(data);
  } catch (error) {
    
  }
}