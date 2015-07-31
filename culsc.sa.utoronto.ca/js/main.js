var prefix = "images/banner/";
var totalWait = 8000;
var fadeWait = 2000;

var captions = [
	"Nosepiece of an optical microscope",
	"Lateral X-ray of cervical spine, showing dental implant",
	"A deproteined Wistar rat bone at 10,000x magnification",
	"Gene expression using microarray probes",
	"Positron Emission Tomography scan of the brain of a 56 year old male",
	"Yeast cell membrane visualized by membrane proteins fused with fluorescent markers",
	"Tractographic reconstruction of neural connections using Diffusion Tensor Imaging",
	"Microscopic view of human ovarian follicles",
	"A Red Blood Cell containing ring-form Plasmodium vivax parasites",
	"Detail of a human iris",
	"A neutrophil engulfing anthrax bacteria, captured by a Scanning Electron Microscope"
];

var updates = { 
	"March 9, 2015" : "CULSC 2015 is now over and the winning teams have been announced! Check this website early in January for information about CULSC 2016."
};

function start() {
	addUpdates();
	beginAnimation();
	$(".photos a").fancybox();
}

function addUpdates() {
	var container = $('#updates > ul');
	for (var day in updates) {
		container.append(
			$("<li />").append(
				$("<div />").append(
					$("<span />").addClass("date").text(day)
				).append(
					$("<span />").addClass("details").text(updates[day])
				)
			)
		);
	}
}

function beginAnimation() {

	var current = new Date();
	var leftMessage;
	var startingIndex = next(-1);
	
	if (current.getMonth() == 02 && current.getFullYear() == 2011 && current.getDate() <= 13) {
		
		if (current.getDate() < 11) {
			var daysLeft = 11 - current.getDate();
			leftMessage = daysLeft + ((daysLeft == 1)? " Day Left" : " Days Left");
		}
		else {
			leftMessage = "The CULSC has begun!";
		}
	}
	else {
		leftMessage = "";
	}

	var banner = $("<div />").addClass("mid-banner").attr("id", "mb" + startingIndex).css({
		"background-image" : "url('" + prefix + startingIndex + "bg.jpg')"
	});

	$("<img />").attr("src", prefix + startingIndex + ".jpg").load(function() {
	
		banner.append($(this)).append(
			$("<div />").addClass("details").html(
				"<h2>" + leftMessage + "</h2><h3>" + captions[startingIndex] + "</h3>"
			)
		);
	
		$('#main-container').before(banner);
		
		setTimeout(function() {
			fadeImages(banner, next(startingIndex));
		}, totalWait/5);
	});
}

function fadeImages(banner, index) {

	var newBanner = banner.clone().attr("id", "mb" + index).css({
		"background-image" : "url('" + prefix + index + "bg.jpg')",
		"display" : "none"
	});
	
	newBanner.find('h3').text(captions[index]);
	
	newBanner.children('img').attr("src", prefix + index + ".jpg").load(function() {
	
		banner.fadeOut(fadeWait, function() {
			$(this).remove();
		});
		
		banner.before(newBanner.fadeIn(fadeWait));
		
		setTimeout(function() {
			fadeImages(newBanner, next(index));
		}, totalWait);
	});
}

function next(n) {
	var test;
	do {
		test = Math.floor(Math.random()*10) + 1;
	}
	while (test == n);
	
	return test;
}

$(start);