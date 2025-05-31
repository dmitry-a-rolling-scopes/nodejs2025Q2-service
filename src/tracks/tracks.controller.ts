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
import { TracksProvider } from './tracks.provider';
import { UUID } from '../common/uuid.dto';
import { TracksProcessor } from './tracks.processor';
import { Track } from './track.interface';
import { TrackDto } from './track.dto';

@Controller('track')
export class TracksController {
  constructor(
    private readonly tracksProcessor: TracksProcessor,
    private readonly tracksProvider: TracksProvider,
  ) {}

  @Get()
  public async getAll(): Promise<Track[]> {
    return await this.tracksProvider.getAll();
  }

  @Get(':id')
  public async get(@Param() id: UUID): Promise<Track> {
    return await this.tracksProvider.get(id.value);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async post(@Body() trackDto: TrackDto): Promise<Track> {
    return await this.tracksProcessor.create(trackDto);
  }

  @Put(':id')
  public async put(
    @Param() id: UUID,
    @Body() trackDto: TrackDto,
  ): Promise<Track> {
    return await this.tracksProcessor.update(id.value, trackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param() id: UUID): Promise<void> {
    return await this.tracksProcessor.delete(id.value);
  }
}
