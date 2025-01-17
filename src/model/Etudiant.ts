import { EnseignantChercheur } from "./EnseignantChercheur";

export interface Etudiant {
    cin: string;
    nom: string;
    prenom: string;
    dateNaissance: Date;
    cv: string;
    email: string;
    password: string;
    dateInscription: Date;
    sujet: string;
    diplome: string;
    encadrant: EnseignantChercheur;
  }

