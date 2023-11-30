import {createClient} from 'redis'
import {RedisVectorStore} from 'langchain/vectorstores/redis'
import {Document} from 'langchain/dist/document'
import {embeddings} from './azureHandler'
import {config} from '../../config/config'

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
  const client = await startRedis()
  const response = await RedisVectorStore.fromDocuments(splittedDocs, embeddings, {
    redisClient: client,
    indexName,
    createIndexOptions: {
      TEMPORARY: config.redis.temporary ?? false,
    },
  })
  await client.disconnect()
  return response
}

export const queryRedisVectorStore = async (
  indexName: string,
  query: string,
): Promise<Document<Record<string, any>>[]> => {
  const client = await startRedis()
  const vectorStoreRetriever = new RedisVectorStore(embeddings, {
    redisClient: client,
    indexName,
  }).asRetriever()

  const response = await vectorStoreRetriever.invoke(query)
  await client.disconnect()
  return response
}
