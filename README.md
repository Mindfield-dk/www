# Mindfield Portfolio

A modern portfolio website showcasing open source projects from Mindfield and contributors. Built with Nuxt 4 and Nuxt UI, featuring a beautiful card-based layout with dark mode support.

## 🌟 Features

- **GitHub Integration** - Automatically fetches and displays repositories from GitHub organizations and users
- **Modern UI** - Built with Nuxt UI v4 and Tailwind CSS for a sleek, professional appearance
- **Dark Mode** - Full dark mode support with seamless color mode switching
- **Responsive Design** - Mobile-first responsive grid layout (1/2/3 columns)
- **Frosted Glass Effect** - Semi-transparent cards with backdrop blur for enhanced readability
- **Server-Side Rendering** - SSR enabled for optimal SEO and performance
- **Cloudflare Pages** - Optimized for deployment on Cloudflare Pages

## 🚀 Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com/) - The Intuitive Vue Framework
- **UI Library:** [Nuxt UI v4](https://ui.nuxt.com/) - Fully styled and customizable components
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Icons:** [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons
- **API Integration:** 
  - [Octokit](https://github.com/octokit/rest.js) - GitHub REST API client
  - [Sanity](https://www.sanity.io/) - Headless CMS (optional)
  - [Unsplash](https://unsplash.com/developers) - Photo API (optional)
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/)
- **Development:** TypeScript, ESLint, Gitpod

## 📋 Prerequisites

- Node.js 18+ or 20+
- npm (comes with Node.js)
- GitHub Personal Access Token (for fetching repositories)

## 🛠️ Setup

1. **Clone the repository**

```bash
git clone https://github.com/Mindfield-dk/www.git
cd www
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
GITHUB_TOKEN=your_github_personal_access_token
UNSPLASH_ACCESS_KEY=your_unsplash_access_key (optional)
```

To get a GitHub token:
- Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
- Generate a new token with `public_repo` scope
- Copy the token to your `.env` file

## 💻 Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

The application will automatically:
- Fetch repositories from the configured GitHub organization (`Mindfield-dk`)
- Fetch repositories from the configured user (`localgod`)
- Filter out archived repositories and those tagged with `personal`
- Sort repositories by creation date (newest first)

## 🏗️ Build

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## 📦 Deployment

This project is configured for deployment on Cloudflare Pages:

1. Connect your GitHub repository to Cloudflare Pages
2. Set the build command: `npm run build`
3. Set the build output directory: `dist`
4. Add environment variables in Cloudflare Pages settings:
   - `GITHUB_TOKEN`
   - `UNSPLASH_ACCESS_KEY` (if used)

The `nitro.preset` is set to `cloudflare_pages` in `nuxt.config.ts`.

## 🎨 Customization

### Changing Data Sources

Edit `server/api/github/repos.ts` to modify:
- GitHub organization: Change `'Mindfield-dk'` to your organization
- GitHub user: Change `'localgod'` to your username
- Filtering logic: Modify the filter function to include/exclude repositories

### Styling

- **Colors:** Modify Nuxt UI theme in `nuxt.config.ts` or use Tailwind classes
- **Background:** Update the background image URL in `app/assets/css/main.css`
- **Layout:** Adjust grid columns in `app/pages/index.vue`

### Components

- **Navigation:** `app/components/MainNavigation.vue`
- **Main Page:** `app/pages/index.vue`
- **Person List:** `app/components/PersonList.vue` (currently unused)

## 🧪 Linting

Run ESLint to check code quality:

```bash
npm run lint
```

Auto-fix linting issues:

```bash
npm run lintfix
```

## 📁 Project Structure

```
.
├── app/
│   ├── app.vue              # Root Vue component
│   ├── assets/              # CSS and static assets
│   ├── components/          # Vue components
│   │   ├── MainNavigation.vue
│   │   └── PersonList.vue
│   └── pages/               # File-based routing
│       └── index.vue        # Home page
├── server/
│   └── api/                 # API endpoints
│       ├── github/          # GitHub API integration
│       │   ├── repos.ts     # Fetch repositories
│       │   └── Repository.ts
│       ├── photos.ts        # Unsplash integration
│       └── sanity/          # Sanity CMS integration
├── public/                  # Static files
├── nuxt.config.ts          # Nuxt configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🔧 Configuration

Key configuration in `nuxt.config.ts`:

- **Modules:** `@nuxt/eslint`, `@nuxt/ui`
- **SSR:** Enabled
- **Deployment:** Cloudflare Pages preset
- **Dev Server:** Configured for Gitpod preview URLs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- [Nuxt Team](https://nuxt.com/) for the amazing framework
- [Nuxt UI Team](https://ui.nuxt.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Heroicons](https://heroicons.com/) for the icon set

## 📞 Contact

- **Organization:** [Mindfield](https://github.com/Mindfield-dk)
- **Website:** [mindfield.dk](https://mindfield.dk)

---

Built with ❤️ using Nuxt 4 and Nuxt UI
