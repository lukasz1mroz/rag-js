import {RedisClientType, createClient} from 'redis'
import {OpenAIEmbeddings} from 'langchain/embeddings/openai'
import {RedisVectorStore} from 'langchain/vectorstores/redis'
import {config} from '../config/config'

const startRedis = async () => {
  const client = createClient({
    url: config.redis.url ?? 'redis://localhost:6379',
  })
  await client.connect()
  return client
}

const stopRedis = async (client: RedisClientType) => await client.disconnect()

export const getAndLoadRedisVectorStore = async (docs: any[]): Promise<any> => {
  const client = await startRedis()
  await RedisVectorStore.fromDocuments(docs, new OpenAIEmbeddings(), {
    redisClient: client,
    indexName: 'docs',
  })
  await stopRedis(client as RedisClientType)
}
