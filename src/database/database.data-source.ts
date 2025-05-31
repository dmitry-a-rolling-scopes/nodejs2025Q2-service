import { Injectable } from '@nestjs/common';
import { User } from '../users/user.interface';
import { Album } from '../albums/album.interface';
import { Artist } from '../artists/artist.interface';
import { Track } from '../tracks/track.interface';
import { Favorites } from '../favorites/favorites.interface';
import { UserDto } from '../users/user.dto';
import { plainToInstance } from 'class-transformer';

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

  public async deleteAlbum(album: Album): Promise<void> {
    const albumId = album.id;

    this.albums.delete(albumId);

    this.favorites.albums = this.favorites.albums.filter(
      (favoriteAlbumId: string): boolean => favoriteAlbumId !== albumId,
    );

    this.tracks.forEach((track: Track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }

  public async getAlbum(id: string): Promise<Album | null> {
    return this.albums.get(id);
  }

  public async getAlbums(): Promise<Album[]> {
    return Array.from(this.albums.values());
  }

  public async addArtist(artist: Artist): Promise<void> {
    this.artists.set(artist.id, artist);
  }

  public async deleteArtist(artist: Artist): Promise<void> {
    const artistId = artist.id;

    this.artists.delete(artistId);

    this.albums.forEach((album: Album): void => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });

    this.favorites.artists = this.favorites.artists.filter(
      (favoriteArtistId: string): boolean => favoriteArtistId !== artistId,
    );

    this.tracks.forEach((track: Track): void => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  public async getArtist(id: string): Promise<Artist | null> {
    return this.artists.get(id);
  }

  public async getArtists(): Promise<Artist[]> {
    return Array.from(this.artists.values());
  }

  public async getFavorites(): Promise<Favorites> {
    return this.favorites;
  }

  public async addTrack(track: Track): Promise<void> {
    this.tracks.set(track.id, track);
  }

  public async deleteTrack(track: Track): Promise<void> {
    const trackId = track.id;

    this.tracks.delete(trackId);

    this.favorites.tracks = this.favorites.tracks.filter(
      (favoriteTrackId: string): boolean => favoriteTrackId !== trackId,
    );
  }

  public async getTrack(id: string): Promise<Track | null> {
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

  public async getUser(id: string): Promise<User | null> {
    return this.users.get(id);
  }

  public async getUserDto(id: string): Promise<UserDto | null> {
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
        async (user: User): Promise<UserDto> => await this.getUserDto(user.id),
      ),
    );
  }
}
