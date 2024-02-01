import {loadFileChain} from './loadFileChain.js'
import {questionChain} from './questionChain.js'

await loadFileChain.invoke('/Users/mrozl/Documents/Code/Exercises/rag-js/backend/src/sample-logs/single-err-log.log')
await questionChain.invoke({
  filePath: '/Users/mrozl/Documents/Code/Exercises/rag-js/backend/src/sample-logs/single-err-log.log',
  question: 'What are the errors?',
})
