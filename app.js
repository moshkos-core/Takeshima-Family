/* ==========================================================================
   TAKESHIMA FAMILY FEED - HYPER-SMOOTH JAVASCRIPT & SAKURA EFFECTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Features
  initSakuraParticles();
  initClickSakuraBurst();
  initTimeAndWeather();
  initNavigation();
  initFeed();
  initFamilyTree();
  initLore();
  initRules();
  initRoster();
  initFearRPCalculator();
});

/* ==========================================
   1. MULTI-LAYER PINK SAKURA PETALS CANVAS
   ========================================== */
function initSakuraParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const petalCount = 55;

  class SakuraPetal {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * -height;
      this.size = Math.random() * 10 + 5;
      this.speedY = Math.random() * 1.3 + 0.7;
      this.speedX = Math.random() * 0.9 - 0.45;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.025;
      this.opacity = Math.random() * 0.5 + 0.4;
      
      const colors = [
        'rgba(255, 183, 197, ',  // Soft Sakura
        'rgba(255, 105, 180, ',  // Hot Pink
        'rgba(255, 20, 147, ',   // Deep Blossom
        'rgba(230, 160, 255, '   // Lavender Glow
      ];
      this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y * 0.008) * 1.2 + this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 25) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.colorPrefix + this.opacity + ')';
      
      // Glow effect for petals
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(255, 105, 180, 0.5)';

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
      ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < petalCount; i++) {
    petals.push(new SakuraPetal());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach(petal => {
      petal.update();
      petal.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================
   2. INTERACTIVE CLICK SAKURA BURST
   ========================================== */
function initClickSakuraBurst() {
  window.addEventListener('click', (e) => {
    // Play subtle soft chime sound via Web Audio API
    playSoftChimeSound();

    const burstContainer = document.createElement('div');
    burstContainer.style.position = 'fixed';
    burstContainer.style.left = e.clientX + 'px';
    burstContainer.style.top = e.clientY + 'px';
    burstContainer.style.pointerEvents = 'none';
    burstContainer.style.zIndex = '9999';
    document.body.appendChild(burstContainer);

    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      p.textContent = '🌸';
      p.style.position = 'absolute';
      p.style.fontSize = (Math.random() * 12 + 10) + 'px';
      p.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      p.style.opacity = '1';
      p.style.transform = 'translate(-50%, -50%) scale(1)';

      burstContainer.appendChild(p);

      const angle = (i / 8) * Math.PI * 2;
      const distance = Math.random() * 40 + 20;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      setTimeout(() => {
        p.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
        p.style.opacity = '0';
      }, 20);
    }

    setTimeout(() => {
      if (document.body.contains(burstContainer)) {
        document.body.removeChild(burstContainer);
      }
    }, 700);
  });
}

// Gentle Web Audio API Sound Chime
function playSoftChimeSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // High soft note A5
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15); // E6

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (err) {
    // Ignore audio restrictions if blocked by browser policy
  }
}

/* ==========================================
   3. KARAKURA TIME & WEATHER SIMULATOR
   ========================================== */
function initTimeAndWeather() {
  const timeEl = document.getElementById('karakura-time');
  if (!timeEl) return;

  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    timeEl.textContent = `${hours}:${minutes} ${ampm} • Sakura Breeze • Karakura District`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================
   4. NAVIGATION TABS
   ========================================== */
function initNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      navBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = document.getElementById(`tab-${targetTab}`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });
}

/* ==========================================
   5. FAMILY FEED & POST CREATOR
   ========================================== */
function initFeed() {
  const feedList = document.getElementById('feed-posts-list');
  const postForm = document.getElementById('create-post-form');
  const categoryFilter = document.getElementById('feed-category-filter');

  let posts = JSON.parse(localStorage.getItem('takeshima_posts'));
  if (!posts || posts.length === 0) {
    posts = TAKESHIMA_DATA.initialFeed;
    localStorage.setItem('takeshima_posts', JSON.stringify(posts));
  }

  function renderPosts(filter = 'All') {
    if (!feedList) return;
    feedList.innerHTML = '';

    const filtered = filter === 'All' ? posts : posts.filter(p => p.category === filter);

    if (filtered.length === 0) {
      feedList.innerHTML = `<div class="glass-card" style="text-align:center; color: var(--text-muted);">No posts found in category "${filter}". Be the first to post!</div>`;
      return;
    }

    filtered.forEach(post => {
      const postCard = document.createElement('div');
      postCard.className = 'post-card';
      postCard.innerHTML = `
        <div class="post-card-header">
          <div class="post-author-info">
            <div class="post-avatar">${post.avatar || '🌸'}</div>
            <div>
              <div class="author-name">${escapeHtml(post.author)}</div>
              <div class="author-role">${escapeHtml(post.title || 'Family Member')}</div>
            </div>
          </div>
          <span class="post-category-tag">${escapeHtml(post.category)} • ${escapeHtml(post.time)}</span>
        </div>
        <div class="post-body">${escapeHtml(post.content)}</div>
        <div class="post-footer">
          <div class="reaction-group">
            <button class="reaction-btn like-btn ${post.isLiked ? 'reacted' : ''}" data-id="${post.id}">
              🌸 <span>${post.likes || 0}</span> Likes
            </button>
            <button class="reaction-btn comment-toggle-btn" data-id="${post.id}">
              💬 <span>${post.comments ? post.comments.length : 0}</span> Comments
            </button>
          </div>
        </div>
        <div class="comments-section" id="comments-${post.id}">
          <div class="comments-list">
            ${(post.comments || []).map(c => `
              <div class="comment-item">
                <span class="comment-author">${escapeHtml(c.author)}:</span>
                <span>${escapeHtml(c.text)}</span>
              </div>
            `).join('')}
          </div>
          <div style="display:flex; gap:10px; margin-top:12px;">
            <input type="text" class="post-input comment-input" placeholder="Write an ICLY reply..." data-id="${post.id}">
            <button class="btn-primary add-comment-btn" data-id="${post.id}" style="padding:8px 16px; font-size:0.88rem;">Reply</button>
          </div>
        </div>
      `;

      feedList.appendChild(postCard);
    });

    // Likes
    document.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const targetPost = posts.find(p => p.id === id);
        if (targetPost) {
          if (targetPost.isLiked) {
            targetPost.likes--;
            targetPost.isLiked = false;
          } else {
            targetPost.likes++;
            targetPost.isLiked = true;
          }
          localStorage.setItem('takeshima_posts', JSON.stringify(posts));
          renderPosts(categoryFilter ? categoryFilter.value : 'All');
        }
      });
    });

    // Comments
    document.querySelectorAll('.add-comment-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const input = document.querySelector(`.comment-input[data-id="${id}"]`);
        if (input && input.value.trim() !== '') {
          const targetPost = posts.find(p => p.id === id);
          if (targetPost) {
            if (!targetPost.comments) targetPost.comments = [];
            targetPost.comments.push({
              author: 'Family Member (You)',
              text: input.value.trim(),
              time: 'Just now'
            });
            localStorage.setItem('takeshima_posts', JSON.stringify(posts));
            renderPosts(categoryFilter ? categoryFilter.value : 'All');
          }
        }
      });
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      renderPosts(e.target.value);
    });
  }

  if (postForm) {
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const authorInput = document.getElementById('post-author-name');
      const roleInput = document.getElementById('post-author-role');
      const categoryInput = document.getElementById('post-category');
      const contentInput = document.getElementById('post-content');

      if (!contentInput || contentInput.value.trim() === '') return;

      const newPost = {
        id: Date.now(),
        author: authorInput.value.trim() || 'Takeshima Member',
        title: roleInput.value.trim() || 'Family Member',
        avatar: '🌸',
        category: categoryInput.value || 'Announcements',
        time: 'Just now',
        content: contentInput.value.trim(),
        likes: 1,
        isLiked: true,
        comments: []
      };

      posts.unshift(newPost);
      localStorage.setItem('takeshima_posts', JSON.stringify(posts));

      contentInput.value = '';
      renderPosts(categoryFilter ? categoryFilter.value : 'All');
    });
  }

  renderPosts();
}

/* ==========================================
   6. REAL INTERACTIVE FAMILY TREE & GENERATIONAL CANVAS
   ========================================== */
function initFamilyTree() {
  const treeWrapper = document.getElementById('interactive-tree-canvas');
  const inspectAvatar = document.getElementById('inspect-avatar');
  const inspectName = document.getElementById('inspect-name');
  const inspectRole = document.getElementById('inspect-role');
  const inspectFaction = document.getElementById('inspect-faction');
  const inspectStatus = document.getElementById('inspect-status');
  const inspectDetails = document.getElementById('inspect-details');
  const inspectFear = document.getElementById('inspect-fear');
  const filterBtns = document.querySelectorAll('#tree-filter-btns .reaction-btn');

  const nodes = TAKESHIMA_DATA.familyNodes;

  function selectNode(id) {
    const node = nodes.find(n => n.id === id);
    if (!node) return;

    if (inspectAvatar) inspectAvatar.textContent = node.photo || '🌸';
    if (inspectName) inspectName.textContent = node.name;
    if (inspectRole) inspectRole.textContent = `${node.role} (${node.ageLabel || 'Age ' + node.age})`;
    if (inspectFaction) inspectFaction.textContent = node.faction;
    if (inspectStatus) inspectStatus.textContent = node.status;
    if (inspectDetails) inspectDetails.textContent = node.details;
    if (inspectFear) inspectFear.textContent = node.fearRP || 'Follows Takeshima Family FearRP Guidelines.';

    // Highlight selected node card
    document.querySelectorAll('.node-card').forEach(c => c.style.borderColor = '');
    const activeCard = document.querySelector(`.node-card[data-id="${id}"]`);
    if (activeCard) activeCard.style.borderColor = 'var(--accent-pink)';
  }

  function renderTree(filter = 'all') {
    if (!treeWrapper) return;

    treeWrapper.innerHTML = `
      <div class="tree-grid" style="min-width: 900px; width: 100%;">
        
        <!-- GENERATION 1: HEADS & SPOUSES -->
        <div style="width: 100%; text-align: center;">
          <div style="font-family: var(--font-header); font-size: 0.85rem; color: var(--accent-pink); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;">
            ── Generation I: Family Heads & Spouses ──
          </div>
          <div class="tree-level" style="gap: 20px; flex-wrap: wrap;">
            
            <div class="node-card head-node" data-id="hoshina" style="${filter === 'teacher' || filter === 'all' ? '' : 'opacity:0.3;'}">
              <div class="node-avatar">🌸</div>
              <div class="node-name">Hoshina Takeshima</div>
              <div class="node-role">Family Head • HD of Math</div>
              <div class="node-age-tag">Age 38 • Adult</div>
              <div class="node-status">Karakura High Faculty</div>
            </div>

            <div class="node-card" data-id="aiko" style="border-color: var(--accent-pink); ${filter === 'kagami' || filter === 'all' ? '' : 'opacity:0.3;'}">
              <div class="node-avatar">🕊️</div>
              <div class="node-name">Aiko Kagami</div>
              <div class="node-role">1st Husband (Deceased)</div>
              <div class="node-age-tag" style="background: rgba(255, 71, 87, 0.2); color: var(--accent-sakura);">Passed at Age 28</div>
              <div class="node-status">Car Accident Tragedy</div>
            </div>

            <div class="node-card" data-id="hiroto" style="${filter === 'all' ? '' : 'opacity:0.3;'}">
              <div class="node-avatar">⚡</div>
              <div class="node-name">Hiroto</div>
              <div class="node-role">Ex-Husband (Divorced)</div>
              <div class="node-age-tag">Age 40 • Adult</div>
              <div class="node-status">Father of Twins</div>
            </div>

            <div class="node-card" data-id="sister" style="${filter === 'teacher' || filter === 'all' ? '' : 'opacity:0.3;'}">
              <div class="node-avatar">📚</div>
              <div class="node-name">Takeshima Sister</div>
              <div class="node-role">Math Faculty Teacher</div>
              <div class="node-age-tag">Age 36 • Adult</div>
              <div class="node-status">Teacher Faction</div>
            </div>

            <div class="node-card" data-id="kagami_head" style="${filter === 'kagami' || filter === 'all' ? '' : 'opacity:0.3;'}">
              <div class="node-avatar">⚔️</div>
              <div class="node-name">Head of Kagami Family</div>
              <div class="node-role">Kagami Branch Leader</div>
              <div class="node-age-tag">Age 42 • Adult</div>
              <div class="node-status">Close Friend / Faculty</div>
            </div>

          </div>
        </div>

        <!-- GENERATIONAL CONNECTOR RIBBON -->
        <div style="display:flex; flex-direction:column; align-items:center; width: 100%; margin: 10px 0;">
          <div style="height:3px; width:92%; background: linear-gradient(90deg, transparent, var(--accent-pink), var(--accent-purple), var(--accent-sakura), transparent); border-radius:3px; box-shadow:0 0 12px var(--accent-pink);"></div>
          <span style="font-size:0.75rem; color: var(--accent-sakura); margin-top:4px;">│ LINEAGE & CHILDREN DESCENT │</span>
        </div>

        <!-- GENERATION 2: CHILDREN & TWINS -->
        <div style="width: 100%; text-align: center;">
          <div style="font-family: var(--font-header); font-size: 0.85rem; color: var(--accent-purple); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;">
            ── Generation II: Children & Faculty Successors ──
          </div>
          <div class="tree-level" style="gap: 20px; flex-wrap: wrap;">
            
            <div class="node-card" data-id="ren_takeshima" style="${filter === 'teacher' || filter === 'all' ? '' : 'opacity:0.3;'}">
              <div class="node-avatar">🎓</div>
              <div class="node-name">Ren Takeshima</div>
              <div class="node-role">Mathematics Teacher</div>
              <div class="node-age-tag">Age 21 • Young Adult</div>
              <div class="node-status">Son of Hoshina & Aiko</div>
            </div>

            <div class="node-card" data-id="yumi_takeshima" style="${filter === 'teacher' || filter === 'all' ? '' : 'opacity:0.3;'}">
              <div class="node-avatar">📖</div>
              <div class="node-name">Yumi Takeshima</div>
              <div class="node-role">Science Educator</div>
              <div class="node-age-tag">Age 20 • Young Adult</div>
              <div class="node-status">Daughter of Hoshina & Aiko</div>
            </div>

            <div class="node-card" data-id="kenji_takeshima" style="${filter === 'kids' || filter === 'all' ? '' : 'opacity:0.3;'}">
              <div class="node-avatar">♊</div>
              <div class="node-name">Kenji Takeshima (Twin A)</div>
              <div class="node-role">Highschool Student</div>
              <div class="node-age-tag" style="background: rgba(255, 215, 0, 0.2); color: var(--accent-gold);">Age 15 • FearRP 16+</div>
              <div class="node-status">Son of Hoshina & Hiroto</div>
            </div>

            <div class="node-card" data-id="maya_takeshima" style="${filter === 'kids' || filter === 'all' ? '' : 'opacity:0.3;'}">
              <div class="node-avatar">♊</div>
              <div class="node-name">Maya Takeshima (Twin B)</div>
              <div class="node-role">Highschool Student</div>
              <div class="node-age-tag" style="background: rgba(255, 215, 0, 0.2); color: var(--accent-gold);">Age 15 • FearRP 16+</div>
              <div class="node-status">Daughter of Hoshina & Hiroto</div>
            </div>

          </div>
        </div>

      </div>
    `;

    document.querySelectorAll('.node-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        selectNode(id);
      });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');
      const filter = btn.getAttribute('data-filter');
      renderTree(filter);
    });
  });

  renderTree('all');
  selectNode('hoshina');
}

/* ==========================================
   7. LORE CHRONICLES RENDERER
   ========================================== */
function initLore() {
  const loreContainer = document.getElementById('lore-chapters-container');
  if (!loreContainer) return;

  const chapters = TAKESHIMA_DATA.lore.chapters;
  loreContainer.innerHTML = '';

  chapters.forEach(ch => {
    const loreCard = document.createElement('div');
    loreCard.className = 'lore-card';
    loreCard.innerHTML = `
      <div class="lore-chapter-num">${escapeHtml(ch.number)} • ${escapeHtml(ch.period)}</div>
      <h3 class="lore-title">${escapeHtml(ch.title)}</h3>
      ${ch.highlight ? `<div class="lore-highlight-banner">✨ ${escapeHtml(ch.highlight)} ✨</div>` : ''}
      <div class="lore-quote">"${escapeHtml(ch.quote)}"</div>
      <p style="color: var(--text-main); font-size: 1.02rem; white-space: pre-line; line-height: 1.7;">
        ${escapeHtml(ch.content)}
      </p>
    `;
    loreContainer.appendChild(loreCard);
  });
}

/* ==========================================
   8. RULES CODEX RENDERER
   ========================================== */
function initRules() {
  const fearContainer = document.getElementById('fear-rules-list');
  const crimeContainer = document.getElementById('crime-rules-list');

  if (fearContainer) {
    fearContainer.innerHTML = TAKESHIMA_DATA.rules.fearRP.rulesList.map(r => `
      <div class="rule-item">
        <h4 style="color:#fff; font-size:1.05rem; margin-bottom:4px;">${escapeHtml(r.title)}</h4>
        <p style="color: var(--text-muted); font-size:0.92rem;">${escapeHtml(r.detail)}</p>
      </div>
    `).join('');
  }

  if (crimeContainer) {
    crimeContainer.innerHTML = TAKESHIMA_DATA.rules.crimeRP.rulesList.map(r => `
      <div class="rule-item ${r.isSevere ? 'severe-item' : ''}">
        <h4 style="${r.isSevere ? 'color: var(--accent-blossom); font-weight:700;' : 'color:#fff;'} font-size:1.05rem; margin-bottom:4px;">${escapeHtml(r.title)}</h4>
        <p style="color: var(--text-muted); font-size:0.92rem;">${escapeHtml(r.detail)}</p>
      </div>
    `).join('');
  }
}

/* ==========================================
   9. ROSTER RENDERER
   ========================================== */
function initRoster() {
  const rosterGrid = document.getElementById('roster-grid-list');
  if (!rosterGrid) return;

  const members = [
    { name: "Hoshina Takeshima", role: "Family Head & HD of Mathematics", status: "Adult • Teacher Faction", avatar: "🌸" },
    { name: "Takeshima Sister", role: "Karakura High Faculty", status: "Adult • Teacher Faction", avatar: "📚" },
    { name: "Faculty Child 1", role: "Teacher Faction Member", status: "Young Adult • Karakura High", avatar: "🎓" },
    { name: "Faculty Child 2", role: "Teacher Faction Member", status: "Young Adult • Karakura High", avatar: "📖" },
    { name: "The Twins (Twin A)", role: "Family Branch Child", status: "Age 15 • FearRP 16+ & Adults", avatar: "♊" },
    { name: "The Twins (Twin B)", role: "Family Branch Child", status: "Age 15 • FearRP 16+ & Adults", avatar: "♊" },
    { name: "Head of Kagami Family", role: "Allied Branch Head", status: "Adult • Close Friend", avatar: "⚔️" }
  ];

  rosterGrid.innerHTML = members.map(m => `
    <div class="roster-card">
      <div class="roster-avatar">${m.avatar}</div>
      <div class="roster-info">
        <h4 style="color:#fff; font-size:1.1rem;">${escapeHtml(m.name)}</h4>
        <p style="color: var(--accent-pink); font-weight:600; font-size:0.9rem;">${escapeHtml(m.role)}</p>
        <p style="color: var(--text-subtle); font-size:0.85rem;">${escapeHtml(m.status)}</p>
      </div>
    </div>
  `).join('');
}

/* ==========================================
   10. FEAR RP AGE CALCULATOR TOOL
   ========================================== */
function initFearRPCalculator() {
  const btn = document.getElementById('calc-fear-btn');
  const ageInput = document.getElementById('calc-age-input');
  const resultDiv = document.getElementById('calc-fear-result');

  if (btn && ageInput && resultDiv) {
    btn.addEventListener('click', () => {
      const age = parseInt(ageInput.value);
      if (isNaN(age) || age < 1) {
        resultDiv.textContent = "Please enter a valid character age.";
        return;
      }

      if (age >= 13 && age <= 15) {
        resultDiv.innerHTML = `
          <strong>Result for Age ${age}:</strong> You are in the 13-15 age bracket.<br>
          ⚡ <span style="color: var(--accent-pink);">MUST FearRP anyone aged 16+ and ALL Adults</span> when getting in trouble.<br>
          📱 Must comply immediately with ItemRP phone confiscation / grounding punishments.<br>
          🚨 FearRP mandatory upon receiving school detentions or during ICLY chat interventions.
        `;
      } else if (age >= 16 && age <= 17) {
        resultDiv.innerHTML = `
          <strong>Result for Age ${age}:</strong> You are an older teen.<br>
          ⚡ <span style="color: var(--accent-pink);">MUST FearRP ALL Adults & Branch Heads</span>.<br>
          📱 Must respect adult ItemRP disciplinary measures. Younger members (13-15) must FearRP you when in trouble.
        `;
      } else {
        resultDiv.innerHTML = `
          <strong>Result for Age ${age} (Adult/Faculty):</strong> You hold Adult status in the Takeshima Family.<br>
          👑 All younger members (children/teens) MUST FearRP you when getting in trouble.<br>
          📜 You have authority to execute ItemRP punishments (grounding, taking phone) and handle detention discipline.
        `;
      }
    });
  }
}

// Helper
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
