export class Publication {
    id: number;
    type: string;
    titre: string;
    lien: string;
    date: Date;
    sourcepdf: string;
  
    constructor(id: number, type: string, titre: string, lien: string, date: Date, sourcepdf: string) {
      this.id = id;
      this.type = type;
      this.titre = titre;
      this.lien = lien;
      this.date = date;
      this.sourcepdf = sourcepdf;
    }
  }