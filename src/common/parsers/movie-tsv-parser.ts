import {IParser} from './parser.interface.js';
import {Movie} from '../../types/movie.type.js';
import {asGenre} from '../../types/genre.type.js';
import {User} from '../../types/user.type.js';

const MOVIE_FIELD_COUNT = 17;

export class MovieTsvParser implements IParser<Movie> {
  parse(s: string): Movie {
    const fields = s.split('\t');
    if (fields.length !== MOVIE_FIELD_COUNT) {
      throw new Error(`Found ${fields.length} fields in movie entry, expected ${MOVIE_FIELD_COUNT}: ${s}`);
    }

    const [
      title,
      description,
      postDate,
      genre,
      releaseYear,
      rating,
      previewUri,
      videoUri,
      cast,
      director,
      runningLengthMin,
      postedByUserName,
      postedByUserEmail,
      postedByUserProfilePictureUri,
      posterUri,
      backgroundImageUri,
      backgroundColor
    ] = fields;

    const postedByUser: User = {
      name: postedByUserName,
      email: postedByUserEmail,
      profilePictureUri: postedByUserProfilePictureUri
    };

    return {
      title,
      description,
      postDate: new Date(postDate),
      genre: asGenre(genre),
      releaseYear: Number.parseInt(releaseYear, 10),
      rating: Number.parseFloat(rating),
      previewUri,
      videoUri,
      cast: cast.split(';'),
      director,
      runningLengthMin: Number.parseInt(runningLengthMin, 10),
      postedByUser,
      posterUri,
      backgroundImageUri,
      backgroundColor
    };
  }
}
