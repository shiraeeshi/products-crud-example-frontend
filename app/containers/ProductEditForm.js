import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addProduct, editProduct } from '../actions';

const ProductEditForm = ({ name, price, id, isNew, onProductEditingDone }) => {
    let nameInput;
    let priceInput;
    // console.log('ProductEditForm', name, price, id, isNew, onProductEditingDone, nameInput, priceInput);
    return (
        <div>
            <form action="#" onSubmit={eve => onProductEditingDone(eve, nameInput.value, priceInput.value, isNew, id)} >
                <input
                    value={name}
                    ref={node => {nameInput = node;}} />
                <input
                    value={price}
                    ref={node => {priceInput = node;}} />
                <button type="submit">
                    done
                </button>
            </form>
        </div>
    );
};

ProductEditForm.propTypes = {
    name: PropTypes.string,
    price: PropTypes.string,
    isNew: PropTypes.bool,
    id: PropTypes.number,
    onProductEditingDone: PropTypes.func
};

const mapStateToProps = (state) => {
    if (!state.productToEdit) {
        return {
            isNew: true
        };
    }
    return {
        id: state.productToEdit.id,
        name: state.productToEdit.name,
        price: state.productToEdit.price
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onProductEditingDone: function(eve, name, price, isNew, id) {
            eve.preventDefault();
            if (isNew) {
                dispatch(addProduct(name, price));
            } else {
                dispatch(editProduct(id, name, price));
            }
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductEditForm);
