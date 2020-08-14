import React from 'react'
import {useSelector} from 'react-redux'
import DisconutedItem from './DiscountedItem'

const DisconutedItems = (props) => {
    const stateItems = useSelector(state => state.items)    
    
    const items = stateItems.filter(item => {
        return item.onDiscount
    })
    
    if(items.length > 0) {
        return (
            <div className="discounts-items">
                <p className='centered' >DISCOUNTED</p>
                <div className="discounts">
                    {
                        items.map(item => {
                            return <DisconutedItem item={item} key={item._id} />
                        })
                    }
                </div>
            </div>
        )

    }
    return <div><p style={{textAlign:'center'}}>No items are on discount.</p></div>
}

export default DisconutedItems