export const fetchGet = (input: RequestInfo, init?: RequestInit): Promise<any> => {
  const options = {
    method: 'GET',
  }

  return fetch(input, {...options, ...init})
    .then(response => {
      if (response.ok) return response
      throw new Error(`Status: ${response.status}`)
    })
    .then(response => {
      if (response.status !== 204) return response.json()
      return
    })
}
