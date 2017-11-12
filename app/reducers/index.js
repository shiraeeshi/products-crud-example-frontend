import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const filter = (state = '', action) => {
    switch (action.type) {
        case types.FILTER:
            return action.filter;
        default:
            return state;
    }
};

const products = (state = [], action) => {
    switch (action.type) {
        case types.RECEIVE_PRODUCTS:
            return action.products;
        case types.RECEIVE_ADDED_PRODUCT:
            return state.concat(action.product);
        case types.RECEIVE_PRODUCT_DELETED:
            return state.filter(product => product.id !== action.id);
        case types.RECEIVE_EDITED_PRODUCT:
            return state.map((eachProduct) => {
                let prod;
                if (eachProduct.id === action.product.id) {
                    prod = action.product;
                } else {
                    prod = eachProduct;
                }
                return prod;
            });
        default:
            return state;
    }
};

const productToEdit = (state, action) => {
    switch (action.type) {
        case types.START_EDIT_MODE:
            return action.product;
        default:
            return null;
    }
};


const rootReducer = combineReducers({
    filter,
    products,
    productToEdit,
    routing
});

export default rootReducer;
