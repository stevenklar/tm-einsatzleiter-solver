define(['jquery'], function($) {

    var Unit = function(dom) {
        this.id = $(dom).attr('id');
        this.name = $(dom).find('td').eq(1).text();
    }

    Unit.prototype.getId = function () {
        return this.id.substr(20);
    };


    Unit.prototype.getName = function () {
        return this.name;
    };

    return Unit;

})
