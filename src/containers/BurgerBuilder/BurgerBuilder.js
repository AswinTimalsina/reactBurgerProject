import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component{
    state= {
        ingredients: null,
        totalPrice: 4,

        //local UI State
        orderSum: true,     //this is for the ui of the button, the animation after order>0
        modalShow: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://react-burger-app-3e7e3.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState({ingredients : response.data})
        }).catch(error=>{this.setState({error:true})})
    }

    orderButtonHandler = (ingreCopy) =>{   
        // let ingreCopy = {...this.state.ingredients}; 
        let sum = Object.keys(ingreCopy).map(ingKey =>{
            return ingreCopy[ingKey];
        }).reduce((init, el)=>{
            return init+el;
        },0)

        this.setState({orderSum: sum<=0})
    }

    moreHandler = (type) =>{
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = this.state.ingredients[type] +1;
        
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState(
            {ingredients:updatedIngredients, 
            totalPrice:newPrice
            }
        )
        this.orderButtonHandler(updatedIngredients);
    }

    lessHandler=(type)=>{
        let oldCount = this.state.ingredients[type];
        // If the old count is less than or equal to 0, nothing happens
        if(oldCount <= 0){
            return;
        }
        let newIngredients = {...this.state.ingredients};
        newIngredients[type] = this.state.ingredients[type] -1;

        let newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState(
            {ingredients: newIngredients, totalPrice: newPrice}
        )
        this.orderButtonHandler(newIngredients);
    }

    showModalHandler =()=>{
        this.setState({modalShow: true})
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

        const queryParams = [];

        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+ '='+encodeURIComponent(this.state.ingredients[i]));  
        }

        queryParams.push('price='+this.state.totalPrice);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?'+queryString

        })
    }

    render(){
       let orderSummary = null;

        const disabledInfo = {...this.state.ingredients};

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Cannot fetch the ingredients!</p> : <Spinner/>

        if(this.state.ingredients){
            burger =(<Aux>
                <Burger ingredients={this.state.ingredients}/>
             
                <BuildControls 
                     Less={this.lessHandler} 
                     More={this.moreHandler} 
                     disabled={disabledInfo} 
                     totalPrice={this.state.totalPrice} 
                     orderButton={this.state.orderSum} 
                     modalShow={this.showModalHandler}/>

            </Aux>)
        
        orderSummary =  <OrderSummary 
        cancelPurchaseHandler={this.removeModalHandler} 
        successPurchaseHandler={this.successPurchaseHandler} 
        ingredients={this.state.ingredients} 
        total={this.state.totalPrice}/>
        }

        if(this.state.loading){
            orderSummary = <Spinner /> }

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

export default withErrorHandler(BurgerBuilder, axios);