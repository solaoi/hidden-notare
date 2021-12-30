import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getResponse from "app/responses/queries/getResponse"
import updateResponse from "app/responses/mutations/updateResponse"
import { ResponseForm, FORM_ERROR } from "app/responses/components/ResponseForm"

export const EditResponse = () => {
  const router = useRouter()
  const responseId = useParam("responseId", "number")
  const [response, { setQueryData }] = useQuery(
    getResponse,
    { id: responseId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateResponseMutation] = useMutation(updateResponse)

  return (
    <>
      <Head>
        <title>Edit Response {response.id}</title>
      </Head>

      <div>
        <h1>Edit Response {response.id}</h1>
        <pre>{JSON.stringify(response, null, 2)}</pre>

        <ResponseForm
          submitText="Update Response"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateResponse}
          initialValues={response}
          onSubmit={async (values) => {
            try {
              const updated = await updateResponseMutation({
                id: response.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowResponsePage({ responseId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditResponsePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditResponse />
      </Suspense>

      <p>
        <Link href={Routes.ResponsesPage()}>
          <a>Responses</a>
        </Link>
      </p>
    </div>
  )
}

EditResponsePage.authenticate = true
EditResponsePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditResponsePage
