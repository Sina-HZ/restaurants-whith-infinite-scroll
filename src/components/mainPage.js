import React, { useEffect, useState } from 'react';
import '../App.css';
import { connect, useDispatch } from 'react-redux';
import { recieveFilters, fetchRestaurant, fetchInitaialRestaurant } from '../redux/actions';
import { fetchFilters, fetchVendor } from '../api';
import RestaurantBox from './restaurantBox';


const MainPage = ({ mainFilters, vendors, ...props }) => {
  const dispatch = useDispatch();
  const [currentSort, setCurrentSort] = useState('max_rate');
  const [page, setPage] = useState(1);
  const [lastScroll, setLastScroll] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (window) {
      window.addEventListener('scroll', handleScroll)
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll])


  useEffect(() => {
    (async () => {
      try {
        const resultFilters = await fetchFilters()
        const resultRestaurant = await fetchVendor(`?filters=${JSON.stringify({ ['sortings']: [currentSort] })}`)
        dispatch(recieveFilters(resultFilters.data.data.restaurantFilterTypes))
        dispatch(fetchInitaialRestaurant(resultRestaurant.data.data.finalResult))
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const handleScroll = async () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll < lastScroll) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
    setLastScroll(window.pageYOffset);
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    try {
      console.log('infinite: ', page);
      const result = await fetchVendor(`?filters=${JSON.stringify({ ['sortings']: [currentSort] })}`, page + 1);
      dispatch(fetchRestaurant(result.data.data.finalResult));
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.log(error)
    }
  };

  const filterHandler = async (type, value) => {
    try {
      setPage(1);
      setCurrentSort(value);
      document.documentElement.scrollTop = 0;
      setLastScroll(0);
      const result = await fetchVendor(`?filters=${JSON.stringify({ [type]: [value] })}`);
      dispatch(fetchInitaialRestaurant(result.data.data.finalResult));
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="App-main">
      <header className={`filter-box ${isVisible ? '' : 'hidden'}`}>
        <div className='chips-main'>
          {mainFilters && mainFilters.restaurantFilters.map((item, index) => (
            <div
              key={index}
              className={`filter-chips ${item.value === currentSort ? 'active' : ''}`}
              onClick={() => filterHandler('sortings', item.value)}
            >
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </header>
      <main className="container" >

        {vendors.map((item, index) => (
            <RestaurantBox
              id={item.data.id}
              title={item.data.title}
              logo={item.data.defLogo}
              address={item.data.address}
              rate={item.data.rate}
              countReview={item.data.countReview}
              vendorType={item.data.vendorTypeTitle}
            />
        ))}
        <div className='filter-button-main'>
          <button>
            <span>فیلترها</span>
            <img alt="filter-icon" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAzCAYAAADo8TpyAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wQeBxclUooDtAAAAvFJREFUaN7NWNtu2zAMpZhg6Dp3a4N8a4t1fRmGrkW+1fBiz3b0EJN7sTPF1V12HAECEksUj6hDUqIAAARzs43N2cg1QWjALQU2aBMq8GsDbN3AAHwK0Jh6/CHgBQCsZwA5GZdNcqHAcUmHVNt6YbA6PZRkQSnlCzNLZm6llM++2qWUz8zcMnPbNM2PCDkppXzxCYc6qyMztwCw6v93Qohbn40zcz2Sy3yoYdFHPlRRgawMv13UMcm5qGHTRzbguBDX0XMO6YDjjMoxJmq4wK8jQU8hQyngMcGCU1AkRg+C4YKFkYpghtPDlAQ0hWO5siSGOCYAIEZaK/VihhH6tB+CF6mq6omI9sz8V+2ahHQ2TkT7qqqeYvWqmfOTjuvM3JxNFOKLOo+I9kKIVYy5mblDxHuVOhp9n20Uw4AX0JyXLQz9FgsGy7J8Z+YuxtplWb4nOPaJKje6iZqju5vJ8jT4goaapihE6wnDH878bDMqw/GRjn6nJqZJfccoVNf1GzN3zNzVdf02kVIMcETbOA4cd0UWb2V5nj9uNptHAICiKHbb7Xbn+ZAoLRzXlidigBstRET5EN/7eL2NBH6nc8oQSwbRQU1KjgTl8qmL3uai25AXHD7130BVVf3Ksux7aPpm5k7HYWb+MzqBh8AwSbb4fVqXiI6Jd47tjMCNG7n2QqeZr0O8jrF2URS7JcHfjnoGABmPGgB87fu9rWvkzsbzPP9NREcObER0bJrmZx++b0QP9kPU0Fx6vvnQy8VxNc5HtFNlLIbjdBUcvzSQoih2sT7Vtu2rM+VbqGKNSJ7hkDRyySk/hDK0FNXQI+i7FPpugBxrhCSi4IIQWU6JIi1MKRYPWeBqogosxFNKMBallH5TnJNSjbQO4LHte+rpUAxVtB5teJE4rRX6klHqKiZ92vlGjh8Oh1cAML1IjBvwrA58WEOV63VbQ+RQ9Ewt+Exa1fIZw0BBmhEwhWwo1tnoQoCDooo6OaQeiBPQwfv0/wEf4TfMA47wkAAAAABJRU5ErkJggg==' />
          </button>
        </div>
      </main>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
    mainFilters: state.filters.find(item => item.value === 'sortings'),
    vendors: state.vendors,
    ownProps
  })

export default connect(mapStateToProps)(MainPage);
