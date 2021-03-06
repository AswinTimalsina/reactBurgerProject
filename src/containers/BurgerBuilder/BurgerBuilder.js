import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/index';
import axios from '../../axios-orders';


class BurgerBuilder extends Component{
    state= {
        // orderSum: true,
        modalShow: false,
        // loading: false,
        // error: false
    }

    componentDidMount(){
        console.log(this.props);
        this.props.onInitIngredients();
    }

    orderButtonHandler = (ingreCopy) =>{   
        // let ingreCopy = {...this.state.ingredients}; 
        let sum = Object.keys(ingreCopy).map(ingKey =>{
            return ingreCopy[ingKey];
        }).reduce((init, el)=>{
            return init+el;
        },0)

        return sum <= 0;
    }

    // moreHandler = (type) =>{
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = this.state.ingredients[type] +1;
        
    //     const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    //     this.setState(
    //         {ingredients:updatedIngredients, 
    //         totalPrice:newPrice
    //         }
    //     )
    //     this.orderButtonHandler(updatedIngredients);
    // }

    // lessHandler=(type)=>{
    //     let oldCount = this.state.ingredients[type];
    //     // If the old count is less than or equal to 0, nothing happens
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     let newIngredients = {...this.state.ingredients};
    //     newIngredients[type] = this.state.ingredients[type] -1;

    //     let newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    //     this.setState(
    //         {ingredients: newIngredients, totalPrice: newPrice}
    //     )
    //     this.orderButtonHandler(newIngredients);
    // }

    showModalHandler =()=>{
        if(this.props.isAuthenticated){
        this.setState({modalShow: true})}
        else{
            this.props.setAuthRedirectPath('/checkout');
            this.props.history.push('/authenticate');
        }
    }

    removeModalHandler =() =>{
        this.setState({modalShow: false})
    }
    
    successPurchaseHandler = () => {
        // const order = {
        //     ingredients : this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Aswin Timalsina',
        //         address: {
        //             street: '205 N McGuire Ave',
        //             apt: 'B',
        //             zipCode: '71203',
        //             country: 'Nepal'
        //         },
        //         email: 'aswin.timalsina1@gmail.com'
        //     },
        //     deliveryMethod: 'fastest'

        // }

        // this.setState({loading: true})
        // axios.post('/orders.json', order)
        // .then(response=>{
        //     console.log(response)
        //     this.setState({loading: false, modalShow: false})
        // })
        // .catch(error=>{
        //     console.log(error)
        //     this.setState({loading: false, modalShow: false})
        // })

        // const queryParams = [];

        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+ '='+encodeURIComponent(this.state.ingredients[i]));  
        // }

        // queryParams.push('price='+this.state.totalPrice);

        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?'+queryString

        // })
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){
       let orderSummary = null;

        const disabledInfo = {...this.props.ings};

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.props.error ? <p style={{textAlign: 'center'}}>Cannot fetch the ingredients!</p> : <Spinner/>

        if(this.props.ings){
            burger =(<Aux>
                <Burger ingredients={this.props.ings}/>
             
                <BuildControls 
                     Less={this.props.lessHandler} 
                     More={this.props.moreHandler} 
                     disabled={disabledInfo} 
                     totalPrice={this.props.price} 
                     orderButton={this.orderButtonHandler(this.props.ings)} 
                     modalShow={this.showModalHandler}
                     isAuthenticated={this.props.isAuthenticated}
                     />

            </Aux>)
        
        orderSummary =  <OrderSummary 
        cancelPurchaseHandler={this.removeModalHandler} 
        successPurchaseHandler={this.successPurchaseHandler} 
        ingredients={this.props.ings} 
        total={this.props.price}/>
        }

        // if(this.props.loading){
        //     orderSummary = <Spinner /> }
                                                                                                                    
        return(
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
        ings: state.burg.ingredients,
        price: state.burg.totalPrice,
        error: state.burg.error,
        loading: state.burg.loading,
        isAuthenticated: state.auth.token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        moreHandler: (ingName) => dispatch(actions.addIngredient(ingName)),
        lessHandler: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));
