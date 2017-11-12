import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addProduct, editProduct } from '../actions';

class ProductEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.updateStateByProps(props);
    }

    componentWillReceiveProps(props) {
        this.updateStateByProps(props);
    }

    updateStateByProps({ name, price, id, isNew, onProductEditingDone }) {
        this.state = {
            name,
            price
        };
        this.isNew = isNew;
        this.id = id;
        this.onProductEditingDone = onProductEditingDone;
    }

    handleSubmit = (eve) => {
        eve.preventDefault();
        this.props.onProductEditingDone(this.state.name, this.state.price, this.props.isNew, this.props.id);
    };

    render() {
        return (
            <div>
                <form action="#" onSubmit={eve => {this.handleSubmit(eve);}} >
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={e => {this.setState({name: e.target.value});}}
                        />
                    <input
                        type="text"
                        value={this.state.price}
                        onChange={e => {this.setState({price: e.target.value});}}
                        />
                    <button type="submit">
                        done
                    </button>
                </form>
            </div>
        );
    }
}

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
            name: '',
            price: '',
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
        onProductEditingDone: (name, price, isNew, id) => {
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
