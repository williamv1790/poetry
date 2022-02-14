import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

export function Loading() {
  return (
    <ActivityIndicator animating={true} size="large" children={undefined} />
  );
}

export default Loading;
