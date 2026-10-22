'use strict';
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const config = window.SITE_CONFIG || { email: 'bimaecsolutions@gmail.com', consultationMinutes: 30 };
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const projects = {
 urban: {name:'Urban Village Phase 2', location:'Phnom Penh, Cambodia', year:'2021', image:'urban-village', type:'High-rise residential', facts:[['60 storeys','Tallest tower'],['4 towers','Shared five-storey podium'],['200 m','Maximum height in profile']], intro:'A high-rise residential development with sky bridges connecting towers, refuge floors with wind openings and rooftop green spaces.', scope:['Reinforced concrete core wall and frame system for lateral resistance.','Deep bored pile foundations and heavy reinforced concrete transfer plates at the podium.','ETABS structural and drift analysis, SAFE slab and foundation design, with Revit and Navisworks coordination.'], page:23},
 bukit: {name:'Bukit Timah Integrated Development',location:'Singapore',year:'2024',image:'bukit-timah',type:'Civic & community',facts:[['5 storeys','Integrated development'],['2 levels','Basement parking'],['Eurocode','Singapore National Annex']],intro:'An integrated civic, community and education development next to Beauty World MRT, combining multiple uses with complex substructure requirements.',scope:['Bored piles, raft on piles and secant bored pile retaining walls for the basement.','Reinforced concrete framing, with post-tensioned transfer beams supporting upper columns.','ETABS, SAFE and RAPT analysis, supported by Revit and AutoCAD documentation.'],page:31},
 lotus: {name:'Lotus Land 598',location:'Phnom Penh, Cambodia',year:'2020',image:'lotus-land',type:'Multi-tower residential',facts:[['8 towers','Residential development'],['15–28','Storeys per tower'],['Tender','Design stage delivered']],intro:'A multi-tower residential development integrating podium landscapes and rooftop amenities. The profile describes structural design completed through the tender stage.',scope:['Structural coordination for podium transfers, sky gardens and swimming pools.','Lateral-system analysis addressing different tower heights across the development.','Tender-stage structural analysis, layout drawings, loading criteria and preliminary quantities.'],page:14},
 woodlands: {name:'HDB Woodlands',location:'Singapore',year:'2024',image:'woodlands',type:'Public housing',facts:[['848','Homes in development'],['28–33','Residential storeys'],['7 storeys','Multi-storey car park']],intro:'A public housing development at North Woodlands Drive comprising three residential blocks, a multi-storey car park and communal facilities. The portfolio includes Block 903B and the car park.',scope:['Bored pile foundations with reinforced concrete columns and walls.','Beam-and-slab systems for gravity loads and core-frame lateral resistance.','ETABS and SAFE engineering analysis under Eurocode and Singapore National Annex requirements.'],page:32}
};
let previousFocus = null;
function openDialog(dialog) { previousFocus = document.activeElement; dialog.showModal(); document.body.classList.add('modal-open'); }
function closeDialog(dialog) { dialog.close(); }
$$('dialog').forEach(dialog => {
 $('.dialog-close',dialog).addEventListener('click',()=>closeDialog(dialog));
 dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('modal-open'); if(previousFocus && document.contains(previousFocus))previousFocus.focus();});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(dialog);}});
});
const menu = $('.menu-toggle');
menu.addEventListener('click',()=>{const isOpen=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!isOpen));menu.setAttribute('aria-label',isOpen?'Open menu':'Close menu');$('#navigation').classList.toggle('open',!isOpen);});
$$('#navigation a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');$('#navigation').classList.remove('open');}));
$$('[data-view]').forEach(button=>button.addEventListener('click',()=>{
 const structure=button.dataset.view==='structure';
 $$('[data-view]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
 const img=$('#hero-image');img.src=structure?'assets/urban-structural.webp':'assets/urban-village.webp';img.alt=structure?'Structural analysis model of Urban Village Phase 2':'Architectural rendering of Urban Village Phase 2 in Phnom Penh';$('.hero-image-wrap').classList.toggle('model-mode',structure);
 $('#hero-caption').textContent=structure?'URBAN VILLAGE / STRUCTURAL MODEL':'URBAN VILLAGE PHASE 2';
 $('#hero-subcaption').innerHTML=structure?'Engineering beneath the architecture <span>↗</span>':'Phnom Penh, Cambodia <span>↗</span>';
}));
$$('.services details').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)$$('.services details').forEach(other=>{if(other!==detail)other.open=false;});}));
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 const filter=button.dataset.filter;let count=0;
 $$('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
 $$('.project-card').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.country!==filter;if(!card.hidden)count++;});
 $('#project-count').textContent=String(count).padStart(2,'0')+' SELECTED PROJECTS';
}));
function showProject(key){const p=projects[key];if(!p)return;$('#project-content').innerHTML=`<img class="case-hero" src="assets/${p.image}.webp" alt="${esc(p.name)} architectural rendering"><div class="case-body"><p class="eyebrow">${esc(p.type.toUpperCase())} / ${esc(p.location.toUpperCase())}</p><h2 id="case-title">${esc(p.name)}</h2><p>${esc(p.intro)}</p><div class="case-facts">${p.facts.map(f=>`<div><strong>${esc(f[0])}</strong><span>${esc(f[1])}</span></div>`).join('')}</div><h3>Technical scope in the portfolio</h3><ul>${p.scope.map(s=>`<li>${esc(s)}</li>`).join('')}</ul><p class="case-note">Selected career and team experience · ${p.year}. Technical reference: company profile, page ${p.page}. This portfolio includes work before the practice was established in 2025.</p><div class="case-actions"><button class="button" id="case-consult">Discuss a similar project <span>↗</span></button><a class="text-link" href="assets/bim-aec-company-profile.pdf#page=${p.page}" target="_blank" rel="noopener">View technical reference <span>↗</span></a></div></div>`;
 $('#project-dialog').setAttribute('aria-labelledby','case-title');openDialog($('#project-dialog'));$('#case-consult').addEventListener('click',()=>{closeDialog($('#project-dialog'));openBooking('I would like to discuss a project with requirements similar to '+p.name+'.\n\nProject location:\nCurrent stage:\nSupport needed:\nTarget timeline:');});}
$$('[data-project]').forEach(b=>b.addEventListener('click',()=>showProject(b.dataset.project)));
let fitSummary='';
function updateFit(){const role=$('#fit-role').value,stage=$('#fit-stage').value,need=$('#fit-need').value;
 let title,description,deliverables;
 if(need==='coordination'){title='BIM coordination & digital delivery';description='Start with a review of your model requirements and coordination interfaces, then define a BIM package aligned to your delivery milestones.';deliverables=['BIM scope','Model coordination','Documentation'];}
 else if(need==='review'){title='Focused technical design review';description='Define the design package and questions to review, with a clear boundary for design verification and constructability observations.';deliverables=['Review scope','Technical comments','Coordination review'];}
 else if(stage==='concept'){title='Structural concept & feasibility support';description='Explore structural options, design criteria and the information needed to progress a viable concept into the next design stage.';deliverables=['Design basis','Structural concept','Next-stage requirements'];}
 else if(stage==='construction'){title='Construction-phase technical support';description='Define the design coordination and technical review support needed as your project advances on site.';deliverables=['Technical reviews','Coordination support','Agreed site interfaces'];}
 else{title='Structural design & BIM production';description='Define a technical package that adds capacity to your team, with agreed calculations, models, drawings and review checkpoints.';deliverables=['Design calculations','Revit models','Structural drawings'];}
 const roleText={consultant:'Suitable for extending an existing AEC team.',developer:'Shape the scope around your project decisions and procurement milestones.',contractor:'Focus the engagement on construction interfaces and technical information.'};
 $('#fit-title').textContent=title;$('#fit-text').textContent=description+' '+roleText[role];$('#fit-deliverables').innerHTML='<ul>'+deliverables.map(d=>'<li>'+d+'</li>').join('')+'</ul>';
 fitSummary='Suggested scope: '+title+'\nRole: '+$('#fit-role').selectedOptions[0].text+'\nProject stage: '+$('#fit-stage').selectedOptions[0].text+'\nPriority: '+$('#fit-need').selectedOptions[0].text+'\n\nProject location and target timeline: ';
}
$$('.fit-fields select').forEach(el=>el.addEventListener('change',updateFit));updateFit();
$('#discuss-fit').addEventListener('click',()=>openBooking(fitSummary));
function openBooking(brief=''){
 if(config.bookingUrl){try{const url=new URL(config.bookingUrl);if(url.protocol==='https:'){window.open(url.href,'_blank','noopener,noreferrer');return;}}catch{}}
 $('#navigation').classList.remove('open');menu.setAttribute('aria-expanded','false');if(brief)$('#booking-brief').value=brief;$('#form-status').textContent='';openDialog($('#booking-dialog'));updateMeetingTime();
}
$$('[data-book]').forEach(b=>b.addEventListener('click',()=>openBooking(b.dataset.service?'Service of interest: '+b.dataset.service+'\n\nProject location:\nCurrent stage:\nSupport needed:\nTarget timeline:':'')));
$('#privacy-open').addEventListener('click',()=>openDialog($('#privacy-dialog')));
const dateInput=$('#meeting-date'),timeInput=$('#meeting-time');
const pad=n=>String(n).padStart(2,'0');
const localDate=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const tomorrow=new Date();tomorrow.setDate(tomorrow.getDate()+1);dateInput.min=localDate(new Date());dateInput.value=localDate(tomorrow);
const userZone=Intl.DateTimeFormat().resolvedOptions().timeZone;
$('#time-zone').textContent='Your time zone: '+userZone.replaceAll('_',' ')+' (detected from your device).';
function meetingDate(){return new Date(dateInput.value+'T'+timeInput.value+':00');}
function updateMeetingTime(){const date=meetingDate();const valid=!isNaN(date);dateInput.setCustomValidity(valid&&date<=new Date()?'Choose a time in the future.':'');$('#cambodia-time').textContent=valid?'In Phnom Penh: '+new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Phnom_Penh',weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',timeZoneName:'short'}).format(date):'';}
dateInput.addEventListener('change',updateMeetingTime);timeInput.addEventListener('change',updateMeetingTime);
const form=$('#consultation-form');
function meetingData(){updateMeetingTime();if(!form.reportValidity())return null;const values=Object.fromEntries(new FormData(form));const start=meetingDate();if(isNaN(start)||start<=new Date())return null;const end=new Date(start.getTime()+(config.consultationMinutes||30)*60000);const when=new Intl.DateTimeFormat('en-GB',{dateStyle:'full',timeStyle:'short'}).format(start);const body=`Hello Menglim,\n\nI would like to request a consultation.\n\nName: ${values.name}\nEmail: ${values.email}\nCompany: ${values.company}\n\nProject brief:\n${values.brief}\n\nPreferred time: ${when} (${userZone})\n${$('#cambodia-time').textContent}\nDuration: ${config.consultationMinutes||30} minutes\n\nPlease confirm availability and share the meeting details.\n\nThank you,\n${values.name}`;return{...values,start,end,body};}
form.addEventListener('submit',e=>{e.preventDefault();const m=meetingData();if(!m)return;window.location.href='mailto:'+config.email+'?subject='+encodeURIComponent('Consultation request — '+m.company)+'&body='+encodeURIComponent(m.body);$('#form-status').textContent='Your email draft is ready to open. Send it from your email app to request this time. If no app opens, email '+config.email+' directly.';});
function stamp(d){return d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');}
$('#google-calendar').addEventListener('click',()=>{const m=meetingData();if(!m)return;const params=new URLSearchParams({action:'TEMPLATE',text:'Tentative consultation — BIM AEC Solutions',dates:stamp(m.start)+'/'+stamp(m.end),details:'TENTATIVE — subject to confirmation by Menglim. Email '+config.email+' to request this time.\n\n'+m.body,location:'Online — meeting link to be confirmed',ctz:userZone});window.open('https://calendar.google.com/calendar/render?'+params.toString(),'_blank','noopener,noreferrer');$('#form-status').textContent='A tentative calendar draft has opened. Email your request to Menglim to confirm availability.';});
function icsEscape(s){return String(s).replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');}
function foldIcs(line){let chunks=[],part='',bytes=0;for(const char of line){const n=new TextEncoder().encode(char).length;if(bytes+n>73){chunks.push(part);part=' ';bytes=1;}part+=char;bytes+=n;}chunks.push(part);return chunks.join('\r\n');}
$('#download-calendar').addEventListener('click',()=>{const m=meetingData();if(!m)return;const uid=(globalThis.crypto?.randomUUID?.()||String(Date.now()))+'@bimaec-consultation';const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//BIM AEC Solutions//Consultation Request//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT','UID:'+uid,'DTSTAMP:'+stamp(new Date()),'DTSTART:'+stamp(m.start),'DTEND:'+stamp(m.end),'SUMMARY:Tentative consultation - BIM AEC Solutions','DESCRIPTION:'+icsEscape('TENTATIVE — subject to confirmation. Email '+config.email+' to request this time.\n\n'+m.body),'LOCATION:Online - meeting link to be confirmed','STATUS:TENTATIVE','TRANSP:TRANSPARENT','END:VEVENT','END:VCALENDAR'];const blob=new Blob([lines.map(foldIcs).join('\r\n')+'\r\n'],{type:'text/calendar;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='BIM-AEC-tentative-consultation.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#form-status').textContent='Your tentative calendar draft has downloaded. Email Menglim to request and confirm the meeting.';});
function clock(){$('#local-clock').textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Phnom_Penh',hour:'2-digit',minute:'2-digit'}).format(new Date())+' · UTC+7';}
clock();setInterval(clock,60000);$('#year').textContent=new Date().getFullYear();
