(function(){
  var INDEX=[
    {t:"Intelligent Music Search & Recommendation System",k:"Project · Python, Flask, Trie, Bloom Filter, NLP",w:["music","intelligent","search","recommendation","python","flask","trie","bloom","filter","nlp","json","playlist","fuzzy","spell"],h:"#p-music"},
    {t:"College Dashboard",k:"Project · Python, Flask, MySQL, REST API",w:["college","dashboard","comparison","python","flask","mysql","rest","api","crud","sql"],h:"#p-college"},
    {t:"React",k:"Skill · Web",w:["react","frontend","advanced"],h:"#skills"},
    {t:"Python",k:"Skill · Language and backend",w:["python"],h:"#skills"},
    {t:"Flask",k:"Skill · Backend framework",w:["flask","backend"],h:"#skills"},
    {t:"MySQL",k:"Skill · Database",w:["mysql","sql","database"],h:"#skills"},
    {t:"C++",k:"Skill · Language",w:["c++","cpp"],h:"#skills"},
    {t:"Java",k:"Skill · Learning now",w:["java","learning"],h:"#skills"},
    {t:"Trie and Bloom Filter",k:"Skill · Data structures",w:["trie","bloom","filter","data","structures","algorithms","dsa"],h:"#skills"},
    {t:"HTML and CSS",k:"Skill · Web",w:["html","css","web"],h:"#skills"},
    {t:"REST APIs",k:"Skill · Backend",w:["rest","api","apis"],h:"#skills"},
    {t:"AI/ML Virtual Internship",k:"Internship · Eduskill",w:["ai","ml","artificial","machine","learning","internship","eduskill","virtual"],h:"#experience"},
    {t:"Java Full Stack Development Virtual Internship",k:"Internship · Eduskill",w:["java","full","stack","development","internship","eduskill","virtual"],h:"#experience"},
    {t:"SRM Institute of Science and Technology",k:"Education · B.Tech IT, CGPA 8.33",w:["srm","institute","education","btech","information","technology","cgpa"],h:"#education"}
  ];
  var q=document.getElementById("q"),res=document.getElementById("results"),hint=document.getElementById("hint"),chips=document.getElementById("chips");
  function esc(s){return s.replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function mark(text,p){
    var re=new RegExp("(^|[^a-z0-9+])("+p.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")","gi"),m,last=0,html="";
    while((m=re.exec(text))){var s=m.index+m[1].length;html+=esc(text.slice(last,s))+"<mark>"+esc(m[2])+"</mark>";last=s+m[2].length}
    return html+esc(text.slice(last));
  }
  function run(){
    var p=q.value.trim().toLowerCase();
    res.innerHTML="";
    if(!p){hint.textContent="Type the start of a skill, tool or project name. It works the way my music project indexes songs.";return}
    var hits=INDEX.filter(function(it){return it.w.some(function(w){return w.indexOf(p)===0})||it.t.toLowerCase().split(/\s+/).some(function(w){return w.indexOf(p)===0})});
    hint.textContent=hits.length?hits.length+(hits.length===1?" match":" matches")+" for “"+q.value.trim()+"”":"No matches. Try a shorter prefix such as “fl” or “re”.";
    hits.forEach(function(it){
      var li=document.createElement("li");
      li.innerHTML='<a href="'+it.h+'"><div class="t">'+mark(it.t,p)+'</div><div class="k">'+esc(it.k)+'</div></a>';
      res.appendChild(li);
    });
  }
  ["React","Flask","Trie","MySQL","Python","Java"].forEach(function(c){
    var b=document.createElement("button");b.type="button";b.textContent=c;
    b.addEventListener("click",function(){q.value=c.toLowerCase().slice(0,3);q.focus();run()});
    chips.appendChild(b);
  });
  q.addEventListener("input",run);

  // rotating role line
  var roles=["Full Stack Developer","AI/ML enthusiast","Problem solver","React and Flask builder"],ri=0,ci=roles[0].length,del=true,el=document.getElementById("typed");
  if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    (function tick(){
      var w=roles[ri];
      if(del){ci--;if(ci<=0){del=false;ri=(ri+1)%roles.length}}
      else{ci++;if(ci>=roles[ri].length)del=true}
      el.textContent=roles[ri].slice(0,Math.max(ci,0))||"\u00a0";
      setTimeout(tick,del&&ci>=roles[ri].length-1?1400:(del?35:70));
    })();
  }

  // theme toggle
  var root=document.documentElement,tb=document.getElementById("theme");
  tb.addEventListener("click",function(){
    var dark=root.getAttribute("data-theme")==="dark"||(!root.getAttribute("data-theme")&&window.matchMedia("(prefers-color-scheme: dark)").matches);
    root.setAttribute("data-theme",dark?"light":"dark");
  });
})();
