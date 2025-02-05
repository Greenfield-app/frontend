async function fetchHelper<T>(url: string): Promise<T> {
  const response = await fetch(`${url}/api`, { method: "GET" });
  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return (await response.json()) as T;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Fetch error");
  }
}
export { fetchHelper };
