import { Request, Response } from 'express';
import * as procedenciasServices from '../services/DimProcedenciaServices';



export const getProcedencias = async (req: Request, res: Response) => {
  try {
    const { unidad, fechaInicio, fechaFin } = req.params;
    console.log('unidad:' + unidad + 'fechaInicio:' + fechaInicio + 'fechaFin:' + fechaFin)
    let modalidades;
    if (unidad && fechaInicio && fechaFin) {
      // Si se proporcionan unidad y fechas, filtra por ambas
      modalidades = await procedenciasServices.getProcedenciasUnidadFecha(unidad, fechaInicio, fechaFin);
    } else if (unidad) {
      // Si solo se proporciona la unidad
      modalidades = await procedenciasServices.getProcedenciasUnidad(unidad);
    } else if (fechaInicio && fechaFin) {
      // Si solo se proporcionan las fechas
      console.log('fechas');
      modalidades = await procedenciasServices.getProcedenciasFecha(fechaInicio, fechaFin);
    } else {
      // Si no se proporciona ni unidad ni fechas, obtener todas las modalidades
      modalidades = await procedenciasServices.getProcedencias();
    }

    res.status(200).json(modalidades);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllProcedencias = async (req: Request, res: Response) => {
  try {
    const { unidad, carreras, inicio, fin } = req.query;
    const data = await procedenciasServices.getAllProcedencias(unidad as string, carreras as string, inicio as string, fin as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};