import {TextLoader} from 'langchain/document_loaders/fs/text'
import {RecursiveCharacterTextSplitter} from 'langchain/text_splitter'
import {RunnablePassthrough, RunnableSequence} from 'langchain/schema/runnable'
import {config} from '../config/config.js'
import {loadRedisVectorStore} from '../utils/storeHandler.js'

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: config.recursiveSplitter.chunkSize,
  chunkOverlap: config.recursiveSplitter.chunkOverlap,
})

export const loadFileChain = RunnableSequence.from([
  {
    loadedDocs: async (filePath: string) => await new TextLoader(filePath).load(),
    filePath: new RunnablePassthrough(),
  },
  {
    indexName: (prev) => prev.filePath.split('/').pop()?.split('.')[0] ?? prev.filePath,
    splittedDocs: async (prev) => await splitter.splitDocuments(prev.loadedDocs),
  },
  {
    loadVectorResp: (prev) => loadRedisVectorStore(prev.indexName, prev.splittedDocs),
  },
])
