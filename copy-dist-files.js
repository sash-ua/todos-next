var fs = require('fs-extra');
var glob = require("glob");

// resources[0] = source folder, resources[1] = destination folder.
var resources = ['src/assets/img', 'dist/assets/img'];
function paths( arr ) {
    return new Promise(function(resolve, reject){
        var lInd = arr.length-1;
        arr.forEach(function(v, i, arr){
            fs.ensureDir(v)
                .then(function() {
                    if(i === lInd)resolve(arr);
                })
                .catch(function ( err ) {
                    reject(err);
                });
        });
    });
}
paths(resources)
    .then(function ( r ) {
        fs.copy(r[0], r[1])
            .then( function(r) {
                console.log('Copied successed!');
            })
            .catch(function ( err ) {
                console.error(err);
            });
    })
    .catch(function ( err ) {
        console.error(err);
    });
// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
