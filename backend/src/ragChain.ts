import {RunnableSequence} from 'langchain/schema/runnable'
import {loadRedisVectorStore} from './utils/storeHandler.js'
import {jsonlLoader} from './utils/jsonlLoader.js'
import {RunnablePassthrough} from 'langchain/schema/runnable'
// import {formatDocumentsAsString} from 'langchain/util/document'
// import {StringOutputParser} from 'langchain/schema/output_parser'
// import {queryRedisVectorStore} from './utils/storeHandler.js'
// import {ragFinalPrompt} from './utils/queryHandler.js'
// import {llm} from './utils/azureHandler.js'
import {makeIndexName} from './utils/indexHandler.js'

export const ragChain = RunnableSequence.from([
  {
    indexName: ({filePath}) => makeIndexName(filePath),
    loadedDocs: ({filePath}) => jsonlLoader(filePath),
    chainInput: new RunnablePassthrough(),
  },
  {
    loadVectorResp: async ({indexName, loadedDocs}) => await loadRedisVectorStore(indexName, loadedDocs),
  },
  {
    // relevantDocs: async ({indexName, chainInput}) => await queryRedisVectorStore(indexName, chainInput.question),
  },
  // {
  //   context: formatDocumentsAsString,
  // },
  // ragFinalPrompt,
  // llm,
  // new StringOutputParser(),
])
