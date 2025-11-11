import 'dotenv/config';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { openai } from '@ai-sdk/openai';
import {
  listTablesToolTool,
  listColumnsTool,
  runQueryTool,
  saveKPITool,
  generateSQLTool,
} from '../tools';

export const kpiAgentMastra = new Agent({
  name: 'KPI Agent',
  description: 'Interactive agent that helps users create and manage KPIs by guiding them through table selection, column selection, SQL generation, and KPI storage',
  instructions: `You are a KPI creation assistant that helps users define and store Key Performance Indicators in a PostgreSQL database.

Your workflow:
1. Start by listing available database tables using the list-tables tool
2. Ask the user to select table(s) they want to use
3. For each selected table, list its columns using the list-columns tool
4. Ask the user to select relevant columns (in table.column format)
5. Ask for KPI name.
6. Ask for KPI description.
7. Ask for whether they want to write SQL manually or have you generate it.
8. If AI generation requested:
   - Ask for the intent (e.g., "sum of sales", "average price", etc.)
   - Use the generate-sql tool to create the query
9. Show the SQL to the user and ask for confirmation
10. If user wants to edit, let them provide the corrected SQL
11. Execute the SQL using run-query tool to show sample results
12. Ask if they want to save the KPI
13. If yes, use save-kpi tool to store it

Be conversational, helpful, and guide the user step by step. Always show what you're doing and why.`,
  model: openai('gpt-4o'),
  tools: {
    listTablesToolTool,
    listColumnsTool,
    runQueryTool,
    generateSQLTool,
    saveKPITool,
  },
  // Enable memory to maintain conversation context
  memory: new Memory({
    options: {
      lastMessages: 20, // Keep last 20 messages in context
    },
  }),
});
