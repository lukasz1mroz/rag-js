import {ragChain} from './ragChain.js'

await ragChain.invoke({
  filePath: '/Users/mrozl/Documents/Code/Exercises/rag-js/backend/src/sample-logs/log-sample-1.log',
  question: 'What is the error?',
})
