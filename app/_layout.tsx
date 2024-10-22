import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserHomeScreen from './screens/user/UserHome';
import MatchesScreen from './screens/user/Matches';
import NewsScreen from './screens/user/News';
import RankingsScreen from './screens/user/Rankings';
import UpdateAccountScreen from './screens/user/UpdateAccount';
import CreateNewPasswordScreen from './screens/authentication/CreateNewPassword';
import ForgotPasswordScreen from './screens/authentication/ForgotPassword';
import LoginScreen from './screens/authentication/Login';
import PasswordResetSuccessScreen from './screens/authentication/PasswordResetSuccess';
import RegisterScreen from './screens/authentication/Register';
import VerifyAccountScreen from './screens/authentication/VerifyAccount';

type Team = {
  name: string;
  logo: string;
  players: string[];
  stats: {
    wins: number;
    losses: number;
    ties: number;
  };
};

type RootStackParamList = {
  'screens/user/UserHome': undefined;
  'screens/user/Matches': undefined;
  'screens/user/News': undefined;
  'screens/user/Rankings': undefined;
  'screens/user/UpdateAccount': undefined;
  'screens/authentication/CreateNewPassword': undefined;
  'screens/authentication/ForgotPassword': undefined;
  'screens/authentication/Login': undefined;
  'screens/authentication/PasswordResetSuccess': undefined;
  'screens/authentication/Register': undefined;
  'screens/authentication/VerifyAccount': undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="screens/user/UserHome">
      <Stack.Screen name="screens/user/UserHome" component={UserHomeScreen} />
      <Stack.Screen name="screens/user/Matches" component={MatchesScreen} />
      <Stack.Screen name="screens/user/News" component={NewsScreen} />
      <Stack.Screen name="screens/user/Rankings" component={RankingsScreen} />
      <Stack.Screen name="screens/user/UpdateAccount" component={UpdateAccountScreen} />
      <Stack.Screen name="screens/authentication/CreateNewPassword" component={CreateNewPasswordScreen} />
      <Stack.Screen name="screens/authentication/ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="screens/authentication/Login" component={LoginScreen} />
      <Stack.Screen name="screens/authentication/PasswordResetSuccess" component={PasswordResetSuccessScreen} />
      <Stack.Screen name="screens/authentication/Register" component={RegisterScreen} />
      <Stack.Screen name="screens/authentication/VerifyAccount" component={VerifyAccountScreen} />
    </Stack.Navigator>
  );
}
