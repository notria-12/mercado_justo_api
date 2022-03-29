import { Controller, Get, Param } from '@nestjs/common';
import { StateCityService } from './state-city.service';
import { State, City } from 'src/schema';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiController, ApiResSchema, Public } from 'src/common';

@ApiController('Estado / Cidade', [State, City], true)
@Public()
@Controller('estado-cidade')
export class StateCityController {
  constructor(private readonly stateCityService: StateCityService) { }

  @ApiOkResponse(ApiResSchema.apply(State))
  @Get('estados')
  findAllStates() {
    return this.stateCityService.findAllStates();
  }

  @ApiOkResponse(ApiResSchema.apply(City))
  @Get(':estado/cidades')
  findAllCitiesByState(@Param('estado') stateOrInitials: string) {
    return this.stateCityService.findAllCitiesByState(stateOrInitials);
  }
}
