function lampBase(shaftLength, shaftDiameter) {
    var floorThickness = 2;
    var clampDiameter = 20;
    var clampHeight = 21;
	var shaftHeight = floorThickness;
    var baseHeight = shaftLength + shaftHeight;
    var baseTopDiameter = shaftDiameter + 8;
    var baseBottomDiameter = shaftDiameter + clampDiameter * 2 + 1;
    
    var shaftCutout = cylinder({h: shaftLength, d: shaftDiameter})
        .translate([0, 0, shaftHeight]);

    var clampCutout = cylinder({h: clampHeight, d: clampDiameter})
        .union(cube({size: [clampDiameter, clampDiameter, clampHeight]})
            .translate([-clampDiameter / 2, 0, 0]))
        .intersect(cylinder({h: clampDiameter, r: clampHeight})
            .rotateY(90)
            .translate([-clampDiameter / 2, clampDiameter / 1.8, 0]))
        .translate([0, (baseBottomDiameter / 2 - clampDiameter / 2), floorThickness]);
    //return clampCutout;
    return cylinder({h: baseHeight, d1: baseBottomDiameter, d2: baseTopDiameter})
        .subtract(shaftCutout)
        .subtract(clampCutout);
}

function main() {
  return lampBase(27, 13);
}