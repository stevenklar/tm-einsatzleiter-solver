define(['jquery', 'notify'], function($, undefined) {

    var Manager = function() {}

    Manager.prototype.run = function (activeMissions) {

        var vehicles = getVehicles();

        $.each(activeMissions, function(mIndex, mission) {
            var solver = getSolver();
            var vehiclesToBeAlarmed = [];
            var missionName = mission.caption;
            var missionId = mission.mission_to_user_id;

            if (!(mission.caption in solver)) {
                $.notify('Unbekannter Auftrag ('+ mission.caption +')', {
                  clickToHide: true,
                  autoHide: false,
                  className: 'error',
                });
                console.log(mission.caption);
                return true;
            }

            // remove needed vehicles which are already on the way or at mission
            var vehiclesInMission = $('#mission_vehicle_list_entry_'+mission.mission_to_user_id+' a');
            vehiclesInMission.each(function(index, vehicleInMission) {
                var vehicleInMissionName = $(vehicleInMission).text();
                var neededVehicleIndex = $.inArray(vehicleInMissionName, solver[mission.caption].needed_vehicles);
                solver[mission.caption].needed_vehicles.splice(neededVehicleIndex , 1);
            });

            if (mission.request_help === 1
                || mission.time_left === -1
                || solver[mission.caption].needed_vehicles.length !== 0) {

                $.each(vehicles, function(vIndex, vehicle) {
                    if (vehicle === undefined) { return true; }
                    var existingVehicle = window['car' + vehicle.id];

                    if (existingVehicle === undefined || existingVehicle.fms_next === 2) {
                        if ($.inArray(vehicle.name, solver[mission.caption].needed_vehicles) !== -1) {
                            // arlarm vehicle
                            vehiclesToBeAlarmed.push(vehicle.id);

                            // remove vehicle from vehicles (because it is alarmed dude!)
                            delete vehicles[vIndex];

                            // remove vehicle from needed vehicles in solver
                            var neededVehicleIndex = $.inArray(vehicle.name, solver[mission.caption].needed_vehicles);
                            solver[mission.caption].needed_vehicles.splice(neededVehicleIndex , 1);
                        }
                    }
                })
            }

            if (vehiclesToBeAlarmed.length > 0){
                $.post(
                    'http://www.einsatzleiter.net/alarmieren/' + missionId + '/mehrere',
                    { 'vehicle_to_user_id[]': vehiclesToBeAlarmed }
                );
                $.notify('Auftrag wird abgearbeitet ('+ mission.caption +')', 'success');
            } else {
                if (solver[mission.caption].needed_vehicles.length > 0){
                    $.notify('No vehicle available for '+ mission.caption, 'info');
                }
            }
        })

        setTimeout(globalUpdate, 2000);
    };

    function getVehicles() {
        return [
            { id: 183309, name: 'Streifenwagen' },
            { id: 1229189, name: 'Streifenwagen' },
            { id: 1229186, name: 'Streifenwagen' },
            { id: 1229198, name: 'Streifenwagen' },
            { id: 1229199, name: 'Streifenwagen' },
            { id: 1229206, name: 'Streifenwagen' },
            { id: 1229293, name: 'Rettungshubschrauber' },
            { id: 1229352, name: 'Rettungswagen' },
            { id: 1229356, name: 'Notarzteinsatzwagen' },
            { id: 1229415, name: 'Rettungswagen' },
        ];
    }

    function getSolver() {
        return {
            'Schulwegunfall': {needed_vehicles: ['Rettungswagen', 'Streifenwagen', 'Notarzteinsatzwagen']},
            'Ruhestörung': {needed_vehicles: ['Streifenwagen', 'Streifenwagen']},
            'Sturz von der Leiter': {needed_vehicles: ['Rettungswagen', 'Notarzteinsatzwagen']},
            'Person zusammengebrochen': {needed_vehicles: ['Rettungswagen', 'Notarzteinsatzwagen']},
            'Arbeitsunfall': {needed_vehicles: ['Rettungswagen', 'Notarzteinsatzwagen']},
            'Lebensmittelvergiftung': {needed_vehicles: ['Rettungswagen', 'Notarzteinsatzwagen', 'Rettungshubschrauber']},
            'Verdächtiges Gepäckstück': {needed_vehicles: ['Streifenwagen', 'Streifenwagen']},
            'Nicht genehmigte Demonstration': {needed_vehicles: ['Streifenwagen', 'Streifenwagen']},
            'Durchführung Durchsuchungsbeschluß': {needed_vehicles: ['Streifenwagen', 'Streifenwagen']},
            'Leichte Sachbeschädigung': {needed_vehicles: ['Streifenwagen', 'Streifenwagen']},
            'Verkehrsunfall': {needed_vehicles: ['Streifenwagen', 'Streifenwagen']},
            'Wohnungseinbruch': {needed_vehicles: ['Streifenwagen', 'Streifenwagen']},
            'Auffahrunfall': {needed_vehicles: ['Streifenwagen', 'Streifenwagen']},
            'Ladendiebstahl': {needed_vehicles: ['Streifenwagen', 'Streifenwagen']},
            'Gestürzter Radfahrer': {needed_vehicles: ['Rettungswagen', 'Streifenwagen']},
        };
    }

    return Manager;

})
