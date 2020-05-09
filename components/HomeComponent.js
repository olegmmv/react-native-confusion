import React, { Component } from 'react';
import {Text, View, Animated, Easing} from 'react-native';
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
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
    }

    static navigationOptions = {
        title: 'Home',
    };

    componentDidMount() {
        this.animate();
    }

    animate() {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 8,
                duration: 8000,
                easing: Easing.linear,
            }
        ).start(() => this.animate());
    }

    render() {
        const {dishes, promotions, leaders} = this.props;

        const xpos1 = this.animatedValue.interpolate({
            inputRange: [0, 1, 3, 5, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });

        const xpos2 = this.animatedValue.interpolate({
            inputRange: [0, 2, 4, 6, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });

        const xpos3 = this.animatedValue.interpolate({
            inputRange: [0, 3, 5, 7, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });

        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <Animated.View style={{width: '100%', transform: [{translateX: xpos1}]}} >
                    <RenderItem 
                        item={dishes.dishes.find(d => d.featured)} 
                        isLoading={dishes.isLoading}
                        errMess={dishes.errMess}
                    />
                </Animated.View> 
                <Animated.View style={{width: '100%', transform: [{translateX: xpos2}]}} >   
                    <RenderItem 
                        item={promotions.promotions.find(p => p.featured)} 
                        isLoading={promotions.isLoading}
                        errMess={promotions.errMess}
                    />
                </Animated.View> 
                <Animated.View style={{width: '100%', transform: [{translateX: xpos3}]}} >   
                    <RenderItem 
                        item={leaders.leaders.find(l => l.featured)} 
                        isLoading={leaders.isLoading}
                        errMess={leaders.errMess}
                    />
                </Animated.View>    
            </View>
        );
    }
}

const mapStateToProps = state => ({
    dishes: state.dishes,
    leaders: state.leaders,
    promotions: state.promotions,
});

export default connect(mapStateToProps)(Home);