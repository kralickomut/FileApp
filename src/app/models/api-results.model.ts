export interface ApiResult<T> {
  result: T;
  success: boolean;
}

export interface Token {
  token: string;
}

export interface File {
  fileUrl: string,
  createdOn: string,
  fileName: string,
  fileSize: number
}
