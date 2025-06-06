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

export class FavoritesMapper {
  constructor(
    private readonly artistsMapper: ArtistsMapper,
    private readonly albumsMapper: AlbumsMapper,
    private readonly tracksMapper: TracksMapper,
  ) {}

  public map(favorites: Favorites): FavoritesResponse {
    return {
      artists: favorites.artists.map(
        (artist: Artist): ArtistInterface => this.artistsMapper.map(artist),
      ),
      albums: favorites.albums.map(
        (album: Album): AlbumInterface => this.albumsMapper.map(album),
      ),
      tracks: favorites.tracks.map(
        (track: Track): TrackInterface => this.tracksMapper.map(track),
      ),
    };
  }
}
