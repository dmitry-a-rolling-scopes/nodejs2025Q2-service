import { Injectable } from '@nestjs/common';
import { DataSource } from '../database/database.data-source';
import { FavoritesResponse } from './favorites.response.dto';

@Injectable()
export class FavoritesProvider {
  constructor(private readonly dataSource: DataSource) {}

  public async getAll(): Promise<FavoritesResponse> {
    return await this.dataSource.getFavoritesResponseDto();
  }
}
