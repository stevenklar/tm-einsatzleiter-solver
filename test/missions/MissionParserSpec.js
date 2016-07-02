define(['jquery', 'lib/mission', 'lib/mission_pool'], function($, Mission, Pool) {

    var fixtureWithManyMissions = '<ul id="mission_vehicle_list_ul"><li id="mission_vehicle_list_li_157587863"><div class="mission_vehicle_list_left"><div class="danger_icon_yellow"></div><a class="mission_list_link" mission_to_user_id="157587863" position_x="32" position_y="16" href="">Lebensmittelvergif...</a><div class="mission_timer_menu" id="mission_timer_menu_157587863">01 Std. </div></div><div class="mission_vehicle_list_right" id="mission_vehicle_list_entry_157587863"><a objectname="car1229293" class="vehicle_list_link " href="">Rettungshubschrauber</a>, <a objectname="car1229352" class="vehicle_list_link " href="">Rettungswagen</a>, <a objectname="car1229356" class="vehicle_list_link " href="">Notarzteinsatzwagen</a></div></li><li id="mission_vehicle_list_li_157587876"><div class="mission_vehicle_list_left"><div class="danger_icon_red"></div><a class="mission_list_link" mission_to_user_id="157587876" position_x="15" position_y="43" href="">Lebensmittelvergif...</a><div class="mission_timer_menu" id="mission_timer_menu_157587876"></div></div><div class="mission_vehicle_list_right" id="mission_vehicle_list_entry_157587876"></div></li><li id="mission_vehicle_list_li_157587887"><div class="mission_vehicle_list_left"><div class="danger_icon_red"></div><a class="mission_list_link" mission_to_user_id="157587887" position_x="11" position_y="37" href="">Person zusammengeb...</a><div class="mission_timer_menu" id="mission_timer_menu_157587887"></div></div><div class="mission_vehicle_list_right" id="mission_vehicle_list_entry_157587887"></div></li><li id="mission_vehicle_list_li_157588003"><div class="mission_vehicle_list_left"><div class="danger_icon_red"></div><a class="mission_list_link" mission_to_user_id="157588003" position_x="28" position_y="1" href="">Person zusammengeb...</a><div class="mission_timer_menu" id="mission_timer_menu_157588003"></div></div><div class="mission_vehicle_list_right" id="mission_vehicle_list_entry_157588003"></div></li><li id="mission_vehicle_list_li_157588021"><div class="mission_vehicle_list_left"><div class="danger_icon_red"></div><a class="mission_list_link" mission_to_user_id="157588021" position_x="46" position_y="40" href="">Gestürzter Radfahr...</a><div class="mission_timer_menu" id="mission_timer_menu_157588021"></div></div><div class="mission_vehicle_list_right" id="mission_vehicle_list_entry_157588021"><a objectname="car183309" class="vehicle_list_link " href="">Streifenwagen</a>, <a objectname="car1229186" class="vehicle_list_link " href="">Streifenwagen</a>, <a objectname="car1229189" class="vehicle_list_link " href="">Streifenwagen</a>, <a objectname="car1229198" class="vehicle_list_link " href="">Streifenwagen</a>, <a objectname="car1229199" class="vehicle_list_link " href="">Streifenwagen</a>, <a objectname="car1229206" class="vehicle_list_link " href="">Streifenwagen</a></div></li><li id="mission_vehicle_list_unknown" style="display:none"><div class="mission_vehicle_list_left"><div class="danger_icon_green"></div>Unbekannt</div><div class="mission_vehicle_list_right" id="mission_vehicle_list_entry_-1"></div></li></ul>';

    describe('MissionPool', function() {
        it('can be initalized', function() {
            pool = new Pool;

            expect(pool).toEqual(new Pool);
        })

        it('can read Mission and save it in a list', function() {
            pool = new Pool(fixtureWithManyMissions);

            dummyMission = new Mission;
            dummyMission.id = '157588021';
            dummyMission.name = 'Gestürzter Radfahr...';
            dummyMission.status = 'danger_icon_red';

            expect(pool.get(4)).toEqual(dummyMission);
            expect(pool.getAll().length).toEqual(5);
            expect(pool.getAll()[3].getStatus()).toEqual('red');
        })
    })

})
