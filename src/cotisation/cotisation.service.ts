import { Injectable } from '@nestjs/common';
import { CreateCotisationDto } from './dto/create-cotisation.dto';
import { UpdateCotisationDto } from './dto/update-cotisation.dto';

@Injectable()
export class CotisationService {
  create(createCotisationDto: CreateCotisationDto) {
    return 'This action adds a new cotisation';
  }

  findAll() {
    return `This action returns all cotisation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cotisation`;
  }

  update(id: number, updateCotisationDto: UpdateCotisationDto) {
    return `This action updates a #${id} cotisation`;
  }

  remove(id: number) {
    return `This action removes a #${id} cotisation`;
  }
}
