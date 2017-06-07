/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as import0 from '@angular/core';
import * as import1 from './auth.module';
import * as import2 from '@angular/http';
import * as import3 from '../logger/logger.module';
import * as import4 from 'angular-http-interceptor/interceptor.module';
import * as import5 from './auth.service';
import * as import6 from '../logger/logger.service';
import * as import7 from './guards/login-guard';
import * as import8 from './listeners/keycloak.listener';
import * as import9 from './dom/dom.service';
import * as import10 from './interceptors/refresh-token-http-interceptor';
import * as import11 from '@angular/router';
import * as import12 from 'angular-http-interceptor/interfaces';
import * as import13 from 'angular-http-interceptor/custom-http';
class AuthModuleInjector extends import0.ɵNgModuleInjector<import1.AuthModule> {
  _HttpModule_0:import2.HttpModule;
  _LoggerModule_1:import3.LoggerModule;
  _InterceptorModule_2:import4.InterceptorModule;
  _AuthModule_3:import1.AuthModule;
  __AuthService_4:import5.AuthService;
  __Logger_5:import6.Logger;
  __Interceptor_6:any[];
  __BrowserXhr_7:import2.BrowserXhr;
  __ResponseOptions_8:import2.BaseResponseOptions;
  __XSRFStrategy_9:any;
  __XHRBackend_10:import2.XHRBackend;
  __RequestOptions_11:import2.BaseRequestOptions;
  __Http_12:any;
  __CustomHttp_13:any;
  __LoginGuard_14:import7.LoginGuard;
  __AppSecurityListener_15:import8.AppSecurityListener;
  __SecDirectiveConfig_16:import9.SecDirectiveConfig;
  constructor(parent:import0.Injector) {
    super(parent,([] as any[]),([] as any[]));
  }
  get _AuthService_4():import5.AuthService {
    if ((this.__AuthService_4 == null)) { (this.__AuthService_4 = new import5.AuthService(this.parent.get(import5.InitOptions),this.parent.get(import5.KEYCLOAK_TYPE,(null as any)))); }
    return this.__AuthService_4;
  }
  get _Logger_5():import6.Logger {
    if ((this.__Logger_5 == null)) { (this.__Logger_5 = new import6.Logger()); }
    return this.__Logger_5;
  }
  get _Interceptor_6():any[] {
    if ((this.__Interceptor_6 == null)) { (this.__Interceptor_6 = [new import10.RefreshTokenHttpInterceptor(this._AuthService_4,this._Logger_5)]); }
    return this.__Interceptor_6;
  }
  get _BrowserXhr_7():import2.BrowserXhr {
    if ((this.__BrowserXhr_7 == null)) { (this.__BrowserXhr_7 = new import2.BrowserXhr()); }
    return this.__BrowserXhr_7;
  }
  get _ResponseOptions_8():import2.BaseResponseOptions {
    if ((this.__ResponseOptions_8 == null)) { (this.__ResponseOptions_8 = new import2.BaseResponseOptions()); }
    return this.__ResponseOptions_8;
  }
  get _XSRFStrategy_9():any {
    if ((this.__XSRFStrategy_9 == null)) { (this.__XSRFStrategy_9 = import2.ɵb()); }
    return this.__XSRFStrategy_9;
  }
  get _XHRBackend_10():import2.XHRBackend {
    if ((this.__XHRBackend_10 == null)) { (this.__XHRBackend_10 = new import2.XHRBackend(this._BrowserXhr_7,this._ResponseOptions_8,this._XSRFStrategy_9)); }
    return this.__XHRBackend_10;
  }
  get _RequestOptions_11():import2.BaseRequestOptions {
    if ((this.__RequestOptions_11 == null)) { (this.__RequestOptions_11 = new import2.BaseRequestOptions()); }
    return this.__RequestOptions_11;
  }
  get _Http_12():any {
    if ((this.__Http_12 == null)) { (this.__Http_12 = import4.httpFactory(this._Interceptor_6,this._XHRBackend_10,this._RequestOptions_11)); }
    return this.__Http_12;
  }
  get _CustomHttp_13():any {
    if ((this.__CustomHttp_13 == null)) { (this.__CustomHttp_13 = this._Http_12); }
    return this.__CustomHttp_13;
  }
  get _LoginGuard_14():import7.LoginGuard {
    if ((this.__LoginGuard_14 == null)) { (this.__LoginGuard_14 = new import7.LoginGuard(this._AuthService_4)); }
    return this.__LoginGuard_14;
  }
  get _AppSecurityListener_15():import8.AppSecurityListener {
    if ((this.__AppSecurityListener_15 == null)) { (this.__AppSecurityListener_15 = new import8.AppSecurityListener(this._AuthService_4,this.parent.get(import11.Router),this._Logger_5)); }
    return this.__AppSecurityListener_15;
  }
  get _SecDirectiveConfig_16():import9.SecDirectiveConfig {
    if ((this.__SecDirectiveConfig_16 == null)) { (this.__SecDirectiveConfig_16 = new import9.SecDirectiveConfig()); }
    return this.__SecDirectiveConfig_16;
  }
  createInternal():import1.AuthModule {
    this._HttpModule_0 = new import2.HttpModule();
    this._LoggerModule_1 = new import3.LoggerModule();
    this._InterceptorModule_2 = new import4.InterceptorModule();
    this._AuthModule_3 = new import1.AuthModule();
    return this._AuthModule_3;
  }
  getInternal(token:any,notFoundResult:any):any {
    if ((token === import2.HttpModule)) { return this._HttpModule_0; }
    if ((token === import3.LoggerModule)) { return this._LoggerModule_1; }
    if ((token === import4.InterceptorModule)) { return this._InterceptorModule_2; }
    if ((token === import1.AuthModule)) { return this._AuthModule_3; }
    if ((token === import5.AuthService)) { return this._AuthService_4; }
    if ((token === import6.Logger)) { return this._Logger_5; }
    if ((token === import12.Interceptor)) { return this._Interceptor_6; }
    if ((token === import2.BrowserXhr)) { return this._BrowserXhr_7; }
    if ((token === import2.ResponseOptions)) { return this._ResponseOptions_8; }
    if ((token === import2.XSRFStrategy)) { return this._XSRFStrategy_9; }
    if ((token === import2.XHRBackend)) { return this._XHRBackend_10; }
    if ((token === import2.RequestOptions)) { return this._RequestOptions_11; }
    if ((token === import2.Http)) { return this._Http_12; }
    if ((token === import13.CustomHttp)) { return this._CustomHttp_13; }
    if ((token === import7.LoginGuard)) { return this._LoginGuard_14; }
    if ((token === import8.AppSecurityListener)) { return this._AppSecurityListener_15; }
    if ((token === import9.SecDirectiveConfig)) { return this._SecDirectiveConfig_16; }
    return notFoundResult;
  }
  destroyInternal():void {
  }
}
export const AuthModuleNgFactory:import0.NgModuleFactory<import1.AuthModule> = new import0.NgModuleFactory<any>(AuthModuleInjector,import1.AuthModule);
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL2hvbWUvZ2lvdmFubmkvUHJvamVjdHMvYXRlbmRlL2FuZ3VsYXItc3BhL3NyYy9hdXRoL2F1dGgubW9kdWxlLm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL2hvbWUvZ2lvdmFubmkvUHJvamVjdHMvYXRlbmRlL2FuZ3VsYXItc3BhL3NyYy9hdXRoL2F1dGgubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIiAiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
