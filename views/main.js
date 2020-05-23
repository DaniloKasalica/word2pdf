const btn  = document.getElementsByClassName('chosen')[0];
const convert=  document.getElementById('con');
const down = document.getElementById('download');


var name=''

setInterval(() => {

 const x = document.getElementById("upfile").value

   if(x){
    convert.className='convert'
    var a = x.substring( 12,x.length)
    document.getElementsByClassName('filename')[0].innerHTML= x.substring( 12,x.length) ;
    convert.disabled=false;

   }
   else{
    convert.className='disable'
    convert.disabled=true;
    document.getElementsByClassName('filename')[0].innerHTML= 'No file chosen'
    
   }
},2000)


convert.addEventListener('click',(e)=>{
e.preventDefault();
 const fileInput= document.getElementById('upfile')
 const file = new FormData();
file.append('upfile', fileInput.files[0]);
console.log(fileInput.files[0])
const name = fileInput.files[0].name
  postData(url='https://wordf2pdf.herokuapp/upload', file)

  .then(resp => resp.blob())
      .then(blob => {
        document.getElementById("form").reset();
         // create a new div element
         let loader = document.getElementById('loader') ;
         let parent = document.getElementById('load')
         loader.style.display='none';   
         let div = document.createElement('div');
        div.className='div'
        let btn = document.createElement('button');
        btn.style.animationName='downloadin'
        btn.innerHTML='DOWNLOAD';
        btn.className='download';
        //btn.setAttribute("type", "submit")
        div.appendChild(btn)
        parent.appendChild(div)
        btn.addEventListener('click',(e)=>{
         e.preventDefault();
          download(blob,name+'.pdf')
        })
        haver(btn)
       // and give it some content 
  // add the text node to the newly created div
    
    
  })

  
let loader = document.getElementById('loader') ;
loader.style.display='';
})
function haver(btn){
  
  btn.addEventListener('mouseover',()=>{   
    document.getElementsByClassName('download')[0].innerHTML="<p>"+name+"</p";
    });
    btn.addEventListener('mouseleave',(e)=>{
      document.getElementsByClassName('download')[0].innerHTML='DOWNLOAD'
    })

}



async function postData(url = '' , data ,  type="text/html; charset=UTF-8") {
  // Default options are marked with *
  const response = await fetch(url, {
    body: data,
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
  });
  return response; 
}

async function postData2(url, data ) {
  // Default options are marked with *
  const response = await fetch(url, {
    body: data,
    headers:{
      "Content-Type":"application/json"
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
  });
  return response; 
}



  function download(blob,name){
   const url = window.URL.createObjectURL(blob);
   const a = document.createElement('a');
   a.style.display = 'none';
   a.href = url;
   // the filename you want
   a.download = name;
   document.body.appendChild(a);
   a.click();
   window.URL.revokeObjectURL(url);
   setdefault()
 }
  function setdefault(){
    let child = document.getElementsByClassName('div')[0];
    child.style.animationName='downloadout'
    child.parentNode.removeChild(child)
    
  }