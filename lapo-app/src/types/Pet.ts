export type Pet = {
  id: string,
  category: string,
  name: string,
  sex: string,
  age: string | number,
  size?: string |  undefined,
  sterilized: string,
  vaccinated: string,
  images: string[],
}