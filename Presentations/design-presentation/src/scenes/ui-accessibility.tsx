import {makeScene2D, Rect, Img, Circle, Txt} from "@motion-canvas/2d"
import {
    all,
    beginSlide,
    chain,
    createRef,
    delay,
    easeInSine, easeOutBack,
    easeOutSine,
    makeRef, sequence,
    useScene,
} from "@motion-canvas/core"
import { EdgeStrokeTxt } from "../types/EdgeStrokeTxt";

import background from '../img/art-background.jpg';

export default makeScene2D(function* (view) {
    const wrapper = createRef<Rect>();
    const backgroundOverlay = createRef<Rect>();
    const newBackground = createRef<Img>();
    const topText = createRef<EdgeStrokeTxt>();
    const bottomText = createRef<EdgeStrokeTxt>();
    const subHeader = createRef<EdgeStrokeTxt>();

    // Container refs for each section
    const gameplayGroup = createRef<Rect>();
    const controlsGroup = createRef<Rect>();
    const audioGroup = createRef<Rect>();
    const visualGroup = createRef<Rect>();

    const gameplayBullets: Circle[] = [];
    const gameplayTexts: Txt[] = [];
    const controlsBullets: Circle[] = [];
    const controlsTexts: Txt[] = [];
    const audioBullets: Circle[] = [];
    const audioTexts: Txt[] = [];
    const visualBullets: Circle[] = [];
    const visualTexts: Txt[] = [];

    const VERY_DARK = '#000000';
    const DARK = useScene().variables.get('dark', '#1c1c1c');
    const VERDIGRIS = useScene().variables.get('verdigris', '#43b3ae');
    const PINK = useScene().variables.get('pink', '#ec008c');
    const LIGHT = useScene().variables.get('light', '#eeeeee');

    const bulletSize = 25;
    const lineHeight = 100;
    const startY = -100;
    const bulletX = -400;
    const textOffset = 50;
    const textStartX = bulletX + textOffset;

    const headerProps = {
        fontFamily: 'Bokor',
        fontStyle: 'normal',
        fontSize: 200,
        leftEdgeColor: VERDIGRIS,
        rightEdgeColor: PINK,
        fill: LIGHT,
        edgeOffset: 2
    }

    const bulletPoint = {
        size: 0,
        fill: LIGHT
    }

    const bulletText = {
        fontFamily: 'Geo',
        fontWeight: 400,
        fontSize: 50,
        fill: LIGHT,
        textWrap: true,
        width: 800,
        textAlign: 'left' as const,
    }

    const gameplayContent = [
        'Difficulty levels',
        'Interactive tutorial',
        'Alternatives to holding down buttons',
    ];

    const controlsContent = [
        'Rebinding',
        'Support multiple devices',
        'Click and drag alternative',
    ];

    const audioContent = [
        'Different volume sliders',
        'Distinct sound and music choices',
    ];

    const visualContent = [
        'Resizable font',
        'Customizable text color',
        'Toggle flickering images',
    ];

    view.add(
        <Rect ref={wrapper} width={'100%'} height={'100%'} fill={DARK} >
            <Img ref={newBackground} src={background} rotation={-30} x={-100} opacity={0.4} scale={0.45}/>
            <Rect ref={backgroundOverlay} width={'100%'} height={'100%'} fill={VERY_DARK} opacity={0.4}/>
            <Rect width={'80%'} height={'40%'} y={-50}>
                <EdgeStrokeTxt ref={topText} text={'UI'} fill={'white'} y={-100} {...headerProps}/>
                <EdgeStrokeTxt ref={bottomText} text={'User Flow'} fill={'white'} y={100} {...headerProps}/>
            </Rect>

            <EdgeStrokeTxt ref={subHeader} {...headerProps} fontSize={90} y={-225}/>

            <Rect ref={gameplayGroup} opacity={0} y={100}>
                {gameplayContent.map((text, i) => (
                    <>
                        <Circle
                            ref={makeRef(gameplayBullets, i)}
                            {...bulletPoint}
                            x={bulletX}
                            y={startY + (i * lineHeight)}
                            opacity={0}
                        />
                        <Txt
                            ref={makeRef(gameplayTexts, i)}
                            {...bulletText}
                            text={text}
                            x={textStartX + 350}  // Position center, then offset to left edge
                            y={startY + (i * lineHeight)}
                            offsetX={-1}  // Align to left edge
                            opacity={0}
                        />
                    </>
                ))}
            </Rect>

            <Rect ref={controlsGroup} opacity={0} y={100}>
                {controlsContent.map((text, i) => (
                    <>
                        <Circle
                            ref={makeRef(controlsBullets, i)}
                            {...bulletPoint}
                            x={bulletX}
                            y={startY + (i * lineHeight)}
                            opacity={0}
                        />
                        <Txt
                            ref={makeRef(controlsTexts, i)}
                            {...bulletText}
                            text={text}
                            x={textStartX + 350}  // Position center, then offset to left edge
                            y={startY + (i * lineHeight)}
                            offsetX={-1}  // Align to left edge
                            opacity={0}
                        />
                    </>
                ))}
            </Rect>

            <Rect ref={audioGroup} opacity={0} y={100}>
                {audioContent.map((text, i) => (
                    <>
                        <Circle
                            ref={makeRef(audioBullets, i)}
                            {...bulletPoint}
                            x={bulletX}
                            y={startY + (i * lineHeight)}
                            opacity={0}
                        />
                        <Txt
                            ref={makeRef(audioTexts, i)}
                            {...bulletText}
                            text={text}
                            x={textStartX + 350}
                            y={startY + (i * lineHeight)}
                            offsetX={-1}
                            opacity={0}
                        />
                    </>
                ))}
            </Rect>

            <Rect ref={visualGroup} opacity={0} y={100}>
                {visualContent.map((text, i) => (
                    <>
                        <Circle
                            ref={makeRef(visualBullets, i)}
                            {...bulletPoint}
                            x={bulletX}
                            y={startY + (i * lineHeight)}
                            opacity={0}
                        />
                        <Txt
                            ref={makeRef(visualTexts, i)}
                            {...bulletText}
                            text={text}
                            x={textStartX + 350}
                            y={startY + (i * lineHeight)}
                            offsetX={-1}
                            opacity={0}
                        />
                    </>
                ))}
            </Rect>
        </Rect>
    )

    yield* all(
        bottomText().text('Accessibility', 1),
    );

    yield* beginSlide('start');
    yield* all(
        topText().opacity(0, 0.5),
        topText().y(-500, 1),
        bottomText().fontSize(150, 1),
        bottomText().y(-300, 1),
    )

    yield* subHeader().text('Gameplay', 1);
    yield* gameplayGroup().opacity(1, 0.3);

    for (let i = 0; i < gameplayBullets.length; i++) {
        yield* sequence(
            0.1,
            all(
                gameplayBullets[i].opacity(1, 0.3),
                gameplayBullets[i].size(bulletSize, 0.5, easeOutBack),
                gameplayTexts[i].opacity(1, 0.4),
                chain(
                    gameplayTexts[i].x(textStartX - 30, 0),
                    gameplayTexts[i].x(textStartX, 0.4, easeOutSine),
                )
            )
        );
    }

    yield* beginSlide('controls');
    yield* all(
        gameplayGroup().opacity(0, 0.5),
        subHeader().text('Controls', 1),
    );

    yield* controlsGroup().opacity(1, 0.3);
    for (let i = 0; i < controlsBullets.length; i++) {
        yield* sequence(
            0.1,
            all(
                controlsBullets[i].opacity(1, 0.3),
                controlsBullets[i].size(bulletSize, 0.5, easeOutBack),
                controlsTexts[i].opacity(1, 0.4),
                chain(
                    controlsTexts[i].x(textStartX - 30, 0),
                    controlsTexts[i].x(textStartX, 0.4, easeOutSine),
                )
            )
        );
    }

    yield* beginSlide('audio');
    yield* all(
        controlsGroup().opacity(0, 0.5),
        subHeader().text('Audio', 1),
    );

    yield* audioGroup().opacity(1, 0.3);
    for (let i = 0; i < audioBullets.length; i++) {
        yield* sequence(
            0.1,
            all(
                audioBullets[i].opacity(1, 0.3),
                audioBullets[i].size(bulletSize, 0.5, easeOutBack),
                audioTexts[i].opacity(1, 0.4),
                chain(
                    audioTexts[i].x(textStartX - 30, 0),
                    audioTexts[i].x(textStartX, 0.4, easeOutSine),
                )
            )
        );
    }

    yield* beginSlide('visual');
    yield* all(
        audioGroup().opacity(0, 0.5),
        subHeader().text('Visual', 1),
    );

    yield* visualGroup().opacity(1, 0.3);
    for (let i = 0; i < visualBullets.length; i++) {
        yield* sequence(
            0.1,
            all(
                visualBullets[i].opacity(1, 0.3),
                visualBullets[i].size(bulletSize, 0.5, easeOutBack),
                visualTexts[i].opacity(1, 0.4),
                chain(
                    visualTexts[i].x(textStartX - 30, 0),
                    visualTexts[i].x(textStartX, 0.4, easeOutSine),
                )
            )
        );
    }

    yield* beginSlide('end');
    yield* all(
        visualGroup().opacity(0, 1),
        subHeader().opacity(0, 1),
    );
    
    yield* all(
        topText().y(-100, 1),
        bottomText().y(100, 1),
        topText().opacity(1, 1),
        bottomText().opacity(1, 1),
        bottomText().fontSize(200, 1),
    );
});