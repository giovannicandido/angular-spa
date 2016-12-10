/**
 * Add barrels and stuff
 * Adjust as necessary for your application needs.
 */


(function (global) {
    var packages = [];
    var ngPackageNames = [
        'auth',
        'logger'
    ];
    function packIndex(pkgName) {
        packages['dist/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }

    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = packIndex;
    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);
    System.config({
        packages: packages
    });
})(this);
