import { Model } from 'mongoose';
import { StateDocument, CityDocument } from 'src/schema';
export declare class StateCityService {
    private stateModel;
    private cityModel;
    constructor(stateModel: Model<StateDocument>, cityModel: Model<CityDocument>);
    findAllStates(): Promise<(import("src/schema").State & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findAllCitiesByState(stateOrInitials: string): Promise<(import("src/schema").City & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
