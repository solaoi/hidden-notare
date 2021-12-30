import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateTare = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateTare), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const tare = await db.tare.create({ data: input })

  return tare
})
