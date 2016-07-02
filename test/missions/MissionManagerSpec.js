define(['lib/manager', 'jquery'], function(Manager, $) {
    describe('MissionManager', function() {
        it('can be instantiated', function() {
            var manager = new Manager();
        })

        it('send a vehicle to mission which needs help', function() {
            var manager = new Manager();
            var dummyMissions = [
                {caption: "Ladendiebstahl", mission_to_user_id: 157590259, request_help: true, time_left: 0},
                {caption: "Sturz von der Leiter", mission_to_user_id: 157590265, request_help: true, time_left: 0},
            ];

            manager.run();
        })
    })
})

// dummy for globalUpdate
function globalUpdate() {};
