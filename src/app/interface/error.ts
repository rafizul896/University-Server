export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponce = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
