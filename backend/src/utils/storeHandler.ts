import {createClient} from 'redis'
import {RedisVectorStore} from '@langchain/community/vectorstores/redis'
import {Document} from 'langchain/document'
import {embeddings} from './azureHandler.js'
import {config} from '../config/config.js'

// Check in memory store performance
export const startRedis = async () =>
  await createClient({
    url: config.redis.url ?? 'redis://localhost:6379',
  })
    .on('error', (e) => console.log(e))
    .connect()

export const loadRedisVectorStore = async (
  indexName: string,
  splittedDocs: Document<Record<string, any>>[],
): Promise<RedisVectorStore> => {
  const redisClient = await startRedis()
  const response = await RedisVectorStore.fromDocuments(splittedDocs, embeddings, {
    redisClient,
    indexName,
    createIndexOptions: {
      TEMPORARY: config.redis.temporary ?? false,
    },
  })
  await redisClient.quit()
  return response
}

export const queryRedisVectorStore = async (
  indexName: string,
  query: string,
): Promise<Document<Record<string, any>>[]> => {
  const redisClient = await startRedis()
  const vectorStoreRetriever = new RedisVectorStore(embeddings, {
    redisClient,
    indexName,
  }).asRetriever()

  const response = await vectorStoreRetriever.invoke(query)
  await redisClient.quit()
  return response
}
