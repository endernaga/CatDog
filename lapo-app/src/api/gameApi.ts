import { client } from "../utils/fetchProducts"

export const getPetsForGame = () => {
  return client.get('/heOrShe')
};