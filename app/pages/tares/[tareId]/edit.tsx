import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTare from "app/tares/queries/getTare"
import updateTare from "app/tares/mutations/updateTare"
import { TareForm, FORM_ERROR } from "app/tares/components/TareForm"

export const EditTare = () => {
  const router = useRouter()
  const tareId = useParam("tareId", "number")
  const [tare, { setQueryData }] = useQuery(
    getTare,
    { id: tareId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTareMutation] = useMutation(updateTare)

  return (
    <>
      <Head>
        <title>Edit Tare {tare.id}</title>
      </Head>

      <div>
        <h1>Edit Tare {tare.id}</h1>
        <pre>{JSON.stringify(tare, null, 2)}</pre>

        <TareForm
          submitText="Update Tare"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateTare}
          initialValues={tare}
          onSubmit={async (values) => {
            try {
              const updated = await updateTareMutation({
                id: tare.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowTarePage({ tareId: updated.id }))
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

const EditTarePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTare />
      </Suspense>

      <p>
        <Link href={Routes.TaresPage()}>
          <a>Tares</a>
        </Link>
      </p>
    </div>
  )
}

EditTarePage.authenticate = true
EditTarePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTarePage
