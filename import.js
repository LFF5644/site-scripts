const doc=document;
const docElement=doc.documentElement;
const con=console;
const ESC=escape;
const unESC=unescape;

function GetId(id){return doc.getElementById(id)}

function GetIdClass(id){return doc.getElementsByClassName(id)}// #TRASH_FUNCTION;

function GetIdTag(id){return doc.getElementsByTagName(id)}// #TRASH_FUNCTION;

function GetIdName(id){return doc.getElementsByName(id)}// #TRASH_FUNCTION;

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
function ConvertText(text,to="lower"){// #TRASH_FUNCTION;
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
function GetLine(fileText,lineRead,sep=["=","\n"]){// #TRASH_FUNCTION;
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
function StrX(text,x){
    return Array(x)
    	.fill(text)
    	.join("");
}
function ChangeURL(url){return(history.replaceState(null,null,url))}

function decodeBase64(text){return(atob(text))}

function encodeBase64(text){return(btoa(text))}

function AdvancedCaseChanger(text,upper="0,1",lower="1,[END]",upperPlace="left",resultType="string"){// #TRASH_FUNCTION;
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
function REPLACEALL(text="Hallo Welt!",replace=[[" ","_"],["!","?"]]){// #TRASH_FUNCTION;
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
function AttrCSSSet(object,attrName,attrData,id=true){// #TRASH_FUNCTION;
	if(!id){object=GetId(object)}
	object.style[attrName]=attrData;
	return(AttrCSSGet(object,attrName,true))
}
function AttrCSSGet(object,attrName,id=true){// #TRASH_FUNCTION;
	if(!id){object=GetId(object)}
	return(object.style[attrName]);
}
function FindIndex(list,value,doubleCheck=true){// #TRASH_FUNCTION;
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
function setArgInterval(fun,time,args=null){// #TRASH_FUNCTION;
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