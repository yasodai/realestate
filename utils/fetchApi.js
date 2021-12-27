import axios from 'axios'


const baseURL = 'https://bayut.p.rapidapi.com'

export async function fetchApi(url, params) {
  const { data } = await axios.get((url), {
    baseURL,
    params,
    headers: {
      'x-rapidapi-host': 'bayut.p.rapidapi.com',
      'x-rapidapi-key': process.env.apiKey
    },
  })

  return data
}

