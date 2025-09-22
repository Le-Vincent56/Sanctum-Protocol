import {makeScene2D, Rect, Img, Line} from "@motion-canvas/2d"
import {all, beginSlide, createRef, delay, makeRef, useScene,} from "@motion-canvas/core"
import { EdgeStrokeTxt } from "../types/EdgeStrokeTxt";

import background from '../img/art-background.jpg';
import castlevania from '../img/castlevania.jpg';
import armelio from '../img/armelio.jpg';
import kingdom from '../img/kingdom.jpg';
import warhammer from '../img/warhammer.png';
import cyberpunk from '../img/cyberpunk.png';
import doom from '../img/doom.jpg';
import destiny from '../img/destiny.png';

export default makeScene2D(function* (view) {
    const wrapper = createRef<Rect>();
    const backgroundOverlay = createRef<Rect>();
    const newBackground = createRef<Img>();
    const topText = createRef<EdgeStrokeTxt>();
    const bottomText = createRef<EdgeStrokeTxt>();
    
    const castlevaniaImg = createRef<Img>();
    const castlevaniaFrame = createRef<Line>();
    const armelioImg = createRef<Img>();
    const armelioFrame = createRef<Line>();
    const kingdomImg = createRef<Img>();
    const kingdomFrame = createRef<Line>();
    
    const warhammerImg = createRef<Img>();
    const warhammerFrame = createRef<Line>();
    const cyberpunkImg = createRef<Img>();
    const cyberpunkFrame = createRef<Line>();
    const doomImg = createRef<Img>();
    const doomFrame = createRef<Line>();
    const destinyImg = createRef<Img>();
    const destinyFrame = createRef<Line>();

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
        edgeOffset: 2
    }

    const bodyProps = {
        fontFamily: 'Geo',
        fontWeight: 400,
        fontSize: 80,
        fill: LIGHT,
        opacity: 0,
    }

    const frame = {
        stroke: LIGHT,
        lineWidth: 3,
        end: 0,
    }

    view.add(
        <Rect ref={wrapper} width={'100%'} height={'100%'} fill={DARK} >
            <Img ref={newBackground} src={background} rotation={-30} x={-100} opacity={0.4} scale={0.45}/>
            <Rect ref={backgroundOverlay} width={'100%'} height={'100%'} fill={VERY_DARK} opacity={0.4}/>
            <Rect width={'80%'} height={'40%'} y={-50}>
                <EdgeStrokeTxt ref={topText} text={'Art'} fill={'white'} y={-100} {...headerProps}/>
                <EdgeStrokeTxt ref={bottomText} text={'Shaders / VFX'} fill={'white'} y={100} {...headerProps}/>
            </Rect>

            <Img ref={castlevaniaImg} src={castlevania} size={[, 350]} opacity={0} x={-325} y={-75}/>
            <Line ref={castlevaniaFrame} points={() =>
                    [
                        castlevaniaImg().topLeft(),
                        castlevaniaImg().topRight(),
                        castlevaniaImg().bottomRight(),
                        castlevaniaImg().bottomLeft(),
                        castlevaniaImg().topLeft(),
                    ]
                } {...frame} stroke={PINK}
            />

            <Img ref={armelioImg} src={armelio} size={[, 350]} opacity={0} x={325} y={-75}/>
            <Line ref={armelioFrame} points={() =>
                    [
                        armelioImg().topLeft(),
                        armelioImg().topRight(),
                        armelioImg().bottomRight(),
                        armelioImg().bottomLeft(),
                        armelioImg().topLeft(),
                    ]
                } {...frame} stroke={VERDIGRIS}
            />

            <Img ref={kingdomImg} src={kingdom} size={[, 350]} opacity={0} x={0} y={300}/>
            <Line ref={kingdomFrame} points={() =>
                    [
                        kingdomImg().topLeft(),
                        kingdomImg().topRight(),
                        kingdomImg().bottomRight(),
                        kingdomImg().bottomLeft(),
                        kingdomImg().topLeft(),
                    ]
                } {...frame} stroke={PINK}
            />

            <Img ref={warhammerImg} src={warhammer} size={[, 350]} opacity={0} x={-325} y={-75}/>
            <Line ref={warhammerFrame} points={() =>
                    [
                        warhammerImg().topLeft(),
                        warhammerImg().topRight(),
                        warhammerImg().bottomRight(),
                        warhammerImg().bottomLeft(),
                        warhammerImg().topLeft(),
                    ]
                } {...frame} stroke={VERDIGRIS}
            />

            <Img ref={cyberpunkImg} src={cyberpunk} size={[, 350]} opacity={0} x={-325} y={300}/>
            <Line ref={cyberpunkFrame} points={() =>
                    [
                        cyberpunkImg().topLeft(),
                        cyberpunkImg().topRight(),
                        cyberpunkImg().bottomRight(),
                        cyberpunkImg().bottomLeft(),
                        cyberpunkImg().topLeft(),
                    ]
                } {...frame} stroke={PINK}
            />

            <Img ref={doomImg} src={doom} size={[, 350]} opacity={0} x={325} y={-75}/>
            <Line ref={doomFrame} points={() =>
                    [
                        doomImg().topLeft(),
                        doomImg().topRight(),
                        doomImg().bottomRight(),
                        doomImg().bottomLeft(),
                        doomImg().topLeft(),
                    ]
                } {...frame} stroke={VERDIGRIS}
            />


            <Img ref={destinyImg} src={destiny} size={[, 350]} opacity={0} x={325} y={300}/>
            <Line ref={destinyFrame} points={() =>
                [
                    destinyImg().topLeft(),
                    destinyImg().topRight(),
                    destinyImg().bottomRight(),
                    destinyImg().bottomLeft(),
                    destinyImg().topLeft(),
                ]
            } {...frame} stroke={PINK}
            />
        </Rect>
    )

    yield* all(
        bottomText().text('UI', 1),
    );

    yield* beginSlide('start');

    yield* beginSlide('gothic');
    yield* all(
        topText().opacity(0, 0.5),
        topText().y(-500, 1),
        bottomText().y(-300, 1),
        bottomText().fontSize(130, 1),
    );

    yield* beginSlide('castlevania');
    yield* all(
        castlevaniaFrame().end(1, 1),
        delay(
            0.25,
            castlevaniaImg().opacity(1, 1),
        )
    )

    yield* beginSlide('armelio');
    yield* all(
        armelioFrame().end(1, 1),
        delay(
            0.25,
            armelioImg().opacity(1, 1),
        )
    )

    yield* beginSlide('kingdom');
    yield* all(
        kingdomFrame().end(1, 1),
        delay(
            0.25,
            kingdomImg().opacity(1, 1),
        )
    )

    yield* beginSlide('sci-fi');
    yield* all(
        castlevaniaImg().opacity(0, 1),
        castlevaniaFrame().start(1, 0.75),
        armelioImg().opacity(0, 1),
        armelioFrame().start(1, 0.75),
        kingdomImg().opacity(0, 1),
        kingdomFrame().start(1, 0.75),
    )
    
    yield* all(
        warhammerFrame().end(1, 1),
        delay(
            0.25,
            warhammerImg().opacity(1, 1),
        )
    )

    yield* beginSlide('cyberpunk');
    yield* all(
        cyberpunkFrame().end(1, 1),
        delay(
            0.25,
            cyberpunkImg().opacity(1, 1),
        )
    )

    yield* beginSlide('doom');
    yield* all(
        doomFrame().end(1, 1),
        delay(
            0.25,
            doomImg().opacity(1, 1),
        )
    )

    yield* beginSlide('destiny');
    yield* all(
        destinyFrame().end(1, 1),
        delay(
            0.25,
            destinyImg().opacity(1, 1),
        )
    )
    
    yield* beginSlide('end');
    yield* all(
        warhammerImg().opacity(0, 1),
        warhammerFrame().start(1, 0.75),
        cyberpunkImg().opacity(0, 1),
        cyberpunkFrame().start(1, 0.75),
        doomImg().opacity(0, 1),
        doomFrame().start(1, 0.75),
        destinyImg().opacity(0, 1),
        destinyFrame().start(1, 0.75),
    )
    
    yield* all(
        topText().y(-100, 1),
        bottomText().y(100, 1),
        topText().opacity(1, 1),
        bottomText().opacity(1, 1),
        bottomText().fontSize(200, 1),
    );
});