import { useEffect, useState } from 'react'
import MainButton from '@/components/MainButton'
import { useUserStore } from '@/stores/userStore'
import { limitTextSize } from '@/app/common/utils'
import { Solution } from '@/app/common/types'

export default function ServicesGrid() {
    const [user] = useUserStore((state: any) => [state.user])

    const [services, setServices] = useState([])
    const [errorFetchServices, setErrorFetchServices] = useState("")

    useEffect(() => {
        fetchServices()
    }, [])

    const fetchServices = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_PREFIX}/api/solutions/master/${user?.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if(response.ok) {
            const data = await response.json()
            setServices(data)
        } else {
            setErrorFetchServices("Error fetching services")
        }
    }

    const displayServices = () => {
        if(errorFetchServices) {
            return <p>{errorFetchServices}</p>
        }

        return (
            <div className="">
                {services.map((service: Solution, index: number) => {
                    return (
                        <div key={index} className="flex border p-4 rounded-lg mb-8 justify-between items-center">
                            <div className="flex justify-between flex-1 mr-20">
                                <div className="flex-1 mr-8">
                                    <h3 className="font-semibold text-md">{service?.title}</h3>
                                    <p>{service.description && limitTextSize(service?.description, 65)}</p>
                                </div>
                                <div className="flex-1 mr-8">
                                    <h3 className="font-semibold text-md">Availability</h3>
                                    <p>Start hour: {service?.startHour}</p>
                                    <p>End hour: {service?.endHour}</p>
                                </div>
                                <div className="flex-1 mr-8">
                                    <h3 className="font-semibold text-md">Location</h3>
                                    <p>{service?.countyName}</p>
                                    <p>{service?.cityName}</p>
                                </div>
                            </div>
                            <MainButton text="Edit service" linkTo={`/solution/edit/${service?.id}`} />
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-6xl mt-8">
            <div className="mb-12">
                <MainButton text="Add new service" linkTo="/solution/create" />
            </div>
            {displayServices()}
        </div>
    )
}
