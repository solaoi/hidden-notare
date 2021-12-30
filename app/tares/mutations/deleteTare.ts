import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteTare = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteTare), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const tare = await db.tare.deleteMany({ where: { id } })

  return tare
})
