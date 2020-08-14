import ItemCategory from "../utils/category";

const itemsReducer = (state, action) => {
	switch (action.type) {
		case 'SEND_REVIEW':
			return state;
		case 'LOAD_ITEMS':
			return state;
		case 'FETCH_ITEMS_FAILURE':
			state = {
				...state,
				error: action.payload,
			};
			return state;
		case 'FETCH_ITEMS_BEGIN':
			state = {
				...state,
				isLoading: true,
			};
			return state;

		case 'FETCH_ITEMS_SUCCESS':
			state = {
				...state,
				isLoading: false,
				items: action.payload,
                cart: [],
                selectedCategory:'ALL',
                categorized : [],
                searchResult : null,
                isSearching : false

			};
			return state;
		case 'SEND_ORDER_BEGIN':
			return state;
		case 'SEND_ORDER_SUCCESS':
			return state;

		case 'SEND_ORDER_FAILURE':
            return state;
        case 'CATEGORY_SELECTED':
            let categorized = state.items.filter(item => {
                return item.category._id === ItemCategory[action.payload]
            })
            
            state = {
                ...state,
                selectedCategory : action.payload,
                categorized
            }
            return state

        case 'CLEAR_CART':
            state = {
                ...state,
                cart:[]
            }
            return state

        case 'SEARCH_BEGIN':
            state = {
                ...state,
                isSearhing : true
            }
            return state
        case 'SEARCH_SUCCESS':
            state = {
                ...state,
                isSearhing : false,
                searchResult : action.payload
            }
           
            return state
        case 'SEARCH_FAILURE':
            state = {
                ...state,
                isSearhing:false,
                searchResult : []
            }
            return state

        case 'EXIT_SEARCH':
                state = {
                    ...state,
                    isSearhing:false,
                    searchResult : null
                }
                return state

		case 'ADD_TO_CART':
			let newItem = { itemId: action.payload, amount: 1 };

			const cartExits = state.cart.find(data => {
				return data.itemId === action.payload;
			});
			if (cartExits) {
				let newCart = state.cart.map(cart => {
					if (cart.itemId === action.payload) {
						cart.amount += 1;
						return cart;
					}

					return cart;
				});
				state = {
					...state,
					cart: newCart,
				};
				return state;
			} else {
				state = {
					...state,
					cart: [...state.cart, newItem],
				};
				return state;
			}
		case 'REMOVE_FROM_CART':
			const newCart = state.cart.filter(cart => {
				return cart.itemId !== action.payload;
			});
			return {
				...state,
				cart: newCart,
			};
		default:
			return state;
	}
};

export default itemsReducer;
