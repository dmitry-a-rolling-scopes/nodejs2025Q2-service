import { Favorites } from './favorites.entity';
import { FavoritesResponse } from './favorites.response.dto';
import { ArtistsMapper } from '../artists/artists.mapper';
import { AlbumsMapper } from '../albums/albums.mapper';
import { TracksMapper } from '../tracks/tracks.mapper';
import { Artist } from '../artists/artist.entity';
import { Artist as ArtistInterface } from '../artists/artist.interface';
import { Album } from '../albums/album.entity';
import { Album as AlbumInterface } from '../albums/album.interface';
import { Track } from '../tracks/track.entity';
import { Track as TrackInterface } from '../tracks/track.interface';
import { forwardRef, Inject } from '@nestjs/common';

export class FavoritesMapper {
  constructor(
    @Inject(forwardRef(() => ArtistsMapper))
    private readonly artistsMapper: ArtistsMapper,
    @Inject(forwardRef(() => AlbumsMapper))
    private readonly albumsMapper: AlbumsMapper,
    @Inject(forwardRef(() => TracksMapper))
    private readonly tracksMapper: TracksMapper,
  ) {}

  public map(favorites: Favorites): FavoritesResponse {
    const favoritesResponse = new FavoritesResponse();

    favoritesResponse.artists = favorites
      .getArtists()
      .map((artist: Artist): ArtistInterface => this.artistsMapper.map(artist));

    favoritesResponse.albums = favorites
      .getAlbums()
      .map((album: Album): AlbumInterface => this.albumsMapper.map(album));

    favoritesResponse.tracks = favorites
      .getTracks()
      .map((track: Track): TrackInterface => this.tracksMapper.map(track));

    return favoritesResponse;
  }
}
