import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetResponsesInput
  extends Pick<Prisma.ResponseFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetResponsesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: responses,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.response.count({ where }),
      query: (paginateArgs) => db.response.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      responses,
      nextPage,
      hasMore,
      count,
    }
  }
)
