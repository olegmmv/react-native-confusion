import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert} from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guest: 1,
            smoking: false,
            date: '',
        }

        this.handleReservation = this.handleReservation.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.obtainNotificationPermission = this.obtainNotificationPermission.bind(this);
        this.presentLocalNotification = this.presentLocalNotification   .bind(this);
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }

    resetForm() {
        this.setState({
            guest: 1,
            smoking: false,
            date: '',
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.NOTIFICATIONS);

        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);

            if (permission.status !== 'granted') {
                Alert.alert('Permission is not granted to show notifications');
            }
        }

        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your reservation',
            body: `Reservation for ${date} requested`,
            ios: {
                sound: true,
                vibrate: true,
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8',
            }
        })
    }

    handleReservation() {
        Alert.alert(
            'Your Reservation OK?',
            `Number of Guests: ${this.state.guest}\n` +
            `Smoking?: ${this.state.smoking ? 'Yes' : 'No'}\n` + 
            `Date and Time: ${this.state.date}`,
            [
                {
                    text: 'Cancel',
                    onPress: this.resetForm,
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        this.presentLocalNotification(this.state.date);
                        this.resetForm();
                    }
                }
            ],
            {cancelable: false}
        )
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker 
                            style={styles.formItem} 
                            selectedValue={this.state.guest}
                            onValueChange={(value) => this.setState({guest: value})}
                        >
                            {['1', '2', '3', '4', '5', '6'].map(el => {
                                return <Picker.Item label={el} value={el} />;
                            })}
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            trackColor="512DA8"
                            onValueChange={(value) => this.setState({smoking: value})}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <DatePicker
                            style={{flex: 2, marginRight: 20}}
                            date={this.state.date}
                            format=""
                            mode="datetime"
                            placeholder="Select date and time"
                            minDate={new Date().toISOString().slice(0,10)}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    marginLeft: 36,
                                }
                            }}
                            onDateChange={(date) => this.setState({date})}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button 
                            title="Reserve" 
                            color="#512DA8"
                            onPress={this.handleReservation}
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </Animatable.View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20,
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1,
    },
});

export default Reservation;