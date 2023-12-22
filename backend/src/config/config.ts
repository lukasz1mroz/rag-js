export const config: any = {
  recursiveSplitter: {
    chunkSize: 1000,
    chunkOverlap: 10,
  },
  redis: {
    url: 'redis://localhost:6379',
    temporary: 1000,
  },
  azure: {
    azureOpenAIApiVersion: 'todo',
    azureOpenAIApiKey: 'todo',
    azureOpenAIApiInstanceName: 'todo',
    azureOpenAIApiDeploymentName: 'todo',
    azureOpenAIApiEmbeddingsDeploymentName: 'todo',
  },
}
