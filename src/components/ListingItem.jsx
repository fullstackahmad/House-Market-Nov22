import {Link} from 'react-router-dom'
import {ReactComponent as DeleteIcon} from '../assets/svg/deleteIcon.svg'
import {ReactComponent as EditIcon} from '../assets/svg/editIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'

function ListingItem({ listing, id, onEdit, onDelete }) {
  return (

    <li className='categoryListing'>
    <Link 
      to={`/category/${listing.type}/${id}`}
      className='categoryListingLink'
    >
        <img 
          src={listing.imgUrls[0]} 
          alt={listing.name} 
          className='categoryListingImg'
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">
            {listing.location}
          </p>
          <p className="categoryListingName">{listing.name}</p>

          <p className="categoryListingPrice">
            {/* if there is an offer we show discounted price else regular price and we used regular expression to add a comma after every 3 digits */}
            ${listing.offer
               ? listing.discountedPrice 
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
               : listing.regularPrice 
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === 'rent' && ' / Month'}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="bed" />
            <p className="categoryListingInfoText">
              {listing.bedrooms > 1 ? `${listing.bedrooms} bedrooms` : '1 Bedroom'}
            </p>
            <img src={bathtubIcon} alt="bathrooms" />
            <p className="categoryListingInfoText">
              {listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms` : '1 Bathroom'}
            </p>
            
          </div>
        </div>
    </Link>

    {/* this delete button is only visible to owner of the listing */}
    {onDelete && (
      <DeleteIcon 
        className='removeIcon' 
        fill='rgb(231,76,60)' 
        onClick={() => onDelete(listing.id, listing.name)} />
    )}


    {onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)} />}
    </li>
    
  )
}

export default ListingItem