// lib/streamChat.ts

import { StreamChat } from 'stream-chat';

export const chatClient = StreamChat.getInstance('pcvjbntz7tfy');

export const connectUser = async (user: { id: string; name: string }, token: string) => {
  try {
    await chatClient.connectUser(user, token);
    console.log('User connected successfully');
  } catch (error) {
    console.error('Error connecting user to Stream:', error);
    throw error;
  }
};

export const disconnectUser = async () => {
  try {
    await chatClient.disconnectUser();
    console.log('User disconnected successfully');
  } catch (error) {
    console.error('Error disconnecting user from Stream:', error);
  }
};

export const createChannel = async (channelId: string, members: string[]) => {
  try {
    const channel = chatClient.channel('messaging', channelId, {
      members,
    });
    await channel.create();
    return channel;
  } catch (error) {
    console.error('Error creating channel:', error);
    throw error;
  }
};