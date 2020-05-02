import React, { Component } from 'react';
import {View, FlatList} from 'react-native';
import {Tile} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';

class Menu extends Component {

    static navigationOptions = {
        title: 'Menu',
    };

    render() {
        const {navigate} = this.props.navigation;

        const renderMenuItem = ({item}) => {
            return (
                <Tile 
                    key={item.id.toString()}
                    title={item.name}
                    caption={item.description}
                    imageSrc={{uri: baseUrl + item.image}}
                    onPress={() => navigate('Dishdetail', {dishId: item.id})}
                    featured
                />
            )
        };

        return (
            <FlatList
                data={this.props.dishes.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

const mapStateToProps = state => ({
    dishes: state.dishes,
});

export default connect(mapStateToProps)(Menu);