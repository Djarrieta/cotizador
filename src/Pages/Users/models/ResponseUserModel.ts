import { AlertModel } from "../../../App/models/AlertModel";
import { CurrentTeamModel } from "../../TeamDetail/models/CurrentTeamModel";
import { CurrentUserModel } from "./CurrentUserModel";

export interface ResponseUserModel {
	alert: AlertModel;
	data?: { currentUser: CurrentUserModel; currentTeam?: CurrentTeamModel };
}
