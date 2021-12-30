import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteResponse = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteResponse), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const response = await db.response.deleteMany({ where: { id } })

  return response
})
