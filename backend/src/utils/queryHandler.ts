import {PromptTemplate} from 'langchain/prompts'

const ragTemplate = `Use the following pieces of context to answer the question at the end. If you don't know the answer, don't make up the answer. Context: {context} Question: {question}`

export const ragFinalPrompt = PromptTemplate.fromTemplate(ragTemplate)
