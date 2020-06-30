import React, {Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';



class Layout extends Component {
    state={
        backdropShow: false
    }

    backdropHandler=()=>{
        this.setState({backdropShow: false})
    }

    backdropOpener=()=>{
        this.setState((prevState)=>{
            return{backdropShow: true}
        })
    }

    render(){
    return(<Aux> 
    <Toolbar openSideDrawer={this.backdropOpener} isAuthenticated={this.props.isAuthenticated}/>
    <SideDrawer backdropShow={this.state.backdropShow} backdropHandler={this.backdropHandler} isAuthenticated={this.props.isAuthenticated}/>
    <main className={styles.Content}>{this.props.children}</main>
    </Aux>)
}
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token != null           //isAuthenticated == true
    }
}

export default connect(mapStateToProps)(Layout);