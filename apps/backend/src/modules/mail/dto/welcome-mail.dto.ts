import { IsString, Matches } from 'class-validator';

export class WelcomeMailDto {
  @IsString()
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]{2,})+$/, {
    message:
      'Full name must contain at least two words, each with at least 2 letters (e.g., "Jan Kowalski")',
  })
  fullName!: string;
}
