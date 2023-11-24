import {OpenAI} from 'langchain/llms/openai'
import {OpenAIEmbeddings} from 'langchain/embeddings/openai'
import {config} from '../config/config'

export const getLLM = () => {
  const model = new OpenAI({})
  return model
}

export const getEmbeddings = () => {
  const {
    azureOpenAIApiVersion,
    azureOpenAIApiKey,
    azureOpenAIApiInstanceName,
    azureOpenAIApiDeploymentName,
    azureOpenAIApiEmbeddingsDeploymentName,
  } = config.azure

  const embeddings = new OpenAIEmbeddings({
    azureOpenAIApiVersion: azureOpenAIApiVersion,
    azureOpenAIApiKey: azureOpenAIApiKey,
    azureOpenAIApiInstanceName: azureOpenAIApiInstanceName,
    azureOpenAIApiDeploymentName: azureOpenAIApiDeploymentName,
    azureOpenAIApiEmbeddingsDeploymentName: azureOpenAIApiEmbeddingsDeploymentName,
  })
  return embeddings
}
