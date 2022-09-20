import moment from 'moment';
import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { FlexCol, FlexRow } from '../../../components/atom';
import { navigate } from '../../../services';

const SuccessWrapper = styled(View)<{ isSuccess: boolean }>`
	position: absolute;
	top: 0;
	right: 0;
	width: 50px;
	height: 15px;
	opacity: 0.9;
	background-color: ${(props) => (props.isSuccess ? '#cff3cf' : '#fbdada')};
	border-bottom-left-radius: 8px;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
`;
const SuccessText = styled(Text)<{ isSuccess: boolean }>`
	font-weight: bold;
	font-size: 10px;
	color: ${(props) => (props.isSuccess ? '#085a07' : '#830505')};
	text-align: center;
`;
const CText = styled(Text)`
	color: grey;
	font-size: 12px;
`;

const NText = styled(Text)`
	font-size: 13px;
	font-weight: bold;
	padding-left: 10px;
	color: #6b6b6b;
`;

const SpaceCard = ({ item }: any) => (
	<FlexCol alignSelf="center">
		<TouchableOpacity
			onPress={() =>/* kya hai yea tatti ???*/
				navigate('Details', {
					mission_name: item.mission_name,
					launch_site: item.launch_site,
					details: item.details,
					date: item.launch_date_utc,
					rocket: item.rocket,
					image: item.links.mission_patch_small,
					success: item.launch_success,
				})
			}
			style={styles.item}
		>
			<Image
				style={styles.image}
				source={{ uri: item.links.mission_patch_small }}
			/>

			<SuccessWrapper isSuccess={item.launch_success}>
				<SuccessText isSuccess={item.launch_success}>
					{item.launch_success ? 'Success' : 'Failed'}
				</SuccessText>
			</SuccessWrapper>
		</TouchableOpacity>

		<NText>{item.mission_name}</NText>
		<NText>{item.rocket.rocket_name}</NText>

		<FlexRow justifyContent="space-around">
			<CText>{item.upcoming ? 'upcoming' : 'completed'}</CText>
			<CText>{moment(item.launch_date_utc).format('MMM D, YYYY')}</CText>
		</FlexRow>
	</FlexCol>
);

const styles = StyleSheet.create({
	item: {
		position: 'relative',
		backgroundColor: '#f1f7f8fe',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 11,
		marginHorizontal: 8,
		width: 150,
		height: 150,
		borderRadius: 8,
	},
	image: {
		width: 120,
		height: 120,
	},
});

export { SpaceCard };
