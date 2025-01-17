export const errorMessage = (error: string) => {
  return error.length > 100
    ? `${error.substring(0, error.length - error.length / 2)}...`
    : error
}
