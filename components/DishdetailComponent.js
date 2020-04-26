import React, { Component } from 'react';
import {View, Text} from 'react-native';
import {Card} from 'react-native-elements';
import { DISHES } from '../shared/dishes';

function RenderDish(props) {
    const {dish} = props;

    if (!dish) {
        return <View />;
    }

    return (
        <Card
            featuredTitle={dish.name}
            image={require('./images/uthappizza.png')}
        >
            <Text style={{margin: 10}}>
                {dish.description}
            </Text>
        </Card>
    );
}

class Dishdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
        };
    }

    static navigationOptions = {
        title: 'Dish Details',
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId');
        return (
            <RenderDish dish={this.state.dishes.find(d => d.id === +dishId)} />
        );
    }
}

export default Dishdetail;