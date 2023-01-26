import { StateCityService } from './state-city.service';
import { State, City } from 'src/schema';
export declare class StateCityController {
    private readonly stateCityService;
    constructor(stateCityService: StateCityService);
    findAllStates(): Promise<(State & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findAllCitiesByState(stateOrInitials: string): Promise<(City & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
