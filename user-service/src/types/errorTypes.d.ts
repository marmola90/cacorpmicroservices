// No siempre es necesario implementaras tipos! A no ser que este se vuelva necesario para control de elementos
export type typeErrorDB = 'ERROR_GET_ALL' | 'ERROR_GET' | 'ERROR_UPDATE' | 'ERROR_INSERT' | 'ERROR_ELIMINAR' | 'ERROR_DECRYPT_PASS' | 'ERROR_ENCRYPT_PASS' | 'ERROR_POST_LOGIN'
export type errorInterno = {
  ErrorInterno: typeErrorDB;
  ErrorDetail: any;

}

