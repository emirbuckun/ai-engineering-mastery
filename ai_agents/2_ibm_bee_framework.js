import { BeeAgent } from 'beeai-framework/agents/bee/agent'
import { OllamaChatLLM } from 'beeai-framework/adapters/ollama/chat'
import { TokenMemory } from 'beeai-framework/memory/tokenMemory'
import { DuckDuckGoSearchTool } from 'beeai-framework/tools/search/duckDuckGoSearch'
import { OpenMeteoTool } from 'beeai-framework/tools/weather/openMeteo'

import { tool } from 'beeai-framework/tools'

const CustomTool = tool('CustomTool', {
  description: 'A custom tool to handle specific tasks.',
  run: async (input) => {
    return { result: `Handled task with input: ${input}` }
  },
})

const llm = new OllamaChatLLM()
const memory = new TokenMemory({ llm })
const tools = [new DuckDuckGoSearchTool(), new OpenMeteoTool()]

const agent = new BeeAgent({ llm, memory, tools })

agent.addTool(new CustomTool())

agent.observe((emitter) => {
  emitter.on('update', async ({ data }) => {
    console.log('Update : ', data)
  })
})

const response = await agent
  .run('What is the weather like in Çerkezköy today?')
  .observe((emitter) => {
    emitter.on('update', async ({ data, update, meta }) => {
      console.log(`Agent: (${update.key}) : ${update.value}`)
      console.log('Data:', data)
      console.log('Meta:', meta)
    })
  })

console.log('Agent Response:', response.result.text)
