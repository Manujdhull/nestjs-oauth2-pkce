# @manujdhull/nestjs-pkce-oauth2

[![npm version](https://img.shields.io/npm/v/@manuj/nestjs-pkce-oauth2.svg)](https://www.npmjs.com/package/@manuj/nestjs-pkce-oauth2)
[![license](https://img.shields.io/npm/l/@manuj/nestjs-pkce-oauth2.svg)](LICENSE)
[![downloads](https://img.shields.io/npm/dm/@manuj/nestjs-pkce-oauth2.svg)](https://www.npmjs.com/package/@manuj/nestjs-pkce-oauth2)

A **NestJS plugin for OAuth 2.0 with PKCE support**, providing decorators, guards, and token/session management to make secure authentication easy — especially with providers like **Google**, **GitHub**, or **Auth0**.

---

## ✨ Features

- 🔐 Built-in support for **PKCE (Proof Key for Code Exchange)**
- ⚙️ Decorators: `@OAuthInitiate()` and `@OAuthCallback()` for easy route integration
- 🛡️ `StateGuard` for CSRF protection during auth flow
- 🧠 `TokenStoreService` abstraction for token persistence
- ✅ Works out of the box with `@nestjs/platform-express`

---

## 📦 Installation

```bash
npm install @manujdhull/nestjs-pkce-oauth2
