export { default as uniqueId } from 'lodash/uniqueId';
import type { InjectionKey } from 'vue'
export const tabSymbol = Symbol('tabs') as InjectionKey<string>;
