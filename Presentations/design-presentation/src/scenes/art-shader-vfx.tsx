import {makeScene2D, Line, Rect, Txt, Img, Video} from "@motion-canvas/2d"
import {all, chain, beginSlide, createRef, makeRef, useScene, delay, easeInSine, easeOutSine} from "@motion-canvas/core"
import { EdgeStrokeTxt } from "../types/EdgeStrokeTxt";

import background from '../img/art-background.jpg';
import inscryption from '../img/inscryption.png';
import foils from '../img/foils.png';
import euclidean from '../video/lost-euclidean.mp4';

export default makeScene2D(function* (view) {
    const wrapper = createRef<Rect>();
    const backgroundOverlay = createRef<Rect>();
    const topText = createRef<EdgeStrokeTxt>();
    const bottomText = createRef<EdgeStrokeTxt>();

    const inscryptionImg = createRef<Img>();
    const inscryptionFrame = createRef<Line>();
    const foilsImg = createRef<Img>();
    const foilsFrame = createRef<Line>();
    const euclideanGif = createRef<Video>();
    const euclideanFrame = createRef<Video>();

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
        opacity: 1,
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
                <EdgeStrokeTxt ref={topText} text={'Art'} fill={'white'} y={-100} {...headerProps}/>
                <EdgeStrokeTxt ref={bottomText} text={'Characters'} fill={'white'} y={100} {...headerProps}/>
            </Rect>

            <Img ref={inscryptionImg} src={inscryption} size={[600, 340.5]} opacity={0} x={-400} y={-75}/>
            <Line ref={inscryptionFrame} points={() =>
                    [
                        inscryptionImg().topLeft(),
                        inscryptionImg().topRight(),
                        inscryptionImg().bottomRight(),
                        inscryptionImg().bottomLeft(),
                        inscryptionImg().topLeft(),
                    ]
                } {...frame} stroke={VERDIGRIS}
            />

            <Img ref={foilsImg} src={foils} size={[600, 314]} opacity={0} x={-400} y={300}/>
            <Line ref={foilsFrame} points={() =>
                [
                    foilsImg().topLeft(),
                    foilsImg().topRight(),
                    foilsImg().bottomRight(),
                    foilsImg().bottomLeft(),
                    foilsImg().topLeft(),
                ]
            } {...frame} stroke={PINK}
            />

            <Video ref={euclideanGif} src={euclidean} scale={0.8} opacity={0} x={400} y={100} loop={true}/>
            <Line ref={euclideanFrame} points={() =>
                [
                    euclideanGif().topLeft(),
                    euclideanGif().topRight(),
                    euclideanGif().bottomRight(),
                    euclideanGif().bottomLeft(),
                    euclideanGif().topLeft(),
                ]
            } {...frame} stroke={VERDIGRIS}
            />
        </Rect>
    )

    yield* bottomText().text('Shaders / VFX', 1);
    yield* beginSlide('shader and vfx');

    yield* all(
        topText().opacity(0, 0.5),
        topText().y(-500, 1),
        bottomText().y(-300, 1),
        bottomText().fontSize(150, 1),
    )

    euclideanGif().play();
    yield* all(
        inscryptionFrame().end(1, 1),
        delay(
            0.25,
            inscryptionImg().opacity(1, 1),
        ),
        foilsFrame().end(1, 1),
        delay(
            0.25,
            foilsImg().opacity(1, 1),
        ),
        euclideanFrame().end(1, 1),
        delay(
            0.25,
            euclideanGif().opacity(1, 1),
        )
    )

    yield* beginSlide('end');
    yield* all(
        inscryptionImg().opacity(0, 1),
        inscryptionFrame().start(1, 0.75),
        foilsImg().opacity(0, 1),
        foilsFrame().start(1, 0.75),
        euclideanGif().opacity(0, 1),
        euclideanFrame().start(1, 0.75),
    )
    
    yield* all(
        topText().opacity(1, 1),
        topText().y(-100, 1),
        bottomText().y(100, 1),
        bottomText().fontSize(200, 1),
    )
});