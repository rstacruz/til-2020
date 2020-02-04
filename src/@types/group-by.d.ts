declare module 'group-by' {
  export function groupBy<T>(
    list: Array<T>,
    groupFn: (item: T) => string
  ): { [key: string]: Array<T> }
  export default groupBy
}
