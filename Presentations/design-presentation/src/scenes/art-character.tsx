import { makeScene2D, Line, Rect, Txt, Img, Video } from "@motion-canvas/2d"
import {all, chain, beginSlide, createRef, makeRef, useScene, delay, easeInSine, easeOutSine} from "@motion-canvas/core"
import { EdgeStrokeTxt } from "../types/EdgeStrokeTxt";

import background from '../img/art-background.jpg';
import robot from '../img/robot.jpg';
import monk from '../img/monk.png';
import tyranid from '../img/tyranid.jpg';
import hyperion from '../img/hyperion.jpg';
import priestOne from '../img/priests-1.png';
import priestTwo from '../img/priests-2.png';

import constructOne from '../img/construct-one.png';
import constructTwo from '../img/construct-two.webp';
import enemiesOne from '../img/enemies-1.png';
import virus from '../video/soma-glitch.mp4';

export default makeScene2D(function* (view) {
    const wrapper = createRef<Rect>();
    const backgroundOverlay = createRef<Rect>();
    const topText = createRef<EdgeStrokeTxt>();
    const bottomText = createRef<EdgeStrokeTxt>();

    const robotImg = createRef<Img>();
    const robotFrame = createRef<Line>();
    const monkImg = createRef<Img>();
    const monkFrame = createRef<Line>();
    const tyranidImg = createRef<Img>();
    const tyranidFrame = createRef<Line>();
    const hyperionImg = createRef<Img>();
    const hyperionFrame = createRef<Line>();
    const priestOneImg = createRef<Img>();
    const priestOneFrame = createRef<Line>();
    const priestTwoImg = createRef<Img>();
    const priestTwoFrame = createRef<Line>();
    const constructOneImg = createRef<Img>();
    const constructOneFrame = createRef<Line>();
    const constructTwoImg = createRef<Img>();
    const constructTwoFrame = createRef<Line>();
    const enemiesImg = createRef<Img>();
    const enemiesFrameTop = createRef<Line>();
    const enemiesFrameBot = createRef<Line>();
    const virusGif = createRef<Video>();
    const virusFrameTop = createRef<Line>();
    const virusFrameBot = createRef<Line>();

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
                <EdgeStrokeTxt ref={bottomText} text={'Environment'} fill={'white'} y={100} {...headerProps}/>
            </Rect>

            <Img ref={robotImg} src={robot} size={[354, 500]} opacity={0} x={-600} y={100}/>
            <Line ref={robotFrame} points={() =>
                [
                    robotImg().topLeft(),
                    robotImg().topRight(),
                    robotImg().bottomRight(),
                    robotImg().bottomLeft(),
                    robotImg().topLeft(),
                ]
            } {...frame} stroke={VERDIGRIS}
            />

            <Img ref={monkImg} src={monk} size={[333, 500]} opacity={0} x={-180} y={100}/>
            <Line ref={monkFrame} points={() =>
                [
                    monkImg().topLeft(),
                    monkImg().topRight(),
                    monkImg().bottomRight(),
                    monkImg().bottomLeft(),
                    monkImg().topLeft(),
                ]
            } {...frame} stroke={PINK}
            />

            <Img ref={tyranidImg} src={tyranid} size={[325, 500]} opacity={0} x={225} y={100}/>
            <Line ref={tyranidFrame} points={() =>
                [
                    tyranidImg().topLeft(),
                    tyranidImg().topRight(),
                    tyranidImg().bottomRight(),
                    tyranidImg().bottomLeft(),
                    tyranidImg().topLeft(),
                ]
            } {...frame} stroke={VERDIGRIS}
            />

            <Img ref={hyperionImg} src={hyperion} size={[338, 500]} opacity={0} x={625} y={100}/>
            <Line ref={hyperionFrame} points={() =>
                    [
                        hyperionImg().topLeft(),
                        hyperionImg().topRight(),
                        hyperionImg().bottomRight(),
                        hyperionImg().bottomLeft(),
                        hyperionImg().topLeft(),
                    ]
                } {...frame} stroke={PINK}
            />

            <Img ref={priestOneImg} src={priestOne} size={[768, 480]} opacity={0} x={425} y={120}/>
            <Line ref={priestOneFrame} points={() =>
                [
                    priestOneImg().topLeft(),
                    priestOneImg().topRight(),
                    priestOneImg().bottomRight(),
                    priestOneImg().bottomLeft(),
                    priestOneImg().topLeft(),
                ]
            } {...frame} stroke={VERDIGRIS}
            />

            <Img ref={priestTwoImg} src={priestTwo} size={[768, 480]} opacity={0} x={-425} y={120}/>
            <Line ref={priestTwoFrame} points={() =>
                [
                    priestTwoImg().topLeft(),
                    priestTwoImg().topRight(),
                    priestTwoImg().bottomRight(),
                    priestTwoImg().bottomLeft(),
                    priestTwoImg().topLeft(),
                ]
            } {...frame} stroke={PINK}
            />

            <Img ref={constructOneImg} src={constructOne} size={[480, 480]} opacity={0} x={300} y={120}/>
            <Line ref={constructOneFrame} points={() =>
                [
                    constructOneImg().topLeft(),
                    constructOneImg().topRight(),
                    constructOneImg().bottomRight(),
                    constructOneImg().bottomLeft(),
                    constructOneImg().topLeft(),
                ]
            } {...frame} stroke={VERDIGRIS}
            />

            <Img ref={constructTwoImg} src={constructTwo} size={[480, 480]} opacity={0} x={-300} y={120}/>
            <Line ref={constructTwoFrame} points={() =>
                [
                    constructTwoImg().topLeft(),
                    constructTwoImg().topRight(),
                    constructTwoImg().bottomRight(),
                    constructTwoImg().bottomLeft(),
                    constructTwoImg().topLeft(),
                ]
            } {...frame} stroke={PINK}
            />

            <Img ref={enemiesImg} src={enemiesOne} size={[960, 600]} opacity={0} y={120}/>
            <Line ref={enemiesFrameTop} points={() =>
                [
                    enemiesImg().topLeft(),
                    enemiesImg().topRight(),
                    enemiesImg().bottomRight(),
                ]
            } {...frame} stroke={PINK}
            />
            <Line ref={enemiesFrameBot} points={() =>
                [
                    enemiesImg().bottomRight(),
                    enemiesImg().bottomLeft(),
                    enemiesImg().topLeft(),
                ]
            } {...frame} stroke={VERDIGRIS}
            />

            <Video ref={virusGif} src={virus} scale={0.5} opacity={0} x={0} y={120} loop={true}/>
            <Line ref={virusFrameTop} points={() =>
                    [
                        virusGif().topLeft(),
                        virusGif().topRight(),
                        virusGif().bottomRight(),
                    ]
                } {...frame} stroke={PINK}
            />
            <Line ref={virusFrameBot} points={() =>
                    [
                        virusGif().bottomRight(),
                        virusGif().bottomLeft(),
                        virusGif().topLeft(),
                    ]
                } {...frame} stroke={VERDIGRIS}
            />
        </Rect>
    )

    yield* bottomText().text('Characters', 1);
    yield* beginSlide('characters');

    yield* all(
        topText().opacity(0, 0.5),
        topText().y(-500, 1),
        bottomText().y(-300, 1),
        bottomText().fontSize(150, 1),
    )

    yield* beginSlide('robot');
    yield* all(
        robotFrame().end(1, 1),
        delay(
            0.25,
            robotImg().opacity(1, 1),
        )
    )

    yield* beginSlide('monk');
    yield* all(
        monkFrame().end(1, 1),
        delay(
            0.25,
            monkImg().opacity(1, 1),
        )
    )

    yield* beginSlide('tyranid');
    yield* all(
        tyranidFrame().end(1, 1),
        delay(
            0.25,
            tyranidImg().opacity(1, 1),
        )
    )

    yield* beginSlide('hyperion');
    yield* all(
        hyperionFrame().end(1, 1),
        delay(
            0.25,
            hyperionImg().opacity(1, 1),
        )
    )

    yield* beginSlide('character concept art');
    yield* all(
        robotImg().opacity(0, 1),
        robotFrame().start(1, 0.75),
        monkImg().opacity(0, 1),
        monkFrame().start(1, 0.75),
        tyranidImg().opacity(0, 1),
        tyranidFrame().start(1, 0.75),
        hyperionImg().opacity(0, 1),
        hyperionFrame().start(1, 0.75),
    )
    
    yield* all (
        priestOneFrame().end(1, 1),
        priestTwoFrame().end(1, 1),
        delay(
            0.25,
            all(
                priestOneImg().opacity(1, 1),
                priestTwoImg().opacity(1, 1),
            )
        )
    )
    
    yield* beginSlide('constructs');
    yield* all(
        priestOneImg().opacity(0, 1),
        priestOneFrame().start(1, 0.75),
        priestTwoImg().opacity(0, 1),
        priestTwoFrame().start(1, 0.75),
    )

    yield* all (
        constructOneFrame().end(1, 1),
        constructTwoFrame().end(1, 1),
        delay(
            0.25,
            all(
                constructOneImg().opacity(1, 1),
                constructTwoImg().opacity(1, 1),
            )
        )
    )
    
    yield* beginSlide('virus');
    yield* all(
        constructOneImg().opacity(0, 1),
        constructOneFrame().start(1, 0.75),
        constructTwoImg().opacity(0, 1),
        constructTwoFrame().start(1, 0.75),
    )

    virusGif().play();
    yield* all (
        chain(
            virusFrameTop().end(1, 0.5, easeInSine),
            virusFrameBot().end(1, 1, easeOutSine),
        ),
        delay(
            0.25,
            virusGif().opacity(1, 1),
        )
    )

    yield* beginSlide('enemy concept art');
    yield* all(
        chain(
            virusFrameTop().start(1, 0.5, easeInSine),
            virusFrameBot().start(1, 0.5, easeOutSine),
        ),
        delay(
            0.25,
            virusGif().opacity(0, 1),
        )
    )

    yield* all (
        chain(
            enemiesFrameTop().end(1, 0.5, easeInSine),
            enemiesFrameBot().end(1, 1, easeOutSine),
        ),
        delay(
            0.25,
            enemiesImg().opacity(1, 1),
        )
    )
    
    yield* beginSlide('end');
    yield* all(
        chain(
            enemiesFrameTop().start(1, 0.5, easeInSine),
            enemiesFrameBot().start(1, 0.5, easeOutSine),
        ),
        delay(
            0.25,
            enemiesImg().opacity(0, 1),
        )
    )
    
    yield* all(
        topText().opacity(1, 1),
        topText().y(-100, 1),
        bottomText().y(100, 1),
        bottomText().fontSize(200, 1),
    )
});