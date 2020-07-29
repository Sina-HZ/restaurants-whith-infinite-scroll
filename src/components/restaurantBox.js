import React, { memo } from 'react'

const RestaurantBox = ({ title, logo, address, countReview, rate, vendorType, id }) => {
  return (
    <div className='restaurant-box' key={id}>
      <div className='inner-wrap'>

        <img src={logo} alt='restaurant logo' />
        <div className='info-wrap'>
          <h4>{title}</h4>
          <span className="type">{vendorType}</span>
          <span className="address">{address}</span>
        </div>

      </div>

      <div className='aditional-info'>
        <div className='reviews' >
          <span className='rates'>{rate}</span>
          <span className='count'>{countReview}<span>نظر</span></span>
        </div>
        <div className='badges'></div>
      </div>

    </div>
  )
}

export default RestaurantBox;
