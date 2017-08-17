function add_course(element){
	var tr = element.parentElement.parentElement;
	var time1 = tr.querySelector('.time1').innerText.split(' ');
	time1 = time1[time1.length-1];
	var time1_s = time1.split('-');
	var time1_start,time1_end;
	for(var i=0;i<2;i++){
		time_split = time1_s[i].split(':')
		console.log(time_split)
		if (time_split.length == 2){
			if (i==1)
				time1_start = new Date(2015,7,17,time_split[0],time_split[1]);
			else
				time1_end = new Date(2015,7,17,time_split[0],time_split[1]);
		}
		else{
			if(i == 1)
				time1_start = new Date(2015,7,17,time_split[0],00);
			else
				time1_end = new Date(2015,7,17,time_split[0],00);
		}
	}
	var hasTime2=false;
	var time2 = tr.querySelector('.time2').innerText.split(' ');
	if (time2 != ''){
		hasTime2=true;
		var time2_start,time2_end
		time1 = time2[time2.length-1];
		var time1_s = time1.split('-');
		var time1_start,time1_end;
		for(var i=0;i<2;i++){
			time_split = time1_s[i].split(':')
			console.log(time_split)
			if (time_split.length == 2){
				if (i==1)
					time2_start = new Date(2015,7,17,time_split[0],time_split[1]);
				else
					time2_end = new Date(2015,7,17,time_split[0],time_split[1]);
			}
			else{
				if(i == 1)
					time2_start = new Date(2015,7,17,time_split[0],00);
				else
					time2_end = new Date(2015,7,17,time_split[0],00);
			}
		}
	}
	if (!repetitive(tr.querySelector('.code-lesson').innerText)){
		timetable.addEvent(tr.querySelector('.name-lesson').innerText+'-گروه '+tr.querySelector('.group-lesson').innerText, 'شنبه', time1_start, time1_end, tr.querySelector('.code-lesson').innerText, { url: '#' });
		if(hasTime2){
			timetable.addEvent(tr.querySelector('.name-lesson').innerText+'-گروه '+tr.querySelector('.group-lesson').innerText, 'دوشنبه', time2_start, time2_end, tr.querySelector('.code-lesson').innerText, { url: '#' });
		}
		var renderer = new Timetable.Renderer(timetable);
		renderer.draw('.timetable');
	}
	else{
		$('.btn-modal').click();
	}
}

function repetitive(course_id){
	console.log(course_id);
	for(var i=0;i<timetable.events.length;i++){
		if (timetable.events[i].id == course_id){
			return true;
		}
	}
	return false;
}
function haveOverlap(){
	var e1start = e1.start.getTime();
	var e1end = e1.end.getTime();
	var e2start = e2.start.getTime();
	var e2end = e2.end.getTime();
	
	return (e1start > e2start && e1start < e2end || e2start > e1start && e2start < e1end);
}