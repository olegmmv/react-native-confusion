import React, { Component } from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {postFavorite} from '../redux/ActionCreators';

function RenderDish(props) {
    const {dish} = props;

    if (!dish) {
        return <View />;
    }

    return (
        <Card
            featuredTitle={dish.name}
            image={{ uri: baseUrl + dish.image }}
        >
            <Text style={{margin: 10}}>
                {dish.description}
            </Text>
            <Icon
                raised
                reverse
                name={props.favorite ? 'heart' : 'heart-o'}
                type="font-awesome"
                color="#F50"
                onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
            />
        </Card>
    );
}

function RenderComments(props) {
    const {comments} = props;

    const renderCommentItem = ({item}) => {
        return (
            <View key={item.id} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    }

    return (
        <Card title="Comments">   
            <FlatList 
                data={comments} 
                renderItem={renderCommentItem} 
                keyExtractor={item => item.id.toString()} 
            />
        </Card>
    );
}

class Dishdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
        };

        this.markFavorite = this.markFavorite.bind(this);
    }

    static navigationOptions = {
        title: 'Dish Details',
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId');
        const {favorites, dishes, comments} = this.props;

        return (
            <ScrollView>
                <RenderDish 
                    dish={dishes.dishes.find(dish => dish.id === dishId)}
                    favorite={favorites.some(fav => fav === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                />
                <RenderComments comments={comments.comments.filter(comment => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
});

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
});

export default connect(
    mapStateToProps, 
    mapDispatchToProps    
)(Dishdetail);