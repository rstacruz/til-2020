interface Slugger {
  slug(input: string): string
}

declare module 'github-slugger' {
  export function make(): Slugger
  export default make
}
