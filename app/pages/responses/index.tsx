import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getResponses from "app/responses/queries/getResponses"

const ITEMS_PER_PAGE = 100

export const ResponsesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ responses, hasMore }] = usePaginatedQuery(getResponses, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {responses.map((response) => (
          <li key={response.id}>
            <Link href={Routes.ShowResponsePage({ responseId: response.id })}>
              <a>{response.name}</a>
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

const ResponsesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Responses</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewResponsePage()}>
            <a>Create Response</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ResponsesList />
        </Suspense>
      </div>
    </>
  )
}

ResponsesPage.authenticate = true
ResponsesPage.getLayout = (page) => <Layout>{page}</Layout>

export default ResponsesPage
