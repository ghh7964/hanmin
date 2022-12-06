        // Most of this is by Daniel Shiffman
        // http://codingtra.in
        // Steering Text Paths
        // I changed the words
        //for sam kendizora

        /*
        YT URL : https://youtu.be/4hA7G3gup-4
        Coding Challenge #59: 'Steering Behaviors' By Daniel Shiffman

        “Steering Behavior Text” by Isaac J Garcia
        http://openprocessing.org/sketch/1639801
        License CreativeCommons Attribution NonCommercial ShareAlike
        https://creativecommons.org/licenses/by-nc-sa/3.0


        Font Name: Gmarket Sans
        */

        var today = new Date();
        var today_information = String(today.getFullYear() + '/' + Number(today.getMonth() + 1) +  '/' + today.getDate());
        

        var font;
        var vehicles = [];

        var texts = [today_information, '나라를_사랑하고', '함께_나누며', '미래를_준비하는', '한민인'];
        var nextT = 0;
        var maxChangeForce = 20;

        var instructions = [];
        var insText = 'HANMAP';

        function preload() {
            font = loadFont('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff');
        }

        function setup() {
            var cMain = createCanvas(document.querySelector('#p5main').offsetWidth, 400);
            cMain.parent('p5main');
            vehicles=[];
            instructions=[];

            background(51);

            var bounds = font.textBounds(texts[nextT], 0, 0, 192);
            var posx = width / 2 - bounds.w / 2;
            var posy = height / 2 + bounds.h / 2;

            var points = font.textToPoints(texts[nextT], posx, posy, 192, {
                sampleFactor: 0.1
            });

            for (var i = 0; i < points.length; i++) {
                var pt = points[i];
                var vehicle = new Vehicle(pt.x, pt.y);
                vehicles.push(vehicle);
            }

            var boundsIns = font.textBounds(insText, 0, 0, 30);
            var posxIns = width / 2 - boundsIns.w / 2;
            var posyIns = height / 6 + boundsIns.h / 2;

            var insAr = split(insText, ' ');

            for (var i = 0; i < insAr.length; i++) {
                var bounds2 = font.textBounds(insAr[i], 0, 0, 30);
                var posx2 = posxIns;
                var posy2 = posyIns;

                posxIns += bounds2.w + 10;

                var points2 = font.textToPoints(insAr[i], posx2, posy2, 30, {
                    sampleFactor: 0.3
                });

                for (var j = 0; j < points2.length; j++) {
                    var pt = points2[j];
                    var v = new Vehicle(pt.x, pt.y, 3);
                    instructions.push(v);
                }
            }
        }

        function windowResized() {
            resizeCanvas(document.querySelector('#p5main').offsetWidth, 400);
            setup();
        }

        function draw() {
            background(51);

            for (var i = 0; i < instructions.length; i++) {
                var v = instructions[i];
                v.behaviors();
                v.update();
                v.show();
            }

            for (var i = 0; i < vehicles.length; i++) {
                var v = vehicles[i];
                v.behaviors();
                v.update();
                v.show();
            }
        }

        function mouseClicked() {
            nextT++;
            if (nextT > texts.length - 1) {
                nextT = 0;
            }

            var bounds = font.textBounds(texts[nextT], 0, 0, 192);
            var posx = width / 2 - bounds.w / 2;
            var posy = height / 2 + bounds.h / 2;

            var points = font.textToPoints(texts[nextT], posx, posy, 192, {
                sampleFactor: 0.1
            });

            if (points.length < vehicles.length) {
                var toSplice = vehicles.length - points.length;
                vehicles.splice(points.length - 1, toSplice);

                for (var i = 0; i < points.length; i++) {
                    vehicles[i].target.x = points[i].x;
                    vehicles[i].target.y = points[i].y;

                    var force = p5.Vector.random2D();
                    force.mult(random(maxChangeForce));
                    vehicles[i].applyForce(force);
                }
            } else if (points.length > vehicles.length) {

                for (var i = vehicles.length; i < points.length; i++) {
                    var v = vehicles[i - vehicles.length].clone();

                    vehicles.push(v);
                }

                for (var i = 0; i < points.length; i++) {
                    vehicles[i].target.x = points[i].x;
                    vehicles[i].target.y = points[i].y;

                    var force = p5.Vector.random2D();
                    force.mult(random(maxChangeForce));
                    vehicles[i].applyForce(force);
                }

            } else {
                for (var i = 0; i < points.length; i++) {
                    vehicles[i].target.x = points[i].x;
                    vehicles[i].target.y = points[i].y;

                    var force = p5.Vector.random2D();
                    force.mult(random(maxChangeForce));
                    vehicles[i].applyForce(force);
                }
            }
        }