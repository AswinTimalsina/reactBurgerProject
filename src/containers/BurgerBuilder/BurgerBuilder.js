import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/action';


class BurgerBuilder extends Component {
    state = {
        orderSum: true,
        modalShow: false,
        loading: false,
        error: false
    }

    orderButtonHandler = (ingreCopy) => {
        // let ingreCopy = {...this.state.ingredients}; 
        let sum = Object.keys(ingreCopy).map(ingKey => {
            return ingreCopy[ingKey];
        }).reduce((init, el) => {
            return init + el;
        }, 0)

        this.setState({ orderSum: sum <= 0 })
    }

    showModalHandler = () => {
        this.setState({ modalShow: true })
    }

    removeModalHandler = () => {
        this.setState({ modalShow: false })
    }

    successPurchaseHandler = () => {
        // const queryParams = [];

        // for (let i in this.props.ings) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        // }

        // queryParams.push('price=' + this.props.totalPrice);

        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString

        // })
        this.props.history.push('/checkout');
    }

    render() {
        let orderSummary = null;

        const disabledInfo = { ...this.props.ings };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p style={{ textAlign: 'center' }}>Cannot fetch the ingredients!</p> : <Spinner />

        if (this.props.ings) {
            burger = (<Aux>
                <Burger ingredients={this.props.ings} />

                <BuildControls
                    Less={this.props.lessHandler}
                    More={this.props.moreHandler}
                    disabled={disabledInfo}
                    totalPrice={this.props.totalPrice}
                    orderButton={this.state.orderSum}
                    modalShow={this.showModalHandler} />

            </Aux>)

            orderSummary = <OrderSummary
                cancelPurchaseHandler={this.removeModalHandler}
                successPurchaseHandler={this.successPurchaseHandler}
                ingredients={this.props.ings}
                total={this.props.totalPrice} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal
                    modalShow={this.state.modalShow}
                    removeBackdrop={this.removeModalHandler}>
                    {/* Either ordersummary or spinner */}
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>

        );

    }

}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        lessHandler: (ingredient) => dispatch({ type: actionTypes.LESSHANDLER, ingredientType: ingredient }),
        moreHandler: (ingredient) => dispatch({ type: actionTypes.MOREHANDLER, ingredientType: ingredient })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
