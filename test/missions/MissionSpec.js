define(['jquery', 'lib/mission'], function($, Mission) {

    var fixtureRedWithoutVehicles = '<li id="mission_vehicle_list_li_157587863"><div class="mission_vehicle_list_left"><div class="danger_icon_red"></div><a class="mission_list_link" mission_to_user_id="157587863" position_x="32" position_y="16" href="">Lebensmittelvergif...</a><div class="mission_timer_menu" id="mission_timer_menu_157587863"></div></div><div class="mission_vehicle_list_right" id="mission_vehicle_list_entry_157587863"><a objectname="car1229293" class="vehicle_list_link " href="">Rettungshubschrauber</a></div></li>';
    var fixtureYellowWithFullRescueVehicles = '<li id="mission_vehicle_list_li_157587864"><div class="mission_vehicle_list_left"><div class="danger_icon_yellow"></div><a class="mission_list_link" mission_to_user_id="157587864" position_x="32" position_y="16" href="">Lebensmittelvergif</a><div class="mission_timer_menu" id="mission_timer_menu_157587863">02 Std. </div></div><div class="mission_vehicle_list_right" id="mission_vehicle_list_entry_157587863"><a objectname="car1229293" class="vehicle_list_link " href="">Rettungshubschrauber</a>, <a objectname="car1229352" class="vehicle_list_link " href="">Rettungswagen</a>, <a objectname="car1229356" class="vehicle_list_link " href="">Notarzteinsatzwagen</a></div></li>';

    describe('mission', function() {
        it('can be initalized without dom', function() {
            var mission = new Mission();

            expect(mission).toEqual(new Mission());
        })

        it('can read default attributes out of dom element', function() {
            var mission = new Mission(fixtureRedWithoutVehicles);

            expect(mission.getId()).toEqual('157587863');
            expect(mission.getName()).toEqual('Lebensmittelvergif...');
            expect(mission.getStatus()).toEqual('red');
        })

        it('can read custom attributes out of dom element with vehicles', function() {
            var mission = new Mission(fixtureYellowWithFullRescueVehicles);

            expect(mission.getId()).toEqual('157587864');
            expect(mission.getName()).toEqual('Lebensmittelvergif');
            expect(mission.getStatus()).toEqual('yellow');
        })
    })

});
