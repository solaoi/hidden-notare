import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createTare from "app/tares/mutations/createTare"
import { TareForm, FORM_ERROR } from "app/tares/components/TareForm"

const NewTarePage: BlitzPage = () => {
  const router = useRouter()
  const [createTareMutation] = useMutation(createTare)

  return (
    <div>
      <h1>Create New Tare</h1>

      <TareForm
        submitText="Create Tare"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateTare}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const tare = await createTareMutation(values)
            router.push(Routes.ShowTarePage({ tareId: tare.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.TaresPage()}>
          <a>Tares</a>
        </Link>
      </p>
    </div>
  )
}

NewTarePage.authenticate = true
NewTarePage.getLayout = (page) => <Layout title={"Create New Tare"}>{page}</Layout>

export default NewTarePage
