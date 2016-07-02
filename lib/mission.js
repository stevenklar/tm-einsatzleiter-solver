define(['jquery'], function($) {

    var Mission = function(dom) {
        this.id = $(dom).find('.mission_list_link').attr('mission_to_user_id');
        this.name = $(dom).find('.mission_list_link').text();
        this.status = $(dom).find('div[class^=danger_icon]').attr('class');
        this.time_left = 0; // in seconds, default = 0
    }

    Mission.prototype.getId = function () {
        return this.id;
    };


    Mission.prototype.getName = function () {
        return this.name;
    };


    Mission.prototype.getStatus = function () {
        return this.status.substr(12);
    };

    return Mission;

});
