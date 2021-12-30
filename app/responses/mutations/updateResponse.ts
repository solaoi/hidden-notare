import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateResponse = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateResponse),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const response = await db.response.update({ where: { id }, data })

    return response
  }
)
