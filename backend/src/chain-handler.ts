import {RunnableSequence} from 'langchain/schema/runnable'
import {formatDocumentsAsString} from 'langchain/util/document'
import {StringOutputParser} from 'langchain/schema/output_parser'
import {queryRedisVectorStore} from '../src/store-handler'
import {getPromptTemplateWithContext} from '../src/query-handler'
import {getLLM} from '../src/azure-handler'

export const getCombineDocumentsChain = async () => {
  const promptTemplateWithContext = getPromptTemplateWithContext()
  const model = getLLM()

  const combineDocumentsChain = RunnableSequence.from([
    {
      question: (output: string) => output,
      context: async (output: string) => {
        const relevantDocs = await queryRedisVectorStore(output)
        return formatDocumentsAsString(relevantDocs)
      },
    },
    promptTemplateWithContext,
    model,
    new StringOutputParser(),
  ])

  return combineDocumentsChain
}
