const BASE_URL = "http://localhost:3333";

export async function requestJson(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  // 204 = sucesso sem corpo (comum em DELETE)
  if (response.status === 204) return null;

  // tenta ler json quando existir.
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
