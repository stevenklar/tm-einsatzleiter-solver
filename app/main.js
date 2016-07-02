requirejs(['remover', 'jquery', 'notify', 'manager'], function(Remover, $, undefined, Manager) {

    // remove ads
    remove = new Remover;
    remove.advertisment();
    remove.tooltip();
    remove.logo();

    // manager
    var manager = new Manager();
    manager.run(mission_to_user_holder.mission_to_users);

    setInterval(function() {
        globalUpdate();
        manager.run(mission_to_user_holder.mission_to_users);
    }, 10000);

    // add goto the middle at avatar click :)
    $('.user_avatar').on('click', function() { map.moveTo(28,25); });
});
