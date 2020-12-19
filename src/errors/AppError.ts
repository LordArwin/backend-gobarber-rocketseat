class AppError {
  public readonly message: string;

  public readonly status_code: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.status_code = statusCode;
  }
}
export default AppError;
