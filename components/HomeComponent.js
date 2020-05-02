import React, { Component } from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';

function RenderItem(props) {
    const {item} = props;

    if (!item) {
        return <View />;
    }

    return (
        <Card
            featuredTitle={item.name}
            featuredSubtitle={item.designation}
            image={{ uri: baseUrl + item.image }}
        >
            <Text style={{margin: 10}}>
                {item.description}
            </Text>
        </Card>
    )
}

class Home extends Component {

    static navigationOptions = {
        title: 'Home',
    };

    render() {
        const {dishes, promotions, leaders} = this.props;
        return (
            <ScrollView>
                <RenderItem item={dishes.dishes.find(d => d.featured)} />
                <RenderItem item={promotions.promotions.find(p => p.featured)} />
                <RenderItem item={leaders.leaders.find(l => l.featured)} />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    dishes: state.dishes,
    leaders: state.leaders,
    promotions: state.promotions,
});

export default connect(mapStateToProps)(Home);