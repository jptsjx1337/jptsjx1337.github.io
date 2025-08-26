/* ===== Year ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== Chat (keyword-driven) ===== */
const chatForm = document.getElementById('chat-form');
const chatText = document.getElementById('chat-text');
const chatHistory = document.getElementById('chat-history');

const replies = {
  hello: "Hey! You can ask me about my games, projects, or skills.",
  hi: "Hi! Ask me about my games, projects, or skills.",
  projects: "At the moment I am working on a single project that is still in development — The Boys: Ascent, a third-person action game built with Unreal Engine 5 and inspired by the TV series The Boys. The game features 10 playable characters with unique superpowers, a storyline with missions across multiple cities including New York, and a multiplayer mode that allows players to explore the city together. Devlog: https://github.com/jptsjx1337",
  word2: "text2 — placeholder detail about my pipeline or tools (UE5, Blueprints, C++).",
  word3: "text3 — placeholder note about performance, optimization, or level streaming.",
  word4: "text4 — placeholder info on art assets, modeling, and PBR materials.",
  word5: "text5 — placeholder overview of future plans and upcoming builds."
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
  if(!msg) return;
  addBubble(msg, 'me');

  // Basic keyword routing (lowercase)
  const key = msg.toLowerCase();
  let response = replies[key];
  if(!response){
    // check if it's a greeting variant
    if(['hey','yo','sup','hello','hi'].includes(key)){
      response = replies['hello'];
    } else {
      response = "Preset chat only: try 'hello', 'hi', or keywords word1–word5.";
    }
  }
  setTimeout(() => addBubble(response, 'bot'), 200);
  chatText.value='';
});

/* ===== Canvas Neon Paint Effect ===== */
/*const canvas = document.getElementById('paint');
const ctx = canvas.getContext('2d', { alpha: true });

let w, h, dpr;
function resize(){
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.width = Math.floor(innerWidth * dpr);
  h = canvas.height = Math.floor(innerHeight * dpr);
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';

  // Clear to black (handled by CSS background) + reset fade layer
} */
window.addEventListener('resize', resize, { passive:true });
resize();

// Paint parameters for dark theme
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
  // Smooth line with radial glow
  const [r,g,b] = colors[hueIndex % colors.length];
  hueIndex++;

  const radius = 60 * (dpr);
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, `rgba(${r},${g},${b},0.55)`);
  gradient.addColorStop(0.6, `rgba(${r},${g},${b},0.12)`);
  gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

  ctx.globalCompositeOperation = 'lighter'; // additive glow on dark
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
}

function fade(){
  // Gentle fade to create a trailing ink feel
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = `rgba(0,0,0,0.04)`; // control persistence
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
  // interpolate points for smoother trail
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

/* Optional: slight paint effect on scroll so it feels 'alive' */
let lastScrollY = window.scrollY;
window.addEventListener('scroll', ()=>{
  const y = window.scrollY;
  const speed = Math.min(50, Math.abs(y - lastScrollY));
  lastScrollY = y;
  // sprinkle faint blobs horizontally across the viewport center
  const cx = (innerWidth/2) * dpr;
  const cy = (innerHeight/2) * dpr;
  for(let i=0;i<2;i++){
    draw(cx + (Math.random()-0.5)*innerWidth*dpr*0.6, cy + (Math.random()-0.5)*innerHeight*dpr*0.2);
  }
}, {passive:true});
