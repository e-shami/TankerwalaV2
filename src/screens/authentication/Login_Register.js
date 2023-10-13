import React, {useState} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import {Text, TextInput, Checkbox, Button} from 'react-native-paper';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {CustomAlert} from '../../components/CustomAlert';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ButtonPrimary, ButtonSecondary} from '../../components';
import {auth, firestoreDB, signinWithGoogle} from '../../../backend/Firebase';

const window = Dimensions.get('window');
const screen = {
  height: window.height,
  width: window.width,
};

function Login_Register({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  // these are added to acheive register in page functionality
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoginMode, setLoginMode] = useState(true);

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const signInUser = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('login successful');
      console.log(email);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  // the logic for registering a user is added here

  const registerUser = async (fullName, email, password, phoneNumber) => {
    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password);

      // Store additional user data in Firestore
      await firestoreDB.collection('users').doc(user.uid).set({
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
      });
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const validateErrors = () => {
    const validationErrors = {};

    if (email.trim() === '') validationErrors.email = 'Email field is required';

    if (password.trim() === '')
      validationErrors.password = 'Password field is required';

    return validationErrors;
  };

  const handleInputChange = (inputName, value) => {
    if (errors[inputName]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [inputName]: '',
      }));
    }

    switch (inputName) {
      case 'fullName':
        setFullName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleRegister = () => {
    const validationErrors = validateErrors();
    if (fullName.trim() === '')
      validationErrors.fullName = 'Full Name field is required';

    if (phoneNumber.trim() === '')
      validationErrors.phoneNumber = 'Phone number field is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    registerUser(fullName, email, password, phoneNumber)
      .then(() => {
        showMessage({
          message: 'Registration Successful',
          type: 'success',
          icon: 'success',
          animated: true,
          hideOnPress: true,
        });
      })
      .then(() => {
        setIsAlertVisible(false);
      })
      .catch(error => {
        setIsAlertVisible(true);
        setErrorMessage(error.message);
      });
  };

  const handleSignIn = () => {
    const validationErrors = validateErrors();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log(validationErrors.email);
      return;
    }

    signInUser()
      .then(() => {
        showMessage({
          message: 'Login Successful',
          type: 'success',
          icon: 'success',
          animated: true,
          hideOnPress: true,
        });
      })
      .then(() => {
        setIsAlertVisible(false);
      })
      .catch(error => {
        setIsAlertVisible(true);
        setErrorMessage('Login failed: ' + error.message);
      })
      .finally(() => {
        setEmail('');
        setPassword('');
      });
  };


  const handleGoogleSignIn = () => {
    signinWithGoogle().then(() => {
      showMessage({
        message: 'Login Successful',
        type: 'success',
        icon: 'success',
        animated: true,
        hideOnPress: true,
      });
    }).catch(error => {
      setIsAlertVisible(true);
      setErrorMessage('Login failed: ' + error.message);
    });
  }

  return (
    <LinearGradient
      colors={[
        'rgba(181, 224, 244, 0.6)',
        'rgba(120, 170, 220, 0.8)',
        'rgba(30, 90, 180, 1)',
      ]}
      style={[styles.background]}>
      <View style={styles.outerContainer}>
        <View style={[styles.innerContainer, {alignItems: 'center'}]}>
          <View>
            <Image
              source={require('../../assets/images/logo.png')}
              style={{width: 220, height: 220, marginBottom: 10}}
            />
            <Text
              variant="displaySmall"
              style={{
                textAlign: 'center',
                marginBottom: isLoginMode ? 10 : 18,
                color: 'white',
              }}>
              {isLoginMode ? 'Sign in' : 'Register'}
            </Text>
          </View>

          <View
            style={[
              styles.inputContainer,
              {width: '100%', height: isLoginMode ? 'auto' : 350},
            ]}>
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="handled"
              style={{width: '100%'}}>
              {!isLoginMode ? (
                <>
                  <TextInput
                    style={styles.inputFields}
                    mode="outlined"
                    label="Full Name"
                    value={fullName}
                    maxLength={32}
                    onChangeText={text => handleInputChange('fullName', text)}
                    error={!!errors.fullName}
                    left={
                      <TextInput.Icon
                        icon="account"
                        size={25}
                        style={{marginRight: 10, paddingTop: 8}}
                      />
                    }
                    autoCapitalize="words"
                    autoCompleteType="name"
                    textContentType="name"
                    returnKeyType="next"
                  />
                  {errors.fullName && (
                    <Text
                      style={{
                        color: 'red',
                        marginTop: 5,
                      }}>
                      {errors.fullName}
                    </Text>
                  )}
                </>
              ) : null}

              <TextInput
                style={styles.inputFields}
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={text => handleInputChange('email', text)}
                error={!!errors.email}
                left={
                  <TextInput.Icon
                    icon="email"
                    size={23}
                    style={{marginRight: 10, paddingTop: 8}}
                  />
                }
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoCompleteType="email"
                returnKeyType="next"
              />
              {errors.email && (
                <Text
                  style={{
                    color: 'red',
                    marginTop: 5,
                  }}>
                  {errors.email}
                </Text>
              )}

              {isLoginMode ? null : (
                <View>
                  <View
                    style={[
                      styles.row,
                      {marginTop: 25, justifyContent: 'space-between'},
                    ]}>
                    <Text
                      variant="titleMedium"
                      style={{textAlign: 'center', color: 'white'}}>
                      +92
                    </Text>

                    <TextInput
                      style={[styles.inputFields, {width: '88%', marginTop: 0}]}
                      mode="outlined"
                      label="Phone Number"
                      value={phoneNumber}
                      maxLength={10}
                      onChangeText={text =>
                        handleInputChange('phoneNumber', text)
                      }
                      error={!!errors.phoneNumber}
                      left={
                        <TextInput.Icon
                          icon="phone"
                          size={23}
                          style={{marginRight: 10, paddingTop: 8}}
                        />
                      }
                      keyboardType="phone-pad"
                      textContentType="telephoneNumber"
                      autoCompleteType="tel"
                      returnKeyType="next"
                    />
                  </View>
                  {errors.phoneNumber && (
                    <Text
                      style={{
                        color: 'red',
                        marginTop: 5,
                      }}>
                      {errors.phoneNumber}
                    </Text>
                  )}
                </View>
              )}
              <TextInput
                style={styles.inputFields}
                mode="outlined"
                label="Password"
                value={password}
                onChangeText={text => handleInputChange('password', text)}
                error={!!errors.password}
                secureTextEntry={!isPasswordVisible}
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? 'eye-off' : 'eye'}
                    size={23}
                    style={{marginRight: 10, paddingTop: 8}}
                    onPress={togglePasswordVisibility}
                  />
                }
                left={
                  <TextInput.Icon
                    icon="lock"
                    size={23}
                    style={{marginRight: 10, paddingTop: 8}}
                  />
                }
                textContentType="password"
                autoCompleteType="password"
                returnKeyType="done"
              />
              {errors.password && (
                <Text
                  style={{
                    color: 'red',
                    marginTop: 5,
                    fontSize: 16,
                  }}>
                  {errors.password}
                </Text>
              )}
            </KeyboardAwareScrollView>
          </View>
        </View>

        <View style={[styles.innerContainer]}>
          {isLoginMode ? (
            <View
              style={[
                styles.row,
                {justifyContent: 'space-between', marginVertical: 10},
              ]}>
              <Checkbox.Item
                label="Remember me!"
                style={{paddingLeft: -5}}
                labelVariant="bodySmall"
                position="leading"
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
              />

              <ButtonSecondary text="Forgot Password?" handlePress={() => {}} />
            </View>
          ) : null}
        </View>

        <View
          style={[styles.innerContainer, {marginTop: !isLoginMode ? 10 : 0}]}>
          <ButtonPrimary
            text={isLoginMode ? 'Login' : 'Register'}
            handlePress={isLoginMode ? handleSignIn : handleRegister}
          />
        </View>

        <View style={[styles.innerContainer, {marginVertical: 10}]}>
          {isLoginMode ? (
            <View>
              <View
                style={[
                  styles.row,
                  {alignItems: 'center', marginTop: 25, marginBottom: 40},
                ]}>
                <View style={styles.line} />
                <Text
                  variant="headlineSmall"
                  style={{
                    textAlign: 'center',
                    marginHorizontal: 5,
                    color: 'white',
                  }}>
                  {isLoginMode ? 'Or' : ''}
                </Text>
                <View style={styles.line} />
              </View>
              <ButtonPrimary
                text="Sign in with Google"
                handlePress={handleGoogleSignIn}
              />
            </View>
          ) : null}

          <View
            style={[
              styles.row,
              {
                justifyContent: 'flex-end',
                marginTop: 10,
                alignItems: 'baseline',
              },
            ]}>
            <Text
              variant="titleSmall"
              style={{
                textAlign: 'center',
                marginTop: 15,
                color: '#C2C2C2',
                marginRight: 5,
              }}>
              {isLoginMode
                ? 'Don’t have an account?'
                : 'Already have an account?'}
            </Text>

            <ButtonSecondary
              text={isLoginMode ? 'Register' : 'Login'}
              handlePress={() => {
                setLoginMode(!isLoginMode);
              }}
            />
          </View>
          {isAlertVisible && (
            <CustomAlert
              message={errorMessage}
              />
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerContainer: {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '100%',
  },

  innerContainer: {
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',

    width: '95%',
  },

  inputFields: {
    marginTop: 20,
    height: 50,
    backgroundColor: '#F4F1F1',
    fontSize: 17,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  line: {
    borderBottomColor: '#C2C2C2',
    borderBottomWidth: 2,
    width: '45%',
    opacity: 0.8,
  },

  boxingAround: {
    padding: 2,
    paddingHorizontal: 7,
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#55ffd6',
  },
});

export default Login_Register;
