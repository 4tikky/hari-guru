const photos = {
  hero: ['ayah-hero', 'Ayah’s hero portrait'],
  teaching: ['ayah-teaching-01', 'Ayah at SMKN 1 Windusari'],
  classroom: ['ayah-teaching-02', 'A day in Ayah’s classroom'],
  portrait: ['ayah-portrait', 'A portrait of Ayah'],
  childhood: ['childhood-01', 'When my world was small'],
  childhoodTwo: ['childhood-02', 'My first little adventures'],
  family: ['family-01', 'Home is wherever we are together'],
  familyTwo: ['family-02', 'All of us, together'],
  memory: ['memory-01', 'An ordinary day I still remember'],
  memoryTwo: ['memory-02', 'The little things that stayed'],
  ending: ['ayah-ending', 'A favorite photograph of Ayah'],
} as const

export type PhotoKey = keyof typeof photos
export const images = Object.fromEntries(Object.entries(photos).map(([key, [file, caption]]) =>
  [key, { src: `/images/${file}.jpg`, caption }]
)) as Record<PhotoKey, { src: string; caption: string }>

export const tribute = {
  father: '',
  daughter: '',
  school: 'SMKN 1 Windusari',
  date: '25 November 2026',
  occasion: 'National Teachers’ Day',
  intro: {
    lines: [
      'Some people teach us how to read, write, and understand the world.',
      'But someone taught me how to live in it.',
      'This is for him.',
    ],
    title: 'For Ayah, with love.',
    action: 'Open My Little Letter',
  },
  hero: {
    title: 'To My First and Forever Teacher.',
    subtitle: 'Before I learned from the world, I learned about the world from you.',
    note: 'For the man I proudly call Ayah.',
  },
  schoolStory: {
    title: 'A Teacher to Many.',
    paragraphs: [
      'Bagi banyak orang, Ayah adalah seorang guru. Seseorang yang berdiri di depan kelas, membagikan ilmu, membimbing, dan membantu murid-muridnya menemukan jalan menuju masa depan.',
      'Setiap hari, Ayah hadir bukan hanya untuk mengajarkan apa yang tertulis dalam buku, tetapi juga untuk menanamkan nilai-nilai yang mungkin akan mereka bawa sepanjang hidup.',
    ],
    caption: 'Where he shares knowledge and inspires futures.',
  },
  familyStory: {
    title: 'But to Me, You’re More Than That.',
    paragraphs: [
      'Namun, bagiku, Ayah bukan hanya seorang guru.',
      'Jauh sebelum aku mengenal bangku sekolah, Ayah sudah menjadi guru pertamaku.',
      'Ayah mengajarkanku banyak hal yang tidak selalu ditemukan dalam buku. Tentang bagaimana menghadapi kehidupan, bagaimana bertahan, bagaimana bertanggung jawab, dan bagaimana terus melangkah.',
    ],
    quote: 'His classroom has walls. But his lessons for us have none.',
  },
  notebookTitle: 'Things You Taught Me Without a Textbook.',
  lessons: [
    ['Responsibility', 'Tentang bagaimana bertanggung jawab atas setiap pilihan dan keputusan.'],
    ['Hard Work', 'Tentang bagaimana sesuatu yang berharga membutuhkan usaha dan kesungguhan.'],
    ['Kindness', 'Tentang bagaimana memperlakukan orang lain dengan baik.'],
    ['Resilience', 'Tentang bagaimana tetap melangkah, bahkan ketika kehidupan tidak berjalan sesuai keinginan.'],
    ['Faith', 'Tentang bagaimana selalu melibatkan Allah dalam setiap perjalanan kehidupan.'],
    ['Love', 'Tentang kasih sayang yang tidak selalu disampaikan melalui kata-kata, tetapi dapat hadir melalui tindakan sederhana.'],
  ],
  gallery: {
    title: 'Little Moments, Lifelong Memories.',
    subtitle: 'Perhaps the most meaningful lessons were hidden in the moments we thought were ordinary.',
    quote: 'One day, I realized that the little moments were never really little.',
    photos: ['childhood', 'portrait', 'family', 'teaching', 'memory', 'childhoodTwo', 'classroom', 'familyTwo', 'memoryTwo'] as PhotoKey[],
  },
  roles: {
    summary: 'He’s not only a teacher to his students, but also a teacher of life to his children.',
    left: 'To his students,\nhe is a teacher.',
    right: 'To his children,\nhe is a teacher of life.',
    conclusion: 'Different classrooms.\nDifferent lessons.\nThe same person we are grateful for.',
  },
  letter: {
    title: 'A Letter for Ayah.',
    address: 'To Ayah,\nMy First and Forever Teacher.',
    action: 'Open Your Letter',
    paragraphs: [
    "Dear Ayah,",
    "Hari ini, banyak orang mengucapkan Selamat Hari Guru kepada seseorang yang telah mengajarkan mereka ilmu.",
    "Aku pun ingin mengucapkannya kepada seseorang yang tidak hanya mengajarkanku ilmu, tetapi juga mengajarkanku tentang kehidupan.",
    "Di SMKN 1 Windusari, Ayah adalah seorang guru bagi murid-murid Ayah. Namun, di rumah, Ayah juga seorang guru bagi anak-anak Ayah.",
    "Bedanya, pelajaran yang kami terima tidak selalu datang dari sebuah buku, papan tulis, ataupun ruang kelas.",
    "Terkadang, pelajaran itu hadir melalui nasihat, tindakan, pengorbanan, bahkan hal-hal sederhana yang mungkin tidak Ayah sadari.",
    "Semakin aku tumbuh dewasa, semakin aku menyadari bahwa ada begitu banyak pelajaran kehidupan yang telah Ayah ajarkan.",
    "Terima kasih sudah menjadi guru pertamaku, bahkan sebelum aku mengenal sekolah.",
    "Terima kasih atas segala pelajaran yang tidak memiliki batas waktu, tidak mengenal kelulusan, dan akan selalu kubawa ke mana pun kehidupan membawaku.",
    "Mungkin aku tidak selalu pandai mengungkapkannya. Mungkin aku juga tidak selalu mengatakannya secara langsung.",
    "But I hope you know how proud I am to be your daughter.",
    "Selamat Hari Guru, Ayah.",
    "Semoga Allah senantiasa menjaga Ayah, memberikan kesehatan, keberkahan dalam setiap langkah, dan menjadikan setiap ilmu serta kebaikan yang Ayah ajarkan sebagai amal jariyah yang tidak pernah terputus.",
    "With love,\nYour daughter."
],
  },
  ending: {
    lines: ['Not every teacher teaches inside a classroom.', 'Some teach us simply by the way they live.'],
    title: 'Happy Teachers’ Day, Ayah.',
    dedication: 'My first teacher.\nMy lifelong teacher.\nMy forever teacher.',
    prayer: 'Semoga Allah selalu menjaga Ayah, sebagaimana Ayah telah menjaga kami.',
    credit: 'Made with love, by your daughter.',
    replay: 'Replay from the beginning',
  },
  music: { src: '/audio/background-music.mp3', volume: 0.35, paperSound: '/audio/paper-opening.mp3' },
} as const
