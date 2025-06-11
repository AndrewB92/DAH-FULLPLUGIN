import { encode as base64_encode } from 'base-64'
import { useState } from 'react'
import { fetchOpenApiToken, fetchBookingToken} from '@utils/tokenManager'
import BKPropertiesList from '@components/BKPropertiesList'
import BKBanner from '@components/BKBanner'
import BKDatePicker from '@components/BKDatePicker'
import BKMapIntro from '@components/BKMapIntro'
import BKMap from '@components/BKMap'
import BKTestimonialHeading from '@components/BKTestimonialHeading'
import BKTestimonialList from '@components/BKTestimonialList'
import BKManagerInfo from '@components/BKManagerInfo'
import BKFaq from '@components/BKFaq'
import BKCallToAction from '@components/BKCallToAction'

const Availability = ({properties, query}) => {


    // Get number of nights between 2 dates
    const daysDiff = (startDate, endDate) => {
        const date1 = new Date(startDate)
        const date2 = new Date(endDate)
        const diffInDays = datetime.subtract(date2, date1).toDays()+1 // +1 converts amount of days to amount of nights!
        return diffInDays
    }

    properties = properties.results

    const pageTitle = 'Available properties for your dates'

    const bannerTopHeading='Dublin At Home'
    const bannerMainHeading='Property search'
    const bannerBottomHeading='Available properties for your search'
    const bannerImage='/img/new_header_image.jpg'

    const mapcoords = properties
    .filter(({ address }) => address && address.lat && address.lng)
    .map(({ address }) => ({
        lat: address.lat,
        lng: address.lng
    }));

    return (
        <>
            <BKBanner
                bannerTopHeading={bannerTopHeading}
                bannerMainHeading={bannerMainHeading}
                bannerBottomHeading={bannerBottomHeading}
                bannerImage={bannerImage}
            />
            <BKDatePicker fromDateState={query.dateFrom} toDateState={query.dateTo} areaState={query.area} roomsState={query.rooms} />
            <BKPropertiesList properties={properties} listType='search' query={query} />
            <section className="cont cont-col gap-24 max-full color-blue property-map-section">
                <div className="cont cont-col gap-24 max-1680 wrapper centered">
                <BKMap mapcoords = {mapcoords} defaultZoom = ' 12' />
                </div>
            </section>
            <section className="cont cont-col gap-24 max-full color-blue faq-section">
                <BKTestimonialHeading />
                <BKTestimonialList />
            </section>
        </>
    )
    
}

export const getServerSideProps = async (context) => {
    const credentials = base64_encode(process.env.GUESTY_CREDENTIAL)
    const auth = 'Basic ' + credentials

    const query = context.query.params
    let result
    const queryObject = {
        dateFrom: query[0],
        dateTo: query[1],
        rooms: query[2],
        area: query[3].charAt(0).toUpperCase() + query[3].slice(1)
    }

    if(queryObject.dateFrom === queryObject.dateTo) {
        // No search, just browse
        result = await fetch(`https://booking.guesty.com/api/listings?fields=_id title propertyType address.full address.city address.county picture pictures prices bathrooms bedrooms accommodates publicDescription`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await fetchBookingToken()
            },
        })
    }else{
        // Full search. Let's go!
        // Get nights
        const date1 = new Date(queryObject.dateFrom)
        const date2 = new Date(queryObject.dateTo)
        const timeDifference = date2.getTime() - date1.getTime()
        const nights = timeDifference / (1000 * 3600 * 24)
        result = await fetch(`https://booking.guesty.com/api/listings?limit=100&fields=_id title propertyType address.full address.city address.county picture pictures prices bathrooms bedrooms accommodates publicDescription &checkIn=${queryObject.dateFrom}&checkOut=${queryObject.dateTo}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await fetchBookingToken()
            },
            
        })
    }

    const properties = await result.json()

    const propertiesArray = properties.results ? [...properties.results] : []

    const specialPropertyId = "661d7dfd25f55e0013d62741"

    const specialPropertyIndex = propertiesArray.findIndex(prop => prop._id === specialPropertyId)

    if (specialPropertyIndex !== -1) {
        const [specialProperty] = propertiesArray.splice(specialPropertyIndex, 1);
        propertiesArray.unshift(specialProperty);
    }

    return {
        props: {
            properties: { ...properties, results: propertiesArray },
            query: queryObject
        }
    }



}


export default Availability


/*

        <Row name="properties">
            <Col>
                <Head>
                    <title>Search short term lettings in Dublin.</title>
                </Head>
                <Header pageTitle={pageTitle} />
                <Selector />
                <Properties properties={BKPropertiesList} listType='search' query={query} />
            </Col>
        </Row>

*/
