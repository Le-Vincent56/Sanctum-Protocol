import {makeScene2D, Line, Rect, Txt, Img, Polygon} from "@motion-canvas/2d"
import {all, beginSlide, createRef, makeRef, useScene, Vector2, createSignal} from "@motion-canvas/core"
import { EdgeStrokeTxt } from "../types/EdgeStrokeTxt";

import background from '../img/art-background.jpg';

export default makeScene2D(function* (view) {
    const wrapper = createRef<Rect>();
    const backgroundOverlay = createRef<Rect>();
    const backgroundImg = createRef<Img>();
    const topText = createRef<EdgeStrokeTxt>();
    const bottomText = createRef<EdgeStrokeTxt>();

    const VERY_DARK = '#000000';
    const DARK = useScene().variables.get('dark', '#1c1c1c');
    const VERDIGRIS = useScene().variables.get('verdigris', '#43b3ae');
    const PINK = useScene().variables.get('pink', '#ec008c');
    const LIGHT = useScene().variables.get('light', '#eeeeee');

    const loopRotation = createSignal(0)
    const loopTxts: Txt[] = [];
    const loopLines: Line[] = [];
    const loopStructure = createRef<Polygon>();
    const offsetY = 50;
    const loopRadius = createSignal(350);

    const getVertex = (index: number) => {
        const angle = (loopRotation() * Math.PI / 180) + (index * 120 * Math.PI / 180);
        const x = Math.cos(angle - Math.PI / 2) * loopRadius();
        const y = Math.sin(angle - Math.PI / 2) * loopRadius() + offsetY;
        return new Vector2(x, y);
    };

    const getControlPoint = (start: Vector2, end: Vector2, center: Vector2, radius: number) => {
        const midpoint = start.add(end).scale(0.5);
        const directionToCenter = midpoint.sub(center).normalized;
        const controlDistance = radius * 1.5;
        return midpoint.add(directionToCenter.scale(controlDistance));
    };

    function* drawLine(line: Line, time: number) {
        yield* all(
            line.end(1, time),
            line.opacity(1, time),
        );
    }

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

    const loopLine = {
        lineWidth: 5,
        radius: 360,
        end: 0,
        opacity: 0,
        endArrow: true,
    }

    view.add(
        <Rect ref={wrapper} width={'100%'} height={'100%'} fill={DARK} >
            <Img ref={backgroundImg} src={background} rotation={-30} x={-100} opacity={1} scale={0.45}/>
            <Rect ref={backgroundOverlay} width={'100%'} height={'100%'} fill={VERY_DARK} opacity={0.4}/>
            <Rect width={'80%'} height={'40%'} y={-50}>
                <EdgeStrokeTxt ref={topText} text={'Design'} fill={'white'} y={-100} {...headerProps}/>
                <EdgeStrokeTxt ref={bottomText} text={'How'} fill={'white'} y={100} {...headerProps}/>
            </Rect>

            <Polygon
                ref={loopStructure}
                size={loopRadius() * 2}
                sides={3}
                position={[0, offsetY]}
                rotation={loopRotation}
            />
            <Txt
                ref={makeRef(loopTxts, 0)}
                {...bodyProps}
                fill={LIGHT}
                position={() => getVertex(0)}
            >
                NETWORK
            </Txt>
            <Txt
                ref={makeRef(loopTxts, 1)}
                {...bodyProps}
                fill={LIGHT}
                position={() => getVertex(1)}
            >
                BATTLE/EVENT
            </Txt>
            <Txt
                ref={makeRef(loopTxts, 2)}
                {...bodyProps}
                fill={LIGHT}
                position={() => getVertex(2)}
            >
                REWARDS
            </Txt>
            <Line
                ref={makeRef(loopLines, 0)}
                stroke={PINK}
                {...loopLine}
                startOffset={170}
                endOffset={70}
                points={() => {
                    loopRotation();
                    const start = getVertex(0);
                    const end = getVertex(1);
                    const center = new Vector2(0, offsetY);
                    const control = getControlPoint(start, end, center, loopRadius());
                    return [start, control, end];
                }}
            />
            <Line
                ref={makeRef(loopLines, 1)}
                stroke={VERDIGRIS}
                {...loopLine}
                startOffset={70}
                endOffset={70}
                points={() => {
                    loopRotation();
                    const start = getVertex(1);
                    const end = getVertex(2);
                    const center = new Vector2(0, offsetY);
                    const control = getControlPoint(start, end, center, loopRadius());
                    return [start, control, end];
                }}
            />
            <Line
                ref={makeRef(loopLines, 2)}
                stroke={PINK}
                {...loopLine}
                startOffset={70}
                endOffset={170}
                points={() => {
                    loopRotation();
                    const start = getVertex(2);
                    const end = getVertex(0);
                    const center = new Vector2(0, offsetY);
                    const control = getControlPoint(start, end, center, loopRadius());
                    return [start, control, end];
                }}
            />
        </Rect>
    )

    yield* all(
        topText().text('Design', 1),
        topText().x(0, 1),
        bottomText().text('Game Loop', 1),
        bottomText().x(0, 1),
    );

    yield* beginSlide('game loop');
    yield* all(
        topText().opacity(0, 0.5),
        topText().y(-575, 1),
        bottomText().fontSize(130, 1),
        bottomText().y(-375, 1),
    );

    yield* loopTxts[0].opacity(1, 0.75);
    
    yield* beginSlide('loop one');
    yield* all(
        drawLine(loopLines[0], 0.5),
        loopTxts[1].opacity(1, 0.75),
    );
    
    yield* beginSlide('loop two');
    yield* all(
        drawLine(loopLines[1], 0.5),
        loopTxts[2].opacity(1, 0.75),
    );
    
    yield* beginSlide('loop three');
    yield* drawLine(loopLines[2], 0.5);

    yield* beginSlide('end');
    yield* all(
        ...loopTxts.map(txt => txt.opacity(0, 1)),
        ...loopLines.map(line => line.opacity(0, 1)),
    )

    yield* all(
        topText().y(-100, 1),
        bottomText().y(100, 1),
        topText().opacity(1, 1),
        bottomText().fontSize(200, 1),
    );
});
