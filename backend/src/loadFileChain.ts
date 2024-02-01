import {RunnableSequence} from 'langchain/schema/runnable'
import {jsonlLoader} from './utils/jsonlLoader.js'
import {makeIndexName} from './utils/indexHandler.js'
import {loadRedisVectorStore} from './utils/storeHandler.js'

export const loadFileChain = RunnableSequence.from([
  {
    indexName: (filePath) => makeIndexName(filePath),
    loadedDocs: (filePath) => jsonlLoader(filePath),
  },
  async ({indexName, loadedDocs}) => await loadRedisVectorStore(indexName, loadedDocs),
])
