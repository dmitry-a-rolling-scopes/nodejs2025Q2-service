import { Injectable } from '@nestjs/common';
import { User } from '../users/user.interface';
import { Album } from '../albums/album.interface';
import { Artist } from '../artists/artist.interface';
import { Track } from '../tracks/track.interface';
import { Favorites } from '../favorites/favorites.interface';
import { UserDto } from '../users/user.dto';
import { plainToInstance } from 'class-transformer';
import { FavoritesResponse } from '../favorites/favorites.response.dto';
import { UUID } from '../common/uuid.type';

@Injectable()
export class DataSource {
  private albums: Map<string, Album> = new Map<string, Album>();
  private artists: Map<string, Artist> = new Map<string, Artist>();
  private favorites: Favorites = {
    albums: [],
    artists: [],
    tracks: [],
  };
  private tracks: Map<string, Track> = new Map<string, Track>();
  private users: Map<string, User> = new Map<string, User>();

  public async addAlbum(album: Album): Promise<void> {
    this.albums.set(album.id, album);
  }

  public async addAlbumToFavorites(album: Album): Promise<void> {
    this.favorites.albums.push(album.id);
  }

  public async deleteAlbum(album: Album): Promise<void> {
    const albumId = album.id;

    await this.deleteAlbumFromFavorites(album);

    this.albums.delete(albumId);

    this.tracks.forEach((track: Track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }

  public async deleteAlbumFromFavorites(album: Album): Promise<void> {
    this.favorites.albums = this.favorites.albums.filter(
      (favoriteAlbumId: UUID): boolean => favoriteAlbumId !== album.id,
    );
  }

  public async getAlbum(id: UUID): Promise<Album | null> {
    return this.albums.get(id);
  }

  public async getAlbums(): Promise<Album[]> {
    return Array.from(this.albums.values());
  }

  public async addArtist(artist: Artist): Promise<void> {
    this.artists.set(artist.id, artist);
  }

  public async addArtistToFavorites(artist: Artist): Promise<void> {
    this.favorites.artists.push(artist.id);
  }

  public async deleteArtist(artist: Artist): Promise<void> {
    const artistId = artist.id;

    await this.deleteArtistFromFavorites(artist);

    this.artists.delete(artistId);

    this.albums.forEach((album: Album): void => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });

    this.tracks.forEach((track: Track): void => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  public async deleteArtistFromFavorites(artist: Artist): Promise<void> {
    this.favorites.artists = this.favorites.artists.filter(
      (favoriteArtistId: UUID): boolean => favoriteArtistId !== artist.id,
    );
  }

  public async getArtist(id: UUID): Promise<Artist | null> {
    return this.artists.get(id);
  }

  public async getArtists(): Promise<Artist[]> {
    return Array.from(this.artists.values());
  }

  public async getFavoritesResponseDto(): Promise<FavoritesResponse> {
    const favoritesResponse = new FavoritesResponse();

    await Promise.all(
      this.favorites.albums.map(async (id: UUID) => {
        favoritesResponse.albums.push(await this.getAlbum(id));
      }),
    );

    await Promise.all(
      this.favorites.artists.map(async (id: UUID) => {
        favoritesResponse.artists.push(await this.getArtist(id));
      }),
    );

    await Promise.all(
      this.favorites.tracks.map(async (id: UUID) => {
        favoritesResponse.tracks.push(await this.getTrack(id));
      }),
    );

    return favoritesResponse;
  }

  public async addTrack(track: Track): Promise<void> {
    this.tracks.set(track.id, track);
  }

  public async addTrackToFavorites(track: Track): Promise<void> {
    this.favorites.tracks.push(track.id);
  }

  public async deleteTrack(track: Track): Promise<void> {
    const trackId = track.id;

    await this.deleteTrackFromFavorites(track);

    this.tracks.delete(trackId);
  }

  public async deleteTrackFromFavorites(track: Track): Promise<void> {
    this.favorites.tracks = this.favorites.tracks.filter(
      (favoriteTrackId: UUID): boolean => favoriteTrackId !== track.id,
    );
  }

  public async getTrack(id: UUID): Promise<Track | null> {
    return this.tracks.get(id);
  }

  public async getTracks(): Promise<Track[]> {
    return Array.from(this.tracks.values());
  }

  public async addUser(user: User): Promise<void> {
    this.users.set(user.id, user);
  }

  public async deleteUser(user: User): Promise<void> {
    this.users.delete(user.id);
  }

  public async getUser(id: UUID): Promise<User | null> {
    return this.users.get(id);
  }

  public async getUserDto(id: UUID): Promise<UserDto | null> {
    const user = this.users.get(id);

    return plainToInstance<UserDto, User>(UserDto, user, {
      enableImplicitConversion: true,
      excludeExtraneousValues: false,
    });
  }

  public async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  public async getUsersDtos(): Promise<UserDto[]> {
    const users = await this.getUsers();

    return Promise.all(
      users.map(
        async (user: User): Promise<UserDto> =>
          await this.getUserDto(user.id as UUID),
      ),
    );
  }
}
