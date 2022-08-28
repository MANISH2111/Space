import { TypedUseSelectorHook,useDispatch,useSelector } from "react-redux";
import { ApplicationState,AppDispatch } from "../store";

export const useAppDispatch=()=>useDispatch<AppDispatch>()
export const useAppSelector:TypedUseSelectorHook<ApplicationState>=useSelector