import 'reflect-metadata';
import {Container} from 'inversify';
import Application from './app/application.js';
import {Component} from './types/component.types.js';
import LoggerService from './common/logger/logger.service.js';
import ConfigService from './common/config/config.service.js';
import {IConfig} from './common/config/config.interface.js';
import {ILogger} from './common/logger/logger.interface.js';
import {UserEntity, UserModel} from './modules/user/user.entity.js';
import {types} from '@typegoose/typegoose';
import DatabaseService from './common/database-client/database.service.js';
import {IUserService} from './modules/user/user-service.interface.js';
import {IDatabase} from './common/database-client/database.interface.js';
import UserService from './modules/user/user.service.js';
import {IMovieService} from './modules/movie/movie-service.interface.js';
import MovieService from './modules/movie/movie.service.js';
import {MovieEntity, MovieModel} from './modules/movie/movie.entity.js';
import {CommentEntity, CommentModel} from './modules/comment/comment.entity.js';
import {MoviesToWatchEntity, MoviesToWatchModel} from './modules/movies-to-watch/movies-to-watch.entity.js';
import MoviesToWatchService from './modules/movies-to-watch/movies-to-watch.service.js';
import {PromoMoveModel, PromoMovieEntity} from './modules/promo-movie/promo-movie.entity.js';
import {IPromoMovieService} from './modules/promo-movie/promo-movie-service.interface.js';
import PromoMovieService from './modules/promo-movie/promo-movie.service.js';
import CommentService from './modules/comment/comment.service.js';
import {ICommentService} from './modules/comment/comment-service.interface.js';
import {IMoviesToWatchService} from './modules/movies-to-watch/movies-to-watch.interface.js';

const appContainer = new Container();
appContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
appContainer.bind<ILogger>(Component.ILogger).to(LoggerService).inSingletonScope();
appContainer.bind<IConfig>(Component.IConfig).to(ConfigService).inSingletonScope();
appContainer.bind<IDatabase>(Component.IDatabase).to(DatabaseService).inSingletonScope();
appContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
appContainer.bind<types.ModelType<MovieEntity>>(Component.MovieModel).toConstantValue(MovieModel);
appContainer.bind<types.ModelType<PromoMovieEntity>>(Component.PromoMovieModel).toConstantValue(PromoMoveModel);
appContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
appContainer.bind<types.ModelType<MoviesToWatchEntity>>(Component.MoviesToWatchModel).toConstantValue(MoviesToWatchModel);
appContainer.bind<IUserService>(Component.IUserService).to(UserService);
appContainer.bind<IMovieService>(Component.IMovieService).to(MovieService);
appContainer.bind<IPromoMovieService>(Component.IPromoMovieService).to(PromoMovieService);
appContainer.bind<ICommentService>(Component.ICommentService).to(CommentService);
appContainer.bind<IMoviesToWatchService>(Component.ICommentService).to(MoviesToWatchService);

const app = appContainer.get<Application>(Component.Application);
await app.init();
