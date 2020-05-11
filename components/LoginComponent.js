import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {Card, Icon, Input, CheckBox} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false,
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        SecureStore.getItemAsync('userInfo')
            .then((userData) => {
                let userInfo = JSON.parse(userData);
                if (userInfo) {
                    this.setState({
                        username: userInfo.username,
                        password: userInfo.password,
                        remember: true,
                    })
                }
            })
    }

    static navigationOptions = {
        title: 'Login'
    };

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            const {username, password, remember} = this.state;
            SecureStore.setItemAsync(
                'userInfo', 
                JSON.stringify({username, password, remember})
            ).catch((err) => console.log('Could not save user info', err));
        } else {
            SecureStore.deleteItemAsync('userInfo')
                .catch((err) => console.log('Could not delete user info', err));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Input 
                    placeholder="Username"
                    leftIcon={{type: 'font-awesome', name: 'user-o'}}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input 
                    placeholder="Password"
                    leftIcon={{type: 'font-awesome', name: 'key'}}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <CheckBox
                    title="Remember Me"
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    center
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={this.handleLogin}
                        title="Login"
                        color="#512DA8"
                    />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formInput: {
        marginVertical: 40,
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null,
    },
    formButton: {
        margin: 60,
    }
});

export default Login;