export { default as en } from './en';
export { default as ru } from './ru';
export { default as uk } from './uk';

export type I18n = (typeof import('./en'))['default'];
