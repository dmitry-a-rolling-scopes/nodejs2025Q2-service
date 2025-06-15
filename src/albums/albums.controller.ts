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
import { AlbumsProvider } from './albums.provider';
import { Album as AlbumInterface } from './album.interface';
import { AlbumsProcessor } from './albums.processor';
import { UUID } from '../common/uuid.dto';
import { AlbumDto } from './album.dto';
import { AlbumsMapper } from './albums.mapper';
import { Album } from './album.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('album')
@UseGuards(AuthGuard)
export class AlbumsController {
  constructor(
    private readonly albumsMapper: AlbumsMapper,
    private readonly albumsProcessor: AlbumsProcessor,
    private readonly albumsProvider: AlbumsProvider,
  ) {}

  @Get()
  public async getAll(): Promise<AlbumInterface[]> {
    const albums = await this.albumsProvider.getAll();

    return albums.map(
      (album: Album): AlbumInterface => this.albumsMapper.map(album),
    );
  }

  @Get(':id')
  public async get(@Param() id: UUID): Promise<AlbumInterface> {
    const album = await this.albumsProvider.get(id.value);

    return this.albumsMapper.map(album);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async post(@Body() albumDto: AlbumDto): Promise<AlbumInterface> {
    const album = await this.albumsProcessor.create(albumDto);

    return this.albumsMapper.map(album);
  }

  @Put(':id')
  public async put(
    @Param() id: UUID,
    @Body() albumDto: AlbumDto,
  ): Promise<AlbumInterface> {
    const album = await this.albumsProcessor.update(id.value, albumDto);

    return this.albumsMapper.map(album);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param() id: UUID): Promise<void> {
    return await this.albumsProcessor.delete(id.value);
  }
}
