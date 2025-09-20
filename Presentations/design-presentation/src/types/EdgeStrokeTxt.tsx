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

    @initial(4)
    @signal()
    public declare readonly edgeOffset: SimpleSignal<number, this>;

    public constructor(props?: EdgeStrokeTxtProps) {
        super(props);
    }

    protected override drawShape(context: CanvasRenderingContext2D) {
        const edgeOffset = this.edgeOffset();

        // Store original fill value
        const originalFill = this.fill();

        // Draw left colored edge
        this.fill(this.leftEdgeColor());
        context.save();
        context.translate(-edgeOffset, 0);
        super.drawShape(context);
        context.restore();

        // Draw right colored edge
        this.fill(this.rightEdgeColor());
        context.save();
        context.translate(edgeOffset, 0);
        super.drawShape(context);
        context.restore();

        // Restore original fill and draw main text
        this.fill(originalFill);
        super.drawShape(context);
    }
}

// Example usage in a scene:
/*
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {createRef} from '@motion-canvas/core/lib/utils';
import {EdgeStrokeTxt} from './EdgeStrokeTxt';

export default makeScene2D(function* (view) {
  const textRef = createRef<EdgeStrokeTxt>();
  
  view.add(
    <EdgeStrokeTxt
      ref={textRef}
      text="EDGE"
      fontSize={200}
      fontWeight={900}
      fill={'#ffffff'}           // White text
      leftEdgeColor={'#00ffff'}  // Cyan left edge
      rightEdgeColor={'#ff00ff'} // Magenta right edge
      edgeOffset={6}              // Offset distance
    />
  );

  // Animate the offset for a glitch effect
  yield* textRef().edgeOffset(10, 0.5);
  yield* textRef().edgeOffset(4, 0.5);
  
  // Or animate colors
  yield* textRef().leftEdgeColor('#00ff00', 2);
  yield* textRef().rightEdgeColor('#ffff00', 2);
});
*/