export const fetcher = async <ResponseData>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  path: string,
  data?: Record<string, unknown>
): Promise<ResponseData> => {
  const token = localStorage.getItem("token");
  const authorization = token ? `Bearer ${token}` : "";

  const url = new URL(
    path,
    process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"
  );

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json", authorization },
    body: data ? JSON.stringify(data) : undefined,
  });

  const json = await response.json();

  if (response.ok) {
    return json;
  } else {
    return Promise.reject(json as Promise<ResponseData>);
  }
};
