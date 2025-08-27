/* ===== Year ===== */
document.getElementById('year').textContent = new Date().getFullYear();


const chatForm = document.getElementById('chat-form');
const chatText = document.getElementById('chat-text');
const chatHistory = document.getElementById('chat-history');

const replies = {
  hello: "Hey! You can ask me about my games, projects, or skills.",
  hi: "Hi! Ask me about my games, projects, or skills.",
  projects: "I am currently working on several projects ranging from fan-based experiments to original multiplayer and story-driven games. One of my main works is *The Boys: Ascent*, a third-person action game built with Unreal Engine 5 and inspired by the TV series *The Boys*, featuring multiple playable characters, missions, and multiplayer exploration. Alongside this, I create smaller prototypes and experimental builds — many of which are available on my GitHub. Feel free to check out my repositories to see my workflow, code structure, and devlogs. https://github.com/jptsjx1337",
  skills: "My core skillset is built around Unreal Engine 5, where I have over two years of hands-on experience in building gameplay systems, working with Blueprints, and writing performance-critical code in C++. Alongside this, I have a strong background in programming with more than three years of C++ practice, which allows me to design scalable systems and optimize complex mechanics. I also experiment with multiplayer networking, AI behavior, level design, and asset integration — giving me a complete view of game development from code to playability. My workflow often combines technical problem-solving with creative design, ensuring that my projects are not only functional but also engaging.",
  goals: "My long-term goal is to grow as a game developer either by contributing to large-scale projects at established studios or by building my own ambitious game that can reach a global audience. I aim to constantly expand my technical expertise, improve my design skills, and take part in projects that challenge me to think bigger. Whether as part of a team or as an independent creator, my focus is on delivering games that are not only technically polished but also memorable and meaningful for players worldwide.",
  hobbies: "Outside of development, I have a strong interest in mathematics, which I enjoy studying and applying to problem-solving, logic, and systems thinking — skills that naturally support my approach to game design and programming. I also create 3D models of popular characters as a creative outlet, experimenting with form, textures, and presentation. Some of these works are showcased on my ArtStation, where I explore the artistic side of game development alongside my technical work.",
  contact: "The best way to reach me directly is through Discord (http://discordapp.com/users/843927801291472986), where I am always available for collaboration or project discussions. I plan to add more professional contact options soon, including a dedicated email and LinkedIn profile. Meanwhile, feel free to connect via Discord to discuss opportunities or share feedback. "
};

function addBubble(message, who = 'me'){
  const div = document.createElement('div');
  div.className = `bubble ${who}`;
  div.textContent = message;
  chatHistory.appendChild(div);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = chatText.value.trim();
  if (!msg) return;
  addBubble(msg, 'me');

  const input = msg.toLowerCase();
  const words = input.split(/\s+/);
  let response = null;


  if (["hey","yo","sup","hello","hi"].some(word => words.includes(word))) {
    response = replies["hello"];
  }


  else if (["project","projects","game","games","work","works","portfolio","creation","creations","stuff","things"].some(word => input.includes(word))) {
    response = replies["projects"];
  }


  else if (["skills","skill","abilities","strengths","knowledge","tech","technologies","stack"].some(word => input.includes(word))) {
    response = replies["skills"];
  }


  else if (["goal","goals","ambition","ambitions","plans","aim","objective","objectives","mission"].some(word => input.includes(word))) {
    response = replies["goals"];
  }


  else if (["hobby","hobbies","interests","passion","passions","free time","leisure"].some(word => input.includes(word))) {
    response = replies["hobbies"];
  }


  else if (["contact","contacts","reach","message","email","discord","connect"].some(word => input.includes(word))) {
    response = replies["contact"];
  }


  else {
    response = "Preset chat only: try 'hello', 'hi', or the keywords.";
  }

  setTimeout(() => addBubble(response, 'bot'), 200);
  chatText.value = '';
});


window.addEventListener('resize', resize, { passive:true });
resize();


const colors = [
  [167, 139, 250], // violet
  [34, 211, 238],  // cyan
  [251, 113, 133], // rose
  [74, 222, 128],  // green
  [248, 113, 113]  // red-ish
];
let painting = false;
let lastX = 0, lastY = 0;
let hueIndex = 0;

function draw(x, y){
  const [r,g,b] = colors[hueIndex % colors.length];
  hueIndex++;

  const radius = 60 * (dpr);
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, `rgba(${r},${g},${b},0.55)`);
  gradient.addColorStop(0.6, `rgba(${r},${g},${b},0.12)`);
  gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
}

function fade(){

  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = `rgba(0,0,0,0.04)`; 
  ctx.fillRect(0,0,w,h);
  ctx.globalCompositeOperation = 'source-over';
  requestAnimationFrame(fade);
}
fade();

function pointerPos(e){
  if(e.touches && e.touches[0]){
    return { x: e.touches[0].clientX * dpr, y: e.touches[0].clientY * dpr };
  }
  return { x: e.clientX * dpr, y: e.clientY * dpr };
}

canvas.addEventListener('pointerdown', (e)=>{
  painting = true;
  const p = pointerPos(e);
  draw(p.x, p.y);
  lastX = p.x; lastY = p.y;
});
canvas.addEventListener('pointermove', (e)=>{
  if(!painting) return;
  const p = pointerPos(e);
  const dx = p.x - lastX;
  const dy = p.y - lastY;
  const dist = Math.hypot(dx, dy);
  const steps = Math.max(1, Math.floor(dist / (8 * dpr)));
  for(let i=1;i<=steps;i++){
    const t = i/steps;
    draw(lastX + dx*t, lastY + dy*t);
  }
  lastX = p.x; lastY = p.y;
});
window.addEventListener('pointerup', ()=> painting=false);
window.addEventListener('pointerleave', ()=> painting=false);
canvas.addEventListener('touchstart', (e)=>{ painting=true; }, {passive:true});
canvas.addEventListener('touchend', ()=> painting=false);


let lastScrollY = window.scrollY;
window.addEventListener('scroll', ()=>{
  const y = window.scrollY;
  const speed = Math.min(50, Math.abs(y - lastScrollY));
  lastScrollY = y;
  const cx = (innerWidth/2) * dpr;
  const cy = (innerHeight/2) * dpr;
  for(let i=0;i<2;i++){
    draw(cx + (Math.random()-0.5)*innerWidth*dpr*0.6, cy + (Math.random()-0.5)*innerHeight*dpr*0.2);
  }
}, {passive:true});
