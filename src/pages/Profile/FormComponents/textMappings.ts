import { EnergyClass, PriceRange } from '../model';

export const priceRangeLabels = {
    [PriceRange.LOW]: 'Petit budget (moins de 100 000€)',
    [PriceRange.MEDIUM]: 'Budget moyen (entre 100 000€ et 250 000€)',
    [PriceRange.NORMAL]: 'Budget normal (entre 250 000€ et 500 000€)',
    [PriceRange.RICH]: 'Haut budget (entre 500 000€ et 1 000 000€)',
    [PriceRange.VERY_RICH]: 'Très haut budget (plus de 1 000 000€)',
};

export const energyClassLabels = {
    [EnergyClass.E]: 'E',
    [EnergyClass.D]: 'D',
    [EnergyClass.C]: 'C',
    [EnergyClass.B]: 'B',
    [EnergyClass.A]: 'A',
};
