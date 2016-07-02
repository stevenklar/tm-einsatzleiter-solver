function openMissionsListener()
{
    // open missions found
    if (openMissions.length > 0) {
        //info('Try to solve next mission');

        sendMissionUnits(jQ(openMissions).first()[0]);
    } else {
        //info('No missions left... will retry in 20 seconds');

        setTimeout(function() {
            globalUpdate();

            getMissions().each(missionIterator);
            openMissionsListener();
        }, 2000);
    }
}

function getMission(element)
{
    return {
        name: getMissionName(element),
        status: getMissionStatus(element),
        duration: getMissionDuration(element),
        vehicles: getMissionVehicles(element),
    };
}

function missionIterator()
{
    var mission = getMission(jQ(this));

    if (mission.status === 'Open') {
        if (mission.vehicles.length <= 1) {
            info('Add mission to pool: ' + mission.name);
            openMissions.push(jQ(this));
        }
    }
}

function sendMissionUnits(element)
{
    var mission = getMission(element);
    var vehicle = '';
    var vehicleAvailable = false;

    switch (mission.name) {
        case 'Leichte Sachbeschä...':
        case 'Auffahrunfall':
        case 'Verkehrsunfall':
        case 'Ladendiebstahl':
        case 'Nicht genehmigte D...':
        case 'Ruhestörung':
        case 'Durchführung Durch...':
        case 'Verdächtiges Gepäc...':
        case 'Wohnungseinbruch':
            vehicle = 'Streifenwagen';
            break;

        case 'Motorrad-Brand':
        case 'Brennender PKW':
        case 'Brennendes Gras':
        case 'Brennende Telefonz...':
        case 'Mülleimerbrand':
            vehicle = 'LF-10-6';
            break;

        case '...':
            vehicle = 'Rettungshubschrauber';
            break;

        case 'Lebensmittelvergif...':
        case 'Sturz von der Leit...':
        case 'Schulwegunfall':
        case 'Person zusammengeb...':
            vehicle = 'Rettungswagen';
            break;

        default:
            //vehicle = 'Streifenwagen';
    }

    if (vehicle === '') {
        error('I dont know how to solve: ' + mission.name);

        openMissions.splice(0, 1);
        setTimeout(openMissionsListener, 12000);
        return;
    }

    var missionId = $(element).find('.mission_list_link').attr('mission_to_user_id');

    $.get('http://www.einsatzleiter.net/einsatz/' + missionId, function(data) {
        var availableVehicles = jQ(data).find('.alarm_checkbox');

        availableVehicles.each(function() {
            var tempVehicle = jQ(this).parent().parent().children();
            var vehicleName = tempVehicle.eq(1).text();
            var vehicleDistance = tempVehicle.eq(2).text();

            vehicleId = jQ(this).val();

            if (vehicleName == vehicle) { vehicleAvailable = true; }
        });

        if (!vehicleAvailable) {
            error('No vehicle available to solve this mission...');
        } else {
            success('Vehicle ('+ vehicleId +') has been alarmed for Mission ('+ missionId +')');
            $.post('http://www.einsatzleiter.net/alarmieren/' + missionId + '/mehrere', { 'vehicle_to_user_id[]': [ vehicleId ] });
        }

        openMissions.splice(0, 1);
        setTimeout(openMissionsListener, 2000);
        return;
    });
}

function selectVehicle(vehicle)
{
    jQ('#mission_window_content').find('tr:contains('+ vehicle +')').find('input').click();

    alarmVehicles();
}

function alarmVehicles() {
    $('#mission_window_content').find('.alarm_vehicle').click();

    success('Alarmed vehicles to mission!');
    setTimeout(openMissionsListener, 2000);
}

function getMissions() { return jQ('#mission_vehicle_list_ul li').not('#mission_vehicle_list_unknown'); }
function getMissionDuration(mission) { return mission.find('.mission_timer_menu').text(); }
function getMissionName(mission) { return mission.find('a.mission_list_link').text(); }

function getMissionStatus(mission)
{
    if (mission.find('.danger_icon_yellow').length > 0) { return 'In progress'; }
    if (mission.find('.danger_icon_red').length > 0) { return 'Open'; }
    if (mission.find('.danger_icon_green').length > 0) { return 'Done'; }

    return 'Unknown';
}

function getMissionVehicles(mission)
{
    var vehicles = [];

    mission.find('.mission_vehicle_list_right a').each(function() {
        vehicles.push($(this).text());
    });

    return vehicles;
}


function waitForElementToDisplay(selector, callback) {
    if(jQ(selector).length > 0) {
        callback();
        return;
    } else {
        setTimeout(function() {
            waitForElementToDisplay(selector, callback);
        }, 2000);
    }
}

function removeAdvertising()
{
    $.get('http://www.einsatzleiter.net/einstellungen/werbung/1', function() {
        window.location = 'http://www.einsatzleiter.net/';
    });
}

function info(msg, options)
{
    if (undefined === options) {
        options = {
            className: 'info'
        };
    }

    jQ.notify(msg, options);
}

function success(msg)
{
    jQ.notify(msg, 'success');
}


function error(msg)
{
    jQ.notify(msg, 'error');
}
