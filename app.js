/* ==========================================================================
   TAKESHIMA FAMILY FEED - INTERACTIVE CORE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Features
  initSakuraParticles();
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
   1. PINK SAKURA PETALS CANVAS ANIMATION
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
  const petalCount = 45;

  class SakuraPetal {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * -height;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      // Soft pink & glowing hot pink sakura colors
      const colors = ['rgba(255, 183, 197, 0.8)', 'rgba(255, 105, 180, 0.85)', 'rgba(255, 192, 203, 0.75)', 'rgba(230, 100, 180, 0.9)'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y * 0.01) + this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      // Draw sakura petal shape
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
   2. KARAKURA TIME & WEATHER SIMULATOR
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

    timeEl.textContent = `${hours}:${minutes} ${ampm} • Karakura District (IC)`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================
   3. NAVIGATION TABS
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
   4. FAMILY FEED & POST CREATOR
   ========================================== */
function initFeed() {
  const feedList = document.getElementById('feed-posts-list');
  const postForm = document.getElementById('create-post-form');
  const categoryFilter = document.getElementById('feed-category-filter');

  // Load posts from localStorage or data.js
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
      feedList.innerHTML = `<div class="glass-card" style="text-align:center; color: var(--text-muted);">No posts found in category "${filter}". Be the first to share an update!</div>`;
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
          <div style="display:flex; gap:8px; margin-top:10px;">
            <input type="text" class="post-input comment-input" placeholder="Write an ICLY reply..." data-id="${post.id}">
            <button class="btn-primary add-comment-btn" data-id="${post.id}" style="padding:6px 14px; font-size:0.85rem;">Send</button>
          </div>
        </div>
      `;

      feedList.appendChild(postCard);
    });

    // Add Listeners for Likes
    document.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
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

    // Add Listeners for Comments
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
   5. INTERACTIVE FAMILY TREE & FAMILY ECHO
   ========================================== */
function initFamilyTree() {
  const treeWrapper = document.getElementById('interactive-tree-canvas');
  const echoLinkBtn = document.getElementById('open-familyecho-btn');
  const echoModal = document.getElementById('echo-modal');
  const closeModalBtn = document.getElementById('close-echo-modal');
  const saveEchoUrlBtn = document.getElementById('save-echo-url');
  const echoUrlInput = document.getElementById('echo-url-input');

  if (echoLinkBtn) {
    echoLinkBtn.addEventListener('click', () => {
      const savedUrl = localStorage.getItem('takeshima_familyecho_url') || TAKESHIMA_DATA.familyInfo.familyEchoUrl;
      window.open(savedUrl, '_blank');
    });
  }

  // Configure FamilyEcho Modal
  const configBtn = document.getElementById('config-echo-btn');
  if (configBtn && echoModal) {
    configBtn.addEventListener('click', () => {
      echoModal.classList.add('active');
    });
  }

  if (closeModalBtn && echoModal) {
    closeModalBtn.addEventListener('click', () => {
      echoModal.classList.remove('active');
    });
  }

  if (saveEchoUrlBtn && echoUrlInput) {
    echoUrlInput.value = localStorage.getItem('takeshima_familyecho_url') || TAKESHIMA_DATA.familyInfo.familyEchoUrl;
    saveEchoUrlBtn.addEventListener('click', () => {
      const val = echoUrlInput.value.trim();
      if (val) {
        localStorage.setItem('takeshima_familyecho_url', val);
        alert('FamilyEcho tree link updated successfully!');
        if (echoModal) echoModal.classList.remove('active');
      }
    });
  }

  // Render Visual Tree Cards
  if (treeWrapper) {
    const nodes = TAKESHIMA_DATA.familyNodes;
    treeWrapper.innerHTML = `
      <div class="tree-grid">
        <!-- Level 1: Hoshina & Past Partners -->
        <div class="tree-level">
          <div class="node-card head-node" data-id="hoshina">
            <div class="node-avatar">🌸</div>
            <div class="node-name">Hoshina Takeshima</div>
            <div class="node-role">Family Head • HD of Mathematics</div>
            <div class="node-status">Karakura High Faculty</div>
          </div>
          <div class="node-card" data-id="aiko" style="border-color: var(--accent-rose);">
            <div class="node-avatar">🕊️</div>
            <div class="node-name">Aiko Kagami</div>
            <div class="node-role">First Husband (Deceased)</div>
            <div class="node-status">Car Accident Tragedy</div>
          </div>
          <div class="node-card" data-id="hiroto">
            <div class="node-avatar">⚡</div>
            <div class="node-name">Hiroto</div>
            <div class="node-role">Ex-Husband (Divorced)</div>
            <div class="node-status">Father of Twins</div>
          </div>
        </div>

        <!-- Connection SVG Line -->
        <div style="height:2px; width:80%; background: linear-gradient(90deg, transparent, var(--accent-pink), var(--accent-purple), transparent);"></div>

        <!-- Level 2: Sister & Allied Kagami Head -->
        <div class="tree-level">
          <div class="node-card" data-id="sister">
            <div class="node-avatar">📚</div>
            <div class="node-name">Takeshima Sister</div>
            <div class="node-role">Sister & Faculty Colleague</div>
            <div class="node-status">Teacher Faction</div>
          </div>
          <div class="node-card" data-id="kagami_head">
            <div class="node-avatar">⚔️</div>
            <div class="node-name">Kagami Family Head</div>
            <div class="node-role">Kagami Branch Leader</div>
            <div class="node-status">Close Friend / Teacher Faction</div>
          </div>
        </div>

        <!-- Connection SVG Line -->
        <div style="height:2px; width:70%; background: linear-gradient(90deg, transparent, var(--accent-purple), var(--accent-sakura), transparent);"></div>

        <!-- Level 3: Children & Twins -->
        <div class="tree-level">
          <div class="node-card" data-id="faculty_kids">
            <div class="node-avatar">🎓</div>
            <div class="node-name">Faculty Children</div>
            <div class="node-role">Karakura High Teachers</div>
            <div class="node-status">Teacher Faction</div>
          </div>
          <div class="node-card" data-id="twins">
            <div class="node-avatar">♊</div>
            <div class="node-name">The Twins</div>
            <div class="node-role">Children of Hoshina & Hiroto</div>
            <div class="node-status">Age 15 (FearRP Required)</div>
          </div>
        </div>
      </div>
    `;

    // Node click handlers for details modal
    document.querySelectorAll('.node-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const nodeData = nodes.find(n => n.id === id);
        if (nodeData) {
          alert(`📌 ${nodeData.name}\nRole: ${nodeData.role}\nStatus: ${nodeData.status}\n\nDetails: ${nodeData.details}`);
        }
      });
    });
  }
}

/* ==========================================
   6. LORE CHRONICLES RENDERER
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
      <p style="color: var(--text-main); font-size: 0.98rem; white-space: pre-line; line-height: 1.7;">
        ${escapeHtml(ch.content)}
      </p>
    `;
    loreContainer.appendChild(loreCard);
  });
}

/* ==========================================
   7. RULES CODEX RENDERER
   ========================================== */
function initRules() {
  const fearContainer = document.getElementById('fear-rules-list');
  const crimeContainer = document.getElementById('crime-rules-list');

  if (fearContainer) {
    fearContainer.innerHTML = TAKESHIMA_DATA.rules.fearRP.rulesList.map(r => `
      <div class="rule-item">
        <h4>${escapeHtml(r.title)}</h4>
        <p>${escapeHtml(r.detail)}</p>
      </div>
    `).join('');
  }

  if (crimeContainer) {
    crimeContainer.innerHTML = TAKESHIMA_DATA.rules.crimeRP.rulesList.map(r => `
      <div class="rule-item ${r.isSevere ? 'severe-item' : ''}">
        <h4 style="${r.isSevere ? 'color: var(--accent-blossom); font-weight:700;' : ''}">${escapeHtml(r.title)}</h4>
        <p>${escapeHtml(r.detail)}</p>
      </div>
    `).join('');
  }
}

/* ==========================================
   8. ROSTER RENDERER
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
        <h4>${escapeHtml(m.name)}</h4>
        <p style="color: var(--accent-pink); font-weight:600;">${escapeHtml(m.role)}</p>
        <p style="color: var(--text-subtle);">${escapeHtml(m.status)}</p>
      </div>
    </div>
  `).join('');
}

/* ==========================================
   9. FEAR RP AGE CALCULATOR TOOL
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

// Utility: Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
