import HTTP from './config/http';
import alogic_http from 'alogic-http'

let instance = alogic_http.instance;
instance.init({ service :HTTP.SERVICE });
instance.generateServiceFactory();
const HTTP$ = instance.serviceHooks;

// console.log( HTTP$)

export { HTTP$ };