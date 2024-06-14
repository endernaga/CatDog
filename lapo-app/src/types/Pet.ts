export type Pet = {
  id: string,
  category: string,
  name: string,
  sex: string,
  age: string | number,
  size?: string,
  sterilized: string,
  vaccinated: string,
  images: string[],
}