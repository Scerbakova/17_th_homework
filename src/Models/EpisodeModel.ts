// export type Info = {
//   count: number,
//   pages: number,
//   next: string | null,
//   prev: string | null,
// }
export type Episode = {
  id: number,
  name: string,
  // eslint-disable-next-line camelcase
  air_date: string,
  episode: string,
  characters: string[],
  url: string,
  created: string,
};
