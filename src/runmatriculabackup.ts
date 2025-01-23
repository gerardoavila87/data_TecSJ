import { Request, Response } from 'express';
import { fetchMatriculaData, setMatriculaBackup } from './controllers/FactMatriculaController';

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
setMatriculaBackup({} as Request, res as Response).catch(error => {
  console.error('Error durante la ejecución de la consulta:', error);
});
