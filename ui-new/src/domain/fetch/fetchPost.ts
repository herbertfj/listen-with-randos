export const fetchPost = (input: RequestInfo, body: any, init?: RequestInit): Promise<any> => {
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }

  return fetch(input, {...options, ...init})
    .then(res => {
      if (res.ok) return res
      throw new Error(`Status: ${res.status}`)
    })
    .then(res => {
      if (res.status !== 204) return res.json()
      return
    })
}
