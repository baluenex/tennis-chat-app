import React from 'react'
import { Amplify } from 'aws-amplify'
import './App.css';
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';
import awsExports from "./aws-exports";
import { Tabs, TabItem, View } from '@aws-amplify/ui-react';
import Profile from './components/Profile';

Amplify.configure(awsExports);

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <View>
          <Tabs>
            <TabItem title="Chat">
              Chat
              <p>{user.username}</p>
            </TabItem>
            <TabItem title="Search">
              Search
            </TabItem>
            <TabItem title="Profile">
              <Profile id={user.username} email={user.attributes.email}/>
            </TabItem>
          </Tabs>
        </View>
      )}
    </Authenticator>
  );
}

export default App;
