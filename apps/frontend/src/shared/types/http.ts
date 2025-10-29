import { z } from 'zod';

export const HttpStatusSchema = z.union([
  z.literal(200), // OK
  z.literal(201), // Created
  z.literal(204), // No Content
  z.literal(400), // Bad Request
  z.literal(401), // Unauthorized
  z.literal(403), // Forbidden
  z.literal(404), // Not Found
  z.literal(409), // Conflict
  z.literal(422), // Unprocessable Entity
  z.literal(429), // Too Many Requests
  z.literal(500), // Internal Server Error
]);

export type HttpStatus = z.infer<typeof HttpStatusSchema>;
