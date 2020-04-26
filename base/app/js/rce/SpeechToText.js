/*Copyright 2020 Félix Albertos Marco

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
 * Tested on Chrome
 */

class SpeechToText{
	constructor(){
		if('webkitSpeechRecognition' in window){
			this._lang="es-es";
			this._recognition=false;
			this._result="";
			this._sr = new webkitSpeechRecognition();
			this._sr.continuous = true;
			this._sr.interimResults = true;
			let _this=this;
			this._sr.onstart = function(event){
				_this.start(_this);
			}
			this._sr.onerror = function(event){
				_this.error(event);
			}
			this._sr.onend = function(){
				_this.end(_this);
			}
			this._sr.onresult = function(event){
				_this.result(event,_this);
			}
		}
	}
	setLang(lang){
		this._lang=lang;
	}

	start(_this){
		_this.setDictation(true);
	}
	error(event){
		console.log(event.error);
	}
	end(_this){
		_this.setDictation(false);
	}
	result(event,_this){
		this._result="";
		for(let i = event.resultIndex;i<event.results.length;i++){
			if (event.results[i].isFinal) {
				this._result += event.results[i][0].transcript;
				this.stopDictation();
				CustomGame.com(
					"speechToText",
					this,
					[
						this._result
					]
				);
			}
		}
	}
	setDictation(v){
		this.recognition=v;
	}
	toggleDictation(){
		if(this.recognition){
			this._sr.stop();
		}else{
			this._sr.lang = this._lang;
			this._sr.start();
		}
	}
	startDictation(){
		if(this.recognition){
			this.stopDication();
		}
		this._sr.lang = this._lang;
		this._sr.start();
	}
	stopDictation(){
		this._sr.stop();
	}
}
