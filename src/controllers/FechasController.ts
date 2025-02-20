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

export const getDate = async (req: Request, res: Response) => {
  try {
    const data = await fechaServices.getDate();
    res.json(data);
  } catch (error) {
    
  }
}

export const getLast = async (req: Request, res: Response) => {
  try {
    const data = await fechaServices.getLast();
    res.json(data);
  } catch (error) {
    
  }
}

export const getPeriodos = async (req: Request, res: Response) => {
  try {
    const periodos = await fechaServices.getPeriodos();
    res.status(200).json(periodos);
  } catch (error) {
    console.error('Error al obtener los periodos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
