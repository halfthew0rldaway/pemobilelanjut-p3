import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { Product } from './product';

export type RootStackParamList = {
  Home: undefined;
  Detail: { product: Product };
  Checkout: { product: Product; quantity: number };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;
export type CheckoutScreenProps = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

