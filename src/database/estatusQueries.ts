export const queries = {
  getIdEstatus: `
    SELECT idEstatus AS id
      FROM DimEstatusCaptacion
     WHERE estatus = :estatus;`
};