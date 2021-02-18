function fakeVisualsNoisy(counter, color, pos) {
    
    let currentTime = Date.now();
    let RESCALE = 2;
    let MAXTRANSPARENCY = 20;   // Maximale Transparenz eines Layers der Visualisierung
    let VISUSIZE = 100 * RESCALE;          // Größe der Visualisierung
    let MOVEAREA = 100 * RESCALE;          // Größe der Visualisierung
    let STEP = 3 * RESCALE;               // Schrittgröße

    /*************
     ** Sound 1 **
     *************/
    let noiseMax1 = map(counter[1], 0, 20000, 0.65, 0, true);   // Noise-Wiederhohlung
    let noiseHeight1 = map(counter[1], 0, 20000, 100, 0, true); // Noise-Höhe
    let color1 = {
        r: map(color[1], 0, 5, 74, 131, true),
        g: map(color[1], 0, 5, 6, 42, true),
        b: map(color[1], 0, 5, 127, 234, true),
        a: map(counter[1], 0, 20000, MAXTRANSPARENCY/2, 0, true)
    };
    let position1 = createVector(
        map(color[1], 10, 0, -window.innerWidth/2 + 300, -window.innerWidth/2, true),
        map(pos[1], 500, 5000, window.innerHeight/2 - 200, window.innerHeight/2 + 200, true)
    );
    let movement1 = createVector(0, 0); 

    // /*************
    //  ** Sound 2 **
    //  *************/
    let noiseMax2 = map(counter[2], 0, 20000, 0.65, 0, true);   // Noise-Wiederhohlung
    let noiseHeight2 = map(counter[2], 0, 20000, 100, 0, true); // Noise-Höhe
    let color2 = {
        r: color[2] < 5 ? 0                                    : map(color[2], 5, 10, 0, 97, true),
        g: color[2] < 5 ? map(color[2], 0, 2.5, 63, 255, true) : map(color[2], 5, 10, 255, 248, true),
        b: color[2] < 5 ? map(color[2], 0, 2.5, 67, 204, true) : map(color[2], 5, 10, 204, 127, true),
        // r: 97,
        // g: 248,
        // b: 127,
        a: map(counter[2], 0, 20000, MAXTRANSPARENCY/4, 0, true)
    };
    let position2 = createVector(
        map(color[2], 10, 0, -window.innerWidth/2 - 300, -window.innerWidth/2, true),
        map(pos[2], 500, 5000, window.innerHeight/2 - 200, window.innerHeight/2 + 200, true)
    );
    let movement2 = createVector(0, 0); 

    /*************
     ** Beat **
     *************/
    let noiseMaxBeat = map(counter[0], 0, 20000, 0.65, 0, true);
    let noiseHeightBeat = map(counter[0], 0, 20000, 100, 0, true);
    let transparencyBeat = map(counter[0], 0, 10000, MAXTRANSPARENCY, 0, true);
    let positionBeat = createVector(
        -window.innerWidth/2,
        window.innerHeight/2
    );


    for (let i = VISUSIZE; i > 0; i -= STEP) {
            
        noStroke();
        fill(color1.r,color1.g,color1.b,color1.a*2);// - (i/2));
        
        // Form der Visualisierung erzeugen aus Punkten die einem verformten Kreis folgen
        beginShape();
        for (let a = 0; a < TWO_PI; a += 0.01) {
            let xoff = map(cos(a), -1, 1, 0, noiseMax1, true);
            let yoff = map(sin(a), -1, 1, 0, noiseMax1, true) - 10;
            let r = map(noise(xoff, yoff), 0, 1, VISUSIZE * 2, VISUSIZE * 2 + noiseHeight1, true) - (i*4);
            let x = r > 0 ? r * cos(a) + position1.x + movement1.x : 0;
            let y = r > 0 ? r * sin(a) + position1.y + movement1.y : 0;
            vertex(x, y);
        }
        endShape(CLOSE);
    }

    for (let i = VISUSIZE; i > 0; i -= STEP) {
            
        noStroke();
        fill(color2.r,color2.g,color2.b,color2.a*2);
        // fill(255, 0,0,50)
        
        // Form der Visualisierung erzeugen aus Punkten die einem verformten Kreis folgen
        beginShape();
        for (let a = 0; a < TWO_PI; a += 0.01) {
            let xoff = map(cos(a), -1, 1, 0, noiseMax2, true);
            let yoff = map(sin(a), -1, 1, 0, noiseMax2, true) - 10;
            let r = map(noise(xoff, yoff), 0, 1, VISUSIZE * 2, VISUSIZE * 2 + noiseHeight2, true) - (i*4);
            let x = r > 0 ? r * cos(a) + position2.x + movement2.x : 0;
            let y = r > 0 ? r * sin(a) + position2.y + movement2.y : 0;
            vertex(x, y);
        }
        endShape(CLOSE);
    }

    for (let i = VISUSIZE; i > 0; i -= STEP) {
            
        noStroke();

        fill(255, 255, 255, transparencyBeat);
        
        // Form der Visualisierung erzeugen aus Punkten die einem verformten Kreis folgen
        beginShape();
        for (let a = 0; a < TWO_PI; a += 0.01) {
            let xoff = map(cos(a), -1, 1, 0, noiseMaxBeat, true);
            let yoff = map(sin(a), -1, 1, 0, noiseMaxBeat, true) - 10;
            let r = map(noise(xoff, yoff), 0, 1, VISUSIZE * 2, VISUSIZE * 2 + noiseHeightBeat, true) - (i*4);
            let x = r > 0 ? r * cos(a) + positionBeat.x : 0;
            let y = r > 0 ? r * sin(a) + positionBeat.y : 0;
            vertex(x, y);
        }
        endShape(CLOSE);
    }
}