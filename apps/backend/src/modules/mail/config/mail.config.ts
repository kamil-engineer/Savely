export const MAIL_CONTENT = {
  general: {
    appName: 'Savely',
    tagline: 'Your Digital Bookmark Manager',
    year: new Date().getFullYear(),
    footer: {
      copyright: 'All rights reserved.',
      message: 'Made with ❤️ for bookmark enthusiasts everywhere',
      receivingReason: "You're receiving this email because you signed up for",
    },
    social: {
      github: 'https://github.com/kamil-engineer/Savely',
      linkedin: 'https://www.linkedin.com/in/naskret-kamil/',
    },
  },

  welcome: {
    subject: 'Welcome to Savely 🎉',
    subtitle:
      "We're thrilled to have you join our community of smart organizers. Your journey to better bookmark management starts now!",
    features: [
      {
        icon: '⚡',
        title: 'Quick Save',
        description:
          'Save bookmarks instantly from any device with our browser extension or mobile app.',
      },
      {
        icon: '🏷️',
        title: 'Smart Organization',
        description:
          'Organize your bookmarks with tags, folders, and intelligent search capabilities.',
      },
      {
        icon: '🔄',
        title: 'Sync Everywhere',
        description: 'Access your bookmarks seamlessly across all your devices, anytime, anywhere.',
      },
    ],
    help: {
      url: 'https://github.com/kamil-engineer/Savely',
      title: 'Need Help Getting Started?',
      description: 'Check out our quick start guide or reach out to our support team.',
    },
  },
} as const;
