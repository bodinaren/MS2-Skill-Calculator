var npcList = {};

var interactiveChartsMapping = {
	"knight": ["crossCut", "tornadoSlash", "divineStrike", "stingingFlurry", "drillThrust", "longswordMastery", "", "", "typhoonSlash", "shieldToss", "", "", "ironDefense", "", "ironShield", "", "shieldMastery", "shieldBooster", "shieldCharge", "", "shieldWall", "warhorn", "bulwark", "defenderOfTheFaith"],
	"berserker": ["ragingSlash", "deathSpin", "groundBreaker", "", "", "darkMight", "", "", "voidSlash", "darkBreaker", "warriorsInstinct", "", "darkAura", "", "bloodlust", "adrenalineRush", "bloodPrice", "inhumanEndurance", "xSlash", "", "greatswordMastery", "intimidation", "deepWounds", "earthquake"],
	"wizard": ["phantomClaw", "arcaneBlast", "flameWave", "flameTornado", "pyromancy", "manaClaw", "", "", "iceSpear", "iceStorm", "cryomancy", "", "manaFont", "", "chainLightning", "thunderbolt", "", "electromancy", "teleport", "", "magicArmor", "", "focusSeal", "elementalMaster"],
	"priest": ["celestialLight", "holyBlast", "shieldOfTheArchon", "holyRelic", "", "", "", "", "healingPrayer", "scourgingWave", "sanctuary", "smitingAura", "steadfastFaith", "", "celestialGuardian", "celestialBlessings", "holySymbol", "disciple", "heavenlyWings", "", "scepterMastery", "", "healingMastery", "angelicRay"],
	"archer": ["arrowStream", "arrowBarrage", "rapidShot", "arrowStorm", "", "screwdriverShot", "", "", "evasiveSalvo", "iceArrow", "agileArcher", "bowSwing", "snipe", "", "bronzeEagle", "eagleClaw", "eaglesMajesty", "", "eagleGlide", "", "conditioning", "", "sharpEyes", "precisionShooter"],
	"heavy-gunner": ["bulletSpray", "gatlingFire", "lockOn", "", "advancedBullets", "", "", "", "magneticBomb", "electricBlast", "advancedPulseWeapons", "blastChargeKit", "reload", "", "rocketLauncher", "homingMissiles", "mBomb", "advancedMissiles", "jetBoots", "", "stunGrenades", "suborbitalBombardment", "", "medKit"],
	"thief": ["doubleSlash", "poisonEdge", "poisonVial", "", "surpriseAttack", "ruthlessGuile", "", "", "cunningTactics", "bladeDance", "retaliation", "", "spiritThief", "", "somersaultKick", "quickStep", "", "mesoguardPlus", "mindStealer", "", "mindBreaker", "viciousCuts", "haste", "deftCombatant"],
	"assassin": ["luckyStars", "fragmentedStar", "starChaser", "starFlurry", "", "thrownWeaponMastery", "", "", "shadowCutter", "shadowBurst", "soulGrind", "shadowArts", "shadowChaser", "", "darkCloak", "markOfDeath", "deathSentence", "", "dash", "", "fatalStrikes", "", "shadowWeb", "mirrorImageDarkBlade"],
	"runeblade": ["flurry", "echoingBlade", "impact", "", "runeFocus", "bladeChasm", "", "", "whirlingBlades", "illusoryBlades", "bladeMastery", "", "runeBalance", "", "flameSigil", "frostSigil", "stormSigil", "honingRunes", "blink", "", "gravityRune", "wardingRune", "", "elementalPotency"],
	"soul-binder": ["soaringOrb", "radiantSalvo", "expansionBlast", "flashStrike", "shootingStar", "concussionOrb", "", "", "ragingTempset", "energySurge", "staticFlash", "", "mantraArray", "", "lightBarrier", "healingBond", "", "fountOfRenewal", "illusion", "", "orbMastery", "", "narubashanUnleashed", "animusFocus"],
	"striker": ["maharPunch", "fistsOfFury", "magnumBlow", "beatdown", "powerPuncher", "giganticBurst", "", "", "risingKick", "", "", "", "knuckleMissile", "", "hurricaneCutter", "guillotine", "kickTechnician", "dragonKick", "guardDash", "", "paceControl", "overcome", "fightingSpirit", "patternBreak"],
};

// changeJob - Change skills to another job
function changeJob(job, name){

	if( job == undefined ){ return; }

	$('#skills_right').empty();
	chart = document.createElement("ms-" + job);
	chart.id = "chart";
	chart.editable = true;
	chart.extras = true;
	$('#skills_right').append(chart);

	$('#skillPointNumber').empty();
	$('#skillPointNumber').append(document.createElement("ms-extra-counter"));
	
	var infoRequirement = document.getElementById("jobName");
	infoRequirement.innerHTML = "<p>" + name + "</p>";
}

// loadUrlPoints - Grabs the url info and set points into the skills
function loadUrlPoints(){

	var params = location.href.split('#')[1];
	
	if(params){
		// Get job
		var job = "knight";
		var name = "";
		if( params.slice(-2).replace("-","") == 0 ){ job = "knight"; name = "Knight"; }
		if( params.slice(-2).replace("-","") == 1 ){ job = "berserker"; name = "Berserker"; }
		if( params.slice(-2).replace("-","") == 2 ){ job = "wizard"; name = "Wizard"; }
		if( params.slice(-2).replace("-","") == 3 ){ job = "priest"; name = "Priest"; }
		if( params.slice(-2).replace("-","") == 4 ){ job = "archer"; name = "Archer"; }
		if( params.slice(-2).replace("-","") == 5 ){ job = "heavy-gunner"; name = "Heavy Gunner"; }
		if( params.slice(-2).replace("-","") == 6 ){ job = "thief"; name = "Thief"; }
		if( params.slice(-2).replace("-","") == 7 ){ job = "assassin"; name = "Assassin"; }
		if( params.slice(-2).replace("-","") == 8 ){ job = "runeblade"; name = "Runeblade"; }
		if( params.slice(-2).replace("-","") == 9 ){ job = "soul-binder"; name = "Soul Binder"; }
		if( params.slice(-2).replace("-","") == 10 ){ job = "striker"; name = "Striker"; }
		
		params = params.split('-');

		changeJob(job, name);

		document.getElementById("chart").componentOnReady().then(function(chart) {
			
			for (var i = 0; i < params.length; i++) {
				var prop = interactiveChartsMapping[job][i];
				chart[prop] = params[i];
			}
		});
		
		var infoRequirement = document.getElementById("jobName");
		infoRequirement.innerHTML = "<p>" + name + "</p>";
	}
}

// setUrl - Sets the skillpoints into the url so that it can be linked
function setUrl(){

	// make url include skill numbers
	var str = "#";
	
	// Set Job id
	var job = 0;
	
	document.getElementById("chart").componentOnReady().then(function(chart) {
		var classTag = chart.tagName.toLowerCase().replace("ms-", "");

		if(classTag === "knight" ){ job = 0; }
		if(classTag === "berserker" ){ job = 1; }
		if(classTag === "wizard" ){ job = 2; }
		if(classTag === "priest" ){ job = 3; }
		if(classTag === "archer" ){ job = 4; }
		if(classTag === "heavy-gunner" ){ job = 5; }
		if(classTag === "thief" ){ job = 6; }
		if(classTag === "assassin" ){ job = 7; }
		if(classTag === "runeblade" ){ job = 8; }
		if(classTag === "soul-binder" ){ job = 9; }
		if(classTag === "striker" ){ job = 10; }
		
		chart.getData().then(function(data) {
			var classSkills = interactiveChartsMapping[classTag];

			for (var i = 0; i < classSkills.length; i++) {
				if (classSkills[i] === "") {
					str += "0-";
				} else {
					var skill = data.skills.filter(function(x) { return x.prop === classSkills[i]; })[0];
					str += skill.level + "-";
				}
			}

			str += job;

			location.href = location.href.split('#')[0] + str;
		});
	});
}

// resetSkills - Reset all the skillpoints
function resetSkills(){

	document.getElementById("chart").componentOnReady().then(function(chart) {
		chart.getData().then(function(data) {
			for (var i in data.skills) {
				var skill = data.skills[i]
				chart[skill.prop] = skill.minLevel;
			}
		});
	});

	setUrl();
}

function setCookie(cname,cvalue,exdays,cexpire) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "";
	if( !cexpire ){
		expires = "expires=" + d.toGMTString();
	}
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function createChat(image, title, text, buttonText){

	setTimeout(function(){
		$("#new_chat_avatar").css("background-image", "url(./images/" + image + ".png)");
		$("#new_chat_title").text(title);
		$("#new_chat_text").text(text);
		$("#new_chat_button_text").text(buttonText);
		$("#new_chat_avatar").css("display", "block");
		$("#new_chat").css("opacity", 1);
		$("#new_chat").css("pointer-events", "auto");
	}, 1000);

}

$( window ).on( "load", function(){

	
	if( location.href.search("skills.html") > -1 ){
		$(window).on("skillchanged", "", function(evt) {
			setUrl();
		});
	
		// Load url points
		loadUrlPoints();
	}

	// Loader
	$(".new_loader").css("opacity", 0);

	// Show/Hide cookie alert
	var cAgree = getCookie("cookie");
	var cWelcome = getCookie("npc_welcome");
	
	if( cWelcome ){
		setCookie("npc_welcome", "1", 30, true);
	}
	
	if( cAgree == 0 ){

		npcList.cookie = function(){
			createChat("npc1", "Joddy", "This site uses cookies to remember some of your stuff.\nUsing this fansite means that you are okey with this.", "Accept");
		}
		
	}else{
		$("#new_chat").css("pointer-events", "none");
		if( !cWelcome ){
			
			setCookie("npc_welcome", "1", 30, true);
			
			npcList.welcomeback = function(){
				if( location.href.search("skills.html") != -1 ){
					createChat("npc5", "Katvan", "Welcome back, ready to make some new skill builds?", "Close");
				}
				
				if( location.href.search("fishing.html") != -1 ){
					createChat("npc3", "Terry", "Welcome back, let's catch something rare today!", "Close");
				}
				
				if( location.href.search("explore.html") != -1 ){
					createChat("npc4", "Lennon", "Welcome back, let's explore some new maps!", "Close");
				}
				
				if( location.href.search("index.html") != -1 ){
					createChat("npc2", "Growlie", "Welcome back.\nThe weather is nice today, let's have some fun!", "Close");
				}
			}
		}
	}
	
	$("#new_chat_button").mousedown(function(event){
	
		$("#new_chat_avatar").css("display", "none");
		$("#new_chat").css("opacity", 0);
		$("#new_chat").css("pointer-events", "none");
	
		cAgree = getCookie("cookie");
		if( cAgree == 0 ){
			setCookie("cookie", "1", 30);
			setCookie("npc_welcome", "1", 30, true);
			
			npcList.welcome = function(){
				createChat("npc2", "Growlie", "Welcome to this MapleStory 2 fansite.\nThe site is still WIP but I hope you find something useful!", "Close");
			}
		}
		
		if( Object.keys(npcList).length > 0 ){
			Object.values(npcList)[0]();
			var firstKey = Object.keys(npcList)[0];
			delete npcList[firstKey];
		}
		
	});
	
	if( Object.keys(npcList).length > 0 ){
		Object.values(npcList)[0]();
		var firstKey = Object.keys(npcList)[0];
		delete npcList[firstKey];
	}
	
});

// if phone or pad
if( screen.width <= 768 ){
	window.location.replace("./mobile.html");
}