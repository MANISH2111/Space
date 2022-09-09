import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { MainStackParamList } from '../navigation';

export type RouteNames = keyof MainStackParamList;

// @ts-ignore
export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate<T extends Record<any, any>>(
	name: RouteNames,
	params?: T,
) {
	navigationRef.current?.navigate(name, params);
}
export function goBack() {
	navigationRef.current?.canGoBack() && navigationRef.current?.goBack();
}

export function canGoBack() {
	return navigationRef.current?.canGoBack();
}
