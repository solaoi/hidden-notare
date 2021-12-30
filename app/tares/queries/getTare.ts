import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetTare = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetTare), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const tare = await db.tare.findFirst({ where: { id } })

  if (!tare) throw new NotFoundError()

  return tare
})
