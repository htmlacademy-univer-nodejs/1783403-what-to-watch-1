import {Container} from 'inversify';
import Application from './app/application.js';
import {Component} from './types/component.types.js';
import {ILogger} from './common/logger/logger.interface.js';
import LoggerService from './common/logger/logger.service.js';
import {IConfig} from './common/config/config.interface.js';
import ConfigService from './common/config/config.service.js';
import {IDatabase} from './common/database-client/database.interface.js';
import DatabaseService from './common/database-client/database.service.js';
import {types} from '@typegoose/typegoose';
import {UserEntity, UserModel} from './modules/user/user.entity.js';
import {MovieEntity, MovieModel} from './modules/movie/movie.entity.js';
import {PromoMoveModel, PromoMovieEntity} from './modules/promo-movie/promo-movie.entity.js';
import {CommentEntity, CommentModel} from './modules/comment/comment.entity.js';
import {MoviesToWatchEntity, MoviesToWatchModel} from './modules/movies-to-watch/movies-to-watch.entity.js';
import {IUserService} from './modules/user/user-service.interface.js';
import UserService from './modules/user/user.service.js';
import {IMovieService} from './modules/movie/movie-service.interface.js';
import MovieService from './modules/movie/movie.service.js';
import {IPromoMovieService} from './modules/promo-movie/promo-movie-service.interface.js';
import PromoMovieService from './modules/promo-movie/promo-movie.service.js';
import {ICommentService} from './modules/comment/comment-service.interface.js';
import CommentService from './modules/comment/comment.service.js';
import {IMoviesToWatchService} from './modules/movies-to-watch/movies-to-watch.interface.js';
import MoviesToWatchService from './modules/movies-to-watch/movies-to-watch.service.js';
import {IExceptionFilter} from './common/errors/exception-filter.interface.js';
import ExceptionFilter from './common/errors/exception-filter.js';
import {IController} from './common/controller/controller.interface.js';
import MovieController from './modules/movie/movie.controller.js';
import MoviesToWatchController from './modules/movies-to-watch/movies-to-watch-controller.js';
import PromoMovieController from './modules/promo-movie/promo-movie.controller.js';
import UserController from './modules/user/user.controller.js';
import CommentController from './modules/comment/comment.controller.js';
import {IMovieRatingService} from './modules/movie/movie-rating-service.interface.js';
import MovieRatingService from './modules/movie/movie-rating.service.js';

export const appContainer = new Container();

appContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
appContainer.bind<ILogger>(Component.ILogger).to(LoggerService).inSingletonScope();
appContainer.bind<IConfig>(Component.IConfig).to(ConfigService).inSingletonScope();
appContainer.bind<IDatabase>(Component.IDatabase).to(DatabaseService).inSingletonScope();

appContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
appContainer.bind<types.ModelType<MovieEntity>>(Component.MovieModel).toConstantValue(MovieModel);
appContainer.bind<types.ModelType<PromoMovieEntity>>(Component.PromoMovieModel).toConstantValue(PromoMoveModel);
appContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
appContainer.bind<types.ModelType<MoviesToWatchEntity>>(Component.MoviesToWatchModel).toConstantValue(MoviesToWatchModel);

appContainer.bind<IUserService>(Component.IUserService).to(UserService).inSingletonScope();
appContainer.bind<IMovieService>(Component.IMovieService).to(MovieService).inSingletonScope();
appContainer.bind<IPromoMovieService>(Component.IPromoMovieService).to(PromoMovieService).inSingletonScope();
appContainer.bind<ICommentService>(Component.ICommentService).to(CommentService).inSingletonScope();
appContainer.bind<IMoviesToWatchService>(Component.IMoviesToWatchService).to(MoviesToWatchService).inSingletonScope();
appContainer.bind<IMovieRatingService>(Component.IMovieRatingService).to(MovieRatingService).inSingletonScope();

appContainer.bind<IExceptionFilter>(Component.IExceptionFilter).to(ExceptionFilter).inSingletonScope();

appContainer.bind<IController>(Component.MovieController).to(MovieController).inSingletonScope();
appContainer.bind<IController>(Component.MoviesToWatchController).to(MoviesToWatchController).inSingletonScope();
appContainer.bind<IController>(Component.PromoMovieController).to(PromoMovieController).inSingletonScope();
appContainer.bind<IController>(Component.UserController).to(UserController).inSingletonScope();
appContainer.bind<IController>(Component.CommentController).to(CommentController).inSingletonScope();
