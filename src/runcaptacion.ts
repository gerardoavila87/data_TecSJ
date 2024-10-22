import { Request, Response } from 'express';
import { fetchCaptacion } from './controllers/CaptacionController';

// Simular el objeto de respuesta
const res: Partial<Response> = {
  status: function (code: number) {
    console.log(`Status: ${code}`);
    return this as Response;
  },
  json: function (data: any) {
    console.log('Data:', data);
  } as any
};

// Simula la llamada al controlador
fetchCaptacion({} as Request, res as Response).catch(error => {
  console.error('Error durante la ejecución de la consulta:', error);
});
