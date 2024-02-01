import {ChatOpenAI, OpenAIEmbeddings} from '@langchain/openai'
import {config} from '../config/config.js'

const {apiVersion, apiKey, baseUrl, completionsModel, embeddingsModel} = config.api

export const embeddings = new OpenAIEmbeddings({
  azureOpenAIApiKey: apiKey,
  azureOpenAIApiVersion: apiVersion,
  azureOpenAIApiDeploymentName: embeddingsModel,
  azureOpenAIBasePath: baseUrl,
})

export const llm = new ChatOpenAI({
  azureOpenAIApiKey: apiKey,
  azureOpenAIApiVersion: apiVersion,
  azureOpenAIApiDeploymentName: completionsModel,
  azureOpenAIBasePath: baseUrl,
  temperature: 0.1,
})
