import { Request, Response } from 'express';
import * as captacionServices from '../services/CaptacionServices';

export const fetchCaptacion = async (req: Request, res: Response) => {
    try {
        const data = await captacionServices.fetchCaptacion();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const getAllCaptacion = async (req: Request, res: Response) => {
    try {
        const { unidad, carreras, periodo } = req.query;
        const { filtro } = req.params;
        const data = await captacionServices.getAllCaptacion(
            filtro as string,
            unidad as string,
            carreras as string,
            periodo as string
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}