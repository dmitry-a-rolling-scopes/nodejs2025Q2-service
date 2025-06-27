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
import { TracksProvider } from './tracks.provider';
import { UUID } from '../common/uuid.dto';
import { TracksProcessor } from './tracks.processor';
import { Track as TrackInterface } from './track.interface';
import { TrackDto } from './track.dto';
import { TracksMapper } from './tracks.mapper';
import { Track } from './track.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('track')
@UseGuards(AuthGuard)
export class TracksController {
  constructor(
    private readonly tracksMapper: TracksMapper,
    private readonly tracksProcessor: TracksProcessor,
    private readonly tracksProvider: TracksProvider,
  ) {}

  @Get()
  public async getAll(): Promise<TrackInterface[]> {
    const tracks = await this.tracksProvider.getAll();

    return tracks.map(
      (track: Track): TrackInterface => this.tracksMapper.map(track),
    );
  }

  @Get(':id')
  public async get(@Param() id: UUID): Promise<TrackInterface> {
    const track = await this.tracksProvider.get(id.value);

    return this.tracksMapper.map(track);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async post(@Body() trackDto: TrackDto): Promise<TrackInterface> {
    const track = await this.tracksProcessor.create(trackDto);

    return this.tracksMapper.map(track);
  }

  @Put(':id')
  public async put(
    @Param() id: UUID,
    @Body() trackDto: TrackDto,
  ): Promise<TrackInterface> {
    const track = await this.tracksProcessor.update(id.value, trackDto);

    return this.tracksMapper.map(track);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param() id: UUID): Promise<void> {
    return await this.tracksProcessor.delete(id.value);
  }
}
