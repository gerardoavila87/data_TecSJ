import { Request, Response } from 'express';
import * as DiscapacidadServices from '../services/DimDiscapacidadServices';

export const getAllDiscapacidades = async (req: Request, res: Response) => {
  try {
    let data;
    const { unidad, inicio, fin, carreras, periodo } = req.query;
    if (carreras) data = await DiscapacidadServices.getDiscapacidadCarrera(carreras as string, inicio as string, fin as string, periodo as string);
    else if (unidad) data = await DiscapacidadServices.getDiscapacidadURC(unidad as string);
    else if (inicio && fin) data = await DiscapacidadServices.getDiscapacidadURFecha(inicio as string, fin as string);
    else if (inicio && fin && unidad) data = await DiscapacidadServices.getDiscapacidadURCFecha(unidad as string, inicio as string, fin as string);
    else data = await DiscapacidadServices.getAllDiscapacidad();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getDiscapacidadesUR = async (req: Request, res: Response) => {
  try {
    const data = await DiscapacidadServices.getDiscapacidadUR();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getDiscapacidadesUO = async (req: Request, res: Response) => {
  try {
    const data = await DiscapacidadServices.getDiscapacidadUO();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getDiscapacidadesUOC = async (req: Request, res: Response) => {
  try {
    const { unidad } = req.params;
    const data = await DiscapacidadServices.getDiscapacidadUOC(unidad);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getDiscapacidadesURC = async (req: Request, res: Response) => {
  try {
    const { unidad } = req.params;
    const data = await DiscapacidadServices.getDiscapacidadURC(unidad);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getDiscapacidadesURFecha = async (req: Request, res: Response) => {
  try {
    const { fechaInicio, fechaFin } = req.params;
    const data = await DiscapacidadServices.getDiscapacidadURFecha(fechaInicio, fechaFin);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getDiscapacidadesURCFecha = async (req: Request, res: Response) => {
  try {
    const { unidad, fechaInicio, fechaFin } = req.params;
    const data = await DiscapacidadServices.getDiscapacidadURCFecha(unidad, fechaInicio, fechaFin);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};