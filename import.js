const doc=document;
const docElement=doc.documentElement;
const con=console;
const cls=con.clear;
const ESC=escape;
const unESC=unescape;

function print(text){return(con.log(text))}

function type(typeFrom){return typeof(typeFrom)}

function GetId(id){return doc.getElementById(id)}

function GetIdClass(id){return doc.getElementsByClassName(id)}

function GetIdTag(id){return doc.getElementsByTagName(id)}

function GetIdName(id){return doc.getElementsByName(id)}

function GetHashVar(){
	let text=location.hash;
	let result=[];
	let t,t_;

	if(text.charAt(0)==="#"){
		text=text.substr(1);
	}
	if(text.includes("=")===false){return null}
	
	if(text.includes("&")===true){
		for(t of text.split("&")){
			t_=t.split("=");
			result.push([t_])
		}
	}else{
		result.push([]);
		for(t of text.split("=")){
			result[0].push(t);
		}
	}return result;
}
function CreateElement(element){
	element=doc.createElement(element);
	return element;
}
function AppendChild(element,who,id=true){
	if(id===false){
		who=GetId(who);
	}
	who.appendChild(element);
}
function CreateElement_P(woh,innerText=null){
	let p=CreateElement("p");
	if(innerText!=null){
		p.innerText=innerText;
	}
	AppendChild(p,who);
	return p;
}
function CreateElement_A(who,innerText=null,href=null,id=true){
	let a=CreateElement("a");
	
	if(innerText!=null){
		a.innerText=innerText;
	}
	if(href!=null){
		a.href=href;
	}

	AppendChild(a,who,id);
	return a;
}
function ConvertText(text,to="lower"){
	con.log("[ConvertText][WARNING]: THIS FUNCTION IS OLD!!!")
	let result=null;
	if(typeof(to)===String){
		to=to.toLowerCase();
	}
	if(to===true||to==="upper"||to===1){
		result=text.toUpperCase();
	}else if(to===false||to==="lower"||to===0){
		result=text.toLowerCase();
	}
	return result;
}
function LetTextBlinck(){
	for(object of letTextBlinck_what){
		try{
			GetId(object).style.opacity = Math.sin(Date.now() / 99) * .25 + .75;
		}catch(e){}
	}
}
function GetFile(file,thenRun,args=null,error=null){
	try{
		fetch(file).then(function(result){
			result.text().then(function(text){
				if(args!==null){
					thenRun(text,args)
				}else{thenRun(text)}
			})})
	}catch(e){
		if(error!=null&&args!=null){
			error(e,args)
		}
		else if(error!=null&&args==null){
			error(e)
		}else if(error==null){con.log("[GetFile][catch][ERROR]: File cant download! "+file)}
	}
}
function GetFileHeader(file,thenRun,args=null){
}
function ConfigLine(fileText,change,sep=["=","\n"]){
	let newFile="";

	if(typeof(change)!=="object"){return "ERROR typeof(change) is not 'object' !"}
	if(typeof(sep  )!=="object"){return "ERROR typeof(sep) is not 'object' !"}
	for(line of fileText.split(sep[1])){
		if(line.includes(sep[0])===true&&line.charAt(0)!=="#"&&line.substr(0,2)!=="//"){
			lineSplited=line.split(sep[0]);
			if(lineSplited[0]==change[0]){
				lineSplited[1]=change[1];
			}
			newFile=newFile+lineSplited[0]+sep[0]+lineSplited[1]+sep[1];
		}
	}
	return(newFile);
}
function GetLine(fileText,lineRead,sep=["=","\n"]){
	let result=""

	if(typeof(lineRead)!=="string"){return "ERROR typeof(lineRead) is not 'string' !"}
	if(typeof(sep     )!=="object"){return "ERROR typeof(sep) is not 'object' !"}
	for(line of fileText.split(sep[1])){
		if(line.includes(sep[0])===true&&line.charAt(0)!=="#"&&line.substr(0,2)!=="//"){
			lineSplited=line.split(sep[0]);
			if(lineSplited[0]==lineRead){
				result=[lineSplited[0],lineSplited[1]]
				return(result);
			}
		}
	}
	return("ERROR lineRead is not in fileText!");
}
function TryPrompt(promptText,exitText){
	let result=null;
	while(true){
		result=prompt(promptText);
		if(result==null){
			let exitQ=confirm(exitText)
			if(exitQ===true){
				print("TryPrompt Exit '"+promptText+"'");
				return(null);
			}else{}
		}else{break}
	}
	return(result);
}
function StrX(text,x){
	let newText=""
	for(_ of Array(x)){
    	newText=newText+text
    }
    return(newText);
}
function Login(loginName=null,loginPT=null,type=null,start=null,args=null,box=false,thenRun=null){
	if(loginName===null&&loginPT===null&&type===null){
		print("Login...")
		let userName=TryPrompt("Bitte Benutzername eingeben:","Möchten Sie den Login ABBRECHEN?");
		if(userName==null){
			return("exit");
		}
		print("Username: "+userName)
		let userPassword=TryPrompt("Bitte Password zu Benutzer '"+userName+"' eingeben:","Möchten Sie den Login ABBRECHEN?")
		if(userPassword===null){
			return("exit");
		}
		if(box||box==null){
			let div=CreateElement("div");
			div.className="box";
			div.id="box_login";
			div.innerHTML=`<h1>Auf Server Warten!</h1><p>Bitte Auf Server Warten</p><p><progress style="max-width:100%;"/></p><p><button onclick="GetId('box_login').remove()" class="styledBTNMint">HIDE</button></p>`;
			AppendChild(div,doc.body);
		}

		GetFile(`<?=globals.vars['api_login.api']?>?want=LOGIN&usrName=${userName}&usrPassword=${userPassword}`,LoginGetData,[false,thenRun])
	}
	else if(loginName!=null&&loginPT!=null&&type!=null){
		let was="";
		if(type=="token"){was="Token"}
		else if(type=="password"){was="Password"}
		else{return("error")}
		if(box||box==null){
			let div=CreateElement("div");
			div.className="box";
			div.id="box_login";
			div.innerHTML=`<h1>Auf Server Warten!</h1><p>Bitte Auf Server Warten</p><p><progress style="max-width:100%;"/></p><p><button onclick="GetId('box_login').remove()" class="styledBTNMint">HIDE</button></p>`;
			AppendChild(div,doc.body);
		}
		if(start==null){start=LoginGetData}
		if(args==null){args=true}
		GetFile(`<?=globals.vars['api_login.api']?>?want=LOGIN&usrName=${loginName}&usr${was}=${loginPT}`,start,[args,thenRun])
		return("Successfully!");
	}
}
function LoginGetData(result,args=[true,null]){
	let [silentLogin,thenRun]=args;
	try{GetId("box_login").remove()}catch(e){}
	if(!silentLogin){
		if(result==="WRONG!"){
			let retry=confirm("Password oder Benutzername FALSCH!\nMöchten Sie es erneut versuchen?")
			if(retry===true){
				Login();
				return
			}else{return}
		}
		if(ConvertText(result,0)==="undefined"||ConvertText(result,0)===ConvertText("WRONG WANT!",0)){
			let retry=confirm("Es ist ein Fehler Aufgetreten!\nMöchten Sie es erneut versuchen?")
			if(retry===true){
				Login();
				return
			}else{return}
		}
		//console.log(type(result))
		//console.log(result)
		if(type(result)=="string"){result=JSON.parse(result)}
		//console.log(result['acc.ini'])
		//console.log(result['const.ini'])
		//console.log(result['serverOnly.ini'])
		let userName=GetLine(result['acc.ini'],"username")[1];
		let userPassword=decodeBase64(GetLine(result['acc.ini'],"password")[1].split("[IQUIL]").join("="));
		let token=GetLine(result['serverOnly.ini'],"token")[1];
		let mail=GetLine(result['acc.ini'],"email")[1];
		let tell=GetLine(result['acc.ini'],"tell")[1];
		let rang=GetLine(result['const.ini'],"rang")[1];
		let created=GetLine(result['const.ini'],"created")[1];
		let d=new Date(Number(created));
		let day=d.getDay();
		let dayNames=["Montag","Dinstag","Mittwoch","Donnastag","Freitag","Samstag","Sonntag"];
		let index=0;
		for(dn of dayNames){
			index+=1;
			if(index===day){
				day=dn;
			}
		}
		let createdFull=day+" am "+String(d.getDate()).padStart(2,0)+"."+String(d.getMonth()+1).padStart(2,0)+"."+d.getFullYear()+" um "+String(d.getHours()).padStart(2,0)+":"+String(d.getMinutes()).padStart(2,0)
		alert(`Hir Ihre Daten:\nBenutzername: ${userName}\nPassword: ${StrX("*",userPassword.length)}\nPassword Länge: ${userPassword.length}\ntoken Länge: ${token.length}\nE-Mail: ${mail=="[NULL]"?"Nicht Angegeben":mail}\nTelefonnummer: ${tell=="[NULL]"?"Nicht Angegeben":tell}\nIhr RANG: ${rang=="[NULL]"?"NICHTS":rang}\nAccount erstelt: ${createdFull}`)
		localStorage.setItem("loginData",userName+"|"+token)
		if(thenRun!=null){thenRun(true)}
	}else if(silentLogin){
		if(result==="WRONG!"){
			let retry=confirm("Beim Automatischen LOGIN ist ein Fehler Aufgetreten!\nIhr Passwort oder Benutzername ist Falsch ODER ihr token ist abgelaufen/geändert worden wenn dis der fall ist müssen sie sich auf allen Geräten NEU Anmelden!\nMöchten Sie es mernuell versuchen?")
			if(retry){
				Login();
				return(false)
			}else{
				if(confirm("Sollen Ihre Automatischen Login Daten Löschen?")){
					localStorage.setItem("loginData","null")
				}
				if(thenRun!=null){thenRun(false)}
				return(false)
			}
		}if(ConvertText(result,0)==="undefined"||ConvertText(result,0)===ConvertText("WRONG WANT!",0)){
			let retry=confirm("Beim Automatischen LOGIN ist ein Fehler Aufgetreten!\n\nMöchten Sie es mernuell versuchen?")
			if(retry){
				Login();
				return("retry".toUpperCase());
			}else{
				if(confirm("Sollen Ihre Automatischen Login Daten Löschen?")){
					localStorage.setItem("loginData","null")
				}
				if(thenRun!=null){thenRun(false)}
				return(false)
			}
		}else{
			if(type(result)=="string"){result=JSON.parse(result)}
			let userName=GetLine(result['acc.ini'],"username")[1];
			let token=GetLine(result['serverOnly.ini'],"token")[1];
			localStorage.setItem("loginData",userName+"|"+token)

			con.log("Silent Login Successfully!")
			if(thenRun!=null){thenRun(true)}
		}
	}
	try{GetId("button_logout").style.visibility="visible";}catch(e){}
	try{GetId("button_accSettings").style.visibility="visible";}catch(e){}
	try{GetId("button_login").style.visibility="hidden";}catch(e){}
	try{GetId("button_register").style.visibility="hidden";}catch(e){}

	try{GetId("button_logout").hidden=false;}catch(e){}
	try{GetId("button_accSettings").hidden=false;}catch(e){}
	try{GetId("button_login").hidden=true;}catch(e){}
	try{GetId("button_register").hidden=true;}catch(e){}
}
function Register(){
	alert("ja die function kommt bald noch!\ndu kannst dich aber regestriren indem du auf "+location.host+"/scripts/register.api?usrName=[DEIN_BENUTZERNAME]&userPassword=[DEIN_PASSWORT]\ndann kommt ein großer text der nicht lesbar ist. dann wurde der Account erstelt wenn dort aber 'ACCOUNT EXIST' steht exestirt der Account bereitz!\n EXAMPLE:\n"+location.host+"/scripts/register.api?usrName=max&userPassword=mustermann\n"+location.host+"/scripts/register.api?usrName=lff&userPassword=schweres password haha!!!")
}
function Logout(){
	let logout=confirm("Wollen Sie sich Ausloggen?");
	if(logout){
		localStorage.setItem("loginData","LOGOUT!");
		location=href="/";
	}
}
function AccSettings(result=null,receiv=false){
	if(!receiv){
		print("SETTINGS OPENONG...")
		ChangeURL("#settings=1")
		let loginData=localStorage.getItem("loginData").split("|");
		Login(loginData[0],loginData[1],"token",AccSettings,true)
		let div=CreateElement("div");
		div.className="fullWindow";
		div.id="div_accSettings";
		div.style.height="100%"
		doc.body.style.visibility="hidden"
		div.style.visibility="visible"
		div.innerHTML=`<center><h1>Account Einstellungen - <a onclick="location.href='#'">GO HOME</a></h1>
		<p>Bitte Auf Server Warten....</p>
		<button class="topRight" onclick="GetId('div_accSettings').remove();doc.body.style.visibility='visible'">Back</button>
		</center>`;
		AppendChild(div,doc.body);
	}else if(receiv){
		GoBack=()=>{
			GetId("div_accSettings").remove();
			AttrCSSSet(doc.body,"visibility","visible");
			ChangeURL("#");
		}

		if(type(result=="string")){result=JSON.parse(result)}
		
		let fileData_accINI=result["acc.ini"];
		let fileData_constINI=result["const.ini"];
		let fileData_serverOnlyINI=result["serverOnly.ini"];
		let fileData_systemLOG=result["system.log"];

		let userName=GetLine(fileData_accINI,"username")[1];
		let userPassword=GetLine(fileData_accINI,"password")[1];
		let mail=GetLine(fileData_accINI,"email")[1];
		let tell=GetLine(fileData_accINI,"tell")[1];
		let rang=GetLine(fileData_constINI,"rang")[1];
		let div=GetId("div_accSettings");
		//print(docElement.clientWidth/3)
		print("SETTINGS OPENED")
		btn_showHide=()=>{
			let btn=GetId('button_showHiddePWD');
			if(btn.innerText=='SHOW'){
				btn.innerText='HIDDE';
				GetId('input_password').type='text'
			}else{
				GetId('input_password').type='password';
				btn.innerText='SHOW';
			}
		}
		ShowHideLogHistory=()=>{
			let btn=GetId("button_showHiddeLOG");
			let div=GetId("div_showLog");

			if(btn.innerText=="Show LOG"){
				btn.innerText="Hidde LOG";
				let element_p=CreateElement("p");
				let lineNumber=0;
				let result="";
				let ifSubStrHash=(pos)=>{
					if(pos=="incode"){
						if(onBr.substr(0,1)=="#"||onBr.substr(0,2)=="//"){
							return(" style='color:gray'")
						}else{
							return("");
						}
					}else if(pos=="GETLOG"){
						if(onBr.substr(0,2)=="//"){return(onBr.substr(2))}
						if(onBr.substr(0,1)=="#"){return(onBr.substr(1))}
						else{return(onBr)}
					}
					else if(pos="2CODE?"){
						if(onBr.substr(0,1)=="#"||onBr.substr(0,2)=="//"){
							let result="";
							let simToPrint="";
							if(onBr.substr(0,1)=="#"){simToPrint="#"}
							if(onBr.substr(0,2)=="//"){simToPrint="//"}
							result+="<code class='normal darkred underLine'>"+simToPrint+"</code>";
							return(result);
						}else{return("")}
					}
				}
				for(onBr of fileData_systemLOG.split("\n")){
					lineNumber+=1;
					result+="<slim>"+String(lineNumber).padStart(3,"0")
					result+=`: ${ifSubStrHash('2CODE?')}<code${ifSubStrHash('incode')} class='normal'>${ifSubStrHash('GETLOG')}`
					result+="<br></code></slim>"
				}

				element_p.innerHTML=result;
				element_p.id="p_showLog";
				AttrCSSSet(element_p,"border-color","green");
				AttrCSSSet(element_p,"font-family","code");
				AttrCSSSet(element_p,"max-height",docElement.clientHeight/1.5+"px")
				element_p.className="boxText scroll-y";

				AppendChild(element_p,div);
			}else{
				btn.innerText="Show LOG";
				GetId("p_showLog").remove();


			}
		}

		div.innerHTML=`<center><h1>Account Einstellungen - <a onclick="GetId('div_accSettings').remove();doc.body.style.visibility='visible'">GO HOME</a></h1>
			<div id="div_accSettings_options" style="margin-left: ${docElement.clientWidth/3}px;text-align: left;">
			<p><label>Passwort: <input id="input_password" type="password" value="${decodeBase64(REPLACEALL(userPassword,[["[IQUIL]","="]]))}"/></label>
			<button class="styledBTNMint" id="button_showHiddePWD" onclick="btn_showHide()">SHOW</button></p>
			<p><label>E-Mail: </label><input type="text" value="${mail=="[NULL]"?"":mail}"/></p>
			<p><label>Telefonnummer: </label><input type="text" value="${tell=="[NULL]"?"":tell}"/></p>
			<p>Ihr Rang: ${rang}</p>
			<button class="styledBTNMint" onclick="ShowHideLogHistory()" id="button_showHiddeLOG">Show LOG</button>
			<div id="div_showLog" style="max-width:600px;max-height:50%;"></div>

			</center>
			<button class="topRight styledBTN" onclick="GoBack()">Back</button>`;
	onresize=()=>{
		try{
			let div=GetId("div_accSettings_options");
			div.style="margin-left: "+docElement.clientWidth/3+"px;text-align: left;"
		}catch(e){onresize=null}
		try{
			let log=GetId("p_showLog");
			AttrCSSSet(log,"max-height",docElement.clientHeight/2+"px")
		}
		catch(e){}
	}
	}
}
function ChangeURL(url){return(history.replaceState(null,null,url))}

function decodeBase64(text){return(atob(text))}

function encodeBase64(text){return(btoa(text))}

function GetCodeZeichen(version=1,sab=["[","]"]){
	if(type(sab)=="string"
		||type(sab)=="number"){
			sab=[String(sab),String(sab)]}
	if(version==1||version=="1.x"){
		let zeichen_encode=[
			["/",sab[0]+"SLASH"+sab[1]],
			["\\",sab[0]+"BS"+sab[1]],
			[".",sab[0]+"DOT"+sab[1]],
			["=",sab[0]+"IQUIL"+sab[1]],
			["\n",sab[0]+"BR"+sab[1]],
			["\r",sab[0]+"BS_R"+sab[1]],
			["Ä",sab[0]+"AE"+sab[1]],
			["ä",sab[0]+"ae"+sab[1]],
			["Ü",sab[0]+"UE"+sab[1]],
			["ü",sab[0]+"ue"+sab[1]],
			["Ö",sab[0]+"OE"+sab[1]],
			["ö",sab[0]+"oe"+sab[1]],
			["#",sab[0]+"HASH"+sab[1]],
			[":",sab[0]+"2DOT"+sab[1]],
			["!",sab[0]+"EXCLAMATION_MARK"+sab[1]],
			["?",sab[0]+"QUESTION_MARK"+sab[1]],
			[",",sab[0]+"COMMA"+sab[1]],
			[";",sab[0]+"SIMICOLON"+sab[1]],
			["1",sab[0]+"ONE"+sab[1]],
			["2",sab[0]+"TOW"+sab[1]],
			["3",sab[0]+"THREE"+sab[1]],
			["4",sab[0]+"FOUR"+sab[1]],
			["5",sab[0]+"FIVE"+sab[1]],
			["6",sab[0]+"SIX"+sab[1]],
			["7",sab[0]+"SEVEN"+sab[1]],
			["8",sab[0]+"EIGTH"+sab[1]],
			["9",sab[0]+"NINE"+sab[1]],
			["0",sab[0]+"ZERO"+sab[1]],
			["~",sab[0]+"TILDE"+sab[1]],
			["*",sab[0]+"STAR"+sab[1]],
			["+",sab[0]+"PLUS"+sab[1]],
			["'",sab[0]+"QUOTATION_MARKS_"+sab[1]],
			["-",sab[0]+"MINUS"+sab[1]],
			[" ",sab[0]+"SPACE"+sab[1]],
			["(",sab[0]+"KALAMA_RUND_AUF"+sab[1]],
			[")",sab[0]+"KALAMA_RUND_ZU"+sab[1]],
			["{",sab[0]+"KALAMA_GESCHWEIFT_AUF"+sab[1]],
			["}",sab[0]+"KALAMA_GESCHWEIFT_ZU"+sab[1]],
			["<",sab[0]+"KALAMA_SPITZ_AUF"+sab[1]],
			[">",sab[0]+"KALAMA_SPITZ_ZU"+sab[1]],
			["§",sab[0]+"GESETZ_PADAGRAF"+sab[1]],
			['"',sab[0]+"QUOTATION_MARKS__"+sab[1]],
			["$",sab[0]+"DOLA"+sab[1]],
			["LANDO",sab[0]+"LFF_UPPER"+sab[1]],
			["lando",sab[0]+"LFF_LOWER"+sab[1]],
			["Lando",sab[0]+"LFF_PERFECT"+sab[1]],
			["%",sab[0]+"PERZENT"+sab[1]],
			["&",sab[0]+"AND"+sab[1]],
			["|",sab[0]+"OR"+sab[1]],
			["^",sab[0]+"TURM"+sab[1]],
			["°",sab[0]+"GRAD"+sab[1]],
			["L3P3",sab[0]+"LENNARD_PESCHKO_UPPER"+sab[1]],
			["l3p3",sab[0]+"LENNARD_PESCHKO_LOWER"+sab[1]],
			["ALLANA",sab[0]+"AFF_UPPER"+sab[1]],
			["allana",sab[0]+"AFF_LOWER"+sab[1]],
			["Allana",sab[0]+"AFF_PERFECT"+sab[1]],
			];
		let zeichen_decode=[];
		for(z of zeichen_encode){
			zeichen_decode.push([z[1],z[0]]);
		}
		return([zeichen_encode,zeichen_decode]);
	}
	else{throw(Error("PLEASE ENTER A CORECT VERSION!"))}
}
function decodeZeichen(text,sab=["[","]"]){
	let zeichen=GetCodeZeichen(1,sab)[1];
	text=REPLACEALL(text,zeichen)
	return(text);
}
function encodeZeichen(text,sab=["[","]"]){
	let zeichen=GetCodeZeichen(1,sab)[0];
	text=REPLACEALL(text,zeichen)
	return(text);
}
function AdvancedCaseChanger(text,upper="0,1",lower="1,[END]",upperPlace="left",resultType="string"){
	upper=upper.split(",");
	lower=lower.split(",");
	resultType=resultType.toLowerCase();
	upperPlace=upperPlace.toLowerCase();

	let text_upper=ConvertText(text.substr(upper[0]==="[END]"?text.length-1:Number(upper[0]),upper[1]==="[END]"?text.length-1:Number(upper[1])),1)
	let text_lower=ConvertText(text.substr(lower[0]==="[END]"?text.length-1:Number(lower[0]),lower[1]==="[END]"?text.length-1:Number(lower[1])),0)
	let result=Error("PLEASE READ THE README --> README('AdvancedCaseChanger')");

	if(upperPlace=="left"){
		if(resultType=="string"){
			result=text_upper+text_lower;
		}
		else if(resultType=="list"||resultType=="array"){
			result=[text_upper,text_lower];
		}
	}else if(upperPlace=="right"){
		if(resultType=="string"){
			result=text_lower+text_upper;
		}
		else if(resultType=="list"||resultType=="array"){
			result=[text_lower,text_upper];
		}
	}
	return(result);
}
function REPLACEALL(text="Hallo Welt!",replace=[[" ","_"],["!","?"]]){
	if(type(replace)!=="object"){
		error=Error("WRONG FORMAT ONLY LISTS ACCSEPTED!")
		print(`ERROR in REPLACEALL: ${error}`)
		return(error);
	}
	for(rp of replace){
			text=text.split(rp[0]).join(rp[1]);
	}
	return(text);
}
function MasterEncode(text){
	text=encodeZeichen(text,["[","]"]);
	text=encodeBase64(text);
	text=encodeZeichen(text,["[","]"]);
	return(text);
}
function MasterDecode(text){
	text=decodeZeichen(text,["[","]"]);
	text=decodeBase64(text);
	text=decodeZeichen(text,["[","]"]);
	return(text);
}
function AttrCSSSet(object,attrName,attrData,id=true){
	if(!id){object=GetId(object)}
	object.style[attrName]=attrData;
	return(AttrCSSGet(object,attrName,true))
}
function AttrCSSGet(object,attrName,id=true){
	if(!id){object=GetId(object)}
	return(object.style[attrName]);
}
function FindIndex(list,value,doubleCheck=true){
	let result=list.findIndex((item)=>{
		if(doubleCheck){
			return(item===value);
		}else{
			return(item==value);
		}
	});
	if(result==-1){
		result=null;
	}
	return(result);
}
function randomRandint(num){
	return Math.min(num-1, Math.floor(Math.random() * num));
}
function setArgInterval(fun,time,args=null){
	let funRun=()=>{fun(args)}
	if(args==null){
		setInterval(fun,time);
	}else{
		setInterval(funRun,time);
	}	
}
function GetVar(usr,token,variable,fun=(r)=>{con.log(r)},args=null,host=""){
	let url=`${host}<?=globals.vars['api_login.api']?>?want=getVar&usrName=${encodeURI(usr)}&usrToken=${encodeURI(token)}&var=${encodeURI(variable)}`
	let res=GetFile(url,fun,args);
	return(res);
}
function SetVar(usr,token,variable,value,fun=(r)=>{con.log(r)},args=null,host=""){
	let url=`${host}<?=globals.vars['api_login.api']?>?want=setVar&usrName=${encodeURI(usr)}&usrToken=${encodeURI(token)}&var=${encodeURI(variable)}&value=${encodeURI(value)}`
	let res=GetFile(url,fun,args);
	return(res);
}
function MakeFunction(cmd,execute=false,resType="fun"){// #TRASH_FUNCTION;
	let fun=new Function(cmd);
	let res=undefined;

	if(execute){res=fun()}
	if(resType=="fun"){return(fun)}
	if(resType=="res"){return(res)}
}
function codeify(text){
	return(REPLACEALL(String(text),[["&","&amp;"],["<","&lt;"],[">","&gt;"],['"',"&quot;"]]));
}
function decodeURLS(url){
	url=unESC(url);
	url=codeify(url);
	return(url);
}
function encodeURLS(url){
	url=codeify(url);
	url=ESC(url);
	return(url);
}
function Random(){
	let randomNum=String(Math.random()).split(".").join("0")
	randomNum=Number(randomNum);
	return(randomNum)
}
function CleanLog(logDes,msg,attr=""){con.log(`${logDes}${attr}: ${msg}`);}

function AddSearch(search,value=undefined,sep="&",useCodeify=true){
	if(sep==null){sep="&"}
	if(useCodeify){value=codeify(value)}
	return(sep+search+"="+ESC(value));
}
function GetUrlStatus(data=null,data2={"geted":0}){
	if(data2.geted==undefined||data2.geted==false){
		const data_none={
			"url":location.pathname,
			"encode":1,
			"fn":(r)=>{
				con.log("----START----")
				con.log("status: "+r.status);
				con.log("size: "+r.size);
				con.log("response: "+r.response);
				con.log("----END----")
			},
			"args":"Rückgabe"
		}

		if(data==null){data=data_none;con.log("/scripts/import.js: [GetUrlStatus][WARNING]: no args load defult demo!")}

		let url=data.url;
		let encode=data.encode==undefined?true:Boolean(data.encode);
		let args=data.args==undefined?null:data.args;
		let fn=data.fn;
		let autoDecode=data.autoDecode==undefined?true:Boolean(data.autoDecode);

		if(url==undefined){
			con.log("/scripts/import.js: [GetUrlStatus][WARNING]: 'data.url' is undefined -> use other url '"+data_none.url+"'");
			data.url=data_none.url;
			url=data_none.url;
		}
		if(fn==undefined){
			con.log("/scripts/import.js: [GetUrlStatus][WARNING]: 'data.fn' is undefined -> use print function!");
			data.fn=data_none.fn;
			fn=data_none.fn;
		}
		url=ToUrl(url,false)
		con.log(url)

		let url_real="/server/toolbox/download.api";
		url_real+=AddSearch("url",url,"?",false);
		url_real+=AddSearch("encode",encode?"1":"0");

		url_real=ToUrl(url_real)
		con.log(url_real);
		GetFile(url_real,GetUrlStatus,
			{
				"geted":true,
				"fn_toExecute":fn,
				"args_forFN":args
			}
		);
		return("PLEASE WAIT...");
	}
	else if(data2.geted==true){
		data=JSON.parse(data);
		const result={};

		if(data.mustDecode){result.response=decodeBase64(data.response);}
		else{result.response=data.response}
		
		result.size=data.size_normal;
		result.status=data.status;
		result.error=data.error;

		if(data2.args_forFN==undefined){data2.fn_toExecute(result)}
		else{data2.fn_toExecute(result,data2.args_forFN)}
	}
}
function ToUrl(url,https=false){
	if(https){https="https://"}else{https="http://"}

	if(url.substr(0,2)=="//"){
		url=https+url.substr(1)
	}
	else if(url.substr(0,1)=="/"){
		url=https+location.host+url;
	}
	else if(!url.includes("http://")&&!url.includes("https://")){
		let path=location.pathname;
		if(path.substr(path.length-1)=="/"){path=path.substr(0,path.length-1)}
		url=https+location.host+path+"/"+url;
	}
	return(url);
}
function tofsStr(str){
	let allowedChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	allowedChars+="abcdefghijklmnopqrstuvwxyz";
	allowedChars+="01234567890";
	replace_char="_";
	//replace_always=true;
	let result="";

	for(char of str){
		let found=false;
		let c;
		for(c of allowedChars){
			if(char==c){
				found=true;
				break;
			}
		}
		if(found){result+=char}
		else if(!found){result+=replace_char}
	}
	return(result);
}
function overflowRemove(text,maxLength,replaceTo="..."){
	const length=text.length;
	if(length<=maxLength){return text}
	let t=0;
	let index=0;
	let newText="";
	for(t of text){
		index+=1;
		newText+=t;
		if(index>=maxLength){return newText+replaceTo}
	}
}
function preloadImg(imgElement,imgUrl){
	if(typeof(imgElement)=="string"){imgElement=GetId(imgElement);}

	const progressImgs=[
		"/files/img/gif/busyBLUE.gif",
		"/files/img/gif/busyGOLD.gif",
		"/files/img/gif/busyIRON.gif",
	]
	imgElement.src=progressImgs[randomRandint(3)];

	const tmp_img=new Image();
	tmp_img.onload=()=>{
		imgElement.src=imgUrl;
	}
	tmp_img.src=imgUrl;
}
function allowedPath(path=null){
	if(path!=null){window.pathName=path}
	if(window.pathName==undefined){
		con.log("[import.js][WARNING]: window.pathName is undefined!");
	}else{
		if(location.pathname!=window.pathName){location.href=window.pathName}
	}
}

//con.log(`IMPORT.JS run on: "${whoRunThis_raw}"`);