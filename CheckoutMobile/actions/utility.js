import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  centerText: {
    textAlign: 'center',
  },
  formButton: {
    flex: 1,
    justifyContent: 'center',
  },
});

// takes in a qr code string and formats it for a request
export const formatQrString = qr => {
  const arr = qr.split('_').filter(Boolean);
  return {
    student: arr[0],
    assignment: arr[1],
  };
};
