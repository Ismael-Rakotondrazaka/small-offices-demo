# Nuxt Fusion

The complete solution for secure, high-performance, feature-rich web apps, powered by Nuxt.

Look at the [Nuxt Fusion Documentation](https://github.com/Ismael-Rakotondrazaka/nuxt-fusion) to learn more.

## Key Features

| Icon                                                                                 | Name                         | Description                                                                            |
| ------------------------------------------------------------------------------------ | ---------------------------- | -------------------------------------------------------------------------------------- |
| ![Shield Key](https://api.iconify.design/mdi:shield-key.svg)                         | Secure Authentication        | Seamless authentication with multiple providers, powered by @sidebase/nuxt-auth.       |
| ![Translate](https://api.iconify.design/mdi:translate.svg)                           | Internationalization         | Create a multilingual web app with @nuxtjs/i18n, including translated error messages.  |
| ![Theme Light Dark](https://api.iconify.design/mdi:theme-light-dark.svg)             | Dark/Light Mode              | Switch effortlessly between dark and light modes.                                      |
| ![Search Web](https://api.iconify.design/mdi:search-web.svg)                         | SEO Optimization             | Enhance your site's SEO effortlessly with @nuxtjs/seo.                                 |
| ![Rocket](https://api.iconify.design/mdi:rocket.svg)                                 | Performance Optimization     | Optimize code, images, and fonts for better performance.                               |
| ![Google Analytics](https://api.iconify.design/mdi:google-analytics.svg)             | Google Analytics Integration | Integrate Google Analytics for comprehensive site metrics.                             |
| ![View Dashboard Outline](https://api.iconify.design/mdi:view-dashboard-outline.svg) | Rich Components              | Utilize a wide array of components with Naive UI for a sleek and functional interface. |
| ![Image Filter](https://api.iconify.design/mdi:image-filter.svg)                     | Extensive Icon Library       | Access over 100,000 icons with Iconify integration.                                    |
| ![Store](https://api.iconify.design/mdi:store.svg)                                   | State Management             | Manage application state efficiently with Pinia.                                       |
| ![File Upload](https://api.iconify.design/mdi:file-upload.svg)                       | File Upload                  | Customize and manage file uploads with multiple providers.                             |
| ![Email](https://api.iconify.design/mdi:email.svg)                                   | Email Sending                | Send emails seamlessly using nodemailer.                                               |
| ![Database Sync](https://api.iconify.design/mdi:database-sync.svg)                   | Database ORM                 | Simplify data fetching and management with Prisma.                                     |
| ![Code Tags](https://api.iconify.design/mdi:code-tags.svg)                           | Typesafe APIs                | Ensure end-to-end type safety with robust validation using zod.                        |
| ![Alert](https://api.iconify.design/mdi:alert.svg)                                   | Error Handling               | Efficient error management with multilingual messages.                                 |
| ![Folder Star](https://api.iconify.design/mdi:folder-star.svg)                       | Well-Structured Project      | Best practice + Nuxt 4 directory structure ready.                                      |
| ![Test Tube](https://api.iconify.design/mdi:test-tube.svg)                           | Automated Testing            | Ensure code reliability with integrated testing frameworks.                            |

## Work in progress

| Icon                                                                       | Name                     | Description                                                                   |
| -------------------------------------------------------------------------- | ------------------------ | ----------------------------------------------------------------------------- |
| ![Credit Card Check](https://api.iconify.design/mdi:credit-card-check.svg) | Stripe Integration       | Integrate Stripe for payment processing and management.                       |
| ![Analytics](https://api.iconify.design/mdi:chart-line.svg)                | User Analytics Dashboard | Implement a dashboard for tracking user behavior and application performance. |

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## Techs

### Backend

| Name                                                                         | Description                                                 |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [Prisma](https://www.prisma.io)                                              | Next-generation ORM for Node.js & TypeScript.               |
| [@google-cloud/storage](https://www.npmjs.com/package/@google-cloud/storage) | Node.js client for Google Cloud Storage.                    |
| [nodemailer](https://nodemailer.com)                                         | Send e-mails with Node.JS.                                  |
| [@sidebase/auth](https://sidebase.io)                                        | Authentication module for Nuxt 3.                           |
| [zod](https://zod.dev)                                                       | TypeScript-first schema declaration and validation library. |

### Frontend

| Name                                                | Description                                                         |
| --------------------------------------------------- | ------------------------------------------------------------------- |
| [Nuxt 3](https://nuxt.com)                          | The Intuitive Vue Framework.                                        |
| [Naive UI](https://www.naiveui.com)                 | A Vue 3 Component Library.                                          |
| [TailwindCSS](https://tailwindcss.com)              | A utility-first CSS framework for rapid UI development.             |
| [Pinia](https://pinia.vuejs.org)                    | The intuitive store for Vue.                                        |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)             | Nuxt internationalization module.                                   |
| [@nuxt/image](https://image.nuxtjs.org)             | Optimized images module for Nuxt.                                   |
| [@nuxtjs/color-mode](https://color-mode.nuxtjs.org) | Dark and Light mode with auto detection made easy with Nuxt.        |
| [@nuxt/fonts](https://nuxt.com/modules/fonts)       | Font management module for Nuxt.                                    |
| [@nuxt/icon](https://nuxt.com/modules/icon)         | Icon module for Nuxt with 100,000+ ready to use icons from Iconify. |
| [@nuxtjs/seo](https://nuxtseo.com/)                 | SEO module for Nuxt.                                                |
| [nuxt-gtag](https://nuxt.com/modules/gtag)          | Google Analytics module for Nuxt.                                   |

### DX (Developer Experience)

| Name                                                                                 | Description                                            |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| [ESLint](https://eslint.org)                                                         | Find and fix problems in your JavaScript code.         |
| [winston](https://github.com/winstonjs/winston)                                      | A logger for just about everything.                    |
| [winston-daily-rotate-file](https://www.npmjs.com/package/winston-daily-rotate-file) | A transport for winston which logs to a rotating file. |

### Utilities

| Name                                                                          | Description                                                                        |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [@vueuse/nuxt](https://vueuse.org)                                            | VueUse integration for Nuxt.                                                       |
| [@vee-validate/nuxt](https://vee-validate.logaretm.com/v4/integrations/nuxt/) | Form validation for Nuxt.                                                          |
| [@faker-js/faker](https://fakerjs.dev)                                        | Generate massive amounts of fake data in Node.js and the browser.                  |
| [zod-form-data](https://www.npmjs.com/package/zod-form-data)                  | Validation helpers for zod specifically for parsing FormData or URLSearchParams.   |
| [mime](https://www.npmjs.com/package/mime)                                    | An API for MIME type information.                                                  |
| [http-status-codes](https://www.npmjs.com/package/http-status-codes)          | Constants enumerating the HTTP status codes.                                       |
| [ufo](https://www.npmjs.com/package/ufo)                                      | URL utils for humans.                                                              |
| [xss](https://www.npmjs.com/package/xss)                                      | Sanitize untrusted HTML to prevent XSS.                                            |
| [html-minifier-terser](https://www.npmjs.com/package/html-minifier-terser)    | Highly configurable, well-tested, JavaScript-based HTML minifier.                  |
| [mustache](https://www.npmjs.com/package/mustache)                            | Logic-less {{mustache}} templates with JavaScript.                                 |
| [@nuxt/test-utils](https://www.npmjs.com/package/@nuxt/test-utils)            | Test utilities for Nuxt.                                                           |
| [@vitest/coverage-v8](https://www.npmjs.com/package/@vitest/coverage-v8)      | V8 coverage provider for Vitest.                                                   |
| [@vitest/ui](https://www.npmjs.com/package/@vitest/ui)                        | UI for Vitest.                                                                     |
| [happy-dom](https://www.npmjs.com/package/happy-dom)                          | A JavaScript implementation of a web browser without its graphical user interface. |
| [playwright-core](https://www.npmjs.com/package/playwright-core)              | A high level API to automate web browsers.                                         |
| [vitest](https://www.npmjs.com/package/vitest)                                | Next generation testing framework powered by Vite.                                 |
