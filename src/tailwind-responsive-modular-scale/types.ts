export type MinMaxConfig = {
  base: number | string
  ratio: number
  linebase: number
  lineratio: number
  screenwidth: string
}

export type Configuration = {
  min: MinMaxConfig
  max: MinMaxConfig
  prefix: string
  steps: number[]
}

export type PartialConfig = Partial<Omit<Configuration, 'min' | 'max'>> & {
  min?: Partial<MinMaxConfig>
  max?: Partial<MinMaxConfig>
}
