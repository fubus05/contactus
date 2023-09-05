import axios from 'axios';
import { Formik } from 'formik';
import { Button, Checkbox, Input, Select, Stack } from 'native-base';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import base64 from 'base-64';

const formSchema = Yup.object().shape({
  fullName: Yup.string().required("This is a mandatory field"),
  email: Yup.string().email('Invalid email').required('This is a mandatory field'),
  city: Yup.string().required("City is required"),
  phoneNumber: Yup.number()
  .required("Phone number is required")
  .typeError("Phone number must be a number") // Display a custom error message for non-numeric input
  .test(
    "is-ten-digits",
    "Phone number must be a 10-digit number",
    (value) => value.toString().length >= 10 // Check if the number has exactly 10 digits
  ),
  agree: Yup.boolean().oneOf([true], 'You must agree to the terms of use and privacy policy'),
})

const citiesApiUrl = 'https://johnny-dev-env-2023.flowforge.cloud/get-cities-list';
const setApi = 'https://johnny-dev-env-2023.flowforge.cloud/set-form-data-reacttest'
const username = 'ReactTest';
const password = 'IRB56idbf#O&83@gY';
const basicAuth = 'Basic ' + base64.encode(username + ':' + password);


const Main = ({navigation}: any): JSX.Element => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch(citiesApiUrl, {
      headers: {
        Authorization: basicAuth,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((data) => {
        setCities(data.cities)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post(setApi, values, {
        headers: {
          Authorization: basicAuth,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        navigation.navigate('SuccessScreen');
      } else {
        throw new Error('Failed to send data');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave details</Text>
      <Formik
            initialValues={{ 
              city: '',
              email: '',
              phoneNumber: '',
              fullName: '',
              agree: false
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
        >
            {({ values, handleChange, handleSubmit, touched, errors, setFieldValue }) => (
                <Stack space={4} w="95%" maxW="330px" mx="auto"> 
            <Input
              size="sm"
              placeholder="Full Name"
              onChangeText={handleChange('fullName')}
              value={values.fullName}
            />
            {touched.fullName && errors.fullName && <Text style={styles.error_message}>{errors.fullName}</Text>}

            <Input
              size="sm"
              placeholder="Phone number"
              onChangeText={handleChange('phoneNumber')}
              value={values.phoneNumber}
            />
            {touched.phoneNumber && errors.phoneNumber && <Text style={styles.error_message}>{errors.phoneNumber}</Text>}

            <Input
              size="sm"
              placeholder="Email"
              onChangeText={handleChange('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.error_message}>{errors.email}</Text>}

                  <Select
                      placeholder="City"
                      selectedValue={values.city}
                      onValueChange={handleChange('city')}
                      size='10'
                      >
                        {cities.map((city, index) => (
                            <Select.Item key={index} label={city} value={city} />
                        ))}
                  </Select>
                  {touched.city && errors.city && <Text style={styles.error_message}>{errors.city}</Text>}
                  
                  <Checkbox 
                    isChecked={values.agree} 
                    onChange={() => setFieldValue('agree', !values.agree)}
                    value='privacy policy' _text={{ fontSize: 15 }} colorScheme="yellow">
                    I agree to Johnny Tec terms of use & privacy policy
                  </Checkbox>
                  {touched.agree && errors.agree && <Text style={styles.error_message}>{errors.agree}</Text>}

                  <Button size="sm" style={{ backgroundColor: '#ECCC48' }} _text={{color: 'black', fontSize: 20}} onPress={() => handleSubmit()}>Send</Button>
                </Stack>
            )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  title: {
    fontFamily: 'Montserrat Regular', 
    fontSize: 22, 
    marginBottom: 30,
    color: 'black'
  },
  error_message: {
    color: 'red', 
    fontSize: 10 
  }
})

export default Main;