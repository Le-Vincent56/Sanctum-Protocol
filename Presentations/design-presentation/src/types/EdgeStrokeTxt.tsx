import {Txt, TxtProps} from '@motion-canvas/2d/lib/components';
import {initial, signal} from '@motion-canvas/2d/lib/decorators';
import {SignalValue, SimpleSignal} from '@motion-canvas/core/lib/signals';
import {PossibleColor} from '@motion-canvas/core/lib/types';

export interface EdgeStrokeTxtProps extends TxtProps {
    leftEdgeColor?: SignalValue<PossibleColor>;
    rightEdgeColor?: SignalValue<PossibleColor>;
    edgeOffset?: SignalValue<number>;
}

export class EdgeStrokeTxt extends Txt {
    @initial('#00ffff')
    @signal()
    public declare readonly leftEdgeColor: SimpleSignal<PossibleColor, this>;

    @initial('#ff00ff')
    @signal()
    public declare readonly rightEdgeColor: SimpleSignal<PossibleColor, this>;

    @initial(6)
    @signal()
    public declare readonly edgeOffset: SimpleSignal<number, this>;

    public constructor(props?: EdgeStrokeTxtProps) {
        super(props);
    }

    public override render(context: CanvasRenderingContext2D): void {
        const edgeOffset = this.edgeOffset();

        // Draw left edge
        context.save();
        context.translate(-edgeOffset, 0);
        this.drawColoredText(context, this.leftEdgeColor());
        context.restore();

        // Draw right edge
        context.save();
        context.translate(edgeOffset, 0);
        this.drawColoredText(context, this.rightEdgeColor());
        context.restore();

        // Draw main text on top
        super.render(context);
    }

    private drawColoredText(context: CanvasRenderingContext2D, color: PossibleColor): void {
        // Store the current fill
        const originalFill = this.fill();

        // Temporarily set the fill to our edge color
        this.fill(color);

        // Use the parent's render method to draw with all correct properties
        super.render(context);

        // Restore the original fill
        this.fill(originalFill);
    }
}