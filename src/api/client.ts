import axios, { type AxiosError } from "axios";

type ErrorBody = { message?: string; errors?: Record<string, string[]> };

/** The sentence to show someone: the first field problem if there is one, or the server's message. */
function errorMessage(error: AxiosError<ErrorBody>): string {
  if (!error.response) return "We can't reach the server right now. Please try again.";
  const fieldProblems = Object.values(error.response.data?.errors ?? {});
  return fieldProblems[0]?.[0] ?? error.response.data?.message ?? "Something went wrong. Please try again.";
}

/** Every call to the backend goes through this. It turns failures into plain messages. */
export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { Accept: "application/json" },
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorBody>) => {
    throw new Error(errorMessage(error));
  },
);
