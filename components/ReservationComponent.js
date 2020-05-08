import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal} from 'react-native';
import {Card} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guest: 1,
            smoking: false,
            date: '',
            showModal: false,
        }

        this.handleReservation = this.handleReservation.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal})
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            guest: 1,
            smoking: false,
            date: '',
        });
    }

    render() {
        return (
            <ScrollView>
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
                        toggleModal="512DA8"
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
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {
                        // this.toggleModal();
                        this.resetForm();
                    }}
                    onRequestClose={() => {
                        this.toggleModal();
                        this.resetForm();
                    }}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number of Guests: {this.state.guest}</Text>
                        <Text style={styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>Date and Time: {this.state.date}</Text>
                        <Button 
                            onPress={() => {
                                this.toggleModal(); 
                                this.resetForm();
                            }}
                            color="#512DA8"
                            title="Close"
                        />  
                    </View>
                </Modal>
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
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20,
    },
    modalText: {
        fontSize: 18,
        margin: 10,
    }
});

export default Reservation;