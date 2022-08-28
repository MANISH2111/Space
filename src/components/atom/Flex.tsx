import React from 'react';
import { FlexStyle, StyleSheet, View } from 'react-native';

export const FlexRow: React.ComponentType<FlexStyle & { style?: any;children :any }> = ({
	children,
	style = {},
	...rest
}) => {
	return (
		<View style={[styles.flex, styles.row, rest, style]}>{children}</View>
	);
};

export const FlexCol: React.ComponentType<FlexStyle & { style?: any,children: any }> = ({
	children,
	style,
	...rest
}) => {
	return <View style={[styles.flex, rest, style]}>{children}</View>;
};

const styles = StyleSheet.create({
	flex: {
		display: 'flex',
	},
	row: {
		flexDirection: 'row',
	},
});