import React , {Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) =>{
    // return again takes a function with props as argument
    // here this class is an anonymous class because I never use it again, I only return it here
    //but why to use class???
   return class extends Component {
    state={
        error: null
    }
    
    // why componentDidMount ??
    componentWillMount(){
        this.reqInterceptors = axios.interceptors.request.use(req=>{
            // when seneding request don't show the error it means
            this.setState({error: null})
            return req;

        } )

        this.resInterceptors = axios.interceptors.response.use(res=>res, error=>{
            this.setState({error: error})
        })
    }

    componentWillUnmount(){
        axios.interceptors.request.eject(this.reqInterceptors);
        axios.interceptors.response.eject(this.resInterceptors);

    }

        errorConfirmedHandler=()=>{
            this.setState({error: null})
        }

       render(){
    return(
     <Aux> 

         <Modal modalShow={this.state.error} removeBackdrop={this.errorConfirmedHandler}>
             {this.state.error ? this.state.error.message : null}
         </Modal>
         <WrappedComponent {...this.props}/>
    </Aux>)
       }
   }
}

export default withErrorHandler;