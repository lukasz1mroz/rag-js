// import {OpenAI} from 'langchain/llms/openai'
import {OpenAI, OpenAIEmbeddings} from '@langchain/openai'
import {config} from '../config/config.js'

const {apiVersion, apiKey, baseUrl, model} = config.api

// export const llm = new OpenAI({
//   azureOpenAIApiVersion: azureOpenAIApiVersion,
//   azureOpenAIApiKey: azureOpenAIApiKey,
//   azureOpenAIApiInstanceName: azureOpenAIApiInstanceName,
//   azureOpenAIApiDeploymentName: azureOpenAIApiDeploymentName,
// })

export const embeddings = new OpenAIEmbeddings({
  azureOpenAIApiKey: apiKey,
  azureOpenAIApiVersion: apiVersion,
  azureOpenAIApiDeploymentName: model,
  azureOpenAIBasePath: baseUrl,
})
