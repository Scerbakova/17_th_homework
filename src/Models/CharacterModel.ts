export type Character = {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: CharacterOrigin,
  location: CharacterLocation,
  image: string,
  episode: string[]
  url: string,
  created: string,
}
export type CharacterOrigin = {
  name: string,
  url: string,
}
export type CharacterLocation = {
  name: string,
  url: string,
}
