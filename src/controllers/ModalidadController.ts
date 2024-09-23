import { Request, Response } from 'express';
import * as modalidadServices from '../services/DimModalidadServices';



export const getModalidades = async (req: Request, res: Response) => {
  try {
    const { unidad, fechaInicio, fechaFin } = req.params;
    console.log('unidad:' + unidad +'fechaInicio:' + fechaInicio + 'fechaFin:' + fechaFin )
    let modalidades;
    if (unidad && fechaInicio && fechaFin) {
      // Si se proporcionan unidad y fechas, filtra por ambas
      modalidades = await modalidadServices.getModalidadesUnidadFecha(unidad, fechaInicio, fechaFin);
    } else if (unidad) {
      // Si solo se proporciona la unidad
      modalidades = await modalidadServices.getModalidadesUnidad(unidad);
    } else if (fechaInicio && fechaFin) {
      // Si solo se proporcionan las fechas
      console.log('fechas');
      modalidades = await modalidadServices.getModalidadesFecha(fechaInicio, fechaFin);
    } else {
      // Si no se proporciona ni unidad ni fechas, obtener todas las modalidades
      modalidades = await modalidadServices.getModalidades();
    }

    res.status(200).json(modalidades);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllModalidades = async (req: Request, res: Response) => {
  try {
    const {unidad, carreras, inicio, fin} = req.query;
    const data = await modalidadServices.getAllModalidades(unidad as string, carreras as string, inicio as string, fin as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};