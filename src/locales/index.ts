export { default as en } from './en';
export { default as ru } from './ru';
export { default as uk } from './uk';
export { default as kk } from './kk';

export type I18n = (typeof import('./en'))['default'];
