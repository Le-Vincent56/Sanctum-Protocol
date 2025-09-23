import {makeScene2D, Rect, Img, Line, Txt} from "@motion-canvas/2d"
import {
    all,
    beginSlide,
    chain,
    createRef,
    delay,
    easeInSine,
    easeOutSine,
    makeRef,
    useScene,
} from "@motion-canvas/core"
import { EdgeStrokeTxt } from "../types/EdgeStrokeTxt";

import background from '../img/art-background.jpg';
import userFlow from '../img/user-flow.png';

export default makeScene2D(function* (view) {
    const wrapper = createRef<Rect>();
    const backgroundOverlay = createRef<Rect>();
    const newBackground = createRef<Img>();
    const topText = createRef<EdgeStrokeTxt>();
    const bottomText = createRef<EdgeStrokeTxt>();
    
    const userFlowImg = createRef<Img>();
    
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

    view.add(
        <Rect ref={wrapper} width={'100%'} height={'100%'} fill={DARK} >
            <Img ref={newBackground} src={background} rotation={-30} x={-100} opacity={0.4} scale={0.45}/>
            <Rect ref={backgroundOverlay} width={'100%'} height={'100%'} fill={VERY_DARK} opacity={0.4}/>
            <Rect width={'80%'} height={'40%'} y={-50}>
                <EdgeStrokeTxt ref={topText} text={'UI'} fill={'white'} y={-100} {...headerProps}/>
                <EdgeStrokeTxt ref={bottomText} text={'Battle'} fill={'white'} y={100} {...headerProps}/>
            </Rect>
            
            <Img ref={userFlowImg} src={userFlow} size={[, 800]} y={80} opacity={0}/>
        </Rect>
    )

    yield* all(
        bottomText().text('User Flow', 1),
    );

    yield* beginSlide('step one');
    yield* all(
        topText().opacity(0, 0.5),
        topText().y(-575, 1),
        bottomText().fontSize(130, 1),
        bottomText().y(-375, 1),
    );

    yield* userFlowImg().opacity(1, 1);

    yield* beginSlide('end');
    yield* userFlowImg().opacity(0, 1);

    yield* all(
        topText().y(-100, 1),
        bottomText().y(100, 1),
        topText().opacity(1, 1),
        bottomText().opacity(1, 1),
        bottomText().fontSize(200, 1),
    );
});