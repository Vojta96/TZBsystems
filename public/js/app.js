/* ── EmailJS init ──
   Nahraďte 'YOUR_PUBLIC_KEY' vaším veřejným klíčem z emailjs.com → Account → API Keys
   Service ID:  service_85vcgzd
   Template ID: template_y5hj9l4
*/
emailjs.init('YOUR_PUBLIC_KEY');

/* ── Timestamp do skrytých polí ── */
(function(){
  const t = new Date();
  const val = t.toLocaleDateString('cs-CZ') + ' ' + t.toLocaleTimeString('cs-CZ',{hour:'2-digit',minute:'2-digit'});
  document.querySelectorAll('input[name="time"]').forEach(el => el.value = val);
})();

/* ── Header scroll ── */
const hdr = document.getElementById('hdr');
const hdrAlwaysSolid = hdr && hdr.classList.contains('s');
if(hdr && !hdrAlwaysSolid) window.addEventListener('scroll', () => hdr.classList.toggle('s', scrollY > 50), {passive:true});

/* ── Mobile nav ── */
const mob = document.getElementById('mob');
const burger = document.getElementById('burger');
const mobClose = document.getElementById('mob-close');
if(burger) burger.addEventListener('click', () => mob.classList.add('open'));
if(mobClose) mobClose.addEventListener('click', () => mob.classList.remove('open'));
function closeMob(){ if(mob) mob.classList.remove('open'); }

/* ── Scroll reveal ── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target); }
  });
}, {threshold:.1, rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('[data-r],[data-s]').forEach(el => io.observe(el));

/* ── Toast ── */
function toast(msg, type='ok'){
  const el = document.getElementById('toast');
  if(!el) return;
  el.textContent = msg;
  el.className = 'toast ' + type + ' show';
  setTimeout(() => el.classList.remove('show'), 4500);
}

/* ── Arc karusel ── */
(function(){
  const slots = [...document.querySelectorAll('.arc-slot')];
  if(!slots.length) return;
  const POS = [
    {left:'calc(50% - 262px)', bottom:'12px', z:1,  sw:.64,  so:.52},
    {left:'calc(50% - 130px)', bottom:'58px', z:3,  sw:.81,  so:.74},
    {left:'50%',               bottom:'2px',  z:5,  sw:1.06, so:1  },
    {left:'calc(50% + 130px)', bottom:'58px', z:3,  sw:.81,  so:.74},
    {left:'calc(50% + 262px)', bottom:'12px', z:1,  sw:.64,  so:.52},
  ];
  let order = [0,1,2,3,4]; // order[posIdx] = slotIdx

  function apply(animate){
    if(animate){
      slots.forEach(s => { s.style.transition = 'left .5s cubic-bezier(.22,1,.36,1), bottom .5s cubic-bezier(.22,1,.36,1)'; });
      void slots[0].offsetHeight; // force reflow – zaručí spuštění přechodu
    }
    slots.forEach((slot, si) => {
      const pi = order.indexOf(si), p = POS[pi];
      if(!animate) slot.style.transition = 'none';
      slot.style.left   = p.left;
      slot.style.bottom = p.bottom;
      slot.style.zIndex = p.z;
      slot.style.setProperty('--sw', p.sw);
      slot.style.setProperty('--so', p.so);
      slot.classList.toggle('arc-active', pi === 2);
    });
  }

  apply(false);

  slots.forEach((slot, si) => {
    slot.addEventListener('click', () => {
      const pi = order.indexOf(si);
      if(pi === 2) return;
      const n = ((pi - 2) % 5 + 5) % 5;
      order = [...order.slice(n), ...order.slice(0, n)];
      apply(true);
    });
  });
})();

/* ── Form s EmailJS ── */
function doForm(e, msg){
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.btn-s');
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Odesílám…';
  btn.disabled = true;

  emailjs.sendForm('service_85vcgzd', 'template_y5hj9l4', form)
    .then(() => {
      btn.innerHTML = orig;
      btn.disabled = false;
      form.reset();
      toast(msg);
    }, err => {
      btn.innerHTML = orig;
      btn.disabled = false;
      toast('Chyba při odesílání. Zkuste prosím znovu nebo napište na info@tzbsystems.cz', 'err');
      console.error('EmailJS:', err);
    });
}
