import { IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from '../common/uuid.type';
import { Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { Artist } from '../artists/artist.entity';
import { Album } from '../albums/album.entity';
import { Track } from '../tracks/track.entity';

@Entity()
export class Favorites {
  @PrimaryColumn('uuid')
  @IsNotEmpty()
  @IsUUID('4')
  public id: UUID = randomUUID();

  @ManyToMany((): typeof Album => Album, { eager: true })
  @JoinTable()
  private albums: Album[];

  @ManyToMany((): typeof Artist => Artist, { eager: true })
  @JoinTable()
  private artists: Artist[];

  @ManyToMany((): typeof Track => Track, { eager: true })
  @JoinTable()
  private tracks: Track[];

  public addAlbum(album: Album): void {
    this.initAlbums();

    this.albums.push(album);
  }

  public deleteAlbum(album: Album): void {
    this.initAlbums();

    this.albums = this.albums.filter(
      (favoriteAlbum: Album): boolean => favoriteAlbum.id !== album.id,
    );
  }

  public getAlbums(): Album[] {
    return this.albums ?? [];
  }

  public addArtist(artist: Artist): void {
    this.initArtists();

    this.artists.push(artist);
  }

  public deleteArtist(artist: Artist): void {
    this.initArtists();

    this.artists = this.artists.filter(
      (favoriteArtist: Artist): boolean => favoriteArtist.id !== artist.id,
    );
  }

  public getArtists(): Artist[] {
    return this.artists ?? [];
  }

  public addTrack(track: Track): void {
    this.initTracks();

    this.tracks.push(track);
  }

  public deleteTrack(track: Track): void {
    this.initTracks();

    this.tracks = this.tracks.filter(
      (favoriteTrack: Track): boolean => favoriteTrack.id !== track.id,
    );
  }

  public getTracks(): Track[] {
    return this.tracks ?? [];
  }

  private initAlbums(): void {
    if (this.albums === undefined) {
      this.albums = [];
    }
  }

  private initArtists(): void {
    if (this.artists === undefined) {
      this.artists = [];
    }
  }

  private initTracks(): void {
    if (this.tracks === undefined) {
      this.tracks = [];
    }
  }
}
