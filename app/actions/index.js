import * as types from './types';

const PRODUCTS_URL = 'http://localhost:9000/v1/products';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

const productAdded = product => ({
    type: types.RECEIVE_ADDED_PRODUCT,
    product
});

export const addProduct = (name, price) => dispatch => {
    return fetch(PRODUCTS_URL, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, price})
    })
    .then(response => response.json())
    .then(product => {
        dispatch(productAdded(product));
    });
};

const productEdited = product => ({
    type: types.RECEIVE_EDITED_PRODUCT,
    product
});

export const editProduct = (id, name, price) => dispatch => {
    return fetch(PRODUCTS_URL + '/' + id, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, price})
    })
    .then(response => response.json())
    .then(editedProduct => {
        dispatch(productEdited(editedProduct));
    });
};

const receiveProducts = (prods) => ({
    type: types.RECEIVE_PRODUCTS,
    products: prods
});

export const getProducts = () => dispatch => {
    return fetch(PRODUCTS_URL)
    .then(response => response.json())
    .then(prods => {
        dispatch(receiveProducts(prods));
    });
};

const productDeleted = id => ({
    type: types.RECEIVE_PRODUCT_DELETED,
    id
});

export const deleteProduct = id => dispatch => {
    return fetch(PRODUCTS_URL + '/' + id, {
        method: 'delete'
    })
    .then(response => response.json())
    .then(response => {
        if (!response.success) {
            return;
        }
        dispatch(productDeleted(id));
    });
};

export const startEditMode = product => ({
    type: types.START_EDIT_MODE,
    product
});
