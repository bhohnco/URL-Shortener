export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const addURLToApi = (longUrl, title) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({long_url: longUrl, title: title})
  })
      .then(response => {
        if(response.ok) {
          return response
        } else {
          throw new Error('Were having issues right now, please try again!')
        }
      })
}
