import React from 'react';
import { View } from 'react-native';
import { Divider , Card, Title, Paragraph } from 'react-native-paper';

const SocialCard = ({AllPost}) => (
    <View>
    {AllPost.map(Post => (
        <View key={Post._id}>
            <Card>
            <Card.Content>
                <Title>{posts.userId}</Title>
                <Paragraph>{posts.PostMessage}</Paragraph>
            </Card.Content>
            </Card>
        </View> 
    ))}
    </View>
  );
  
  export default SocialCard;