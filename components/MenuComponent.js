import React from 'react';
import {View, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';

function Menu(props) {
    const renderMenuItem = ({item, index}) => {
        return (
            <ListItem 
                key={item.id.toString()}
                title={item.name}
                subtitle={item.description}
                leftAvatar={{source: require('./images/uthappizza.png')}}
                hideChevron
            />
        )
    }

    return (
        <FlatList
            data={props.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
        />
    )
}

export default Menu;