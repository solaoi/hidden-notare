import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getResponse from "app/responses/queries/getResponse"
import deleteResponse from "app/responses/mutations/deleteResponse"

export const Response = () => {
  const router = useRouter()
  const responseId = useParam("responseId", "number")
  const [deleteResponseMutation] = useMutation(deleteResponse)
  const [response] = useQuery(getResponse, { id: responseId })

  return (
    <>
      <Head>
        <title>Response {response.id}</title>
      </Head>

      <div>
        <h1>Response {response.id}</h1>
        <pre>{JSON.stringify(response, null, 2)}</pre>

        <Link href={Routes.EditResponsePage({ responseId: response.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteResponseMutation({ id: response.id })
              router.push(Routes.ResponsesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowResponsePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ResponsesPage()}>
          <a>Responses</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Response />
      </Suspense>
    </div>
  )
}

ShowResponsePage.authenticate = true
ShowResponsePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowResponsePage
