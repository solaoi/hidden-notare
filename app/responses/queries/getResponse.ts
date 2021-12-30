import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetResponse = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetResponse), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const response = await db.response.findFirst({ where: { id } })

  if (!response) throw new NotFoundError()

  return response
})
