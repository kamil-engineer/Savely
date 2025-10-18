import { INestApplication, Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { EnvService } from '../../modules/config/env.service';
import { LoggerService } from '../logger/logger.service';
import { SWAGGER_CONSTANTS } from './swagger.constants';

@Injectable()
export class SwaggerSetupService {
  constructor(
    private readonly envService: EnvService,
    private readonly logger: LoggerService,
  ) {}

  setup(app: INestApplication) {
    const isProd = this.envService.get('NODE_ENV') === 'production';

    const config = new DocumentBuilder()
      .setTitle(SWAGGER_CONSTANTS.title)
      .setDescription(SWAGGER_CONSTANTS.description)
      .setContact(
        'Savely Dev Team',
        'https://savely-frontend.vercel.app/',
        'mathey.academy@gmail.com',
      )
      .setLicense('MIT', 'https://opensource.org/licenses/MIT')
      .setVersion(SWAGGER_CONSTANTS.version)
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    if (isProd) {
      this.logger.warn('🚫 Swagger docs disabled in production');
      return;
    }

    SwaggerModule.setup('docs', app, document, {
      explorer: true,
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        tryItOutEnabled: true,
        docExpansion: 'list',
        syntaxHighlight: {
          activate: true,
          theme: 'monokai',
        },
        defaultModelsExpandDepth: 1,
      },
      customSiteTitle: `Savely API Docs v${SWAGGER_CONSTANTS.version}`,
      customfavIcon: 'https://swagger.io/img/favicon-32x32.png',
      customCss: `
        .swagger-ui .topbar { display: none }
        body { background-color: #111827; color: #f9fafb; }
        .opblock-summary-method { text-transform: uppercase; font-weight: bold; }
      `,
    });
  }
}
