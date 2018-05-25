var hiddens = [];
var images = [];
var titles = [];
var elements = [];
var resources = [];
var levels = [];
var maxLevels = [];
var lockeds = [];
var lockReqs = [];
var requirements = [];
var infos = [];
var texts = [];

// loadUrlPoints - Grabs the url info and set points into the skills
function loadUrlPoints(){

	let params = location.href.split('#')[1];
	
	if(params){
		
		params = params.split('-');

		for(let i=0; i < params.length; i++){
			if( i <= 24 ){
				levels[i] = params[i];
			}
			if( params[i] > 0 ){
				lockeds[i] = 0;
			}
		}
	
	}

}

// createColumn - Create a column with skills
function createColumn(start, stop){

	let storeInfo = "";
	
	storeInfo = storeInfo + '<div id="skills_row">';
	
	for(let i=start; i < stop; i++){
		storeInfo = storeInfo + '<div class="skill_box">' +
			'<div data-hidden="' + hiddens[i] + '" data-title="' + titles[i] + '" class="skill skill_' + i + '"></div>' +
			'<div class="point_box">' +
			'<div class="bar">' +
			'<span class="skill_text skill_text_' + i + '"></span></div>' +
			'<div data-hidden="' + hiddens[i] + '" data-title="' + titles[i] + '" class="minus dec_' + i + '"></div>' +
			'<div data-hidden="' + hiddens[i] + '" data-title="' + titles[i] + '" class="plus inc_' + i + '"></div>' +
			'</div></div>';
	}
	
	// Add columns to the right side of the skill window
	let rightMenu = document.getElementById("skills_right");
	rightMenu.innerHTML = rightMenu.innerHTML + storeInfo + '</div>';
	
	let skillBoxes = document.getElementsByClassName("skill_box");
	let skillIcons = document.getElementsByClassName("skill");
	let skillTexts = document.getElementsByClassName("skill_text");
	
	for(let i=start; i < stop; i++){
	
		// Check if skill is not hidden
		if( hiddens[i] == 0 ){
			
			// Set skill icon
			skillIcons[i].style.backgroundImage = "url('./images/" + images[i] + ".png')";
			
			// Check if the skill text is available and set level/maxlevel text
			if( skillTexts[i] != undefined ){
				skillTexts[i].innerHTML = levels[i] + "/" + maxLevels[i];
			}
			
		}else{
			
			// If skill is hidden, check if it exists and set it's opacity to 0
			if( skillBoxes[i] != undefined ){
				skillBoxes[i].style.opacity = 0;
			}
			
		}
	
	}

}

// storeData - stores the classes .js info into arrays
function storeData(){

	// Class_skills are the .js stuff
	let skills = Class_skills;

	// Amount of skills (includes hidden) 6 skills per column, 4 columns.
	let skillAmount = 24;
	
	// Loop that pushes the .js info into the arrays
	for(let j=0; j < skillAmount; j++){
		for(let i=0; i < skills.length; i++){
			if(skills[j] && skills[j][i]){
				hiddens.push(skills[j][i].hidden);
				images.push(skills[j][i].image);
				titles.push(skills[j][i].title);
				resources.push(skills[j][i].resource);
				levels.push(skills[j][i].level);
				elements.push(skills[j][i].element);
				lockeds.push(skills[j][i].locked);
				lockReqs.push(skills[j][i].lockReq);
				maxLevels.push(skills[j][i].maxLevel);
				requirements.push(skills[j][i].requirement);
				infos.push(skills[j][i].info);
				texts.push(skills[j][i].texts);
			}
		}
	}

}

// setSkillInfo - Sets the skill info for the hover-tooltip
function setSkillInfo(type){

		// Check if skill info exists
		function isUndefined(info){
		
			if( info == undefined ){ return "<p><span class='info_gray'>Skill information is missing!</span></p>" }
			
			return info;
		
		}

		// Check if skill is hidden
		let isHidden = event.target.dataset.hidden;
		if( isHidden == 1 ){ return; }
		
		let box = document.getElementById('info_box');
	
		// Move the tooltip above the cursor to prevent text from going outside the screen
		if( event.pageY > 511 ){
			box.style.left = event.pageX + 6 + 'px';
			box.style.top = event.pageY - 350 + 12 + 'px';
		}else{
			box.style.left = event.pageX + 6 + 'px';
			box.style.top = event.pageY + 12 + 'px';
		}
		
		let infoTitle = event.target.dataset.title;
		$("#info_name > p").text(infoTitle);
		
		// Loop titles and compare it with data-title. When matched, add the information into the info_box.
		for(let i=0; i < titles.length; i++){
		
			if( titles[i] == infoTitle ){
			
				// Hide tooltip for minus button if skill is at 0
				if( levels[i] <= 0 && type == "minus" ){
					box.style.display = "none";
					return;
				}
				
				// Hide tooltip for plus button if skill is at max
				if( levels[i] == maxLevels[i] && type == "plus" ){
					box.style.display = "none";
					return;
				}
				
				// Prevent skill(12, 18) from showing tooltip on plus/minus.
				if( (i == 12 || i == 18) && type != "skill" ){
					box.style.display = "none";
					return;
				}
				
				// Prevent skill(0, 1) from showing tooltip on minus.
				if( (i == 0 || i == 1) && levels[i] <= 1 && type == "minus" ){
					box.style.display = "none";
					return;
				}
			
				// Set Resources text
				$(".info_resource").text(resources[i]);
				
				// Set element text
				$("#info_name").removeClass();
				if( elements[i] ){
					$("#info_name").addClass("element_" + elements[i].toLowerCase());
					$("#info_element > p").text(elements[i]);
				}else{
					$("#info_element > p").text("");
				}
				
				let infoDescription = document.getElementById("info_description_3");
				
				if( type == "skill" ){
					$(".info_level").text("Level " + parseInt( levels[i]) );
					infoDescription.innerHTML = isUndefined(texts[i][levels[i]]);
				}else if( type == "plus" ){
					let newLevel = parseInt(levels[i]) + 1;
					$(".info_level").text("Level " + newLevel);
					infoDescription.innerHTML = isUndefined(texts[i][newLevel]);
				}else if( type == "minus" ){
					let newLevel = parseInt(levels[i]) - 1;
					$(".info_level").text("Level " + newLevel );
					infoDescription.innerHTML = isUndefined(texts[i][newLevel]);
				}
			
				// Set tooltip image
				let infoImage = document.getElementById("info_image");
				infoImage.style.backgroundImage = "url('./images/" + images[i] + ".png')";
				
				// Set tooltip requirement text
				let infoRequirement = document.getElementById("info_description");
				infoRequirement.innerHTML = requirements[i];
			
				// Set tooltip's first info text
				let infoDescription2 = document.getElementById("info_description_2");
				infoDescription2.innerHTML = infos[i];
				
				break;
			
			}
		
		}
		
		// Make the tooltip visible
		box.style.display = "block";

}

// setSkillLock - Lock/Unlock skills that doesn't have the needed points
function setSkillLock(){

	let skillIcons = document.getElementsByClassName("skill");

	for(let i=0; i < lockeds.length; i++){
	
		if( lockReqs[i] != undefined ){
		
			let split = lockReqs[i].split('-');
			let hasReq = true;
			
			for(let j=0; j < split.length; j++){
			
				if( parseInt(split[j]) <= parseInt(levels[j]) ){
					// Correct
				}else{
					hasReq = false;
					break;
				}
			
			}
			
			if( hasReq ){
				lockeds[i] = 0;
				skillIcons[i].style.filter = "brightness(100%)";
				$(skillIcons[i].parentElement).removeClass("locked");
			}else{
				lockeds[i] = 1;
				skillIcons[i].style.filter = "brightness(20%)";
				$(skillIcons[i].parentElement).addClass("locked");
				
				// Skills that doesn't fill it's skill requirements have their points removed.
				if( levels[i] > 0 ){
					levels[i] = 0;
					let skillTexts = document.getElementsByClassName("skill_text");
					skillTexts[i].innerHTML = levels[i] + "/" + maxLevels[i];
					setPointsUsed();
				}
				
			}
		
		}
		
	}

	// Setting this part in a Timeout because it sometimes load faster than the plus/minus class content. Temp fix?
	setTimeout(function(){
	
		let skillMinus = document.getElementsByClassName("minus");
		let skillPlus = document.getElementsByClassName("plus");
	
		for(let i=0; i < Class_skills.length; i++){
		
			if( levels[i] == 0 ){
				skillMinus[i].classList.add("minus_locked");
			}else{
				skillMinus[i].classList.remove("minus_locked");
			}
			
			if( levels[i] == maxLevels[i] ){
				skillPlus[i].classList.add("plus_locked");
			}else{
				skillPlus[i].classList.remove("plus_locked");
			}
			
			// Locks locked skills but also skill(12, 18).
			if( lockeds[i] == 1 || i == 12 || i == 18 ){
				skillMinus[i].classList.add("minus_locked");
				skillPlus[i].classList.add("plus_locked");
			}
			
			// Locks base skills(0, 1) from having 0 points.
			if( (i == 0 || i == 1) && levels[i] == 1 ){
				skillMinus[i].classList.add("minus_locked");
			}
		
		}
	
	}, 100);

}

// setUrl - Sets the skillpoints into the url so that it can be linked
function setUrl(){

	// make url include skill numbers
	let str = "#";
	
	for(let i=0; i < levels.length; i++){
		if( i == levels.length -1 ){
			str = str + levels[i];
		}else{
			str = str + levels[i] + "-";
		}
	}
		
	location.href = location.href.split('#')[0] + str;

}

// changeSkillPoints - Increase or decrease a skillpoint from a skill
function changeSkillPoints(event, value){

	let infoTitle = event.target.dataset.title;
	let skillTexts = document.getElementsByClassName("skill_text");

	for(let i=0; i < titles.length; i++){
	
		// Prevent skill(12, 18) to be increased/decreased
		if( i == 12 || i == 18 ){ continue; }
		
		// Prevent skill(0, 1) from being decreased lower than rank 1
		if( (value == -1) &&(i == 0 || i == 1) && levels[i] <= 1 ){ continue; }
	
		if( titles[i] == infoTitle ){
			
			// Check if points should increase or decrease
			if( value == 1 ){
			
				// Increase points
				if( levels[i] < maxLevels[i] ){
				
					// If a locked skill is increased, add pre-required skills
					if( lockeds[i] == 1 ){
					
						levelUpAllPrereqSkills(i);
					
					}
				
					levels[i] = parseInt(levels[i]) + 1;
					skillTexts[i].innerHTML = (levels[i]) + "/" + maxLevels[i];
				
				}
			
			}else{
			
				// Decrease points
				if( levels[i] > 0 ){
				
					levels[i] = parseInt(levels[i]) - 1;
					skillTexts[i].innerHTML = (levels[i]) + "/" + maxLevels[i];
				
				}
			
			}
			
		}
		
	}
	
	setPointsUsed();
	setUrl();
	
	let type = event.target.classList[0];
	
	setSkillInfo(type);
	setSkillLock();

}

// setPointsUsed - Set/Change the points used text to show how many points that the user have spent.
function setPointsUsed(){

	let pointsUsed = 0;
	let pointsMax = 53; // Current max points
	
	// Collect all the skill levels
	for(let i=0; i < levels.length; i++){
		pointsUsed = pointsUsed + parseInt(levels[i]);
	}
	
	// Set text with current and max points
	$("#skill_points > p").text("Points used: " + pointsUsed + "/" + pointsMax);
	
	// If more points are spent, turn the box red
	if( pointsUsed > pointsMax ){
		$("#skill_points").addClass("skillPointLimit");
	}else{
		$("#skill_points").removeClass("skillPointLimit");
	}

}

/**
 * @description Sets the level of your pre-req skills to the levels defined in lockReqs[].
 * @argument index The index of the skill to check the pre-reqs of.
 * @returns void
 * @author ChungHoward
 */
function levelUpAllPrereqSkills(index) {
	
	let skillTexts = document.getElementsByClassName("skill_text");
	let prereqArray = lockReqs[index].split('-');
	
	for (let i = 0; i < levels.length; i++) {

		if (levels[i] < prereqArray[i]) {

			levels[i] = parseInt(prereqArray[i]);
			skillTexts[i].innerHTML = (levels[i]) + "/" + maxLevels[i];

		}

	}

}

$( window ).on( "load", function() {

	// Store all the classes .js data inside arrays
	storeData();
	
	// Load points from the url if a build is linked
	loadUrlPoints();
	
	// Create 4 columns for the skills
	createColumn(0,6);
	createColumn(6,12);
	createColumn(12,18);
	createColumn(18,24);
	
	// Set points used
	setPointsUsed();
	
	// Set lock on skills that aren't unlocked yet
	setSkillLock();

	// Mousemove for .skill, .plus and .minus
	$(".skill, .plus, .minus").mousemove(function(event){
	
		let type = event.target.classList[0];
		setSkillInfo(type);

	});
	
	// Mouseleave for .skill, .plus and .minus
	$(".skill, .plus, .minus").mouseleave(function(event){

		let box = document.getElementById('info_box');
		box.style.display = "none";

	});
	
	// Mousedown for .plus
	$(".plus").mousedown(function(event){
	
		// Add point to skill
		changeSkillPoints(event, 1);
		
	});
	
	// Mousedown for .minus
	$(".minus").mousedown(function(event){
	
		// Remove point from skill
		changeSkillPoints(event, -1);
		
	});
	
});