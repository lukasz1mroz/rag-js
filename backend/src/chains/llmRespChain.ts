import {RunnablePassthrough, RunnableSequence} from 'langchain/schema/runnable'
import {formatDocumentsAsString} from 'langchain/util/document'
import {StringOutputParser} from 'langchain/schema/output_parser'
import {queryRedisVectorStore} from '../utils/storeHandler'
import {ragFinalPrompt} from '../utils/queryHandler'
import {llm} from '../utils/azureHandler'

export const getLlmRespChain = RunnableSequence.from([
  {
    relevantDocs: async ({indexName, question}) => await queryRedisVectorStore(indexName, question),
    originalInput: new RunnablePassthrough(),
  },
  {
    context: formatDocumentsAsString,
    question: ({originalInput}) => originalInput.question,
  },
  ragFinalPrompt,
  llm,
  new StringOutputParser(),
])
