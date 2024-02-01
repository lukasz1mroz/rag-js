import {RunnableSequence} from 'langchain/schema/runnable'
import {formatDocumentsAsString} from 'langchain/util/document'
import {StringOutputParser} from 'langchain/schema/output_parser'
import {errorLogFinalPrompt} from './utils/queryHandler.js'
import {llm} from './utils/azureHandler.js'
import {makeIndexName} from './utils/indexHandler.js'
import {queryRedisVectorStore} from './utils/storeHandler.js'

export const questionChain = RunnableSequence.from([
  {
    indexName: ({filePath}) => makeIndexName(filePath),
    question: ({question}) => question,
  },
  {
    relevantDocs: async ({indexName, question}) => await queryRedisVectorStore(indexName, question),
  },
  {
    logs: ({relevantDocs}) => formatDocumentsAsString(relevantDocs),
  },
  errorLogFinalPrompt,
  async (errorLogFinalPrompt) => await llm.invoke(errorLogFinalPrompt.value),
  new StringOutputParser(),
])
