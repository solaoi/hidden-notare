import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateResponse = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateResponse), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const response = await db.response.create({ data: input })

  return response
})
