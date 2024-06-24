import { Filters } from "../types/sortFilters";

export async function fetchFilteredData(filters: Filters) {
  const searchParams = new URLSearchParams();

  for (const key of Object.keys(filters) as (keyof Filters)[]) {
    const value = filters[key];

    if (Array.isArray(value)) {
      value.forEach(v => searchParams.append(key, v))
    } else if (typeof value === 'boolean') {
      if (value) {
        searchParams.append(key, value.toString())
      }
    } else if (value !== undefined) {
      searchParams.append(key, value.toString())
    }
  }

  const response = await fetch(`api/data?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
}