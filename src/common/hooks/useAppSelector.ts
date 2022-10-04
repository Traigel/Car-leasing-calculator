import {TypedUseSelectorHook, useSelector} from "react-redux";
import { AppRootStateType } from "../types/types";

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector