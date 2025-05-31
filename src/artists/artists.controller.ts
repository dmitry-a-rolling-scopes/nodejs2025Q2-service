import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistsProvider } from './artists.provider';
import { UUID } from '../common/uuid.dto';
import { Artist } from './artist.interface';
import { ArtistsProcessor } from './artists.processor';
import { ArtistDto } from './artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistsProcessor: ArtistsProcessor,
    private readonly artistsProvider: ArtistsProvider,
  ) {}

  @Get()
  public async getAll(): Promise<Artist[]> {
    return await this.artistsProvider.getAll();
  }

  @Get(':id')
  public async get(@Param() id: UUID): Promise<Artist> {
    return await this.artistsProvider.get(id.value);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async post(@Body() artistDto: ArtistDto): Promise<Artist> {
    return await this.artistsProcessor.create(artistDto);
  }

  @Put(':id')
  public async put(
    @Param() id: UUID,
    @Body() artistDto: ArtistDto,
  ): Promise<Artist> {
    return await this.artistsProcessor.update(id.value, artistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param() id: UUID): Promise<void> {
    return await this.artistsProcessor.delete(id.value);
  }
}
