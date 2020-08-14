export const addToCart = (item_id) => {
    return {
        type : 'ADD_TO_CART',
        payload : item_id
    }
}

export const removeFromCart = (item_id) => {
    return {
        type : 'REMOVE_FROM_CART',
        payload : item_id
    }
}

export const clearCart = () => {
    return {
        type : 'CLEAR_CART'
    }
}
export const sendingReview = () => {
    return {
        type : 'SEND_REVIEW'
    }
}

export const fetchItemsBegin = () => {
    return  {
        type : 'FETCH_ITEMS_BEGIN'
    }
}

export const fetchItemsSuccess  = (items) => {
    return {
        type : 'FETCH_ITEMS_SUCCESS',
        payload :  items
    }
}   

export const  fetchItemsFailure = (error) => {
    return {
        type : 'FETCH_ITEMS_FAILURE',
        payload : error
    }
}

export const setLoadedItems = (items) => {
    return {
        type : 'SET_LOADED_ITEMS',
        payload : items
    }
}

export  const sendOrderBegin = () => {
    return {
        type : 'SEND_ORDERS_BEGIN'
    }
}

export const sendOrderSuccess = () => {
    return {
        type : 'SEND_ORDER_SUCCESS'
    }
}

export const sendOrderFailure = (error) => {
    return {
        type : 'SEND_ORDER_FAILURE',
        payload:error
    }
}

export const selectCategory = (cat) =>  {
    return {
        type:'CATEGORY_SELECTED',
        payload : cat
    }
}

export const searchBegin = () => {
    return {
        type : 'SEARCH_BEGIN'
    }
}

export const searchSuccess = (result) => {
    return {
        type : 'SEARCH_SUCCESS',
        payload : result
    }
}

export const exitSearch = () => {
    return {
        type : 'EXIT_SEARCH'
    }
}


export const searchFailure = (error) => {
    return {
        type : 'SEARCH_FAILURE',
        payload : error
    }
}

export const searchItems = (val) => {

    return dispatch  => {
        dispatch(searchBegin())
        fetch(`/items/search?searchParam=${val}`)
            .then(res => res.json())
            .then(data => {
                
                dispatch(searchSuccess(data))
            })
            .catch(err => searchFailure(err))
    }
}

export const sendOrder = (order, phoneNo) => {
    const body = {order,phoneNo}

    return dispatch => {
        dispatch(sendOrderBegin())
        fetch(`/orders`,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body),

        })
            .then(res => res.json())
            .then(data => {
                dispatch(sendOrderSuccess())
            })
            .catch(err => {
                console.log(err)
                dispatch(sendOrderFailure(err))
            })
    }
}

export const sendReview = (review, id) => {
    const body = {review : review}
    
    return dispatch  => {
        dispatch(sendingReview())
        fetch(`/items/add_review/${id}`,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body),

        })
            .then(res => res.json())
            .then(data => {
                dispatch(loadItems())
            })
            .catch(err => console.log(err))
    }
}

export const loadItems = ()  => {
    return dispatch => {
        dispatch(fetchItemsBegin())
        return fetch('/items')
            .then(res => res.json())
            .then(json => {
                dispatch(fetchItemsSuccess(json.items))
            })
            .catch(err => dispatch(fetchItemsFailure(err)))

    }
}