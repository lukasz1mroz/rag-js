import {createClient} from 'redis'
import {RedisVectorStore} from 'langchain/vectorstores/redis'
import {getEmbeddings} from './azure-handler'
import {config} from '../config/config'

const startRedis = async () => {
  const client = await createClient({
    url: config.redis.url ?? 'redis://localhost:6379',
  })
    .on('error', (e) => console.log(e))
    .connect()

  return client
}

export const loadRedisVectorStore = async (docs: any[]): Promise<any> => {
  const client = await startRedis()
  const embeddings = getEmbeddings()

  await RedisVectorStore.fromDocuments(docs, embeddings, {
    redisClient: client,
    indexName: 'docs',
  })
  await client.disconnect()
}

export const queryRedisVectorStore = async (query: string): Promise<any> => {
  const client = await startRedis()
  const embeddings = getEmbeddings()

  const vectorStore = new RedisVectorStore(embeddings, {
    redisClient: client,
    indexName: 'docs',
  })

  const response = vectorStore.similaritySearch(query)
  await client.disconnect()

  return response
}
