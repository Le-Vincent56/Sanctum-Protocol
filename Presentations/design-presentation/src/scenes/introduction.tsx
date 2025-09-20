import { makeScene2D, Rect, Txt, Img } from "@motion-canvas/2d"
import {beginSlide, createRef, Direction, slideTransition, useScene} from "@motion-canvas/core"
import { EdgeStrokeTxt } from "../types/EdgeStrokeTxt";

import background from '../img/background.jpg'

export default makeScene2D(function* (view) {
    const DARK = useScene().variables.get('dark', '#1c1c1c');
    const VERDIGRIS = useScene().variables.get('verdigris', '#43b3ae');
    const PINK = useScene().variables.get('pink', '#ec008c');
    
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
            <Img src={background}  rotation={-30} x={-100} opacity={0.4}/>
            <Rect width={'100%'} height={'100%'} fill={'#000000'} opacity={0.4}/>
            <Rect width={'80%'} height={'40%'} y={-50}>
                <EdgeStrokeTxt text={'Sanctum //'} fill={'white'} y={-100} x={-100} {...headerProps}/>
                <EdgeStrokeTxt text={'// Protocol'} fill={'white'} y={100} x={100} {...headerProps}/>
            </Rect>
            <EdgeStrokeTxt text={'- Unloaded Dice Games - '} fill={'white'} {...bodyProps} y={400}/>
        </Rect>
    )

    yield* beginSlide('introduction');
}) 
