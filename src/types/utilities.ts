export type MergeOmitting<ReplaceableType, ReplacerType> = Omit<ReplaceableType, keyof ReplacerType> & ReplacerType

export interface Alert {
  type: 'success' | 'danger' | 'info' | 'warning'
  message: string
}
