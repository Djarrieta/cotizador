import {AlertModel} from "../../App/models/AlertModel";
import { CurrentTeamModel } from "./CurrentTeamModel";

export interface ResponseTeamModel {
	alert: AlertModel;
	data?: CurrentTeamModel;
}
