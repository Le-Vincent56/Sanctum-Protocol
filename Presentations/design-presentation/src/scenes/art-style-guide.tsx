import { makeScene2D, Line, Rect, Txt, Img } from "@motion-canvas/2d"
import { all, chain, beginSlide, createRef, makeRef, useScene} from "@motion-canvas/core"
import { EdgeStrokeTxt } from "../types/EdgeStrokeTxt";

import background from '../img/art-background.jpg';

export default makeScene2D(function* (view) {
    const wrapper = createRef<Rect>();
    const backgroundOverlay = createRef<Rect>();
    const newBackground = createRef<Img>();
    const topText = createRef<EdgeStrokeTxt>();
    const bottomText = createRef<EdgeStrokeTxt>();

    const separator = createRef<Line>();
    const separatorFill = createRef<Line>();
    const upperClipRect = createRef<Rect>();
    const lowerClipRect = createRef<Rect>();
    const upperText = createRef<Txt>();
    const lowerText = createRef<Txt>();
    
    const priestText = createRef<EdgeStrokeTxt>();
    const priestCharacteristics: Txt[] = [];
    const enemyText = createRef<EdgeStrokeTxt>();
    const enemyCharacteristics: Txt[] = [];
    
    const VERY_DARK = '#000000';
    const DARK = useScene().variables.get('dark', '#1c1c1c');
    const VERDIGRIS = useScene().variables.get('verdigris', '#43b3ae');
    const PINK = useScene().variables.get('pink', '#ec008c');
    const LIGHT = useScene().variables.get('light', '#eeeeee');

    const diagonalAngle = Math.atan2(1080, 1920) * 180 / Math.PI;
    const characteristicGap = 100;
    
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
        edgeOffset: 1
    }

    view.add(
        <Rect ref={wrapper} width={'100%'} height={'100%'} fill={DARK} >
            <Img ref={newBackground} src={background} rotation={-30} x={-100} opacity={1} scale={0.45}/>
            <Rect ref={backgroundOverlay} width={'100%'} height={'100%'} fill={VERY_DARK} opacity={0.4}/>
            <Rect width={'80%'} height={'40%'} y={-50}>
                <EdgeStrokeTxt ref={topText} text={'UI'} fill={'white'} y={-100} {...headerProps}/>
                <EdgeStrokeTxt ref={bottomText} text={'Accessibility'} fill={'white'} y={100} {...headerProps}/>
            </Rect>

            {/* Lower triangle fill */}
            <Line
                ref={separatorFill}
                closed
                points={[
                    [-960, 540],
                    [960, -540],
                    [960, 540]
                ]}
                fill={LIGHT}
                opacity={0}
            />

            {/* Upper text section - clipped by rotated rectangle */}
            <Rect
                ref={upperClipRect}
                width={3000}
                height={1500}
                rotation={-diagonalAngle}
                y={-860}
                clip
            >
                <EdgeStrokeTxt
                    ref={upperText}
                    {...headerProps}
                    text={'VS'}
                    fill={LIGHT}
                    rotation={diagonalAngle}
                    opacity={0}
                />
            </Rect>

            <Rect
                ref={lowerClipRect}
                width={3000}
                height={1500}
                rotation={-diagonalAngle}
                y={860}
                clip
            >
                <EdgeStrokeTxt
                    ref={lowerText}
                    {...headerProps}
                    text={'VS'}
                    fill={DARK}
                    rotation={diagonalAngle}
                    y={-750}
                    opacity={0}
                />
            </Rect>

            {/* Diagonal separator line */}
            <Line
                ref={separator}
                points={[
                    [-960, 540],
                    [960, -540]
                ]}
                stroke={LIGHT}
                lineWidth={5}
                opacity={0.5}
                end={0}
            />
            
            <EdgeStrokeTxt ref={priestText} {...headerProps} text={'Priest'} fontSize={120} 
                x={-700} y={-400} opacity={0}
            />
            <Txt ref={makeRef(priestCharacteristics, 0)} {...bodyProps} text={'Orderly'}
                 x={-700} y={-200} opacity={0}
            />
            <Txt ref={makeRef(priestCharacteristics, 1)} {...bodyProps} text={'Mechanical'}
                 x={-700} y={priestCharacteristics[0].y() + characteristicGap} opacity={0}
            />
            <Txt ref={makeRef(priestCharacteristics, 2)} {...bodyProps} text={'Geometric'}
                 x={-700} y={priestCharacteristics[1].y() + characteristicGap} opacity={0}
            />


            <EdgeStrokeTxt ref={enemyText} {...headerProps} text={'Virus'} fontSize={120} 
                x={700} y={400} fill={DARK} opacity={0}
            />
            <Txt ref={makeRef(enemyCharacteristics, 0)} {...bodyProps} text={'Chaotic'}
                 x={700} y={200} opacity={0} fill={DARK}
            />
            <Txt ref={makeRef(enemyCharacteristics, 1)} {...bodyProps} text={'Digital'}
                 x={700} y={enemyCharacteristics[0].y() - characteristicGap} opacity={0} fill={DARK}
            />
            <Txt ref={makeRef(enemyCharacteristics, 2)} {...bodyProps} text={'Organic'}
                 x={700} y={enemyCharacteristics[1].y() - characteristicGap} opacity={0} fill={DARK}
            />
        </Rect>
    )
    
    upperText().absolutePosition(wrapper().absolutePosition());
    lowerText().absolutePosition(wrapper().absolutePosition());
    
    yield* all(
        topText().text('Art', 1),
        bottomText().text('Style Guide', 1),
    );
    
    yield* beginSlide('art-style-guide');
    yield* all(
        topText().opacity(0, 1),
        topText().y(-600, 1),
        bottomText().opacity(0, 1),
        bottomText().y(-400, 1),
        separator().end(1, 1),
    )
    yield* all(
        separator().lineWidth(0, 1),
        upperText().opacity(1, 1),
        lowerText().opacity(1, 1),
        separatorFill().opacity(0.5, 1),
        priestText().opacity(1, 1),
        enemyText().opacity(1, 1)
    )
    
    yield* beginSlide('order vs chaos');
    yield* chain(
        all(
            priestCharacteristics[0].opacity(1, 1),
            enemyCharacteristics[0].opacity(1, 1),
        ),
        all(
            priestCharacteristics[1].opacity(1, 1),
            enemyCharacteristics[1].opacity(1, 1),
        ),
        all(
            priestCharacteristics[2].opacity(1, 1),
            enemyCharacteristics[2].opacity(1, 1),
        )
    )
    
    yield* beginSlide('end');
    yield* all(
        separator().lineWidth(0, 1),
        upperText().opacity(0, 1),
        lowerText().opacity(0, 1),
        separatorFill().opacity(0, 1),
        priestText().opacity(0, 1),
        enemyText().opacity(0, 1),
        ...priestCharacteristics.map(text => text.opacity(0, 1)),
        ...enemyCharacteristics.map(text => text.opacity(0, 1)),
    )
    
    yield* all(
        topText().opacity(1, 1),
        topText().y(-100, 1),
        bottomText().opacity(1, 1),
        bottomText().fontSize(200, 1),
        bottomText().y(100 , 1),
    )
}) 
