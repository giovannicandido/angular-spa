import nodeResolve from 'rollup-plugin-node-resolve';
export default {
  entry: 'dist/index.js',
  plugins: [
    nodeResolve({
      
    })
  ],
  dest: 'dist/bundles/angular-spa.umd.js',
  sourceMap: false,
  format: 'umd',
  context: 'this',
  onwarn: function (warning) {
        // Suppress this error message... there are hundreds of them. Angular team says to ignore it.
        // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
        if (warning.code === 'THIS_IS_UNDEFINED'){
            return;
        }
        console.error(warning.message);
    },
  moduleName: 'angularSpa',
  external: [
    '@angular/core',
    '@angular/http',
    '@angular/common',
    '@angular/router',
    'angular-http-interceptor',
    'rxjs/add/observable/fromPromise',
    'rxjs/Observable',
    'rxjs/Subject',
    'rxjs/add/operator/mergeMap'
  ],
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/http': 'ng.http',
    '@angular/router': 'ng.router',
    'angular-http-interceptor': 'angularHttpInterceptor',
    'rxjs/Observable': 'Rx',
    'rxjs/Subject': 'Rx',
    'rxjs/add/operator/map': 'Rx.Observable.prototype',
    'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
    'rxjs/add/observable/fromEvent': 'Rx.Observable',
    'rxjs/add/observable/of': 'Rx.Observable'
  }
}