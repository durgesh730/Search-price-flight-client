import React from 'react'

const Data = ({ data, origin, desti }) => {

    console.log(data.itineraries)
    let arr = [];

    data.itineraries?.map((item) => {
        if (arr.indexOf(item.duration) === -1) {
            arr.push(item.duration);
        }
    })

    console.log(arr, "ljlkjkj")

    return (
        <>
            <div className='container my-4'>
                <div class="row price ">
                    <div class="col-2 text-truncate">
                        {
                            data.itineraries?.map((item) => item.segments?.map((it) => {
                                return (
                                    <>
                                        <div>
                                            {it.departure.iataCode}  {"-->"} {it.arrival.iataCode}
                                        </div>
                                    </>
                                )
                            }))
                        }

                        {
                            arr?.map((ite) => {
                                return (
                                    <div>
                                       Duration: {ite}
                                    </div>
                                )

                            })
                        }

                        <div className='totalprice' >
                            <span>
                                {Number(data.price.total * 88.21).toFixed(2)} ₹
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Data
