// Update plugins in chartjs
import { ChartType, Plugin, registry } from 'chart.js';
declare module 'chart.js' {
    interface PluginOptionsByType<TType extends ChartType> {
        doughnutTextCenter?: {
            centerText?: string;
        };
    }
}
