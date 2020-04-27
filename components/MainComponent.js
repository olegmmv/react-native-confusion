import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu },
    Dishdetail: { screen: Dishdetail },
}, {
    initialRouter: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyles: {
            color: '#fff',
        },
    },
});

const HomeNavigator = createStackNavigator({
    Home: { screen: Home },
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyles: {
            color: '#fff',
        },
    },
});

const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawLabel: 'Home',
        },
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawLabel: 'Menu',
        },
    },
}, {
    drawerBackgroundColor: '#D1C4E9',
})

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
                <MainNavigator />
            </View>
        );
    }
};

export default Main;