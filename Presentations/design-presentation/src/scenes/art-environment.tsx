import { makeScene2D, Line, Rect, Img } from "@motion-canvas/2d"
import {all, chain, beginSlide, createRef, useScene, delay, easeOutSine, easeInSine} from "@motion-canvas/core"
import { EdgeStrokeTxt } from "../types/EdgeStrokeTxt";

import background from '../img/art-background.jpg';
import blueprint from '../img/blueprint.png';
import structure from '../img/structure.png';
import castle from '../img/castle.jpg';
import hologram from '../img/hologram.png';
import synthwave from '../img/synthwave.jpg';
import slayTheSpire from '../img/slay-the-spire.png';
import conceptEnvironment from '../img/environment.png';

export default makeScene2D(function* (view) {
    const wrapper = createRef<Rect>();
    const backgroundOverlay = createRef<Rect>();
    const topText = createRef<EdgeStrokeTxt>();
    const bottomText = createRef<EdgeStrokeTxt>();

    const structureImg = createRef<Img>();
    const structureFrame = createRef<Line>();
    const castleImg = createRef<Img>();
    const castleFrame = createRef<Line>();
    const blueprintImg = createRef<Img>();
    const blueprintFrame = createRef<Line>();
    const hologramImg = createRef<Img>();
    const hologramFrame = createRef<Line>();
    const synthwaveImg = createRef<Img>();
    const synthwaveFrame = createRef<Line>();
    const brainImg = createRef<Img>();
    const brainFrame = createRef<Line>();
    const spireImg = createRef<Img>();
    const spireFrameTop = createRef<Line>();
    const spireFrameBot = createRef<Line>();
    const conceptImg = createRef<Img>();
    const conceptFrameTop = createRef<Line>();
    const conceptFrameBot = createRef<Line>();

    const VERY_DARK = '#000000';
    const DARK = useScene().variables.get('dark', '#1c1c1c');
    const VERDIGRIS = useScene().variables.get('verdigris', '#43b3ae');
    const PINK = useScene().variables.get('pink', '#ec008c');
    const LIGHT = useScene().variables.get('light', '#eeeeee');

    const headerProps = {
        fontFamily: 'Bokor',
        fontStyle: 'normal',
        fontSize: 200,
        leftEdgeColor: VERDIGRIS,
        rightEdgeColor: PINK,
        fill: LIGHT,
        edgeOffset: 2,
        opacity: 0,
    }
    
    const frame = {
        stroke: LIGHT,
        lineWidth: 3,
        end: 0,
    }

    view.add(
        <Rect ref={wrapper} width={'100%'} height={'100%'} fill={DARK} >
            <Img src={background} rotation={-30} x={-100} scale={0.45}/>
            <Rect ref={backgroundOverlay} width={'100%'} height={'100%'} fill={VERY_DARK} opacity={0.4}/>
            <Rect width={'80%'} height={'40%'} y={-50}>
                <EdgeStrokeTxt ref={topText} text={'Art'} fill={'white'} y={-100} {...headerProps} opacity={1}/>
                <EdgeStrokeTxt ref={bottomText} text={'Style Guide'} fill={'white'} y={100} {...headerProps} opacity={1}/>
            </Rect>
            
            <Img ref={structureImg} src={structure} size={[374, 300]} opacity={0} x={-373} y={-100}/>
            <Line ref={structureFrame} points={() => 
                    [
                        structureImg().topLeft(),
                        structureImg().topRight(),
                        structureImg().bottomRight(),
                        structureImg().bottomLeft(),
                        structureImg().topLeft(),
                    ]
                } {...frame} stroke={VERDIGRIS}
            />

            <Img ref={castleImg} src={castle} size={[600, 315]} opacity={0} x={-490} y={250}/>
            <Line ref={castleFrame} points={() =>
                [
                    castleImg().topLeft(),
                    castleImg().topRight(),
                    castleImg().bottomRight(),
                    castleImg().bottomLeft(),
                    castleImg().topLeft(),
                ]
            } {...frame} stroke={PINK}
            />

            <Img ref={blueprintImg} src={blueprint} size={[444, 662]} opacity={0} x={95} y={80}/>
            <Line ref={blueprintFrame} points={() =>
                    [
                        blueprintImg().topLeft(),
                        blueprintImg().topRight(),
                        blueprintImg().bottomRight(),
                        blueprintImg().bottomLeft(),
                        blueprintImg().topLeft(),
                    ]
                } {...frame} stroke={VERDIGRIS}
            />

            <Img ref={hologramImg} src={hologram} size={[371, 210]} opacity={0} x={560} y={-137}/>
            <Line ref={hologramFrame} points={() =>
                    [
                        hologramImg().topLeft(),
                        hologramImg().topRight(),
                        hologramImg().bottomRight(),
                        hologramImg().bottomLeft(),
                        hologramImg().topLeft(),
                    ]
                } {...frame} stroke={PINK}
            />

            <Img ref={synthwaveImg} src={synthwave} size={[373, 210]}  opacity={0} x={560} y={89}/>
            <Line ref={synthwaveFrame} points={() =>
                    [
                        synthwaveImg().topLeft(),
                        synthwaveImg().topRight(),
                        synthwaveImg().bottomRight(),
                        synthwaveImg().bottomLeft(),
                        synthwaveImg().topLeft(),
                    ]
                } {...frame} stroke={VERDIGRIS}
            />

            <Img ref={brainImg} src={synthwave} size={[373, 210]}  opacity={0} x={560} y={315}/>
            <Line ref={brainFrame} points={() =>
                    [
                        brainImg().topLeft(),
                        brainImg().topRight(),
                        brainImg().bottomRight(),
                        brainImg().bottomLeft(),
                        brainImg().topLeft(),
                    ]
                } {...frame} stroke={PINK}
            />

            <Img ref={spireImg} src={slayTheSpire} size={[1274, 717]} opacity={0} x={0} y={120}/>
            <Line ref={spireFrameTop} points={() =>
                    [
                        spireImg().topLeft(),
                        spireImg().topRight(),
                        spireImg().bottomRight(),
                    ]
                } {...frame} stroke={VERDIGRIS}
            />
            <Line ref={spireFrameBot} points={() =>
                [
                    spireImg().bottomRight(),
                    spireImg().bottomLeft(),
                    spireImg().topLeft(),
                ]
            } {...frame} stroke={PINK}
            />

            <Img ref={conceptImg} src={conceptEnvironment} size={[1147,717]} opacity={0} x={0} y={120}/>
            <Line ref={conceptFrameTop} points={() =>
                [
                    conceptImg().topLeft(),
                    conceptImg().topRight(),
                    conceptImg().bottomRight(),
                ]
            } {...frame} stroke={VERDIGRIS}
            />
            <Line ref={conceptFrameBot} points={() =>
                [
                    conceptImg().bottomRight(),
                    conceptImg().bottomLeft(),
                    conceptImg().topLeft(),
                ]
            } {...frame} stroke={PINK}
            />
        </Rect>
    )
    
    yield* bottomText().text('Environment', 1);
    yield* beginSlide('environment');
    
    yield* all(
        topText().opacity(0, 0.5),
        topText().y(-500, 1),
        bottomText().y(-300, 1),
        bottomText().fontSize(150, 1),
    )
    
    yield* beginSlide('structure');
    yield* all(
        structureFrame().end(1, 1),
        delay(
            0.25,
            structureImg().opacity(1, 1),
        )
    )

    yield* beginSlide('castle');
    yield* all(
        castleFrame().end(1, 1),
        delay(
            0.25,
            castleImg().opacity(1, 1),
        )
    )

    yield* beginSlide('blueprint');
    yield* all(
        blueprintFrame().end(1, 1),
        delay(
            0.25,
            blueprintImg().opacity(1, 1),
        )
    )

    yield* beginSlide('hologram');
    yield* all(
        hologramFrame().end(1, 1),
        delay(
            0.25,
            hologramImg().opacity(1, 1),
        )
    )

    yield* beginSlide('synthwave');
    yield* all(
        synthwaveFrame().end(1, 1),
        delay(
            0.25,
            synthwaveImg().opacity(1, 1),
        )
    )

    yield* beginSlide('brain');
    yield* all(
        brainFrame().end(1, 1),
        delay(
            0.25,
            brainImg().opacity(1, 1),
        )
    )
    
    yield* beginSlide('spire');
    yield* all(
        structureImg().opacity(0, 1),
        structureFrame().start(1, 0.75),
        castleImg().opacity(0, 1),
        castleFrame().start(1, 0.75),
        blueprintImg().opacity(0, 1),
        blueprintFrame().start(1, 0.75),
        hologramImg().opacity(0, 1),
        hologramFrame().start(1, 0.75),
        synthwaveImg().opacity(0, 1),
        synthwaveFrame().start(1, 0.75),
        brainImg().opacity(0, 1),
        brainFrame().start(1, 0.75),
    )
    
    yield* all(
        chain(
            spireFrameTop().end(1, 0.5, easeInSine),
            spireFrameBot().end(1, 0.5, easeOutSine),
        ),
        delay(
            0.25,
            spireImg().opacity(1, 1),
        )
    )
    
    yield* beginSlide('concept art');
    yield* all(
        spireImg().opacity(0, 1),
        chain(
            spireFrameTop().start(1, 0.375, easeInSine),
            spireFrameBot().start(1, 0.375, easeOutSine),
        ),
    )
    
    yield* all (
        chain(
            conceptFrameTop().end(1, 0.5, easeInSine),
            conceptFrameBot().end(1, 0.5, easeOutSine),
        ),
        delay(
            0.25,
            conceptImg().opacity(1, 1),
        )
    )
    
    yield* beginSlide('end');
    yield* all(
        conceptImg().opacity(0, 1),
        chain(
            conceptFrameTop().start(1, 0.375, easeInSine),
            conceptFrameBot().start(1, 0.375, easeOutSine),
        ),
    )
    
    yield* all(
        topText().opacity(1, 1),
        topText().y(-100, 1),
        bottomText().y(100, 1),
        bottomText().fontSize(200, 1),
    )
});