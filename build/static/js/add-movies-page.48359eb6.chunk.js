(this["webpackJsonpwebbylab-test-task-front"]=this["webpackJsonpwebbylab-test-task-front"]||[]).push([[2],{117:function(e,t,a){"use strict";e.exports=a(118)},118:function(e,t,a){"use strict";var n=a(61),r=a(120),o=a(124),i=a(125)||0;function l(){return r(i)}e.exports=l,e.exports.generate=l,e.exports.seed=function(t){return n.seed(t),e.exports},e.exports.worker=function(t){return i=t,e.exports},e.exports.characters=function(e){return void 0!==e&&n.characters(e),n.shuffled()},e.exports.isValid=o},119:function(e,t,a){"use strict";var n=1;e.exports={nextValue:function(){return(n=(9301*n+49297)%233280)/233280},seed:function(e){n=e}}},120:function(e,t,a){"use strict";var n,r,o=a(121);a(61);e.exports=function(e){var t="",a=Math.floor(.001*(Date.now()-1567752802062));return a===r?n++:(n=0,r=a),t+=o(7),t+=o(e),n>0&&(t+=o(n)),t+=o(a)}},121:function(e,t,a){"use strict";var n=a(61),r=a(122),o=a(123);e.exports=function(e){for(var t,a=0,i="";!t;)i+=o(r,n.get(),1),t=e<Math.pow(16,a+1),a++;return i}},122:function(e,t,a){"use strict";var n,r="object"===typeof window&&(window.crypto||window.msCrypto);n=r&&r.getRandomValues?function(e){return r.getRandomValues(new Uint8Array(e))}:function(e){for(var t=[],a=0;a<e;a++)t.push(Math.floor(256*Math.random()));return t},e.exports=n},123:function(e,t){e.exports=function(e,t,a){for(var n=(2<<Math.log(t.length-1)/Math.LN2)-1,r=-~(1.6*n*a/t.length),o="";;)for(var i=e(r),l=r;l--;)if((o+=t[i[l]&n]||"").length===+a)return o}},124:function(e,t,a){"use strict";var n=a(61);e.exports=function(e){return!(!e||"string"!==typeof e||e.length<6)&&!new RegExp("[^"+n.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(e)}},125:function(e,t,a){"use strict";e.exports=0},126:function(e,t,a){e.exports={addFilmForm:"AddFilmPage_addFilmForm__3mETu",textOfLabelTitle:"AddFilmPage_textOfLabelTitle__15h8q",inputName:"AddFilmPage_inputName__2ZSNg",uploadForm:"AddFilmPage_uploadForm__2UA7z",uploadForm__Label:"AddFilmPage_uploadForm__Label___MVmn",uploadForm__Label_title:"AddFilmPage_uploadForm__Label_title__y8c5U",uploadForm__Label_input:"AddFilmPage_uploadForm__Label_input__2QnDM"}},129:function(e,t,a){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function r(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(e){if("string"===typeof e)return n(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?n(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}a.r(t),a.d(t,"default",(function(){return _}));var o=a(65),i=a(56),l=a(57),s=a(58),u=a(59),c=a(0),f=a.n(c),m=a(117),d=a.n(m),p=a(67),h=(a(74),a(60)),b=a(54),g=a(126),v=a.n(g),F=a(55),y=a.n(F),_=function(e){Object(u.a)(a,e);var t=Object(s.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return(e=t.call.apply(t,[this].concat(l))).state={title:"",releaseYear:"",format:"DVD",stars:"",filmToAdd:null,filmsList:null,uploadStatus:!1},e.titleInputId=d.a.generate(),e.releaseYearInputId=d.a.generate(),e.starsInputId=d.a.generate(),e.formatInputId=d.a.generate(),e.uploadFileInputId=d.a.generate(),e.handleSubmit=function(t){t.preventDefault();var a=e.state,n=a.title,r=a.releaseYear,o=a.format,i=a.stars;if(""!==n&&""!==r&&""!==i){var l=i.split(", ");e.validateForm(n,+r,l)&&e.setState({filmToAdd:{title:n,releaseYear:+r,format:o,stars:l}})}else p.NotificationManager.error("Please, fill empty inputs!","Some of inputs are empty...",5e3)},e.handleChange=function(t){var a=t.target,n=a.name,r=a.value;if("releaseYear"===n&&r<0)return t.target.value=0,void p.NotificationManager.error("Please, enter a year from 1850 to 2020","Release year can not be less, then 0!",5e3);e.setState(Object(o.a)({},n,r))},e.addNewFilmInDb=function(e){h.a(e).catch((function(e){return console.log(e)}))},e.setFilmsFromDbToState=function(){h.c().then((function(t){var a=t.data;e.setFilmsToState(a)})).catch((function(e){return console.log(e)}))},e.setFilmsToState=function(t){e.setState({filmsList:t})},e.isFilmDuplicateByYearAndActors=function(t,a,n){var r=e.findFilmByReleaseYear(a,t),o=e.findFilmsByActors(n,t);return!!(r&&o.length>0)},e.findFilmByReleaseYear=function(e,t){return t.find((function(t){return t.releaseYear===e}))},e.findFilmsByActors=function(e,t){var a=[];return e.find((function(e){return t.find((function(t){t.stars.includes(e)&&a.push(t)}))})),a},e.resetState=function(){e.setState({title:"",releaseYear:"",format:"DVD",stars:"",filmToAdd:null})},e.checkArrayConsistOfUniqueElements=function(e){var t=r(new Set(e));return e.length===t.length},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){this.setFilmsFromDbToState()}},{key:"componentDidUpdate",value:function(){null!==this.state.filmToAdd&&(this.addNewFilmInDb(this.state.filmToAdd),this.resetState()),null===this.state.filmToAdd&&this.setFilmsFromDbToState()}},{key:"handleUploadImage",value:function(e){e.preventDefault();var t=e.target.files[0],a=new FormData;a.append("file",t),h.e(a).then((function(e){p.NotificationManager.success(e.data,"File was uploaded!",5e3)})).catch((function(e){return p.NotificationManager.error(e.response.data,"Upload file failed!",5e3)}))}},{key:"validateForm",value:function(e,t,a){var n=this.validateReleaseYear(t,1850,2020),r=this.validateStarsList(a),o=this.validateOnDuplicates(e,t,a);return!!(n&&r&&o)}},{key:"validateReleaseYear",value:function(e,t,a){return!(e<t||e>a)||(p.NotificationManager.error("Please, enter year from ".concat(t," to ").concat(a),"Release year is not correct!",5e3),!1)}},{key:"validateStarsList",value:function(e){return!!this.checkArrayConsistOfUniqueElements(e)||(p.NotificationManager.error("Please, enter a unique (not repeat) actors data","Duplicate Actors Data!",5e3),!1)}},{key:"validateOnDuplicates",value:function(e,t,a){var n,r=this.state.filmsList.filter((function(t){return t.title===e}));return r.length>0&&(n=this.isFilmDuplicateByYearAndActors(r,t,a)),!n||(p.NotificationManager.error("Film with similar title and release year/actors already has added. Please, enter other release year/actors data","Duplicate Films!",5e3),!1)}},{key:"render",value:function(){var e=this.state,t=e.title,a=e.releaseYear,n=e.format,r=e.stars;return f.a.createElement(f.a.Fragment,null,f.a.createElement("form",{className:v.a.addFilmForm,onSubmit:this.handleSubmit},f.a.createElement("label",{className:v.a.labelItem,htmlFor:this.titleInputId},f.a.createElement("p",{className:v.a.textOfLabelTitle},"Film title"),f.a.createElement("input",{className:v.a.inputName,type:"text",name:"title",value:t,onChange:this.handleChange,id:this.titleInputId})),f.a.createElement("label",{className:v.a.labelItem,htmlFor:this.releaseYearInputId},f.a.createElement("p",{className:v.a.textOfLabelTitle},"Release year"),f.a.createElement("input",{className:v.a.inputName,type:"number",name:"releaseYear",value:a,onChange:this.handleChange,id:this.releaseYearInputId})),f.a.createElement("label",{className:v.a.labelItem,htmlFor:this.starsInputId},f.a.createElement("p",{className:v.a.textOfLabelTitle},"Actors (separate by commas and space)"),f.a.createElement("input",{className:v.a.inputName,type:"text",name:"stars",value:r,onChange:this.handleChange,id:this.starsInputId})),f.a.createElement("label",{className:v.a.labelItem,htmlFor:this.formatInputId},f.a.createElement("p",{className:v.a.textOfLabelTitle},"Format"),f.a.createElement("select",{className:v.a.inputName,name:"format",value:n,onChange:this.handleChange,id:this.formatInputId},f.a.createElement("option",{value:"DVD"},"DVD"),f.a.createElement("option",{value:"VHS"},"VHS"),f.a.createElement("option",{value:"Blu-Ray"},"Blu-Ray"))),f.a.createElement(b.a,{nameOfClass:y.a.addFilmFormButton,typeOfButton:"submit",holderText:"Add film"}),f.a.createElement(p.NotificationContainer,null)),f.a.createElement("form",{className:v.a.uploadForm},f.a.createElement("label",{className:v.a.uploadForm__Label,htmlFor:this.uploadFileInputId},f.a.createElement("h3",{className:v.a.uploadForm__Label_title},"Upload file from your Device to load films (only .txt)"),f.a.createElement("input",{className:v.a.uploadForm__Label_input,type:"file",accept:"text/plain,text/txt",id:this.uploadFileInputId,multiple:!0,onChange:this.handleUploadImage}))))}}]),a}(c.Component)},54:function(e,t,a){"use strict";var n=a(0),r=a.n(n);t.a=function(e){var t=e.onClickFunc,a=e.holderText,n=void 0===a?"Button":a,o=e.nameOfClass,i=e.typeOfButton,l=void 0===i?"button":i,s=e.dataId;return s?r.a.createElement("button",{className:o,type:l,onClick:t,"data-id":s},n):r.a.createElement("button",{className:o,type:l,onClick:t},n)}},55:function(e,t,a){e.exports={sortButton:"Button_sortButton__2xrgb",deleteButton:"Button_deleteButton__32a5-",backToFilmListButton:"Button_backToFilmListButton__XGy09",addFilmFormButton:"Button_addFilmFormButton__1vNvk"}},60:function(e,t,a){"use strict";a.d(t,"c",(function(){return i})),a.d(t,"d",(function(){return l})),a.d(t,"a",(function(){return s})),a.d(t,"e",(function(){return u})),a.d(t,"b",(function(){return c}));var n=a(63),r=a.n(n),o="https://powerful-peak-59605.herokuapp.com/films/",i=function(){return r.a.get(o)},l=function(e){return r.a.get(o+"".concat(e))},s=function(e){return r.a.post(o,e)},u=function(e){return r.a.post(o+"upload",e)},c=function(e){return r.a.delete(o+"".concat(e))}},61:function(e,t,a){"use strict";var n,r,o,i=a(119),l="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function s(){o=!1}function u(e){if(e){if(e!==n){if(e.length!==l.length)throw new Error("Custom alphabet for shortid must be "+l.length+" unique characters. You submitted "+e.length+" characters: "+e);var t=e.split("").filter((function(e,t,a){return t!==a.lastIndexOf(e)}));if(t.length)throw new Error("Custom alphabet for shortid must be "+l.length+" unique characters. These characters were not unique: "+t.join(", "));n=e,s()}}else n!==l&&(n=l,s())}function c(){return o||(o=function(){n||u(l);for(var e,t=n.split(""),a=[],r=i.nextValue();t.length>0;)r=i.nextValue(),e=Math.floor(r*t.length),a.push(t.splice(e,1)[0]);return a.join("")}())}e.exports={get:function(){return n||l},characters:function(e){return u(e),n},seed:function(e){i.seed(e),r!==e&&(s(),r=e)},lookup:function(e){return c()[e]},shuffled:c}},65:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"a",(function(){return n}))}}]);
//# sourceMappingURL=add-movies-page.48359eb6.chunk.js.map