import {getCombineDocumentsChain} from './src/chain-handler'

const main = async (question: string): Promise<any> => {
  const mainLLMChain = await getCombineDocumentsChain()
  return mainLLMChain.invoke(question)
}
