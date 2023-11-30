import {TextLoader} from 'langchain/document_loaders/fs/text'
import {RecursiveCharacterTextSplitter} from 'langchain/text_splitter'
import {RunnableSequence} from 'langchain/schema/runnable'
import {Document} from 'langchain/dist/document'
import {config} from '../../config/config'
import {loadRedisVectorStore} from '../utils/storeHandler'

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: config.recursiveSplitter.chunkSize,
  chunkOverlap: config.recursiveSplitter.chunkOverlap,
})

export const loadFileChain = RunnableSequence.from([
  {
    loadedDocs: async (filePath: string) => await new TextLoader(filePath).load(),
  },
  {
    indexName: (filePath) => filePath.split('/').pop()?.split('.')[0] ?? filePath,
    splittedDocs: async (loadedDocs: Document<Record<string, any>>[]) => await splitter.splitDocuments(loadedDocs),
  },
  {
    loadVectorResp: async ({indexName, splittedDocs}) => await loadRedisVectorStore(indexName, splittedDocs),
  },
])
