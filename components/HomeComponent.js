import React, { Component } from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

function RenderItem(props) {
    const {item} = props;

    if (props.isLoading) {
        return <Loading />;
    } else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }

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
                <RenderItem 
                    item={dishes.dishes.find(d => d.featured)} 
                    isLoading={dishes.isLoading}
                    errMess={dishes.errMess}
                />
                <RenderItem 
                    item={promotions.promotions.find(p => p.featured)} 
                    isLoading={promotions.isLoading}
                    errMess={promotions.errMess}
               />
                <RenderItem 
                    item={leaders.leaders.find(l => l.featured)} 
                    isLoading={leaders.isLoading}
                    errMess={leaders.errMess}
                />
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