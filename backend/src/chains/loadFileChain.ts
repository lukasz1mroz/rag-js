import {TextLoader} from 'langchain/document_loaders/fs/text'
import {RecursiveCharacterTextSplitter} from 'langchain/text_splitter'
import {RunnableSequence} from 'langchain/schema/runnable'
import {Document} from 'langchain/document'
import {config} from '../config/config.js'
import {loadRedisVectorStore} from '../utils/storeHandler.js'

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: config.recursiveSplitter.chunkSize,
  chunkOverlap: config.recursiveSplitter.chunkOverlap,
})

export const loadFileChain = RunnableSequence.from([
  {
    log1: (filePath: string) => console.log(`Loading file ${filePath}`),
    loadedDocs: async (filePath: string) => await new TextLoader(filePath).load(),
    log2: (loadedDocs) => console.log('Loaded docs: ', loadedDocs),
    filePath: (filePath: string) => filePath,
  },
  {
    indexName: (filePath) => filePath.split('/').pop()?.split('.')[0] ?? filePath,
    log1: (indexName: string) => console.log(`Created index name: ${indexName}`),
    splittedDocs: async (loadedDocs: Document<Record<string, any>>[]) => await splitter.splitDocuments(loadedDocs),
    log2: (splittedDocs) => console.log('Splitted docs: ', splittedDocs),
  },
  {
    loadVectorResp: async ({indexName, splittedDocs}) => await loadRedisVectorStore(indexName, splittedDocs),
  },
])
