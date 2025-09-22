import {
    all,
    Direction,
    easeInCubic,
    easeOutCubic,
    ThreadGenerator,
    useScene,
    useTransition,
    Vector2,
    createSignal,
    easeInOutCubic, useLogger, waitFor, easeInQuad, easeInExpo,
} from "@motion-canvas/core";

export function* slideInCubicTransition(
    direction: Direction = Direction.Top,
    duration = 0.6,
): ThreadGenerator {
    const size = useScene().getRealSize();
    const position = size.getOriginOffset(direction).scale(2);
    const previousPosition = Vector2.createSignal();
    const currentPosition = Vector2.createSignal(position);

    // set up the transition
    const endTransition = useTransition(
        // modify the context of the current scene
        ctx => ctx.translate(currentPosition.x(), currentPosition.y()),
        // modify the context of the previous scene
        ctx => ctx.translate(previousPosition.x(), previousPosition.y()),
    );

    // perform animations
    yield* all(
        previousPosition(position.scale(-1), duration, easeInCubic),
        currentPosition(Vector2.zero, duration, easeInCubic),
    );

    // finish the transition
    endTransition();
}

export function* slideOutCubicTransition(
    direction: Direction = Direction.Top,
    duration = 0.6,
): ThreadGenerator {
    const size = useScene().getRealSize();
    const position = size.getOriginOffset(direction).scale(2);
    const previousPosition = Vector2.createSignal();
    const currentPosition = Vector2.createSignal(position);

    // set up the transition
    const endTransition = useTransition(
        // modify the context of the current scene
        ctx => ctx.translate(currentPosition.x(), currentPosition.y()),
        // modify the context of the previous scene
        ctx => ctx.translate(previousPosition.x(), previousPosition.y()),
    );

    // perform animations
    yield* all(
        previousPosition(position.scale(-1), duration, easeOutCubic),
        currentPosition(Vector2.zero, duration, easeOutCubic),
    );

    // finish the transition
    endTransition();
}

export function* threeBarsRevealTransition(duration = 1, barCount = 10, originalScale = 0.25): ThreadGenerator {
    const scene      = useScene();
    const { width, height } = scene.getRealSize();
    const halfH      = height / 2;
    const barWidth   = width / barCount;

    const slideY     = createSignal(-halfH);
    const barScales  = Array.from({ length: barCount }, () => createSignal(originalScale));

    const endTransition = useTransition(
        ctx => {
            ctx.save();
            ctx.beginPath();
            for (let i = 0; i < barCount; i++) {
                const scale       = barScales[i]();
                const scaledWidth = barWidth * scale;
                const barOffsetX  = i * barWidth;
                const x           = barOffsetX + (barWidth - scaledWidth) / 2;
                const y           = slideY() - height;
                ctx.rect(x, y, scaledWidth, height * 1.5);
            }
            ctx.clip();
            return () => ctx.restore();
        },
        () => {}
    );

    yield* slideY(halfH, duration * 0.5, easeInExpo);
    yield* waitFor(duration * 0.25);
    yield* all(...barScales.map(s => s(1, duration * 0.25, easeInOutCubic)));
    endTransition();
}

export function* circleTransition(duration = 1, pos = new Vector2(0, 0)) : ThreadGenerator {
    const width = useScene().getRealSize().width;
    const radius = createSignal(0);
    
    const endTransition = useTransition(
      ctx => {
          ctx.save();
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, radius(), 0, Math.PI * 2);
          ctx.clip();
          return () => ctx.restore();
      }, 
      () => { }
    );
    
    yield* radius(width * 2, duration);
    
    endTransition();
}

export function* sliceTransition() : ThreadGenerator {
    const fullWidth = useScene().getRealSize().width;
    const fullHeight = useScene().getRealSize().height;
    const left = 0;
    const center = fullHeight / 2;
    const width = createSignal(0);
    const height = createSignal(10);
    
    const endTransition = useTransition(
        ctx => {
            ctx.save();
            ctx.beginPath();
            ctx.rect(left, center - height() / 2, width(), height());
            ctx.clip();
            return () => ctx.restore();
        },
        () => { }
    );
    
    yield* width(fullWidth, 0.15);
    yield* waitFor(0.5);
    yield* height(fullHeight, 0.5, easeInCubic);

    endTransition();
}