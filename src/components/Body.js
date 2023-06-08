import React from 'react';
import { Tabs, TabItem, View } from '@aws-amplify/ui-react';


class Body extends React.Component {
  render() {
    return (
      <View>
        <Tabs>
          <TabItem title="Chat">
            Chat
          </TabItem>
          <TabItem title="Search">
            Search
          </TabItem>
          <TabItem title="Profile">
            Profile
          </TabItem>
        </Tabs>
      </View>
    );
  }
}

export default Body;