import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export abstract class NavigationException {
  static forbidden() {
    return abortNavigation({
      statusCode: StatusCodes.FORBIDDEN,
      statusMessage: ReasonPhrases.FORBIDDEN,
    });
  }

  static notFound() {
    return abortNavigation({
      statusCode: StatusCodes.NOT_FOUND,
      statusMessage: ReasonPhrases.NOT_FOUND,
    });
  }

  static unauthorized() {
    return abortNavigation({
      statusCode: StatusCodes.UNAUTHORIZED,
      statusMessage: ReasonPhrases.UNAUTHORIZED,
    });
  }
}
