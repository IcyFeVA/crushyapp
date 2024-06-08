
import { Text, Button } from 'react-native-ui-lib';
import { styled } from 'nativewind';

const PrimaryButton = styled(Button, 'w-full h-12 rounded-lg justify-center bg-primary-600');
const PrimaryButtonText = styled(Text, 'uppercase text-center text-white font-bold');

const SecondaryButton = styled(Button, 'w-full h-12 rounded-lg justify-center bg-white border border-primary-500');
const SecondaryButtonText = styled(Text, 'uppercase text-center text-primary-700 font-bold');


export { PrimaryButton, PrimaryButtonText, SecondaryButton, SecondaryButtonText }