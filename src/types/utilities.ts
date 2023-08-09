export type MergeOmitting<ReplaceableType, ReplacerType> = Omit<ReplaceableType, keyof ReplacerType> & ReplacerType
