import {makeScene2D, Rect, Img} from "@motion-canvas/2d"
import {all, beginSlide, createRef, makeRef, useScene,} from "@motion-canvas/core"
import { EdgeStrokeTxt } from "../types/EdgeStrokeTxt";

import background from '../img/art-background.jpg';
import stepOne from '../img/ui-concept-1.png';
import stepTwo from '../img/ui-concept-2.png';
import stepThree from '../img/ui-concept-3.png';
import stepFour from '../img/ui-concept-4.png';
import stepFive from '../img/ui-concept-5.png';
import stepSix from '../img/ui-concept-6.png';
import stepSeven from '../img/ui-concept-7.png';
import stepEight from '../img/ui-concept-8.png';
import stepNine from '../img/ui-concept-9.png';

export default makeScene2D(function* (view) {
    const wrapper = createRef<Rect>();
    const backgroundOverlay = createRef<Rect>();
    const newBackground = createRef<Img>();
    const topText = createRef<EdgeStrokeTxt>();
    const bottomText = createRef<EdgeStrokeTxt>();

    const VERY_DARK = '#000000';
    const DARK = useScene().variables.get('dark', '#1c1c1c');
    const VERDIGRIS = useScene().variables.get('verdigris', '#43b3ae');
    const PINK = useScene().variables.get('pink', '#ec008c');
    const LIGHT = useScene().variables.get('light', '#eeeeee');
    
    const steps: Img[] = [];

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

    view.add(
        <Rect ref={wrapper} width={'100%'} height={'100%'} fill={DARK} >
            <Img ref={newBackground} src={background} rotation={-30} x={-100} opacity={0.4} scale={0.45}/>
            <Rect ref={backgroundOverlay} width={'100%'} height={'100%'} fill={VERY_DARK} opacity={0.4}/>
            <Rect width={'80%'} height={'40%'} y={-50}>
                <EdgeStrokeTxt ref={topText} text={'Design'} fill={'white'} y={-100} {...headerProps}/>
                <EdgeStrokeTxt ref={bottomText} text={'Battle'} fill={'white'} y={100} {...headerProps}/>
            </Rect>
            
            <Img ref={makeRef(steps, 0)} src={stepOne} width={'100%'} height={'100%'} opacity={0}/>
            <Img ref={makeRef(steps, 1)} src={stepTwo} width={'100%'} height={'100%'} opacity={0}/>
            <Img ref={makeRef(steps, 2)} src={stepThree} width={'100%'} height={'100%'} opacity={0}/>
            <Img ref={makeRef(steps, 3)} src={stepFour} width={'100%'} height={'100%'} opacity={0}/>
            <Img ref={makeRef(steps, 4)} src={stepFive} width={'100%'} height={'100%'} opacity={0}/>
            <Img ref={makeRef(steps, 5)} src={stepSix} width={'100%'} height={'100%'} opacity={0}/>
            <Img ref={makeRef(steps, 6)} src={stepSeven} width={'100%'} height={'100%'} opacity={0}/>
            <Img ref={makeRef(steps, 7)} src={stepEight} width={'100%'} height={'100%'} opacity={0}/>
            <Img ref={makeRef(steps, 8)} src={stepNine} width={'100%'} height={'100%'} opacity={0}/>
        </Rect>
    )

    yield* all(
        topText().text('UI', 1),
    );

    yield* beginSlide('start');

    yield* beginSlide('step one');
    yield* all(
        topText().opacity(0, 0.5),
        topText().y(-575, 1),
        bottomText().fontSize(130, 1),
        bottomText().y(-375, 1),
        bottomText().opacity(0, 1),
    );
    yield* steps[0].opacity(1, 1);
    
    yield* beginSlide('step two');
    yield* all(
        steps[0].opacity(0, 1),
        steps[1].opacity(1, 1),
    );

    yield* beginSlide('step three');
    yield* all(
        steps[1].opacity(0, 1),
        steps[2].opacity(1, 1),
    );

    yield* beginSlide('step four');
    yield* all(
        steps[2].opacity(0, 1),
        steps[3].opacity(1, 1),
    );

    yield* beginSlide('step five');
    yield* all(
        steps[3].opacity(0, 1),
        steps[4].opacity(1, 1),
    );

    yield* beginSlide('step six');
    yield* all(
        steps[4].opacity(0, 1),
        steps[5].opacity(1, 1),
    );

    yield* beginSlide('step seven');
    yield* all(
        steps[5].opacity(0, 1),
        steps[6].opacity(1, 1),
    );

    yield* beginSlide('step eight');
    yield* all(
        steps[6].opacity(0, 1),
        steps[7].opacity(1, 1),
    );

    yield* beginSlide('step nine');
    yield* all(
        steps[7].opacity(0, 1),
        steps[8].opacity(1, 1),
    );

    yield* beginSlide('end');

    yield* all(
        topText().y(-100, 1),
        bottomText().y(100, 1),
        topText().opacity(1, 1),
        bottomText().fontSize(200, 1),
    );
});