import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createResponse from "app/responses/mutations/createResponse"
import { ResponseForm, FORM_ERROR } from "app/responses/components/ResponseForm"

const NewResponsePage: BlitzPage = () => {
  const router = useRouter()
  const [createResponseMutation] = useMutation(createResponse)

  return (
    <div>
      <h1>Create New Response</h1>

      <ResponseForm
        submitText="Create Response"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateResponse}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const response = await createResponseMutation(values)
            router.push(Routes.ShowResponsePage({ responseId: response.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ResponsesPage()}>
          <a>Responses</a>
        </Link>
      </p>
    </div>
  )
}

NewResponsePage.authenticate = true
NewResponsePage.getLayout = (page) => <Layout title={"Create New Response"}>{page}</Layout>

export default NewResponsePage
