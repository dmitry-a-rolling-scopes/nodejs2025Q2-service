import { Artist } from '../artists/artist.interface';
import { Album } from '../albums/album.interface';
import { Track } from '../tracks/track.interface';

export class FavoritesResponse {
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];
}
