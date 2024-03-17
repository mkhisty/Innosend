import { query } from "./_generated/server";
import { v } from "convex/values";

export const data = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('groups').collect();
  },
});


