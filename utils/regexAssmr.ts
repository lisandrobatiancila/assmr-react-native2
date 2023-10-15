export const EMAIL_REGEX =
  /^[a-zA-Z0-9]+(?:[_.-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-][a-zA-Z0-9]+)*\[a-zA-Z]{2,3}$/;

export const FIRST_ZERO_REGEX = /^0/;

export const NON_DIGIT = /\/g;

export const PHONENUMBER_REGEX = /^(9)\{9}$/g;
export const PHONENUMBER_ZERO_REGEX = /^(09)\{9}$/g;
export const LETTER_AND_DASHES_ONLY = /^[a-z- \C0-\FF]+$/i;
export const LETTER_AND_NUMBER_ONLY = /^[a-zA-Z0-9 ]*$/;
export const LETTERS_AND_SPACES_ONLY = /^[A-Za-z\]*$/;
export const MANY_UNDERSCORE = /_/g;
export const UNDERSCORES = /_/g;
export const ALL_WHITESPACES = /\/g;
export const PHONENUMBER_WITH_SPACES_REGEX =
  /^(09)+\{2}\\{3}\\{4}$/g;
export const PHONENUMBER_WITH_DASHES_REGEX = /([+]?\{1,2}[.-\]?)/g;
export const PHONENUMBER_WITH_DIFFERENT_FORM_REGEX =
  /([+]?\{1,2}[.-\]?)?(\{3}[.-\]?){2}\{4}/g;
export const DASHES = /-/g;
export const PARENTHESIS_REGEX = /[()]/g;
export const NUMBER_REGEX = /^[0-9.]+$/;
export const APP_VERSION_LAST_VERSION_REGEX = /\+$/;
export const NAME_ACCEPTED_STRING = /^[A-Za-z 'ñÑ/-]+$/;
export const WHOLE_NUMBER_REGEX = /^[0-9]+$/;
