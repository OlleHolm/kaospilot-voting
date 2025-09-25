# 🎉 Kaospilot Community Voting System

A beautiful, interactive voting system for the Kaospilot community where students can vote for their favorites in real-time!

## ✨ Features

- **🎯 Interactive Voting**: Vote between two random students
- **🏆 Live Leaderboard**: See rankings update in real-time
- **🎨 Beautiful UI**: Modern, responsive design with animations
- **📱 Mobile Friendly**: Works perfectly on all devices
- **⚡ Real-time Updates**: See votes update instantly across all users
- **🎭 Smooth Animations**: Delightful voting experience with sparkles and effects

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/kaospilot-voting.git
cd kaospilot-voting

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🎮 How to Use

1. **Vote**: Click the "Vote" button on your favorite student
2. **Watch**: See the winner stay and a new challenger appear
3. **Leaderboard**: Check the "Leaderboard" tab to see rankings
4. **Real-time**: All votes update instantly across all users

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: Lucide React
- **Real-time**: Socket.IO (for production)
- **Deployment**: Vercel, Railway, or any Next.js host

## 📁 Project Structure

```
kaospilot-voting/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── page.tsx        # Main page
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── VotingInterface.tsx
│   │   └── Leaderboard.tsx
│   ├── utils/              # Utility functions
│   │   └── studentLoader.ts
│   └── lib/                # Database and API
│       └── database.ts
├── public/
│   └── students/           # Student images
└── README.md
```

## 🎨 Customization

### Adding Students
1. Add images to `public/students/`
2. Update `src/utils/studentLoader.ts` with student data

### Styling
- Colors and themes: `src/app/globals.css`
- Component styles: Individual component files
- Animations: Custom CSS keyframes

### Real-time Features
- Socket.IO integration for live updates
- Database persistence for vote storage
- Real-time leaderboard updates

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Railway
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

### Docker
```bash
docker build -t kaospilot-voting .
docker run -p 3000:3000 kaospilot-voting
```

## 🔧 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📊 Features in Detail

### Voting System
- **Random Pairing**: Always shows two random students
- **Winner Stays**: The voted student remains in their position
- **New Challenger**: Loser gets replaced with a random new student
- **Smooth Animations**: Beautiful transitions and effects

### Leaderboard
- **Top 3 Podium**: Special display for top performers
- **Complete Rankings**: All students ranked by wins
- **Real-time Updates**: Rankings update instantly
- **Mobile Responsive**: Perfect on all screen sizes

### UI/UX
- **Modern Design**: Clean, professional appearance
- **Smooth Animations**: Delightful user experience
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Accessibility**: Keyboard navigation and screen reader support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for the Kaospilot community
- Inspired by modern voting systems and social media apps
- Thanks to all the students who participate in voting!

## 📞 Support

If you have any questions or need help, please open an issue or contact the maintainers.

---

**Happy Voting! 🎉✨**
