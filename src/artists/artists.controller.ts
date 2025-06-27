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
  UseGuards,
} from '@nestjs/common';
import { ArtistsProvider } from './artists.provider';
import { UUID } from '../common/uuid.dto';
import { Artist as ArtistInterface } from './artist.interface';
import { ArtistsProcessor } from './artists.processor';
import { ArtistDto } from './artist.dto';
import { ArtistsMapper } from './artists.mapper';
import { Artist } from './artist.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('artist')
@UseGuards(AuthGuard)
export class ArtistsController {
  constructor(
    private readonly artistsMapper: ArtistsMapper,
    private readonly artistsProcessor: ArtistsProcessor,
    private readonly artistsProvider: ArtistsProvider,
  ) {}

  @Get()
  public async getAll(): Promise<ArtistInterface[]> {
    const artists = await this.artistsProvider.getAll();

    return artists.map(
      (artist: Artist): ArtistInterface => this.artistsMapper.map(artist),
    );
  }

  @Get(':id')
  public async get(@Param() id: UUID): Promise<ArtistInterface> {
    const artist = await this.artistsProvider.get(id.value);

    return this.artistsMapper.map(artist);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async post(@Body() artistDto: ArtistDto): Promise<ArtistInterface> {
    const artist = await this.artistsProcessor.create(artistDto);

    return this.artistsMapper.map(artist);
  }

  @Put(':id')
  public async put(
    @Param() id: UUID,
    @Body() artistDto: ArtistDto,
  ): Promise<ArtistInterface> {
    const artist = await this.artistsProcessor.update(id.value, artistDto);

    return this.artistsMapper.map(artist);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param() id: UUID): Promise<void> {
    return await this.artistsProcessor.delete(id.value);
  }
}
