//animations/horizontal.js
'use strict';

define(['jquery', 'underscore'], function($, _){

    function Horizontal() {

        var animation, img, period;
        var canvasX, canvasY, imgW, imgH, x, y, xm, ym, dx = 0; //higher dx is faster

        function sineY(x){
            var amplitude = 50; // wave amplitude
            var freq = 4; // frequency or w
            var phase = 0; // phase angle

            //var f = freq / 2 * Math.PI;

            //Asin(wt);
            return amplitude * Math.sin(freq * 2 * Math.PI * period);
        }

        function xAxis(context, canvas){
            context.beginPath();
            context.moveTo(0, canvas.height/2);
            context.lineTo(canvas.width, canvas.height/2);
            context.stroke();
        }

        function animateHorizontalRight(ctx) {

            //console.log('animagic', img, canvas, ctx, startTime, speed);

            //Clear Canvas
            ctx.clearRect(0,0,canvasX,canvasY);

            //Draw image
            //If image is <= Canvas Size
            if (imgW <= canvasX) {
                //reset, start from beginning
                if (x > (canvasX)) { x = 0; }
                //draw aditional image
                if (x > (canvasX-imgW)) { ctx.drawImage(img,x-canvasX+1,y,imgW,imgH); }
            }
            //If image is > Canvas Size
            else {
                //reset, start from beginning
                if (x > (canvasX)) { x = canvasX-imgW; }
                //draw aditional image
                if (x > (canvasX-imgW)) { ctx.drawImage(img,x-imgW+1,y,imgW,imgH); }
            }

//            console.log(x,y);
            ctx.drawImage(img,x, y,imgW,imgH);
            //amount to move
            x += dx;


            //repeat
            animation = requestAnimationFrame(function(){
                animateHorizontalRight(ctx);
            });
        }

        function animateSineRight(ctx) {


            //Clear Canvas
            ctx.clearRect(0,0,canvasX,canvasY);

            //Draw image


            //Update
            //xAxis(ctx, canvas);
            ctx.fillStyle = "Red";
//            ctx.fillText('x: '+ x, 10, 10);
//            ctx.fillText('y: '+ y, 10, 20);

            //If image is <= Canvas Size
            if (imgW <= canvasX) {
                period = x / canvasX; // period (one cycle)
                //reset, start from beginning
                if (x > (canvasX)) {
                    x = 0;
                }else{
                    y =  sineY(x);
                }
                //draw aditional image
                if (x > (canvasX-imgW)) {
                    var ax = x-canvasX+dx;
                    y =  sineY(x);
                    ctx.drawImage(img, ax, y, imgW, imgH);
                }

            } else {
                period = x / imgW; // period (one cycle)
                //reset, start from beginning
                if (x > canvasX) {
                    x = canvasX-imgW;
                    y = sineY(x);
                }
                //draw aditional image
                if (x > (canvasX-imgW)) {
                    var ax = x-imgW+dx;
                    y =  sineY(ax);
                    ctx.drawImage(img,ax,y,imgW,imgH);
                }
            }

            x += dx;
            ctx.drawImage(img,x, y,imgW,imgH);

//            ctx.fillText('x: '+ x, 10, 10);
//            ctx.fillText('y: '+ y, 10, 20);

            //Repeat animation
            animation = requestAnimationFrame(function(){
                animateSineRight(ctx);
            });
        }

        function animateRightLeft(ctx){
            //Clear Canvas
            ctx.clearRect(0,0,canvasX,canvasY);
            ctx.fillStyle = "Red";
//            ctx.fillText('x: '+ x, 10, 10);


            //Draw image
            //If image is <= Canvas Size
            //If image is <= Canvas Size
            if (imgW <= canvasX) {
                //reset, start from beginning
                if (x === (canvasX - imgW) || x === 0) {
                    dx = dx * -1;
                }
            }
            //If image is > Canvas Size
            else {
                //x =  canvasX - imgW; //x far left
                //x =  0; //x far right
                if (x > 0 || x < canvasX - imgW) {
                    dx = dx * -1;
                }
            }

            ctx.drawImage(img,x, y,imgW,imgH);

//            ctx.fillText('x: '+ x, 10, 10);

            //move x
            x += dx;

//            console.log('x: %d dx: %d', x, dx);

            //repeat
            animation = requestAnimationFrame(function(){
                animateRightLeft(ctx);
            });
        }

        function animateUpDown(ctx){
            //Clear Canvas
            ctx.clearRect(0,0,canvasX,canvasY);
            ctx.fillStyle = "Red";
//            ctx.fillText('y: '+ y, 10, 10);


            //Draw image
            //If image is <= Canvas Size
            if (imgH <= canvasY) {
                if ( y === imgH || y < 0) {
                    dx = dx * -1;
                }
            }
            //If image is > Canvas Size
            else {
                if (y === 0 || y === ym * 2) {
//                    console.log('reset!!!');
                    dx = dx * -1;
                }
            }

            ctx.drawImage(img,x, y,imgW,imgH);

//            ctx.fillText('y: '+ y, 10, 10);

            //move x
            y += dx;
//            console.log(ym);

//            console.log('x: %d dx: %d', x, dx);

            //repeat
            animation = requestAnimationFrame(function(){
                animateUpDown(ctx);
            });
        }

        function still(ctx){
            ctx.clearRect(0,0,canvasX,canvasY);
            ctx.drawImage(img,x, y,imgW,imgH);
        }

        return {
            init: function(canvasId, imgSrc, speed, callback){

                var canvas = document.getElementById(canvasId);
                var ctx = canvas.getContext('2d');
                img = new Image();
                    img.src = imgSrc;
                    dx = speed;
//                    img.width = img.width / 2;
//                    img.height = img.height / 2;

                img.onload = function(){
                    console.log('canvas width', $(canvas).width(), 'img width', img.width);

                    canvasX = $(canvas).width();
                    canvasY = $(canvas).height();
                    canvas.width = canvasX;
                    canvas.height = canvasY;

                    imgW = img.width;
                    imgH = img.height;

                    //center images
                    x = (canvasX * 0.5) - (imgW * 0.5);
                    y = (canvasY * 0.5) - (imgH * 0.5);
                    xm = x;
                    ym = y;

                    return callback(ctx);
                }

            },
            horizontalRight: function(ctx){
                console.log('horizontal right');
                animateHorizontalRight(ctx);

            },
            sineRight: function(ctx){
                console.log('sine right');
                animateSineRight(ctx);

            },
            rightLeft: function(ctx){
                console.log('right left');
                animateRightLeft(ctx);
            },
            bounce: function(ctx){
                console.log('bounce');
                animateUpDown(ctx);
            },
            stillFrame: function(ctx){
                still(ctx);
            },
            stop: function(){
                cancelAnimationFrame(animation);
            }
        }




    }

   return Horizontal;
});
