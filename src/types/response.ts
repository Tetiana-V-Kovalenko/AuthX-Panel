export interface TResponse {
  status: "success" | "error";
  message: string;
  user: { email: string } | null;
}
