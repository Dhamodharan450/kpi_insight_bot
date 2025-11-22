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
1. I will give an single prompt for creating kpi in database:
2. Automatically choose:
    Table
    Column
    KPI Name
    KPI Description
    Generate KPI
    Run the query
    Save it
3. Save the query in database.
4. Display all the details for kpi at last.
    Table
    Column
    KPI Name
    KPI Description
    Generate KPI
    Run the query
    Save it

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
