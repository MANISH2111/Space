import { TypedUseSelectorHook, useSelector } from 'react-redux';
// when you are importing type please add type
import { ApplicationState } from '../store';

export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
	useSelector;
