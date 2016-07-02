define(['jquery', 'lib/remover'], function($, Remover) {

    describe('remover', function() {
        beforeEach(function() {
            remove = new Remover;

            // fixtures
            $('body').append('<div id="advertiseBlockTop"></div>');
            $('body').append('<div id="top_logo"></div>');
            $('body').append('<div id="tooltip_footer"></div>');
        });

        function expectAds(num)
        {
            expect($('#advertiseBlockTop').length).toEqual(num);
            expect($('#top_logo').length).toEqual(num);
            expect($('#tooltip_footer').length).toEqual(num);
        }

        it('should remove advertisment one by one', function() {
            expectAds(1);

            remove.advertisment();
            remove.logo();
            remove.tooltip();

            expectAds(0);
        });

        it('should remove all stuff', function() {
            expectAds(1);

            remove.all();

            expectAds(0);
        });
    })

});
