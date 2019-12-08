export interface Componente{
    icon: string;
    name: string;
    redirectTo: string;
}
export interface menu{
    photo?: string;
    nombre?: string;
}

export interface login{
    id: string;
    ok: boolean;
    message?: string[];
}

export interface Usuarios{
    _id?: string;
    photo?: string;
    first_name?: string;
    last_name?: string;
    cedula?: string;
    date_nacimiento?: string;
    direccion?: string;
    celular?: string
    genero?: string;
    ocupacion?:string
    carrera?: string;
    codigo?: string; 
    password?: string;
    rol?: string;
    like?: number;
    estado?: string; 
      
}
export interface RespuestaPosts {
    _id?: string;
    id_usuario?: string;
    photo?: string;
    first_name?: string;
    last_name?: string;
    descripcion?: string;
    lugar?: string;
    ubicacion?: string;
    like?: number;
    createdAt?: string;
    comentario?: any;
    show?: boolean;
  }

export interface Post {
    descripcion?: string;
    ubicacion?: string;
    id_usuario?: string;
    lugar?: string;
    like?: string;
}

export interface Comentarios {
    descripcion?: string;
    id_usuario?: string;
    photo?: string;
    first_name?: string;
    last_name?: string;
    id_post?: string;
}

export interface Comentario {
    descripcion?: string;
    id_usuario?: string;
    id_post?: string;
}

export interface listDenuncias {
    id_usuario?: string;
    photo?: string;
    first_name?: string;
    last_name?: string;
    descripcion?: string;
}

export interface Denuncia{
    id_usuario?: string;
    id_userBad?: string;
    descripcion?: string;
    motivo?: string;
}




