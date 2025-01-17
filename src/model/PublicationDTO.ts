export class PublicationDTO {
    constructor(
      public type: string,
      public titre: string,
      public lien: string,
      public date: Date,
      public sourcepdf: string
    ) {}
  }