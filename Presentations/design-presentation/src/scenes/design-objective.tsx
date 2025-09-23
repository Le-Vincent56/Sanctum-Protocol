import {makeScene2D, Line, Rect, Txt, Img, Polygon} from "@motion-canvas/2d"
import {all, beginSlide, createRef, makeRef, useScene, Vector2, createSignal} from "@motion-canvas/core"
import { EdgeStrokeTxt } from "../types/EdgeStrokeTxt";

import otherBackground from '../img/background.jpg';
import background from '../img/art-background.jpg';

export default makeScene2D(function* (view) {
    const wrapper = createRef<Rect>();
    const backgroundOverlay = createRef<Rect>();
    const prevBackground = createRef<Img>();
    const newBackground = createRef<Img>();
    const topText = createRef<EdgeStrokeTxt>();
    const bottomText = createRef<EdgeStrokeTxt>();
    
    const objectiveText = createRef<Txt>()
    const howText = createRef<Txt>()

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

    const loopLine = {
        lineWidth: 5,
        radius: 360,
        end: 0,
        opacity: 0,
        endArrow: true,
    }

    view.add(
        <Rect ref={wrapper} width={'100%'} height={'100%'} fill={DARK} >
            <Img ref={prevBackground} src={otherBackground} rotation={-30} x={-100} opacity={0.4}/>
            <Img ref={newBackground} src={background} rotation={-30} x={-100} opacity={0} scale={0.45}/>
            <Rect ref={backgroundOverlay} width={'100%'} height={'100%'} fill={VERY_DARK} opacity={0.4}/>
            <Rect width={'80%'} height={'40%'} y={-50}>
                <EdgeStrokeTxt ref={topText} text={'Sanctum //'} fill={'white'} y={-100} x={-100} {...headerProps}/>
                <EdgeStrokeTxt ref={bottomText} text={'// Protocol'} fill={'white'} y={100} x={100} {...headerProps}/>
            </Rect>
            
            <Txt ref={objectiveText} {...bodyProps} textWrap={true} width={'60%'} textAlign={'center'} opacity={1}/>
            <Txt ref={howText} {...bodyProps} textWrap={true} width={'60%'} textAlign={'center'} opacity={1}/>
        </Rect>
    )

    yield* all(
        prevBackground().opacity(0, 1),
        newBackground().opacity(1, 1),
        topText().text('Design', 1),
        topText().x(0, 1),
        bottomText().text('Objective', 1),
        bottomText().x(0, 1),
    );
    
    yield* beginSlide('objective');
    yield* all(
        topText().opacity(0, 0.5),
        topText().y(-500, 1),
        bottomText().fontSize(150, 1),
        bottomText().y(-300, 1),
    )
    
    yield* beginSlide('objective one');
    yield* objectiveText().text('Exorcise the VIRUS infecting your faith. ', 1);

    yield* beginSlide('objective two');
    yield* objectiveText().text('The VIRUS is quarantined. It won’t be for long. ', 1);

    yield* beginSlide('objective three');
    yield* objectiveText().text('You must release it to destroy it.', 1);
    
    yield* beginSlide('how');
    yield* all(
        bottomText().text('How', 1),
        objectiveText().opacity(0, 1),
    );
    
    yield* beginSlide('how one');
    yield* howText().text('Battle your way to switches to release the VIRUS. ', 1);
    
    yield* beginSlide('how two');
    yield* howText().text('Use Verses (cards) in combat, rewriting the codex of your religion to fight enemies.', 1);
    
    yield* beginSlide('end');
    yield* howText().opacity(0, 1);
    yield* all(
        topText().opacity(1, 1),
        topText().y(-100, 1),
        bottomText().fontSize(200, 1),
        bottomText().y(100 , 1),
    )
}) 
