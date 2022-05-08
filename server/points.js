function makePoints() {
    let availablePoints = 15;
    const points = {}

    points.changePoints = function changePoints(pointUpdate) {
        availablePoints += parseFloat(pointUpdate);
    }

    points.getPoints = function getPoints() {
        return availablePoints;
    }

    return points;
};

module.exports = {
    makePoints,
};
