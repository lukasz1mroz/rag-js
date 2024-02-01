export const config: any = {
  redis: {
    url: process.env.REDIS_URL,
    temporary: 1000,
  },
  api: {
    apiVersion: process.env.API_VERSION,
    apiKey: process.env.API_KEY,
    baseUrl: process.env.BASE_URL,
    embeddingsModel: process.env.EMBEDDINGS_MODEL,
    completionsModel: process.env.COMPLETIONS_MODEL,
  },
}
