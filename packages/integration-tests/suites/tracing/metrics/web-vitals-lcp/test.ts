import { expect, Route } from '@playwright/test';

import { sentryTest } from '../../../../utils/fixtures';
import { getSentryTransactionRequest } from '../../../../utils/helpers';

sentryTest('should capture a LCP vital with element details.', async ({ browserName, getLocalTestPath, page }) => {
  if (browserName !== 'chromium') {
    sentryTest.skip();
  }

  await page.route('**/path/to/image.png', (route: Route) =>
    route.fulfill({ path: `${__dirname}/assets/sentry-logo-600x179.png` }),
  );

  const url = await getLocalTestPath({ testDir: __dirname });
  page.goto(url);

  // Force closure of LCP listener.
  page.click('body');
  const eventData = await getSentryTransactionRequest(page);

  expect(eventData.measurements).toBeDefined();
  expect(eventData.measurements?.lcp?.value).toBeDefined();
  expect(eventData.measurements?.['mark.lcp']?.value).toBeDefined();

  expect(eventData.tags?.['lcp.element']).toBe('body > img');
  expect(eventData.tags?.['lcp.size']).toBe(107400);
  expect(eventData.tags?.['lcp.url']).toBe('https://example.com/path/to/image.png');
});
