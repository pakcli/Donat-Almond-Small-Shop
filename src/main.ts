// main.ts
// Entry point for Sweet Crumb website

import './styles/main.scss';
import { initFirebaseLoader } from './firebase-loader';

// Initialize Firebase loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('[Sweet Crumb] Initializing...');
  initFirebaseLoader();
});
