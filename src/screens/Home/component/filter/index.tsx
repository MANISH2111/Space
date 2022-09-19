import React, {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useCallback,
	useMemo,
	useState,
} from 'react';
import styled from 'styled-components/native';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FilterButton } from './Filter';
import { FlexCol, FlexRow, Gutter } from '../../../../components/atom';
import BottomSheet, { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useDispatch } from 'react-redux';
import {
	filterLaunches,
	resetLaunches,
	sortLaunches,
} from '../../../../store/actions';
import { LAUNCH_SUCCESS, ROCKET_UPCOMING } from '../../../../data';
import moment from 'moment';
import { Entypo } from '@expo/vector-icons';

const RocketButton = styled(FlexRow)`
	width: 60%;
	justify-content: flex-start;
	flex-wrap: wrap;
	margin-left: 10px;
`;
const NText = styled(Text)<{
	fSize?: number;
	fWeight?: string;
	align?: string;
	color?: string;
	mLeft?: string;
}>`
	font-size: ${(props) => (props.fSize ? `${props.fSize}px` : `14px`)};
	font-weight: ${(props) => (props.fWeight ? `${props.fWeight}` : `normal`)};
	text-align: ${(props) => (props.align ? props.align : `center`)};
	color: ${(props) => (props.color ? `${props.color}` : `white`)};
	margin-left: ${(props) => (props.mLeft ? `${props.mLeft}px` : 0)};
`;

const NButton = styled(TouchableOpacity)<{ bgColor?: String }>`
	width: 150px;
	height: 40px;
	align-items: center;
	justify-content: center;
	background-color: ${(props) =>
		props.bgColor ? `${props.bgColor}` : `lightgrey`};

	border-radius: 6px;
`;
const DButton = styled(TouchableOpacity)`
	width: 150px;
	height: 45px;
	align-items: center;
	justify-content: center;
	background-color: 'white';
	border: 1px solid grey;
	border-radius: 6px;
	margin: 0 14px;
`;

type Filter = {
	rockets?: [];
	upcoming?: [];
	success?: [];
	time?: {
		StartDate: String | null;
		EndDate: String | null;
	};
};
type Props = {
	filterArray: any;
	bottomFilterSheetModalRef: React.RefObject<BottomSheetModalMethods>;
	renderBackdrop: FunctionComponent<BottomSheetBackdropProps>;
	handleFilterSheetChanges: (index: number) => void;
	sorts?: String;
	isFilter?: Boolean;
	setIsFilter?: Dispatch<SetStateAction<boolean>>;
};

const AllFilter: React.ComponentType<Props> = ({
	filterArray,
	bottomFilterSheetModalRef,
	renderBackdrop,
	handleFilterSheetChanges,
	sorts,
	setIsFilter,
}) => {
	const FObj: Filter = {
		rockets: [],
		upcoming: [],
		success: [],
		time: {
			StartDate: null,
			EndDate: null,
		},
	};
	const [rocketsFilter, setRocketsFilter] = useState<any>([]);
	const [upcomingFilter, setUpcomingfilter] = useState<any>([]);

	const [success, setSuccess] = useState<any>([]);
	const [filterObj, setFilterObj] = useState(FObj);
	const dispatch = useDispatch();

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [isDateVsisble, setDateVisible] = useState(false);
	const [date, setDate] = useState({ StartDate: null, EndDate: null });

	const showDatePicker = (index: number) => {
		index === 0 ? setDatePickerVisibility(true) : setDateVisible(true);
	};

	const hideDatePicker = (index: number) => {
		index === 0 ? setDatePickerVisibility(false) : setDateVisible(false);
	};

	//FILTER METHODS
	const handleRocketFilter = useCallback(
		(item: any) => {
			const index = rocketsFilter.findIndex((x: any) => x === item);

			if (index < 0) {
				setRocketsFilter([...rocketsFilter, item]);
			} else {
				const selectedRocket = Array.from(rocketsFilter);
				selectedRocket.splice(index, 1);
				setRocketsFilter(selectedRocket);
			}
		},
		[rocketsFilter],
	);

	const handleUpcomingFilter = useCallback(
		(item: any) => {
			const index = upcomingFilter.findIndex((x: any) => x === item);

			if (index < 0) {
				setUpcomingfilter([...upcomingFilter, item]);
			} else {
				const selected = Array.from(upcomingFilter);
				selected.splice(index, 1);
				setUpcomingfilter(selected);
			}
		},
		[upcomingFilter],
	);
	const handleRocketSuccess = useCallback(
		(item: any) => {
			const index = success.findIndex((x: any) => x === item);

			if (index < 0) {
				setSuccess([...success, item]);
			} else {
				const selected = Array.from(success);
				selected.splice(index, 1);
				setSuccess(selected);
			}
		},
		[success],
	);
	//RESET METHOD
	const handleRest = useCallback(() => {
		try {
			setRocketsFilter([]);
			setUpcomingfilter([]);
			setSuccess([]);
			setDate({ StartDate: null, EndDate: null });

			dispatch(resetLaunches());
			bottomFilterSheetModalRef.current?.close();
		} catch (error) {
		} finally {
			//@ts-ignore
			setIsFilter(false);
		}
	}, [dispatch, FObj]);

	//ALL FILTER DISPATCH
	const handleFilter = useCallback(
		(
			newRocketFilters: any,
			upcomingFilter: any,
			newSuccess: any,
			newTime: any,
		) => {
			try {
				const obj = Object.assign({}, filterObj, {
					rockets: newRocketFilters,
					upcoming: upcomingFilter,
					success: newSuccess,
					time: newTime,
				});
				setFilterObj(obj);
				//@ts-ignore
				setIsFilter(JSON.stringify(filterObj) !== JSON.stringify(obj));

				dispatch(filterLaunches(obj));
			} catch (error) {
			} finally {
				dispatch(sortLaunches(sorts));
				bottomFilterSheetModalRef.current?.close();
			}
		},
		[dispatch, FObj, sorts],
	);
	//DATE FILTER
	const handleDateConfirm = useCallback(
		(index: number, value: Date) => {
			try {
				setDate((prevState) => ({
					...prevState,
					[index === 0 ? 'StartDate' : 'EndDate']: value
						? moment(value).format()
						: null,
				}));
			} catch (error) {
			} finally {
				hideDatePicker(index);
			}
		},
		[date],
	);
	const x = Object.values(date);
	const y = Object.keys(date);

	const dateView = useCallback(
		(index: number) => (
			<NText color="grey">
				{x[index] === null
					? y[index]
					: moment(x[index]).format('MMM D, YYYY')}
			</NText>
		),

		[date],
	);

	return (
		<BottomSheet
			ref={bottomFilterSheetModalRef}
			backdropComponent={renderBackdrop}
			index={-1}
			snapPoints={[1, '75%']}
			onChange={handleFilterSheetChanges}
		>
			<FlexRow justifyContent="space-between">
				<NText
					mLeft="15"
					align="left"
					color="black"
					fSize={16}
					fWeight="bold"
				>
					Filters
				</NText>
				<Entypo
					onPress={() => bottomFilterSheetModalRef.current?.close()}
					name="cross"
					size={24}
					color="grey"
					style={styles.icon}
				/>
			</FlexRow>
			<Gutter />
			<NText
				mLeft="12"
				fSize={16}
				color="#666666"
				fWeight="500"
				align="left"
			>
				Rocket Name
			</NText>
			{/* ROCKET FILTER */}
			<RocketButton>
				{filterArray.map((item: String, index: number) => {
					return (
						<>
							<FilterButton
								key={index}
								name={item}
								isSelected={
									rocketsFilter.findIndex(
										(x: String) => x === item,
									) > -1
								}
								onPress={() => handleRocketFilter(item)}
							/>
						</>
					);
				})}

				<Gutter spacing={4} />
				{/* UPCOMING FILTER */}
				<FlexCol>
					<NText
						fSize={16}
						color="#666666"
						fWeight="500"
						align="left"
					>
						Upcoming
					</NText>
					<FlexRow alignItems="flex-start">
						{ROCKET_UPCOMING.map((xx, i) => {
							return (
								<FilterButton
									key={xx}
									name={xx}
									isSelected={
										upcomingFilter.findIndex(
											(x: String) => x === xx,
										) > -1
									}
									onPress={() => handleUpcomingFilter(xx)}
								/>
							);
						})}
					</FlexRow>
				</FlexCol>
				<Gutter spacing={5} />
				{/* LAUNCH SATATUS FILTER */}
				<NText fSize={16} color="#666666" fWeight="500" align="left">
					Launch Status
				</NText>
				<FlexRow>
					{LAUNCH_SUCCESS.map((y, i) => {
						return (
							<FilterButton
								key={y}
								name={y}
								isSelected={
									success.findIndex((x: String) => x === y) >
									-1
								}
								onPress={() => handleRocketSuccess(y)}
							/>
						);
					})}
				</FlexRow>
			</RocketButton>
			<Gutter spacing={1} />
			{/* DATE RANGE FILTER */}
			<NText
				fSize={16}
				color="#666666"
				fWeight="500"
				align="left"
				mLeft="15"
			>
				Date Range
			</NText>
			<Gutter />
			<FlexRow justifyContent="center">
				{[date.StartDate, date.EndDate].map((item, index) => {
					return (
						<>
							<DButton
								key={item}
								onPress={() => showDatePicker(index)}
							>
								{dateView(index)}
							</DButton>

							<DateTimePickerModal
								isVisible={
									index === 0
										? isDatePickerVisible
										: isDateVsisble
								}
								mode="date"
								onConfirm={(val) =>
									handleDateConfirm(index, val)
								}
								onCancel={() => hideDatePicker(index)}
							/>
						</>
					);
				})}
			</FlexRow>
			<Gutter spacing={2} />
			<FlexRow justifyContent="space-evenly" alignItems="center">
				<NButton onPress={() => handleRest()}>
					<NText fSize={20} fWeight="400" color="black">
						Reset
					</NText>
				</NButton>
				<NButton
					bgColor="black"
					onPress={() =>
						handleFilter(
							rocketsFilter,
							upcomingFilter,
							success,
							date,
						)
					}
				>
					<NText fSize={20} fWeight="400" color="white">
						Done
					</NText>
				</NButton>
			</FlexRow>
			<Gutter />
		</BottomSheet>
	);
};

const styles = StyleSheet.create({
	icon: {
		marginRight: 20,
	},
});

export { AllFilter };
