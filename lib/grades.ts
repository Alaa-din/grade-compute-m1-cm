export interface Module {
  id: string;
  name: string;
  coefficient: number;
  credits: number;
  type: 'mixed' | 'ca_only' | 'exam_only'; // mixed = 40% CA, 60% Exam
}

export const MODULES_S1: Module[] = [
  {
    id: 'mmc',
    name: 'Mécanique des milieux continus',
    coefficient: 3,
    credits: 6,
    type: 'mixed',
  },
  {
    id: 'rma',
    name: 'Résistance des matériaux Avancée',
    coefficient: 2,
    credits: 4,
    type: 'mixed',
  },
  {
    id: 'mci',
    name: 'Moteurs à combustion interne',
    coefficient: 2,
    credits: 4,
    type: 'mixed',
  },
  {
    id: 'mfa',
    name: 'Mécanique des fluides appliquée',
    coefficient: 2,
    credits: 4,
    type: 'mixed',
  },
  {
    id: 'tp_mdf_rdm',
    name: 'TP MDF/RDM',
    coefficient: 1,
    credits: 2,
    type: 'ca_only',
  },
  {
    id: 'tech_fab',
    name: 'Techniques de fabrication',
    coefficient: 2,
    credits: 4,
    type: 'mixed',
  },
  {
    id: 'asi',
    name: 'Automatisation des systèmes industriels',
    coefficient: 2,
    credits: 3,
    type: 'mixed',
  },
  {
    id: 'prog_py',
    name: 'Programmation avancée python',
    coefficient: 2,
    credits: 2,
    type: 'mixed',
  },
  {
    id: 'etat_surf',
    name: 'Etat de surface',
    coefficient: 1,
    credits: 1,
    type: 'exam_only',
  },
];

export const MODULES_S2: Module[] = [
  {
    id: 'mef',
    name: 'Méthode des éléments finis',
    coefficient: 3,
    credits: 6,
    type: 'mixed',
  },
  {
    id: 'csm',
    name: 'Conception de systèmes mécanique',
    coefficient: 2,
    credits: 4,
    type: 'mixed',
  },
  {
    id: 'opt',
    name: 'Optimisation',
    coefficient: 2,
    credits: 4,
    type: 'mixed',
  },
  {
    id: 'tp_mef',
    name: 'Travaux Pratique Méthode des éléments finis',
    coefficient: 1,
    credits: 2,
    type: 'ca_only',
  },
  {
    id: 'cfao',
    name: 'Conception et Fabrication Assisté par Ordinateur',
    coefficient: 2,
    credits: 4,
    type: 'mixed',
  },
  {
    id: 'ia',
    name: 'Eléments d\'IA appliquée',
    coefficient: 2,
    credits: 4,
    type: 'mixed',
  },
  {
    id: 'ethique',
    name: 'Respect des normes et règles d\'éthique',
    coefficient: 1,
    credits: 2,
    type: 'exam_only',
  },
  {
    id: 'smar',
    name: 'Systèmes mécaniques articulés et robotique',
    coefficient: 2,
    credits: 4,
    type: 'mixed',
  },
  {
    id: 'dsa',
    name: 'Dynamique des structures avancée',
    coefficient: 2,
    credits: 4,
    type: 'mixed',
  },
];

export const ALL_MODULES = [...MODULES_S1, ...MODULES_S2];

export const TOTAL_COEFFICIENTS_S1 = 17;
export const TOTAL_CREDITS_S1 = 30;

export const TOTAL_COEFFICIENTS_S2 = 17;
export const TOTAL_CREDITS_S2 = 30;

export function calculateModuleAverage(moduleId: string, ca: number | undefined, exam: number | undefined): number {
  const module = ALL_MODULES.find((m) => m.id === moduleId);
  if (!module) return 0;

  const caScore = ca || 0;
  const examScore = exam || 0;

  switch (module.type) {
    case 'ca_only':
      return caScore;
    case 'exam_only':
      return examScore;
    case 'mixed':
      return (caScore * 0.4) + (examScore * 0.6);
    default:
      return 0;
  }
}
