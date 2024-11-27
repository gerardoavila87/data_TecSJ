import { Request, Response } from 'express';
import * as matriculaService from '../services/FactMatriculaService';

export const fetchMatriculaData = async (req: Request, res: Response) => {
  try {
    const data = await matriculaService.getMatricula();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const setMatriculaBackup = async (req: Request, res: Response) => {
  try {
    const data = await matriculaService.insertarNuevasMatriculas();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMatriculaURealF = async (req: Request, res: Response) => {
  try {
    const { fechaInicio, fechaFin } = req.params;
    const data = await matriculaService.getMatriculaUnidadRealF(fechaInicio, fechaFin);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMatriculaUOficialF = async (req: Request, res: Response) => {
  try {
    const { fechaInicio, fechaFin } = req.params;
    const data = await matriculaService.getMatriculaUnidadOficialF(fechaInicio, fechaFin);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMatriculaUReal = async (req: Request, res: Response) => {
  try {
    const { periodo } = req.query;
    const data = await matriculaService.getMatriculaUnidadReal(periodo as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMatriculaUOficial = async (req: Request, res: Response) => {
  try {
    const data = await matriculaService.getMatriculaUnidadOficial();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMatriculaO = async (req: Request, res: Response) => {
  try {
    const { unidad } = req.params;
    const data = await matriculaService.getMatriculaOUnidad(unidad);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMatriculaR = async (req: Request, res: Response) => {
  try {
    const { unidad } = req.params;
    const data = await matriculaService.getMatriculaRUnidad(unidad);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMatriculaRF = async (req: Request, res: Response) => {
  try {
    const { unidad, fechaInicio, fechaFin } = req.params;
    const data = await matriculaService.getMatriculaRUnidadF(unidad, fechaInicio, fechaFin);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMatriculaURealClase = async (req: Request, res: Response) => {
  try {
    const { clase } = req.params;
    const data = await matriculaService.getMatriculaUnidadRealClase(clase);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getEstatusGeneral = async (req: Request, res: Response) => {
  try {
    const { unidad, carreras, inicio, fin, periodo } = req.query;
    const data = await matriculaService.getEstatus(unidad as string, carreras as string, inicio as string, fin as string, periodo as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getSemestreGeneral = async (req: Request, res: Response) => {
  try {
    const { unidad, carreras, inicio, fin, periodo } = req.query;
    const data = await matriculaService.getSemestre(unidad as string, carreras as string, inicio as string, fin as string, periodo as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMatriculaURealCorte = async (req: Request, res: Response) => {
  try {
    const data = await matriculaService.getMatriculaRealCorte();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMatriculaURealTotal = async (req: Request, res: Response) => {
  try {
    const { inicio, fin, unidad, periodo } = req.query;
    const data = await matriculaService.getMatriculaRealTotal(unidad as string, inicio as string, fin as string, periodo as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMatriculaPeriodo = async (req: Request, res: Response) => {
  try {
    const { inicio, fin, unidad, periodo } = req.query;
    const data = await matriculaService.getMatriculaPeriodo(unidad as string, inicio as string, fin as string, periodo as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMatriculaVariacion = async (req: Request, res: Response) => {
  try {
    const { periodo } = req.query;
    const data = await matriculaService.getMatriculaVariacion(periodo as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getDuplicados = async (req: Request, res: Response) => {
  try {
    const data = await matriculaService.getDuplicados();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};