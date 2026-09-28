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
    familyEchoUrl: "https://www.familyecho.com/?c=93wx4770v9jub44a&f=391716927242587150",
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
      faction: "Karakura High Teacher Faction",
      status: "Active • Head of House",
      age: 38,
      ageLabel: "Age 38 (Adult)",
      photo: "🌸",
      details: "Head of Mathematics at Karakura Highschool. Abandoned at age 4, survived abusive relative, rebuilt her life with Aiko, raised 4 kids including twins. Dedicated math educator.",
      fearRP: "Adult Status. All younger members (13-15 and older teens) MUST FearRP Hoshina when in trouble.",
      generation: 1,
      spouses: ["Aiko Kagami (1st)", "Hiroto (Ex)"],
      children: ["Ren & Yumi (Faculty)", "Kenji & Maya (Twins)"]
    },
    {
      id: "aiko",
      name: "Aiko Kagami",
      role: "First Husband & True Love",
      faction: "Kagami Lineage",
      status: "Deceased (Fatal Car Crash)",
      age: "Deceased (Age 28)",
      ageLabel: "Deceased at Age 28",
      photo: "🕊️",
      details: "Kind and devoted member of the Kagami family. Married Hoshina at 18. Tragically killed in a car accident at the scene of impact.",
      fearRP: "Honored Memorial Status.",
      generation: 1,
      spouses: ["Hoshina Takeshima"],
      children: ["Ren & Yumi (Faculty Children)"]
    },
    {
      id: "hiroto",
      name: "Hiroto",
      role: "Ex-Husband & Father of Twins",
      faction: "Independent",
      status: "Divorced / Separated",
      age: 40,
      ageLabel: "Age 40 (Adult)",
      photo: "⚡",
      details: "Second partner of Hoshina. Father of the twins. Divorced after overheard conversations and unfaithfulness ('You were never really there').",
      fearRP: "Adult Status. Divorced from family branch.",
      generation: 1,
      spouses: ["Hoshina Takeshima (Divorced)"],
      children: ["Kenji & Maya (Twins)"]
    },
    {
      id: "sister",
      name: "Takeshima Sister",
      role: "Mathematics Faculty Colleague",
      faction: "Teacher Faction",
      status: "Active • Faculty Teacher",
      age: 36,
      ageLabel: "Age 36 (Adult)",
      photo: "📚",
      details: "Hoshina's sister working alongside her in the Karakura Highschool Mathematics Department.",
      fearRP: "Adult Faculty Status. Younger members must FearRP during school hours.",
      generation: 1,
      spouses: [],
      children: []
    },
    {
      id: "kagami_head",
      name: "Head of Kagami Family",
      role: "Allied Branch Head & Faculty",
      faction: "Kagami Lineage / Teacher Faction",
      status: "Active • Allied Family Head",
      age: 42,
      ageLabel: "Age 42 (Adult)",
      photo: "⚔️",
      details: "Head of the Kagami Family. Initial unsettling demeanor turned into a close, trusted friendship with Hoshina in the Teacher Faction.",
      fearRP: "Adult Branch Head Status.",
      generation: 1,
      spouses: [],
      children: []
    },
    {
      id: "ren_takeshima",
      name: "Ren Takeshima",
      role: "Mathematics Teacher",
      faction: "Teacher Faction",
      status: "Active • Karakura High Staff",
      age: 21,
      ageLabel: "Age 21 (Young Adult)",
      photo: "🎓",
      details: "Son of Hoshina & Aiko. Followed his mother's passion for mathematics and joined Karakura High faculty.",
      fearRP: "Adult Faculty Status. Members aged 13-15 must FearRP when in trouble.",
      generation: 2,
      parents: ["Hoshina Takeshima", "Aiko Kagami"]
    },
    {
      id: "yumi_takeshima",
      name: "Yumi Takeshima",
      role: "Science Educator",
      faction: "Teacher Faction",
      status: "Active • Karakura High Staff",
      age: 20,
      ageLabel: "Age 20 (Young Adult)",
      photo: "📖",
      details: "Daughter of Hoshina & Aiko. Science educator working alongside her mother and aunt at school.",
      fearRP: "Adult Faculty Status. Members aged 13-15 must FearRP when in trouble.",
      generation: 2,
      parents: ["Hoshina Takeshima", "Aiko Kagami"]
    },
    {
      id: "kenji_takeshima",
      name: "Kenji Takeshima (Twin A)",
      role: "Highschool Student",
      faction: "Takeshima Younger Branch",
      status: "Active • Karakura High Student",
      age: 15,
      ageLabel: "Age 15 (Teen)",
      photo: "♊",
      details: "Son of Hoshina & Hiroto. Twin brother of Maya. Subject to strict age hierarchy FearRP rules.",
      fearRP: "Age 15 Bracket. MUST FearRP all members aged 16+ and ALL Adults. ItemRP phone confiscation / grounding applies.",
      generation: 2,
      parents: ["Hoshina Takeshima", "Hiroto"]
    },
    {
      id: "maya_takeshima",
      name: "Maya Takeshima (Twin B)",
      role: "Highschool Student",
      faction: "Takeshima Younger Branch",
      status: "Active • Karakura High Student",
      age: 15,
      ageLabel: "Age 15 (Teen)",
      photo: "♊",
      details: "Daughter of Hoshina & Hiroto. Twin sister of Kenji. Subject to strict age hierarchy FearRP rules.",
      fearRP: "Age 15 Bracket. MUST FearRP all members aged 16+ and ALL Adults. ItemRP phone confiscation / grounding applies.",
      generation: 2,
      parents: ["Hoshina Takeshima", "Hiroto"]
    }
  ],

  roster: {
    categories: [
      {
        title: "Founder",
        subtitle: "Original Matriarch & Family Creator",
        badgeClass: "badge-founder",
        icon: "🌸",
        members: [
          {
            name: "Hoshina C. Takeshima",
            handle: "mariskaeng",
            roleTag: "@Founder",
            roleBadge: "Founder & Matriarch",
            title: "Department Head of Mathematics",
            faction: "Karakura High Teacher Faction",
            status: "Active Founder",
            avatar: "🌸",
            isFounder: true,
            bio: "Founder of the Takeshima Family and Head of Department of Mathematics at Karakura Highschool."
          }
        ]
      },
      {
        title: "Family Head",
        subtitle: "Official Head of House & Leadership",
        badgeClass: "badge-family-head",
        icon: "👑",
        members: [
          {
            name: "Arthur Takeshima",
            handle: "hotandhomeless",
            roleTag: "@👑 Family Head",
            roleBadge: "Official Family Head",
            title: "Head of Takeshima House",
            faction: "Karakura Leadership",
            status: "Active Family Head",
            avatar: "⚔️",
            isHead: true,
            bio: "Leading the Takeshima Family with strength, protection, and strict adherence to family values."
          }
        ]
      },
      {
        title: "Co-Head",
        subtitle: "Executive Governance & Branch Leadership",
        badgeClass: "badge-co-head",
        icon: "♔",
        members: [
          {
            name: "Misaki Takeshima",
            handle: "corrupteddxys",
            roleTag: "@♔ [C] Co-Head",
            roleBadge: "Executive Co-Head",
            title: "Executive Co-Head",
            faction: "Takeshima House Governance",
            status: "Active Co-Head",
            avatar: "✨",
            isCoHead: true,
            bio: "Co-leading family affairs, organizing member ties, and maintaining family unity."
          }
        ]
      },
      {
        title: "Family Staff",
        subtitle: "Support, Administration & Family Operations",
        badgeClass: "badge-family-staff",
        icon: "🛡️",
        members: [
          {
            name: "Ri-Na Takeshima",
            handle: "pngpurple",
            roleTag: "@Family Staff",
            roleBadge: "Family Staff",
            title: "Takeshima Staff Member",
            faction: "Takeshima Staff Team",
            status: "Active Staff",
            avatar: "💜",
            isStaff: true,
            bio: "Dedicated staff member maintaining family order, supporting leadership, and assisting members."
          },
          {
            name: "Issy Takeshima",
            handle: "shaharmoshko_",
            roleTag: "@Family Staff",
            roleBadge: "Family Staff",
            title: "Takeshima Staff Member",
            faction: "Takeshima Staff Team",
            status: "Active Staff",
            avatar: "🌸",
            isStaff: true,
            bio: "Dedicated staff member maintaining family order, supporting leadership, and assisting members."
          }
        ]
      }
    ]
  }
};


