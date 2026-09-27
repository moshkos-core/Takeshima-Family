/* ==========================================================================
   TAKESHIMA FAMILY FEED - HYPER-SMOOTH JAVASCRIPT & SAKURA EFFECTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Features
  initSakuraParticles();
  initClickSakuraBurst();
  initFlowerTrail();
  initTimeAndWeather();
  initNavigation();
  initFamilyTree();
  initLore();
  initRules();
  initRoster();
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

/* ==========================================
   INTERACTIVE FLOWER MOUSE TRAIL
   ========================================== */
function initFlowerTrail() {
  let lastX = 0;
  let lastY = 0;
  let throttleTimer = false;

  window.addEventListener('mousemove', (e) => {
    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    if (dist < 22 || throttleTimer) return;
    
    throttleTimer = true;
    setTimeout(() => { throttleTimer = false; }, 35);

    lastX = e.clientX;
    lastY = e.clientY;

    const trail = document.createElement('div');
    trail.textContent = '🌸';
    trail.style.position = 'fixed';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.pointerEvents = 'none';
    trail.style.fontSize = (Math.random() * 6 + 10) + 'px';
    trail.style.zIndex = '9998';
    trail.style.opacity = '0.75';
    trail.style.transform = 'translate(-50%, -50%) scale(1) rotate(' + (Math.random() * 360) + 'deg)';
    trail.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    document.body.appendChild(trail);

    requestAnimationFrame(() => {
      trail.style.transform = `translate(-50%, ${e.clientY + 18}px) scale(0.2) rotate(${Math.random() * 360}deg)`;
      trail.style.opacity = '0';
    });

    setTimeout(() => {
      if (document.body.contains(trail)) {
        document.body.removeChild(trail);
      }
    }, 750);
  });
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

  function switchTab(targetTab) {
    navBtns.forEach(b => {
      if (b.getAttribute('data-tab') === targetTab) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    tabContents.forEach(c => {
      if (c.id === `tab-${targetTab}`) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Support quick switch cards
  document.body.addEventListener('click', (e) => {
    const card = e.target.closest('[data-tab-switch]');
    if (card) {
      const target = card.getAttribute('data-tab-switch');
      if (target) switchTab(target);
    }
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
   6. REAL GENEALOGY FAMILY TREE ENGINE
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

  const addMemberBtn = document.getElementById('add-tree-member-btn');
  const memberModal = document.getElementById('add-member-modal');
  const closeMemberModal = document.getElementById('close-member-modal');
  const addMemberForm = document.getElementById('add-member-form');

  // Load custom nodes from localStorage or default
  let nodes = JSON.parse(localStorage.getItem('takeshima_custom_nodes'));
  if (!nodes || nodes.length === 0) {
    nodes = TAKESHIMA_DATA.familyNodes;
    localStorage.setItem('takeshima_custom_nodes', JSON.stringify(nodes));
  }

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

    document.querySelectorAll('.genealogy-card').forEach(c => c.style.borderColor = '');
    const activeCard = document.querySelector(`.genealogy-card[data-id="${id}"]`);
    if (activeCard) activeCard.style.borderColor = 'var(--accent-pink)';
  }

  function renderGenealogyTree(filter = 'all') {
    if (!treeWrapper) return;

    const gen1Nodes = nodes.filter(n => n.generation === 1 || !n.generation);
    const gen2Nodes = nodes.filter(n => n.generation === 2);

    treeWrapper.innerHTML = `
      <div class="genealogy-tree-container">
        <div class="genealogy-nodes-layer">
          
          <!-- GENERATION I: SPOUSES & PARENTS -->
          <div style="text-align: center; width: 100%;">
            <div style="font-family: var(--font-header); font-size: 0.82rem; color: var(--accent-pink); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px;">
              ── Generation I: Spouses & Family Heads ──
            </div>

            <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
              ${gen1Nodes.map(n => `
                <div class="genealogy-card ${n.gender || (n.id==='aiko'?'male deceased':(n.id==='hoshina'?'female':'male'))}" data-id="${n.id}" style="${filterMatch(n, filter) ? '' : 'opacity:0.3;'}">
                  <div class="g-photo">${n.photo || '🌸'}</div>
                  <div class="g-name">${escapeHtml(n.name)}</div>
                  <div class="g-relation">${escapeHtml(n.role)}</div>
                  <div class="g-age-badge">${escapeHtml(n.ageLabel || 'Age ' + n.age)}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- DESCENT STEM LINE -->
          <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <div style="width: 2px; height: 30px; background: var(--accent-pink); box-shadow: 0 0 10px var(--accent-pink);"></div>
            <div style="width: 85%; height: 2px; background: linear-gradient(90deg, transparent, var(--accent-pink), var(--accent-purple), transparent);"></div>
            <div style="width: 2px; height: 30px; background: var(--accent-purple); box-shadow: 0 0 10px var(--accent-purple);"></div>
          </div>

          <!-- GENERATION II: CHILDREN BRANCHES -->
          <div style="text-align: center; width: 100%;">
            <div style="font-family: var(--font-header); font-size: 0.82rem; color: var(--accent-purple); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px;">
              ── Generation II: Offspring & Lineage Descent ──
            </div>

            <div class="children-row" style="flex-wrap: wrap; gap: 20px;">
              ${gen2Nodes.map(n => `
                <div class="genealogy-card ${n.gender || 'male'}" data-id="${n.id}" style="${filterMatch(n, filter) ? '' : 'opacity:0.3;'}">
                  <div class="g-photo">${n.photo || '🎓'}</div>
                  <div class="g-name">${escapeHtml(n.name)}</div>
                  <div class="g-relation">${escapeHtml(n.role)}</div>
                  <div class="g-age-badge" style="${n.age <= 15 ? 'color:var(--accent-gold);' : ''}">${escapeHtml(n.ageLabel || 'Age ' + n.age)}</div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      </div>
    `;

    document.querySelectorAll('.genealogy-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        selectNode(id);
      });
    });
  }

  function filterMatch(node, filter) {
    if (filter === 'all') return true;
    if (filter === 'teacher' && node.faction.toLowerCase().includes('teacher')) return true;
    if (filter === 'kagami' && (node.faction.toLowerCase().includes('kagami') || node.id === 'aiko')) return true;
    if (filter === 'kids' && (node.age <= 18 || node.generation === 2)) return true;
    return false;
  }

  // Modal Handlers
  if (addMemberBtn && memberModal) {
    addMemberBtn.addEventListener('click', () => {
      memberModal.classList.add('active');
    });
  }

  if (closeMemberModal && memberModal) {
    closeMemberModal.addEventListener('click', () => {
      memberModal.classList.remove('active');
    });
  }

  if (addMemberForm) {
    addMemberForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('member-name-input').value.trim();
      const age = parseInt(document.getElementById('member-age-input').value);
      const gender = document.getElementById('member-gender-select').value;
      const gen = parseInt(document.getElementById('member-gen-select').value);
      const role = document.getElementById('member-role-input').value.trim();
      const faction = document.getElementById('member-faction-select').value;
      const details = document.getElementById('member-details-input').value.trim();

      if (!name || isNaN(age)) return;

      const photo = gender === 'female' ? '🌸' : (gender === 'deceased' ? '🕊️' : '🎓');
      const ageLabel = age >= 18 ? `Age ${age} (Adult)` : `Age ${age} (Teen)`;
      const fearRP = age <= 15 ? `Age ${age} Bracket. MUST FearRP all older members (16+) and Adults.` : `Adult/Faculty Status. Younger members must FearRP when in trouble.`;

      const newNode = {
        id: 'custom_' + Date.now(),
        name,
        role,
        faction,
        status: 'Active • Family Member',
        age,
        ageLabel,
        gender,
        photo,
        details: details || `Member of the ${faction}.`,
        fearRP,
        generation: gen
      };

      nodes.push(newNode);
      localStorage.setItem('takeshima_custom_nodes', JSON.stringify(nodes));

      memberModal.classList.remove('active');
      addMemberForm.reset();

      renderGenealogyTree('all');
      selectNode(newNode.id);
      alert(`🌸 ${name} has been added to the Takeshima Family Tree!`);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');
      const filter = btn.getAttribute('data-filter');
      renderGenealogyTree(filter);
    });
  });

  renderGenealogyTree('all');
  selectNode('hoshina');
}

/* ==========================================
   7. LORE CHRONICLES RENDERER
   ========================================== */
function initLore() {
  const loreTimeline = document.getElementById('lore-chapters-container');
  const loreParagraphs = document.getElementById('lore-paragraphs-container');
  const btnTimeline = document.getElementById('lore-btn-timeline');
  const btnParagraphs = document.getElementById('lore-btn-paragraphs');

  if (!loreTimeline || !TAKESHIMA_DATA.lore) return;

  const chapters = TAKESHIMA_DATA.lore.chapters;

  // Render Chapter / Timeline View
  loreTimeline.innerHTML = '';
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
    loreTimeline.appendChild(loreCard);
  });

  // Render Continuous Single-Page Full Story View (No Chapters)
  if (loreParagraphs) {
    let storyHtml = `
      <div class="single-page-story-manuscript">
        <div class="story-manuscript-header">
          <span class="story-header-badge">🌸 TAKESHIMA FAMILY LORE</span>
          <h2 class="story-main-title">The Story of Hoshina Takeshima</h2>
          <p class="story-tagline">"Resilience through sorrow • Unity in passion • Karakura Highschool Legacy"</p>
        </div>

        <div class="story-manuscript-body-text">
    `;

    chapters.forEach((ch) => {
      storyHtml += `
        <p class="continuous-story-paragraph">${escapeHtml(ch.content)}</p>
      `;
    });

    storyHtml += `
        </div>
      </div>
    `;
    loreParagraphs.innerHTML = storyHtml;
  }

  // Toggle View Modes
  if (btnTimeline && btnParagraphs && loreParagraphs) {
    btnTimeline.addEventListener('click', () => {
      loreTimeline.style.display = 'block';
      loreParagraphs.style.display = 'none';
      btnTimeline.style.background = 'var(--accent-pink)';
      btnTimeline.style.color = '#fff';
      btnTimeline.style.border = 'none';
      btnParagraphs.style.background = 'rgba(255,105,180,0.15)';
      btnParagraphs.style.color = 'var(--accent-pink)';
      btnParagraphs.style.border = '1px solid var(--accent-pink)';
    });

    btnParagraphs.addEventListener('click', () => {
      loreTimeline.style.display = 'none';
      loreParagraphs.style.display = 'block';
      btnParagraphs.style.background = 'var(--accent-pink)';
      btnParagraphs.style.color = '#fff';
      btnParagraphs.style.border = 'none';
      btnTimeline.style.background = 'rgba(255,105,180,0.15)';
      btnTimeline.style.color = 'var(--accent-pink)';
      btnTimeline.style.border = '1px solid var(--accent-pink)';
    });
  }
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
  if (!rosterGrid || !TAKESHIMA_DATA.roster) return;

  const rosterData = TAKESHIMA_DATA.roster;

  let html = '';
  rosterData.categories.forEach(cat => {
    html += `
      <div class="roster-category-block">
        <div class="roster-category-title-bar">
          <div class="cat-title-left">
            <span class="cat-icon-lg">${cat.icon || '🌸'}</span>
            <div>
              <h3 class="cat-main-title">${escapeHtml(cat.title)}</h3>
              <p class="cat-sub-title">${escapeHtml(cat.subtitle || 'Leadership & Lineage')}</p>
            </div>
          </div>
        </div>

        <div class="roster-members-stack">
          ${cat.members.map(m => `
            <div class="roster-member-card ${m.isFounder ? 'glow-gold' : (m.isHead ? 'glow-pink' : 'glow-purple')}">
              <div class="roster-avatar-frame">${m.avatar || '🌸'}</div>

              <div class="roster-member-details">
                <div class="roster-top-row">
                  <div class="name-handle-group">
                    <h4 class="member-char-name">${escapeHtml(m.name)}</h4>
                    <span class="member-discord-pill">
                      <span class="discord-logo-icon">💬</span> @${escapeHtml(m.handle)}
                    </span>
                  </div>
                  <span class="role-badge-tag ${cat.badgeClass}">${escapeHtml(m.roleTag)}</span>
                </div>

                <div class="roster-mid-row">
                  <span class="member-title-tag">💼 ${escapeHtml(m.title)}</span>
                  <span class="member-faction-tag">🏫 ${escapeHtml(m.faction)}</span>
                  <span class="member-status-tag">✨ ${escapeHtml(m.status)}</span>
                </div>

                <p class="member-bio-text">"${escapeHtml(m.bio)}"</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });

  rosterGrid.innerHTML = html;
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

/* ==========================================
   10. ATTIRE SKIN FILE DOWNLOAD HELPER
   ========================================== */
function downloadAttireSkin(e) {
  if (e) e.preventDefault();
  fetch('assets/takeshima_attire_skin.png')
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Takeshima_Family_Attire_Skin.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    })
    .catch(err => {
      console.error('Download error', err);
      const a = document.createElement('a');
      a.href = 'assets/takeshima_attire_skin.png';
      a.download = 'Takeshima_Family_Attire_Skin.png';
      a.click();
    });
}
