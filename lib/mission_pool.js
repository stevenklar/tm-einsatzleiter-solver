define(['jquery', 'lib/mission'], function($, Mission) {

    var pool = new Array();

    var MissionPool = function(dom) {
        missions = $(dom).find('li');
        missions.each(function(index, element) {
            var mission = new Mission(element);

            if (mission.getStatus() !== 'green') {
                pool.push(mission);
            }
        });
    }

    MissionPool.prototype.get = function (index) {
        return pool[index];
    };

    MissionPool.prototype.getAll = function () {
        return pool;
    };

    return MissionPool;

});
