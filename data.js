/* ==========================================
   TAKESHIMA FAMILY CORE DATA & LORE STORE
   ========================================== */

const TAKESHIMA_DATA = {
  familyInfo: {
    name: "Takeshima Family",
    motto: "Resilience through sorrow, unity in passion",
    head: "Hoshina Takeshima",
    headTitle: "Head of Department (HD) of Mathematics",
    faction: "Karakura Highschool Teacher Faction",
    familyEchoUrl: "https://www.familyecho.com",
  },

  lore: {
    title: "The Chronicles of Hoshina Takeshima",
    subtitle: "A story of profound sorrow, enduring strength, and the legacy of Karakura Highschool",
    chapters: [
      {
        id: "childhood",
        number: "Chapter I",
        title: "Steeped in Sorrow",
        period: "Age 4 - Early Youth",
        quote: "Whenever someone brings up her family or her past, she goes silent, quickly changing the subject as if the words themselves are too heavy to bear.",
        content: `The Takeshima's past is steeped in sorrow. When Hoshina was just four years old, she was abandoned by her parents and left in the care of an abusive relative. The scars of those early years ran deep into her soul. 

Whenever someone brings up her family or her past, she instinctively goes silent, quickly changing the subject as if the words themselves are too heavy to bear. She learned from a young age that survival meant building walls around her heart.`
      },
      {
        id: "aiko",
        number: "Chapter II",
        title: "Aiko Kagami & True Love",
        period: "Age 18 - Marital Bliss",
        quote: "They eventually got Married and built a life together, filled with warmth, love and the joy of starting a family of their own.",
        content: `Years passed and at the age of eighteen, Hoshina met the love of her life: **Aiko Kagami**, a kind and devoted member of the Kagami Family. For the first time, Hoshina knew what it felt like to be genuinely cherished.

They eventually got married and built a life together, filled with warmth, unconditional love, and the boundless joy of starting a family of their own. For a fleeting moment, the shadows of her past seemed to fade.`
      },
      {
        id: "tragedy",
        number: "Chapter III",
        title: "Happiness Short-Lived",
        period: "The Tragedy",
        quote: "Aiko was involved in a devastating car accident and died at the scene of the impact...",
        highlight: "But that Happiness was short lived",
        content: `Aiko was involved in a devastating car accident and died at the scene of the impact. The loss shattered Hoshina's world to pieces. 

Even now, she struggles to mend the cracks left behind. She kept going for the children that Aiko left behind and for herself, but grief still lingers in every quiet moment, like a faint melody echoing in an empty room.`
      },
      {
        id: "kagami-head",
        number: "Chapter IV",
        title: "The Kagami Head & Unsettled Ties",
        period: "Teacher Faction Alliance",
        quote: "It's not anger or bitterness, more like subconscious reaction...",
        content: `Strangely, Hoshina never formed a good relationship with the head of the Kagami Family. She doesn't fully understand why, but whenever they pass each other, she catches herself glaring. It's not anger or bitterness—more like a subconscious reaction.

Perhaps it is tied to the ways he spoke to her when they joined the teacher faction. His tone, his demeanor... something about it unsettled her from the very start. Still, she learned to live with it, and despite the past tension, they have grown to be something close to friends.`
      },
      {
        id: "hiroto",
        number: "Chapter V",
        title: "Hiroto & The Final Betrayal",
        period: "Second Relationship & Divorce",
        quote: "You were never really there.",
        content: `Months later, she met Hiroto—her most recent partner. For a while, he was a source of joy she never expected to find again. They shared laughter, raised their twins together, and she allowed herself to hope once more.

Everything shifted the day she overheard him speaking to someone else about their relationship—about her—in a way that cut deep into her soul. Two weeks later, Hiroto asked for a divorce, stating coldly, *"You were never really there."*

Though the separation was civil for the sake of the kids and their twins, the words haunted her. And not long after the papers were signed, she learned the final blow: he had been unfaithful. The betrayal left her completely hollow.`
      },
      {
        id: "karakura-today",
        number: "Chapter VI",
        title: "Head of Mathematics & Legacy",
        period: "Present Day - Karakura Highschool",
        quote: "She hopes her children will continue to grow and build this family. And she hopes she will find the same love she once had when she met their dad.",
        content: `Years later, after persevering through unimaginable heartache, Hoshina rose to become the **Head of Department (HD) of Mathematics for Karakura Highschool**. 

She found herself with children that she adores like nothing else. In a heartwarming surprise, her children now work with her in the **Teacher Faction alongside her sister**. She is overjoyed that her kids found the same passion she once had.

Now she's trying to move on. Doing her best to be strong for her children and for herself... but part of her still wonders if she will ever find someone who truly sees her and stays. She hopes her children will continue to grow and build this family—and she hopes she will find the same love she once had when she met their dad.`
      }
    ]
  },

  rules: {
    fearRP: {
      title: "FearRP Rules",
      description: "Strict hierarchical expectations for all family members in Karakura High IC interactions.",
      rulesList: [
        {
          id: "age-hierarchy",
          title: "Age-Based FearRP Hierarchy",
          detail: "All members within a branch MUST FearRP those who are older when they get in trouble. For example, if your character is in the age group of 13-15, you MUST FearRP anyone above your age group."
        },
        {
          id: "adults-punishment",
          title: "Adults & ItemRP Punishments",
          detail: "All members MUST FearRP Adults and official punishments. All punishments such as grounding, privileges revoked, or taking a phone MUST be conducted through ItemRP."
        },
        {
          id: "detention-fear",
          title: "Detention Consequences",
          detail: "All children MUST FearRP any Adults who find out they received a school detention at Karakura Highschool."
        },
        {
          id: "chat-fear",
          title: "ICLY Group Chat Protocol",
          detail: "FearRP rules apply strictly on the ICLY family group chat. Respectful tone, compliance, and fear of consequences must be shown in text chats when an adult intervenes."
        }
      ]
    },
    crimeRP: {
      title: "GangRP / CrimeRP / Violence Rules",
      description: "Strict zero-tolerance crime policy to protect the faculty and family standing.",
      notice: "No Crime RP! Do not involve the family with crime stuff or GangRP ICLY. This is NOT a crime family! We don't want any faculty members getting involved. We want ZERO gang affiliation.",
      rulesList: [
        {
          id: "faculty-protection",
          title: "Zero Faculty Gang Affiliation",
          detail: "Do NOT involve any Family faculty members, branch heads, teachers, or employees with GangRP or CrimeRP under any circumstances."
        },
        {
          id: "argument-protocol",
          title: "Argument & De-escalation Protocol",
          detail: "You may start an ICLY argument with a family member, but once an Adult or Branch Head gets involved, ALL violence MUST stop immediately and prepare to FearRP."
        },
        {
          id: "no-deadly-weapons",
          title: "Weapon Ban",
          detail: "Do NOT use deadly weapons on any family members within a general family fight."
        },
        {
          id: "stealth-rule",
          title: "Do NOT Get Discovered",
          detail: "You must convince your family members you aren't a thug. Keep any illegal activities completely hidden from the family."
        },
        {
          id: "removal-penalty",
          title: "DISCOVERY PENALTY: Automatic Removal",
          isSevere: true,
          detail: "IF you do get discovered (the worst case), you MUST FearRP getting discovered. Family Heads will AUTOMATICALLY ICLY remove you from their branch and trigger a complete removal from the Takeshima Family. We are heavily strict on this!"
        }
      ]
    }
  },

  familyNodes: [
    {
      id: "hoshina",
      name: "Hoshina Takeshima",
      role: "Family Head & HD of Mathematics",
      faction: "Teacher Faction",
      status: "Active",
      age: "Adult",
      details: "Head of Mathematics at Karakura Highschool. Mother of kids & twins. Devoted to her family and students.",
      avatar: "🌸",
      relationships: [
        { target: "aiko", type: "First Husband (Deceased)" },
        { target: "hiroto", type: "Ex-Husband (Divorced)" },
        { target: "sister", type: "Sister & Colleague" },
        { target: "kagami_head", type: "Close Friend / Allied Head" }
      ]
    },
    {
      id: "aiko",
      name: "Aiko Kagami",
      role: "First Husband of Hoshina",
      faction: "Kagami Family",
      status: "Deceased (Car Accident)",
      age: "Adult",
      details: "Kind and devoted member of the Kagami Family. Passed away in a devastating car crash.",
      avatar: "🕊️"
    },
    {
      id: "hiroto",
      name: "Hiroto",
      role: "Ex-Husband & Twin Father",
      faction: "Independent",
      status: "Divorced / Separated",
      age: "Adult",
      details: "Father of the twins. Divorced Hoshina after unfaithfulness.",
      avatar: "⚡"
    },
    {
      id: "sister",
      name: "Takeshima Sister",
      role: "Teacher Faction Member",
      faction: "Teacher Faction",
      status: "Active",
      age: "Adult",
      details: "Hoshina's supportive sister working alongside her at Karakura Highschool.",
      avatar: "📚"
    },
    {
      id: "faculty_kids",
      name: "Takeshima Faculty Children",
      role: "Teachers & Staff",
      faction: "Teacher Faction",
      status: "Active",
      age: "Young Adults",
      details: "Children who followed Hoshina's passion and joined the Karakura Highschool faculty.",
      avatar: "🎓"
    },
    {
      id: "twins",
      name: "The Twins",
      role: "Children of Hoshina & Hiroto",
      faction: "Takeshima Family",
      status: "Active",
      age: "Teens (15)",
      details: "Raised by Hoshina. Subject to age-hierarchy FearRP rules.",
      avatar: "♊"
    },
    {
      id: "kagami_head",
      name: "Head of Kagami Family",
      role: "Kagami Family Head",
      faction: "Kagami Lineage / Teacher Faction",
      status: "Active",
      age: "Adult",
      details: "Former tension turned into close friendship with Hoshina.",
      avatar: "⚔️"
    }
  ],

  initialFeed: [
    {
      id: 1,
      author: "Hoshina Takeshima",
      title: "HD of Mathematics",
      avatar: "🌸",
      category: "Announcements",
      time: "2 hours ago",
      content: "Welcome to the official Takeshima Family Feed! As Head of Mathematics, I am thrilled to see our family members excelling at Karakura Highschool. Remember our values: strength, respect, and zero involvement in crime.",
      likes: 12,
      reactions: { "❤️": 8, "🌸": 4 },
      comments: [
        { author: "Takeshima Sister", text: "Proud of you, sister! Math department is looking stronger than ever.", time: "1 hour ago" },
        { author: "Faculty Child", text: "Glad to be teaching alongside you, Mom! 📚", time: "45 mins ago" }
      ]
    },
    {
      id: 2,
      author: "Branch Head Takeshima",
      title: "Branch Leader",
      avatar: "🏛️",
      category: "Rules & Policy",
      time: "5 hours ago",
      content: "IMPORTANT REMINDER regarding CrimeRP and FearRP:\n1. We are NOT a crime family. Zero gang affiliation permitted.\n2. If you are aged 13-15, remember to FearRP older members when called out.\n3. ItemRP phone confiscations/grounding must be obeyed immediately.",
      likes: 18,
      reactions: { "📌": 10, "⚡": 8 },
      comments: [
        { author: "The Twins", text: "Understood! We will follow all FearRP rules strictly.", time: "4 hours ago" }
      ]
    },
    {
      id: 3,
      author: "Takeshima Sister",
      title: "Karakura High Faculty",
      avatar: "📚",
      category: "Teacher Faction",
      time: "Yesterday",
      content: "Staff meeting in the Karakura High teachers' lounge after third period! All family faculty members please bring your lesson plans. Let's make Hoshina proud!",
      likes: 15,
      reactions: { "👏": 9, "🎓": 6 },
      comments: []
    },
    {
      id: 4,
      author: "Faculty Child",
      title: "Karakura High Teacher",
      avatar: "🎓",
      category: "Memories",
      time: "2 days ago",
      content: "Looking back at how far our family has come. From overcoming past heartaches to building a respected teaching legacy together. Forever grateful for Mom's resilience.",
      likes: 24,
      reactions: { "💖": 18, "✨": 6 },
      comments: [
        { author: "Hoshina Takeshima", text: "My heart is full seeing you all grow into such honorable teachers. Never stop believing in love and learning.", time: "2 days ago" }
      ]
    }
  ]
};
