import * as React from "react"
import { useRouter } from "next/router"

export const getServerSideProps = async () => {
    const res = await fetch("http://localhost:3000/api/list")
    const data = await res.json()
    return { props: { data } }
}

const PoliSingle = ({ data }: { data: unknown[] }) => {
    const [doctorList, setDoctorList] = React.useState<any[]>([])
    const router = useRouter()
    const poliSlug = router.query.poliSlug

    React.useEffect(() => {
        //Create a new instance of data Array
        const list = [...data]

        //Filtering based on the poliSlug
        const newList = list.filter((item: any) => item.poli.slug === poliSlug)

        //Set doctor list based on the new list
        setDoctorList(newList)
    }, [data])

    return (
        <div className="flex justify-center items-center">
            <div className="w-[500px] space-y-8 py-12">
                <h1>Poli Single </h1>
                <div className="space-y-2">
                    {doctorList.map(({ name, hariPraktek, slot }, index: number) => {
                        return (
                            <div key={index} className="border-1 bg-white text-black rounded-xl p-4">
                                <div className="font-bold text-xl">{name}</div>
                                <div>Slot Konsultasi Harian : {slot}</div>
                                {/* <div>
                                    Hari Praktek :{" "}
                                    <div className="flex gap-2">
                                        {hariPraktek.map((item: string, index: number) => {
                                            return (
                                                <div className="bg-emerald-500 p-2 rounded-lg " key={index}>
                                                    {item}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div> */}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default PoliSingle
