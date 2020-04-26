import React, {Component} from 'react';
import {View} from 'react-native';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import Dishdetail from './DishdetailComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            dishes: DISHES,
            selectedDish: null,
        };

        this.onDishSelect = this.onDishSelect.bind(this);
    }

    onDishSelect(dishId) {
        this.setState({selectedDish: dishId})
    }

    render() {
        const {dishes, selectedDish} = this.state;
        return (
            <View>
                <Menu 
                    dishes={dishes} 
                    onPress={this.onDishSelect}
                />
                <Dishdetail dish={dishes.find(d => d.id === selectedDish)} />
            </View>
        );
    }
};

export default Main;