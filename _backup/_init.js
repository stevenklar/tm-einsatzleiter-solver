/***************************************************/
var head = document.getElementsByTagName("head")[0];

var require = function(src) {
  var script = document.createElement("script");
  script.setAttribute("src", 'http://el/' + src + '.js');
  head.appendChild(script);
};
/***************************************************/

var jQ = jQuery.noConflict(true);
var openMissions = [];

jQ(document).ready(function() {
    getMissions().each(missionIterator);
    openMissionsListener();

    if (jQ('.advertiseBlock').length > 0) { removeAdvertising(); }
    jQ('#caption_mission').on('click', function() { map.moveTo(26,26); });

    jQ('#tooltip_footer_content').on('click', function() {
        success('Reload...');

        globalUpdate();
    });
});
