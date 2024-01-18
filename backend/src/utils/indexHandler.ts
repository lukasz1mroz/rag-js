export const makeIndexName = (filePath: string) => filePath.split('/').pop()?.split('.')[0] ?? filePath
