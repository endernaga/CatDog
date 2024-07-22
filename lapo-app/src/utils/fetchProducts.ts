export const BASE_URL = process.env.PUBLIC_URL;
export const API_URL = "http://localhost:8000/api";
export const MEDIA_URL = "http://localhost:8000";

type httpMethod = "GET" | "POST" | "DELETE";

function request<T>(
  url: string,
  method: httpMethod = "GET",
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json; charset=UTF-8",
      Accept: "application/json",
    };
  }

  return fetch(API_URL + url, options).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
}

export const client = {
  get: <T>(url: string) => request<T>(url, 'GET'),
  post: <T>(url: string, data: any, ) => request<T>(url, 'POST', data),
  delete: <T>(url: string) => request<T>(url, 'DELETE'),
};
