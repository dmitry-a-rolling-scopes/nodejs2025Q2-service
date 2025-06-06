import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UUID } from '../common/uuid.dto';
import { FavoritesProcessor } from './favorites.processor';
import { FavoritesProvider } from './favorites.provider';
import { FavoritesResponse } from './favorites.response.dto';
import { FavoritesMapper } from './favorites.mapper';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesMapper: FavoritesMapper,
    private readonly favoritesProcessor: FavoritesProcessor,
    private readonly favoritesProvider: FavoritesProvider,
  ) {}

  @Get()
  public async getAll(): Promise<FavoritesResponse> {
    const favorites = await this.favoritesProvider.getAll();

    return this.favoritesMapper.map(favorites);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteAlbum(@Param() id: UUID): Promise<void> {
    await this.favoritesProcessor.deleteAlbum(id.value);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  public async postAlbum(@Param() id: UUID): Promise<void> {
    await this.favoritesProcessor.postAlbum(id.value);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteArtist(@Param() id: UUID): Promise<void> {
    await this.favoritesProcessor.deleteArtist(id.value);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  public async postArtist(@Param() id: UUID): Promise<void> {
    await this.favoritesProcessor.postArtist(id.value);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteTrack(@Param() id: UUID): Promise<void> {
    await this.favoritesProcessor.deleteTrack(id.value);
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  public async postTrack(@Param() id: UUID): Promise<void> {
    await this.favoritesProcessor.postTrack(id.value);
  }
}
