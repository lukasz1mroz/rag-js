import {PromptTemplate} from 'langchain/prompts'

export const getPromptTemplateWithContext = () => {
  const combineDocsMockTemplate = `Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. Context: {context} Question: {question}`
  const combineDocsPrompt = PromptTemplate.fromTemplate(combineDocsMockTemplate)
  return combineDocsPrompt
}
