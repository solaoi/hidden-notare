import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTares from "app/tares/queries/getTares"

const ITEMS_PER_PAGE = 100

export const TaresList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ tares, hasMore }] = usePaginatedQuery(getTares, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {tares.map((tare) => (
          <li key={tare.id}>
            <Link href={Routes.ShowTarePage({ tareId: tare.id })}>
              <a>{tare.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const TaresPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Tares</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTarePage()}>
            <a>Create Tare</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TaresList />
        </Suspense>
      </div>
    </>
  )
}

TaresPage.authenticate = true
TaresPage.getLayout = (page) => <Layout>{page}</Layout>

export default TaresPage
