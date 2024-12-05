export async function getCasa(id: number){
  let url= '/api/casas'

  if (id !== undefined) {
    url = `/api/casas/${id}`
  } 

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}
