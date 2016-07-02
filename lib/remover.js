define(['jquery'], function($) {

    var Remover = function() {
        this.advertisment = function() {
            $('#advertiseBlockTop').remove();
        }

        this.tooltip= function() {
            $('#tooltip_footer').remove();
        }

        this.logo = function() {
            $('#top_logo').remove();
        }

        this.all = function() {
            this.tooltip();
            this.advertisment();
            this.logo();
        }
    }

    return Remover;
});
