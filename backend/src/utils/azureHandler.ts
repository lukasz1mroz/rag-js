import {OpenAI} from 'langchain/llms/openai'
import {OpenAIEmbeddings} from 'langchain/embeddings/openai'
import {config} from '../config/config.js'

const {
  azureOpenAIApiVersion,
  azureOpenAIApiKey,
  azureOpenAIApiEmbeddingsDeploymentName,
  azureOpenAIApiInstanceName,
  azureOpenAIApiDeploymentName,
} = config.azure

export const llm = new OpenAI({
  azureOpenAIApiVersion: azureOpenAIApiVersion,
  azureOpenAIApiKey: azureOpenAIApiKey,
  azureOpenAIApiInstanceName: azureOpenAIApiInstanceName,
  azureOpenAIApiDeploymentName: azureOpenAIApiDeploymentName,
})

export const embeddings = new OpenAIEmbeddings({
  azureOpenAIApiVersion: azureOpenAIApiVersion,
  azureOpenAIApiKey: azureOpenAIApiKey,
  azureOpenAIApiInstanceName: azureOpenAIApiInstanceName,
  azureOpenAIApiDeploymentName: azureOpenAIApiDeploymentName,
  azureOpenAIApiEmbeddingsDeploymentName: azureOpenAIApiEmbeddingsDeploymentName,
})
