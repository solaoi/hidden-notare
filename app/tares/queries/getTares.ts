import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTaresInput
  extends Pick<Prisma.TareFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTaresInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: tares,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.tare.count({ where }),
      query: (paginateArgs) => db.tare.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      tares,
      nextPage,
      hasMore,
      count,
    }
  }
)
