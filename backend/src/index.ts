import {getLlmRespChain} from './chains/llmRespChain.js'
import {loadFileChain} from './chains/loadFileChain.js'

const main = async (question: string, fileUrl: string): Promise<any> => {
  // Chunk the file and upload to Redis vector store
  await loadFileChain.invoke(fileUrl)

  // Get the chain and run it with questions
  await getLlmRespChain.invoke({fileUrl, question})
}

await main('Test', './sample-logs/log-sample-1.log')
