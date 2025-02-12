export async function getCasa(id: number) {
  let url = '/api/casas';

  if (id !== undefined) {
    url = `/api/casas/${id}`;
  }

  console.log('Fetching URL:', url); // Verifica la URL
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch the casa data');
  }

  return await response.json();
}
