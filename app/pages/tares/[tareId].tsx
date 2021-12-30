import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTare from "app/tares/queries/getTare"
import deleteTare from "app/tares/mutations/deleteTare"

export const Tare = () => {
  const router = useRouter()
  const tareId = useParam("tareId", "number")
  const [deleteTareMutation] = useMutation(deleteTare)
  const [tare] = useQuery(getTare, { id: tareId })

  return (
    <>
      <Head>
        <title>Tare {tare.id}</title>
      </Head>

      <div>
        <h1>Tare {tare.id}</h1>
        <pre>{JSON.stringify(tare, null, 2)}</pre>

        <Link href={Routes.EditTarePage({ tareId: tare.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTareMutation({ id: tare.id })
              router.push(Routes.TaresPage())
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

const ShowTarePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TaresPage()}>
          <a>Tares</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Tare />
      </Suspense>
    </div>
  )
}

ShowTarePage.authenticate = true
ShowTarePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTarePage
