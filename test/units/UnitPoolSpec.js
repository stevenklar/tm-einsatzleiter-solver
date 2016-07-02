// - Keine Fahrzeuge verfügbar
// $('.form_info').text() === Du hast keine freien Fahrzeuge.


//
// units = $('form#alarm_form tr');
// units.each(function(index, element) {
//    unit.name = element.find('td').eq(1).text();
//    unit.distance = element.find('td').eq(2).text();
//})

define(['jquery', 'lib/unit', 'lib/unit_pool'], function($, Unit, Pool) {

    var fixtureWithMultipleVehicles = '<form id="alarm_form" action="/alarmieren/157587876/mehrere" method="post"><h3><input building_type="2" class="alarm_checkbox_all" type="checkbox">Polizei</h3><table class="defaultTable"><tbody><tr id="vehicle_to_user_row_1229199"><td style="width:20px"><input building_type="2" class="alarm_checkbox" type="checkbox" name="vehicle_to_user_id[]" value="1229199"></td><td style="width:153px">Streifenwagen</td><td style="width:70px">1012m</td></tr> <tr id="vehicle_to_user_row_1229186"> <td style="width:20px"> <input building_type="2" class="alarm_checkbox" type="checkbox" name="vehicle_to_user_id[]" value="1229186"> </td> <td style="width:153px">Streifenwagen</td> <td style="width:70px">1082m</td> </tr> <tr id="vehicle_to_user_row_1229189"> <td style="width:20px"> <input building_type="2" class="alarm_checkbox" type="checkbox" name="vehicle_to_user_id[]" value="1229189"> </td> <td style="width:153px">Streifenwagen</td> <td style="width:70px">1101m</td> </tr> </tbody> </table> </form>';

    describe('UnitPool', function() {
        it('can be initalized', function() {
            pool = new Pool;

            expect(pool).toEqual(new Pool);
        })

        it('can read Units and save them in a list', function() {
            pool = new Pool(fixtureWithMultipleVehicles);

            console.log(pool);

            dummyUnit = new Unit;
            dummyUnit.id = 'vehicle_to_user_row_1229189';
            dummyUnit.name = 'Streifenwagen';

            expect(pool.get(2)).toEqual(dummyUnit);
            expect(pool.getAll().length).toEqual(3);
            expect(pool.getAll()[0].getId()).toEqual('1229199');
        })
    })

})
