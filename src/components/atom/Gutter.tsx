import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
	spacing?: number;
	hSpacing?: number;
};

export const Gutter = ({ spacing = 1, hSpacing = 0 }: Props) => {
	const styles = useMemo(
		() =>
			StyleSheet.create({
				gutter: {
					height: 16 * spacing,
					width: 16 * hSpacing,
				},
			}),
		[spacing, hSpacing],
	);

	return <View style={styles.gutter} />;
};
