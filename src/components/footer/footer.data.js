import discord from 'assets/images/icons/discord.png';
import twitter from 'assets/images/icons/twitter.png';
import instagram from 'assets/images/icons/instagram.png';
// import dribbble from 'assets/images/icons/dribbble.png';

export const menuItems = [
  {
    id: 2,
    title: 'Discord',
    items: [
      {
        path: 'https://discord.gg/4SsWtjBW',
        icon: discord,
        label: 'Discord',
      },
    ],
  },
  {
    id: 3,
    title: 'Twitter',
    items: [
      {
        path: 'https://twitter.com/CryptoBones_',
        icon: twitter,
        label: 'Twitter',
      },
    ],
  },
  {
    id: 4,
    title: 'Instragram',
    items: [
      {
        path: 'https://www.instagram.com/cryptobones__/',
        icon: instagram,
        label: 'Instagram',
      },
    ],
  }
];

export const footerNav = [
  {
    path: '#!',
    label: 'Home',
  },
  {
    path: '#!',
    label: 'Advertise',
  },
  {
    path: '#!',
    label: 'Supports',
  },
  {
    path: '#!',
    label: 'Marketing',
  },
  {
    path: '#!',
    label: 'FAQ',
  },
];
