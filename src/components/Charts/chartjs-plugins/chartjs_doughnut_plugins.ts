import { DoughnutController, Plugin } from 'chart.js';

export const textCenterPlugin: Plugin<'doughnut'> = {
    id: 'doughnutTextCenter',
    beforeDraw: function (chart, args, options) {
        // Modified version of this answer https://stackoverflow.com/a/43026361
        // Adapted to work with charjs 4.2

        const controller = chart.getSortedVisibleDatasetMetas()[0]
            .controller as DoughnutController;

        // Get ctx from string
        const ctx = chart.ctx;
        const minFontSize = 25;
        const maxFontSize = 75;
        const sidePadding = 20;
        const sidePaddingCalculated =
            (sidePadding / 100) * (controller.innerRadius * 2);
        // Start with a base font of 30px
        ctx.font = '30px em sans-serif';

        const txt = options.centerText;
        // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        const stringWidth = ctx.measureText(txt).width;
        const elementWidth = controller.innerRadius * 2 - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        const widthRatio = elementWidth / stringWidth;
        const newFontSize = Math.floor(30 * widthRatio);
        const elementHeight = controller.innerRadius * 2;

        // Pick a new font size so it will not be larger than the height of label.
        let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
        const lineHeight = 25;
        let wrapText = false;

        if (minFontSize && fontSizeToUse < minFontSize) {
            fontSizeToUse = minFontSize;
            wrapText = true;
        }

        // Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        let centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        ctx.font = fontSizeToUse + 'px sans-serif';
        // ctx.fillStyle = color;

        if (!wrapText) {
            ctx.fillText(txt, centerX, centerY);
            return;
        }

        const words = txt.split(' ');
        let line = '';
        const lines = [];

        // Break words up into multiple lines if necessary
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > elementWidth && n > 0) {
                lines.push(line);
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }

        // Move the center up depending on line height and number of lines
        centerY -= (lines.length / 2) * lineHeight;

        for (let n = 0; n < lines.length; n++) {
            ctx.fillText(lines[n], centerX, centerY);
            centerY += lineHeight;
        }
        //Draw text in center
        ctx.fillText(line, centerX, centerY);
    },
    defaults: {
        centerText: 'Placeholder',
    },
};
