import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateTare = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateTare),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const tare = await db.tare.update({ where: { id }, data })

    return tare
  }
)
