import {Document} from 'langchain/document'

export type PreparedFile = {
  fileName: string
  docOutput: Array<Document<Record<string, any>>>
}
