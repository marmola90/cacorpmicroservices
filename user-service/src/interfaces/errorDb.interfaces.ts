import { typeErrorDB } from "../types/errorTypes";

export interface IErrorDb {
  nombreTabla: string,
  errorInterno: typeErrorDB,
  errorDetail: string
}