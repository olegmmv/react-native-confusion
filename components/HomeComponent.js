import React, { Component } from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

function RenderItem(props) {
    const {item} = props;

    if (!item) {
        return <View />;
    }

    return (
        <Card
            featuredTitle={item.name}
            featuredSubtitle={item.designation}
            image={require('./images/uthappizza.png')}
        >
            <Text style={{margin: 10}}>
                {item.description}
            </Text>
        </Card>
    )
}

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            promotions: PROMOTIONS,
            leaders: LEADERS,
        }
    }

    static navigationOptions = {
        title: 'Home',
    };

    render() {
        return (
            <ScrollView>
                <RenderItem item={this.state.dishes.find(d => d.featured)} />
                <RenderItem item={this.state.promotions.find(p => p.featured)} />
                <RenderItem item={this.state.leaders.find(l => l.featured)} />
            </ScrollView>
        );
    }
}

export default Home;