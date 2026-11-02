// Tous les messages sont des scénarios fictifs. Aucun lien ne quitte cette page.
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function demoLink(label, destination, asText = false) {
  return `<a class="simulated-link${asText ? ' text-link' : ''}" href="${escapeHtml(destination)}" data-destination="${escapeHtml(destination)}">${escapeHtml(label)}${asText ? '' : ' →'}</a>`;
}

function demoAttachment(filename) {
  return `<button class="fake-attachment" type="button" data-attachment="${escapeHtml(filename)}">📎 ${escapeHtml(filename)}</button>`;
}

const emails = [
  {
    id: 'amazon', from: 'Amazon', address: 'commandes@amzon-ca.example', initials: 'A', date: '09:42', knownSite: 'amazon.ca',
    subject: 'Votre commande Amazon attend une dernière confirmation',
    preview: 'Votre commande n° 745-832 est conservée pendant 24 heures. Confirmez votre carte pour éviter son annulation.',
    verdict: 'phishing', destination: 'https://hameconnage-courriel.example/amzon/commande',
    body: `<p>Bonjour Madame Martin,</p><p><span class="clue-mark" data-clue="unexpected">Votre commande <strong>n° 745-832</strong> est prête à être envoyée.</span> Nous avons simplement besoin d’une dernière confirmation pour terminer le paiement.</p><p><span class="clue-mark" data-clue="request">Pour éviter son annulation, confirmez votre numéro de carte bancaire dans les 24 heures.</span></p><p>${demoLink('Confirmer ma commande', 'https://hameconnage-courriel.example/amzon/commande')}<br>${demoLink('Ou ouvrir le lien de confirmation', 'https://hameconnage-courriel.example/amzon/commande', true)}</p><p>Si vous avez déjà fait le nécessaire, nous vous remercions de votre patience.</p><p>Bien cordialement,<br>L’équipe Amazon</p>`,
    summary: 'Dans ce scénario, le message imite Amazon pour obtenir votre numéro de carte. Il est bien écrit, mais le nom, le bouton et l’urgence cachent le piège.',
    senderHint: 'Regardez bien : on lit « amzon » au lieu de « amazon ». Une seule lettre manque. Le grand nom « Amazon » peut être copié.',
    linkHint: 'Le bouton mènerait à « hameconnage-courriel.example », pas au site Amazon que vous connaissez.',
    requestHint: 'On vous demande votre carte sous 24 heures. Le texte est bien écrit, mais cette urgence vous pousse à agir sans réfléchir.',
    verifyHint: 'Ouvrez vous-même le site ou l’application que vous utilisez d’habitude pour voir vos commandes.'
  },
  {
    id: 'hydro-phone', from: 'Hydro-Québec', address: 'avis@hydroquebec-aide.example', initials: 'HQ', date: 'Hier', knownSite: 'hydroquebec.com', phone: '(514) 555-0148', secondClueTitle: 'Un numéro à rappeler ?',
    subject: 'Un appel est demandé pour votre dossier',
    preview: 'Appelez le numéro indiqué dans ce message. Un code arriverait ensuite par texto.',
    verdict: 'phishing', destination: null,
    body: `<p>Bonjour,</p><p>Une vérification est demandée pour votre dossier Hydro-Québec.</p><p><span class="clue-mark" data-clue="request">Appelez le <strong>(514) 555-0148</strong>. Après votre appel, un <strong>message texte séparé</strong> arrivera sur votre téléphone avec un code de six chiffres. Lisez ce code à notre agent.</span></p><p>Nous pourrons ensuite confirmer votre dossier.</p><p>Service à la clientèle<br>Hydro-Québec</p>`,
    summary: 'Dans cet exercice, le piège est un faux numéro de téléphone. Le code n’est pas dans ce courriel : il arriverait plus tard dans un texto séparé, puis la personne au téléphone vous demanderait de le lui lire.',
    senderHint: 'La petite adresse finit par « hydroquebec-aide.example », pas par « hydroquebec.com ». Le grand nom Hydro-Québec ne suffit pas à prouver qui a écrit.',
    linkHint: 'Le numéro (514) 555-0148 vient du message lui-même. Un faux numéro peut mener à une personne qui se fait passer pour une entreprise.',
    requestHint: 'Le courriel demande de lire à un inconnu un code qui arriverait plus tard par texto, séparément de ce courriel. Ce code est privé : ne le donnez pas.',
    verifyHint: 'Si vous avez un doute, appelez le numéro inscrit sur votre facture ou ouvrez vous-même votre espace Hydro-Québec.'
  },
  {
    id: 'stm', from: 'STM', address: 'info@stm.info', initials: 'STM', date: 'Hier', knownSite: 'stm.info',
    subject: 'Rappel : travaux sur la ligne orange dimanche',
    preview: 'Prévoyez un peu plus de temps pour votre déplacement.',
    verdict: 'legit', destination: 'https://www.stm.info/',
    body: `<p>Bonjour,</p><p>Des travaux sont prévus dimanche sur la ligne orange. Certains trajets pourraient prendre un peu plus de temps.</p><p>${demoLink('Voir le site de la STM', 'https://www.stm.info/', true)}</p><p>Vous pouvez aussi ouvrir vous-même le site ou l’application de la STM avant de partir.</p><p>Bonne journée,<br>La STM</p>`,
    summary: 'Dans cet exercice, c’est un simple avis de transport. Il ne demande ni argent ni mot de passe.',
    senderHint: 'Le nom et la petite adresse semblent aller ensemble. Si l’avis vous étonne, vérifiez vous-même.',
    linkHint: 'Le lien souligné mènerait à « www.stm.info », le site attendu ici. Un lien peut aussi être normal; vous pouvez quand même ouvrir le site vous-même.',
    requestHint: 'On vous prévient de travaux, sans demander de paiement ni réponse urgente.',
    verifyHint: 'Ouvrez le site ou l’application de la STM comme vous le faites d’habitude.'
  },
  {
    id: 'bell', from: 'Bell', address: 'cadeaux@be1l-ca.example', initials: 'B', date: 'Mar.', knownSite: 'bell.ca', attachment: 'Cadeau_Bell.zip',
    subject: 'Un cadeau Bell vous attend',
    preview: 'Une tablette a été réservée pour vous. Ouvrez le document joint avant ce soir.',
    verdict: 'phishing', destination: null,
    body: `<p>Bonjour,</p><p>Bonne nouvelle ! Une tablette vous a été réservée en remerciement de votre fidélité.</p><p><span class="clue-mark" data-clue="request">Pour recevoir votre cadeau, ouvrez le document joint avant ce soir et suivez les instructions.</span></p><p>${demoAttachment('Cadeau_Bell.zip')}</p><p>Merci de votre confiance,<br>L’équipe Bell</p>`,
    summary: 'Dans cet exercice, le faux cadeau vous pousse à ouvrir un fichier que vous n’attendiez pas.',
    senderHint: 'Regardez bien : dans « be1l », le chiffre 1 remplace la lettre l. C’est facile à manquer.',
    linkHint: 'Le message propose un fichier joint inattendu. Ne l’ouvrez pas pour réclamer un cadeau.',
    requestHint: 'La promesse d’un cadeau et le délai « avant ce soir » vous poussent à agir vite.',
    verifyHint: 'Si vous pensez avoir gagné quelque chose, appelez Bell au numéro inscrit sur votre facture.'
  },
  {
    id: 'camille', from: 'Camille', address: 'camille.nouveau.contact@example.com', initials: 'C', date: 'Lun.', secondClueTitle: 'Pas de bouton : est-ce rassurant ?', secondClueTone: 'green',
    subject: 'Coucou, peux-tu m’aider aujourd’hui ?',
    preview: 'J’ai perdu mon téléphone. J’ai besoin d’un petit virement en attendant.',
    verdict: 'phishing', destination: null,
    body: `<p>Coucou,</p><p>J’ai perdu mon téléphone et je n’ai plus accès à mon numéro. Je ne peux pas t’appeler pour le moment.</p><p><span class="clue-mark" data-clue="request">Peux-tu m’avancer 350 $ par virement Interac aujourd’hui ? Je te rembourse demain. S’il te plaît, réponds-moi vite.</span></p><p>Je t’embrasse,<br>Camille</p>`,
    summary: 'Dans ce scénario, quelqu’un se fait passer pour une proche afin d’obtenir un virement.',
    senderHint: 'Le prénom « Camille » peut être écrit par n’importe qui. La petite adresse est nouvelle : est-ce bien celle que vous connaissez ?',
    linkHint: 'Il n’y a pas de bouton. Un faux message peut quand même demander de l’argent.',
    requestHint: 'On vous demande 350 $ aujourd’hui et on dit qu’on ne peut pas vous appeler. Cela mérite une vraie vérification.',
    verifyHint: 'Appelez Camille sur le numéro que vous avez déjà, ou demandez à un autre proche.'
  }
];

const $ = (selector) => document.querySelector(selector);
const answered = new Set();
const revealed = new Set();
const choices = new Map();
const readMessages = new Set();
const STORAGE_KEY = 'courriel-vigilance-five-v3';
let currentIndex = 0;
let searchTerm = '';
let tourStep = -1;
let tourTarget = null;
let tourAfterWrong = false;
let lastClickedLink = null;
let pendingCelebration = false;

function restoreProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const validIds = new Set(emails.map((email) => email.id));
    for (const id of saved.read || []) if (validIds.has(id)) readMessages.add(id);
    for (const [id, choice] of Object.entries(saved.choices || {})) {
      if (validIds.has(id) && (choice === 'phishing' || choice === 'legit')) {
        choices.set(id, choice);
        answered.add(id);
        revealed.add(id);
      }
    }
  } catch { /* A blocked or damaged browser store must not stop the exercise. */ }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ read: [...readMessages], choices: Object.fromEntries(choices) }));
  } catch { /* The exercise still works if this browser cannot save locally. */ }
}

function renderList() {
  updateUnreadCount();
  const matching = emails.filter((email) => `${email.from} ${email.subject} ${email.preview}`.toLocaleLowerCase('fr').includes(searchTerm));
  $('#email-list').innerHTML = matching.length ? matching.map((email) => {
    const index = emails.indexOf(email);
    const choice = choices.get(email.id);
    const result = choice ? (choice === email.verdict ? 'is-correct' : 'is-incorrect') : '';
    const mark = choice ? (choice === email.verdict ? '✓' : '×') : '';
    const read = readMessages.has(email.id);
    return `<button class="email-row ${read ? 'read' : 'unread'} ${result}" type="button" data-index="${index}" aria-label="${escapeHtml(email.from)} : ${escapeHtml(email.subject)}, ${read ? 'lu' : 'non lu'}">
      <span class="row-check" aria-hidden="true">${mark}</span><span class="row-star" aria-hidden="true">☆</span>
      <span class="row-from">${escapeHtml(email.from)}</span>
      <span class="row-message"><strong>${escapeHtml(email.subject)}</strong><span> — ${escapeHtml(email.preview)}</span></span>
      <span class="row-date">${escapeHtml(email.date)}</span>
    </button>`;
  }).join('') : '<div class="empty-search">Aucun courriel trouvé. Essayez un autre mot.</div>';
  $('#email-list').querySelectorAll('[data-index]').forEach((row) => row.addEventListener('click', () => openEmail(Number(row.dataset.index))));
}

function updateUnreadCount() {
  const count = emails.length - readMessages.size;
  $('#unread-count').textContent = String(count);
  $('#unread-count').setAttribute('aria-label', `${count} courriel${count > 1 ? 's' : ''} non lu${count > 1 ? 's' : ''}`);
}


function updateProgress() {
  const correctCount = [...choices].filter(([id, choice]) => choice === emails.find((email) => email.id === id)?.verdict).length;
  $('#progress-label').textContent = `${answered.size} / ${emails.length}`;
  $('#top-progress').textContent = `${answered.size} / ${emails.length} examinés`;
  $('#tab-count').textContent = `${answered.size} / ${emails.length}`;
  $('#inbox-tab').classList.toggle('has-progress', answered.size > 0);
  $('#inbox-tab').classList.toggle('complete', answered.size === emails.length);
  $('#progress-big').textContent = String(answered.size);
  $('#progress-ring').style.setProperty('--progress', `${answered.size / emails.length * 100}%`);
  $('#progress-message').textContent = answered.size === emails.length ? 'Bravo, parcours terminé !' : answered.size === 0 ? 'Prêt à mener l’enquête ?' : `Encore ${emails.length - answered.size} à explorer`;
  $('#score-label').textContent = `${correctCount} bonne${correctCount > 1 ? 's' : ''} réponse${correctCount > 1 ? 's' : ''}`;
  $('.progress-card').classList.toggle('complete', answered.size === emails.length);
  $('#progress-bar').setAttribute('aria-valuenow', String(answered.size));
  $('#progress-bar').setAttribute('aria-valuemax', String(emails.length));
  $('#progress-fill').style.width = `${answered.size / emails.length * 100}%`;
  $('#mission-title').textContent = answered.size === emails.length ? `Bravo ! Les ${emails.length} messages sont examinés.` : `Menez l’enquête sur ${emails.length} courriels`;
  $('#mission-subtitle').textContent = answered.size === 0 ? 'Choisissez un message pour commencer.' : `${answered.size} examinés · ${correctCount} bonne${correctCount > 1 ? 's' : ''} réponse${correctCount > 1 ? 's' : ''}`;
  $('#mission-dots').innerHTML = emails.map((email, index) => {
    const choice = choices.get(email.id);
    const state = !choice ? 'pending' : choice === email.verdict ? 'correct' : 'incorrect';
    const label = `Courriel ${index + 1} : ${email.from}${choice ? state === 'correct' ? ', bonne réponse' : ', réponse incorrecte' : ', à examiner'}`;
    return `<button class="mission-dot ${state}" type="button" data-mission-index="${index}" aria-label="${escapeHtml(label)}" title="${escapeHtml(email.from)}">${index + 1}</button>`;
  }).join('');
  $('#mission-dots').querySelectorAll('[data-mission-index]').forEach((button) => button.addEventListener('click', () => openEmail(Number(button.dataset.missionIndex))));
}

function celebrateCompletion() {
  const colors = ['#35a761', '#8ed3a2', '#f6c85f', '#70b7e8', '#db6f78'];
  $('#confetti-layer').innerHTML = Array.from({ length: 34 }, (_, index) => {
    const x = Math.round(Math.random() * 100);
    const delay = (Math.random() * .75).toFixed(2);
    const duration = (2.7 + Math.random() * 1.3).toFixed(2);
    return `<span style="--x:${x}%;--delay:${delay}s;--duration:${duration}s;--color:${colors[index % colors.length]}"></span>`;
  }).join('');
  $('#confetti-layer').hidden = false;
  window.setTimeout(() => { $('#confetti-layer').hidden = true; $('#confetti-layer').innerHTML = ''; }, 4500);
}

function renderClues(email) {
  const tone = email.verdict === 'phishing' ? 'warning' : 'safe';
  $('#clues-list').innerHTML = [
    { icon: '⚑', title: 'Qui l’a envoyé ?', text: email.senderHint, type: tone },
    { icon: '⚑', title: email.secondClueTitle || (email.attachment ? 'Un fichier inattendu ?' : 'Où mène le bouton ?'), text: email.linkHint, type: email.secondClueTone || (email.destination || email.attachment || email.phone ? tone : 'neutral') },
    { icon: '⚑', title: 'Que vous demande-t-on ?', text: email.requestHint, type: tone },
    { icon: '✓', title: 'Le bon geste', text: email.verifyHint, type: 'neutral' }
  ].map((clue) => `<div class="clue-card ${clue.type}"><span class="clue-icon" aria-hidden="true">${escapeHtml(clue.icon)}</span><div><h4>${escapeHtml(clue.title)}</h4><p>${escapeHtml(clue.text)}</p></div></div>`).join('');
  const visible = revealed.has(email.id);
  $('#clues-list').hidden = !visible;
  $('#clues-locked').hidden = visible;
  $('.reader-column').classList.toggle('show-clues', visible);
  $('.reader-column').classList.toggle('clues-warning', visible && email.verdict === 'phishing');
  $('.reader-column').classList.toggle('clues-safe', visible && email.verdict === 'legit');
  $('#reveal-button').hidden = visible;
}

function renderFeedback(email) {
  const panel = $('#feedback-panel');
  if (!choices.has(email.id)) { panel.hidden = true; return; }
  const correct = choices.get(email.id) === email.verdict;
  const verdictLabel = email.verdict === 'phishing' ? 'un piège' : 'un message normal';
  const mainTone = email.verdict === 'phishing' ? 'red' : 'green';
  const flags = [
    { title: 'Qui l’a envoyé ?', text: email.senderHint, tone: mainTone, comparison: email.knownSite ? `<div class="flag-compare"><span><small>SITE HABITUEL</small><strong>${escapeHtml(email.knownSite)}</strong></span><span><small>ADRESSE DU MESSAGE</small><strong>${escapeHtml(email.address.split('@')[1])}</strong></span></div>` : '' },
    { title: email.secondClueTitle || (email.attachment ? 'Un fichier inattendu ?' : 'Où mène le bouton ?'), text: email.linkHint, tone: email.secondClueTone || mainTone },
    { title: 'Que demande-t-on ?', text: email.requestHint, tone: mainTone }
  ];
  panel.hidden = false;
  panel.className = `feedback-panel ${correct ? 'correct' : 'incorrect'}`;
  panel.innerHTML = `<div class="feedback-head"><span class="feedback-icon" aria-hidden="true">${correct ? '✓' : '×'}</span><div><span class="feedback-kicker">${correct ? 'BONNE RÉPONSE' : 'PAS CETTE FOIS'}</span><h3>${correct ? 'Bien vu !' : 'Regardons ensemble.'}</h3><p>Dans cet exercice, c’est ${verdictLabel}. ${escapeHtml(email.summary)}</p></div></div>
    <div class="feedback-flags"><h4>${email.verdict === 'phishing' ? 'Les signes qui montrent le piège' : 'Les signes rassurants dans cet exercice'}</h4><div class="flag-legend"><span class="legend-red">● Rouge : attention</span><span class="legend-green">● Vert : rassurant ou bon geste</span></div><div class="flag-grid">${flags.map((flag) => `<div class="flag-card ${flag.tone}"><span class="flag-mark" aria-hidden="true">${flag.tone === 'red' ? '⚑' : '✓'}</span><div><strong>${escapeHtml(flag.title)}</strong><p>${escapeHtml(flag.text)}</p>${flag.comparison ?? ''}</div></div>`).join('')}</div><div class="good-action"><span aria-hidden="true">★</span><p><strong>Le bon geste :</strong> ${escapeHtml(email.verifyHint)}</p></div></div>`;
}

function hideLinkPreview() { $('#link-preview').hidden = true; }

function openClickModal(kind, clickedElement) {
  const email = emails[currentIndex];
  lastClickedLink = clickedElement;
  closeTour(false);
  hideLinkPreview();
  const danger = kind === 'attachment' || email.verdict === 'phishing';
  $('#click-modal').classList.toggle('danger', danger);
  $('#click-modal').classList.toggle('safe', !danger);
  $('#click-modal-icon').textContent = danger ? '!' : '✓';
  $('#click-modal-title').textContent = danger ? 'Oups, c’était un piège !' : 'Ce lien semble normal ici';
  $('#click-modal-text').textContent = kind === 'attachment'
    ? 'Ce fichier joint était inattendu. Dans la vraie vie, il pourrait être dangereux. Ici, aucun fichier ne s’est ouvert et rien n’a été piraté.'
    : danger
      ? 'Ce clic aurait pu vous mener à un faux site. Ici, rien n’a été piraté : c’est un exercice pour apprendre à vérifier avant de cliquer.'
      : 'Dans cet exercice, ce lien semble aller au site attendu. Nous restons sur cette page pour continuer l’exercice.';
  $('#click-modal-destination').textContent = kind === 'attachment' ? `Fichier annoncé : ${email.attachment}` : `Adresse annoncée : ${email.destination}`;
  $('#click-modal').hidden = false;
  $('#click-modal-close').focus();
}

function closeClickModal() {
  if ($('#click-modal').hidden) return;
  $('#click-modal').hidden = true;
  lastClickedLink?.focus();
  lastClickedLink = null;
}

function showLinkPreview() {
  const email = emails[currentIndex];
  if (!email.destination) return;
  $('#link-preview-address').textContent = email.destination;
  $('#link-preview').hidden = false;
}

function renderEmail() {
  const email = emails[currentIndex];
  $('#reader-position').textContent = `COURRIEL ${currentIndex + 1} SUR ${emails.length}`;
  $('#message-subject').textContent = email.subject;
  $('#sender-name').textContent = email.from;
  $('#sender-address').textContent = `<${email.address}>`;
  $('#sender-avatar').textContent = email.initials;
  $('#message-date').textContent = email.date;
  $('#message-body').innerHTML = email.body;
  $('#safe-link-note').hidden = false;
  $('#safe-link-note span:last-child').textContent = email.id === 'amazon' ? 'Pour vérifier cette commande, ouvrez vous-même le site ou l’application Amazon. Dans cet exercice, les liens restent sur cette page.' : email.attachment ? 'Ce fichier est un exemple. Vous pouvez cliquer pour voir la leçon, sans rien ouvrir sur votre ordinateur.' : email.destination ? 'Posez la flèche de la souris sur le lien pour voir où il mènerait. Un clic reste dans cet exercice.' : email.phone ? 'Il n’y a pas de lien dans ce message. Regardez le numéro indiqué et ce qu’on vous demande de faire.' : 'Il n’y a pas de lien dans ce message. Regardez qui l’a envoyé et ce qu’on vous demande.';
  $('#replay-tour-button').hidden = currentIndex !== 0;
  renderClues(email);
  renderFeedback(email);
  $('#decision-panel').hidden = choices.has(email.id);
  $('#next-button').innerHTML = choices.has(email.id) ? 'Terminé — retour à la boîte <span aria-hidden="true">→</span>' : currentIndex === emails.length - 1 ? 'Retour à la boîte <span aria-hidden="true">→</span>' : 'Courriel suivant <span aria-hidden="true">→</span>';
  $('.reader-scroll').scrollTop = 0;

  $('#message-body').querySelectorAll('.simulated-link').forEach((button) => {
    button.addEventListener('mouseenter', showLinkPreview);
    button.addEventListener('mouseleave', hideLinkPreview);
    button.addEventListener('focus', showLinkPreview);
    button.addEventListener('blur', hideLinkPreview);
    button.addEventListener('click', (event) => { event.preventDefault(); openClickModal('link', button); });
  });
  $('#message-body').querySelectorAll('.fake-attachment').forEach((button) => {
    button.addEventListener('click', () => openClickModal('attachment', button));
  });
}

function openEmail(index) {
  closeTour(false);
  hideLinkPreview();
  currentIndex = index;
  readMessages.add(emails[index].id);
  saveProgress();
  updateUnreadCount();
  renderEmail();
  document.body.classList.remove('view-guide', 'guide-open');
  document.body.classList.add('view-reading');
  $('#guide-view').hidden = true;
  $('#inbox-view').hidden = false;
  window.scrollTo(0, 0);
  $('#message-subject').focus();
  if (index === 0) startTour();
}

function showInbox() {
  closeTour(false);
  closeClickModal();
  hideLinkPreview();
  document.body.classList.remove('view-reading', 'view-guide', 'guide-open');
  $('#guide-view').hidden = true;
  $('#inbox-view').hidden = false;
  $('#nav-inbox').classList.add('active');
  $('#nav-guide').classList.remove('active');
  $('#nav-inbox').setAttribute('aria-current', 'page');
  $('#nav-guide').removeAttribute('aria-current');
  renderList();
  if (pendingCelebration) { pendingCelebration = false; celebrateCompletion(); }
}

function showGuide() {
  closeTour(false);
  hideLinkPreview();
  document.body.classList.remove('view-reading', 'guide-open');
  document.body.classList.add('view-guide');
  $('#inbox-view').hidden = true;
  $('#guide-view').hidden = false;
  $('#nav-inbox').classList.remove('active');
  $('#nav-guide').classList.add('active');
  $('#nav-guide').setAttribute('aria-current', 'page');
  $('#nav-inbox').removeAttribute('aria-current');
  window.scrollTo(0, 0);
}

function revealCurrent() {
  revealed.add(emails[currentIndex].id);
  renderClues(emails[currentIndex]);
  document.body.classList.add('guide-open');
}

function positionTour() {
  if (tourStep < 0 || !tourTarget) return;
  const note = $('#tour-note');
  const rect = tourTarget.getBoundingClientRect();
  const pad = 13;
  const holeLeft = Math.max(0, rect.left - pad);
  const holeTop = Math.max(0, rect.top - pad);
  const holeRight = Math.min(window.innerWidth, rect.right + pad);
  const holeBottom = Math.min(window.innerHeight, rect.bottom + pad);
  $('#tour-shade-top').style.cssText = `left:0;top:0;width:100%;height:${holeTop}px`;
  $('#tour-shade-bottom').style.cssText = `left:0;top:${holeBottom}px;width:100%;height:${window.innerHeight - holeBottom}px`;
  $('#tour-shade-left').style.cssText = `left:0;top:${holeTop}px;width:${holeLeft}px;height:${holeBottom - holeTop}px`;
  $('#tour-shade-right').style.cssText = `left:${holeRight}px;top:${holeTop}px;width:${window.innerWidth - holeRight}px;height:${holeBottom - holeTop}px`;
  const gap = 20;
  const margin = 16;
  const width = note.offsetWidth;
  const height = note.offsetHeight;
  const bottomRoom = tourStep === 1 && emails[currentIndex].destination ? $('#link-preview').offsetHeight + 66 : margin;
  if (tourStep === 2) {
    const left = Math.max(margin, window.innerWidth - width - margin);
    const top = Math.max(margin, window.innerHeight - height - margin);
    note.style.left = `${left}px`;
    note.style.top = `${top}px`;
    const overlaps = rect.right > left && rect.left < left + width && rect.bottom + gap > top && rect.top < top + height;
    if (overlaps) {
      const roomToScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight - window.scrollY);
      const move = Math.min(roomToScroll, Math.ceil(rect.bottom + gap - top));
      if (move > 0) window.scrollBy(0, move);
    }
    return;
  }
  let left;
  let top;
  if (rect.right + gap + width < window.innerWidth - margin) {
    left = rect.right + gap;
    top = rect.top + rect.height / 2 - height / 2;
  } else if (rect.left - gap - width > margin) {
    left = rect.left - gap - width;
    top = rect.top + rect.height / 2 - height / 2;
  } else {
    left = Math.max(margin, Math.min(rect.left, window.innerWidth - width - margin));
    top = rect.bottom + gap;
    if (top + height > window.innerHeight - bottomRoom) top = rect.top - height - gap;
  }
  note.style.left = `${Math.max(margin, Math.min(left, window.innerWidth - width - margin))}px`;
  note.style.top = `${Math.max(margin, Math.min(top, window.innerHeight - height - bottomRoom))}px`;
}

function showTourStep(index) {
  const email = emails[currentIndex];
  if (tourTarget) tourTarget.classList.remove('tour-target');
  hideLinkPreview();
  tourStep = index;
  const target = [$('#sender-address'), $('#message-body .simulated-link'), $('#message-body .clue-mark[data-clue="request"]'), $('#message-body .clue-mark[data-clue="unexpected"]'), $('#safe-link-note')][index];
  tourTarget = target;
  target.classList.add('tour-target');
  target.scrollIntoView({ block: index === 2 ? 'start' : 'center', behavior: 'auto' });
  const titles = ['Qui a envoyé ce message ?', 'Où mène ce bouton ?', 'Que vous demande-t-on ?', 'Attendiez-vous cette commande ?', 'Comment vérifier sans risque ?'];
  const explanations = [email.senderHint, email.linkHint, email.requestHint, 'Avant de réagir, demandez-vous si vous avez réellement passé cette commande. Un numéro de commande dans un courriel ne prouve rien.', 'Ouvrez vous-même le site ou l’application Amazon, comme vous le faites d’habitude. Cherchez votre commande là-bas, sans utiliser le bouton de ce message.'];
  $('#tour-step-counter').textContent = `${tourAfterWrong ? 'PAS CETTE FOIS · ' : ''}ÉTAPE ${index + 1} SUR ${titles.length}`;
  $('#tour-title').textContent = titles[index];
  $('#tour-note-text').textContent = explanations[index];
  $('#tour-quote').hidden = index !== 2;
  if (index === 2) $('#tour-quote').textContent = target.textContent.trim();
  $('#tour-note').classList.toggle('is-correction', tourAfterWrong);
  $('#tour-note').classList.toggle('is-link-step', index === 1 && !!email.destination);
  $('#tour-compare').hidden = index > 1;
  $('#tour-compare').classList.remove('matches');
  if (index === 0) {
    $('#tour-compare-from-label').textContent = 'SITE AMAZON HABITUEL';
    $('#tour-button-label').textContent = email.knownSite;
    $('#tour-compare-to-label').textContent = 'ADRESSE DE CE MESSAGE';
    $('#tour-button-url').textContent = email.address.split('@')[1];
    $('#tour-compare-message').textContent = 'Il manque une lettre dans « amzon ». Regardez chaque lettre avant de faire confiance.';
  } else if (index === 1 && email.destination) {
    const button = $('#message-body .simulated-link');
    $('#tour-compare-from-label').textContent = 'SUR LE BOUTON';
    $('#tour-button-label').textContent = button.textContent.trim();
    $('#tour-compare-to-label').textContent = 'EN BAS À GAUCHE';
    $('#tour-button-url').textContent = new URL(email.destination).hostname;
    $('#tour-compare-message').textContent = 'Le bouton parle d’Amazon. L’adresse en bas à gauche mène ailleurs. Ne cliquez pas.';
  }
  $('#tour-back').disabled = index === 0;
  $('#tour-next').textContent = index === titles.length - 1 ? (tourAfterWrong ? 'Voir la réponse ✓' : 'À moi de répondre ✓') : 'Continuer →';
  $('#tour-backdrop').hidden = false;
  $('#tour-note').hidden = false;
  document.body.classList.add('tour-open');
  if (index === 1 && email.destination) {
    showLinkPreview();
  }
  requestAnimationFrame(positionTour);
  $('#tour-next').focus();
}

function startTour(index = 0, afterWrong = false) { if (currentIndex !== 0) return; tourAfterWrong = afterWrong; showTourStep(index); }

function closeTour(restoreFocus = true) {
  if (tourStep < 0) return;
  const wasCorrection = tourAfterWrong;
  if (tourTarget) tourTarget.classList.remove('tour-target');
  tourTarget = null;
  tourStep = -1;
  tourAfterWrong = false;
  $('#tour-backdrop').hidden = true;
  $('#tour-note').hidden = true;
  document.body.classList.remove('tour-open');
  hideLinkPreview();
  if (restoreFocus) {
    $('#replay-tour-button').focus();
    if (wasCorrection) $('#feedback-panel').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

$('#nav-inbox').addEventListener('click', showInbox);
$('#nav-guide').addEventListener('click', showGuide);
$('#inbox-guide-button').addEventListener('click', showGuide);
$('#back-to-inbox').addEventListener('click', showInbox);
$('#back-button').addEventListener('click', showInbox);
$('#reader-guide-button').addEventListener('click', () => document.body.classList.add('guide-open'));
$('#guide-close').addEventListener('click', () => document.body.classList.remove('guide-open'));
$('#reveal-button').addEventListener('click', revealCurrent);
$('#mark-unread-button').addEventListener('click', () => {
  readMessages.delete(emails[currentIndex].id);
  saveProgress();
  showInbox();
});
$('#reset-progress').addEventListener('click', () => {
  readMessages.clear();
  choices.clear();
  answered.clear();
  revealed.clear();
  saveProgress();
  updateProgress();
  renderList();
});
$('#click-modal-close').addEventListener('click', closeClickModal);
$('#replay-tour-button').addEventListener('click', () => startTour());
$('#tour-close').addEventListener('click', () => closeTour());
$('#tour-back').addEventListener('click', () => { if (tourStep > 0) showTourStep(tourStep - 1); });
$('#tour-next').addEventListener('click', () => {
  if (tourStep < 4) showTourStep(tourStep + 1);
  else { const wasCorrection = tourAfterWrong; closeTour(); if (!wasCorrection) $('#decision-panel').scrollIntoView({ behavior: 'smooth', block: 'center' }); }
});
$('#next-button').addEventListener('click', () => choices.has(emails[currentIndex].id) || currentIndex === emails.length - 1 ? showInbox() : openEmail(currentIndex + 1));
$('#search-input').addEventListener('input', (event) => { searchTerm = event.target.value.trim().toLocaleLowerCase('fr'); showInbox(); });
$('#text-size-button').addEventListener('click', () => {
  const enabled = document.documentElement.classList.toggle('large-text');
  $('#text-size-button').setAttribute('aria-pressed', String(enabled));
});

document.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => {
  const email = emails[currentIndex];
  const correct = button.dataset.answer === email.verdict;
  const wasComplete = answered.size === emails.length;
  choices.set(email.id, button.dataset.answer);
  answered.add(email.id);
  if (!wasComplete && answered.size === emails.length) pendingCelebration = true;
  revealed.add(email.id);
  saveProgress();
  hideLinkPreview();
  updateProgress();
  renderEmail();
  if (!correct && currentIndex === 0) startTour(0, true);
  else $('#feedback-panel').scrollIntoView({ behavior: 'smooth', block: 'center' });
}));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (!$('#click-modal').hidden) closeClickModal();
    else if (tourStep >= 0) closeTour();
    else { document.body.classList.remove('guide-open'); hideLinkPreview(); }
  }
});
window.addEventListener('resize', positionTour);
window.addEventListener('scroll', positionTour, { passive: true });

restoreProgress();
renderList();
renderEmail();
updateProgress();
