import {makeScene2D, Line, Rect, Txt, Img, Circle} from "@motion-canvas/2d"
import {all, beginSlide, chain, createRef, delay, makeRef, sequence, useScene, Vector2} from "@motion-canvas/core"
import { EdgeStrokeTxt } from "../types/EdgeStrokeTxt";

import background from '../img/art-background.jpg';

export default makeScene2D(function* (view) {
    const wrapper = createRef<Rect>();
    const backgroundOverlay = createRef<Rect>();
    const backgroundImg = createRef<Img>();
    const topText = createRef<EdgeStrokeTxt>();
    const bottomText = createRef<EdgeStrokeTxt>();
    
    const map = createRef<Circle>();
    const switches: Circle[] = [];
    const core = createRef<Circle>();
    
    const mapSize = 700;
    const switchSize = 350;
    const coreSize = 250;
    
    const mapOutline = createRef<Line>();
    const switchOutlines: Line[] = [];
    const coreOutline = createRef<Line>();

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

    const bodyText = {
        fontFamily: 'Geo',
        fontWeight: 400,
        fontSize: 70,
        fill: LIGHT,
    }
    
    const diagramOutline = {
        lineWidth: 3,
        stroke: LIGHT,
        end: 0,
        closed: true,
    }
    
    const calcPosition = (bigger: Circle, radius: number, degrees: number) => {
        const radians = (degrees * (Math.PI / 180));
        const x = Math.cos(-radians);
        const y = Math.sin(-radians);
        
        const bigDist = new Vector2(x * bigger.size().x / 2, y * bigger.size().x / 2);
        const smallDist = new Vector2(x * radius / 2, y * radius / 2);
        const totalDist = bigDist.sub(smallDist);
        return bigger.position().add(totalDist);
    }

    const getCirclePoints = (circle: Circle, numPoints: number = 64) => {
        const points: Vector2[] = [];
        const center = circle.position();
        const radius = circle.size().x / 2;

        for (let i = 0; i <= numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const x = center.x + Math.cos(angle) * radius;
            const y = center.y + Math.sin(angle) * radius;
            points.push(new Vector2(x, y));
        }

        return points;
    };

    view.add(
        <Rect ref={wrapper} width={'100%'} height={'100%'} fill={DARK} >
            <Img ref={backgroundImg} src={background} rotation={-30} x={-100} opacity={1} scale={0.45}/>
            <Rect ref={backgroundOverlay} width={'100%'} height={'100%'} fill={VERY_DARK} opacity={0.4}/>
            <Rect width={'80%'} height={'40%'} y={-50}>
                <EdgeStrokeTxt ref={topText} text={'Design'} fill={'white'} y={-100} {...headerProps} opacity={1}/>
                <EdgeStrokeTxt ref={bottomText} text={'Game Loop'} fill={'white'} y={100} {...headerProps} fontSize={200}/>
            </Rect>

            <Circle ref={map} fill={VERDIGRIS} size={mapSize} y={75} opacity={0}/>
            <Line ref={mapOutline} points={() => getCirclePoints(map())} {...diagramOutline} radius={mapSize / 2}/>
            <Circle ref={makeRef(switches, 0)}
                    position={() => calcPosition(map(), switchSize, 90)} 
                    fill={DARK} size={switchSize} opacity={0}
            >
                <Txt text={'1'} {...bodyText} y={-30}/>
            </Circle>
            <Circle ref={makeRef(switches, 1)}
                    position={() => calcPosition(map(), switchSize, 330)}
                    fill={DARK} size={switchSize} opacity={0}
            >
                <Txt text={'2'} {...bodyText} x={9} y={9}/>
            </Circle>
            <Circle ref={makeRef(switches, 2)}
                    position={() => calcPosition(map(), switchSize, 210)}
                    fill={DARK} size={switchSize} opacity={0}
            >
                <Txt text={'3'} {...bodyText} x={-9} y={9}/>
            </Circle>
            <Line ref={makeRef(switchOutlines, 0)} points={() => getCirclePoints(switches[0])} {...diagramOutline}/>
            <Line ref={makeRef(switchOutlines, 1)} points={() => getCirclePoints(switches[1])} {...diagramOutline}/>
            <Line ref={makeRef(switchOutlines, 2)} points={() => getCirclePoints(switches[2])} {...diagramOutline}/>
            <Circle ref={core} fill={PINK} size={coreSize} opacity={0} y={75}>
                <Txt text={'VIRUS'} {...bodyText}/>
            </Circle>
            <Line ref={coreOutline} points={() => getCirclePoints(core())} {...diagramOutline}/>
        </Rect>
    )

    yield* bottomText().text('Network', 1);
    
    yield* beginSlide('map');
    yield* all(
        topText().opacity(0, 0.5),
        topText().y(-575, 1),
        bottomText().fontSize(130, 1),
        bottomText().y(-375, 1),
    );
    
    yield* all(
        mapOutline().end(1, 1),
        delay(
            0.25,
            map().opacity(1, 1),
        )
    )

    const generators = [];
    for(let i = 0; i < switches.length; i++) {
        generators.push(
            all(
                switchOutlines[i].end(1, 1),
                delay(
                    0.25,
                    switches[i].opacity(1, 1),
                ),
            ),
        );
    }

    yield* beginSlide('core');
    yield* all(
        coreOutline().end(1, 1),
        delay(
            0.25,
            core().opacity(1, 1),
        )
    )
    
    yield* beginSlide('switches');
    yield* sequence(
        0.25,
        ...generators
    )
    
    yield* beginSlide('end');
    yield* all(
        map().opacity(0, 1),
        core().opacity(0, 1),
        ...switches.map(switchCircle => switchCircle.opacity(0, 1)),
        mapOutline().start(1, 0.75),
        coreOutline().start(1, 0.75),
        ...switchOutlines.map(outline => outline.start(1, 0.75)),
    )
    
    yield* all(
        topText().y(-100, 1),
        bottomText().y(100, 1),
        topText().opacity(1, 1),
        bottomText().fontSize(200, 1),
    )
});