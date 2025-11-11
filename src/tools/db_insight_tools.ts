import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { insertInsight } from './db_shared';

export const saveInsightTool = createTool({
  id: 'save-insight',
  description: 'Saves an insight definition to the database',
  inputSchema: z.object({
    name: z.string(),
    description: z.string().optional(),
    kpi_name: z.string().optional(),
    formula: z.string(),
    schedule: z.string().optional(),
    exec_time: z.string().optional(),
    alert_high: z.number().optional(),
    alert_low: z.number().optional(),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    message: z.string(),
  }),
  execute: async ({ context }) => {
    await insertInsight({
      name: context.name,
      description: context.description ?? undefined,
      kpi_name: context.kpi_name ?? undefined,
      formula: context.formula,
      schedule: context.schedule ?? undefined,
      exec_time: context.exec_time ?? undefined,
      alert_high: context.alert_high ?? undefined,
      alert_low: context.alert_low ?? undefined,
    });
    return { success: true, message: `Insight '${context.name}' saved successfully` };
  },
});
