"use client";
import { useEffect } from 'react';

export default function ErrorSuppressor() {
  useEffect(() => {
    // Suppress MetaMask connection errors from extension and Next.js outdated warning
    const originalError = window.onerror;

    const shouldIgnore = (msg: string) => {
      if (!msg) return false;
      const lower = msg.toLowerCase();
      return (
        lower.includes('metamask') ||
        lower.includes('failed to connect') ||
        lower.includes('nkbihfbeogaeaoehlefnkodbefgpgknn') ||
        lower.includes('inpage.js') ||
        lower.includes('chrome-extension') ||
        lower.includes('is outdated') ||
        lower.includes('version staleness') ||
        lower.includes('learn more') && lower.includes('outdated') ||
        lower.includes('connect') && lower.includes('metamask')
      );
    };

    // Wrap ethereum.request to prevent MetaMask errors from bubbling
    try {
      const eth = (window as any).ethereum;
      if (eth && eth.request) {
        const originalRequest = eth.request.bind(eth);
        (window as any).ethereum.request = async (...args: any[]) => {
          try {
            return await originalRequest(...args);
          } catch (err: any) {
            const msg = err?.message || err?.toString() || '';
            if (shouldIgnore(msg)) {
              // Silently ignore MetaMask connection failures
              console.warn('Suppressed MetaMask error:', msg);
              return null;
            }
            throw err;
          }
        };
      }
      // Also wrap provider if exists
      if ((window as any).ethereum?.providers) {
        (window as any).ethereum.providers.forEach((p: any) => {
          if (p.request) {
            const orig = p.request.bind(p);
            p.request = async (...args: any[]) => {
              try {
                return await orig(...args);
              } catch (e: any) {
                if (shouldIgnore(e?.message || '')) return null;
                throw e;
              }
            };
          }
        });
      }
    } catch {}

    window.onerror = function (message, source, lineno, colno, error) {
      if (typeof message === 'string' && shouldIgnore(message)) {
        return true; // prevent default error handling
      }
      if (source && shouldIgnore(source)) {
        return true;
      }
      if (error && error.message && shouldIgnore(error.message)) {
        return true;
      }
      if (originalError) {
        return originalError.call(window, message, source, lineno, colno, error);
      }
      return false;
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const msg = typeof reason === 'string' ? reason : reason?.message || reason?.toString() || '';
      const stack = reason?.stack || '';
      if (shouldIgnore(msg) || shouldIgnore(stack)) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    };

    const handleErrorEvent = (event: ErrorEvent) => {
      const msg = event.message || '';
      const src = (event as any).filename || event.error?.stack || '';
      if (shouldIgnore(msg) || shouldIgnore(src)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    window.addEventListener('unhandledrejection', handleRejection);
    window.addEventListener('error', handleErrorEvent);

    // Also suppress Next.js dev overlay for outdated version
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node: any) => {
          if (node.nodeType === 1) {
            const text = node.textContent || '';
            if (text.includes('is outdated') || text.includes('version-staleness') || text.includes('Failed to connect to MetaMask')) {
              // Hide the Next.js error overlay
              if (node.id?.includes('__nextjs') || node.className?.includes('nextjs') || node.getAttribute?.('data-nextjs-dialog')) {
                node.style.display = 'none';
              }
              // Also check for portal
              const overlay = document.getElementById('__nextjs_original-stack-frame');
              if (overlay) overlay.style.display = 'none';
            }
            // Hide any element containing MetaMask error
            if (text.includes('Failed to connect to MetaMask') || text.includes('nkbihfbeogaeaoehlefnkodbefgpgknn')) {
              if (node.style) node.style.display = 'none';
              // Find parent dialog
              let parent = node.parentElement;
              while (parent) {
                if (parent.getAttribute && parent.getAttribute('data-nextjs-dialog') !== null) {
                  parent.style.display = 'none';
                  break;
                }
                if (parent.id && parent.id.includes('__nextjs')) {
                  parent.style.display = 'none';
                  break;
                }
                parent = parent.parentElement;
              }
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Override console.error for MetaMask and outdated warnings in dev
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      const first = args[0];
      const msg = typeof first === 'string' ? first : first?.message || JSON.stringify(first) || '';
      if (shouldIgnore(msg)) {
        return;
      }
      // Check all args
      const allText = args.map(a => typeof a === 'string' ? a : a?.message || a?.stack || JSON.stringify(a)).join(' ');
      if (shouldIgnore(allText)) {
        return;
      }
      originalConsoleError.apply(console, args);
    };

    return () => {
      window.onerror = originalError;
      window.removeEventListener('unhandledrejection', handleRejection);
      window.removeEventListener('error', handleErrorEvent);
      observer.disconnect();
      console.error = originalConsoleError;
    };
  }, []);

  return null;
}
