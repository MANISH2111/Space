import React from 'react';
import { ScrollView, StyleSheet, Image, Text, View } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';

import { MainStackParamList } from '../navigation';
import type { RouteProp } from '@react-navigation/native';
import { FlexCol, FlexRow, Gutter } from '../components/atom';

type Props = {
	route: RouteProp<MainStackParamList, 'Details'>;
};

const Wrapper = styled(FlexCol)`
	padding: 15px;
	flex: 1;
	background-color: #ffffff;
`;
const CText = styled(Text)<{
	fSize?: number;
	fWeight?: string;
	color?: string;
	align?: string;
}>`
	font-size: ${(props) => (props.fSize ? `${props.fSize}px` : `14px`)};
	font-weight: ${(props) => (props.fWeight ? `${props.fWeight}` : `normal`)};
	color: ${(props) => (props.color ? `${props.color}` : `black`)};
	text-align: ${(props) => (props.align ? props.align : `left`)};
`;
const Container = styled(View)`
	padding: 8px;
	border-radius: 8px;
	border: 1px solid #e5e2e2;
	margin: 3px;
`;

const Details: React.ComponentType<Props> = ({ route }) => {
	const {
		mission_name,
		launch_site,
		details,
		date,
		rocket,
		image,
		launch_success,
	}: any = route.params;

	return (
		<ScrollView
			contentContainerStyle={styles.view}
			showsVerticalScrollIndicator={false}
		>
			<Wrapper>
				{image && (
					<Image style={styles.image} source={{ uri: image }} />
				)}
				<Gutter />

				<CText align="center" fSize={20}>
					{mission_name}
				</CText>

				<Gutter spacing={0.2} />

				<CText align="center" fSize={20} color="gray">
					{moment(date).format('LL')}
				</CText>

				<Gutter spacing={2} />

				<Container>
					<FlexRow justifyContent={'space-between'}>
						<FlexCol>
							<CText fWeight="bold">Launch Site</CText>
							<CText fSize={15}>
								Name
								<Gutter hSpacing={2} />
								<CText fSize={13} color="grey">
									{launch_site.site_name}
								</CText>
							</CText>
							<CText fSize={15}>
								Location
								<Gutter hSpacing={1} />
								<CText fSize={13} color="grey" align="center">
									{launch_site.site_name_long}
								</CText>
							</CText>
						</FlexCol>
					</FlexRow>
				</Container>

				<Gutter />

				<Container>
					<FlexRow justifyContent={'space-between'}>
						<FlexCol>
							<CText fWeight="bold">Launch Status</CText>
							<CText fSize={15}>
								Success
								<Gutter hSpacing={1} />
								<CText fSize={13} color="grey">
									{launch_success ? 'Success' : 'Failure'}
								</CText>
							</CText>
						</FlexCol>
					</FlexRow>
				</Container>

				<Gutter />

				<Container>
					<FlexRow justifyContent={'space-between'}>
						<FlexCol>
							<CText fWeight="bold">Rocket</CText>
							<CText fSize={15}>
								Name
								<Gutter hSpacing={2} />
								<CText fSize={13} color="grey">
									{rocket.rocket_name}
								</CText>
							</CText>

							<CText fSize={15}>
								Type
								<Gutter hSpacing={2.4} />
								<CText fSize={13} color="grey">
									{rocket.rocket_type}
								</CText>
							</CText>
						</FlexCol>
					</FlexRow>
				</Container>

				<Gutter />

				<Container>
					<FlexRow justifyContent={'space-between'}>
						<FlexCol>
							<CText fWeight="bold">Details</CText>

							<Gutter />

							<CText fSize={13} color="grey">
								{details}
							</CText>
						</FlexCol>
					</FlexRow>
				</Container>

				<Gutter spacing={1} />
			</Wrapper>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	view: {
		scrollView: { flexGrow: 1 },
		justifyContent: 'center',
		alignItems: 'center',
		flex1: { flex: 1 },
	},
	image: {
		width: 250,
		height: 250,
		alignSelf: 'center',
		aspectRatio: 1,
	},
});
export { Details };
