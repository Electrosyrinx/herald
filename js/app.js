//--BEGIN ANGULAR JS--//
var app = angular.module("myApp", []);

//--BEGIN CUSTOM JQUERY--//

$(document).ready(function(){
    
    //--Mobile First Compatibility--//
    if ($(window).width() <= 991){
        $(".mod-row").removeClass("row");
    }
    else {
        $(".mod-row").addClass("row");
    }
    
    var headerInfo = $("#header-info");
    
    if($(window).width() >= 769){
        $("#player-avatar").after(headerInfo);
    }
    else {
        $("#guild-emblem").after(headerInfo);
    }
    
    $(window).resize(function(){
        if ($(window).width() <= 991){
            $(".mod-row").removeClass("row");
        }
        else {
            $(".mod-row").addClass("row");
        }
    });
    
    $(window).resize(function(){
        if($(window).width() >= 769){
            $("#player-avatar").after(headerInfo);
        }
        else {
            $("#guild-emblem").after(headerInfo);
        }
    });
    
    //--Load RESTful API data--//
    $.ajax({
        url: "Desperados.json"
    }).then(function(response) {
        
        //--General--//
        var playerRealm = response.Raw.Realm;
        var progressXP = response.XP_Percent;

        //--Races Killed--//
        //--Albion--//
        if (playerRealm == 2 || playerRealm == 3){
            var britonsKilled = response.BritonKilled;
            var saracensKilled = response.SaracenKilled;
            var highlandersKilled = response.HighlanderKilled;
            var avaloniansKilled = response.AvalonianKilled;
            var inconnuKilled = response.InconnuKilled;
        }
        //--Midgard--//
        if (playerRealm == 1 || playerRealm == 3){
            var norseKilled = response.NorseKilled;
            var koboldKilled = response.KoboldKilled;
            var trollKilled = response.TrollKilled;
            var dwarfKilled = response.DwarfKilled;
            var valkynKilled = response.ValkynKilled;
        }
        //--Hibernia--//
        if (playerRealm == 2 || playerRealm == 1){
            var celtKilled = response.CeltKilled;
            var lurikeenKilled = response.LurikeenKilled;
            var firbolgKilled = response.FirbolgKilled;
            var elfKilled = response.ElfKilled;
            var sylvanKilled = response.SylvanKilled;
        }

        //--RvR--//
        var progressRealmLevel = response.RP_Percent;
        var realmRank = response.RealmRank;
        //--Sorry, this is probably a nightmare to look at. It moves RP_Percent  --//
        //--decimal place to the left once, adds it to realm level (by removing  --//
        //--the realm rank from RealmRank), then multiplies it by 100 for the    --//
        //--progress bar on the Progress chart.                                  --// 
        var progressRealmRank = (((progressRealmLevel / Math.pow(10, 1)) + realmRank) - Math.floor(realmRank)) * 100;
        var totalKills = response.TotalKills;
        var realmOneKills;
        var realmTwoKills;
        if (playerRealm == 1){
            realmOneKills = response.TotalHiberniaKills;
            realmTwoKills = response.TotalMidgardKills;
        }
        if (playerRealm == 2){
            realmOneKills = response.TotalHiberniaKills;
            realmTwoKills = response.TotalAlbionKills;
        }
        if (playerRealm == 3){
            realmOneKills = response.TotalAlbionKills;
            realmTwoKills = response.TotalMidgardKills;
        }
        var deathblows = response.Deathblows;
        var soloKills = response.SoloKills;
        //--RPs over the last 7 days: Index 0 is today, index 1 is yesterday, etc.--//
        var RpLastSevenDays = response.RPsLastSevenDays;

        //--PvE--//
        var legionKilled = response.LegionKills;
        var epicSiBossKilled = response.EpicSIBossKills;
        var epicSiDragonKilled = response.EpicSIDragonKills;
        var grandSummonerKilled = response.GrandSummonerKills;
        var dragonKilled = response.DragonKills;
        
        
        //--BEGIN CUSTOM CHART.JS | REFER TO http://www.chartjs.org/docs/ FOR DOCUMENTATION--//

        //--BEGIN KILL STATS CHART--//
        var killStatsCanvas = document.getElementById("kill-stats");
        var killStatsChart = new Chart(killStatsCanvas, {
            type: 'bar',
            data: {
                labels: ["Total Kills", "Hibernia Kills", "Midgard Kills", "Deathblows", "Solo Kills"],
                datasets: [{
                    label: 'RvR Kills',
                    data: [totalKills, realmOneKills, realmTwoKills, deathblows, soloKills],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        //--END KILL STATS CHART--//


        //--BEGIN PVE STATS CHART--//

        var mobsKilledCanvas = document.getElementById("mobs-killed");
        var mobsKilledChart = new Chart(mobsKilledCanvas, {
            type: 'pie',
            data: {
                labels: ["Dragon", "Legion", "Apocalypse", "Xanxicar", "Grand Summoner"],
                datasets: [{
                    label: 'PvE Kills',
                    data: [dragonKilled, legionKilled, epicSiBossKilled, epicSiDragonKilled, grandSummonerKilled],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(100, 26, 86, 0.2)',
                        'rgba(255, 20, 0, 0.2)',
                        'rgba(0, 106, 255, 0.2)',
                        'rgba(255, 144, 144, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(100, 26, 86, 1)',
                        'rgba(255, 20, 0, 1)',
                        'rgba(0, 106, 255, 1)',
                        'rgba(255, 144, 144, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                display: false
            }
        });
        //--END PVE STATS CHART--//

        //--BEGIN RACE KILLS STATS CHART--//

        //--These variables are determined by which realm the character is a member of.--//
        var raceLabel;
        var killStats1;
        var killStats2;

        //--Labels of races killed, followed by the title labels, followed by appropriate chart colors (opaque first, transparent second).--//
        var albionRaceLabels = [
            "Norse/Celt", "Kobold/Lurikeen", "Troll/Firbolg", "Dwarf/Elf", "Valkyn/Sylvan",
            "Members of Midgard Killed", "Members of Hibernia Killed",
            //--Blue--//
            'rgba(0, 100, 250, 1)', 'rgba(0, 100, 250, 0.2)',
            //--Green--//
            'rgba(0, 206, 86, 1)', 'rgba(0, 206, 86, 0.2)'
        ];
        var midgardRaceLabels = [
            "Celt/Briton", "Lurikeen/Saracen", "Firbolg/Highlander", "Elf/Avalonian", "Sylvan/Inconnu", 
            "Members of Hibernia Killed", "Members of Albion Killed", 
            //--Green--//
            'rgba(0, 206, 86, 1)', 'rgba(0, 206, 86, 0.2)',
            //--Red--//
            'rgba(255, 20, 0, 1)', 'rgba(255, 20, 0, 0.2)'
        ];
        var hiberniaRaceLabels = [
            "Briton/Norse", "Saracen/Kobold", "Highlander/Troll", "Avalonian/Dwarf", "Inconnu/Valkyn",
            "Members of Albion Killed", "Members of Midgard Killed",
            //--Red--//
            'rgba(255, 20, 0, 1)', 'rgba(255, 20, 0, 0.2)',
            //--Blue--//
            'rgba(0, 206, 86, 1)', 'rgba(0, 206, 86, 0.2)'
        ];

        //--Stats of races killed. One of these variables in null depending on character's realm.--//
        var albionKillStats = [britonsKilled, saracensKilled, highlandersKilled, avaloniansKilled, inconnuKilled];
        var midgardKillStats = [norseKilled, koboldKilled, trollKilled, dwarfKilled, valkynKilled];
        var hiberniaKillStats = [celtKilled, lurikeenKilled, firbolgKilled, elfKilled, sylvanKilled];

        //--Determing labels and datasets.--//
        if (playerRealm == 1){
            raceLabel = albionRaceLabels;
            killStats1 = midgardKillStats;
            killStats2 = hiberniaKillStats;
        }
        if (playerRealm == 2){
            raceLabel = midgardRaceLabels;
            killStats1 = hiberniaKillStats;
            killStats2 = albionKillStats;
        }
        if (playerRealm == 3){
            raceLabel = hiberniaRaceLabels;
            killStats1 = albionKillStats;
            killStats2 = midgardKillStats;
        }

        //--Begin Chart--//
        var racesKilledCanvas = document.getElementById("races-killed");
        var racesKilledChart = new Chart(racesKilledCanvas, {
            type: 'bar',
            data: {
                labels: [raceLabel[0], raceLabel[1], raceLabel[2], raceLabel[3], raceLabel[4]],
                datasets: [{
                    label: raceLabel[5],
                    data: killStats1,
                    backgroundColor: [
                        raceLabel[8],
                        raceLabel[8],
                        raceLabel[8],
                        raceLabel[8],
                        raceLabel[8],
                        raceLabel[8],
                        raceLabel[8]
                    ],
                    borderColor: [
                        raceLabel[7],
                        raceLabel[7],
                        raceLabel[7],
                        raceLabel[7],
                        raceLabel[7],
                        raceLabel[7],
                        raceLabel[7]
                    ],
                    borderWidth: 1
                },
                           {
                               label: raceLabel[6],
                               data: killStats2,
                               backgroundColor: [
                                   raceLabel[10],
                                   raceLabel[10],
                                   raceLabel[10],
                                   raceLabel[10],
                                   raceLabel[10],
                                   raceLabel[10],
                                   raceLabel[10]
                               ],
                               borderColor: [
                                   raceLabel[9],
                                   raceLabel[9],
                                   raceLabel[9],
                                   raceLabel[9],
                                   raceLabel[9],
                                   raceLabel[9],
                                   raceLabel[9]
                               ],
                               borderWidth: 1
                           }]
            },
        });
        //--END RACE KILL STATS CHART--//

        //--BEGIN WEEKLY RP STATS CHART--//

        var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var date = new Date();
        var currentDay = date.getDay();

        var weeklyRpCanvas = document.getElementById("weekly-rp-canvas");
        var weeklyRpChart = new Chart(weeklyRpCanvas, {
            type: 'line',
            data: {
                labels: [
                    //--It looks funky, but it gets the job done O_o --//
                    daysOfWeek[(((currentDay - 6) % 7) +7) % 7], 
                    daysOfWeek[(((currentDay - 5) % 7) +7) % 7], 
                    daysOfWeek[(((currentDay - 4) % 7) +7) % 7], 
                    daysOfWeek[(((currentDay - 3) % 7) +7) % 7], 
                    daysOfWeek[(((currentDay - 2) % 7) +7) % 7],
                    daysOfWeek[(((currentDay - 1) % 7) +7) % 7],
                    daysOfWeek[currentDay]
                ],
                datasets: [{
                    label: 'Weekly RPs',
                    data: [RpLastSevenDays[6], RpLastSevenDays[5], RpLastSevenDays[4], RpLastSevenDays[3], RpLastSevenDays[2], RpLastSevenDays[1], RpLastSevenDays[0]],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        //--END WEEKLY RP STATS CHART--//

        //--BEGIN PROGRESS STATS CHART--//

        var remainingXP = 100 - progressXP;
        var remainingRealmLevel = 100 - progressRealmLevel;
        var remainingRealmRank = 100 - progressRealmRank;

        var progressCanvas = document.getElementById("progress-canvas");
        var progressChart = new Chart(progressCanvas, {
            type: 'horizontalBar',
            data: {
                labels: ["XP Progress", "Realm Level Progress", "Realm Rank Progress"],
                datasets: [{
                    label: '% Progress',
                    data: [progressXP, progressRealmLevel, progressRealmRank],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.4)',
                        'rgba(255, 206, 86, 0.4)',
                        'rgba(255, 206, 86, 0.4)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                },
                           {
                               label: '% Remaining',
                               data: [remainingXP, remainingRealmLevel, remainingRealmRank],
                               backgroundColor: [
                                   "rgba(220, 220, 220, 0.2)",
                                   "rgba(220, 220, 220, 0.2)",
                                   "rgba(220, 220, 220, 0.2)"
                               ],
                               borderColor: [

                                   "rgba(220, 220, 220, .1)",
                                   "rgba(220, 220, 220, .1)",
                                   "rgba(220, 220, 220, .1)"
                               ]
                           }]
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true,
                        categoryPercentage: 0.5
                    }],
                    yAxes: [{
                        stacked: true,
                        categoryPercentage: 0.5,
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        //--END PROGRESS STATS CHART--//

        //--END CUSTOM CHART.JS--//
    });
});
//--END CUSTOM JQUERY--//