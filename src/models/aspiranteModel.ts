export interface AspiranteType {
    curp: string;  // char(18)
    nombre: string;  // varchar(100)
    primerApellido: string;  // varchar(25)
    segundoApellido: string;  // varchar(25)
    lugarNacimiento: string;  // varchar(100)
    genero: string;  // char(1)
    indigena: string;  // char(1) ('N' en el select)
}
