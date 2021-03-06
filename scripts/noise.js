function visualsNoisy(visualsPositions, tempo) {
    // visualsPositions: Spielzeit, detune, frequency, Q und gain der gespielten Töne

    translate(videoWidth / 2, videoHeight / 2);
    
    let currentTime = context.currentTime;
    let RESCALE = 2;
    let MAXTRANSPARENCY = 20;   // Maximale Transparenz eines Layers der Visualisierung
    let VISUSIZE = 100 * RESCALE;          // Größe der Visualisierung
    let MOVEAREA = 100 * RESCALE;          // Größe der Visualisierung
    let STEP = 3 * RESCALE;               // Schrittgröße

    /*************
     ** Sound 1 **
     *************/
    // Rechts Lila
    // Wenn keine Einträge zu Sound 1 vorhanden sind, wurden noch keine gespielt und es muss nichts visualisiert werden
    if (visualsPositions[1].length) {
        
        // Nur die letzten 3 Sounds werden visualisiert
        let lastSounds = visualsPositions[1].slice(Math.max(visualsPositions[1].length - 5, 0))
        for (soundElement in lastSounds) {
            
            let time = lastSounds[soundElement][0];     // Spielzeit des Sounds
            
            // Nur die Sounds der letzten 2 Sekunden werden Visualisiert
            if (currentTime >= time && currentTime - 2 <= time) {
                
                let deltaSound = currentTime - time;                    // Zeit die seit dem letzten Sound vergangen ist
                let noiseMax1 = map(deltaSound, 0, 1, 0.65, 0, true);   // Noise-Wiederhohlung
                let noiseHeight1 = map(deltaSound, 0, 1, 100, 0, true); // Noise-Höhe
                let color1 = {
                    r: map(lastSounds[soundElement][3], 0, 40, 74, 131, true),
                    g: map(lastSounds[soundElement][3], 0, 40, 6, 42, true),
                    b: map(lastSounds[soundElement][3], 0, 40, 127, 234, true),
                    a: map(deltaSound, 0, 1, MAXTRANSPARENCY, 0, true)
                };
                let position1 = createVector(
                    map(lastSounds[soundElement][3], 0, 40, -MOVEAREA*1.5, 0, true),
                    map(lastSounds[soundElement][1], 50, 5000, MOVEAREA, -MOVEAREA, true)
                );                                                      // Position der Visualisierung
                let movement1 = createVector(0, 0);                     // Positionsveränderung der aktuellen Visualisierung gegenüber der vorherigen
                
                // Visualisierung aus mehreren Layern erzeugen
                for (let i = VISUSIZE; i > 0; i -= STEP) {
                    
                    // Erst bei der 2. Visualisierung kann eine Bewegung zwischen ihnen berechnet werden
                    if (soundElement > 0) {
                        movement1.set( 
                        map(lastSounds[soundElement - 1][3] - lastSounds[soundElement][3], -.1, .1, -.01, .01) * i, 
                        map(lastSounds[soundElement - 1][1] - lastSounds[soundElement][1], 100, -100, .1, -.1) * i
                        )};
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
            }
        }
    }

    /*************
     ** Sound 2 **
     *************/
    // Links Grün
    if (visualsPositions[2].length) {
        let lastSounds = visualsPositions[2].slice(Math.max(visualsPositions[2].length - 5, 0))
        for (soundElement in lastSounds) {
            let time = lastSounds[soundElement][0];
            if (currentTime >= time && currentTime - 0.5 <= time) {
                let deltaSound = currentTime - time;
                let noiseMax2 = map(deltaSound, 0, 1, 0.65, 0, true);
                let noiseHeight2 = map(deltaSound, 0, 1, 100, 0, true);

                let color2 = {
                    // r: lastSounds[soundElement][3] > 10 ? 0                                                       : map(lastSounds[soundElement][3], 10, 40, 0, 97, true),
                    // g: lastSounds[soundElement][3] > 10 ? map(lastSounds[soundElement][3], 0, 10, 63, 255, true) : map(lastSounds[soundElement][3], 10, 40, 255, 248, true),
                    // b: lastSounds[soundElement][3] > 10 ? map(lastSounds[soundElement][3], 0, 10, 67, 204, true) : map(lastSounds[soundElement][3], 10, 40, 204, 127, true),
                    r: lastSounds[soundElement][3] > 20 ? 0                                                      : map(lastSounds[soundElement][3], 20, 40, 0, 97, true),
                    g: lastSounds[soundElement][3] > 20 ? map(lastSounds[soundElement][3], 0, 20, 63, 248, true) : map(lastSounds[soundElement][3], 20, 40, 248, 255, true),
                    b: lastSounds[soundElement][3] > 20 ? map(lastSounds[soundElement][3], 0, 20, 67, 127, true) : map(lastSounds[soundElement][3], 20, 40, 127, 204, true),
                    a: map(deltaSound, 0, 1, MAXTRANSPARENCY/4*3, 0, true)
                };
                let position2 = createVector(
                    map(lastSounds[soundElement][3], 0, 40, MOVEAREA*1.5, 0, true),       // Gain on X { x: 0 <= x <= 1 }
                    map(lastSounds[soundElement][1], 10, 2000, MOVEAREA, -MOVEAREA, true) // Frequency on Y { x: 500 <= x <= 5000 }
                );
                let movement2 = createVector(0, 0);
                for (let i = VISUSIZE; i > 0; i -= STEP) {
                    if (soundElement > 0) {
                        movement2.set( 
                        map(lastSounds[soundElement - 1][3] - lastSounds[soundElement][3], .02, -.02, .005, -.005) * i, 
                        map(lastSounds[soundElement - 1][1] - lastSounds[soundElement][1], 100, -100, .2, -.2) * i
                    )};
                    noStroke();
                    fill(color2.r,color2.g,color2.b,color2.a - (i/2));
                    beginShape();
                    for (let a = 0; a < TWO_PI; a += 0.01) {
                        let xoff = map(cos(a), -1, 1, 0, noiseMax2, true);
                        let yoff = map(sin(a), -1, 1, 0, noiseMax2, true) + 10;
                        let r = map(noise(xoff, yoff), 0, 1, VISUSIZE * 2, VISUSIZE * 2 + noiseHeight2, true) - (i*4);
                        let x = r > 0 ? r * cos(a) + position2.x + movement2.x : 0;
                        let y = r > 0 ? r * sin(a) + position2.y + movement2.y : 0;
                        vertex(x, y);
                    }
                    endShape(CLOSE);
                }
            }
        }
    }

    /*************
     * Spherical *
     *************/
    if (sphereIsPlaying) {
        let midSphereFilter = {
            gain : { value: 0 },
            frequency : { value: 2495 },
            Q : { value: 1.25 }
        };
        let noiseMaxSpheric = map(sphereFilter.gain.value, -40, 40, 0, 0.65, true);
        let noiseHeightSpheric = map(sphereFilter.gain.value, -40, 40, 0, 100, true);
        let colorSpheric = {
            r: sphereFilter.gain.value < 0 ? map(sphereFilter.gain.value, 0, -40, 0, 28, true) : map(sphereFilter.gain.value, 0, 40, 28, 61, true),
            g: sphereFilter.gain.value < 0 ? map(sphereFilter.gain.value, 0, -40, 0, 39, true) : map(sphereFilter.gain.value, 0, 40, 39, 216, true),
            b: sphereFilter.gain.value < 0 ? map(sphereFilter.gain.value, 0, -40, 102, 255, true) : map(sphereFilter.gain.value, 0, 40, 255, 242, true),
            a: map(sphereFilter.gain.value, -40, 40, 0, MAXTRANSPARENCY*2, true)
        };
        let positionSpheric = createVector(
            map(sphereFilter.frequency.value, 10, 5000, -MOVEAREA, MOVEAREA, true), // Frequency on X { x: 500 <= x <= 5000 }
            map(sphereFilter.gain.value, -40, 40, 0, -MOVEAREA*2, true) // gain on Y { x: 0 <= x <= 0.5 }
        );
        let movementSpheric = createVector(0, 0)
        for (let i = VISUSIZE; i > 0; i -= STEP) {
            movementSpheric.set( 
                map(midSphereFilter.frequency.value - sphereFilter.frequency.value, 2495, -2495, -.1, .1) * i, 
                map(midSphereFilter.gain.value - sphereFilter.gain.value, 20, -20, .1, -.1) * i);
            noStroke();
            fill(colorSpheric.r,colorSpheric.g,colorSpheric.b,colorSpheric.a - (i/2));
            beginShape();
            for (let a = 0; a < TWO_PI; a += 0.01) {
                let xoff = map(cos(a), -1, 1, 0, noiseMaxSpheric, true) + 10;
                let yoff = map(sin(a), -1, 1, 0, noiseMaxSpheric, true);
                let r = map(noise(xoff, yoff), 0, 1, VISUSIZE * 2, VISUSIZE * 2 + noiseHeightSpheric, true) - (i*4);
                let x = r > 0 ? r * cos(a) + positionSpheric.x + movementSpheric.x : 0;
                let y = r > 0 ? r * sin(a) + positionSpheric.y + movementSpheric.y : 0;
                vertex(x, y);
            }
            endShape(CLOSE);
        }
    }

    /************
     *** Beat ***
     ************/
    if (visualsPositions[0].length) {
        let noiseMaxBeat = 0;
        let noiseHeightBeat = 0;
        let transparencyBeat = 0;
        let lastSound = visualsPositions[0][visualsPositions[0].length -1][0]; // Spielzeit vom letzten Sound
        let deltaSound = context.currentTime - lastSound; // Zeit die seit dem letzten Sound vergangen ist
        if (deltaSound < 2) {
            //radiusBeat = map(deltaSound, 0, 2, 50, 0, true);
            noiseMaxBeat = map(deltaSound, 0, 4, 0.65, 0, true);
            noiseHeightBeat = map(deltaSound, 0, 4, 100, 0, true);
            transparencyBeat = map(deltaSound, 0, 2, MAXTRANSPARENCY, 0, true);
        }
        for (let i = VISUSIZE; i > 0; i -= STEP) {
            noStroke();
            fill(255, 255, 255, transparencyBeat );//- (i/2));
            beginShape();
            for (let a = 0; a < TWO_PI; a += 0.01) {
                let xoff = map(cos(a), -1, 1, 0, noiseMaxBeat, true);
                let yoff = map(sin(a), -1, 1, 0, noiseMaxBeat, true);
                let r = map(noise(xoff, yoff), 0, 1, VISUSIZE * 2, VISUSIZE * 2 + noiseHeightBeat, true) - (i*4);
                let x = r > 0 ? r * cos(a) : 0;
                let y = r > 0 ? r * sin(a) : 0;
                vertex(x, y);
            }
            endShape(CLOSE);
        }
    }

    translate(-videoWidth / 2, -videoHeight / 2);
}