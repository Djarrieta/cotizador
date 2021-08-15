import {AlertModel} from "../../../App/models/AlertModel";
import { CurrentUserModel } from "./CurrentUserModel";

export interface ResponseUserModel {
	alert: AlertModel;
	data?: CurrentUserModel;
}
