import {makeScene2D, Rect, Img} from "@motion-canvas/2d"
import {all, beginSlide, createRef, useScene} from "@motion-canvas/core"
import { EdgeStrokeTxt } from "../types/EdgeStrokeTxt";

import background from '../img/art-background.jpg';
import swprds from '../img/battle.png';
import cache from '../img/cache.png';
import lever from '../img/switch.png';
import altar from '../img/altar.png';

export default makeScene2D(function* (view) {
    const wrapper = createRef<Rect>();
    const backgroundOverlay = createRef<Rect>();
    const newBackground = createRef<Img>();
    const topText = createRef<EdgeStrokeTxt>();
    const bottomText = createRef<EdgeStrokeTxt>();
    
    const battleImg = createRef<Img>();
    const altarImg = createRef<Img>();
    const cacheImg = createRef<Img>();
    const switchImg = createRef<Img>();

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
    
    const icon = {
        scale: 1,
        y: 100,
        opacity: 0,
    }

    view.add(
        <Rect ref={wrapper} width={'100%'} height={'100%'} fill={DARK} >
            <Img ref={newBackground} src={background} rotation={-30} x={-100} opacity={0.4} scale={0.45}/>
            <Rect ref={backgroundOverlay} width={'100%'} height={'100%'} fill={VERY_DARK} opacity={0.4}/>
            <Rect width={'80%'} height={'40%'} y={-50}>
                <EdgeStrokeTxt ref={topText} text={'Design'} fill={'white'} y={-100} {...headerProps}/>
                <EdgeStrokeTxt ref={bottomText} text={'Network'} fill={'white'} y={100} {...headerProps}/>
            </Rect>
            
            <Img ref={battleImg} src={swprds} {...icon} scale={2}/>
            <Img ref={altarImg} src={altar} {...icon}/>
            <Img ref={cacheImg} src={cache} {...icon}/>
            <Img ref={switchImg} src={lever} {...icon}/>
        </Rect>
    )
    
    yield* all(
        topText().text('Design', 1),
        bottomText().text('Nodes', 1),
    );

    yield* beginSlide('battle');
    yield* all(
        topText().opacity(0, 0.5),
        topText().y(-500, 1),
        bottomText().fontSize(150, 1),
        bottomText().y(-300, 1),
    )
    yield* battleImg().opacity(1, 1);
    
    yield* beginSlide('altar');
    yield* all(
        battleImg().opacity(0, 1),
        altarImg().opacity(1, 1),
    )
    
    yield* beginSlide('cache');
    yield* all(
        altarImg().opacity(0, 1),
        cacheImg().opacity(1, 1),
    )
    
    yield* beginSlide('lever');
    yield* all(
        cacheImg().opacity(0, 1),
        switchImg().opacity(1, 1),
    )
    
    yield* beginSlide('end');
    yield* switchImg().opacity(0, 1);
    
    yield* all(
        topText().y(-100, 1),
        bottomText().y(100, 1),
        topText().opacity(1, 1),
        bottomText().fontSize(200, 1),
    )
}) 
