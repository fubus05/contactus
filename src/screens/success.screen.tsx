import { Button } from 'native-base';
import {Pressable, View, Text, StyleSheet} from 'react-native';

const Success = ({navigation}: any): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>The form has been sent successfully</Text>
      <Text style={styles.sub_title}>An answer returned from the transmission of the form</Text>
      <Button w={'100%'} maxW={300} style={{ backgroundColor: '#ECCC48',  }} _text={{color: 'black', fontSize: 20}} onPress={() => navigation.navigate('MainScreen')}>Send again</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Montserrat Regular', 
    fontSize: 25, 
    color: 'black',
    alignItems: 'center'
  },
  sub_title: {
    fontSize: 20,
    color: 'grey',
    marginTop: 10,
    marginBottom: 30,
    maxWidth: 300
  }
})

export default Success;