export type TErrorSources = {
  path: string | number;
  message: string;
}[];
export type TCustomError = {
  success: boolean;
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
