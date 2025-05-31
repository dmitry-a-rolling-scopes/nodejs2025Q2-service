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
import { AlbumsProvider } from './albums.provider';
import { Album } from './album.interface';
import { AlbumsProcessor } from './albums.processor';
import { UUID } from '../common/uuid.dto';
import { AlbumDto } from './album.dto';

@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumsProcessor: AlbumsProcessor,
    private readonly albumsProvider: AlbumsProvider,
  ) {}

  @Get()
  public async getAll(): Promise<Album[]> {
    return await this.albumsProvider.getAll();
  }

  @Get(':id')
  public async get(@Param() id: UUID): Promise<Album> {
    return await this.albumsProvider.get(id.value);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async post(@Body() albumDto: AlbumDto): Promise<Album> {
    return await this.albumsProcessor.create(albumDto);
  }

  @Put(':id')
  public async put(
    @Param() id: UUID,
    @Body() albumDto: AlbumDto,
  ): Promise<Album> {
    return await this.albumsProcessor.update(id.value, albumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param() id: UUID): Promise<void> {
    return await this.albumsProcessor.delete(id.value);
  }
}
