import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

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
import AdminHomeScreen from './screens/admin/AdminHome';
import NotificationsScreen from './screens/user/Notifications';
import AdminMatchesScreen from './screens/admin/AdminMatches';
import AdminRankingsScreen from './screens/admin/AdminRankings';
import AdminUsersScreen from './screens/admin/AdminUsers';
import UpdateMatchScreen from './screens/admin/UpdateMatch';
import UpdatePlayerScreen from './screens/admin/UpdatePlayer';
import ScheduleMatchScreen from './screens/admin/ScheduleMatch';
import LiveScoreMarkScreen from './screens/user/LiveScoreMark';
import CreateNewsScreen from './screens/admin/CreateNews';
import SummaryScreen from './screens/user/Summary';
import ManageTeamsScreen from './screens/admin/ManageTeams';

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
  'screens/admin/AdminHome': undefined;
  'screens/user/Notifications': undefined;
  'screens/admin/AdminMatches': undefined;
  'screens/admin/AdminRankings': undefined;
  'screens/admin/AdminUsers': undefined;
  'screens/admin/UpdateMatch': { route: RouteProp<RootStackParamList, 'screens/admin/UpdateMatch'>; matchId: string };
  'screens/admin/UpdatePlayer': undefined;
  'screens/admin/ScheduleMatch': undefined;
  'screens/user/LiveScoreMark': { matchId: string };
  'screens/admin/CreateNews': undefined;
  'screens/user/Summary': { matchId: string };
  'screens/admin/ManageTeams': undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="screens/authentication/Login">
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
      <Stack.Screen name="screens/admin/AdminHome" component={AdminHomeScreen} />
      <Stack.Screen name="screens/user/Notifications" component={NotificationsScreen} />
      <Stack.Screen name="screens/admin/AdminMatches" component={AdminMatchesScreen} />
      <Stack.Screen name="screens/admin/AdminRankings" component={AdminRankingsScreen} />
      <Stack.Screen name="screens/admin/AdminUsers" component={AdminUsersScreen} />
      <Stack.Screen name="screens/admin/UpdateMatch" component={UpdateMatchScreen} />
      <Stack.Screen name="screens/admin/UpdatePlayer" component={UpdatePlayerScreen} />
      <Stack.Screen name="screens/admin/ScheduleMatch" component={ScheduleMatchScreen} />
      <Stack.Screen name="screens/user/LiveScoreMark" component={LiveScoreMarkScreen} />
      <Stack.Screen name="screens/admin/CreateNews" component={CreateNewsScreen} />
      <Stack.Screen name="screens/user/Summary" component={SummaryScreen} />
      <Stack.Screen name="screens/admin/ManageTeams" component={ManageTeamsScreen} />
    </Stack.Navigator>
  );
}
