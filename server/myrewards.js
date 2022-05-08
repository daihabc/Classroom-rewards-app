const uuid = require('uuid').v4;

function makeMyRewardsList() {
    const id1 = uuid();
    const id2 = uuid();
    const id3 = uuid();
    const id4 = uuid();
    const id5 = uuid();

    const myRewardList = {};
    const myRewards = {}

    myRewards.earnedRewards = {
        [id1]: {
            id: id1,
            name: 'Pick Homeroom Music',
            point: 5,
        },
        [id2]: {
            id: id2,
            name: 'Bonus Points for Exam',
            point: 25,
        },
        [id5]: {
            id: id5,
            name: '$5 Starbuck Gift Card',
            point: 25,
        }
    };

    myRewards.usedRewards = {
        [id3]: {
            id: id3,
            name: 'Virtual Scavenger Hunt',
            point: 100,
        },
        [id4]: {
            id: id4,
            name: 'Online Game with Ms.K',
            point: 3,
        }
    }

    myRewardList.containEarnedReward = function containEarnedReward(id) {
        return !!myRewards.earnedRewards[id];
    };

    myRewardList.getEarnedRewards = function getEarnedRewards() {
        return myRewards;
    };

    myRewardList.getUsedRewards = function getUsedRewards() {
        return myRewards.usedRewards;
    };

    myRewardList.addEarnedRewards = function addEarnedRewards(newName, newPoint) {
        const newId = uuid();
        myRewards.earnedRewards[newId] = {
            id: newId,
            name: newName,
            point: newPoint
        };
        return newId;
    };

    myRewardList.getEarnedReward = function getEarnedReward(id) {
        return myRewards.earnedRewards[id];
    };

    myRewardList.getUsedReward = function getUsedReward(id) {
        return myRewards.usedRewards[id];
    };

    myRewardList.useReward = function useReward(id) {
        const newId = uuid();
        myRewards.usedRewards[newId] = {
            id: newId,
            name: myRewards.earnedRewards[id].name,
            point: myRewards.earnedRewards[id].point
        }
        delete myRewards.earnedRewards[id];
        return newId;
    }

    return myRewardList;
};

module.exports = {
    makeMyRewardsList,
};
