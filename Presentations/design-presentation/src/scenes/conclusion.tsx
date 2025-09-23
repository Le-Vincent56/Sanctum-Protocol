import { makeScene2D, Rect, Txt, Img } from "@motion-canvas/2d"
import {all, beginSlide, createRef, useScene} from "@motion-canvas/core"
import { EdgeStrokeTxt } from "../types/EdgeStrokeTxt";

import prevBackground from '../img/programming-background.jpg'
import background from "../img/background.jpg";

export default makeScene2D(function* (view) {
    const DARK = useScene().variables.get('dark', '#1c1c1c');
    const VERDIGRIS = useScene().variables.get('verdigris', '#43b3ae');
    const PINK = useScene().variables.get('pink', '#ec008c');

    const header = createRef<EdgeStrokeTxt>();
    const fromBackground = createRef<Img>();
    const toBackground = createRef<Img>();
    const subHeader = createRef<EdgeStrokeTxt>();
    const overlay = createRef<Rect>();
    
    const headerProps = {
        fontFamily: 'Bokor',
        fontStyle: 'normal',
        fontSize: 200,
        leftEdgeColor: VERDIGRIS,
        rightEdgeColor: PINK,
        edgeOffset: 2
    }

    const bodyProps = {
        fontFamily: 'Geo',
        fontWeight: 400,
        fontSize: 60,
        leftEdgeColor: VERDIGRIS,
        rightEdgeColor: PINK,
        edgeOffset: 1
    }

    view.add(
        <Rect width={'100%'} height={'100%'} fill={DARK} >
            <Img ref={fromBackground} src={prevBackground} opacity={0.4}/>
            <Img ref={toBackground} src={background} rotation={-30} x={-100} opacity={0}/>
            <Rect ref={overlay} width={'100%'} height={'100%'} fill={DARK} opacity={0.5}/>
            <Rect width={'80%'} height={'40%'} y={-50}>
                <EdgeStrokeTxt ref={header} fill={'white'} {...headerProps}/>
            </Rect>
            <EdgeStrokeTxt ref={subHeader} text={'- Unloaded Dice Games - '} fill={'white'} {...bodyProps} y={400} opacity={0}/>
        </Rect>
    )
    
    yield* all(
        fromBackground().opacity(0, 1),
        toBackground().opacity(0.4, 1),
        header().opacity(1, 1),
        header().text('Thank You', 1),
        subHeader().opacity(1, 1),
    )

    yield* beginSlide('conclusion');
})