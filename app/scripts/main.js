require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore/underscore',
        bootstrapAffix: '../bower_components/sass-bootstrap/js/affix',
        bootstrapAlert: '../bower_components/sass-bootstrap/js/alert',
        bootstrapButton: '../bower_components/sass-bootstrap/js/button',
        bootstrapCarousel: '../bower_components/sass-bootstrap/js/carousel',
        bootstrapCollapse: '../bower_components/sass-bootstrap/js/collapse',
        bootstrapDropdown: '../bower_components/sass-bootstrap/js/dropdown',
        bootstrapPopover: '../bower_components/sass-bootstrap/js/popover',
        bootstrapScrollspy: '../bower_components/sass-bootstrap/js/scrollspy',
        bootstrapTab: '../bower_components/sass-bootstrap/js/tab',
        bootstrapTooltip: '../bower_components/sass-bootstrap/js/tooltip',
        bootstrapTransition: '../bower_components/sass-bootstrap/js/transition',
        horizontal: 'animations/horizontal'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        bootstrapAffix: {
            deps: ['jquery']
        },
        bootstrapAlert: {
            deps: ['jquery']
        },
        bootstrapButton: {
            deps: ['jquery']
        },
        bootstrapCarousel: {
            deps: ['jquery']
        },
        bootstrapCollapse: {
            deps: ['jquery']
        },
        bootstrapDropdown: {
            deps: ['jquery']
        },
        bootstrapPopover: {
            deps: ['jquery']
        },
        bootstrapScrollspy: {
            deps: ['jquery']
        },
        bootstrapTab: {
            deps: ['jquery']
        },
        bootstrapTooltip: {
            deps: ['jquery']
        },
        bootstrapTransition: {
            deps: ['jquery']
        }
    }
});

require(['app', 'jquery', 'horizontal'], function (app, $, Horizontal) {
    'use strict';
    //setup globals here
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };

    window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

    // use app here

    //set canvas images 1, 2, 3

    //canvas horizontal
    var background = new Horizontal;
    var midStill = new Horizontal;
    var horizontalOne = new Horizontal;
    var horizontalTwo = new Horizontal;
    var horizontalThree = new Horizontal;
    var horizontalFour = new Horizontal;

    //https://mdn.mozillademos.org/files/1456/Canvas_sun.png
    //https://mdn.mozillademos.org/files/4553/Capitan_Meadows,_Yosemite_National_Park.jpg

    background.init('background', 'images/wave3.png',0.5, function(context){
        background.horizontalRight(context);
    });

    midStill.init('mid-still', 'images/wave4.png', 0.5, function(context){
        midStill.stillFrame(context);
    });

    horizontalOne.init('canvas-one', 'images/wave1.png',0.5, function(context){
        horizontalOne.rightLeft(context);
    });

    horizontalTwo.init('canvas-two', 'images/wave2.png', 1, function(context){
        horizontalTwo.sineRight(context);
    });

    horizontalThree.init('canvas-three', 'images/wave1.png', 2, function(context){
        horizontalThree.sineRight(context);
    });

    horizontalFour.init('canvas-four', 'images/wave1.png', 1.5, function(context){
        horizontalFour.sineRight(context);
    });

    $('body').on('click', '.stop', function(){
        horizontalOne.stop();
    });

    $('body').on('click', '.start', function(){
        horizontalOne.init('canvas-one', 'https://mdn.mozillademos.org/files/4553/Capitan_Meadows,_Yosemite_National_Park.jpg', 1, function(context){
            console.log('callback');
            horizontalOne.horizontalRight(context);
        });
    });

    //canvas vertical



//    console.log(app);
//    console.log('Running jQuery %s', $().jquery);
});
