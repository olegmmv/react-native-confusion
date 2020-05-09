import React, { Component } from 'react';
import {View, Text, ScrollView, FlatList, Modal, StyleSheet, Button, SafeAreaView, PanResponder, Alert} from 'react-native';
import {Card, Icon, Rating, Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {postFavorite, postComment} from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

function RenderDish(props) {
    const {dish} = props;

    const recognizeDrag = ({moveX, moveY, dx, dy}) => {
        return dx < -100;
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => true,
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add to Favorites?',
                    `Are you shure you wish to add ${dish.name} to your Favorites?`,
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel pressed'),
                            style: 'cancel',
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ? console.log('Already favorite') : props.onPress(),
                        }
                    ],
                    {cancelable: true}
                )
            }

            return true;
        }
    })

    if (!dish) {
        return <View />;
    }

    return (
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000} {...panResponder.panHandlers}>
            <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image }}
            >
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <Icon
                        raised
                        reverse
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type="font-awesome"
                        color="#F50"
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name="pencil"
                        type="font-awesome"
                        color="#512FA8"
                        onPress={props.onEdit}
                    />
                </View>
            </Card>
        </Animatable.View>
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
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">   
                <FlatList 
                    data={comments} 
                    renderItem={renderCommentItem} 
                    keyExtractor={item => item.id.toString()} 
                />
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            showModal: false,
            rating: 5,
            author: '',
            comment: '',
        };

        this.markFavorite = this.markFavorite.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    static navigationOptions = {
        title: 'Dish Details',
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal})
    }

    handleComment(dishId) {
        const {rating, author, comment} = this.state;
        this.props.postComment(dishId, rating, author, comment)
        this.toggleModal();
        this.resetForm();
    }

    resetForm() {
        this.setState({
            rating: 5,
            author: '',
            comment: '',
        });
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
                    onEdit={this.toggleModal}
                />
                <RenderComments comments={comments.comments.filter(comment => comment.dishId === dishId)} />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {this.resetForm();}}
                    onRequestClose={() => {
                        this.toggleModal();
                        this.resetForm();
                    }}
                >
                    <SafeAreaView style={styles.modal}>
                        <Rating 
                            showRating 
                            startingValue={this.state.rating}
                            onFinishRating={(value) => this.setState({rating: value})}
                        />
                        <Input
                            placeholder="Author"
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            onChangeText={value => this.setState({ author: value })}
                        />
                        <Input
                            placeholder="Comment"
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            onChangeText={value => this.setState({ comment: value })}
                        />
                        <Button 
                            onPress={() => this.handleComment(dishId)}
                            color="#512DA8"
                            title="SUBMIT"
                        />
                        <Button 
                            onPress={() => {
                                this.toggleModal(); 
                                this.resetForm();
                            }}
                            color="#757575"
                            title="CANCEL"
                        />  
                    </SafeAreaView>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        flex: 1,
        margin: 20,
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
});


const mapStateToProps = state => ({
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
});

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
});

export default connect(
    mapStateToProps, 
    mapDispatchToProps    
)(Dishdetail);