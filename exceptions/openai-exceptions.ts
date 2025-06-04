export enum OPENAI_ERROR_CODE {
  INVALID_API_KEY = "invalid_api_key",
  RATE_LIMIT_EXCEEDED = "rate_limit_exceeded",
  INTERNAL_SERVER_ERROR = "internal_server_error",
  SERVICE_UNAVAILABLE = "service_unavailable",
  BAD_REQUEST = "bad_request",
  UNAUTHORIZED = "unauthorized",
  FORBIDDEN = "forbidden",
  NOT_FOUND = "not_found",
  METHOD_NOT_ALLOWED = "method_not_allowed",
}

export const OPENAI_ERROR_HELPER_MESSAGES = {
  [OPENAI_ERROR_CODE.INVALID_API_KEY]:
    "Your API key is invalid. Please check your API key and try again.",
  [OPENAI_ERROR_CODE.RATE_LIMIT_EXCEEDED]:
    "You have reached the rate limit. Please wait and try again later.",
  [OPENAI_ERROR_CODE.INTERNAL_SERVER_ERROR]:
    "Internal server error. Please try again later.",
  [OPENAI_ERROR_CODE.SERVICE_UNAVAILABLE]:
    "OpenAI service is unavailable. Please try again later.",
  [OPENAI_ERROR_CODE.BAD_REQUEST]:
    "The request you sent is invalid. Please check your request and try again.",
  [OPENAI_ERROR_CODE.UNAUTHORIZED]:
    "You are not authorized to access this resource. Please check your credentials and try again.",
  [OPENAI_ERROR_CODE.FORBIDDEN]:
    "You are forbidden to access this resource. Please check your permissions and try again.",
  [OPENAI_ERROR_CODE.NOT_FOUND]:
    "The requested resource was not found. Please check your request and try again.",
  [OPENAI_ERROR_CODE.METHOD_NOT_ALLOWED]:
    "The method you used is not allowed. Please check your request and try again.",
};

export const OPENAI_ERROR_CODES = Object.values(OPENAI_ERROR_CODE);
