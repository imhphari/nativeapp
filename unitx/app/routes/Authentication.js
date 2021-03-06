import React, {Component} from 'react';
import {
	AsyncStorage,
	Alert,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

class Authentication extends Component {

	constructor(){
		super();
		this.state = {
			username: null,
			password: null
		}
	}

	async onValueChange(item, selectedValue) {
		try {
			await AsyncStorage.setItem(item, selectedValue);
		} catch (error) {
			console.log('AsyncStorage error: ' + error.message);
		}
	}

	userSignup() {
		if (this.state.username && this.state.password) {
			// TODO: localhost doesn't work. Get the IP address with ifconfig.
			fetch("http://192.168.0.100:3001/users", {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: this.state.username,
					password: this.state.password,
				})
			})
			.then((response) => response.json())
			.then((responseData) => {
				this.onValueChange('id_token', responseData.id_token),
				Alert.alert(
					"Signup Success!",
					"Welcome to UnitX"
				),
				Actions.HomePage();
			})
			.done();
		}
	}

	userLogin() {
		if (this.state.username && this.state.password) {
			// TODO: localhost doesn't work. Get the IP address with ifconfig.
			fetch("http://192.168.0.100:3001/sessions/create", {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: this.state.username,
					password: this.state.password,
				})
			})
			.then((response) => response.json())
			.then((responseData) => {
				this.onValueChange('id_token', responseData.id_token),
				Alert.alert(
					"Login Success!",
					"Welcome to UnitX"
				),
				Actions.HomePage();
			})
			.done();
		}
    }
    
   /* go=()=>{
        if(this.state.email==""){
          alert("Email should not be empty")
        }
        else if(this.state.password=="svce"){
          this.setState({login:true})
          this.props.navigation.navigate("Boiler");
        }
        else{
          alert("Incorrect Password")
        }
      }
      */
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>
					Welcome
				</Text>
				<View style={styles.form}>
					<TextInput
						editable={true}
						onChangeText={(username) => this.setState({username})}
						placeholder='Username'
						placeholderTextColor="rgba(255,255,255,0.7)"
						ref='username'
						returnKeyType='next'
						style={styles.inputText}
						value={this.state.username}
						/>
					<TextInput
						editable={true}
						onChangeText={(password) => this.setState({password})}
						placeholder='Password'
						placeholderTextColor="rgba(255,255,255,0.7)"
						ref='password'
						returnKeyType='next'
						secureTextEntry={true}
						style={styles.inputText}
						value={this.state.password}
						/>
					<TouchableOpacity
						style={styles.buttonWrapper}
						onPress={this.userLogin.bind(this)}
						>
						<Text style={styles.buttonText}>
							Log In
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.buttonWrapper}
						onPress={this.userSignup.bind(this)}
						>
						<Text style={styles.buttonText}>
							Sign Up
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default Authentication;