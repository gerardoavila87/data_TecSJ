import { Request, Response } from 'express';
import { getAllEstudio, getEstudioUR, getEstudioUO, getEstudioUOC, getEstudioURC, getEstudioURCarrera } from '../services/DimEstudiosServices';

export const getAllEstudios = async (req: Request, res: Response) => {
  try {
    let data;
    const { inicio, fin, unidad, carreras } = req.query;
    data = await getAllEstudio(unidad as string, carreras as string, inicio as string, fin as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getEstudiosUR = async (req: Request, res: Response) => {
  try {
    const data = await getEstudioUR();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getEstudiosUO = async (req: Request, res: Response) => {
  try {
    const data = await getEstudioUO();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getEstudiosUOC = async (req: Request, res: Response) => {
  try {
    const { unidad } = req.params;
    const data = await getEstudioUOC(unidad);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getEstudiosURC = async (req: Request, res: Response) => {
  try {
    const { unidad } = req.params;
    const data = await getEstudioURC(unidad);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getEstudiosURCarrera = async (req: Request, res: Response) => {
  try {
    const { unidad } = req.params;
    const data = await getEstudioURCarrera(unidad);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
