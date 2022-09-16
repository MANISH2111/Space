import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import styled from 'styled-components/native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import BottomSheet, {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { StackNavigationProp } from '@react-navigation/stack';
import Spinner from 'react-native-loading-spinner-overlay';

import { FlexCol, FlexRow } from '../../components/atom/Flex';
import { useAppSelector } from '../../hooks';
import { getLaunches, sortLaunches } from '../../store/actions';
import { MainStackParamList } from '../../navigation';
import { SpaceCard } from './component/SpaceCard';
import { Gutter } from '../../components/atom';
import { SORT_DATA } from '../../data';
import { AllFilter } from './component/filter';
import { useDispatch } from 'react-redux';

const CText = styled(Text)<{ isSelected?: Boolean }>`
	font-size: 13px;
	color: ${(props) => (props.isSelected ? 'black' : 'grey')};
	text-align: center;
	font-weight: bold;
`;

const NText = styled(Text)<{
	fSize?: number;
	fWeight?: string;
	align?: string;
	mLeft?: string;
}>`
	font-size: ${(props) => (props.fSize ? `${props.fSize}px` : `14px`)};
	font-weight: ${(props) => (props.fWeight ? `${props.fWeight}` : `normal`)};
	text-align: ${(props) => (props.align ? props.align : `center`)};
	margin-left: ${(props) => (props.mLeft ? `${props.mLeft}px` : 0)};
`;

type Props = {
	navigation: StackNavigationProp<MainStackParamList, 'SpaceX_Launches'>;
};
type Sort = {
	sort?: String;
};

const Home: React.ComponentType<Props> = ({ navigation }) => {
	const dispatch = useDispatch();

	const data = useAppSelector((state) => state.launch.filteredLaunch);
	const dataFil = useAppSelector((state) => state.launch.launches);
	const loading = useAppSelector((state) => state.launch.loading);

	const rocketData = (dataFil: { rocket: { rocket_name: String } }[]) => {
		const x = dataFil.map((y) => y.rocket.rocket_name);
		return x;
	};

	const rocketArray = rocketData(dataFil);

	let x = Array.from(new Set(rocketArray));

	

	const SortObj: Sort = {
		sort: '',
	};

	const [value, setValue] = useState<String>('date');
	const [spinner] = useState(loading);
	const [sortObj, setSortObj] = useState(SortObj);

	const handleSort = (val: String) => {
		const obj = Object.assign({}, sortObj, {
			sort: val,
		});
		setSortObj(obj);

		dispatch(sortLaunches(obj));
		setValue(val);
	};

	//SORT MODAL
	const bottomSortSheetModalRef = useRef<BottomSheetModal>(null);
	const handlePresentModalPress = useCallback(() => {
		bottomSortSheetModalRef.current?.expand();
	}, []);

	const handleSortSheetChanges = useCallback((index: number) => {
		bottomSortSheetModalRef.current?.snapToIndex(index);
	}, []);
	//FILTER MODAL
	const bottomFilterSheetModalRef = useRef<BottomSheetModal>(null);
	const handlePresentFiterPress = useCallback(() => {
		bottomFilterSheetModalRef.current?.expand();
	}, []);

	const handleFilterSheetChanges = useCallback((index: number) => {
		bottomFilterSheetModalRef.current?.snapToIndex(index);
	}, []);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<FlexRow>
					<TouchableOpacity onPress={handlePresentModalPress}>
						<MaterialCommunityIcons
							style={styles.icon}
							name="sort"
							size={22}
							color="grey"
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={handlePresentFiterPress}>
						<FontAwesome
							style={styles.icon}
							name="filter"
							size={22}
							color="grey"
						/>
					</TouchableOpacity>
				</FlexRow>
			),
		});
	}, [navigation]);

	const renderBackdrop = useCallback(
		(props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={0}
				appearsOnIndex={1}
			/>
		),
		[],
	);

	useEffect(() => {
		//@ts-ignore
		dispatch(getLaunches());
	}, [dispatch]);

	if (loading)
		return <Spinner visible={spinner} textContent={'SpaceX_Loading...'} />;
	return (
		<>
			<FlatList
				data={data}
				contentContainerStyle={styles.container}
				renderItem={({ item }) => (
					<SpaceCard item={item} key={item.flight_number} />
				)}
				numColumns={2}
			/>

		
				<BottomSheet
					backdropComponent={renderBackdrop}
					ref={bottomSortSheetModalRef}
					index={-1}
					snapPoints={[1, '25%']}
					onChange={handleSortSheetChanges}
				>
					<>
						<FlexRow justifyContent="space-between">
							<NText mLeft="20" fSize={16} fWeight="bold">
								Sort
							</NText>
							<Entypo
								onPress={() =>
									bottomSortSheetModalRef.current?.close()
								}
								name="cross"
								size={24}
								color="grey"
								style={styles.icon}
							/>
						</FlexRow>

						<Gutter spacing={1.3} />

						<FlexCol
							justifyContent="space-around"
							alignItems="flex-start"
							style={styles.sort}
						>
							{SORT_DATA.map((item, index) => {
								const name: String = item.value;
								const isFocused = value === name;

								return (
									<TouchableOpacity
										key={index}
										onPress={() => handleSort(name)}
									>
										<FlexRow>
											<CText isSelected={isFocused}>
												{item.name}
											</CText>
											<Gutter hSpacing={8} />

											<Ionicons
												name="checkmark-sharp"
												size={24}
												color={
													isFocused
														? '#148512'
														: 'white'
												}
											/>
										</FlexRow>
										<Gutter spacing={1} />
									</TouchableOpacity>
								);
							})}
						</FlexCol>
					</>
				</BottomSheet>
			

			<AllFilter
				filterArray={x}
				handleFilterSheetChanges={handleFilterSheetChanges}
				bottomFilterSheetModalRef={bottomFilterSheetModalRef}
				renderBackdrop={renderBackdrop}
				sorts={value}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	icon: {
		paddingRight: 15,
	},
	bottomSheet: {
		paddingHorizontal: 10,
	},
	rockets: {
		flexDirection: 'row',
	},
	container: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		marginLeft: '8%',
	},
	sort: {
		marginHorizontal: '20%',
	},
});

export { Home };
