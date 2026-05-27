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
