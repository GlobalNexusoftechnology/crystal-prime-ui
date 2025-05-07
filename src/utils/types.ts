/**
 * The expected value of the input to be passed under validation utils.
 */
export type TValue = string | number | boolean | string[];

/**
 * Provides instances of supported locales.
 * This is duplicated from `packages/i18n` to avoid dependencies here.
 */
export type TLocale = 'en' | 'ar';

export type TTranslatedText = Record<TLocale, string>;

/**
 * Provides a strongly typed text string based on locale.
 * This is duplicated from `packages/i18n` to avoid dependencies here.
 */
export type TTextLocalized = string | TTranslatedText;

/**
 * Error type for handling non form field errors. Useful for denoting errors
 * customized for the UI
 */
export type TUIError = {
  message: string | TTextLocalized;
  description?: string | TTextLocalized;
} | null;

/**
 * Value of the error returned/displayed on the UI
 */
export type TError = TTextLocalized | undefined;
