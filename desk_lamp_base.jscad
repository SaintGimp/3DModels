function lampBase(shaftLength, shaftDiameter) {
    var floorThickness = 2;
    var clampDiameter = 20;
    var clampRadius = clampDiameter / 2;
    var clampHeight = 21;
    var shaftHeight = floorThickness;
    var baseHeight = shaftLength + shaftHeight;
    var baseTopRadius = (shaftDiameter + 8) / 2;
    var baseBottomRadius = (shaftDiameter + clampDiameter * 2 + 2) / 2;
    
    var shaftCutout = CSG.cylinder({start:[0, 0, shaftHeight], end:[0, 0, shaftHeight + shaftLength + 2], radius: shaftDiameter / 2});
    
    var clampCutout = CSG.cylinder({start: [0, 0, 0], end: [0, 0, clampHeight], radius: clampRadius})
        .union(CSG.cube({center: [0, clampRadius, clampHeight / 2], radius: [clampRadius, clampRadius, clampHeight / 2]}))
        .intersect(CSG.cylinder({start: [-clampRadius, clampDiameter / 1.8, 0], end: [clampRadius, clampDiameter / 1.8, 0], radius: clampHeight}))
        .translate([0, (baseBottomRadius - clampRadius), floorThickness]);
    
    return CSG.cylinder({start: [0, 0, 0], end: [0, 0, baseHeight], radiusStart: baseBottomRadius, radiusEnd: baseTopRadius})
        .subtract([shaftCutout, clampCutout]);
}

function main() {
    CSG.defaultResolution2D = 128;

    return lampBase(27, 12.7);
}

