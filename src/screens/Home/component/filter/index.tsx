import React, { FunctionComponent, useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { Button, Text } from 'react-native';
import { FilterButton } from './Filter';
import { FlexRow } from '../../../../components/atom';
import {
	BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

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
}>`
	font-size: ${(props) => (props.fSize ? `${props.fSize}px` : `14px`)};
	font-weight: ${(props) => (props.fWeight ? `${props.fWeight}` : `normal`)};
	text-align: ${(props) => (props.align ? props.align : `center`)};
`;

type Filter = {
	rockets: [];
};
type Props = {
	filterArray: any;
	bottomFilterSheetModalRef: React.RefObject<BottomSheetModalMethods>;
	renderBackdrop: FunctionComponent<BottomSheetBackdropProps>;
	handleFilterSheetChanges: (index: number) => void;
};

const AllFilter: React.ComponentType<Props> = ({
	filterArray,
	bottomFilterSheetModalRef,
	renderBackdrop,
	handleFilterSheetChanges,
}) => {
	const FObj: Filter = {
		rockets: [],
	};

	const [rocketsFilter, setRocketsFilter] = useState([]);

	const [filterObj, setFilterObj] = useState(FObj);

	const handleRocketFilter = useCallback(
		(item: any) => {
			const index = rocketsFilter.findIndex((x) => x === item);
			console.log('SSSSSSSSSSSS', index);

			if (index < 0) {
				setRocketsFilter([...rocketsFilter, item]);

				console.log('DDDDDDDDDDD', rocketsFilter);
			} else {
				const selectedRocket = Array.from(rocketsFilter);
				selectedRocket.splice(index, 1);
				setRocketsFilter(selectedRocket);
			}
		},
		[rocketsFilter],
	);

	const handleFilter = useCallback(async (newRocketFilters: any) => {
		try {
			const obj = Object.assign({}, filterObj, {
				rockets: newRocketFilters,
			});
			setFilterObj(obj);
			console.log('PPPPPPPPPPP', obj.rockets);
			//@ts-ignore
			dispatch(filteredLaunches(obj));
		} catch (error) {}
	}, []);

	return (
		<BottomSheetModalProvider>
			<BottomSheetModal
				ref={bottomFilterSheetModalRef}
				backdropComponent={renderBackdrop}
				index={1}
				snapPoints={[1, '80%']}
				onChange={handleFilterSheetChanges}
			>
				<NText fSize={16} fWeight="bold">
					Filter
				</NText>

				<RocketButton>
					{filterArray.map((item: String, index: number) => {
						return (
							<FilterButton
								key={index}
								name={item}
								isSelected={
									rocketsFilter.findIndex((x) => x === item) >
									-1
								}
								onPress={() => handleRocketFilter(item)}
							/>
						);
					})}
				</RocketButton>

				<Button
					title="Submit"
					onPress={() => handleFilter(rocketsFilter)}
				/>
			</BottomSheetModal>
		</BottomSheetModalProvider>
	);
};

export { AllFilter };
