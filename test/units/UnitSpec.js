define(['jquery', 'lib/unit'], function($, Unit) {

    var fixtureWithOneVehicle = '<tr id="vehicle_to_user_row_1229199"><td style="width:20px"><input building_type="2" class="alarm_checkbox" type="checkbox" name="vehicle_to_user_id[]" value="1229199"></td><td style="width:153px">Streifenwagen</td><td style="width:70px">1012m</td></tr>';

    describe('unit', function() {
        it('can be initalized without dom', function() {
            var unit = new Unit();

            expect(unit).toEqual(new Unit());
        })

        it('can read default attributes out of dom element', function() {
            var unit = new Unit(fixtureWithOneVehicle);

            expect(unit.getId()).toEqual('1229199');
            expect(unit.getName()).toEqual('Streifenwagen');
        })
    })

});
