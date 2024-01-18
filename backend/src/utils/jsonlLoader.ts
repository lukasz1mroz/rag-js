import fs from 'fs'
import {Document} from 'langchain/document'

export const jsonlLoader = (filePath: string) => {
  const jsonlData = fs.readFileSync(filePath, 'utf-8')
  const lines = jsonlData.split('\n')
  const documents = lines.map((line: string) => new Document({pageContent: line}))
  return documents
}
