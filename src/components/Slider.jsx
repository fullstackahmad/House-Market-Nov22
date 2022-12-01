import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import {db} from '../firebase.config'

// a bit different from brad's work
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import 'swiper/css'
import Spinner from './Spinner'
import { async } from '@firebase/util'

// i dont use brad's - SwiperCore.use([Navigation ... bla bla])

function Slider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(() => { 

    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, orderBy('timestamp','desc'), limit(5))
      const querySnap = await getDocs(q)
      let listings = []

      querySnap.forEach((doc)=> {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      console.log(listings)
      setListings(listings)
      setLoading(false)
    }

    fetchListings()
    
   },[])

   if(loading) {
    return <Spinner />
   }

   if(listings.length === 0) {
    return <></>
   }

  return (
    listings &&
    <>
      <p className='exploreHeading'>Latest Listings</p>

      <Swiper
        slidesPerView={1}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        pagination={true}
        navigation
        scrollbar={{ dragable: true }}
      >
        {listings.map(({data, id}) => (
          <SwiperSlide key={id} onClick={()=> navigate(`/category/${data.type}/${id}`)}>
            <div
              style={{
                background: `url(${data.imgUrls[0]}) center no-repeat`,
                backgroundSize: 'cover',
                // minHeight: "21rem", 
                // better changed with media in index.css to set in large screens
              }}
              className='swiperSlideDiv'
            >
              <p className="swiperSlideText">{data.name}</p>
              <p className="swiperSlidePrice">${data.discountedPrice ?? data.regularPrice}
              {data.type === 'rent' && '/ month'}
              </p>

            </div>
          </SwiperSlide>
        ))}

      </Swiper>
    </>
  )
}

export default Slider