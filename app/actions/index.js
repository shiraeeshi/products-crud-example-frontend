import * as types from './types';
import Promise from 'promise';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

let nextId = 0;
let products = [];

const productAdded = product => ({
    type: types.RECEIVE_ADDED_PRODUCT,
    product
});

export const addProduct = (name, price) => dispatch => {
    return Promise.resolve(Object.assign({}, {name, price}, {id: nextId++}))
        .then(product => {
            products.push(product);
            dispatch(productAdded(product));
        });
};

const productEdited = product => ({
    type: types.RECEIVE_EDITED_PRODUCT,
    product
});

export const editProduct = (id, name, price) => dispatch => {
    return Promise.resolve({id, name, price})
        .then(editedProduct => {
            products = products.map(eachProduct => {
                let prod;
                if (eachProduct.id === id) {
                    prod = editedProduct;
                } else {
                    prod = eachProduct;
                }
                return prod;
            });
            dispatch(productEdited(editedProduct));
        });
};

const receiveProducts = (prods) => ({
    type: types.RECEIVE_PRODUCTS,
    prods
});

export const getProducts = () => dispatch => {
    return Promise.resolve(products)
        .then(prods => {
            dispatch(receiveProducts(prods));
        });
};

const productDeleted = id => ({
    type: types.RECEIVE_PRODUCT_DELETED,
    id
});

export const deleteProduct = id => dispatch => {
    return Promise.resolve()
        .then(() => {
            products = products.filter(product => product.id !== id);
            dispatch(productDeleted(id));
        });
};

export const startEditMode = product => ({
    type: types.START_EDIT_MODE,
    product
});
