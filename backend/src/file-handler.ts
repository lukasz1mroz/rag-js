import {TextLoader} from 'langchain/document_loaders/fs/text'
import {RecursiveCharacterTextSplitter} from 'langchain/text_splitter'
import {config} from '../config/config'

const loadFile = async (filePath: string): Promise<any> => {
  try {
    const loader = new TextLoader(filePath)
    const docs = await loader.load()
    return docs
  } catch (e) {
    console.log(e)
  }
}

const splitFile = async (docs: any[]): Promise<any> => {
  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: config.recursiveSplitter.chunkSize,
      chunkOverlap: config.recursiveSplitter.chunkOverlap,
    })
    const docOutput = await splitter.splitDocuments(docs)
    return docOutput
  } catch (e) {
    console.log(e)
  }
}
