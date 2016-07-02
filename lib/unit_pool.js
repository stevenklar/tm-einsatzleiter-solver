define(['jquery', 'lib/unit'], function($, Unit) {

    var pool = new Array();

    var Pool = function(dom) {
        units = $(dom).find('tr');

        units.each(function(index, element) {
            pool.push(new Unit(element));
        });
    }

    Pool.prototype.get = function (index) {
        return pool[index];
    };

    Pool.prototype.getAll = function () {
        return pool;
    };

    return Pool;

});
