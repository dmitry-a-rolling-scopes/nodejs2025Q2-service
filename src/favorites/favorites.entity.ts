import { IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from '../common/uuid.type';
import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';
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

  @ManyToMany((): typeof Album => Album)
  albums: Album[];

  @ManyToMany((): typeof Artist => Artist)
  artists: Artist[];

  @ManyToMany((): typeof Track => Track)
  tracks: Track[];

  public addAlbum(album: Album): void {
    this.albums.push(album);
  }

  public deleteAlbum(album: Album): void {
    this.albums = this.albums.filter(
      (favoriteAlbum: Album): boolean => favoriteAlbum.id !== album.id,
    );
  }

  public addArtist(artist: Artist): void {
    this.artists.push(artist);
  }

  public deleteArtist(artist: Artist): void {
    this.artists = this.artists.filter(
      (favoriteArtist: Artist): boolean => favoriteArtist.id !== artist.id,
    );
  }

  public addTrack(track: Track): void {
    this.tracks.push(track);
  }

  public deleteTrack(track: Track): void {
    this.tracks = this.tracks.filter(
      (favoriteTrack: Track): boolean => favoriteTrack.id !== track.id,
    );
  }
}
