// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { ExtraErrorData } from '@sentry/integrations';
import { TipiConfig } from '@/server/core/TipiConfig';
import { cleanseErrorData } from '@runtipi/shared/src/helpers/error-helpers';

const { version, allowErrorMonitoring, NODE_ENV } = TipiConfig.getConfig();

if (allowErrorMonitoring && NODE_ENV === 'production') {
  Sentry.init({
    release: version,
    environment: NODE_ENV,
    dsn: 'https://7a73d72f886948478b55621e7b92c3c7@o4504242900238336.ingest.sentry.io/4504826587971584',
    beforeSend: cleanseErrorData,
    integrations: [new ExtraErrorData()],
    initialScope: {
      tags: { version },
    },
  });
}
