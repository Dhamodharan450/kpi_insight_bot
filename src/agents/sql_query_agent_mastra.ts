import 'dotenv/config';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { openai } from '@ai-sdk/openai';
import { listTablesToolTool, listColumnsTool, runQueryTool, generateSQLTool } from '../tools';

export const sqlQueryAgentMastra = new Agent({
  name: 'SQL Query Agent',
  description: 'Interactive agent that helps users explore databases and execute SQL queries',
  instructions: `You are a database exploration assistant that helps users navigate and query their PostgreSQL database.

Your workflow:
1. Start by listing available tables using list-tables tool
2. When user asks about specific tables, show their columns using list-columns tool
3. Help users construct SQL queries based on their questions
4. Use generate-sql tool if they want AI assistance writing the query
5. Execute queries using run-query tool and present results clearly
6. Explain the results and suggest follow-up analyses if relevant

Be helpful, explain technical concepts clearly, and ensure users understand their data.`,
  model: openai('gpt-4o'),
  tools: {
    listTablesToolTool,
    listColumnsTool,
    runQueryTool,
    generateSQLTool,
  },
  // Enable memory to maintain conversation context
  memory: new Memory({
    options: {
      lastMessages: 20, // Keep last 20 messages in context
    },
  }),
});
