import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StateDocument, CityDocument } from 'src/schema';

@Injectable()
export class StateCityService {
  constructor(
    @InjectModel('estados')
    private stateModel: Model<StateDocument>,
    @InjectModel('cidades')
    private cityModel: Model<CityDocument>,
  ) { }

  async findAllStates() {
    return this.stateModel.find()
      .sort('sigla');
  }

  async findAllCitiesByState(stateOrInitials: string) {
    let state: StateDocument;
    if (stateOrInitials.length == 2) {
      state = await this.stateModel.findOne({ sigla: stateOrInitials });
    } else {
      state = await this.stateModel.findOne({ nome: stateOrInitials });
    }

    return this.cityModel.find({
      estado: state.nome,
    })
      .sort('nome');
  }

}
