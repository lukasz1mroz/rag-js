import {Document} from 'langchain/dist/document'

export type PreparedFile = {
  fileName: string
  docOutput: Array<Document<Record<string, any>>>
}
