import React from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
	isSelected?: Boolean;
	onPress?: () => void;
	name: String;
};

const Select = styled(TouchableOpacity)<{ isSelected?: Boolean }>`
	width: 100px;
	height: 36px;
	border: ${(props) =>
		props.isSelected ? '1.3px solid black' : '1px solid grey'};
	text-align: center;
	justify-content: center;
	border-radius: 18px;
	margin-top: 8px;
	margin-right: 10px;
`;

const CText = styled(Text)<{ isSelected?: Boolean }>`
	font-size: 13px;
	font-weight: ${(props) => (props.isSelected ? 600 : 'normal')};
	text-align: center;
	color: ${(props) => (props.isSelected ? 'black' : 'darkgray')};
`;
const FilterButton: React.ComponentType<Props> = ({
	isSelected,
	onPress,
	name,
}) => {
	return (
		<Select onPress={onPress} isSelected={isSelected}>
			<CText isSelected={isSelected}>{name}</CText>
		</Select>
	);
};

export { FilterButton };
